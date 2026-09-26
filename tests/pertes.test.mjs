// Vérification de R4 (visage perdu), des pauses d'analyse et du choix de l'image de preuve R7 (lot L0.5).
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié sur GitHub Pages.

import { test } from "node:test";
import assert from "node:assert/strict";
import { creerSuiviPertes } from "../app/js/pertes.js";
import { creerPreuve } from "../app/js/preuve.js";
import { creerCompteurPauses } from "../app/js/cadence.js";

const PAS = 1000 / 15; // une image à 15 im/s
const proche = (a, b, msg, tol = PAS) => assert.ok(Math.abs(a - b) <= tol, `${msg} : ${a} au lieu de ${b}`);

// Rejoue une suite de segments { ms, valide } ou { pause: ms } (aucune image) à partir de t0 = 0.
// Renvoie les événements et l'instant de début de chaque segment.
function rejouer(segments) {
  const suivi = creerSuiviPertes(0);
  const evs = [], debuts = [];
  let t = 0;
  for (const seg of segments) {
    debuts.push(t);
    if (seg.pause) { t += seg.pause; continue; }
    const n = Math.round(seg.ms / PAS);
    for (let k = 0; k < n; k++, t += PAS) evs.push(...suivi.image(t, seg.valide));
  }
  return { evs, debuts, suivi };
}
const V = (ms) => ({ ms, valide: true });
const I = (ms) => ({ ms, valide: false });

test("sortie du champ 1 s : rien", () => {
  assert.deepEqual(rejouer([V(1000), I(1000), V(1000)]).evs, []);
});

test("sortie du champ 2 s : avertissement, daté au début de la perte + 1,5 s", () => {
  const { evs, debuts } = rejouer([V(1000), I(2000), V(1000)]);
  assert.equal(evs.length, 1);
  assert.equal(evs[0].type, "avertissement");
  proche(evs[0].t, debuts[1] + 1500, "horodatage");
});

test("deux sorties de 2 s : avertissement, puis faute datée au début de la 2e + 1,5 s", () => {
  const { evs, debuts } = rejouer([V(1000), I(2000), V(2000), I(2000), V(1000)]);
  assert.deepEqual(evs.map((e) => e.type), ["avertissement", "faute"]);
  proche(evs[1].t, debuts[3] + 1500, "faute");
});

test("sortie continue de 6 s : avertissement à + 1,5 s, faute à + 5 s", () => {
  const { evs, debuts } = rejouer([V(1000), I(6000), V(1000)]);
  assert.deepEqual(evs.map((e) => e.type), ["avertissement", "faute"]);
  proche(evs[0].t, debuts[1] + 1500, "avertissement");
  proche(evs[1].t, debuts[1] + 5000, "faute");
});

test("deux visages pendant 2 s : image invalide, avertissement", () => {
  // Les deux visages rendent l'image invalide (imageValide, arbitrage.js) : même traitement qu'une sortie.
  assert.equal(rejouer([V(1000), I(2000), V(500)]).evs[0].type, "avertissement");
});

// --- Pauses d'analyse (D8 n° 253, n° 262, n° 266) ---

test("pause de 6 s, puis image valide : avertissement et faute datés depuis la dernière image reçue", () => {
  const { evs, debuts } = rejouer([V(1000), { pause: 6000 }, V(1000)]);
  const derniere = debuts[1] - PAS; // dernière image avant la pause
  assert.deepEqual(evs.map((e) => e.type), ["avertissement", "faute"]);
  proche(evs[0].t, derniere + 1500, "avertissement", 1);
  proche(evs[1].t, derniere + 5000, "faute", 1);
  proche(evs[1].pauseMs, 6000 + PAS, "durée de la pause", 1);
});

test("pause de 1 s : rien", () => {
  assert.deepEqual(rejouer([V(1000), { pause: 1000 }, V(1000)]).evs, []);
});

test("pause de 2 s : avertissement", () => {
  assert.deepEqual(rejouer([V(1000), { pause: 2000 }, V(1000)]).evs.map((e) => e.type), ["avertissement"]);
});

test("verifier(t) sans image, page visible : perte constatée en direct, datée à la dernière image", () => {
  const suivi = creerSuiviPertes(0);
  suivi.image(0, true);
  suivi.image(1000, true);
  assert.deepEqual(suivi.verifier(2000), []); // 1 s sans image : rien encore
  const evs = suivi.verifier(2600); // 1,6 s sans image
  assert.equal(evs.length, 1);
  assert.equal(evs[0].type, "avertissement");
  assert.equal(evs[0].debut, 1000);
  assert.deepEqual(suivi.verifier(5000), []); // déjà comptée
  assert.equal(suivi.verifier(6100)[0].type, "faute"); // plus de 5 s depuis 1000
});

