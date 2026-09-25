// Lot L0.1 (D6) : caméra en miroir, MediaPipe servi par le site, aucun chargement externe.

import { demarrerCamera } from "./capture.js";

const $ = (id) => document.getElementById(id);

function afficher(id, texte, classe) {
  const el = $(id);
  el.textContent = texte;
  el.className = classe ?? "";
}

// Compte les chargements externes bloqués par la politique de sécurité (D8 n° 221).
// Écouté avant tout chargement de MediaPipe. Seule tentative attendue : ses statistiques vers Google (n° 225).
let bloques = 0;
document.addEventListener("securitypolicyviolation", (e) => {
  bloques += 1;
  afficher("etat-bloques", String(bloques), "erreur");
  const li = document.createElement("li");
  li.textContent = `${e.effectiveDirective} : ${e.blockedURI}`;
  $("bloques").append(li);
});

// Chemins absolus, construits depuis l'adresse de la page : le site vit dans un sous-dossier sur GitHub Pages.
const VENDOR = new URL("../vendor/mediapipe/tasks-vision-1.0.1/", import.meta.url).href;
const MODELE = new URL("../models/face_landmarker.task", import.meta.url).href;

async function chargerMediaPipe() {
  const debut = performance.now();
  const { FilesetResolver, FaceLandmarker } = await import(`${VENDOR}vision_bundle.mjs`);
  const fichiers = await FilesetResolver.forVisionTasks(`${VENDOR}wasm`);
  // ponytail: processeur central seulement ; L0.2 essaiera d'abord la carte graphique (D4 §7.3).
  // Détecteur créé une seule fois par session (D4 §7.3, fuite de mémoire WebKit).
  const detecteur = await FaceLandmarker.createFromOptions(fichiers, {
    baseOptions: { modelAssetPath: MODELE, delegate: "CPU" },
    runningMode: "VIDEO",
    numFaces: 2,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
  });
  const secondes = ((performance.now() - debut) / 1000).toFixed(1);
  const simd = fichiers.wasmLoaderPath.includes("nosimd") ? "sans SIMD" : "avec SIMD";
  return { detecteur, secondes, simd };
}

// Le modèle se charge dès l'ouverture, en parallèle de la demande de caméra (D4 §7.3).
chargerMediaPipe().then(
  ({ secondes, simd }) => afficher("etat-mediapipe", `prêt en ${secondes} s (${simd})`, "ok"),
  (e) => afficher("etat-mediapipe", `échec : ${e.message ?? e}`, "erreur"),
);

// iOS exige un geste avant l'accès caméra et la lecture de la vidéo (D4 RT8).
$("demarrer").addEventListener("click", async () => {
  $("demarrer").disabled = true;
  afficher("etat-camera", "demande en cours…");
  try {
    const flux = await demarrerCamera($("video"));
    const { width, height } = flux.getVideoTracks()[0].getSettings();
    afficher("etat-camera", `active (${width} × ${height})`, "ok");
  } catch (e) {
    afficher("etat-camera", e.message, "erreur");
    $("demarrer").disabled = false;
  }
});
