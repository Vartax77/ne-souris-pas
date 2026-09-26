// Vérification du calibrage R1 (lot L0.3). Lancer depuis la racine du dépôt : node --test "tests/*.test.mjs"
// Hors de app/ : jamais publié sur GitHub Pages.
//
// Séquences construites à partir des relevés réels du PC (D3 §1.7.3, D8 n° 244) :
// calibrage réussi n 0,00 · v 0,63 · d 0,25 ; neutre s 0,00 (écart-type 0,002) ; sourire franc jusqu'à 0,63-0,69 ;
// largeur 30 % de face, 13 % à un mètre ; lacet 29° tête tournée ; luminance 116 à 134 ; 43 + 25 images ;
// caméra 29 im/s en journée, 14,8 le soir avec lampe, 10 dans une pièce presque noire (luminance 76 à 86).

import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluerCalibrage, lisser, MESSAGES } from "../app/js/calibrage.js";
import { REGLAGES } from "../app/js/reglages.js";

const proche = (a, b, msg, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${msg} : ${a} au lieu de ${b}`);

// Image type, tirée du calibrage réel réussi.
const image = (s, autre = {}) => ({ visages: 1, largeur: 30, lacet: 4, tangage: 5, luminance: 125, s, ...autre });
// Phase neutre : 43 images, s 0,00 ± 0,002 (écart-type relevé : 0,002).
const neutre = (autre = {}) => Array.from({ length: 43 }, (_, i) => image(i % 2 ? 0.004 : 0.0, autre));
// Phase sourire : 25 images, montée progressive jusqu'au pic (relevé : 0,63).
const sourire = (pic = 0.63, autre = {}) =>
  Array.from({ length: 25 }, (_, i) => image(Math.min(pic, i * 0.08), autre));
const JOUR = { cadenceCamera: 29 };

const rejete = (cause, r) => {
  assert.equal(r.ok, false, `réussi au lieu de « ${MESSAGES[cause]} »`);
  assert.equal(r.cause, cause, `« ${r.message} » au lieu de « ${MESSAGES[cause]} »`);
  assert.equal(r.message, MESSAGES[cause]);
};

test("succès : le calibrage réel du PC (n 0,00 · v 0,63 · d 0,25, non plafonné)", () => {
  const r = evaluerCalibrage(neutre(), sourire(0.63), REGLAGES, JOUR);
  assert.equal(r.ok, true, r.message);
  proche(r.n, 0.0013, "n", 0.002);
  proche(r.v, 0.63, "v");
  proche(r.d, REGLAGES.k * (r.v - r.n), "d");
  proche(r.d, 0.25, "d arrondi", 0.005);
  assert.equal(r.plafonne, false);
});

test("lissage : moyenne des 3 dernières valeurs, fenêtre partielle au début", () => {
  const S = lisser([0, 0.3, 0.6, 0.9]);
  [0, 0.15, 0.3, 0.6].forEach((x, i) => proche(S[i], x, `S${i}`));
});

// --- Deux visages et présence (défaut 1, D8 n° 245) ---

test("deux visages pendant tout le calibrage → « Un seul visage »", () => {
  rejete("deux_visages", evaluerCalibrage(neutre().map(() => ({ visages: 2 })), sourire(), REGLAGES, JOUR));
});

test("défaut 1, cas limite : 8 % à deux visages et 5 % sans visage → « Un seul visage »", () => {
  const n = neutre();
  for (let i = 0; i < 3; i++) n[i] = { visages: 2 }; // 3/43 ≈ 7 %
  for (let i = 3; i < 5; i++) n[i] = { visages: 0 }; // 2/43 ≈ 5 %
  rejete("deux_visages", evaluerCalibrage(n, sourire(), REGLAGES, JOUR));
});

test("présence, cas limite inverse : 3 % à deux visages et 10 % sans visage → présence", () => {
  const n = neutre();
  n[0] = { visages: 2 }; // 1/43 ≈ 2 %
  for (let i = 1; i < 6; i++) n[i] = { visages: 0 }; // 5/43 ≈ 12 %
  rejete("presence", evaluerCalibrage(n, sourire(), REGLAGES, JOUR));
});

test("présence : 1 s hors champ en phase neutre (14 images sur 43)", () => {
  const n = neutre();
  for (let i = 10; i < 24; i++) n[i] = { visages: 0 };
  rejete("presence", evaluerCalibrage(n, sourire(), REGLAGES, JOUR));
});

// --- Placement ---

test("largeur : à un mètre, 13 %", () => {
  rejete("largeur", evaluerCalibrage(neutre({ largeur: 13 }), sourire(0.63, { largeur: 13 }), REGLAGES, JOUR));
});

test("angles : tête tournée vers la gauche, lacet 29°", () => {
  rejete("angles", evaluerCalibrage(neutre({ lacet: 29 }), sourire(0.63, { lacet: 29 }), REGLAGES, JOUR));
});

// --- Pièce sombre (défaut 2, D8 n° 247) ---

test("défaut 2 : pièce presque noire, luminance 76 à 86, caméra 10 im/s → ER3", () => {
  const sombre = (i, k) => ({ ...i, luminance: 76 + (k % 11) });
  rejete("sombre", evaluerCalibrage(neutre().map(sombre), sourire().map(sombre), REGLAGES, { cadenceCamera: 10 }));
});

test("soir avec lampe (captures de 21 h) : luminance 114, caméra 14,8 im/s → réussi, pas de faux rejet", () => {
  const r = evaluerCalibrage(neutre({ luminance: 114 }), sourire(0.63, { luminance: 114 }), REGLAGES, { cadenceCamera: 14.8 });
  assert.equal(r.ok, true, r.message);
});

test("filet de luminance : luminance 50, caméra à 30 im/s → ER3", () => {
  rejete("sombre", evaluerCalibrage(neutre({ luminance: 50 }), sourire(0.63, { luminance: 50 }), REGLAGES, { cadenceCamera: 30 }));
});

// --- Neutre, parole, amplitude (défaut 3, D8 n° 246, n° 248) ---

test("défaut 3 : sourire tenu qui fluctue (0,60 ± 0,06) → « Détendez votre visage »", () => {
  const tenu = (_, k) => image(k % 2 ? 0.66 : 0.54);
  const n = Array.from({ length: 43 }, tenu), s = Array.from({ length: 25 }, tenu);
  const r = evaluerCalibrage(n, s, REGLAGES, JOUR);
  assert.ok(r.stats.ecartType > REGLAGES.ecartTypeMax, `écart-type ${r.stats.ecartType}`);
  rejete("neutre", r);
});

test("parole marquée : s alterne 0,00 / 0,15 en phase neutre (écart-type 0,075) → « Restez silencieux »", () => {
  const n = Array.from({ length: 43 }, (_, k) => image(k % 2 ? 0.15 : 0.0));
  rejete("ecart_type", evaluerCalibrage(n, sourire(), REGLAGES, JOUR));
});

test("parole discrète : s alterne 0,00 / 0,05 (écart-type 0,025) → réussi, n non faussé (n° 248)", () => {
  const n = Array.from({ length: 43 }, (_, k) => image(k % 2 ? 0.05 : 0.0));
  const r = evaluerCalibrage(n, sourire(), REGLAGES, JOUR);
  assert.equal(r.ok, true, r.message);
  assert.ok(r.n < 0.05, `n = ${r.n}`);
});

test("amplitude : neutre pendant la phase sourire → « Souriez franchement »", () => {
  rejete("amplitude", evaluerCalibrage(neutre(), neutre().slice(0, 25), REGLAGES, JOUR));
});

// --- Plafond d_max (dépassé si v − n > 0,875) ---

test("sourire exagéré sous le seuil : v − n = 0,80 → d = 0,32, non plafonné", () => {
  const n = Array.from({ length: 43 }, () => image(0));
  const r = evaluerCalibrage(n, sourire(0.8), REGLAGES, JOUR);
  assert.equal(r.plafonne, false);
  proche(r.d, 0.32, "d");
});

test("sourire exagéré au-dessus : v − n = 0,90 → plafonné à 0,35", () => {
  const n = Array.from({ length: 43 }, () => image(0));
  const r = evaluerCalibrage(n, sourire(0.9), REGLAGES, JOUR);
  assert.equal(r.plafonne, true);
  proche(r.d, REGLAGES.dMax, "d");
});

// --- Ordre et robustesse ---

test("ordre : loin, sombre et sans sourire à la fois → seule la largeur", () => {
  const trop = { largeur: 13, luminance: 50 };
  rejete("largeur", evaluerCalibrage(neutre(trop), neutre(trop).slice(0, 25), REGLAGES, { cadenceCamera: 10 }));
});

test("phase vide (caméra coupée) : rejet de présence, pas d'erreur", () => {
  rejete("presence", evaluerCalibrage(neutre(), [], REGLAGES, JOUR));
});
