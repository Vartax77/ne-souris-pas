// Vérification de l'appel (lot L1.2) : relais, H.264, statistiques, journal P1.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { filtrerRelais, preferH264, estIOS, appareil, lireAppel, resumeAppel, csvP1, COLONNES_P1,
  adresseLocale, typesCandidats, diagnosticER4 } from "../app/js/appel.js";

// Réponse réelle de l'API Metered (identifiants masqués).
const METERED = [
  { urls: "stun:stun.relay.metered.ca:80" },
  { urls: "turn:global.relay.metered.ca:80", username: "u", credential: "c" },
  { urls: "turn:global.relay.metered.ca:80?transport=tcp", username: "u", credential: "c" },
  { urls: "turn:global.relay.metered.ca:443", username: "u", credential: "c" },
  { urls: "turns:global.relay.metered.ca:443?transport=tcp", username: "u", credential: "c" },
];
const urls = (l) => l.map((s) => s.urls);

test("relais : UDP, TCP et TLS sur 443 séparés (D3 §2.3.2) ; « tous » garde tout", () => {
  assert.equal(filtrerRelais(METERED).length, 5);
  assert.deepEqual(urls(filtrerRelais(METERED, "udp")), ["stun:stun.relay.metered.ca:80", "turn:global.relay.metered.ca:80", "turn:global.relay.metered.ca:443"]);
  assert.deepEqual(urls(filtrerRelais(METERED, "tcp")), ["stun:stun.relay.metered.ca:80", "turn:global.relay.metered.ca:80?transport=tcp"]);
  assert.deepEqual(urls(filtrerRelais(METERED, "tls")), ["stun:stun.relay.metered.ca:80", "turns:global.relay.metered.ca:443?transport=tcp"]);
});

const SDP = [
  "v=0", "o=- 1 2 IN IP4 127.0.0.1", "s=-", "t=0 0",
  "m=audio 9 UDP/TLS/RTP/SAVPF 111", "a=rtpmap:111 opus/48000/2",
  "m=video 9 UDP/TLS/RTP/SAVPF 96 97 102 103 45",
  "a=rtpmap:96 VP8/90000", "a=rtpmap:97 rtx/90000", "a=rtpmap:102 H264/90000", "a=rtpmap:103 rtx/90000", "a=rtpmap:45 AV1/90000",
  "",
].join("\r\n");

test("H.264 en tête de la ligne vidéo ; l'audio et le reste du SDP ne bougent pas ; sans H.264, inchangé", () => {
  const s = preferH264(SDP).split("\r\n");
  assert.equal(s.find((l) => l.startsWith("m=video")), "m=video 9 UDP/TLS/RTP/SAVPF 102 96 97 103 45");
  assert.equal(s.find((l) => l.startsWith("m=audio")), "m=audio 9 UDP/TLS/RTP/SAVPF 111");
  assert.equal(s.length, SDP.split("\r\n").length);
  const sans = SDP.replace("a=rtpmap:102 H264/90000", "a=rtpmap:102 VP9/90000");
  assert.equal(preferH264(sans), sans);
  assert.equal(preferH264("v=0\r\n"), "v=0\r\n");
});

test("iPhone et appareil : détectés depuis le navigateur, sans identifiant", () => {
  const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1";
  const MESSENGER = IPHONE + " [FBAN/MessengerForiOS;FBAV/500.0]";
  const PC = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
  assert.ok(estIOS(IPHONE, "iPhone", 5));
  assert.ok(estIOS("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", "MacIntel", 5)); // iPad récent
  assert.ok(!estIOS(PC, "Win32", 0));
  assert.equal(appareil(IPHONE), "iPhone Safari");
  assert.equal(appareil(MESSENGER), "iPhone Messenger");
  assert.equal(appareil(PC), "Windows Chrome");
});

// Statistiques WebRTC simulées : paire retenue en relais TLS, vidéo et son reçus.
const stats = (octets, paquets, perdus, images, gels, audio) => [
  { type: "transport", id: "T", selectedCandidatePairId: "P" },
  { type: "candidate-pair", id: "P", localCandidateId: "L", remoteCandidateId: "R", currentRoundTripTime: 0.042 },
  { type: "local-candidate", id: "L", candidateType: "relay", relayProtocol: "tls" },
  { type: "remote-candidate", id: "R", candidateType: "srflx" },
  { type: "inbound-rtp", kind: "video", bytesReceived: octets, packetsReceived: paquets, packetsLost: perdus, framesDecoded: images, freezeCount: gels, frameWidth: 640, frameHeight: 480, codecId: "C1" },
  { type: "inbound-rtp", kind: "audio", bytesReceived: audio },
  { type: "outbound-rtp", kind: "video", codecId: "C2" },
  { type: "codec", id: "C1", mimeType: "video/H264" },
  { type: "codec", id: "C2", mimeType: "video/VP8" },
];

test("statistiques : candidat, protocole du relais, aller-retour, débit, pertes, gels, codecs, image et son", () => {
  const a = lireAppel(stats(0, 0, 0, 0, 0, 0), 0);
  const b = lireAppel(stats(1_250_000, 990, 10, 300, 2, 40_000), 10_000);
  assert.equal(b.candidat, "relais");
  assert.equal(b.relaisProto, "TLS");
  assert.equal(b.rtt, 42);
  const r = resumeAppel(a, b);
  assert.equal(r.debit, 1000); // 1,25 Mo en 10 s = 1 000 kbit/s
  assert.equal(r.pertes, 1); // 10 perdus sur 1 000
  assert.equal(r.gels, 2);
  assert.equal(r.codecRecu, "H264");
  assert.equal(r.codecEnvoye, "VP8");
  assert.equal(r.resolution, "640x480");
  assert.equal(r.sonImg, 1);
  assert.equal(resumeAppel(a, lireAppel(stats(1000, 10, 0, 5, 0, 0), 1000)).sonImg, 0); // image sans son
});

