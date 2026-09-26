// Vérification de l'arbitrage en manche, R2 et R3 (lot L0.4). Lancer : node --test "tests/*.test.mjs"
// Hors de app/ : jamais publié sur GitHub Pages.
//
// Séquences construites à partir des relevés (D3 §1.7.2, §1.7.3) : neutre s 0,00 ; sourire franc 0,63 à 0,69 ;
// sourire léger 0,23 ; parole jusqu'à 0,25 en médiane pendant « cheese, iii » ; 15 images/s.

import { test } from "node:test";
import assert from "node:assert/strict";
import { imageValide, etatImage, jauge, creerLissage, creerSuiviSourire, creerPicSoutenu } from "../app/js/arbitrage.js";
import { REGLAGES } from "../app/js/reglages.js";

const proche = (a, b, msg, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${msg} : ${a} au lieu de ${b}`);
const PAS = 1000 / 15; // une image à 15 im/s
const valide = { visages: 1, largeur: 30, lacet: 4, tangage: 5 };

// Rejoue une suite de scores bruts (null = image invalide) comme le fait la page :
// lissage des images valides, état, suivi des séries. Renvoie les sourires confirmés.
function manche(scores, { n = 0, d = 0.25, t0 = 0 } = {}) {
  const lisser = creerLissage();
  const suivi = creerSuiviSourire(t0);
  const sourires = [];
  scores.forEach((s, k) => {
    const t = t0 + k * PAS;
    if (s === null) return void suivi.image(t, false, NaN);
    const S = lisser(s);
    const ev = suivi.image(t, etatImage(S, { n, d }) === "souriant", S);
    if (ev) sourires.push(ev);
  });
  return sourires;
}
const repete = (s, ms) => Array.from({ length: Math.round(ms / PAS) }, () => s);
const neutre = (ms) => repete(0.0, ms);

test("sourire franc 0,66 tenu 1 s : 1 sourire confirmé, daté de sa première image souriante", () => {
  const sc = [...neutre(1000), ...repete(0.66, 1000), ...neutre(1000)];
  const r = manche(sc);
  assert.equal(r.length, 1);
  // Lissage sur 3 images : la première image souriante est la 2e du sourire (0 + 0,66 + 0,66 → 0,44).
  proche(r[0].debut, 16 * PAS, "début");
  assert.ok(r[0].fin - r[0].debut >= REGLAGES.maintienMs);
});

test("sourire de 300 ms : aucun", () => {
  assert.equal(manche([...neutre(1000), ...repete(0.66, 300), ...neutre(1000)]).length, 0);
});

test("deux images souriantes espacées de 600 ms : aucun (3 images minimum)", () => {
  const suivi = creerSuiviSourire(0);
  assert.equal(suivi.image(0, true, 0.6), null);
  assert.equal(suivi.image(600, true, 0.6), null);
});

test("une image en doute au milieu d'une série : tolérée, sourire confirmé", () => {
  const suivi = creerSuiviSourire(0);
  const etats = [true, true, true, false, true, true, true, true, true];
  const evs = etats.map((s, k) => suivi.image(k * PAS, s, 0.5)).filter(Boolean);
  assert.equal(evs.length, 1);
});

test("deux images non souriantes consécutives : série cassée, aucun", () => {
  const suivi = creerSuiviSourire(0);
  const etats = [true, true, true, true, false, false, true, true, true, true];
  assert.equal(etats.map((s, k) => suivi.image(k * PAS, s, 0.5)).filter(Boolean).length, 0);
});

test("une seule tolérance par série : deux creux isolés cassent la série", () => {
  const suivi = creerSuiviSourire(0);
  const etats = [true, true, false, true, true, false, true, true, true];
  assert.equal(etats.map((s, k) => suivi.image(k * PAS, s, 0.5)).filter(Boolean).length, 0);
});

test("une image invalide (deux visages) au milieu : tolérée une fois", () => {
  const sc = [...repete(0.66, 400), null, ...repete(0.66, 400)];
  assert.equal(manche(sc).length, 1);
});

test("validité en manche : un visage, largeur et angles dans les limites (D2 §2)", () => {
  assert.equal(imageValide(valide), true);
  assert.equal(imageValide({ ...valide, visages: 2 }), false);
  assert.equal(imageValide({ ...valide, largeur: 13 }), false);
  assert.equal(imageValide({ ...valide, lacet: -29 }), false);
  assert.equal(imageValide({ ...valide, tangage: 21 }), false);
});

test("jauge : 0 % à n + m, 100 % à n + d, plafonnée au-delà", () => {
  const c = { n: 0.02, d: 0.25 };
  proche(jauge(0.02 + REGLAGES.m, c), 0, "à n + m");
  proche(jauge(0.02 + 0.25, c), 1, "à n + d");
  proche(jauge(0.9, c), 1, "au-delà");
  proche(jauge(0.0, c), 0, "sous n");
  assert.equal(etatImage(0.05, c), "neutre");
  assert.equal(etatImage(0.2, c), "doute");
  assert.equal(etatImage(0.27, c), "souriant");
});

// --- Parole (relevés L0.3 ; D8 n° 254 à 258) ---

test("« iii » tenu 1 s à S 0,25 avec d 0,18 (v timide) : faute", () => {
  assert.equal(manche([...neutre(500), ...repete(0.25, 1000), ...neutre(500)], { d: 0.18 }).length, 1);
});

test("même mot avec d 0,32 (v franc) : aucune faute", () => {
  assert.equal(manche([...neutre(500), ...repete(0.25, 1000), ...neutre(500)], { d: 0.32 }).length, 0);
});

// Syllabes de 200 ms (3 images) à 0,30, séparées par des pauses à 0,05.
const syllabes = (pauseImages, nb = 6) =>
  Array.from({ length: nb }, () => [0.3, 0.3, 0.3, ...Array(pauseImages).fill(0.05)]).flat();

test("syllabes de 200 ms, pauses d'une image (67 ms), d 0,18 : faute — le lissage les enchaîne", () => {
  const lisser = creerLissage();
  const S = syllabes(1).map((s) => lisser(s));
  assert.ok(Math.min(...S.slice(3)) >= 0.18, `S descend à ${Math.min(...S.slice(3))}`);
  assert.equal(manche(syllabes(1), { d: 0.18 }).length, 1);
});

test("mêmes syllabes, pauses de deux images (133 ms) : aucune faute", () => {
  assert.equal(manche(syllabes(2), { d: 0.18 }).length, 0);
});

// --- Pic soutenu P (D3 §1.5.1) ---

test("pic soutenu : le plateau le plus haut tenu 500 ms ; un pic d'une image ne compte pas", () => {
  const p = creerPicSoutenu();
  const xs = [...repete(0.1, 1000), 0.9, ...repete(0.1, 300), ...repete(0.4, 600), ...repete(0.1, 500)];
  xs.forEach((x, k) => p.ajouter(k * PAS, x));
  proche(p.valeur(), 0.4, "P");
});

test("pic soutenu : une image invalide rompt le tronçon", () => {
  const p = creerPicSoutenu();
  repete(0.4, 300).forEach((x, k) => p.ajouter(k * PAS, x));
  p.rompre();
  repete(0.4, 300).forEach((x, k) => p.ajouter(400 + k * PAS, x));
  assert.ok(Number.isNaN(p.valeur()), `P = ${p.valeur()}`);
});

// --- Variante et t0 ---

test("variante cheekSquint à 0 : aucun sourire, même franc", () => {
  const cheek = 0; // relevés L0.2 et L0.3 : cheekSquint reste à 0
  const s = (brut) => (cheek >= REGLAGES.plancherCheek ? brut : 0);
  assert.equal(manche(repete(0.66, 1500).map(s)).length, 0);
});

test("images antérieures à t0 : ne commencent pas de série", () => {
  const suivi = creerSuiviSourire(1000);
  const evs = [];
  for (let k = 0; k < 20; k++) evs.push(suivi.image(500 + k * PAS, true, 0.6)); // 500 à ~1770 ms
  const ev = evs.find(Boolean);
  assert.ok(ev, "le sourire commencé après t0 est confirmé");
  assert.ok(ev.debut >= 1000, `début ${ev.debut}`);
});
