// Détection (lot L0.2) : MediaPipe Face Landmarker servi par le site (D8 n° 220), cadence plafonnée.

import { creerLimiteur } from "./cadence.js";

// Chemins absolus, construits depuis l'adresse du script : le site vit dans un sous-dossier sur GitHub Pages.
const VENDOR = new URL("../vendor/mediapipe/tasks-vision-1.0.1/", import.meta.url).href;
const MODELE = new URL("../models/face_landmarker.task", import.meta.url).href;

let vision, fichiers;

async function creer(mode) {
  vision ??= await import(`${VENDOR}vision_bundle.mjs`);
  fichiers ??= await vision.FilesetResolver.forVisionTasks(`${VENDOR}wasm`);
  return vision.FaceLandmarker.createFromOptions(fichiers, {
    baseOptions: { modelAssetPath: MODELE, delegate: mode },
    runningMode: "VIDEO",
    numFaces: 2, // deux visages = image invalide (D2 §2) : il faut pouvoir les compter
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
  });
}

// Mode de calcul par famille d'appareil (D4 Q11, D8 n° 241) : processeur sur iOS, où il est plus rapide
// et démarre plus vite (relevés L0.2) ; carte graphique ailleurs. Tous les navigateurs iOS utilisent WebKit ;
// un iPad récent se présente comme un Mac, d'où le test de l'écran tactile.
export function modeParDefaut() {
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return ios ? { mode: "CPU", choix: "par défaut sur iOS" } : { mode: "GPU", choix: "par défaut" };
}

// Crée le détecteur une seule fois par session (D4 §7.3). Sur carte graphique, un seul repli sur le processeur.
// modeDemande : "GPU" ou "CPU".
export async function preparerMoteur(modeDemande) {
  const debut = performance.now();
  const moteur = { mode: modeDemande, raison: "", detecteur: null, simd: "" };
  try {
    moteur.detecteur = await creer(modeDemande);
  } catch (e) {
    if (modeDemande !== "GPU") throw e;
    moteur.mode = "CPU";
    moteur.raison = `création sur carte graphique impossible : ${e.message ?? e}`;
    moteur.detecteur = await creer("CPU");
  }
  moteur.simd = fichiers.wasmLoaderPath.includes("nosimd") ? "sans SIMD" : "avec SIMD";
  moteur.secondes = (performance.now() - debut) / 1000;
  return moteur;
}

// ponytail: un seul repli ; si le processeur échoue aussi, l'erreur est affichée et l'analyse s'arrête.
async function replierSurCPU(moteur, erreur) {
  moteur.enRepli = true;
  moteur.detecteur.close();
  moteur.mode = "CPU";
  moteur.raison = `échec sur carte graphique à la première image : ${erreur.message ?? erreur}`;
  moteur.detecteur = await creer("CPU");
  moteur.enRepli = false;
}

// Analyse chaque image de la caméra, au plus CADENCE_MAX par seconde (D4 §5.2).
// rappels.image(t) : chaque image reçue ; rappels.resultat(res, t, ms) : chaque image analysée ;
// rappels.erreur(e).
export function lancerAnalyse(video, moteur, rappels) {
  const autoriser = creerLimiteur();
  const surImage = (maintenant) => {
    video.requestVideoFrameCallback(surImage);
    rappels.image(maintenant);
    if (moteur.enRepli || moteur.arret || !autoriser(maintenant)) return;
    const debut = performance.now();
    let res;
    try {
      res = moteur.detecteur.detectForVideo(video, maintenant);
    } catch (e) {
      if (moteur.mode === "GPU") {
        replierSurCPU(moteur, e).catch((e2) => { moteur.arret = true; rappels.erreur(e2); });
      } else {
        moteur.arret = true;
        rappels.erreur(e);
      }
      return;
    }
    rappels.resultat(res, maintenant, performance.now() - debut);
  };
  video.requestVideoFrameCallback(surImage);
}