// Paire retenue sans relais : local et distant donnés (type, adresse).
const direct = (typeL, adrL, typeR, adrR) => {
  const s = stats(0, 0, 0, 0, 0, 0);
  s[2] = { type: "local-candidate", id: "L", candidateType: typeL, address: adrL };
  s[3] = { type: "remote-candidate", id: "R", candidateType: typeR, address: adrR };
  return lireAppel(s, 0);
};

test("chemin jugé sur la paire (n° 312) : direct local seulement si les deux adresses sont locales", () => {
  const r = direct("host", "a1b2c3.local", "host", "192.168.1.20");
  assert.equal(r.candidat, "direct local");
  assert.equal(r.paire, "host/host");
  assert.equal(r.relaisProto, "");
  // Séance du 2026-09-28 : PC derrière sa box (host) face à un iPhone en 4G (prflx), affiché à tort « direct local ».
  const pc4g = direct("host", "192.168.1.20", "prflx", "92.184.105.7");
  assert.equal(pc4g.candidat, "direct public");
  assert.equal(pc4g.paire, "host/prflx");
  assert.equal(direct("host", "192.168.1.20", "prflx", undefined).candidat, "direct public"); // adresse cachée
  assert.equal(direct("srflx", "82.64.1.2", "srflx", "92.184.105.7").candidat, "direct public");
  assert.equal(direct("host", "fe80::1c2d:3e4f", "host", "fd12:3456::1").candidat, "direct local");
  assert.equal(direct("host", "2a01:cb00::1", "host", "fd12:3456::1").candidat, "direct public");
  const r2 = stats(0, 0, 0, 0, 0, 0); // relais du côté distant seulement
  r2[2] = { type: "local-candidate", id: "L", candidateType: "host", address: "192.168.1.20" };
  r2[3] = { type: "remote-candidate", id: "R", candidateType: "relay", address: "10.0.0.1" };
  assert.equal(lireAppel(r2, 0).candidat, "relais");
  assert.equal(lireAppel(r2, 0).paire, "host/relay");
});

test("adresse locale : IPv4 privées, fe80::/10, fc00::/7, .local ; le reste non", () => {
  for (const a of ["10.0.0.1", "172.16.0.1", "172.31.255.1", "192.168.0.1", "fe80::1", "febf::1", "fc00::1", "fdff::1", "x.local"]) assert.ok(adresseLocale(a), a);
  for (const a of ["172.32.0.1", "11.0.0.1", "92.184.105.7", "fec0::1", "2a01::1", "fe8::1", "", undefined]) assert.ok(!adresseLocale(a), String(a));
});

test("diagnostic de ER4 (n° 314) : types de candidats, relais, états ; aucune adresse", () => {
  const s = [
    { type: "local-candidate", candidateType: "host", address: "192.168.1.20" },
    { type: "local-candidate", candidateType: "srflx", address: "82.64.1.2" },
    { type: "local-candidate", candidateType: "host", address: "x.local" },
    { type: "remote-candidate", candidateType: "prflx", address: "92.184.105.7" },
  ];
  const t = typesCandidats(s);
  assert.deepEqual(t, { locaux: ["host", "srflx"], distants: ["prflx"] });
  const d = diagnosticER4({ bonjour: true, appel: "émis", canal: { ice: "connected", collecte: "complete", locaux: ["host"], distants: ["host"] },
    media: { ice: "checking", collecte: "complete", ...t }, masquee: true });
  assert.equal(d, "bonjour reçu oui · appel émis · canal : ICE connected, collecte complete, locaux host, distants host"
    + " · appel : ICE checking, collecte complete, locaux host,srflx, distants prflx · relais obtenu non · page masquée oui");
  assert.ok(!/\d+\.\d+\.\d+/.test(d));
  // Échec avant l'appel vidéo : la connexion de données du salon n'aboutit pas (essai dans Chrome, relais bloqué).
  assert.equal(diagnosticER4({ canal: { ice: "checking", collecte: "complete" } }), "bonjour reçu non · appel ni émis ni reçu"
    + " · canal : ICE checking, collecte complete, locaux aucun, distants aucun · appel : aucune connexion · relais obtenu non · page masquée non");
  assert.match(diagnosticER4({ media: { locaux: ["host", "relay"] } }), /relais obtenu oui/);
});

test("journal P1 : colonnes de D3 §2.4, virgule décimale, marque d'encodage", () => {
  const csv = csvP1([{ essai: 1, combi: "RF", reussi: 1, t_etab: 2.345, candidat: "relais", relais_proto: "TLS", son_img: 1 }]);
  const [entete, ligne] = csv.replace("﻿", "").split("\r\n");
  assert.ok(csv.startsWith("﻿"));
  assert.deepEqual(entete.split(";"), COLONNES_P1);
  assert.equal(ligne.split(";")[COLONNES_P1.indexOf("t_etab")], "2,345");
  for (const c of ["essai", "combi", "app_a", "app_b", "reussi", "t_etab", "candidat", "relais_proto", "rtt", "debit", "pertes", "gels", "son_img"]) {
    assert.ok(COLONNES_P1.includes(c), c);
  }
});