test("perte en cours à t0 : commence à t0", () => {
  const suivi = creerSuiviPertes(1000);
  assert.deepEqual(suivi.image(900, false), []); // avant t0 : ignorée
  const evs = [];
  for (let t = 1000; t <= 2600; t += PAS) evs.push(...suivi.image(t, false));
  assert.equal(evs[0].debut, 1000);
});

test("nouvelle manche : compteur remis à zéro", () => {
  const { suivi } = rejouer([V(1000), I(2000), V(1000)]);
  assert.equal(suivi.comptees(), 1);
  const nouvelle = rejouer([V(1000), I(2000), V(1000)]);
  assert.deepEqual(nouvelle.evs.map((e) => e.type), ["avertissement"]); // pas de faute : compteur neuf
});

// --- Compteur de pauses (statistiques de cadence) ---

test("compteur de pauses : deux trous de 2 s et 7 s comptés, le trou de 1 s non", () => {
  const p = creerCompteurPauses(1500);
  let t = 0;
  const avancer = (ms) => { for (const fin = t + ms; t < fin; t += PAS) p.ajouter(t); };
  avancer(1000); t += 2000; avancer(1000); t += 1000; avancer(1000); t += 7000; avancer(1000);
  const st = p.stats();
  assert.equal(st.nombre, 2);
  proche(st.totalMs, 9000 + 2 * PAS, "total", 2 * PAS);
  proche(st.plusLongueMs, 7000 + PAS, "plus longue", PAS);
});

// --- Image de preuve (R7) ---

test("preuve : garde l'image au S maximal de la série", () => {
  let n = 0;
  const preuve = creerPreuve(() => ++n); // chaque capture = un numéro
  preuve.souriante(0.3); // image 1
  preuve.souriante(0.6); // image 2
  preuve.confirmer();
  preuve.souriante(0.5); // pas meilleure : pas de capture
  preuve.souriante(0.7); // image 3, meilleure : la preuve suit
  preuve.finSerie();
  assert.deepEqual(preuve.valeur(), { image: 3, s: 0.7 });
});

test("preuve : série cassée sans confirmation, image jetée ; la preuve précédente reste", () => {
  let n = 0;
  const preuve = creerPreuve(() => ++n);
  preuve.souriante(0.6);
  preuve.confirmer();
  preuve.finSerie(); // preuve = image 1
  preuve.souriante(0.9); // nouvelle série, image 2
  preuve.finSerie(); // non confirmée : jetée
  assert.deepEqual(preuve.valeur(), { image: 1, s: 0.6 });
  preuve.effacer();
  assert.equal(preuve.valeur().image, null);
});

// --- Durée de pause affichée (relevés L0.5, D8 n° 270) ---

test("PC : faute créée par la minuterie pendant la pause, puis reprise : pauseMs = durée totale", () => {
  const suivi = creerSuiviPertes(0);
  suivi.image(16900, true); // dernière image avant la réduction de Chrome
  assert.equal(suivi.verifier(18500)[0].type, "avertissement");
  const faute = suivi.verifier(22300)[0]; // minuterie ralentie à 1 s : faute vue à + 5,4 s
  assert.equal(faute.type, "faute");
  assert.equal(faute.t, 21900); // datée à + 5 s
  proche(faute.pauseMs, 5400, "pause vue à la création", 1);
  suivi.image(24500, true); // reprise après 7,6 s sans image
  proche(faute.pauseMs, 7600, "pause totale à la reprise", 1);
  assert.equal(faute.pauseAuDebut, true);
});

test("iPhone : perte ouverte par des images invalides, puis pause : faute à + 5 s, « dont X s de pause »", () => {
  const suivi = creerSuiviPertes(0);
  suivi.image(15000, true);
  const evs = [];
  const invalides = [0, 1, 2, 3, 4, 5].map((k) => 15600 + k * PAS); // regard vers l'écran d'accueil
  for (const t of invalides) evs.push(...suivi.image(t, false));
  const derniere = invalides.at(-1);
  evs.push(...suivi.image(derniere + 5000, true)); // retour dans Safari après 5 s sans image
  const faute = evs.find((e) => e.type === "faute");
  assert.equal(faute.t, 15600 + 5000);
  assert.equal(faute.pauseAuDebut, false);
  proche(faute.pauseMs, 5000, "pause dans la perte", 1);
});
