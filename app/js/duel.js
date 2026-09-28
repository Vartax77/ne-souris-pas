// Page du prototype 1 : salon (L1.1), appel et relais (L1.2), canal de jeu et coupures (L1.3), horloges (L1.4).
// Branche l'automate du salon (salon.js), le canal (canal.js) et les fonctions de l'appel (appel.js) sur la page,
// sur PeerJS et sur WebRTC. Textes exacts de D5.

import { creerSalon, codeDuLien, lienDuSalon } from "./salon.js";
import { creerCanal } from "./canal.js";
import { METERED, STUN_SEUL, DEBIT_MAX, filtrerRelais, preferH264, estIOS, appareil, lireAppel, resumeAppel, csvP1 } from "./appel.js";
import { synchroniser, ECHANGES, ESPACEMENT_MS, CADENCE_P1, creerDetecteurFlash, apparier, csvFlashs } from "./horloges.js";
import { luminance } from "./mesures.js";

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
  er9: ["Votre adversaire utilise une autre version du jeu. Rechargez tous les deux la page.", "Recharger"],
  er10: ["Connexion perdue. Match interrompu.", "Créer un nouveau duel"],
  er13: ["Match perdu par forfait.", "Créer un nouveau duel"],
  forfait: ["Votre adversaire n'est pas revenu. Victoire par forfait.", "Créer un nouveau duel"], // D2 §6.4.3
};
// Bandeau de coupure (D3 §2.3.4, K1).
const BANDEAU_COUPURE = "Votre adversaire a perdu la connexion";

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
    sync ? `Horloges : mesure n° ${sync.n} · aller-retour minimal ${f(sync.aMin, 1)} ms · θ ${f(sync.theta, 1)} ms · e ${f(sync.e, 1)} ms · W ${f(sync.w, 0)} ms` : null,
    flash.actif || flash.lignes.length ? resumeFlashs() : null,
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
  canal?.arreter();
  flash.actif = false;
}

