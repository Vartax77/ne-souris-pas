// Appel du prototype 1 (lot L1.2) : relais Metered, préférence H.264, statistiques et journal P1.
// Fonctions pures, sans accès à la page : vérifiées par tests/appel.test.mjs.

// Relais Metered Open Relay (D4 §8.4). La clé d'API est écrite dans la page, publique : l'API d'identifiants
// est prévue pour être appelée depuis la page ; offre gratuite sans carte bancaire (n° 305).
export const METERED = "https://nojoke.metered.live/api/v1/turn/credentials?apiKey=23509fb1c625648e735108bbd1177868e662";
export const STUN_SEUL = [{ urls: "stun:stun.relay.metered.ca:80" }];
export const DEBIT_MAX = 1_700_000; // bit/s, vidéo envoyée (D4 §7.4, critère C5)

// Serveurs à garder selon le protocole de relais demandé pour un essai (D3 §2.3.2 : UDP, TCP, TLS sur 443).
// « tous » garde tout. Le STUN est toujours gardé (inutile en relais forcé, sans effet).
export function filtrerRelais(serveurs, protocole = "tous") {
  const garder = {
    tous: () => true,
    udp: (u) => u.startsWith("turn:") && !u.includes("transport=tcp"),
    tcp: (u) => u.startsWith("turn:") && u.includes("transport=tcp"),
    tls: (u) => u.startsWith("turns:"),
  }[protocole];
  return serveurs.filter((s) => {
    const u = [s.urls].flat()[0] ?? "";
    return u.startsWith("stun:") || garder(u);
  });
}

// Met les formats H.264 en tête de la ligne vidéo du SDP (n° 177 : H.264 quand un iPhone joue) ;
// l'appareil qui envoie prend le premier format commun. SDP sans H.264 : inchangé.
export function preferH264(sdp) {
  const lignes = sdp.split("\r\n");
  const iVideo = lignes.findIndex((l) => l.startsWith("m=video "));
  if (iVideo < 0) return sdp;
  let fin = lignes.findIndex((l, i) => i > iVideo && l.startsWith("m="));
  if (fin < 0) fin = lignes.length;
  const h264 = new Set(lignes.slice(iVideo, fin)
    .map((l) => l.match(/^a=rtpmap:(\d+) H264\/90000/i)?.[1]).filter(Boolean));
  if (!h264.size) return sdp;
  const [m, port, proto, ...formats] = lignes[iVideo].split(" ");
  lignes[iVideo] = [m, port, proto, ...formats.filter((f) => h264.has(f)), ...formats.filter((f) => !h264.has(f))].join(" ");
  return lignes.join("\r\n");
}

export const estIOS = (ua = navigator.userAgent, plateforme = navigator.platform, points = navigator.maxTouchPoints) =>
  /iPhone|iPad|iPod/.test(ua) || (plateforme === "MacIntel" && points > 1);

// Appareil et navigateur, sans identifiant (journal P1, colonnes app_a et app_b).
export function appareil(ua = navigator.userAgent) {
  const app = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android"
    : /Windows/.test(ua) ? "Windows" : /Mac OS X/.test(ua) ? "Mac" : "autre";
  const nav = /FBAN|FBAV|Messenger/.test(ua) ? "Messenger" : /Instagram/.test(ua) ? "Instagram"
    : /WhatsApp/.test(ua) ? "WhatsApp" : /Edg\//.test(ua) ? "Edge" : /CriOS|Chrome\//.test(ua) ? "Chrome"
      : /Firefox|FxiOS/.test(ua) ? "Firefox" : /Safari/.test(ua) ? "Safari" : "autre";
  return `${app} ${nav}`;
}

const TYPE_CANDIDAT = { host: "direct local", srflx: "direct public", prflx: "direct public", relay: "relais" };

