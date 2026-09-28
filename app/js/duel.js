// Page du prototype 1 : salon (L1.1), appel et relais (L1.2). Branche l'automate du salon (salon.js) et les
// fonctions de l'appel (appel.js) sur la page, sur PeerJS et sur WebRTC. Textes exacts de D5.

import { creerSalon, codeDuLien, lienDuSalon, VERSION } from "./salon.js";
import { METERED, STUN_SEUL, DEBIT_MAX, filtrerRelais, preferH264, estIOS, appareil, lireAppel, resumeAppel, csvP1 } from "./appel.js";

const $ = (id) => document.getElementById(id);
const f = (n, d = 1) => (Number.isFinite(n) ? n.toFixed(d).replace(".", ",") : "—");
const ETABLISSEMENT_MS = 20000; // image et son de l'adversaire des deux côtés (D2 T9, critère C2)

// Chargements bloqués par la politique de sécurité (comme en P0, n° 221) : doit rester à 0.
const bloques = [];
document.addEventListener("securitypolicyviolation", (e) => {
  bloques.push(`${e.effectiveDirective} : ${e.blockedURI}`);
  afficherMesures();
});

const horloge = {
  maintenant: () => performance.now(),
  minuterie: (fn, ms) => { const h = setTimeout(fn, ms); return () => clearTimeout(h); },
};

// Serveurs ICE de l'essai : relais Metered (identifiants demandés à chaque essai), filtrés selon le protocole
// choisi ; « relais forcé » = iceTransportPolicy « relay » (D3 §2.3.2). Le STUN de Google et le relais public
// de PeerJS, mis par défaut dans la bibliothèque, ne sont jamais utilisés (D4 §8.4).
let config = { iceServers: STUN_SEUL };
const creerPeer = (id) => new window.Peer(id, { config, debug: 0 });

async function preparerRelais() {
  let serveurs = STUN_SEUL;
  try {
    const r = await fetch(METERED);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    serveurs = await r.json();
  } catch (e) {
    relaisIndispo = `relais indisponible (${e.message ?? e}) : STUN seul`;
  }
  config = {
    iceServers: filtrerRelais(serveurs, $("opt-proto").value),
    iceTransportPolicy: $("opt-relais").checked ? "relay" : "all",
  };
}

const ECRANS = ["accueil-hote", "accueil-invite", "autorisation", "attente", "connexion", "appel", "erreur"];
function montrer(id) {
  for (const e of ECRANS) $(e).hidden = e !== id;
  $("video-moi").hidden = !["attente", "connexion", "appel"].includes(id);
}

const ERREURS = {
  er1: ["Sans caméra ni micro, le duel est impossible. Autorisez-les dans les réglages de votre navigateur, puis réessayez.", "Réessayer"],
  er2: ["Aucune caméra trouvée sur cet appareil. Essayez avec un téléphone ou un ordinateur équipé d'une webcam.", "Réessayer"],
  er12: ["Votre caméra est utilisée par une autre application. Fermez-la, puis réessayez.", "Réessayer"],
  er4: ["Impossible de joindre votre adversaire. Vérifiez votre connexion internet, puis réessayez.", "Réessayer"],
  er5: ["Votre adversaire est parti.", "Créer un nouveau duel"],
  er6: ["Ce lien n'est plus valable. Demandez un nouveau lien à votre adversaire.", "Créer mon propre duel"],
  er11: ["Personne n'a rejoint. Le lien a expiré.", "Créer un nouveau duel"],
};

let codeInvite = codeDuLien(location.hash); // présent : cet appareil est l'invité
let etat = "—", detail = "", echecsConnexion = 0, relaisIndispo = "";
let flux = null; // caméra et micro, arrêtés à la fin de chaque essai
let essai = null; // essai en cours : { debut, role, appel, autre, etabli, premier, dernier, ... }
const journal = []; // journal P1 (D3 §2.4), en mémoire jusqu'à l'export

function afficherMesures() {
  const r = essai?.premier && essai.dernier ? resumeAppel(essai.premier, essai.dernier) : null;
  $("mesures").textContent = [
    `Rôle : ${codeInvite ? "invité" : "hôte"} · ${appareil()}`,
    `État : ${etat}${detail ? ` — ${detail}` : ""}`,
    `Relais : ${config.iceTransportPolicy === "relay" ? "forcé" : "si nécessaire"} · protocole ${$("opt-proto").value}${relaisIndispo ? ` · ${relaisIndispo}` : ""}`,
    r ? `Appel : ${r.candidat}${r.relaisProto ? ` ${r.relaisProto}` : ""} · aller-retour ${f(r.rtt, 0)} ms · débit reçu ${f(r.debit, 0)} kbit/s · pertes ${f(r.pertes, 2)} % · gels ${r.gels}` : null,
    r ? `Vidéo : envoyée ${r.codecEnvoye} · reçue ${r.codecRecu} ${r.resolution} · image et son ${r.sonImg ? "oui" : "non"} · établi en ${f(essai.tEtab / 1000)} s` : null,
    `Journal P1 : ${journal.length} essai(s)`,
    `Chargements externes bloqués : ${bloques.length}`,
    ...bloques.map((b) => `  ${b}`),
  ].filter(Boolean).join("\n");
}

