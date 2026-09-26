// Vérification du protocole P0 (lot L0.6a) : séquences de D3, touche de l'opérateur, revue.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { SEQUENCES, dureeTotale, etapeA, toucheOperateur, operateurAVu, classerRevue } from "../app/js/protocole.js";

test("toutes les séquences de D3 §1.3.4 à §1.3.6, dans l'ordre", () => {
  assert.deepEqual(SEQUENCES.map((s) => s.code), ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "B1", "B2", "B3", "C"]);
});

test("durées de D3 : A1 60 s, A2 4 min 30, A3 60 s, A4 60 s, A5 2 × 60 s, A6 90 s, A7 2 min, C 60 s", () => {
  const d = Object.fromEntries(SEQUENCES.map((s) => [s.code, dureeTotale(s)]));
  assert.deepEqual([d.A1, d.A2, d.A3, d.A4, d.A5, d.A6, d.A7, d.C], [60, 270, 60, 60, 120, 90, 120, 60]);
  // B : neutre 30 s, parole 30 s, 2 sourires francs de 5 s (D3 §1.3.5).
  for (const c of ["B1", "B2", "B3"]) assert.equal(d[c], 80);
});

test("A6 : 3 sourires légers, 3 francs, 2 rires, 5 s chacun, séparés par 5 s de neutre", () => {
  const a6 = SEQUENCES.find((s) => s.code === "A6");
  const compte = (mot) => a6.etapes.filter(([c]) => c === mot).length;
  assert.deepEqual([compte("Sourire léger"), compte("Sourire franc"), compte("Riez")], [3, 3, 2]);
});

test("revue en fin de séquence pour A1 à A5 et B1 à B3 ; calibrage exigé avant B et C", () => {
  assert.deepEqual(SEQUENCES.filter((s) => s.revue).map((s) => s.code), ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3"]);
  assert.deepEqual(SEQUENCES.filter((s) => s.calibrageAvant).map((s) => s.code), ["B1", "B2", "B3", "C"]);
});

test("étape en cours : consigne et temps restant ; null à la fin", () => {
  const a3 = SEQUENCES.find((s) => s.code === "A3");
  assert.equal(etapeA(a3, 0).index, 0);
  assert.equal(etapeA(a3, 56).index, 1);
  assert.equal(etapeA(a3, 56).resteS, 4);
  assert.equal(etapeA(a3, 60), null);
});

// --- Touche de l'opérateur (barre d'espace) ---

const espace = (type, repeat = false) => ({ type, code: "Space", key: " ", repeat });

test("espace pendant une séquence : op, et touche bloquée (aucun bouton activé)", () => {
  assert.deepEqual(toucheOperateur(espace("keydown"), true), { op: true, bloquer: true });
});

test("espace relâchée pendant une séquence : bloquée aussi, sans op (un bouton s'active au relâchement)", () => {
  assert.deepEqual(toucheOperateur(espace("keyup"), true), { op: false, bloquer: true });
});

test("espace maintenue : compte une seule fois, les répétitions restent bloquées", () => {
  assert.deepEqual(toucheOperateur(espace("keydown", true), true), { op: false, bloquer: true });
});

test("hors séquence : l'espace garde son rôle normal ; les autres touches ne sont jamais touchées", () => {
  assert.deepEqual(toucheOperateur(espace("keydown"), false), { op: false, bloquer: false });
  assert.deepEqual(toucheOperateur({ type: "keydown", code: "Enter", key: "Enter" }, true), { op: false, bloquer: false });
});

// --- Revue ---

test("l'opérateur a vu : touche entre 0,5 s avant le début et 2 s après la confirmation", () => {
  assert.equal(operateurAVu([9600], 10000, 10600), true);
  assert.equal(operateurAVu([12500], 10000, 10600), true);
  assert.equal(operateurAVu([9400], 10000, 10600), false);
  assert.equal(operateurAVu([12700], 10000, 10600), false);
  assert.equal(operateurAVu([], 10000, 10600), false);
});

test("classement de la revue (D3 §1.3.4)", () => {
  assert.equal(classerRevue(true, false), "confirmee");
  assert.equal(classerRevue(true, true), "confirmee");
  assert.equal(classerRevue(false, false), "faux_positif");
  assert.equal(classerRevue(false, true), "litigieuse");
});
