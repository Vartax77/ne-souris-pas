// Prototype 0, lot L0.2 (D6) : détection à cadence plafonnée, valeurs brutes en direct.

import { demarrerCamera } from "./capture.js";
import { preparerMoteur, lancerAnalyse } from "./detection.js";
import { CADENCE_MAX, creerFenetre } from "./cadence.js";
import { angles, rectangle, largeur, luminance, scores } from "./mesures.js";

const $ = (id) => document.getElementById(id);

function afficher(id, texte, classe) {
  const el = $(id);
  el.textContent = texte;
  el.className = classe ?? "";
}

// Nombre à la française : 15,0.
const f = (n, d = 0) => (Number.isFinite(n) ? n.toFixed(d).replace(".", ",") : "—");

// Compte les chargements externes bloqués par la politique de sécurité (D8 n° 221).
// Tentative attendue : les statistiques de MediaPipe vers Google (n° 225). Écouté avant tout chargement.
let bloques = 0;
document.addEventListener("securitypolicyviolation", (e) => {
  bloques += 1;
  afficher("etat-bloques", String(bloques), "erreur");
  const li = document.createElement("li");
  li.textContent = `${e.effectiveDirective} : ${e.blockedURI}`;
  $("bloques").append(li);
});

// ?calcul=cpu force le processeur, pour comparer les deux modes.
const modeDemande = new URLSearchParams(location.search).get("calcul") === "cpu" ? "CPU" : "GPU";

// Le modèle se charge dès l'ouverture, en parallèle de la demande de caméra (D4 §7.3).
const moteurPret = preparerMoteur(modeDemande).then(
  (m) => {
    afficher("etat-mediapipe", `prêt en ${f(m.secondes, 1)} s (${m.simd})`, "ok");
    return m;
  },
  (e) => {
    afficher("etat-mediapipe", `échec : ${e.message ?? e}`, "erreur");
    throw e;
  },
);

// Copie réduite de l'image pour la luminance (plus grand côté : 160 px).
const toile = document.createElement("canvas");
const ctx = toile.getContext("2d", { willReadFrequently: true });

function mesurer(video, res) {
  const n = res.faceLandmarks.length;
  if (n !== 1) return { visages: n };
  const rect = rectangle(res.faceLandmarks[0]);
  const echelle = 160 / Math.max(video.videoWidth, video.videoHeight);
  toile.width = Math.round(video.videoWidth * echelle);
  toile.height = Math.round(video.videoHeight * echelle);
  ctx.drawImage(video, 0, 0, toile.width, toile.height);
  const px = ctx.getImageData(0, 0, toile.width, toile.height).data;
  return {
    visages: 1,
    largeur: largeur(rect),
    ...angles(res.facialTransformationMatrixes[0].data),
    luminance: luminance(px, toile.width, toile.height, rect),
    ...scores(res.faceBlendshapes[0].categories),
  };
}

function suivre(video, moteur) {
  const camera = creerFenetre(10000);
  const analyse10 = creerFenetre(10000);
  const analyse1 = creerFenetre(1000);
  let min10 = Infinity, max10 = 0, tempsTotal = 0, tempsMax = 0, analysees = 0, dernierAffichage = 0, premiere;

  lancerAnalyse(video, moteur, {
    image(t) {
      camera.ajouter(t);
    },
    resultat(res, t, ms) {
      analyse10.ajouter(t);
      analyse1.ajouter(t);
      if (premiere === undefined) {
        premiere = ms; // initialisation du calcul, surtout sur carte graphique : comptée à part
      } else {
        analysees += 1;
        tempsTotal += ms;
        tempsMax = Math.max(tempsMax, ms);
      }
      const c10 = analyse10.cadence();
      if (analyse10.pleine()) {
        min10 = Math.min(min10, c10);
        max10 = Math.max(max10, c10);
      }
      if (t - dernierAffichage < 250) return; // panneau rafraîchi 4 fois par seconde : ménage l'appareil
      dernierAffichage = t;
      const m = mesurer(video, res);
      const visage = m.visages === 1;
      $("mesures").textContent = [
        `Mode de calcul : ${moteur.mode === "GPU" ? "carte graphique (GPU)" : "processeur (CPU)"}${moteur.raison ? ` — repli : ${moteur.raison}` : ""}`,
        `Cadence caméra : ${camera.pleine() ? f(camera.cadence(), 1) : "mesure en cours"} im/s`,
        `Cadence analysée : ${analyse10.pleine() ? f(c10, 1) : "mesure en cours"} im/s (10 s) · ${f(analyse1.cadence())} (1 s)`,
        `Fenêtres de 10 s : min ${f(min10, 1)} · max ${f(max10, 1)} · plafond ${CADENCE_MAX}`,
        `Temps d'analyse : moyen ${f(tempsTotal / analysees)} ms · max ${f(tempsMax)} ms · 1re image ${f(premiere)} ms`,
        `Visages : ${m.visages}`,
        `Largeur : ${visage ? f(m.largeur) : "—"} %   Lacet : ${visage ? f(m.lacet) : "—"}°   Tangage : ${visage ? f(m.tangage) : "—"}°`,
        `Luminance : ${visage ? f(m.luminance) : "—"}/255`,
        `Sourire s : ${visage ? `${f(m.s, 2)} (G ${f(m.smileG, 2)} · D ${f(m.smileD, 2)})` : "—"}`,
        `cheekSquint : ${visage ? f(m.cheek, 2) : "—"}`,
      ].join("\n");
    },
    erreur(e) {
      afficher("etat-mediapipe", `analyse arrêtée : ${e.message ?? e}`, "erreur");
    },
  });
}

// iOS exige un geste avant l'accès caméra et la lecture de la vidéo (D4 RT8).
$("demarrer").addEventListener("click", async () => {
  $("demarrer").disabled = true;
  afficher("etat-camera", "demande en cours…");
  let flux;
  try {
    flux = await demarrerCamera($("video"));
  } catch (e) {
    afficher("etat-camera", e.message, "erreur");
    $("demarrer").disabled = false;
    return;
  }
  const { width, height } = flux.getVideoTracks()[0].getSettings();
  afficher("etat-camera", `active (${width} × ${height})`, "ok");
  if (!("requestVideoFrameCallback" in HTMLVideoElement.prototype)) {
    afficher("etat-mediapipe", "ce navigateur ne permet pas l'analyse image par image", "erreur");
    return;
  }
  suivre($("video"), await moteurPret);
});
