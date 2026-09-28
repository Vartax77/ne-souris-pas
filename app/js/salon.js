// Salon du prototype 1 (lot L1.1, D8 n° 303) : code, lien, et automate de l'hôte et de l'invité sur le serveur
// de mise en relation PeerJS. Sans accès à la page : PeerJS et l'horloge sont injectés, pour que
// tests/salon.test.mjs vérifie l'automate avec un faux serveur.

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const LONGUEUR_CODE = 20; // ≈ 119 bits : impossible à deviner (D4 §4.1 : au moins 16 caractères)
export const PREFIXE = "nsp-"; // identifiant PeerJS de l'hôte : nsp-<code>
export const EXPIRATION_MS = 15 * 60 * 1000; // salon sans invité (D2 T7, n° 159)
export const CONNEXION_MS = 20000; // invité sans réponse de l'hôte (D2 T9, critère C2)
const DELAI_FERMETURE_MS = 1000;
export const VERSION = 1; // version du protocole entre appareils (D4 §4.2) : champ v de chaque message // laisse partir « complet » avant de fermer la connexion refusée

// Code tiré par crypto.getRandomValues, sans biais : les octets ≥ 248 (4 × 62) sont rejetés.
export function creerCode(octets = (n) => crypto.getRandomValues(new Uint8Array(n))) {
  let code = "";
  while (code.length < LONGUEUR_CODE) {
    for (const o of octets(LONGUEUR_CODE)) {
      if (o < 248 && code.length < LONGUEUR_CODE) code += ALPHABET[o % 62];
    }
  }
  return code;
}

