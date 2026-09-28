// Vérification du canal de jeu (lot L1.3) : enveloppe, battement, silence de 3 s, retour, version.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { creerCanal, BATTEMENT_MS, INJOIGNABLE_MS } from "../app/js/canal.js";
import { VERSION } from "../app/js/salon.js";

function horlogeSimulee() {
  let t = 1000;
  const m = [];
  return {
    maintenant: () => t,
    minuterie(fn, ms) { const x = { a: t + ms, fn }; m.push(x); return () => { x.annulee = true; }; },
    avancer(ms) {
      const fin = t + ms;
      for (;;) {
        const x = m.filter((y) => !y.annulee && !y.fait && y.a <= fin).sort((p, q) => p.a - q.a)[0];
        if (!x) break;
        t = x.a; x.fait = true; x.fn();
      }
      t = fin;
    },
  };
}

function canalDeTest() {
  const h = horlogeSimulee(), envoyes = [], evenements = [];
  const canal = creerCanal({ envoyer: (m) => envoyes.push(m), horloge: h, surEvenement: (nom, info) => evenements.push({ nom, ...info }) });
  return { h, canal, envoyes, evenements };
}

test("enveloppe de D4 §4.2 : v, type, seq croissant par émetteur, t sur l'horloge monotone, data", () => {
  const { h, canal, envoyes } = canalDeTest();
  canal.envoyer("bonjour", { role: "hote" });
  h.avancer(250);
  canal.envoyer("sync_ping", { t1: 1250 });
  assert.deepEqual(envoyes[0], { v: VERSION, type: "bonjour", seq: 0, t: 1000, data: { role: "hote" } });
  assert.deepEqual(envoyes[1], { v: VERSION, type: "sync_ping", seq: 1, t: 1250, data: { t1: 1250 } });
});

test("battement chaque seconde ; les battements reçus ne remontent pas comme messages", () => {
  const { h, canal, envoyes, evenements } = canalDeTest();
  canal.demarrer();
  h.avancer(3 * BATTEMENT_MS);
  assert.equal(envoyes.filter((m) => m.type === "battement").length, 3);
  canal.recevoir({ v: VERSION, type: "battement", seq: 0, t: 5 });
  canal.recevoir({ v: VERSION, type: "sync_pong", seq: 1, t: 6, data: {} });
  assert.deepEqual(evenements.map((e) => e.nom), ["message"]);
});

test("adversaire injoignable après 3 s sans aucun message, une seule fois ; retour au premier message", () => {
  const { h, canal, evenements } = canalDeTest();
  canal.demarrer();
  h.avancer(INJOIGNABLE_MS); // 3 s pile : pas encore
  assert.equal(evenements.length, 0);
  h.avancer(1000);
  assert.deepEqual(evenements.map((e) => e.nom), ["injoignable"]);
  assert.equal(evenements[0].depuis, 1000);
  h.avancer(10000);
  assert.equal(evenements.length, 1);
  canal.recevoir({ v: VERSION, type: "battement", seq: 9, t: 0 });
  assert.equal(evenements[1].nom, "revenu");
  assert.equal(evenements[1].duree, 14000);
  assert.ok(!canal.injoignable());
});

test("messages réguliers : jamais injoignable", () => {
  const { h, canal, evenements } = canalDeTest();
  canal.demarrer();
  for (let i = 0; i < 20; i += 1) { h.avancer(1000); canal.recevoir({ v: VERSION, type: "battement", seq: i, t: 0 }); }
  assert.equal(evenements.length, 0);
});

test("version différente : signalée une seule fois (ER9), message ignoré", () => {
  const { canal, evenements } = canalDeTest();
  canal.recevoir({ v: VERSION + 1, type: "bonjour", seq: 0, t: 0 });
  canal.recevoir({ v: VERSION + 1, type: "battement", seq: 1, t: 0 });
  assert.deepEqual(evenements, [{ nom: "version", autre: VERSION + 1 }]);
});
