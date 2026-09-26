// Visage perdu, R4 de D2 (lot L0.5). Fonctions pures, sans accès à la page :
// vérifiées par tests/pertes.test.mjs, et réutilisées telles quelles par le rejeu (L0.7, D8 n° 137).

import { REGLAGES } from "./reglages.js";

// Suivi des pertes d'une manche commencée à t0.
// image(t, valide) : à chaque image analysée. verifier(t) : sans image (minuterie, page visible).
// Les deux renvoient la liste des événements survenus :
//   { type: "avertissement" | "faute", debut, t, pauseMs }
// t est l'horodatage de l'événement (début + 1,5 s ou + 5 s) ; pauseMs est présent quand la perte vient
// d'une pause d'analyse (aucune image reçue).
export function creerSuiviPertes(t0, R = REGLAGES) {
  let derniere = t0; // dernière image reçue (t0 au départ : une perte en cours à t0 commence à t0, R4.6)
  let perte = null; // { debut, pause, comptee, faute }
  let comptees = 0; // pertes comptées depuis le début de la manche ou la dernière faute

  // R4.1 : si aucune image n'arrive, la perte commence à la dernière image reçue (D8 n° 266).
  function pauseJusqua(t) {
    if (!perte && t - derniere > R.delaiPerteMs) {
      perte = { debut: derniere, pause: true, comptee: false, faute: false };
    }
  }

  function evenement(type, tEv, t) {
    const e = { type, debut: perte.debut, t: tEv };
    if (perte.pause) e.pauseMs = t - perte.debut;
    return e;
  }

  // Compte la perte en cours à l'instant t (R4.3, R4.4). Les deux seuils peuvent être franchis d'un coup
  // au retour d'une pause : les événements sont alors datés rétroactivement.
  function evaluer(t) {
    const evs = [];
    if (!perte) return evs;
    const duree = t - perte.debut;
    if (!perte.comptee && duree > R.delaiPerteMs) {
      perte.comptee = true;
      comptees += 1;
      if (comptees >= R.pertesAvantFaute) {
        perte.faute = true;
        evs.push(evenement("faute", perte.debut + R.delaiPerteMs, t));
      } else {
        evs.push(evenement("avertissement", perte.debut + R.delaiPerteMs, t));
      }
    }
    if (!perte.faute && duree > R.perteContinueMs) {
      perte.faute = true;
      evs.push(evenement("faute", perte.debut + R.perteContinueMs, t));
    }
    // En jeu, la faute termine la manche. Dans la manche d'essai P0, qui compte toutes les fautes (n° 254),
    // le compteur repart de zéro : cela revient à ouvrir une nouvelle manche (n° 267).
    if (evs.some((e) => e.type === "faute")) comptees = 0;
    return evs;
  }

  return {
    image(t, valide) {
      if (t < t0) return []; // R4.6 : rien ne compte avant t0
      pauseJusqua(t);
      const evs = evaluer(t);
      if (valide) perte = null; // R4.2
      else if (!perte) perte = { debut: t, pause: false, comptee: false, faute: false }; // R4.1
      derniere = t;
      return evs;
    },
    verifier(t) {
      pauseJusqua(t);
      return evaluer(t);
    },
    comptees() {
      return comptees;
    },
  };
}
