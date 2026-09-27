// Rejeu d'un journal P0 (D3 §1.5, lot L0.7, D8 n° 289) : relit un journal CSV exporté et rejoue R1 à R4
// avec le même code qu'en jeu (creerArbitre, evaluerCalibrage : n° 137), avec les réglages de départ ou
// d'autres. Hors de app/ : jamais publié. Vérifié par tests/rejeu.test.mjs.
//
// Usage : node outils/rejeu.mjs "<journal.csv>" [k=0.35] [maintienMs=600] …
// Sortie : un tableau, et rejeu_<journal>.csv écrit à côté du journal (dossier chiffré). Aucune image, aucun nom.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { lireJournal } from "../app/js/journal.js";
import { REGLAGES } from "../app/js/reglages.js";
import { evaluerCalibrage } from "../app/js/calibrage.js";
import { creerArbitre } from "../app/js/manche.js";
import { creerPicSoutenu } from "../app/js/arbitrage.js";
import { SEQUENCES, etapeA, operateurAVu } from "../app/js/protocole.js";

const TOL = 0.01; // ms : les horodatages du journal ont 4 décimales

const nombre = (x, d = 4) => (Number.isFinite(x) ? String(Number(x.toFixed(d))).replace(".", ",") : "");
const f2 = (x) => (Number.isFinite(x) ? x.toFixed(2) : "");
const lireNombre = (texte, cle) => {
  const m = texte.match(new RegExp(`${cle}=(-?[\\d,.]+)`));
  return m ? Number(m[1].replace(",", ".")) : undefined;
};
const estImage = (l) => !Number.isNaN(l.faces);
const mesure = (l) => ({
  visages: l.faces, largeur: l.largeur, lacet: l.lacet, tangage: l.tangage, luminance: l.lum,
  s: (l.smileG + l.smileD) / 2, cheek: (l.cheekG + l.cheekD) / 2,
});

// Découpe le journal en prises de calibrage et en séquences, dans l'ordre.
export function decouper(lignes, testeurDefaut = null) {
  let testeur = testeurDefaut, cal = { neutre: [], sourire: [] }, seq = null;
  const prises = [], sequences = [];
  for (const l of lignes) {
    const ev = l.evenement ?? "";
    if (estImage(l)) {
      if (l.etat === "cal_neutre") cal.neutre.push(mesure(l));
      else if (l.etat === "cal_sourire") cal.sourire.push(mesure(l));
      else {
        // Journal d'avant n° 279, sans ligne « sequence debut » : la séquence commence à sa première image.
        if (!seq || l.seq !== seq.code) {
          seq = { code: l.seq, t: l.t, testeur, prisesAvant: prises.length, fin: "sans fin", images: [], evenements: [], revues: [], annonce: null };
          if (seq.code !== "PERF") sequences.push(seq);
        }
        seq.images.push(l);
      }
      continue;
    }
    if (ev.startsWith("testeur ")) testeur = ev.slice(8).trim();
    else if (ev.startsWith("calibrage ")) {
      prises.push({
        t: l.t, seq: l.seq, testeur, timide: / timide\b/.test(ev), okDirect: ev.startsWith("calibrage ok"),
        camera: lireNombre(ev, "camera"), direct: { n: lireNombre(ev, "n"), v: lireNombre(ev, "v"), d: lireNombre(ev, "d") },
        neutre: cal.neutre, sourire: cal.sourire,
      });
      cal = { neutre: [], sourire: [] };
    } else if (ev.startsWith("sequence debut")) {
      seq = {
        code: l.seq, t: l.t, testeur, prisesAvant: prises.length, fin: "sans fin", images: [], evenements: [], revues: [],
        annonce: { n: lireNombre(ev, "n"), v: lireNombre(ev, "v"), d: lireNombre(ev, "d") },
      };
      if (seq.code !== "PERF") sequences.push(seq);
    } else if (seq && l.seq === seq.code && /^sequence (terminee|interrompue)/.test(ev)) {
      seq.fin = ev.slice(9);
      seq = null;
    } else if (ev.startsWith("revue ")) {
      const s = sequences.findLast((x) => x.code === l.seq);
      s?.revues.push({ t: l.t, classe: ev.split(": ")[1] });
    } else if (seq && l.seq === seq.code) seq.evenements.push(l);
  }
  return { prises, sequences };
}