let fermetureSilencieuse = false;
function erreur(code, cause = "") {
  canal?.arreter();
  $("bandeau").hidden = true;
  noterEssai(code === "forfait" ? Boolean(essai?.etabli) : false, code);
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

// Canal de jeu (D4 §4.2, L1.3) : enveloppe, battement, silence de 3 s ; transport = connexion du moment.
let canal = null, connActuelle = null;
function ouvrirCanal(conn) {
  canal?.arreter();
  connActuelle = conn;
  canal = creerCanal({
    envoyer: (m) => connActuelle?.send(m), horloge,
    surEvenement(nom, info) {
      if (nom === "message") surMessage(info);
      else if (nom === "injoignable") salon.signalerCoupure();
      else if (nom === "revenu") salon.retablir();
      else if (nom === "version") erreur("er9", `version ${info.autre}`);
    },
  });
  canal.demarrer();
}

// Messages du canal de jeu. L1.2 : « bonjour », qui dit si l'autre appareil est un iPhone.
// L1.4 : synchronisation des horloges (sync_ping, sync_pong, sync_resultat) et flashs de l'invité.
function surMessage(m) {
  const d = m?.data ?? {};
  if (m?.type === "bonjour" && essai) {
    essai.autreAppareil = d.appareil;
    essai.autreIOS = Boolean(d.ios);
    essai.bonjourRecu?.();
  } else if (m?.type === "sync_ping") {
    const t2 = performance.now(); // réception, puis réponse aussitôt (D4 §5.1)
    canal?.envoyer("sync_pong", { k: d.k, t1: d.t1, t2, t3: performance.now() });
  } else if (m?.type === "sync_pong" && pings) {
    pings.echanges.push({ t1: d.t1, t2: d.t2, t3: d.t3, t4: performance.now() });
    if (pings.echanges.length === ECHANGES) terminerSynchro();
  } else if (m?.type === "sync_resultat") {
    sync = { aMin: d.a_min, theta: d.decalage, e: d.e, w: d.w, cadence: d.cadence, i: 1000 / d.cadence, n: d.n };
    afficherMesures();
  } else if (m?.type === "flash") {
    flash.invite.push(d);
    comparerFlashs();
  }
}

// Synchronisation des horloges (D4 §5.1, L1.4) : l'hôte mène 5 allers-retours espacés de 100 ms, garde le plus
// court, calcule θ, e et W, et envoie le résultat. Cadence commune : 15 im/s en P1, sans détection.
let sync = null, pings = null, numeroSync = 0;
function synchroniserHorloges() {
  if (!canal || !essai?.etabli || essai.role !== "hote" || pings) return;
  pings = { echanges: [] };
  for (let k = 0; k < ECHANGES; k += 1) {
    setTimeout(() => canal?.envoyer("sync_ping", { k, t1: performance.now() }), k * ESPACEMENT_MS);
  }
  pings.delai = setTimeout(terminerSynchro, ECHANGES * ESPACEMENT_MS + 1000);
}
function terminerSynchro() {
  const p = pings;
  pings = null;
  clearTimeout(p?.delai);
  const s = p && synchroniser(p.echanges, CADENCE_P1);
  if (!s) return;
  numeroSync += 1;
  sync = { ...s, n: numeroSync };
  canal?.envoyer("sync_resultat", { decalage: s.theta, e: s.e, w: s.w, cadence: s.cadence, a_min: s.aMin, n: numeroSync });
  afficherMesures();
}

// Mesure par flash commun (D3 §2.3.3, L1.4) : chaque appareil repère les sauts de luminance de sa caméra (et de la
// vidéo reçue, pour le retard vidéo) ; l'invité envoie les siens ; l'hôte les convertit avec θ et note l'écart.
// Resynchronisation tous les 5 flashs.
const flash = { actif: false, hote: [], invite: [], locaux: [], retards: [], lignes: [], dernier: -Infinity, intervalle: NaN };
const toileFlash = document.createElement("canvas");
toileFlash.width = 32;
toileFlash.height = 24;
const ctxFlash = toileFlash.getContext("2d", { willReadFrequently: true });
const TOUT = { x0: 0, y0: 0, x1: 1, y1: 1 };
function lumiere(video) {
  ctxFlash.drawImage(video, 0, 0, 32, 24);
  return luminance(ctxFlash.getImageData(0, 0, 32, 24).data, 32, 24, TOUT);
}
function suivreFlashs(video, surSaut, mesurerIntervalle = false) {
  const detecter = creerDetecteurFlash();
  let precedent = null;
  const ecarts = [];
  const tic = (maintenant) => {
    if (!flash.actif) return;
    if (video.videoWidth) {
      if (mesurerIntervalle && precedent !== null) {
        ecarts.push(maintenant - precedent);
        if (ecarts.length > 30) ecarts.shift();
        flash.intervalle = ecarts.reduce((a, b) => a + b, 0) / ecarts.length;
      }
      precedent = maintenant;
      const saut = detecter(maintenant, lumiere(video));
      if (saut) surSaut(saut);
    }
    video.requestVideoFrameCallback(tic);
  };
  video.requestVideoFrameCallback(tic);
}
function demarrerFlashs() {
  if (flash.actif || !essai?.etabli) return;
  flash.actif = true;
  suivreFlashs($("video-moi"), (s) => {
    flash.locaux.push(s);
    if (essai?.role === "hote") { flash.hote.push(s); comparerFlashs(); } else canal?.envoyer("flash", s);
    afficherMesures();
  }, true);
  // Retard vidéo : le même flash vu par sa caméra, puis dans la vidéo reçue (les deux sur son horloge).
  suivreFlashs($("video-adverse"), (s) => {
    const l = flash.locaux.filter((x) => x.sens === s.sens && s.t - x.t >= 0 && s.t - x.t < 1000).at(-1);
    if (l) flash.retards.push(s.t - l.t);
    afficherMesures();
  });
}
function comparerFlashs() {
  if (!sync || essai?.role !== "hote") return;
  const nouvelles = apparier(flash.hote, flash.invite, sync.theta).filter((p) => p.tHote > flash.dernier);
  for (const p of nouvelles) {
    flash.dernier = p.tHote;
    const i = Number.isFinite(flash.intervalle) ? flash.intervalle : sync.i;
    flash.lignes.push({
      combi: $("opt-combi").value, numero: flash.lignes.length + 1, ecart_ms: p.ecart, e_ms: sync.e, i_ms: i,
      w_ms: sync.w, a_min_ms: sync.aMin, sens: p.sens, dans_e_plus_i: Math.abs(p.ecart) <= sync.e + i ? 1 : 0,
    });
    if (flash.lignes.length % 5 === 0) synchroniserHorloges(); // comme avant chaque manche (D3 §2.3.3)
  }
  afficherMesures();
}
const mediane = (x) => { const t = [...x].sort((a, b) => a - b); return t.length ? t[(t.length - 1) >> 1] : NaN; };
function resumeFlashs() {
  const dans = flash.lignes.filter((l) => l.dans_e_plus_i).length;
  return `Flashs : ${flash.locaux.length} vus${essai?.role === "hote" ? ` · ${flash.lignes.length} appariés · écart médian ${f(mediane(flash.lignes.map((l) => l.ecart_ms)), 0)} ms · dans e + i : ${dans}/${flash.lignes.length}` : ""} · retard vidéo médian ${f(mediane(flash.retards), 0)} ms`;
}

// L'appel commence quand les deux appareils se sont trouvés : l'invité appelle, l'hôte répond.
// H.264 en tête si un des deux appareils est un iPhone (n° 177), débit plafonné à 1,7 Mbit/s.
function commencerAppel({ hote, peer, conn, autre }) {
  const bonjour = new Promise((ok) => { essai.bonjourRecu = ok; });
  ouvrirCanal(conn);
  canal.envoyer("bonjour", { role: hote ? "hote" : "invite", ios: estIOS(), appareil: appareil() });
  if (hote) {
    // L'hôte répond à chaque appel de l'invité : le premier, puis celui qui suit une reprise.
    peer.on("call", async (appel) => {
      await bonjour;
      suivreAppel(appel);
      appel.answer(flux, { sdpTransform: transformer() });
    });
  } else {
    bonjour.then(() => appeler(peer, autre));
  }
}

const transformer = () => (estIOS() || essai?.autreIOS ? preferH264 : (sdp) => sdp);
function suivreAppel(appel) {
  const ancien = essai.appel;
  essai.appel = appel;
  if (ancien && ancien !== appel) ancien.close();
  appel.on("stream", (distant) => recevoir(appel, distant));
  appel.on("error", (e) => { if (!essai?.etabli) erreur("er4", e?.type ?? String(e)); });
}
const appeler = (peer, autre) => suivreAppel(peer.call(autre, flux, { sdpTransform: transformer() }));

function recevoir(appel, distant) {
  const v = $("video-adverse");
  if (!essai || appel !== essai.appel || v.srcObject === distant) return;
  v.srcObject = distant;
  // Lecture avec le son ; si iOS la refuse sans geste (RT8), lecture muette et bouton « Activer le son ».
  v.play().catch(() => { v.muted = true; v.play().catch(() => {}); $("activer-son").hidden = false; });
  // Établi à la première image de l'adversaire affichée (critère C2).
  // Après une reprise, les mesures repartent sur le nouvel appel.
  v.requestVideoFrameCallback(async () => {
    if (!essai || appel !== essai.appel) return;
    if (!essai.etabli) {
      essai.etabli = true;
      essai.tEtab = performance.now() - essai.debut;
      clearTimeout(essai.delai);
    }
    if (!appel.peerConnection) return; // appel déjà fermé (coupure) : la reprise refera un appel
    const envoi = appel.peerConnection.getSenders().find((s) => s.track?.kind === "video");
    const p = envoi?.getParameters();
    if (p?.encodings?.length) {
      p.encodings[0].maxBitrate = DEBIT_MAX;
      await envoi.setParameters(p).catch(() => {});
    }
    const relever = async () => lireAppel((await appel.peerConnection.getStats()).values(), performance.now());
    try { essai.premier = await relever(); } catch { return; }
    clearInterval(essai.stats);
    essai.stats = setInterval(async () => {
      // Appel fermé pendant une coupure : pas de relevé, on garde le dernier.
      try { essai.dernier = await relever(); } catch { return; }
      afficherMesures();
    }, 2000);
    etat = "appel établi";
    detail = "";
    montrer("appel");
    // Horloges (L1.4) : l'hôte synchronise à l'établissement et après chaque reprise, et sur demande.
    $("mesurer").hidden = essai.role !== "hote";
    setTimeout(synchroniserHorloges, 1500);
    if ($("opt-flash").checked) demarrerFlashs();
    afficherMesures();
  });
}

const salon = creerSalon({
  creerPeer, horloge, surMessage: (m) => canal?.recevoir(m), // tout message passe par le canal (battement compris)
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
    } else if (e === "coupure") {
      $("bandeau").textContent = BANDEAU_COUPURE;
      $("bandeau").hidden = false;
      essai.coupures = (essai.coupures ?? 0) + 1;
      detail = "reprise possible pendant 30 s";
    } else if (e === "retabli") {
      $("bandeau").hidden = true;
      etat = "appel établi";
      detail = "connexion revenue d'elle-même";
    } else if (e === "reprise") {
      $("bandeau").hidden = true;
      detail = "reprise après coupure";
      ouvrirCanal(info.conn);
      if (!info.hote) appeler(info.peer, info.autre); // l'invité rappelle ; l'hôte répondra
    } else if (e === "forfait_gagne" || e === "forfait_perdu" || e === "interrompu") {
      canal?.arreter();
      erreur({ forfait_gagne: "forfait", forfait_perdu: "er13", interrompu: "er10" }[e]);
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
  // Nouvel essai : nouvelles horloges et nouveaux flashs ; le journal des flashs, lui, s'allonge.
  sync = null;
  numeroSync = 0;
  Object.assign(flash, { actif: false, hote: [], invite: [], locaux: [], retards: [], dernier: -Infinity, intervalle: NaN });
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
  if (etat === "er9") return location.reload();
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
$("mesurer").addEventListener("click", synchroniserHorloges);
$("opt-flash").addEventListener("change", () => { if ($("opt-flash").checked) demarrerFlashs(); });
$("export-flash").addEventListener("click", () => {
  if (!flash.lignes.length) return;
  const lien = document.createElement("a");
  lien.href = URL.createObjectURL(new Blob([csvFlashs(flash.lignes)], { type: "text/csv;charset=utf-8" }));
  lien.download = `journal_flashs_P1_${new Date().toLocaleDateString("sv")}.csv`;
  lien.click();
  URL.revokeObjectURL(lien.href);
});

// Au chargement : un lien valable fait de cet appareil l'invité ; un fragment invalide est un lien plus valable.
if (codeInvite) montrer("accueil-invite");
else if (location.hash.length > 1) {
  etat = "er6";
  $("erreur-message").textContent = ERREURS.er6[0];
  $("erreur-bouton").textContent = ERREURS.er6[1];
  montrer("erreur");
} else montrer("accueil-hote");
afficherMesures();
