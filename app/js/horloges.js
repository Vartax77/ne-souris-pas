// Horloges du prototype 1 (lot L1.4, D4 §5.1, D2 R5 et §5.6) : synchronisation par 5 allers-retours, borne
// d'erreur e, fenêtre W ; mesure de l'erreur réelle par flash commun (D3 §2.3.3). Fonctions pures, sans accès à
// la page : vérifiées par tests/horloges.test.mjs.

export const ECHANGES = 5; // allers-retours par synchronisation (D4 §5.1)
export const ESPACEMENT_MS = 100; // entre deux allers-retours
export const W_MIN_MS = 100; // plancher de la fenêtre W (D2 R5, n° 161)
export const CADENCE_P1 = 15; // images/s : pas de détection en P1, plafond commun (D2 §3) ; i = 1000 / 15

// Un aller-retour : t1 envoi (hôte), t2 réception et t3 réponse (invité), t4 réception (hôte).
// a = (t4 − t1) − (t3 − t2) ; θ = ((t2 − t1) + (t3 − t4)) / 2 : horloge de l'invité = horloge de l'hôte + θ.
export function allerRetour({ t1, t2, t3, t4 }) {
  return { a: (t4 - t1) - (t3 - t2), theta: ((t2 - t1) + (t3 - t4)) / 2 };
}

// Synchronisation (D4 §5.1, n° 160, n° 161) : l'échantillon au plus petit aller-retour a_min donne θ ;
// e = a_min / 2 borne l'erreur sur θ quelle que soit l'asymétrie du réseau ; W = max(100 ms, e + i).
export function synchroniser(echanges, cadence = CADENCE_P1) {
  const mesures = echanges.map(allerRetour).filter((m) => Number.isFinite(m.a) && m.a >= 0);
  if (!mesures.length) return null;
  const meilleur = mesures.reduce((m, x) => (x.a < m.a ? x : m));
  const e = meilleur.a / 2, i = 1000 / cadence;
  return { aMin: meilleur.a, theta: meilleur.theta, e, i, w: Math.max(W_MIN_MS, e + i), cadence, echanges: mesures.length };
}

// Convertit un instant de l'horloge de l'invité dans celle de l'hôte : t_hôte = t_invité − θ.
export const versHote = (tInvite, theta) => tInvite - theta;

// Détecteur de flash (D3 §2.3.3) : saut de luminance moyenne d'une image à la suivante, au-delà du seuil.
// Renvoie { t, sens } au saut (« clair » ou « sombre »), puis ignore les images pendant la période réfractaire.
export function creerDetecteurFlash(seuil = 40, refractaireMs = 500) {
  let precedente = null, dernierSaut = -Infinity;
  return (t, luminance) => {
    const avant = precedente;
    precedente = luminance;
    if (avant === null || t - dernierSaut < refractaireMs) return null;
    const saut = luminance - avant;
    if (Math.abs(saut) < seuil) return null;
    dernierSaut = t;
    return { t, sens: saut > 0 ? "clair" : "sombre" };
  };
}

// Apparie les flashs de l'hôte et de l'invité (même sens, instants convertis à moins de fenetreMs) et donne
// l'écart de chaque paire : erreur de synchronisation plus au plus un intervalle d'image par appareil.
export function apparier(flashsHote, flashsInvite, theta, fenetreMs = 1000) {
  const libres = [...flashsInvite];
  const paires = [];
  for (const h of flashsHote) {
    let meilleur = -1, ecartMin = Infinity;
    libres.forEach((f, k) => {
      const ecart = h.t - versHote(f.t, theta);
      if (f.sens === h.sens && Math.abs(ecart) <= fenetreMs && Math.abs(ecart) < Math.abs(ecartMin)) { meilleur = k; ecartMin = ecart; }
    });
    if (meilleur >= 0) {
      paires.push({ tHote: h.t, sens: h.sens, ecart: ecartMin });
      libres.splice(meilleur, 1);
    }
  }
  return paires;
}

// Journal des flashs (D3 §2.4) : combinaison, numéro, écart mesuré, e, i, W, aller-retour minimal.
export const COLONNES_FLASH = ["combi", "numero", "ecart_ms", "e_ms", "i_ms", "w_ms", "a_min_ms", "sens", "dans_e_plus_i"];
const nombre = (x) => (Number.isFinite(x) ? String(Number(x.toFixed(2))).replace(".", ",") : "");
export function csvFlashs(lignes) {
  const cel = (v) => (typeof v === "number" ? nombre(v) : String(v ?? ""));
  return "﻿" + [COLONNES_FLASH.join(";"), ...lignes.map((l) => COLONNES_FLASH.map((c) => cel(l[c])).join(";"))].join("\r\n") + "\r\n";
}
