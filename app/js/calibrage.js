// Calibrage R1 (D2 §4.1, lot L0.3). Fonctions pures, sans accès à la page :
// vérifiées par tests/calibrage.test.mjs, et réutilisées telles quelles par le rejeu (L0.7).
//
// Une image de calibrage : { visages, largeur, lacet, tangage, luminance, s }.
// Les mesures n'existent que si visages === 1.

import { REGLAGES } from "./reglages.js";

// Textes exacts des rejets (D5 §3.5 ; luminance : écran ER3).
export const MESSAGES = Object.freeze({
  presence: "Gardez votre visage dans l'ovale.",
  deux_visages: "Un seul visage dans le champ.",
  largeur: "Rapprochez-vous de la caméra.",
  angles: "Regardez l'écran bien en face.",
  luminance: "Pas assez de lumière. Allumez une lampe face à vous ou tournez-vous vers une fenêtre.",
  ecart_type: "Restez silencieux et immobile.",
  neutre: "Détendez votre visage, sans sourire.",
  amplitude: "Souriez franchement.",
});

const moyenne = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);

function mediane(xs) {
  if (!xs.length) return NaN;
  const t = [...xs].sort((a, b) => a - b), m = t.length >> 1;
  return t.length % 2 ? t[m] : (t[m - 1] + t[m]) / 2;
}

function ecartType(xs) {
  const m = moyenne(xs);
  return Math.sqrt(moyenne(xs.map((x) => (x - m) ** 2)));
}

// Score lissé S (D2 §2) : moyenne mobile des `fenetre` derniers scores bruts d'images valides.
// Les premières images d'une phase utilisent les scores disponibles.
export function lisser(scores, fenetre = REGLAGES.lissage) {
  return scores.map((_, i) => moyenne(scores.slice(Math.max(0, i - fenetre + 1), i + 1)));
}

const part = (images, test) => (images.length ? images.filter(test).length / images.length : 0);
const unVisage = (images) => images.filter((i) => i.visages === 1);

// Évalue les deux phases. Renvoie { ok, cause, message, n, v, d, plafonne, stats }.
// La première cause rencontrée, dans l'ordre de D2 R1 point 4, est seule retenue.
export function evaluerCalibrage(neutre, sourire, R = REGLAGES) {
  const unN = unVisage(neutre), unS = unVisage(sourire), tous = [...unN, ...unS];
  // Présence : images avec exactement un visage (D2 R1, D8 n° 239). Largeur et angles sont jugés
  // sur leurs médianes, pas dans la présence : sinon un joueur trop loin ne serait jamais averti.
  const S_N = lisser(unN.map((i) => i.s), R.lissage);
  const S_S = lisser(unS.map((i) => i.s), R.lissage);
  const stats = {
    presenceNeutre: part(neutre, (i) => i.visages === 1),
    presenceSourire: part(sourire, (i) => i.visages === 1),
    deuxVisages: Math.max(part(neutre, (i) => i.visages >= 2), part(sourire, (i) => i.visages >= 2)),
    largeur: mediane(tous.map((i) => i.largeur)),
    lacet: mediane(tous.map((i) => i.lacet)),
    tangage: mediane(tous.map((i) => i.tangage)),
    luminance: moyenne(tous.map((i) => i.luminance)),
    ecartType: ecartType(unN.map((i) => i.s)),
    n: mediane(S_N),
    v: S_S.length ? Math.max(...S_S) : NaN,
  };
  stats.amplitude = stats.v - stats.n;

  const rejet = (cause) => ({ ok: false, cause, message: MESSAGES[cause], stats });
  if (Math.min(stats.presenceNeutre, stats.presenceSourire) < R.presenceMin) {
    return rejet(stats.deuxVisages > R.deuxVisagesMax ? "deux_visages" : "presence");
  }
  if (stats.largeur < R.largeurMin) return rejet("largeur");
  if (Math.abs(stats.lacet) > R.lacetMax || Math.abs(stats.tangage) > R.tangageMax) return rejet("angles");
  if (stats.luminance < R.luminanceMin) return rejet("luminance");
  if (stats.ecartType > R.ecartTypeMax) return rejet("ecart_type");
  if (stats.n > R.neutreMax) return rejet("neutre");
  if (!(stats.amplitude >= R.amplitudeMin)) return rejet("amplitude");

  const brut = R.k * stats.amplitude;
  return {
    ok: true, cause: null, message: "", n: stats.n, v: stats.v,
    d: Math.min(brut, R.dMax), plafonne: brut > R.dMax, stats,
  };
}
