// Arbitrage d'une manche : assemblage de R2 (sourire), R3 (jauge) et R4 (visage perdu), image par image.
// Sans accès à la page : le même code sert en direct (main.js) et au rejeu (outils/rejeu.mjs, lot L0.7,
// D8 n° 137, n° 288). Vérifié par tests/rejeu.test.mjs.
//
// Une mesure d'image : { visages, largeur, lacet, tangage, s, cheek }. Un calibrage : { n, d }.

import { REGLAGES } from "./reglages.js";
import { imageValide, etatImage, jauge, creerLissage, creerSuiviSourire, creerPicSoutenu } from "./arbitrage.js";
import { creerSuiviPertes } from "./pertes.js";

// La manche commence à la première image reçue (t0). R : réglages (ceux de départ, ou ceux du rejeu).
export function creerArbitre(cal, R = REGLAGES) {
  let suivi, suiviVariante, pertes;
  const lisser = creerLissage(R.lissage), lisserVariante = creerLissage(R.lissage);
  const a = {
    t0: undefined, etat: "—", J: 0, pic: 0, variante: 0,
    picSoutenu: creerPicSoutenu(R.maintienMs), picSoutenuVariante: creerPicSoutenu(R.maintienMs),

    // Une image analysée. Renvoie { valide, S, souriant, pertes, sourire, serieActive, faute } :
    // pertes : événements de R4 ; sourire : événement de R2 à sa confirmation ;
    // faute : colonne « faute » du journal pour cette image (un sourire l'emporte sur une perte).
    image(t, m) {
      if (a.t0 === undefined) {
        a.t0 = t;
        suivi = creerSuiviSourire(t, R);
        suiviVariante = creerSuiviSourire(t, R);
        pertes = creerSuiviPertes(t, R);
      }
      const valide = imageValide(m, R);
      let souriant = false, souriantVariante = false, S = NaN, Sv = NaN;
      if (valide) {
        S = lisser(m.s);
        a.etat = etatImage(S, cal, R);
        souriant = a.etat === "souriant";
        a.J = jauge(S, cal, R);
        a.pic = Math.max(a.pic, a.J);
        a.picSoutenu.ajouter(t, S - cal.n);
        // Variante cheekSquint (R2.7) : s compté seulement si cheekSquint atteint le plancher.
        Sv = lisserVariante(m.cheek >= R.plancherCheek ? m.s : 0);
        souriantVariante = etatImage(Sv, cal, R) === "souriant";
        a.picSoutenuVariante.ajouter(t, Sv - cal.n);
      } else {
        a.etat = "invalide"; // J et pic figés (R3.4)
        a.picSoutenu.rompre();
        a.picSoutenuVariante.rompre();
      }
      const evs = pertes.image(t, valide);
      const sourire = suivi.image(t, souriant, S);
      if (suiviVariante.image(t, souriantVariante, Sv)) a.variante += 1;
      const faute = sourire ? "sourire" : evs.some((e) => e.type === "faute") ? "perte" : "";
      return { valide, S, souriant, pertes: evs, sourire, serieActive: suivi.actif(), faute };
    },

    // Sans image (minuterie, page visible) : pertes constatées en direct (D8 n° 266).
    verifier: (t) => (pertes ? pertes.verifier(t) : []),
  };
  return a;
}