// Calibrage d'une prise recalculé depuis ses images, avec les réglages R. Sans cadence caméra (ancien journal),
// le résultat journalisé fait foi pour l'acceptation.
function recalculer(p, R) {
  const r = evaluerCalibrage(p.neutre, p.sourire, R, { cadenceCamera: p.camera ?? Infinity });
  return { ...r, ok: r.ok && (p.camera !== undefined || p.okDirect) };
}

// Rejoue une séquence avec le calibrage cal ({ n, v, d }) et les réglages R.
export function rejouer(seq, cal, R) {
  const a = creerArbitre(cal, R);
  const def = SEQUENCES.find((s) => s.code === seq.code);
  const fautes = [], etats = [];
  const picsEtapes = new Map();
  for (const l of seq.images) {
    const r = a.image(l.t, mesure(l));
    etats.push(a.etat);
    for (const e of r.pertes) if (e.type === "faute") fautes.push({ type: "perte", t: e.t, tImage: l.t });
    if (r.sourire) fautes.push({ type: "sourire", t: r.sourire.debut, tImage: l.t, ref: r.sourire });
    // P de chaque étape d'A6 : k_max demande le P de chaque sourire franc (D3 §1.5.2).
    if (seq.code === "A6") {
      const k = etapeA(def, (l.t - a.t0) / 1000)?.index;
      if (k === undefined) continue;
      if (!picsEtapes.has(k)) picsEtapes.set(k, creerPicSoutenu(R.maintienMs));
      if (r.valide) picsEtapes.get(k).ajouter(l.t, r.S - cal.n);
      else picsEtapes.get(k).rompre();
    }
  }
  const P = a.picSoutenu.valeur();
  return {
    t0: a.t0, fautes, etats, variante: a.variante, P, r: P / cal.d,
    sourires: fautes.filter((x) => x.type === "sourire").length, pertes: fautes.filter((x) => x.type === "perte").length,
    pEtapes: def?.etapes && seq.code === "A6"
      ? def.etapes.map(([consigne], k) => (consigne === "Visage neutre" ? null : picsEtapes.get(k)?.valeur())).filter((x) => x !== null)
      : null,
  };
}

// Fautes du direct (colonne faute) comparées aux fautes rejouées ; états image par image (critère de D6 L0.7).
export function controler(seq, rej) {
  const directes = [
    ...seq.images.filter((l) => l.faute).map((l) => ({ type: l.faute, t: l.t })),
    ...seq.evenements.filter((l) => l.faute).map((l) => ({ type: l.faute, t: l.t })),
  ];
  const restantes = [...rej.fautes];
  const manquantes = [];
  for (const d of directes) {
    const i = restantes.findIndex((x) => x.type === d.type && (Math.abs(x.tImage - d.t) < TOL || Math.abs(x.t - d.t) < TOL));
    if (i < 0) manquantes.push(d);
    else restantes.splice(i, 1);
  }
  // Une perte et un sourire sur la même image : le journal n'écrit que « sourire » ; ce n'est pas un écart.
  const ajoutees = restantes.filter((x) => !(x.type === "perte" &&
    rej.fautes.some((y) => y.type === "sourire" && Math.abs(y.tImage - x.tImage) < TOL)));
  const etatsDiff = seq.images.filter((l, i) => l.etat !== rej.etats[i]).length;
  const ecarts = [
    ...ajoutees.map((x) => `faute ${x.type} ajoutée à ${nombre((x.t - rej.t0) / 1000, 1)} s`),
    ...manquantes.map((x) => `faute ${x.type} manquante à ${nombre((x.t - rej.t0) / 1000, 1)} s`),
    etatsDiff ? `${etatsDiff} images d'état différent` : null,
  ].filter(Boolean);
  return ecarts.length ? ecarts.join(" ; ") : "identique";
}