// Caméra et micro (E2), avec les messages de D5 (ER1, ER2, ER12). Même demande qu'en P0 : 640 × 480.
async function ouvrirCamera() {
  montrer("autorisation");
  try {
    flux = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }, audio: true,
    });
  } catch (e) {
    erreur({ NotAllowedError: "er1", NotFoundError: "er2", NotReadableError: "er12" }[e.name] ?? "er1", e.name);
    return false;
  }
  $("video-moi").srcObject = flux;
  $("video-moi").play().catch(() => {});
  return true;
}

function arreterCamera() {
  flux?.getTracks().forEach((p) => p.stop());
  flux = null;
  $("video-moi").srcObject = null;
  $("video-adverse").srcObject = null;
}

// Fin d'un essai : une ligne au journal P1 (réussi ou non), puis caméra et appel arrêtés.
function noterEssai(reussi, message = "") {
  if (!essai || essai.note) return;
  essai.note = true;
  clearInterval(essai.stats);
  clearTimeout(essai.delai);
  const r = essai.premier && essai.dernier ? resumeAppel(essai.premier, essai.dernier) : {};
  journal.push({
    essai: journal.length + 1, combi: $("opt-combi").value || (config.iceTransportPolicy === "relay" ? "RF" : ""),
    app_a: appareil(), app_b: essai.autreAppareil ?? "", reussi: reussi ? 1 : `0 ${message}`.trim(),
    t_etab: essai.tEtab != null ? essai.tEtab / 1000 : "", candidat: r.candidat ?? "", relais_proto: r.relaisProto ?? "",
    rtt: r.rtt, debit: r.debit, pertes: r.pertes, gels: r.gels, son_img: r.sonImg ?? 0,
    codec_envoye: r.codecEnvoye ?? "", codec_recu: r.codecRecu ?? "", resolution: r.resolution ?? "", role: essai.role,
  });
  essai.appel?.close();
}

let fermetureSilencieuse = false;
function erreur(code, cause = "") {
  noterEssai(false, code);
  // Erreur constatée par la page (délai, appel) : le salon est fermé sans afficher « fermé ».
  fermetureSilencieuse = true;
  salon.quitter();
  fermetureSilencieuse = false;
  arreterCamera();
  etat = code;
  detail = cause;
  if (code === "er4") echecsConnexion += 1;
  const [message, bouton] = ERREURS[code];
  $("erreur-message").textContent = echecsConnexion >= 2 && code === "er4"
    ? `${message} Essayez de passer du Wi-Fi à la 4G, ou l'inverse.` : message; // conseil de D5 ER4
  $("erreur-bouton").textContent = bouton;
  montrer("erreur");
  afficherMesures();
}

// Repartir comme hôte : le lien reçu n'est plus utilisé.
function devenirHote() {
  codeInvite = null;
  history.replaceState(null, "", location.pathname + location.search);
  montrer("accueil-hote");
  afficherMesures();
}

// Messages du canal de jeu (D4 §4.2). L1.2 : « bonjour », qui dit si l'autre appareil est un iPhone.
function surMessage(m) {
  if (m?.type === "bonjour" && essai) {
    essai.autreAppareil = m.data?.appareil;
    essai.autreIOS = Boolean(m.data?.ios);
    essai.bonjourRecu?.();
  }
}

// L'appel commence quand les deux appareils se sont trouvés : l'invité appelle, l'hôte répond.
// H.264 en tête si un des deux appareils est un iPhone (n° 177), débit plafonné à 1,7 Mbit/s.
function commencerAppel({ hote, peer, conn, autre }) {
  const bonjour = new Promise((ok) => { essai.bonjourRecu = ok; });
  conn.send({ v: VERSION, type: "bonjour", data: { role: hote ? "hote" : "invite", ios: estIOS(), appareil: appareil() } });
  const transformer = () => (estIOS() || essai.autreIOS ? preferH264 : (sdp) => sdp);
  const suivre = (appel) => {
    essai.appel = appel;
    appel.on("stream", (distant) => recevoir(appel, distant));
    appel.on("error", (e) => erreur("er4", e?.type ?? String(e)));
  };
  if (hote) {
    peer.on("call", async (appel) => {
      if (essai?.appel) return appel.close(); // un seul appel par essai
      suivre(appel);
      await bonjour;
      appel.answer(flux, { sdpTransform: transformer() });
    });
  } else {
    bonjour.then(() => suivre(peer.call(autre, flux, { sdpTransform: transformer() })));
  }
}

