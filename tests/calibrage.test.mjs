// Vérification du calibrage R1 (lot L0.3). Lancer depuis la racine du dépôt : node --test tests/
// Hors de app/ : jamais publié sur GitHub Pages.

import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluerCalibrage, lisser, MESSAGES } from "../app/js/calibrage.js";
import { REGLAGES } from "../app/js/reglages.js";

const proche = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-9, `${msg} : ${a} au lieu de ${b}`);

// Image type d'un joueur bien placé : de face, à 50 cm, pièce éclairée (valeurs proches des relevés L0.2).
const image = (s, autre = {}) => ({ visages: 1, largeur: 26, lacet: 2, tangage: 4, luminance: 128, s, ...autre });
// Phase neutre : 45 images (3 s à 15 im/s) ; phase sourire : 30 images, montée progressive jusqu'à `pic`.
const neutreOk = (s = 0.02) => Array.from({ length: 45 }, () => image(s));
const sourireOk = (pic = 0.7) => Array.from({ length: 30 }, (_, i) => image(Math.min(pic, 0.1 + i * 0.05)));

test("calibrage normal : réussi, n, v, d = k × (v − n)", () => {
  const r = evaluerCalibrage(neutreOk(), sourireOk(0.7));
  assert.equal(r.ok, true, r.message);
  proche(r.n, 0.02, "n (médiane de S en phase neutre)");
  proche(r.v, 0.7, "v (maximum de S en phase sourire)");
  proche(r.d, REGLAGES.k * (0.7 - 0.02), "d");
  assert.equal(r.plafonne, false);
});

test("lissage : moyenne des 3 dernières valeurs, fenêtre partielle au début", () => {
  const S = lisser([0, 0.3, 0.6, 0.9]);
  proche(S[0], 0, "S0");
  proche(S[1], 0.15, "S1");
  proche(S[2], 0.3, "S2");
  proche(S[3], 0.6, "S3");
});

test("v se lit sur le score lissé : un pic d'une seule image est divisé par 3", () => {
  const sourire = Array.from({ length: 30 }, () => image(0.05));
  sourire[15] = image(0.9); // image bruitée isolée
  const r = evaluerCalibrage(neutreOk(), sourire);
  proche(r.stats.v, (0.05 + 0.05 + 0.9) / 3, "v");
});

// Une cause par test, dans l'ordre de D2 R1 point 4.
const cas = [
  ["presence", () => {
    const n = neutreOk();
    for (let i = 0; i < 6; i++) n[i] = { visages: 0 }; // 6/45 = 13 % sans visage
    return [n, sourireOk()];
  }],
  ["deux_visages", () => {
    const n = neutreOk();
    for (let i = 0; i < 6; i++) n[i] = { visages: 2 };
    return [n, sourireOk()];
  }],
  ["largeur", () => [neutreOk().map((i) => ({ ...i, largeur: 15 })), sourireOk().map((i) => ({ ...i, largeur: 15 }))]],
  ["angles", () => [neutreOk().map((i) => ({ ...i, lacet: 30 })), sourireOk().map((i) => ({ ...i, lacet: 30 }))]],
  ["angles", () => [neutreOk().map((i) => ({ ...i, tangage: -25 })), sourireOk().map((i) => ({ ...i, tangage: -25 }))]],
  ["luminance", () => [neutreOk().map((i) => ({ ...i, luminance: 40 })), sourireOk().map((i) => ({ ...i, luminance: 40 }))]],
  ["ecart_type", () => [neutreOk().map((i, k) => ({ ...i, s: k % 2 ? 0.25 : 0.02 })), sourireOk()]], // parole
  ["neutre", () => [neutreOk(0.6), sourireOk(0.9)]], // sourire franc tenu pendant les deux phases
  ["amplitude", () => [neutreOk(), sourireOk(0.1)]], // aucun sourire en phase sourire
];

for (const [cause, fabriquer] of cas) {
  test(`rejet : ${cause} → « ${MESSAGES[cause]} »`, () => {
    const r = evaluerCalibrage(...fabriquer());
    assert.equal(r.ok, false);
    assert.equal(r.cause, cause);
    assert.equal(r.message, MESSAGES[cause]);
  });
}

test("ordre : seule la première cause rencontrée est retenue", () => {
  // Trop loin, trop sombre et pas de sourire à la fois : la largeur passe en premier.
  const trop = (i) => ({ ...i, largeur: 15, luminance: 40 });
  const r = evaluerCalibrage(neutreOk().map(trop), sourireOk(0.1).map(trop));
  assert.equal(r.cause, "largeur");
});

test("présence : un joueur trop loin est averti par la largeur, pas par la présence (D8 n° 239)", () => {
  const loin = (i) => ({ ...i, largeur: 14 });
  const r = evaluerCalibrage(neutreOk().map(loin), sourireOk().map(loin));
  assert.equal(r.stats.presenceNeutre, 1);
  assert.equal(r.cause, "largeur");
});

test("d_max : sourire volontaire exagéré, seuil plafonné", () => {
  const r = evaluerCalibrage(neutreOk(0.0), sourireOk(1.0));
  assert.equal(r.ok, true);
  assert.equal(r.plafonne, true);
  proche(r.d, REGLAGES.dMax, "d plafonné");
});

test("phase vide (caméra coupée) : rejet de présence, pas d'erreur", () => {
  const r = evaluerCalibrage(neutreOk(), []);
  assert.equal(r.cause, "presence");
});
