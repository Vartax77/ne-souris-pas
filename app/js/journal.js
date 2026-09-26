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
    // Un événement sans image (résultat de calibrage, avertissement, classement de la revue…).
    evenement(t, seq, texte) {
      lignes.push({ t, seq, evenement: texte });
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