// Faux positifs pour G1 (n° 291) : une faute de sourire rejouée qui chevauche un sourire revu en séance
// hérite de son classement (« confirmee » ne compte pas) ; une faute nouvelle compte comme faux positif.
function fauxPositifs(seq, direct, rej) {
  const revus = (direct?.fautes ?? []).filter((x) => x.type === "sourire").map((x) => ({
    debut: x.ref.debut, fin: x.ref.fin, classe: seq.revues.find((r) => Math.abs(r.t - x.ref.debut) < TOL)?.classe,
  }));
  const pressions = seq.images.filter((l) => l.op === 1).map((l) => l.t);
  let fp = 0, nouvelles = 0, avecOp = 0;
  for (const x of rej.fautes.filter((y) => y.type === "sourire")) {
    const revu = revus.find((r) => x.ref.debut <= r.fin && x.ref.fin >= r.debut);
    if (revu) { if (revu.classe !== "confirmee") fp += 1; continue; }
    fp += 1;
    nouvelles += 1;
    if (operateurAVu(pressions, x.ref.debut, x.ref.fin)) avecOp += 1;
  }
  return `${fp}${nouvelles ? ` (dont ${nouvelles} nouvelles, ${avecOp} avec « sourire vu »)` : ""}`;
}

// Rejeu complet d'un journal. R : réglages ; defaut : R égal aux réglages de départ (contrôle possible).
export function rejouerJournal(texte, R = REGLAGES, testeurDefaut = null) {
  const defaut = Object.keys(R).every((k) => R[k] === REGLAGES[k]);
  const { prises, sequences } = decouper(lireJournal(texte), testeurDefaut);
  for (const p of prises) {
    p.auDepart = recalculer(p, REGLAGES);
    p.rejeu = defaut ? p.auDepart : recalculer(p, R);
  }
  const sorties = [];
  for (const seq of sequences) {
    const avant = prises.slice(0, seq.prisesAvant).filter((p) => p.testeur === seq.testeur);
    // Calibrage du direct : la prise dont n, v, d arrondis à 0,01 égalent ceux annoncés en début de séquence.
    // Journal d'avant n° 279 (sans annonce) : la règle d'alors, dernier calibrage réussi de la même séquence.
    const a = seq.annonce;
    const def = SEQUENCES.find((s) => s.code === seq.code);
    const directe = a
      ? avant.findLast((p) => p.auDepart.ok &&
        f2(p.auDepart.n) === f2(a.n) && f2(p.auDepart.v) === f2(a.v) && f2(p.auDepart.d) === f2(a.d))
      : avant.findLast((p) => p.auDepart.ok && p.seq === (def?.calibrageAvant ? seq.code : "A0"));
    const francs = avant.filter((p) => p.seq === "A0" && !p.timide && p.rejeu.ok);
    const calibrages = [["direct", directe ? directe.rejeu : null]];
    if (!def?.calibrageAvant) {
      calibrages.push(["franc_bas", francs.reduce((m, p) => (m && m.rejeu.v <= p.rejeu.v ? m : p), null)?.rejeu ?? null]);
      calibrages.push(["timide", avant.findLast((p) => p.seq === "A0" && p.timide && p.rejeu.ok)?.rejeu ?? null]);
    }
    let direct = null;
    for (const [nom, c] of calibrages) {
      let cal = c, approx = false;
      if (nom === "direct" && !cal && a) {
        // Calibrage hors du journal (n° 281) : valeurs annoncées, à 2 décimales. Le d annoncé est le plus proche
        // du direct ; avec d'autres réglages, d est recalculé depuis n et v.
        approx = true;
        cal = { n: a.n, v: a.v, d: defaut ? a.d : Math.min(R.k * (a.v - a.n), R.dMax) };
      }
      if (!cal) continue;
      const rej = rejouer(seq, cal, R);
      if (nom === "direct") direct = rej;
      sorties.push({
        seq: seq.code, debut: seq.t, fin: seq.fin, calibrage: nom, approx, n: cal.n, v: cal.v, d: cal.d,
        sourires: rej.sourires, pertes: rej.pertes, variante: rej.variante, P: rej.P, vMoinsN: cal.v - cal.n, r: rej.r,
        pEtapes: rej.pEtapes,
        fauxPositifs: def?.revue ? (nom === "direct"
          ? String(seq.revues.filter((x) => x.classe !== "confirmee").length)
          : fauxPositifs(seq, direct, rej)) : "",
        controle: nom === "direct" && defaut
          ? (approx ? "approximatif ; " : "") + (a ? "" : "ancien journal, calibrage = dernier réussi ; ") + controler(seq, rej) : "",
      });
    }
  }
  return { sorties, prises };
}