// Le code est après le « # » : le navigateur ne l'envoie jamais à l'hébergeur (D4 §1, principe 3).
export const lienDuSalon = (adresse, code) => `${adresse.split("#")[0]}#${code}`;
const FORMAT = new RegExp(`^[A-Za-z0-9]{${LONGUEUR_CODE}}$`);
export const codeDuLien = (fragment) => {
  const c = String(fragment ?? "").replace(/^#/, "");
  return FORMAT.test(c) ? c : null;
};

export const RECONNEXION_MS = 30000; // coupure : reprise possible pendant 30 s (D2 §6.4.1)
const ESSAI_REPRISE_MS = 2000; // l'invité retente de joindre l'hôte toutes les 2 s pendant la coupure
const ESSAI_OUVERTURE_MS = 5000; // une tentative de reprise qui ne s'ouvre pas en 5 s est abandonnée
const SONDE_MS = 3000; // sonde de présence : sans verdict en 3 s, aucun vainqueur
const VEILLE_MS = 60000; // le vainqueur par forfait reste joignable 60 s pour le dire à l'absent qui revient

// États annoncés par surEtat(etat, info) :
//   "attente" (hôte, info : { code, ms }) ; "trouve" (info : { ms, hote, peer, conn, autre }) : la connexion
//   de données sert ensuite de canal de jeu, et le pair à l'appel vidéo (L1.2) ;
//   "coupure" (info : { depuis }) : adversaire injoignable, reprise possible pendant 30 s (L1.3) ;
//   "reprise" (info : { conn, hote, autre }) : nouvelle connexion après une coupure ; "retabli" : l'ancienne
//   connexion a repris d'elle-même ;
//   après 30 s, arbitrage du serveur de présence (D2 §6.4.3) : "forfait_gagne" (l'autre n'est plus relié au
//   serveur), "forfait_perdu" (cet appareil n'était plus relié, l'autre l'est : ER13), "interrompu" (aucun
//   vainqueur : ER10) ;
//   "er4" connexion impossible (D5 ER4, info : { cause }) ; "er5" adversaire parti ; "er6" lien plus valable ;
//   "er11" personne n'a rejoint ; "ferme" (Quitter, Annuler).
// creerPeer(id) : objet compatible PeerJS (on, connect, disconnect, reconnect, destroy, open, disconnected).
// horloge : { maintenant() en ms, minuterie(fn, ms) → fonction d'annulation }.
// surMessage(m) : messages qui ne concernent pas le salon (canal de jeu).
export function creerSalon({ creerPeer, horloge, surEtat, surMessage = () => {}, nouveauCode = creerCode }) {
  let peer = null, conn = null, fini = true, trouve = false, hote = false, autre = null, jeton = null;
  let coupure = null; // { depuis, serveurPerdu } pendant une coupure
  const annulations = [];
  const minuterie = (fn, ms) => annulations.push(horloge.minuterie(fn, ms));
  const annuler = () => annulations.splice(0).forEach((a) => a());

  let enVeille = false; // vainqueur par forfait : répond « forfait » aux sondes pendant 60 s
  function fin(etat, info, veille = false) {
    if (fini) return;
    fini = true;
    annuler();
    if (veille) {
      enVeille = true;
      const p = peer;
      horloge.minuterie(() => { enVeille = false; p.destroy(); }, VEILLE_MS);
    } else {
      peer?.destroy(); // le code devient invalide (n° 159)
    }
    surEtat(etat, info);
  }

  function debut() {
    fini = false;
    trouve = false;
    conn = null;
    coupure = null;
  }

  // Le serveur perd la connexion (page masquée sur iPhone, réseau) : se réinscrire sous le même identifiant,
  // toutes les 2 s tant qu'il ne répond pas. Pendant une coupure, noter que cet appareil l'a perdu.
  // Critère : p.open (inscrit au serveur), pas p.disconnected : pendant une coupure, une réinscription peut
  // rester bloquée « en cours » (disconnected faux, open faux) ; on repart alors d'une déconnexion propre.
  let reinscription = false;
  function suivreServeur(p) {
    p.on("disconnected", () => {
      if (fini || p !== peer) return;
      if (coupure) coupure.serveurPerdu = true;
      if (reinscription) return;
      reinscription = true;
      const retenter = () => {
        if (fini || p !== peer || p.open) { reinscription = false; return; }
        try {
          if (!p.disconnected) p.disconnect();
          p.reconnect();
        } catch { /* réseau absent : on retentera */ }
        horloge.minuterie(retenter, ESSAI_REPRISE_MS);
      };
      retenter();
    });
  }
  const surServeur = () => Boolean(peer?.open);

  // Messages du salon, dans l'enveloppe de D4 §4.2 : { v, type: "bienvenue" | "complet" | "au_revoir" }.
  const message = (type, data) => ({ v: VERSION, type, ...(data ? { data } : {}) });
  const annoncerTrouve = (ms) => surEtat("trouve", { ms, hote, peer, conn, autre });

  function suivreConnexion(c, t0) {
    c.on("data", (m) => {
      if (c !== conn) return;
      if (m?.type === "bienvenue") {
        if (trouve) return;
        trouve = true;
        jeton = m.data?.jeton ?? null;
        annuler();
        annoncerTrouve(horloge.maintenant() - t0);
      } else if (m?.type === "complet") fin("er6");
      else if (m?.type === "au_revoir") fin("er5");
      else if (!fini) surMessage(m);
    });
    // Connexion fermée sans « au revoir » : avant la rencontre, le salon n'est plus valable (invité) ou revient
    // en attente (hôte) ; après, c'est une coupure (L1.3).
    c.on("close", () => {
      if (c !== conn || fini) return;
      if (!trouve) {
        if (hote) conn = null;
        else fin("er6");
        return;
      }
      conn = null;
      signalerCoupure();
    });
  }

  // Coupure : silence de 3 s constaté par le canal (duel.js), ou connexion fermée. Reprise pendant 30 s ; l'invité
  // retente de joindre l'hôte ; au-delà, le serveur de présence arbitre.
  function signalerCoupure() {
    if (fini || !trouve || coupure) return;
    coupure = { depuis: horloge.maintenant(), serveurPerdu: !surServeur() };
    surEtat("coupure", { depuis: coupure.depuis });
    if (!hote) retenterReprise();
    minuterie(() => arbitrer(), RECONNEXION_MS);
  }

  // Une tentative à la fois, que l'ancienne connexion soit signalée fermée ou non : une coupure constatée par le
  // silence laisse souvent l'ancienne connexion « ouverte » mais morte. Tentative abandonnée après 5 s sans
  // ouverture, ou sur la réponse « pair introuvable » du serveur (surErreurApresRencontre).
  function retenterReprise() {
    if (fini || !coupure || hote || coupure.arbitrage) return;
    if (!coupure.essai && surServeur()) {
      const c = peer.connect(autre, { reliable: true, metadata: { reprise: jeton } });
      coupure.essai = c;
      const abandonner = horloge.minuterie(() => {
        if (coupure?.essai !== c) return;
        coupure.essai = null;
        try { c.close(); } catch { /* déjà fermée */ }
      }, ESSAI_OUVERTURE_MS);
      c.on("open", () => {
        abandonner();
        if (fini || !coupure || coupure.essai !== c) return c.close();
        coupure.essai = null;
        const ancienne = conn;
        conn = c;
        suivreConnexion(c, horloge.maintenant());
        try { if (ancienne && ancienne !== c) ancienne.close(); } catch { /* déjà fermée */ }
        reprendre();
      });
    }
    minuterie(() => retenterReprise(), ESSAI_REPRISE_MS);
  }

  function reprendre() {
    coupure = null;
    annuler();
    surEtat("reprise", { conn, hote, autre, peer });
  }

  // L'ancienne connexion a repris d'elle-même (coupure courte) : plus de coupure.
  function retablir() {
    if (!coupure || fini) return;
    coupure = null;
    annuler();
    surEtat("retabli", {});
  }

  // Sonde de présence (D2 §6.4.3, n° 187) : le serveur dit si l'autre appareil lui est encore relié
  // (« pair introuvable » : absent) ; s'il l'est, il répond par un verdict : « forfait » s'il a gagné par
  // forfait, sinon « pas de forfait ». rendre({ present, forfait }).
  function sonder(rendre) {
    let rendu = false;
    const une = (r) => { if (!rendu) { rendu = true; sondeEnCours = null; rendre(r); } };
    sondeEnCours = () => une({ present: false, forfait: false });
    const c = peer.connect(autre, { reliable: true, metadata: { sonde: true } });
    c.on("data", (m) => { if (m?.type === "verdict") { une({ present: true, forfait: Boolean(m.data?.forfait) }); c.close(); } });
    horloge.minuterie(() => une({ present: true, forfait: false }), SONDE_MS);
  }

  // Réponse à la sonde de l'autre appareil.
  function repondreSonde(c) {
    c.on("open", () => {
      c.send(message("verdict", { forfait: enVeille }));
      horloge.minuterie(() => c.close(), DELAI_FERMETURE_MS);
    });
  }
  let sondeEnCours = null;

  function arbitrer() {
    if (fini || !coupure) return;
    coupure.arbitrage = true; // plus de tentative de reprise : la réponse du serveur irait à la sonde
    // Cet appareil a perdu le serveur : attendre de le retrouver, puis sonder l'autre.
    if (coupure.serveurPerdu || !surServeur()) {
      const attendreServeur = () => {
        if (fini) return;
        if (!surServeur()) return horloge.minuterie(attendreServeur, 1000);
        sonder((r) => fin(r.present && r.forfait ? "forfait_perdu" : "interrompu"));
      };
      return attendreServeur();
    }
    sonder((r) => (r.present ? fin("interrompu") : fin("forfait_gagne", {}, true)));
  }

  function surErreurApresRencontre(e) {
    // Réponse du serveur à une sonde ou à une tentative de reprise : l'autre n'est pas (encore) revenu.
    if (e?.type === "peer-unavailable") {
      if (sondeEnCours) sondeEnCours();
      else if (coupure?.essai) coupure.essai = null; // l'autre n'est pas encore revenu : on retentera
      return;
    }
    // Autres erreurs réseau pendant une coupure : la reprise et l'arbitrage s'en chargent.
  }

  function creer(essai = 1) {
    debut();
    hote = true;
    jeton = creerCode(); // jeton de reprise, remis à l'invité dans « bienvenue »
    const t0 = horloge.maintenant();
    const code = nouveauCode();
    const p = (peer = creerPeer(PREFIXE + code));
    suivreServeur(p);
    p.on("open", () => {
      if (fini || p !== peer || trouve) return;
      surEtat("attente", { code, ms: horloge.maintenant() - t0 });
      minuterie(() => { if (!trouve) fin("er11"); }, EXPIRATION_MS);
    });
    p.on("error", (e) => {
      if (p !== peer) return;
      if (trouve) return surErreurApresRencontre(e);
      if (e?.type === "unavailable-id" && essai === 1) {
        fini = true; // identifiant déjà pris : un nouveau code, une seule fois
        peer.destroy();
        return creer(2);
      }
      fin("er4", { cause: e?.type ?? String(e) });
    });
    p.on("connection", (c) => {
      if (p !== peer) return;
      if (fini && !(enVeille && c.metadata?.sonde)) return;
      const meta = c.metadata ?? {};
      if (meta.sonde) return repondreSonde(c);
      // Reprise après une coupure : l'invité revient avec son jeton.
      if (trouve && meta.reprise && meta.reprise === jeton && c.peer === autre) {
        const ancienne = conn;
        conn = c;
        suivreConnexion(c, horloge.maintenant());
        c.on("open", () => {
          if (c !== conn) return;
          try { ancienne?.close(); } catch { /* déjà fermée */ }
          if (coupure) reprendre();
          else surEtat("reprise", { conn, hote, autre, peer });
        });
        return;
      }
      if (conn || trouve) {
        // Salon verrouillé à deux (n° 159) : le troisième est refusé.
        c.on("open", () => {
          c.send(message("complet"));
          horloge.minuterie(() => c.close(), DELAI_FERMETURE_MS);
        });
        return;
      }
      conn = c;
      autre = c.peer;
      const tc = horloge.maintenant();
      suivreConnexion(c, tc);
      c.on("open", () => {
        if (c !== conn) return;
        c.send(message("bienvenue", { jeton }));
        if (!trouve) {
          trouve = true;
          annuler();
          annoncerTrouve(horloge.maintenant() - tc);
        }
      });
    });
  }

  function rejoindre(code) {
    debut();
    hote = false;
    autre = PREFIXE + code;
    const t0 = horloge.maintenant();
    peer = creerPeer(PREFIXE + "i-" + nouveauCode());
    suivreServeur(peer);
    minuterie(() => { if (!trouve) fin("er4", { cause: "délai de 20 s dépassé" }); }, CONNEXION_MS);
    peer.on("open", () => {
      if (fini || conn || trouve) return;
      conn = peer.connect(autre, { reliable: true });
      suivreConnexion(conn, t0);
    });
    peer.on("connection", (c) => { if (c.metadata?.sonde) repondreSonde(c); else c.close(); });
    peer.on("error", (e) => {
      if (trouve) return surErreurApresRencontre(e);
      if (e?.type === "peer-unavailable") fin("er6"); // salon introuvable, expiré ou fermé (T6)
      else fin("er4", { cause: e?.type ?? String(e) });
    });
  }

  // « Quitter » ou « Annuler » : prévenir l'autre, puis fermer le salon.
  function quitter() {
    if (fini) return;
    try { conn?.send(message("au_revoir")); } catch { /* connexion déjà fermée */ }
    fin("ferme");
  }

  return { creer: () => creer(1), rejoindre, quitter, signalerCoupure, retablir, enCoupure: () => Boolean(coupure) };
}
