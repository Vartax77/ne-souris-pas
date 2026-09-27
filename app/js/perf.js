// Session performance PERF (D3 §1.3.8, lot L0.6b, D8 n° 285) : fenêtres de 10 s, charge vidéo simulée
// par un appel WebRTC en boucle sur le même appareil, bilan du critère G3. Les fonctions pures
// (fenêtres, stats, bilan) sont vérifiées par tests/perf.test.mjs.

export const FENETRE_MS = 10000;
export const CADENCE_PLANCHER = 10; // im/s sur chaque fenêtre de 10 s (G3, D1 §6.2) — À confirmer (P0)
const PLAFOND_DEBIT = 1_700_000; // bit/s, vidéo envoyée en jeu (D4 C5, n° 205)

// Fenêtres de 10 s consécutives et sans chevauchement, comptées depuis t0 (ms).
// Appeler avancer(t) avant de compter un événement daté t : il ferme les fenêtres finies et les renvoie.
export function creerFenetresPerf(t0, dureeMs = FENETRE_MS) {
  const vide = () => ({ analysees: 0, msTotal: 0, msMax: 0, camera: 0, affichage: 0 });
  let k = 0, c = vide();
  const parS = (n) => (n * 1000) / dureeMs;
  return {
    avancer(t) {
      const closes = [];
      while (t >= t0 + (k + 1) * dureeMs) {
        closes.push({
          k, debutS: (k * dureeMs) / 1000, finMs: t0 + (k + 1) * dureeMs,
          analyse: parS(c.analysees), camera: parS(c.camera), affichage: parS(c.affichage),
          msMoy: c.analysees ? c.msTotal / c.analysees : NaN, msMax: c.msMax,
        });
        k += 1;
        c = vide();
      }
      return closes;
    },
    analyse(ms) {
      c.analysees += 1;
      c.msTotal += ms;
      c.msMax = Math.max(c.msMax, ms);
    },
    camera() { c.camera += 1; },
    affichage() { c.affichage += 1; },
  };
}

// Compteurs cumulés de l'appel, lus dans les rapports getStats de l'émetteur et du récepteur (listes de stats).
export function lireStats(emetteur, recepteur, t) {
  const em = [...emetteur], sortie = em.find((s) => s.type === "outbound-rtp" && s.kind === "video") ?? {};
  const entree = [...recepteur].find((s) => s.type === "inbound-rtp" && s.kind === "video") ?? {};
  const codec = em.find((s) => s.id === sortie.codecId)?.mimeType?.replace("video/", "") ?? "?";
  return {
    t, codec, enc: sortie.framesEncoded ?? 0, dec: entree.framesDecoded ?? 0, octets: sortie.bytesSent ?? 0,
    limite: sortie.qualityLimitationReason ?? "?", largeur: sortie.frameWidth, hauteur: sortie.frameHeight,
  };
}

// Charge sur une fenêtre, entre deux relevés cumulés : images encodées et décodées/s, débit envoyé.
export function ecartStats(a, b) {
  const s = (b.t - a.t) / 1000;
  return {
    enc: (b.enc - a.enc) / s, dec: (b.dec - a.dec) / s, kbits: ((b.octets - a.octets) * 8) / 1000 / s,
    limite: b.limite, largeur: b.largeur, hauteur: b.hauteur, codec: b.codec,
  };
}

const mediane = (x) => {
  if (!x.length) return NaN;
  const t = [...x].sort((a, b) => a - b), m = t.length >> 1;
  return t.length % 2 ? t[m] : (t[m - 1] + t[m]) / 2;
};
const moyenne = (x) => (x.length ? x.reduce((a, b) => a + b, 0) / x.length : NaN);

