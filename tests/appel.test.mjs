// Vérification de l'appel (lot L1.2) : relais, H.264, statistiques, journal P1.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { filtrerRelais, preferH264, estIOS, appareil, lireAppel, resumeAppel, csvP1, COLONNES_P1 } from "../app/js/appel.js";

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

test("statistiques : direct, sans relais", () => {
  const s = stats(0, 0, 0, 0, 0, 0);
  s[2] = { type: "local-candidate", id: "L", candidateType: "host" };
  s[3] = { type: "remote-candidate", id: "R", candidateType: "host" };
  const r = lireAppel(s, 0);
  assert.equal(r.candidat, "direct local");
  assert.equal(r.relaisProto, "");
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
