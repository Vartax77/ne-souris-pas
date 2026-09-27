// Vérification de la session performance (lot L0.6b) : fenêtres de 10 s, charge de l'appel, bilan G3.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { creerFenetresPerf, lireStats, ecartStats, bilanPerf } from "../app/js/perf.js";

// Simule une étape : cadence analysée (im/s) et temps d'analyse (ms) par fenêtre, caméra à 30 im/s.
function simuler(cadences, msParFenetre = () => 20, t0 = 1000) {
  const f = creerFenetresPerf(t0), fermees = [];
  cadences.forEach((c, k) => {
    for (let i = 0; i < 300; i += 1) { // caméra : 30 im/s
      const t = t0 + k * 10000 + i * (10000 / 300);
      fermees.push(...f.avancer(t));
      f.camera();
    }
    for (let i = 0; i < Math.round(c * 10); i += 1) {
      const t = t0 + k * 10000 + i * (10000 / (c * 10));
      fermees.push(...f.avancer(t));
      f.analyse(msParFenetre(k));
    }
  });
  fermees.push(...f.avancer(t0 + cadences.length * 10000));
  return fermees;
}

test("fenêtres consécutives de 10 s : cadence, caméra, temps d'analyse", () => {
  const w = simuler([14.5, 12.8, 10.0]);
  assert.deepEqual(w.map((x) => x.k), [0, 1, 2]);
  assert.deepEqual(w.map((x) => x.debutS), [0, 10, 20]);
  assert.deepEqual(w.map((x) => x.analyse), [14.5, 12.8, 10]);
  assert.ok(w.every((x) => x.camera === 30 && x.msMoy === 20 && x.msMax === 20));
});

test("fenêtre partielle en fin d'étape : pas comptée ; pause : fenêtres vides, pas sautées", () => {
  const f = creerFenetresPerf(0);
  f.analyse(20);
  assert.deepEqual(f.avancer(9999), []);
  assert.equal(f.avancer(10000).length, 1);
  // 25 s sans image : les fenêtres 1 et 2 ferment à 0 im/s.
  const w = f.avancer(35000);
  assert.deepEqual(w.map((x) => [x.k, x.analyse]), [[1, 0], [2, 0]]);
  assert.ok(Number.isNaN(w[0].msMoy));
});

test("lireStats : compteurs de l'émetteur et du récepteur vidéo, codec", () => {
  const em = [
    { type: "outbound-rtp", kind: "audio", bytesSent: 999 },
    { type: "outbound-rtp", kind: "video", framesEncoded: 300, bytesSent: 1_000_000, codecId: "c1", qualityLimitationReason: "cpu", frameWidth: 640, frameHeight: 480 },
    { type: "codec", id: "c1", mimeType: "video/H264" },
  ];
  const rc = [{ type: "inbound-rtp", kind: "video", framesDecoded: 290 }];
  assert.deepEqual(lireStats(em, rc, 5), { t: 5, codec: "H264", enc: 300, dec: 290, octets: 1_000_000, limite: "cpu", largeur: 640, hauteur: 480 });
  assert.equal(lireStats([], [], 0).enc, 0); // pas encore de stats
});

test("ecartStats : images encodées et décodées par seconde, débit en kbit/s", () => {
  const a = { t: 0, enc: 0, dec: 0, octets: 0 };
  const b = { t: 10000, enc: 298, dec: 296, octets: 1_062_500, limite: "none", largeur: 640, hauteur: 480, codec: "H264" };
  const c = ecartStats(a, b);
  assert.equal(c.enc, 29.8);
  assert.equal(c.dec, 29.6);
  assert.equal(c.kbits, 850);
});

const charge = { enc: 29.8, dec: 29.6, kbits: 850, limite: "none" };
const etape = (cadences, debut, ch = null, ms = () => 20) =>
  simuler(cadences, ms).map((w) => ({ ...w, debutS: w.debutS + debut, charge: ch }));

test("G3 : toutes les fenêtres à 10,0 ou plus → conforme ; une à 9,9 → non conforme", () => {
  const sans = etape(Array(30).fill(14.5), 0);
  const avecOk = etape([...Array(29).fill(12.8), 10.0], 300, charge);
  let b = bilanPerf([...sans, ...avecOk], 300, 600);
  assert.equal(b.sans.g3, true);
  assert.equal(b.sans.mediane, 14.5);
  assert.equal(b.avec.g3, true);
  assert.equal(b.avec.plusBasse, 10);
  assert.equal(b.avec.momentS, 590);
  assert.equal(b.avec.enc, 29.8);
  const avecKo = etape([...Array(15).fill(12.8), 9.9, ...Array(14).fill(12.8)], 300, charge);
  b = bilanPerf([...sans, ...avecKo], 300, 600);
  assert.equal(b.avec.g3, false);
  assert.equal(b.avec.sous, 1);
  assert.equal(b.avec.momentS, 450);
});

test("G3 : étape incomplète (interrompue) → jamais conforme ; sans fenêtre → null", () => {
  const b = bilanPerf(etape(Array(12).fill(14.5), 0), 300, 600);
  assert.equal(b.sans.complete, false);
  assert.equal(b.sans.g3, false);
  assert.equal(b.avec, null);
});

test("chauffe : dérive du temps d'analyse entre la 1re et la dernière minute", () => {
  const b = bilanPerf(etape(Array(30).fill(14.5), 0, null, (k) => (k < 6 ? 34 : k >= 24 ? 45 : 40)), 300, 600);
  assert.equal(b.sans.msPremiere, 34);
  assert.equal(b.sans.msDerniere, 45);
  assert.equal(b.sans.cameraMin, 30);
});