// Bilan d'une étape (sans ou avec charge) : cadence, signes de chauffe, charge, G3 automatique.
// attendues : nombre de fenêtres d'une étape complète. Les pauses sont jugées à part (résumé de séquence).
function bilanEtape(liste, attendues) {
  if (!liste.length) return null;
  const a = liste.map((w) => w.analyse);
  const bas = liste.reduce((m, w) => (w.analyse < m.analyse ? w : m));
  const charges = liste.map((w) => w.charge).filter(Boolean);
  const sous = a.filter((x) => x < CADENCE_PLANCHER).length;
  const complete = liste.length >= attendues;
  return {
    fenetres: liste.length, complete, mediane: mediane(a), plusBasse: bas.analyse, momentS: bas.debutS, sous,
    // Chauffe : dérive du temps d'analyse entre la 1re et la dernière minute (6 fenêtres chacune).
    msPremiere: moyenne(liste.slice(0, 6).map((w) => w.msMoy)), msDerniere: moyenne(liste.slice(-6).map((w) => w.msMoy)),
    cameraMin: Math.min(...liste.map((w) => w.camera)), affichageMin: Math.min(...liste.map((w) => w.affichage)),
    charges: charges.length, enc: mediane(charges.map((c) => c.enc)), encMin: Math.min(...charges.map((c) => c.enc)),
    dec: mediane(charges.map((c) => c.dec)), decMin: Math.min(...charges.map((c) => c.dec)),
    kbits: mediane(charges.map((c) => c.kbits)), limiteCpu: charges.some((c) => c.limite === "cpu"),
    g3: complete && sous === 0,
  };
}

// basculeS : début de l'étape avec charge (300 s). Fenêtres [0, basculeS) sans charge, puis avec.
export function bilanPerf(fenetres, basculeS, finS) {
  const parEtape = (d) => Math.floor((d * 1000) / FENETRE_MS);
  return {
    sans: bilanEtape(fenetres.filter((w) => w.debutS < basculeS), parEtape(basculeS)),
    avec: bilanEtape(fenetres.filter((w) => w.debutS >= basculeS), parEtape(finS - basculeS)),
  };
}

// Charge vidéo simulée (D3 §1.3.8, n° 271) : appel WebRTC entre deux connexions de la même page, sans
// serveur ; aucun octet ne quitte l'appareil. Le flux caméra déjà ouvert est envoyé (un seul flux, n° 112),
// en H.264 si possible (n° 205), plafonné à 1,7 Mbit/s ; la vidéo reçue est affichée dans videoRetour,
// pour que son décodage coûte comme le visage de l'adversaire en jeu.
export async function demarrerAppelBoucle(flux, videoRetour, delaiMs = 10000) {
  const a = new RTCPeerConnection(), b = new RTCPeerConnection();
  const fermer = () => {
    clearInterval(minuterie);
    a.close();
    b.close();
    videoRetour.srcObject = null;
  };
  let minuterie, dernier = null;
  try {
    a.onicecandidate = (e) => e.candidate && b.addIceCandidate(e.candidate);
    b.onicecandidate = (e) => e.candidate && a.addIceCandidate(e.candidate);
    b.ontrack = (e) => { videoRetour.srcObject = e.streams[0]; };
    for (const piste of flux.getTracks()) a.addTrack(piste, flux);
    const tv = a.getTransceivers().find((t) => t.sender.track?.kind === "video");
    const codecs = RTCRtpReceiver.getCapabilities?.("video")?.codecs ?? [];
    const h264 = codecs.filter((c) => c.mimeType === "video/H264");
    if (h264.length && tv.setCodecPreferences) tv.setCodecPreferences([...h264, ...codecs.filter((c) => c.mimeType !== "video/H264")]);
    await a.setLocalDescription(await a.createOffer());
    await b.setRemoteDescription(a.localDescription);
    await b.setLocalDescription(await b.createAnswer());
    await a.setRemoteDescription(b.localDescription);
    await new Promise((ok, echec) => {
      const connecte = () => ["connected", "completed"].includes(a.iceConnectionState);
      if (connecte()) return ok();
      const delai = setTimeout(() => echec(new Error(`pas de connexion en ${delaiMs / 1000} s (${a.iceConnectionState})`)), delaiMs);
      a.addEventListener("iceconnectionstatechange", () => {
        if (connecte()) { clearTimeout(delai); ok(); }
        else if (a.iceConnectionState === "failed") { clearTimeout(delai); echec(new Error("connexion échouée")); }
      });
    });
    const p = tv.sender.getParameters();
    if (p.encodings?.length) {
      p.encodings[0].maxBitrate = PLAFOND_DEBIT;
      await tv.sender.setParameters(p);
    }
    const relever = async () => {
      const t = performance.now();
      const [re, rr] = await Promise.all([a.getStats(), b.getStats()]);
      dernier = lireStats(re.values(), rr.values(), t);
    };
    await relever();
    minuterie = setInterval(() => relever().catch(() => {}), 1000);
    const plafond = Boolean(p.encodings?.length);
    return { dernier: () => dernier, plafond, fermer };
  } catch (e) {
    fermer();
    throw e;
  }
}
