// Page du prototype 1 (lot L1.1) : branche l'automate du salon (salon.js) sur la page et sur PeerJS.
// Textes exacts de D5 (E1, E3, ER4, ER5, ER6, ER11).

import { creerSalon, codeDuLien, lienDuSalon } from "./salon.js";

const $ = (id) => document.getElementById(id);
const f = (n, d = 1) => (Number.isFinite(n) ? n.toFixed(d).replace(".", ",") : "—");

// Chargements bloqués par la politique de sécurité (comme en P0, n° 221) : doit rester à 0.
const bloques = [];
document.addEventListener("securitypolicyviolation", (e) => {
  bloques.push(`${e.effectiveDirective} : ${e.blockedURI}`);
  afficherMesures();
});

// Serveurs ICE : STUN de Metered seul ; le STUN de Google et le relais public de PeerJS, mis par défaut dans
// la bibliothèque, sont remplacés (D4 §8.4). Le relais TURN arrive au lot L1.2b.
const ICE = [{ urls: "stun:stun.relay.metered.ca:80" }];
const creerPeer = (id) => new window.Peer(id, { config: { iceServers: ICE }, debug: 0 });
const horloge = {
  maintenant: () => performance.now(),
  minuterie: (fn, ms) => { const h = setTimeout(fn, ms); return () => clearTimeout(h); },
};

const ECRANS = ["accueil-hote", "accueil-invite", "attente", "connexion", "trouve", "erreur"];
function montrer(id) {
  for (const e of ECRANS) $(e).hidden = e !== id;
}

const ERREURS = {
  er4: ["Impossible de joindre votre adversaire. Vérifiez votre connexion internet, puis réessayez.", "Réessayer"],
  er5: ["Votre adversaire est parti.", "Créer un nouveau duel"],
  er6: ["Ce lien n'est plus valable. Demandez un nouveau lien à votre adversaire.", "Créer mon propre duel"],
  er11: ["Personne n'a rejoint. Le lien a expiré.", "Créer un nouveau duel"],
};

let codeInvite = codeDuLien(location.hash); // présent : cet appareil est l'invité
let etat = "—", detail = "", echecsConnexion = 0;

function afficherMesures() {
  $("mesures").textContent = [
    `Rôle : ${codeInvite ? "invité" : "hôte"}`,
    `État : ${etat}${detail ? ` — ${detail}` : ""}`,
    `Chargements externes bloqués : ${bloques.length}`,
    ...bloques.map((b) => `  ${b}`),
  ].join("\n");
}

// Repartir comme hôte : le lien reçu n'est plus utilisé.
function devenirHote() {
  codeInvite = null;
  history.replaceState(null, "", location.pathname + location.search);
  montrer("accueil-hote");
}

const salon = creerSalon({
  creerPeer, horloge,
  surEtat(e, info = {}) {
    etat = e;
    detail = "";
    if (e === "attente") {
      const lien = lienDuSalon(location.href, info.code);
      $("lien").textContent = lien;
      $("copier").textContent = "Copier";
      detail = `salon ouvert en ${f(info.ms / 1000)} s`;
      montrer("attente");
    } else if (e === "trouve") {
      $("trouve-temps").textContent = `En ${f(info.ms / 1000)} s.`;
      detail = `mise en relation en ${f(info.ms / 1000)} s`;
      echecsConnexion = 0;
      montrer("trouve");
    } else if (e === "ferme") {
      codeInvite ? devenirHote() : montrer("accueil-hote");
    } else {
      const [message, bouton] = ERREURS[e];
      if (e === "er4") echecsConnexion += 1;
      // Après deux échecs, le conseil de D5 ER4.
      $("erreur-message").textContent = echecsConnexion >= 2 && e === "er4"
        ? `${message} Essayez de passer du Wi-Fi à la 4G, ou l'inverse.` : message;
      $("erreur-bouton").textContent = bouton;
      detail = info.cause ?? "";
      montrer("erreur");
    }
    afficherMesures();
  },
});

$("creer").addEventListener("click", () => { etat = "ouverture du salon"; afficherMesures(); salon.creer(); });
$("rejoindre").addEventListener("click", () => {
  etat = "connexion";
  montrer("connexion");
  afficherMesures();
  salon.rejoindre(codeInvite);
});
$("annuler").addEventListener("click", () => salon.quitter());
$("quitter").addEventListener("click", () => salon.quitter());
$("copier").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("lien").textContent);
    $("copier").textContent = "Lien copié";
  } catch { /* presse-papiers refusé : le lien reste affiché, à sélectionner */ }
});
// Feuille de partage du système, si le navigateur en a une (iPhone) ; sinon « Copier » seul.
if (navigator.share) {
  $("partager").hidden = false;
  $("partager").addEventListener("click", () => navigator.share({ url: $("lien").textContent }).catch(() => {}));
}
$("erreur-bouton").addEventListener("click", () => {
  if (etat === "er4" && codeInvite) {
    montrer("connexion");
    salon.rejoindre(codeInvite);
  } else if (etat === "er4") {
    salon.creer();
  } else {
    devenirHote();
  }
});

// Au chargement : un lien valable fait de cet appareil l'invité ; un fragment invalide est un lien plus valable.
if (codeInvite) montrer("accueil-invite");
else if (location.hash.length > 1) salonInvalide();
else montrer("accueil-hote");
afficherMesures();

function salonInvalide() {
  etat = "er6";
  $("erreur-message").textContent = ERREURS.er6[0];
  $("erreur-bouton").textContent = ERREURS.er6[1];
  montrer("erreur");
}
