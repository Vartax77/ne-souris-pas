// Vérification du rejeu (lot L0.7) : lecture du journal, même arbitrage qu'en direct, calibrages rejoués,
// contrôle et faux positifs. Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { creerJournal, lireJournal } from "../app/js/journal.js";
import { creerArbitre } from "../app/js/manche.js";
import { evaluerCalibrage } from "../app/js/calibrage.js";
import { REGLAGES } from "../app/js/reglages.js";
import { rejouerJournal, lireReglages } from "../outils/rejeu.mjs";

const f2 = (x) => x.toFixed(2).replace(".", ",");
const PAS = 1000 / 15; // 15 images analysées par seconde
const visage = (s) => ({ visages: 1, largeur: 30, lacet: 2, tangage: 3, luminance: 120, s, cheek: 0, smileG: s, smileD: s });

// Séance simulée, journalisée comme le fait main.js : calibrages, séquences, fautes, minuterie.
function seance({ annonce = true, testeur = true } = {}) {
  const j = creerJournal();
  let t = 1000;
  const prises = [];
  const ligne = (m, extra) => j.image({
    t, faces: m.visages, largeur: m.largeur, lacet: m.lacet, tangage: m.tangage, smileG: m.smileG, smileD: m.smileD,
    cheekG: 0, cheekD: 0, lum: m.luminance, op: extra.op ?? 0, ...extra,
  });
  if (testeur) j.evenement(t, "", "testeur T00");
  // Trois calibrages sous A0 : francs v 0,6 puis 0,7 ; timide v 0,4.
  for (const [v, timide] of [[0.6, false], [0.7, false], [0.4, true]]) {
    j.debut("A0");
    const neutre = [], sourire = [];
    for (let k = 0; k < 45; k += 1, t += PAS) { neutre.push(visage(0.02)); ligne(visage(0.02), { seq: "A0", etat: "cal_neutre" }); }
    for (let k = 0; k < 30; k += 1, t += PAS) { sourire.push(visage(v)); ligne(visage(v), { seq: "A0", etat: "cal_sourire" }); }
    const r = evaluerCalibrage(neutre, sourire, REGLAGES, { cadenceCamera: 30 });
    assert.ok(r.ok);
    prises.push({ ...r, timide });
    j.evenement(t, "A0", `calibrage ok n=${f2(r.n)} v=${f2(r.v)} d=${f2(r.d)}${timide ? " timide" : ""} camera=30`);
    t += 2000;
  }
  // A1, 20 s, au calibrage de référence (v le plus haut, n° 283).
  const cal = prises[1];
  if (annonce) j.evenement(t, "A1", `sequence debut n=${f2(cal.n)} v=${f2(cal.v)} d=${f2(cal.d)} calibrage=reference`);
  j.debut("A1");
  const a = creerArbitre(cal);
  const t0 = t;
  let debutSourire = null;
  for (; t < t0 + 20000; t += PAS) {
    const e = (t - t0) / 1000;
    // 3-4 s : bosse légère (s 0,26 : sous le seuil de référence, au-dessus de celui du franc le plus bas) ;
    // 6-8 s : vrai sourire ; 10-12 s : visage perdu (avertissement) ; 14-17 s : aucune image, la minuterie
    // constate la deuxième perte (faute) sans image, comme en direct (n° 266, n° 277).
    if (e >= 14 && e < 17) {
      if (e < 14 + PAS / 1000) for (const ev of a.verifier(t0 + 15600)) {
        if (ev.type === "faute") j.evenement(ev.t, "A1", "faute perte (constatée sans image)", { faute: "perte" });
      }
      continue;
    }
    const m = e >= 10 && e < 12 ? { visages: 0 } : visage(e >= 3 && e < 4 ? 0.26 : e >= 6 && e < 8 ? 0.6 : 0.02);
    const r = a.image(t, m);
    if (r.sourire) debutSourire = r.sourire.debut;
    ligne({ ...m, smileG: m.s, smileD: m.s }, { seq: "A1", S: r.S, J: r.valide ? a.J : NaN, etat: a.etat, faute: r.faute, op: e >= 3.2 && e < 3.3 ? 1 : 0 });
  }
  j.evenement(t, "A1", "sequence terminee");
  if (debutSourire !== null) j.evenement(debutSourire, "A1", "revue 1 : confirmee");
  return j.csv();
}