const COLONNES = [
  ["seq", (s) => s.seq], ["debut_ms", (s) => nombre(s.debut, 1)], ["fin", (s) => s.fin], ["calibrage", (s) => s.calibrage + (s.approx ? " (approximatif)" : "")],
  ["n", (s) => nombre(s.n)], ["v", (s) => nombre(s.v)], ["d", (s) => nombre(s.d)], ["sourires", (s) => s.sourires], ["pertes", (s) => s.pertes],
  ["variante", (s) => s.variante], ["P", (s) => nombre(s.P)], ["v_moins_n", (s) => nombre(s.vMoinsN)], ["r", (s) => nombre(s.r)],
  ["P_etapes", (s) => (s.pEtapes ? s.pEtapes.map((x) => nombre(x)).join(" | ") : "")], ["faux_positifs", (s) => s.fauxPositifs], ["controle", (s) => s.controle],
];

export function versCsv(sorties) {
  const cel = (v) => { const s = String(v ?? ""); return /[;"\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s; };
  return "﻿" + [COLONNES.map(([n]) => n).join(";"), ...sorties.map((s) => COLONNES.map(([, f]) => cel(f(s))).join(";"))].join("\r\n") + "\r\n";
}

// Réglages de la commande : nom=valeur, noms de REGLAGES seulement.
export function lireReglages(args) {
  const R = { ...REGLAGES };
  for (const a of args) {
    const [nom, valeur] = a.split("=");
    const x = Number(String(valeur).replace(",", "."));
    if (!(nom in REGLAGES) || !Number.isFinite(x)) throw new Error(`réglage inconnu ou valeur invalide : ${a}`);
    R[nom] = x;
  }
  return R;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [fichier, ...args] = process.argv.slice(2);
  if (!fichier) {
    console.error('Usage : node outils/rejeu.mjs "<journal.csv>" [k=0.35] [maintienMs=600] …');
    process.exit(1);
  }
  const R = lireReglages(args);
  const nom = path.basename(fichier);
  const { sorties, prises } = rejouerJournal(readFileSync(fichier, "utf8"), R, nom.match(/journal_(T\d{2})_/)?.[1] ?? null);
  const suffixe = args.length ? `_${args.join("_")}` : "";
  const sortie = path.join(path.dirname(fichier), `rejeu_${path.parse(nom).name}${suffixe}.csv`);
  writeFileSync(sortie, versCsv(sorties));
  console.log(`${nom} : ${prises.length} prises de calibrage, ${sorties.length} lignes de rejeu${args.length ? ` (réglages : ${args.join(" ")})` : ""}`);
  for (const s of sorties) {
    console.log(`${s.seq.padEnd(3)} ${(s.calibrage + (s.approx ? "*" : "")).padEnd(10)} d ${nombre(s.d, 3).padEnd(6)} sourires ${String(s.sourires).padStart(3)} pertes ${String(s.pertes).padStart(2)} P ${nombre(s.P, 2).padEnd(5)}${s.fauxPositifs !== "" ? ` FP ${s.fauxPositifs}` : ""}${s.controle ? ` — ${s.controle}` : ""}`);
  }
  console.log(`Écrit : ${sortie}`);
}
