// Salon du prototype 1 (lot L1.1, D8 n° 303) : code, lien, et automate de l'hôte et de l'invité sur le serveur
// de mise en relation PeerJS. Sans accès à la page : PeerJS et l'horloge sont injectés, pour que
// tests/salon.test.mjs vérifie l'automate avec un faux serveur.

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const LONGUEUR_CODE = 20; // ≈ 119 bits : impossible à deviner (D4 §4.1 : au moins 16 caractères)
export const PREFIXE = "nsp-"; // identifiant PeerJS de l'hôte : nsp-<code>
export const EXPIRATION_MS = 15 * 60 * 1000; // salon sans invité (D2 T7, n° 159)
export const CONNEXION_MS = 20000; // invité sans réponse de l'hôte (D2 T9, critère C2)
const DELAI_FERMETURE_MS = 1000; // laisse partir « complet » avant de fermer la connexion refusée

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

// États annoncés par surEtat(etat, info) :
//   "attente" (hôte, info : { code, ms }) ; "trouve" (info : { ms }) ;
//   "er4" connexion impossible (D5 ER4, info : { cause }) ; "er5" adversaire parti ;
//   "er6" lien plus valable ; "er11" personne n'a rejoint ; "ferme" (Quitter, Annuler).
// creerPeer(id) : objet compatible PeerJS (on, connect, reconnect, destroy).
// horloge : { maintenant() en ms, minuterie(fn, ms) → fonction d'annulation }.
export function creerSalon({ creerPeer, horloge, surEtat, nouveauCode = creerCode }) {
  let peer = null, conn = null, fini = true, trouve = false;
  const annulations = [];
  const minuterie = (fn, ms) => annulations.push(horloge.minuterie(fn, ms));

  function fin(etat, info) {
    if (fini) return;
    fini = true;
    annulations.splice(0).forEach((a) => a());
    peer?.destroy(); // le code devient invalide (n° 159)
    surEtat(etat, info);
  }

  function debut() {
    fini = false;
    trouve = false;
    conn = null;
  }

  // Le serveur perd la connexion (page masquée sur iPhone, réseau) : se réinscrire sous le même identifiant.
  function suivreServeur(p) {
    p.on("disconnected", () => { if (!fini && p === peer) p.reconnect(); });
  }

  // Messages entre les deux appareils : { t: "bienvenue" | "complet" | "au_revoir" }.
  // hote : chez l'hôte, une connexion qui tombe avant d'avoir abouti remet le salon en attente.
  function suivreConnexion(c, t0, hote = false) {
    c.on("data", (m) => {
      if (m?.t === "bienvenue" && !trouve) {
        trouve = true;
        annulations.splice(0).forEach((a) => a());
        surEtat("trouve", { ms: horloge.maintenant() - t0 });
      } else if (m?.t === "complet") fin("er6");
      else if (m?.t === "au_revoir") fin("er5");
    });
    // Connexion fermée sans message : avant la rencontre, le salon n'est plus valable ; après, l'autre est parti.
    c.on("close", () => {
      if (c !== conn) return;
      if (hote && !trouve) conn = null;
      else fin(trouve ? "er5" : "er6");
    });
  }

  function creer(essai = 1) {
    debut();
    const t0 = horloge.maintenant();
    const code = nouveauCode();
    const p = (peer = creerPeer(PREFIXE + code));
    suivreServeur(p);
    p.on("open", () => {
      if (fini || p !== peer) return;
      surEtat("attente", { code, ms: horloge.maintenant() - t0 });
      minuterie(() => { if (!trouve) fin("er11"); }, EXPIRATION_MS);
    });
    p.on("error", (e) => {
      if (p !== peer) return;
      if (e?.type === "unavailable-id" && essai === 1) {
        fini = true; // identifiant déjà pris : un nouveau code, une seule fois
        peer.destroy();
        return creer(2);
      }
      fin("er4", { cause: e?.type ?? String(e) });
    });
    p.on("connection", (c) => {
      if (p !== peer) return;
      if (conn) {
        // Salon verrouillé à deux (n° 159) : le troisième est refusé.
        c.on("open", () => {
          c.send({ t: "complet" });
          horloge.minuterie(() => c.close(), DELAI_FERMETURE_MS);
        });
        return;
      }
      conn = c;
      const tc = horloge.maintenant();
      suivreConnexion(c, tc, true);
      c.on("open", () => {
        c.send({ t: "bienvenue" });
        if (!trouve) {
          trouve = true;
          annulations.splice(0).forEach((a) => a());
          surEtat("trouve", { ms: horloge.maintenant() - tc });
        }
      });
    });
  }

  function rejoindre(code) {
    debut();
    const t0 = horloge.maintenant();
    peer = creerPeer(PREFIXE + "i-" + nouveauCode());
    suivreServeur(peer);
    minuterie(() => { if (!trouve) fin("er4", { cause: "délai de 20 s dépassé" }); }, CONNEXION_MS);
    peer.on("open", () => {
      if (fini || conn) return;
      conn = peer.connect(PREFIXE + code, { reliable: true });
      suivreConnexion(conn, t0);
    });
    peer.on("error", (e) => {
      if (e?.type === "peer-unavailable") fin("er6"); // salon introuvable, expiré ou fermé (T6)
      else fin("er4", { cause: e?.type ?? String(e) });
    });
  }

  // « Quitter » ou « Annuler » : prévenir l'autre, puis fermer le salon.
  function quitter() {
    if (fini) return;
    try { conn?.send({ t: "au_revoir" }); } catch { /* connexion déjà fermée */ }
    fin("ferme");
  }

  return { creer: () => creer(1), rejoindre, quitter };
}
