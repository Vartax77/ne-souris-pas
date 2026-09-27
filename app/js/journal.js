// Journal numérique du prototype 0 (D3 §1.4.1, lot L0.6a). En mémoire vive jusqu'à l'export CSV ;
// jamais d'image, de son ni de nom (D8 n° 73). Fonctions pures, vérifiées par tests/journal.test.mjs.

import { REGLAGES } from "./reglages.js";

// Colonnes fixes de D3 §1.4.1, puis une colonne bs_<nom> par blendshape (n° 263).
export const COLONNES = Object.freeze([
  "t", "seq", "faces", "largeur", "lacet", "tangage", "smileG", "smileD", "cheekG", "cheekD",
  "lum", "S", "J", "etat", "faute", "op", "pause", "evenement",
]);

// Nombre à la française pour un tableur : virgule décimale, 4 décimales au plus, zéros inutiles retirés.
function nombre(x) {
  if (!Number.isFinite(x)) return "";
  return String(Number(x.toFixed(4))).replace(".", ",");
}

// Cellule CSV (séparateur « ; ») : entre guillemets si elle contient ; " ou un saut de ligne.
function cellule(v) {
  if (v === undefined || v === null) return "";
  if (typeof v === "number") return nombre(v);
  const s = String(v);
  return /[;"\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

// Lecture d'un journal exporté (rejeu, lot L0.7) : inverse de csv(). Une ligne par objet ; les colonnes
// numériques en nombres (NaN si vides), les blendshapes dans bs. Colonnes texte : seq, etat, faute, evenement.
const TEXTE = new Set(["seq", "etat", "faute", "evenement"]);

function cellules(ligne) {
  const res = [];
  let cur = "", guillemets = false;
  for (let i = 0; i < ligne.length; i += 1) {
    const c = ligne[i];
    if (guillemets) {
      if (c === '"' && ligne[i + 1] === '"') { cur += '"'; i += 1; }
      else if (c === '"') guillemets = false;
      else cur += c;
    } else if (c === '"') guillemets = true;
    else if (c === ";") { res.push(cur); cur = ""; }
    else cur += c;
  }
  res.push(cur);
  return res;
}

export function lireJournal(texte) {
  const [entete, ...corps] = texte.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l !== "");
  const noms = cellules(entete);
  return corps.map((l) => {
    const o = { bs: {} };
    cellules(l).forEach((v, i) => {
      const nom = noms[i];
      if (TEXTE.has(nom)) o[nom] = v;
      else {
        const x = v === "" ? NaN : Number(v.replace(",", "."));
        if (nom.startsWith("bs_")) o.bs[nom.slice(3)] = x;
        else o[nom] = x;
      }
    });
    return o;
  });
}

export function creerJournal(R = REGLAGES) {
  const lignes = [];
  const nomsBs = []; // noms des blendshapes, dans l'ordre de première apparition
  const dernierParSeq = new Map(); // dernière image journalisée de chaque séquence
  let exportees = 0;

  return {
    // Une image analysée. ligne : champs de COLONNES (sauf pause), plus bs : { nom: valeur }.
    // pause : trou d'images depuis la précédente de la même séquence, s'il dépasse le délai de perte.
    image(ligne) {
      const prec = dernierParSeq.get(ligne.seq);
      const pause = prec !== undefined && ligne.t - prec > R.delaiPerteMs ? ligne.t - prec : undefined;
      dernierParSeq.set(ligne.seq, ligne.t);
      for (const nom of Object.keys(ligne.bs ?? {})) if (!nomsBs.includes(nom)) nomsBs.push(nom);
      lignes.push({ ...ligne, pause });
    },
    // Début d'une prise (calibrage ou séquence) : l'attente depuis la prise précédente n'est pas une pause (n° 277).
    debut(seq) {
      dernierParSeq.delete(seq);
    },
    // Un événement sans image (résultat de calibrage, avertissement, classement de la revue…).
    // champs : autres colonnes, par exemple { faute: "perte" } pour une faute constatée par la minuterie.
    evenement(t, seq, texte, champs = {}) {
      lignes.push({ ...champs, t, seq, evenement: texte });
    },
    taille: () => lignes.length,
    nonExportees: () => lignes.length - exportees,
    // Texte CSV : BOM UTF-8 (lecture correcte des accents par le tableur), séparateur « ; », fins de ligne CRLF.
    csv() {
      const entete = [...COLONNES, ...nomsBs.map((n) => `bs_${n}`)];
      const corps = lignes.map((l) =>
        [...COLONNES.map((c) => cellule(l[c])), ...nomsBs.map((n) => cellule(l.bs?.[n]))].join(";"));
      return "﻿" + [entete.join(";"), ...corps].join("\r\n") + "\r\n";
    },
    marquerExporte() {
      exportees = lignes.length;
    },
  };
}