test("lireJournal : inverse de csv() (nombres, textes, blendshapes, guillemets)", () => {
  const j = creerJournal();
  j.image({ t: 12.3456, seq: "A1", faces: 1, largeur: 30.25, S: 0.1234, etat: "neutre", faute: "", bs: { jawOpen: 0.04 } });
  j.evenement(20, "A1", 'texte ; avec "guillemets"');
  const [a, b] = lireJournal(j.csv());
  assert.equal(a.t, 12.3456);
  assert.equal(a.largeur, 30.25);
  assert.equal(a.etat, "neutre");
  assert.equal(a.bs.jawOpen, 0.04);
  assert.ok(Number.isNaN(a.lacet));
  assert.equal(b.evenement, 'texte ; avec "guillemets"');
});

test("rejeu aux réglages de départ : identique au direct, y compris la faute constatée par la minuterie", () => {
  const { sorties, prises } = rejouerJournal(seance());
  assert.equal(prises.length, 3);
  const direct = sorties.find((s) => s.calibrage === "direct");
  assert.equal(direct.controle, "identique");
  assert.equal(direct.sourires, 1);
  assert.equal(direct.pertes, 1);
  // La faute de la minuterie est bien au journal, sur une ligne d'événement.
  assert.ok(lireJournal(seance()).some((l) => l.evenement === "faute perte (constatée sans image)" && l.faute === "perte"));
  // Journal d'avant n° 277 : la colonne faute de cette ligne est vide. Le rejeu retrouve la faute et l'affiche.
  const ancien = seance().replace(/;perte;([^\r\n]*faute perte \(constatée sans image\))/, ";;$1");
  const c = rejouerJournal(ancien).sorties.find((s) => s.calibrage === "direct").controle;
  assert.match(c, /^faute perte ajoutée à 15,4 s$/); // dernière image à 13,9 s, + 1,5 s
  assert.equal(direct.v.toFixed(2), "0.70"); // la prise annoncée : v le plus haut
});

test("calibrages rejoués : franc le plus bas (v 0,6) et timide (v 0,4) ; faux positifs pour G1 (n° 284, n° 291)", () => {
  const { sorties } = rejouerJournal(seance());
  const par = Object.fromEntries(sorties.map((s) => [s.calibrage, s]));
  assert.equal(par.franc_bas.v.toFixed(2), "0.60");
  assert.equal(par.timide.v.toFixed(2), "0.40");
  // Direct : 1 sourire revu « confirmee » → 0 faux positif. Franc bas : la bosse de 3 s devient une faute
  // nouvelle, comptée comme faux positif, avec « sourire vu » ; le vrai sourire hérite de « confirmee ».
  assert.equal(par.direct.fauxPositifs, "0");
  assert.equal(par.franc_bas.sourires, 2);
  assert.equal(par.franc_bas.fauxPositifs, "1 (dont 1 nouvelles, 1 avec « sourire vu »)");
});

test("autres réglages : k plus bas → davantage de fautes ; pas de contrôle ; réglage inconnu refusé", () => {
  const R = lireReglages(["k=0.3"]);
  assert.equal(R.k, 0.3);
  const direct = rejouerJournal(seance(), R).sorties.find((s) => s.calibrage === "direct");
  assert.equal(direct.sourires, 2);
  assert.equal(direct.controle, "");
  assert.throws(() => lireReglages(["kk=1"]));
  assert.throws(() => lireReglages(["k=abc"]));
});

test("calibrage hors du journal → approximatif ; journal sans « sequence debut » → dernier calibrage réussi", () => {
  // Annonce qui ne correspond à aucune prise : on retire les prises en coupant le journal avant A1.
  const texte = seance();
  const lignes = texte.split("\r\n");
  const sansCalibrages = [lignes[0], ...lignes.filter((l) => /;A1;/.test(l))].join("\r\n");
  const approx = rejouerJournal(sansCalibrages).sorties.find((s) => s.calibrage === "direct");
  assert.equal(approx.approx, true);
  assert.match(approx.controle, /^approximatif ; /);
  const ancien = rejouerJournal(seance({ annonce: false })).sorties.find((s) => s.calibrage === "direct");
  assert.match(ancien.controle, /^ancien journal, calibrage = dernier réussi ; /);
  assert.equal(ancien.v.toFixed(2), "0.40"); // le dernier réussi était le timide (règle d'avant n° 279)
});
