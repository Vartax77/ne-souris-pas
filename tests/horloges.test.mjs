// Vérification des horloges (lot L1.4) : aller-retour, θ, e, W, flash commun.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { allerRetour, synchroniser, versHote, creerDetecteurFlash, apparier, csvFlashs, COLONNES_FLASH } from "../app/js/horloges.js";

test("aller-retour et décalage, avec les horodatages de l'exemple de D4 §4.2", () => {
  // Hôte t1 = 20 100 ; invité t2 = 8 410,9, t3 = 8 411,2 ; hôte t4 = 20 142,3 (aller-retour de 42 ms).
  // θ = ((8 410,9 − 20 100) + (8 411,2 − 20 142,3)) / 2 = −11 710,1 ms. (Le décalage de −11 693,6 écrit dans
  // l'exemple de D4 ne découle pas de ces horodatages : exemple illustratif, à corriger dans D4.)
  const r = allerRetour({ t1: 20100, t2: 8410.9, t3: 8411.2, t4: 20142.3 });
  assert.equal(Number(r.a.toFixed(1)), 42);
  assert.equal(Number(r.theta.toFixed(2)), -11710.1);
});

test("synchronisation : l'échantillon au plus petit aller-retour ; e = a_min / 2 ; W = max(100, e + i)", () => {
  const theta = 500; // horloge de l'invité = hôte + 500 ms
  // Allers-retours de 80, 42, 120, 60, 90 ms, symétriques : θ exact sur chacun.
  const echanges = [80, 42, 120, 60, 90].map((a, k) => {
    const t1 = 1000 + k * 100;
    return { t1, t2: t1 + a / 2 + theta, t3: t1 + a / 2 + theta, t4: t1 + a };
  });
  const s = synchroniser(echanges, 12);
  assert.equal(s.aMin, 42);
  assert.equal(s.e, 21);
  assert.equal(s.theta, 500);
  assert.equal(Number(s.i.toFixed(1)), 83.3);
  assert.equal(Number(s.w.toFixed(1)), 104.3); // exemple de D4 §4.2 : W = max(100, 21 + 83) ≈ 104 ms
  assert.equal(s.echanges, 5);
});

test("W : plancher de 100 ms sur un réseau rapide ; 167 ms en 4G à 15 im/s (D4 §5.1)", () => {
  const ech = (a) => [{ t1: 0, t2: a / 2, t3: a / 2, t4: a }];
  assert.equal(synchroniser(ech(60), 15).w, 100); // e = 30, i = 66,7 : 96,7 → plancher
  assert.equal(Math.round(synchroniser(ech(200), 15).w), 167); // e = 100 + 66,7
  assert.equal(Math.round(synchroniser(ech(200), 10).w), 200);
});

test("asymétrie du réseau : l'erreur sur θ reste sous e = a_min / 2", () => {
  const theta = -300;
  // Aller 5 ms, retour 45 ms : l'estimation de θ se trompe de 20 ms, e = 25 ms la couvre.
  const s = synchroniser([{ t1: 0, t2: 5 + theta, t3: 5 + theta, t4: 50 }]);
  assert.ok(Math.abs(s.theta - theta) <= s.e);
  assert.equal(s.e, 25);
});

test("aucun échange valable → null", () => {
  assert.equal(synchroniser([]), null);
  assert.equal(synchroniser([{ t1: 10, t2: 0, t3: 0, t4: 5 }]), null); // aller-retour négatif
});

test("détecteur de flash : saut au-delà du seuil, sens, période réfractaire", () => {
  const d = creerDetecteurFlash(40, 500);
  const suite = [[0, 20], [66, 22], [133, 200], [200, 205], [266, 30], [800, 25], [866, 210]];
  const sauts = suite.map(([t, l]) => d(t, l)).filter(Boolean);
  // 133 : clair ; 266 : sombre ignoré (réfractaire, moins de 500 ms) ; 866 : clair.
  assert.deepEqual(sauts, [{ t: 133, sens: "clair" }, { t: 866, sens: "clair" }]);
});

test("appariement : même sens, conversion par θ, écart signé ; flash sans pair ignoré", () => {
  const theta = 1000;
  const hote = [{ t: 5000, sens: "clair" }, { t: 7000, sens: "sombre" }, { t: 9000, sens: "clair" }];
  const invite = [{ t: 6030, sens: "clair" }, { t: 7990, sens: "sombre" }, { t: 20000, sens: "clair" }];
  const p = apparier(hote, invite, theta);
  assert.deepEqual(p.map((x) => x.ecart), [-30, 10]);
  assert.equal(versHote(6030, theta), 5030);
});

test("journal des flashs : colonnes de D3 §2.4, virgule décimale", () => {
  const csv = csvFlashs([{ combi: "R6", numero: 1, ecart_ms: -12.345, e_ms: 0.5, i_ms: 66.667, w_ms: 100, a_min_ms: 1, sens: "clair", dans_e_plus_i: 1 }]);
  const [entete, ligne] = csv.replace("﻿", "").split("\r\n");
  assert.deepEqual(entete.split(";"), COLONNES_FLASH);
  assert.equal(ligne.split(";")[2], "-12,35");
});
