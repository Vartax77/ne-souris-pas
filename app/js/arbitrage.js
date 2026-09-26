// Arbitrage en manche : R2 (sourire) et R3 (jauge) de D2, lot L0.4. Fonctions pures, sans accès à la page :
// vérifiées par tests/arbitrage.test.mjs, et réutilisées telles quelles par le rejeu (L0.7, D8 n° 137).
//
// Une mesure d'image : { visages, largeur, lacet, tangage, s, cheek } (voir main.js, mesurer).
// Un calibrage : { n, d } (calibrage.js).

import { REGLAGES } from "./reglages.js";

// Image valide en manche (D2 §2) : exactement un visage, assez grand, de face.
export function imageValide(m, R = REGLAGES) {
  return m.visages === 1 && m.largeur >= R.largeurMin &&
    Math.abs(m.lacet) <= R.lacetMax && Math.abs(m.tangage) <= R.tangageMax;
}

// État d'une image valide selon son score lissé S (D2 §2).
export function etatImage(S, { n, d }, R = REGLAGES) {
  if (S >= n + d) return "souriant";
  if (S > n + R.m) return "doute";
  return "neutre";
}

// Jauge J (D2 §2, R3) : 0 au bord de la zone de doute, 1 au seuil de sourire.
export function jauge(S, { n, d }, R = REGLAGES) {
  return Math.min(1, Math.max(0, (S - n - R.m) / (d - R.m)));
}

// Score lissé en continu : moyenne des `fenetre` derniers scores d'images valides (D2 §2).
export function creerLissage(fenetre = REGLAGES.lissage) {
  const derniers = [];
  return (s) => {
    derniers.push(s);
    if (derniers.length > fenetre) derniers.shift();
    return derniers.reduce((a, b) => a + b, 0) / derniers.length;
  };
}

// Suivi des séries de sourire (R2). Appeler image(t, souriante, S) à chaque image analysée, invalide comprise.
// Renvoie un événement à la confirmation : { debut, fin, images, sMax }, horodaté à la première image (R2.4).
// L'événement continue d'être mis à jour (fin, images, sMax) tant que la série dure.
// Les images antérieures à t0 ne commencent pas de série (R2.1, R2.6).
export function creerSuiviSourire(t0 = -Infinity, R = REGLAGES) {
  let serie = null;
  return {
    image(t, souriante, S) {
      if (!souriante) {
        if (!serie) return null;
        // Une seule image non souriante tolérée par série, si la suivante est souriante (R2.2).
        if (serie.enAttente || serie.tolerees >= R.imagesTolerees) serie = null;
        else { serie.enAttente = true; serie.tolerees += 1; }
        return null;
      }
      if (!serie) {
        if (t < t0) return null;
        serie = { debut: t, derniere: t, images: 0, tolerees: 0, enAttente: false, sMax: S, evenement: null };
      }
      serie.enAttente = false;
      serie.derniere = t;
      serie.images += 1;
      serie.sMax = Math.max(serie.sMax, S);
      if (serie.evenement) {
        Object.assign(serie.evenement, { fin: t, images: serie.images, sMax: serie.sMax });
        return null;
      }
      // Confirmation : au moins maintienMs entre la première et la dernière image souriante, et assez d'images (R2.3).
      if (t - serie.debut >= R.maintienMs && serie.images >= R.imagesMinSourire) {
        serie.evenement = { debut: serie.debut, fin: t, images: serie.images, sMax: serie.sMax };
        return serie.evenement;
      }
      return null;
    },
  };
}

// Pic soutenu P (D3 §1.5.1) : la plus haute valeur x = S − n gardée pendant au moins dureeMs.
// À chaque image valide, on remonte le temps jusqu'à couvrir dureeMs et on retient le minimum de x
// sur ce tronçon ; P est le plus grand de ces minimums. Une image invalide rompt le tronçon (rompre()).
export function creerPicSoutenu(dureeMs = REGLAGES.maintienMs) {
  let images = [], P = NaN;
  return {
    ajouter(t, x) {
      images.push({ t, x });
      while (images.length > 1 && images[1].t <= t - dureeMs) images.shift();
      if (t - images[0].t >= dureeMs) {
        const min = Math.min(...images.map((i) => i.x));
        P = Number.isNaN(P) ? min : Math.max(P, min);
      }
    },
    rompre() {
      images = [];
    },
    valeur() {
      return P;
    },
  };
}
