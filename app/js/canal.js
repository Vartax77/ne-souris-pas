// Canal de jeu du prototype 1 (lot L1.3, D4 §4.2) : enveloppe des messages, battement, silence de l'adversaire.
// Sans accès à la page : le transport et l'horloge sont injectés. Vérifié par tests/canal.test.mjs.

import { VERSION } from "./salon.js";

export const BATTEMENT_MS = 1000; // un battement par seconde (D4 §4.2)
export const INJOIGNABLE_MS = 3000; // trois secondes sans aucun message : adversaire injoignable (D2 §6.4.1, n° 99)

// envoyer(m) : pose un message sur le transport du moment (il change à la reprise).
// surEvenement(nom, info) : "message" (m), "injoignable" ({ depuis }), "revenu" ({ duree }), "version" ({ autre }).
export function creerCanal({ envoyer, horloge, surEvenement }) {
  let seq = 0, derniere = horloge.maintenant(), injoignableDepuis = null, arret = null, versionSignalee = false;

  const canal = {
    // Enveloppe commune : { v, type, seq, t, data } ; t sur l'horloge monotone de l'émetteur.
    envoyer(type, data = {}) {
      const m = { v: VERSION, type, seq: seq++, t: horloge.maintenant(), data };
      try { envoyer(m); } catch { /* transport fermé : la coupure est gérée ailleurs */ }
      return m;
    },
    // Tout message reçu, battement compris, prouve que l'adversaire est joignable.
    recevoir(m) {
      if (m?.v !== VERSION) {
        if (!versionSignalee) { versionSignalee = true; surEvenement("version", { autre: m?.v }); }
        return;
      }
      derniere = horloge.maintenant();
      if (injoignableDepuis !== null) {
        const duree = derniere - injoignableDepuis;
        injoignableDepuis = null;
        surEvenement("revenu", { duree });
      }
      if (m.type !== "battement") surEvenement("message", m);
    },
    demarrer() {
      derniere = horloge.maintenant();
      const tic = () => {
        canal.envoyer("battement");
        const t = horloge.maintenant();
        if (injoignableDepuis === null && t - derniere > INJOIGNABLE_MS) {
          injoignableDepuis = derniere;
          surEvenement("injoignable", { depuis: derniere });
        }
        arret = horloge.minuterie(tic, BATTEMENT_MS);
      };
      arret = horloge.minuterie(tic, BATTEMENT_MS);
    },
    arreter() { arret?.(); arret = null; },
    injoignable: () => injoignableDepuis !== null,
  };
  return canal;
}
