// Visage perdu, R4 de D2 (lot L0.5). Fonctions pures, sans accès à la page :
// vérifiées par tests/pertes.test.mjs, et réutilisées telles quelles par le rejeu (L0.7, D8 n° 137).

import { REGLAGES } from "./reglages.js";

// Suivi des pertes d'une manche commencée à t0.
// image(t, valide) : à chaque image analysée. verifier(t) : sans image (minuterie, page visible).
// Les deux renvoient la liste des événements survenus :
//   { type: "avertissement" | "faute", debut, t, pauseMs, pauseAuDebut }
// t est l'horodatage de l'événement (début + 1,5 s ou + 5 s).
// pauseMs : temps passé sans aucune image dans la perte (pause d'analyse). Mis à jour sur l'événement déjà
// émis quand les images reprennent : c'est la durée totale, pas la pause vue jusqu'à l'événement (D8 n° 270).
// pauseAuDebut : la perte a commencé par la pause (sinon, par des images invalides).
export function creerSuiviPertes(t0, R = REGLAGES) {
  let derniere = t0; // dernière image reçue (t0 au départ : une perte en cours à t0 commence à t0, R4.6)
  let perte = null; // { debut, pauseAuDebut, pauseMs, comptee, faute, evenements }
  let comptees = 0; // pertes comptées depuis le début de la manche ou la dernière faute

  const nouvellePerte = (debut, pauseAuDebut) =>
    ({ debut, pauseAuDebut, pauseMs: 0, comptee: false, faute: false, evenements: [] });

  // R4.1 : si aucune image n'arrive, la perte commence à la dernière image reçue (D8 n° 266).
  function pauseJusqua(t) {
    if (!perte && t - derniere > R.delaiPerteMs) perte = nouvellePerte(derniere, true);
  }

  // Pause encore en cours à l'instant t (aucune image depuis plus que le délai de perte).
  const pauseEnCours = (t) => (t - derniere > R.delaiPerteMs ? t - derniere : 0);

  function evenement(type, tEv, t) {
    const e = { type, debut: perte.debut, t: tEv, pauseAuDebut: perte.pauseAuDebut };
    const pauseMs = perte.pauseMs + pauseEnCours(t);
    if (pauseMs > 0) e.pauseMs = pauseMs;
    perte.evenements.push(e);
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
      // Trou d'images dans une perte (qu'elle ait commencé par la pause ou par des images invalides) :
      // ajouté à sa durée de pause, et reporté sur les événements déjà émis (D8 n° 270).
      if (perte && t - derniere > R.delaiPerteMs) {
        perte.pauseMs += t - derniere;
        for (const e of perte.evenements) e.pauseMs = perte.pauseMs;
      }
      derniere = t;
      const evs = evaluer(t);
      if (valide) perte = null; // R4.2
      else if (!perte) perte = nouvellePerte(t, false); // R4.1
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