// Relevé cumulé d'un appel à l'instant t, tiré des statistiques WebRTC (liste de stats).
export function lireAppel(stats, t) {
  const liste = [...stats];
  const parId = new Map(liste.map((s) => [s.id, s]));
  const transport = liste.find((s) => s.type === "transport");
  const paire = parId.get(transport?.selectedCandidatePairId)
    ?? liste.find((s) => s.type === "candidate-pair" && s.nominated && s.state === "succeeded");
  const local = parId.get(paire?.localCandidateId), distant = parId.get(paire?.remoteCandidateId);
  const entree = (kind) => liste.find((s) => s.type === "inbound-rtp" && s.kind === kind) ?? {};
  const sortie = liste.find((s) => s.type === "outbound-rtp" && s.kind === "video") ?? {};
  const v = entree("video"), a = entree("audio");
  const codec = (id) => parId.get(id)?.mimeType?.replace(/^video\//, "") ?? "?";
  // Relais : type du candidat local ou distant ; protocole entre l'appareil et le relais.
  const relais = [local, distant].find((c) => c?.candidateType === "relay");
  const proto = local?.candidateType === "relay"
    ? (local.relayProtocol ?? "?").toUpperCase() : relais ? "relais distant" : "";
  return {
    t,
    candidat: TYPE_CANDIDAT[relais ? "relay" : local?.candidateType] ?? "?",
    relaisProto: proto,
    rtt: paire?.currentRoundTripTime != null ? paire.currentRoundTripTime * 1000 : NaN,
    octetsVideo: v.bytesReceived ?? 0,
    paquets: v.packetsReceived ?? 0,
    perdus: v.packetsLost ?? 0,
    images: v.framesDecoded ?? 0,
    gels: v.freezeCount ?? 0,
    largeur: v.frameWidth, hauteur: v.frameHeight,
    codecRecu: codec(v.codecId), codecEnvoye: codec(sortie.codecId),
    octetsAudio: a.bytesReceived ?? 0,
  };
}

// Débit vidéo reçu (kbit/s) et pertes (%) entre deux relevés ; gels depuis le début de l'appel.
export function resumeAppel(debut, fin) {
  const s = (fin.t - debut.t) / 1000;
  const paquets = fin.paquets - debut.paquets, perdus = fin.perdus - debut.perdus;
  return {
    candidat: fin.candidat, relaisProto: fin.relaisProto, rtt: fin.rtt,
    debit: s > 0 ? ((fin.octetsVideo - debut.octetsVideo) * 8) / 1000 / s : NaN,
    pertes: paquets + perdus > 0 ? (100 * perdus) / (paquets + perdus) : 0,
    gels: fin.gels - debut.gels,
    images: fin.images - debut.images,
    codecRecu: fin.codecRecu, codecEnvoye: fin.codecEnvoye,
    resolution: fin.largeur ? `${fin.largeur}x${fin.hauteur}` : "",
    // Image et son reçus : des images décodées et du son reçu depuis le début de l'appel.
    sonImg: fin.images > debut.images && fin.octetsAudio > debut.octetsAudio ? 1 : 0,
  };
}

// Journal P1 (D3 §2.4) : une ligne par essai. Aucune image, aucun son, aucune adresse.
export const COLONNES_P1 = ["essai", "combi", "app_a", "app_b", "reussi", "t_etab", "candidat", "relais_proto",
  "rtt", "debit", "pertes", "gels", "son_img", "codec_envoye", "codec_recu", "resolution", "role"];

const nombre = (x, d) => (Number.isFinite(x) ? String(Number(x.toFixed(d))).replace(".", ",") : "");
const cellule = (v) => {
  const s = typeof v === "number" ? nombre(v, 3) : String(v ?? "");
  return /[;"\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

export function csvP1(lignes) {
  return "﻿" + [COLONNES_P1.join(";"), ...lignes.map((l) => COLONNES_P1.map((c) => cellule(l[c])).join(";"))].join("\r\n") + "\r\n";
}