function recevoir(appel, distant) {
  const v = $("video-adverse");
  if (v.srcObject === distant) return;
  v.srcObject = distant;
  // Lecture avec le son ; si iOS la refuse sans geste (RT8), lecture muette et bouton « Activer le son ».
  v.play().catch(() => { v.muted = true; v.play().catch(() => {}); $("activer-son").hidden = false; });
  // Établi à la première image de l'adversaire affichée (critère C2).
  v.requestVideoFrameCallback(async () => {
    if (!essai || essai.etabli) return;
    essai.etabli = true;
    essai.tEtab = performance.now() - essai.debut;
    clearTimeout(essai.delai);
    const envoi = appel.peerConnection.getSenders().find((s) => s.track?.kind === "video");
    const p = envoi?.getParameters();
    if (p?.encodings?.length) {
      p.encodings[0].maxBitrate = DEBIT_MAX;
      await envoi.setParameters(p).catch(() => {});
    }
    const relever = async () => lireAppel((await appel.peerConnection.getStats()).values(), performance.now());
    essai.premier = await relever();
    essai.stats = setInterval(async () => {
      essai.dernier = await relever();
      afficherMesures();
    }, 2000);
    etat = "appel établi";
    detail = "";
    montrer("appel");
    afficherMesures();
  });
}

const salon = creerSalon({
  creerPeer, horloge, surMessage,
  surEtat(e, info = {}) {
    etat = e;
    detail = "";
    if (e === "attente") {
      $("lien").textContent = lienDuSalon(location.href, info.code);
      $("copier").textContent = "Copier";
      $("copier").disabled = $("partager").disabled = false;
      detail = `salon ouvert en ${f(info.ms / 1000)} s`;
      montrer("attente");
    } else if (e === "trouve") {
      detail = `mise en relation en ${f(info.ms / 1000)} s`;
      echecsConnexion = 0;
      if (info.hote) essai.debut = performance.now(); // l'hôte compte depuis l'arrivée de l'invité
      essai.role = info.hote ? "hote" : "invite";
      essai.delai = setTimeout(() => { if (!essai?.etabli) erreur("er4", "appel non établi en 20 s"); }, ETABLISSEMENT_MS);
      montrer("connexion");
      commencerAppel(info);
    } else if (e === "ferme") {
      if (fermetureSilencieuse) return;
      noterEssai(essai?.etabli ?? false, "quitté avant l'appel");
      arreterCamera();
      codeInvite ? devenirHote() : montrer("accueil-hote");
    } else {
      if (e === "er5") noterEssai(essai?.etabli ?? false, "er5");
      erreur(e, info.cause);
    }
    afficherMesures();
  },
});

async function demarrer(role) {
  essai = { debut: performance.now(), role };
  relaisIndispo = "";
  const [camera] = await Promise.all([ouvrirCamera(), preparerRelais()]);
  if (!camera) return;
  etat = role === "hote" ? "ouverture du salon" : "connexion";
  // Le lien n'existe qu'une fois le salon ouvert par le serveur : rien à copier avant.
  $("lien").textContent = "Préparation du lien…";
  $("copier").disabled = $("partager").disabled = true;
  montrer(role === "hote" ? "attente" : "connexion");
  afficherMesures();
  role === "hote" ? salon.creer() : salon.rejoindre(codeInvite);
}

$("creer").addEventListener("click", () => demarrer("hote"));
$("rejoindre").addEventListener("click", () => demarrer("invite"));
for (const id of ["annuler", "annuler-connexion", "quitter"]) $(id).addEventListener("click", () => salon.quitter());
$("activer-son").addEventListener("click", () => {
  $("video-adverse").muted = false;
  $("activer-son").hidden = true;
});
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
  if (["er1", "er2", "er12", "er4"].includes(etat) && codeInvite) demarrer("invite");
  else if (["er1", "er2", "er12", "er4"].includes(etat)) demarrer("hote");
  else devenirHote();
});
$("export").addEventListener("click", () => {
  if (!journal.length) return;
  const lien = document.createElement("a");
  lien.href = URL.createObjectURL(new Blob([csvP1(journal)], { type: "text/csv;charset=utf-8" }));
  lien.download = `journal_P1_${new Date().toLocaleDateString("sv")}.csv`;
  lien.click();
  URL.revokeObjectURL(lien.href);
});
for (const id of ["opt-relais", "opt-proto"]) $(id).addEventListener("change", afficherMesures);

// Au chargement : un lien valable fait de cet appareil l'invité ; un fragment invalide est un lien plus valable.
if (codeInvite) montrer("accueil-invite");
else if (location.hash.length > 1) {
  etat = "er6";
  $("erreur-message").textContent = ERREURS.er6[0];
  $("erreur-bouton").textContent = ERREURS.er6[1];
  montrer("erreur");
} else montrer("accueil-hote");
afficherMesures();
