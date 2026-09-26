// Image de preuve, R7 de D2 (lot L0.5). Choix de l'image, sans accès à la page :
// vérifié par tests/pertes.test.mjs. La capture elle-même est fournie par la page (capturer).
//
// On garde seulement la meilleure image de la série en cours, et non toutes ses images : même résultat
// que R7.2-7.3 (l'image au S le plus haut), avec moins de mémoire (D8 n° 267).
// Tout reste en mémoire vive : aucune écriture sur disque ni dans le stockage du navigateur (R7.5).

export function creerPreuve(capturer) {
  let candidate = null, sMax = -Infinity, confirmee = false;
  let preuve = null, sPreuve = NaN;
  return {
    // Image souriante de la série en cours, de score lissé S.
    souriante(S) {
      if (S <= sMax) return;
      sMax = S;
      candidate = capturer();
      if (confirmee) {
        preuve = candidate;
        sPreuve = sMax;
      }
    },
    // Sourire confirmé : la meilleure image devient la preuve, et la suit jusqu'à la fin de la série.
    confirmer() {
      confirmee = true;
      preuve = candidate;
      sPreuve = sMax;
    },
    // Fin de série : l'image d'une série non confirmée est jetée (R7.3) ; la preuve confirmée reste.
    finSerie() {
      candidate = null;
      sMax = -Infinity;
      confirmee = false;
    },
    effacer() {
      preuve = null;
      sPreuve = NaN;
    },
    valeur() {
      return { image: preuve, s: sPreuve };
    },
  };
}
