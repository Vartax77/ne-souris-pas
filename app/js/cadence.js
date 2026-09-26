// Cadence d'analyse (D2 §3, D4 §5.2, lot L0.2). Fonctions pures, vérifiées par tests/mesures.test.mjs.

export const CADENCE_MAX = 15; // images/s, plafond commun (D2 §3, n° 86)

// Marge sur l'horodatage : les images de la caméra n'arrivent pas à intervalle exact.
// Sans elle, une image arrivée 1 ms trop tôt serait sautée et la cadence tomberait à 10 images/s
// avec une caméra à 30 images/s.
const MARGE_MS = 8;

// Renvoie une fonction qui dit si l'image d'horodatage t (ms) doit être analysée.
// 1. Rythme régulier : l'échéance avance d'un intervalle exact à chaque image analysée ;
//    en cas de retard, elle repart de t.
// 2. Plafond strict : jamais plus de cadenceMax analyses sur une seconde glissante. La marge du point 1
//    permet de petites avances ; ce contrôle garantit qu'elles ne dépassent jamais le plafond.
// ponytail: le contrôle strict coûte jusqu'à 1 image/s avec une caméra irrégulière (14 à 15 au lieu de 15) ;
// un choix des images par créneaux fixes ferait mieux, si cette perte gêne en P0.
export function creerLimiteur(cadenceMax = CADENCE_MAX) {
  const intervalle = 1000 / cadenceMax;
  let echeance = -Infinity;
  const recentes = [];
  return (t) => {
    if (t < echeance - MARGE_MS) return false;
    while (recentes.length && recentes[0] <= t - 1000) recentes.shift();
    if (recentes.length >= cadenceMax) return false;
    recentes.push(t);
    echeance = t > echeance + intervalle ? t + intervalle : echeance + intervalle;
    return true;
  };
}

// Cadence sur une fenêtre glissante : nombre d'images dans les dureeMs dernières ms, ramené à la seconde.
// Valable une fois la fenêtre pleine (voir pleine()).
export function creerFenetre(dureeMs) {
  const t = [];
  let premiere;
  return {
    ajouter(x) {
      premiere ??= x;
      t.push(x);
      while (t[0] <= x - dureeMs) t.shift();
    },
    pleine() {
      return t.length > 0 && t[t.length - 1] - premiere >= dureeMs;
    },
    cadence() {
      return (t.length * 1000) / dureeMs;
    },
  };
}

// Pauses d'analyse (D8 n° 266) : intervalles sans image plus longs que seuilMs (page masquée, fenêtre réduite,
// caméra figée, appareil bloqué). Comptées à part pour que le critère G3 ne perde pas un blocage réel,
// alors que les fenêtres de cadence repartent de zéro après chaque pause.
export function creerCompteurPauses(seuilMs) {
  let derniere, nombre = 0, totalMs = 0, plusLongueMs = 0;
  return {
    // Renvoie la durée de la pause qui vient de se terminer à t, ou 0.
    ajouter(t) {
      let pause = 0;
      if (derniere !== undefined && t - derniere > seuilMs) {
        pause = t - derniere;
        nombre += 1;
        totalMs += pause;
        plusLongueMs = Math.max(plusLongueMs, pause);
      }
      derniere = t;
      return pause;
    },
    stats() {
      return { nombre, totalMs, plusLongueMs };
    },
  };
}
