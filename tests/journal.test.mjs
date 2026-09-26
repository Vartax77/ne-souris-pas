// Vérification du journal P0 et de son export CSV (lot L0.6a). Lancer : node --test "tests/*.test.mjs"

import { test } from "node:test";
import assert from "node:assert/strict";
import { creerJournal, COLONNES } from "../app/js/journal.js";

const NOMS_BS = Array.from({ length: 52 }, (_, k) => (k === 0 ? "_neutral" : `bs${k}`));
const bs = (v = 0.01) => Object.fromEntries(NOMS_BS.map((n) => [n, v]));
const image = (t, autre = {}) => ({
  t, seq: "A1", faces: 1, largeur: 30, lacet: 4.2, tangage: -5, smileG: 0.02, smileD: 0.03, cheekG: 0, cheekD: 0,
  lum: 125, S: 0.025, J: 0, etat: "neutre", faute: "", op: 0, evenement: "", bs: bs(), ...autre,
});
const lire = (j) => {
  const texte = j.csv();
  assert.ok(texte.startsWith("﻿"), "BOM UTF-8 pour le tableur");
  return texte.slice(1).trimEnd().split("\r\n").map((l) => l.split(";"));
};

test("en-tête : colonnes de D3 §1.4.1, puis 52 colonnes bs_", () => {
  const j = creerJournal();
  j.image(image(0));
  const [entete] = lire(j);
  assert.deepEqual(entete.slice(0, COLONNES.length), COLONNES);
  const colonnesBs = entete.slice(COLONNES.length);
  assert.equal(colonnesBs.length, 52);
  assert.ok(colonnesBs.every((c) => c.startsWith("bs_")));
});

test("une ligne par image, virgule décimale", () => {
  const j = creerJournal();
  for (let k = 0; k < 15; k++) j.image(image(k * 66.7));
  const lignes = lire(j);
  assert.equal(lignes.length, 1 + 15);
  const i = COLONNES.indexOf("lacet");
  assert.equal(lignes[1][i], "4,2");
  assert.equal(lignes[1][COLONNES.indexOf("S")], "0,025");
});

test("pause : trou de plus de 1,5 s dans la même séquence, sur la ligne qui suit", () => {
  const j = creerJournal();
  j.image(image(0));
  j.image(image(66.7));
  j.image(image(2066.7)); // 2 s sans image
  j.image(image(2133.4));
  j.image(image(5000, { seq: "A2" })); // autre séquence : pas une pause
  const p = lire(j).slice(1).map((l) => l[COLONNES.indexOf("pause")]);
  assert.deepEqual(p, ["", "", "2000", "", ""]);
});

test("événement sans image : t, seq et texte seulement ; texte avec « ; » protégé", () => {
  const j = creerJournal();
  j.evenement(1234.5, "A0", "calibrage ok n=0,00 v=0,71 d=0,29");
  j.evenement(1300, "A1", 'revue 1 ; faux_positif ; "sourire"');
  const [, l1, l2] = j.csv().slice(1).trimEnd().split("\r\n");
  assert.ok(l1.startsWith("1234,5;A0;"));
  assert.ok(l1.endsWith(";calibrage ok n=0,00 v=0,71 d=0,29"));
  assert.ok(l2.endsWith(';"revue 1 ; faux_positif ; ""sourire"""'));
});

test("lignes non exportées : comptées jusqu'à l'export", () => {
  const j = creerJournal();
  j.image(image(0));
  assert.equal(j.nonExportees(), 1);
  j.marquerExporte();
  assert.equal(j.nonExportees(), 0);
  j.image(image(66.7));
  assert.equal(j.nonExportees(), 1);
});
