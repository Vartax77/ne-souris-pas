// Prototype 0 (D6) : détection (L0.2), calibrage (L0.3), manche d'essai : sourire et jauge (L0.4),
// pertes et preuve (L0.5), protocole P0 : séquences, revue, journal (L0.6a).

import { demarrerCamera } from "./capture.js";
import { preparerMoteur, lancerAnalyse, modeParDefaut } from "./detection.js";
import { CADENCE_MAX, creerFenetre, creerCompteurPauses } from "./cadence.js";
import { angles, rectangle, largeur, luminance, scores, valeurs } from "./mesures.js";
import { evaluerCalibrage } from "./calibrage.js";
import { imageValide, etatImage, jauge, creerLissage, creerSuiviSourire, creerPicSoutenu } from "./arbitrage.js";
import { creerSuiviPertes } from "./pertes.js";
import { creerPreuve } from "./preuve.js";
import { SEQUENCES, dureeTotale, etapeA, toucheOperateur, operateurAVu, classerRevue, calibragePour } from "./protocole.js";
import { creerJournal } from "./journal.js";
import { REGLAGES } from "./reglages.js";

const $ = (id) => document.getElementById(id);

function afficher(id, texte, classe) {
  const el = $(id);
  el.textContent = texte;
  el.className = classe ?? "";
}

// Nombre à la française : 15,0.
const f = (n, d = 0) => (Number.isFinite(n) ? n.toFixed(d).replace(".", ",") : "—");

// Compte les chargements externes bloqués par la politique de sécurité (D8 n° 221).
// Tentative attendue : les statistiques de MediaPipe vers Google (n° 225). Écouté avant tout chargement.
let bloques = 0;
document.addEventListener("securitypolicyviolation", (e) => {
  bloques += 1;
  afficher("etat-bloques", String(bloques), "erreur");
  const li = document.createElement("li");
  li.textContent = `${e.effectiveDirective} : ${e.blockedURI}`;
  $("bloques").append(li);
});

// ?calcul=cpu ou ?calcul=gpu force un mode, pour comparer ; sinon, règle par famille d'appareil (D8 n° 241).
const force = new URLSearchParams(location.search).get("calcul")?.toUpperCase();
const { mode: modeDemande, choix } = ["CPU", "GPU"].includes(force)
  ? { mode: force, choix: "forcé par ?calcul=" }
  : modeParDefaut();

// Le modèle se charge dès l'ouverture, en parallèle de la demande de caméra (D4 §7.3).
const moteurPret = preparerMoteur(modeDemande).then(
  (m) => {
    m.choix = choix;
    afficher("etat-mediapipe", `prêt en ${f(m.secondes, 1)} s (${m.simd})`, "ok");
    return m;
  },
  (e) => {
    afficher("etat-mediapipe", `échec : ${e.message ?? e}`, "erreur");
    throw e;
  },
);

// Copie réduite de l'image pour la luminance (plus grand côté : 160 px).
const toile = document.createElement("canvas");
const ctx = toile.getContext("2d", { willReadFrequently: true });

function mesurer(video, res) {
  const n = res.faceLandmarks.length;
  if (n !== 1) return { visages: n };
  const rect = rectangle(res.faceLandmarks[0]);
  const echelle = 160 / Math.max(video.videoWidth, video.videoHeight);
  toile.width = Math.round(video.videoWidth * echelle);
  toile.height = Math.round(video.videoHeight * echelle);
  ctx.drawImage(video, 0, 0, toile.width, toile.height);
  const px = ctx.getImageData(0, 0, toile.width, toile.height).data;
  return {
    visages: 1,
    largeur: largeur(rect),
    ...angles(res.facialTransformationMatrixes[0].data),
    luminance: luminance(px, toile.width, toile.height, rect),
    ...scores(res.faceBlendshapes[0].categories),
    bs: valeurs(res.faceBlendshapes[0].categories), // les 52 blendshapes (D8 n° 263, n° 265)
  };
}

// Calibrage R1 (D2 §4.1, lot L0.3) : deux phases minutées sur les horodatages des images analysées ;
// mesures prises à chaque image analysée (D8 n° 243).
const CONSIGNE = "Placez votre visage dans l'ovale, bien éclairé, puis appuyez sur Commencer.";
let cal = null, essais = 0;

function lancerCalibrage() {
  if (protocole.enCours) finirSequence(true); // une séquence ne survit pas à un nouveau calibrage
  if (manche?.active) demarrerManche(); // arrête la manche : n et d vont changer
  essais += 1;
  cal = { debut: undefined, neutre: [], sourire: [], imagesCamera: 0, timide: $("cal-timide").checked && codeCalibrage() === "A0" };
  $("cal-timide").checked = false;
  journal.debut(codeCalibrage());
  $("cal-essai").textContent = String(essais);
  $("cal-commencer").disabled = true;
  afficher("cal-resultat", "");
  $("cal-detail").textContent = "";
}

function enregistrer(m, t) {
  cal.debut ??= t;
  const e = t - cal.debut, { phaseNeutreMs: pn, phaseSourireMs: ps } = REGLAGES;
  if (protocoleJournalise()) journaliserImage(m, t, { seq: codeCalibrage(), etat: e < pn ? "cal_neutre" : "cal_sourire" });
  if (e < pn) {
    cal.neutre.push(m);
    $("cal-consigne").textContent = "Visage neutre, sans parler…";
    $("cal-barre").value = e / pn;
  } else if (e < pn + ps) {
    cal.sourire.push(m);
    $("cal-consigne").textContent = "Maintenant, votre plus grand sourire, sans vous retenir !";
    $("cal-barre").value = (e - pn) / ps;
  } else {
    terminerCalibrage();
  }
}

const pct = (x) => `${f(x * 100)} %`;

function terminerCalibrage() {
  const { neutre, sourire, imagesCamera, timide } = cal;
  cal = null;
  const dureeS = (REGLAGES.phaseNeutreMs + REGLAGES.phaseSourireMs) / 1000;
  // Cadence de la caméra elle-même pendant le calibrage : elle ralentit dans une pièce sombre (D8 n° 247).
  const r = evaluerCalibrage(neutre, sourire, REGLAGES, { cadenceCamera: imagesCamera / dureeS });
  const st = r.stats;
  if (r.ok) {
    afficher("cal-resultat", `Calibrage réussi : n ${f(r.n, 2)} · v ${f(r.v, 2)} · v − n ${f(st.amplitude, 2)} · d ${f(r.d, 2)} (${r.plafonne ? "plafonné par d_max" : "non plafonné"})`, "ok");
    // seq : séquence sélectionnée au calibrage (A0, B, C) ; un calibrage timide ne sert jamais (n° 279).
    calibrages.push({ n: r.n, v: r.v, d: r.d, seq: codeCalibrage(), timide: timide });
    choisirReference();
    if (timide) afficher("cal-resultat", `${$("cal-resultat").textContent} — timide : journalisé, jamais utilisé pour jouer`, "ok");
  } else {
    afficher("cal-resultat", r.message, "erreur");
  }
  if (protocoleJournalise()) {
    journal.evenement(performance.now(), codeCalibrage(), r.ok
      ? `calibrage ok n=${f(r.n, 2)} v=${f(r.v, 2)} d=${f(r.d, 2)}${r.plafonne ? " plafonné" : ""}${timide ? " timide" : ""}`
      : `calibrage rejet ${r.cause}`);
  }
  // Détail pour la grille A0 (D3 §1.4.3), affiché sur la page de test P0 seulement.
  $("cal-detail").textContent = [
    `Détail (test P0) : présence ${pct(st.presenceNeutre)} / ${pct(st.presenceSourire)} · deux visages ${pct(st.deuxVisages)} · largeur ${f(st.largeur)} % · lacet ${f(st.lacet)}° · tangage ${f(st.tangage)}°`,
    `luminance ${f(st.luminance)} · écart-type ${f(st.ecartType, 3)} · n ${f(st.n, 2)} · v ${f(st.v, 2)} · v − n ${f(st.amplitude, 2)}`,
    `images ${neutre.length} + ${sourire.length} · cadence analysée ${f((neutre.length + sourire.length) / dureeS, 1)} im/s · cadence caméra ${f(st.cadenceCamera, 1)} im/s`,
  ].join("\n");
  $("cal-consigne").textContent = CONSIGNE;
  $("cal-barre").value = 0;
  $("cal-commencer").textContent = "Recommencer";
  $("cal-commencer").disabled = false;
}

// Manche d'essai (R2, R3, lot L0.4), page de test P0 seulement. t0 = appui sur « Démarrer ».
// Tous les sourires confirmés sont comptés, sans arrêt à la première faute ni à 60 s (D8 n° 254) :
// c'est la colonne « Fautes » de la grille D3 §1.4.4.
// calibre : calibrage de la manche en cours ou à venir ; calibrages : tous les calibrages réussis (n° 279).
let calibre = null, manche = null;
const calibrages = [];

// Calibrage de référence pour la manche d'essai : dernier réussi et non timide sous A0.
function choisirReference() {
  calibre = calibragePour(null, calibrages);
  $("manche-bouton").disabled = !calibre;
  $("manche-calibre").textContent = calibre
    ? `n ${f(calibre.n, 2)} · d ${f(calibre.d, 2)} (calibrage de référence : dernier réussi non timide)`
    : "Aucun calibrage de référence (non timide).";
}
const nomCalibrage = (c) => (c.seq === "A0" ? "référence" : c.seq);

// Copie de l'image caméra courante, en mémoire vive seulement (R7.5) : jamais écrite nulle part.
function capturerImage() {
  const video = $("video");
  const c = document.createElement("canvas");
  c.width = video.videoWidth;
  c.height = video.videoHeight;
  c.getContext("2d").drawImage(video, 0, 0);
  return c;
}

function arreterManche() {
  manche.active = false;
  clearInterval(manche.minuterie);
  $("manche-bouton").textContent = "Démarrer";
}

function demarrerManche() {
  if (manche?.active) return arreterManche();
  manche = {
    active: true, t0: undefined, t: 0, etat: "—", J: 0, pic: 0, fautes: [], variante: 0, avertissement: null,
    lisser: creerLissage(), lisserVariante: creerLissage(), suivi: null, suiviVariante: null, pertes: null,
    picSoutenu: creerPicSoutenu(), preuve: creerPreuve(capturerImage), preuveAffichee: null,
    pauses: creerCompteurPauses(REGLAGES.delaiPerteMs), // pauses de la manche seule (n° 270)
    picSoutenuVariante: creerPicSoutenu(), avertissements: 0, sourireEnCours: null,
    cal: calibre, // calibrage de cette manche (n° 279)
  };
  const toilePreuve = $("preuve");
  toilePreuve.getContext("2d").clearRect(0, 0, toilePreuve.width, toilePreuve.height); // effacement (R7.5)
  $("preuve-legende").textContent = "";
  // Page visible mais plus aucune image (caméra figée) : la perte est constatée en direct (D8 n° 266).
  // Page masquée : la minuterie est suspendue, et le retour de l'analyse rattrape la pause (pertes.js).
  manche.minuterie = setInterval(() => {
    if (!manche.pertes) return;
    for (const e of manche.pertes.verifier(performance.now())) {
      noterPerte(e);
      // Toute faute a sa ligne avec la colonne faute remplie, même constatée sans image (n° 277).
      if (protocole.enCours) journal.evenement(e.t, protocole.enCours.code, e.type === "faute" ? "faute perte (constatée sans image)" : "avertissement (constaté sans image)",
        e.type === "faute" ? { faute: "perte" } : {});
    }
  }, 250);
  $("manche-bouton").textContent = "Arrêter";
}

// Événements de R4 : avertissement (texte exact de D5 E7, T16) ou faute « Visage perdu » (R7.6 : sans image).
function noterPerte(e) {
  if (e.type === "avertissement") {
    manche.avertissement = e;
    manche.avertissements += 1;
  }
  else manche.fautes.push({ type: "perte", debut: e.t, ref: e }); // e.pauseMs est mis à jour à la reprise (n° 270)
}

function traiterManche(m, t) {
  if (manche.t0 === undefined) {
    manche.t0 = t;
    manche.suivi = creerSuiviSourire(t);
    manche.suiviVariante = creerSuiviSourire(t);
    manche.pertes = creerSuiviPertes(t);
  }
  manche.t = t;
  manche.pauses.ajouter(t);
  const valide = imageValide(m);
  let souriant = false, souriantVariante = false, S = NaN, Sv = NaN;
  if (valide) {
    S = manche.lisser(m.s);
    manche.etat = etatImage(S, calibre);
    souriant = manche.etat === "souriant";
    manche.J = jauge(S, calibre);
    manche.pic = Math.max(manche.pic, manche.J);
    manche.picSoutenu.ajouter(t, S - calibre.n);
    // Variante cheekSquint (R2.7) : s compté seulement si cheekSquint atteint le plancher.
    Sv = manche.lisserVariante(m.cheek >= REGLAGES.plancherCheek ? m.s : 0);
    souriantVariante = etatImage(Sv, calibre) === "souriant";
    manche.picSoutenuVariante.ajouter(t, Sv - calibre.n);
  } else {
    manche.etat = "invalide"; // J et pic figés (R3.4)
    manche.picSoutenu.rompre();
    manche.picSoutenuVariante.rompre();
  }
  let faute = "", evenement = "";
  for (const e of manche.pertes.image(t, valide)) {
    noterPerte(e);
    if (e.type === "faute") faute = "perte";
    else evenement = "avertissement";
  }
  // Sourire (R2) et image de preuve (R7) : meilleure image de la série, confirmée avec le sourire.
  const ev = manche.suivi.image(t, souriant, S);
  if (souriant) manche.preuve.souriante(S);
  if (ev) {
    const sourire = { type: "sourire", ...ev, ref: ev, confirmation: ev.fin };
    manche.fautes.push(sourire);
    manche.sourireEnCours = sourire;
    manche.preuve.confirmer();
    faute = "sourire";
    evenement = `sourire debut=${f(ev.debut, 1)}`;
  }
  if (!manche.suivi.actif()) {
    garderImageSourire();
    manche.preuve.finSerie();
  }
  if (manche.suiviVariante.image(t, souriantVariante, Sv)) manche.variante += 1;
  if (protocole.enCours) {
    journaliserImage(m, t, { seq: protocole.enCours.code, S, J: valide ? manche.J : NaN, etat: manche.etat, faute, evenement });
    avancerSequence(t);
  }
  $("jauge-niveau").style.width = `${manche.J * 100}%`;
  $("jauge-pic").style.left = `calc(${manche.pic * 100}% - ${manche.pic * 3}px)`; // reste dans le cadre à 100 %
}

const chrono = (ms) => {
  const s = Math.max(0, ms) / 1000;
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${f(s % 60, 1).padStart(4, "0")}`;
};

function ligneFaute(e, k) {
  if (e.type === "perte") {
    const { pauseMs, pauseAuDebut } = e.ref;
    const duree = f(pauseMs / 1000, 1);
    const pause = !pauseMs ? "" : pauseAuDebut ? ` — pendant une pause d'analyse de ${duree} s` : ` — dont ${duree} s de pause d'analyse`;
    return `  ${k + 1}. à ${chrono(e.debut - manche.t0)} — Visage perdu${pause}`;
  }
  const s = e.ref; // l'événement de sourire continue d'être mis à jour tant que la série dure
  return `  ${k + 1}. à ${chrono(s.debut - manche.t0)} — sourire — durée ${f((s.fin - s.debut) / 1000, 1)} s — ${s.images} images — S max ${f(s.sMax, 2)}`;
}

function afficherManche() {
  const P = manche.picSoutenu.valeur();
  const sourires = manche.fautes.filter((e) => e.type === "sourire").length;
  $("manche-avertissement").textContent = manche.avertissement
    ? `Visage perdu : encore une fois et vous perdez la manche (à ${chrono(manche.avertissement.t - manche.t0)})`
    : "";
  $("manche-etat").textContent = [
    `Manche d'essai — ${chrono(manche.t - manche.t0)}${manche.active ? "" : " (arrêtée)"}`,
    `État : ${manche.etat}   J ${f(manche.J * 100)} %   pic ${f(manche.pic * 100)} %`,
    `Fautes : ${manche.fautes.length} (sourires ${sourires}, visage perdu ${manche.fautes.length - sourires})   variante cheekSquint : ${manche.variante}`,
    ...manche.fautes.map(ligneFaute),
    ((p) => `Pauses d'analyse pendant la manche : ${p.nombre}${p.nombre ? ` · ${f(p.totalMs / 1000, 1)} s au total` : ""}`)(manche.pauses.stats()),
    `Pic soutenu P (500 ms) : ${f(P, 2)}   r = P / d : ${f(P / manche.cal.d, 2)}`,
  ].join("\n");
  // Image de preuve (R7) : affichée dès qu'un sourire est confirmé, mise à jour si la série trouve mieux.
  const { image, s } = manche.preuve.valeur();
  if (image && image !== manche.preuveAffichee) {
    const toilePreuve = $("preuve");
    toilePreuve.width = image.width;
    toilePreuve.height = image.height;
    toilePreuve.getContext("2d").drawImage(image, 0, 0);
    manche.preuveAffichee = image;
    $("preuve-legende").textContent = `Image au S le plus haut de la série : ${f(s, 2)}`;
  }
}

// Protocole P0 (D3 §1.3, lot L0.6a) : séquences minutées, touche « sourire vu », revue, journal CSV.
// Le journal reste en mémoire vive jusqu'à l'export ; jamais d'image, de son ni de nom (D8 n° 73).
const journal = creerJournal();
const protocole = { seq: SEQUENCES[0], enCours: null, pressions: [], opEnAttente: false, revue: null, resumes: [] };

const testeurValide = () => /^T\d{2}$/.test($("proto-testeur").value.trim());
// Les calibrages sont journalisés dès qu'un code testeur est saisi, sous le code de la séquence
// sélectionnée si elle comporte un calibrage (A0, B1 à B3, C), sinon sous A0.
const protocoleJournalise = () => testeurValide();
const codeCalibrage = () => (protocole.seq.calibrage || protocole.seq.calibrageAvant ? protocole.seq.code : "A0");

// Une ligne du journal par image analysée (colonnes de D3 §1.4.1, dont les 52 blendshapes, n° 263).
function journaliserImage(m, t, extra) {
  const op = protocole.opEnAttente ? 1 : 0;
  protocole.opEnAttente = false;
  journal.image({
    t, faces: m.visages, largeur: m.largeur, lacet: m.lacet, tangage: m.tangage,
    smileG: m.smileG, smileD: m.smileD, cheekG: m.bs?.cheekSquintLeft, cheekD: m.bs?.cheekSquintRight,
    lum: m.luminance, op, bs: m.bs, ...extra,
  });
}

// Touche « sourire vu » (barre d'espace ou bouton) : pendant une séquence ou un calibrage journalisé.
function marquerOp() {
  if (!protocole.enCours && !(cal && protocoleJournalise())) return;
  if (protocole.enCours) protocole.pressions.push(performance.now());
  protocole.opEnAttente = true;
}

// Image de preuve du sourire confirmé qui vient de finir, gardée pour la revue (en mémoire vive, R7.5).
function garderImageSourire() {
  if (!manche.sourireEnCours) return;
  manche.sourireEnCours.image = manche.preuve.valeur().image;
  manche.sourireEnCours = null;
}

function lancerSequence() {
  if (manche?.active) arreterManche();
  protocole.pressions = [];
  protocole.opEnAttente = false;
  calibre = calibragePour(protocole.seq, calibrages);
  journal.debut(protocole.seq.code);
  journal.evenement(performance.now(), protocole.seq.code,
    `sequence debut n=${f(calibre.n, 2)} v=${f(calibre.v, 2)} d=${f(calibre.d, 2)} calibrage=${calibre.seq === "A0" ? "reference" : calibre.seq}`);
  demarrerManche();
  protocole.enCours = { code: protocole.seq.code, seq: protocole.seq, etape: -1 };
  $("manche-bouton").disabled = true;
  afficherProtocole();
}

// Étape en cours de la séquence ; fin automatique à la durée de D3.
function avancerSequence(t) {
  const { seq } = protocole.enCours;
  const etape = etapeA(seq, (t - manche.t0) / 1000);
  if (!etape) return finirSequence(false);
  if (etape.index !== protocole.enCours.etape) {
    protocole.enCours.etape = etape.index;
    $("proto-consigne").textContent = etape.consigne;
  }
}

function finirSequence(interrompue) {
  const { code, seq } = protocole.enCours;
  garderImageSourire();
  arreterManche();
  protocole.enCours = null;
  const calSeq = manche.cal;
  choisirReference(); // la manche d'essai reprend le calibrage de référence
  $("manche-bouton").disabled = false;
  $("proto-consigne").textContent = "";
  journal.evenement(manche.t, code, interrompue ? "sequence interrompue" : "sequence terminee");
  const sourires = manche.fautes.filter((e) => e.type === "sourire");
  const P = manche.picSoutenu.valeur(), Pv = manche.picSoutenuVariante.valeur(), pauses = manche.pauses.stats();
  const resume = {
    code, titre: seq.titre, interrompue, duree: (manche.t - manche.t0) / 1000,
    sourires: sourires.length, pertes: manche.fautes.length - sourires.length, avertissements: manche.avertissements,
    P, Pv, r: P / calSeq.d, rv: Pv / calSeq.d, pauses, cal: calSeq,
    // Revue aussi après une interruption : les sourires confirmés restent des faux positifs possibles (n° 278).
    classes: seq.revue ? { confirmee: 0, faux_positif: 0, litigieuse: 0 } : null,
  };
  protocole.resumes.push(resume);
  const aRevoir = resume.classes ? sourires.filter((s) => s.image) : [];
  if (aRevoir.length) protocole.revue = { code, items: aRevoir, k: 0, resume };
  else for (const s of sourires) s.image = null; // effacement (R7.5)
  afficherProtocole();
}

// Revue en fin de séquence (D3 §1.3.4, D8 n° 272) : le testeur juge chaque image de preuve.
function repondreRevue(estUnSourire) {
  const rv = protocole.revue;
  const item = rv.items[rv.k];
  const classe = classerRevue(estUnSourire, operateurAVu(protocole.pressions, item.debut, item.confirmation));
  rv.resume.classes[classe] += 1;
  journal.evenement(item.debut, rv.code, `revue ${rv.k + 1} : ${classe}`);
  item.image = null; // effacée dès qu'elle est jugée (R7.5)
  rv.k += 1;
  if (rv.k >= rv.items.length) protocole.revue = null;
  afficherProtocole();
}

const ligneResume = (r) => [
  `${r.code} ${r.titre} — ${f(r.duree)} s${r.interrompue ? " (interrompue)" : ""} — n ${f(r.cal.n, 2)} · d ${f(r.cal.d, 2)} (${nomCalibrage(r.cal)})`,
  `  fautes : sourires ${r.sourires}, visage perdu ${r.pertes} ; avertissements ${r.avertissements}`,
  r.classes ? `  revue : confirmées ${r.classes.confirmee}, faux positifs ${r.classes.faux_positif}, litigieuses ${r.classes.litigieuse}` : null,
  `  P ${f(r.P, 2)} (variante ${f(r.Pv, 2)}) · r ${f(r.r, 2)} (variante ${f(r.rv, 2)})`,
  r.pauses.nombre ? `  PAUSE D'ANALYSE PENDANT LA SÉQUENCE (${r.pauses.nombre}, ${f(r.pauses.totalMs / 1000, 1)} s) : À REFAIRE` : null,
].filter(Boolean).join("\n");

function afficherProtocole() {
  const seq = protocole.seq, en = protocole.enCours;
  let raison = "";
  if (!testeurValide()) raison = "Saisissez un code testeur (T01 à T99).";
  else if (seq.calibrage) raison = " "; // A0 : la préparation dit déjà d'utiliser le calibrage ; « Lancer » reste inactif
  else if (!calibragePour(seq, calibrages)) raison = seq.calibrageAvant
    ? `Calibrez d'abord avec ${seq.code} sélectionnée.` : "Réussissez d'abord un calibrage non timide (A0).";
  $("proto-preparation").textContent = [seq.preparation, raison.trim()].filter(Boolean).join(" ");
  $("proto-lancer").disabled = Boolean(raison) || Boolean(en) || Boolean(protocole.revue) || cal !== null;
  $("proto-interrompre").disabled = !en;
  $("proto-op").disabled = !en;
  $("proto-seq").disabled = Boolean(en);
  $("proto-chrono").textContent = en && manche.t0 !== undefined
    ? `${en.code} — ${chrono(manche.t - manche.t0)} / ${chrono(dureeTotale(en.seq) * 1000)} — n ${f(calibre.n, 2)} · d ${f(calibre.d, 2)} (${nomCalibrage(calibre)})` : "";
  $("cal-timide").disabled = cal !== null || codeCalibrage() !== "A0";
  const rv = protocole.revue;
  $("proto-revue").hidden = !rv;
  if (rv) {
    const item = rv.items[rv.k];
    $("proto-revue-titre").textContent =
      `Revue ${rv.k + 1} / ${rv.items.length} (${rv.code}) — sourire à ${chrono(item.debut - manche.t0)}, S max ${f(item.ref.sMax, 2)}. Est-ce un sourire ?`;
    const toile = $("proto-revue-image");
    toile.width = item.image.width;
    toile.height = item.image.height;
    toile.getContext("2d").drawImage(item.image, 0, 0);
  }
  $("proto-resumes").textContent = protocole.resumes.map(ligneResume).join("\n");
  $("proto-journal").textContent =
    `Journal : ${journal.taille()} lignes, dont ${journal.nonExportees()} non exportées.`;
}

function exporterJournal() {
  if (!journal.taille()) return;
  const jour = new Date().toLocaleDateString("sv"); // AAAA-MM-JJ, heure locale
  const nom = `journal_${$("proto-testeur").value.trim() || "sans-code"}_${jour}.csv`;
  const lien = document.createElement("a");
  lien.href = URL.createObjectURL(new Blob([journal.csv()], { type: "text/csv;charset=utf-8" }));
  lien.download = nom;
  lien.click();
  URL.revokeObjectURL(lien.href);
  journal.marquerExporte();
  afficherProtocole();
  $("proto-journal").textContent += ` Dernier export : ${nom}. Déplacez-le dans le dossier chiffré, puis effacez-le des Téléchargements.`;
}

// Blendshapes candidats pour distinguer la parole d'un sourire (parade 3), affichés gauche/droite.
const BS_CANDIDATS = [
  ["mouthSmile", "mouthSmileLeft", "mouthSmileRight"],
  ["jawOpen", "jawOpen"],
  ["mouthStretch", "mouthStretchLeft", "mouthStretchRight"],
  ["mouthUpperUp", "mouthUpperUpLeft", "mouthUpperUpRight"],
  ["mouthDimple", "mouthDimpleLeft", "mouthDimpleRight"],
];

function suivre(video, moteur) {
  let camera = creerFenetre(10000);
  let analyse10 = creerFenetre(10000);
  let analyse1 = creerFenetre(1000);
  // Pauses d'analyse (page masquée, fenêtre réduite, caméra figée, appareil bloqué) : les fenêtres repartent
  // de zéro, mais les pauses sont comptées à part pour que G3 ne perde pas un blocage réel (D8 n° 266).
  const pauses = creerCompteurPauses(REGLAGES.delaiPerteMs);
  let min10 = Infinity, max10 = 0, tempsTotal = 0, tempsMax = 0, analysees = 0, dernierAffichage = 0, premiere;
  let debut, momentMin; // moment du minimum des fenêtres de 10 s, pour savoir s'il vient du démarrage

  lancerAnalyse(video, moteur, {
    image(t) {
      debut ??= t;
      // Pas avant la fin de la première analyse : son initialisation (jusqu'à 2,4 s sur carte graphique)
      // bloque la page sans être un blocage de l'appareil.
      if (analysees > 0 && pauses.ajouter(t)) {
        camera = creerFenetre(10000);
        analyse10 = creerFenetre(10000);
        analyse1 = creerFenetre(1000);
      }
      camera.ajouter(t);
      if (cal?.debut !== undefined) cal.imagesCamera += 1;
    },
    resultat(res, t, ms) {
      analyse10.ajouter(t);
      analyse1.ajouter(t);
      if (premiere === undefined) {
        premiere = ms; // initialisation du calcul, surtout sur carte graphique : comptée à part
      } else {
        analysees += 1;
        tempsTotal += ms;
        tempsMax = Math.max(tempsMax, ms);
      }
      const c10 = analyse10.cadence();
      if (analyse10.pleine()) {
        if (c10 < min10) {
          min10 = c10;
          momentMin = (t - debut) / 1000;
        }
        max10 = Math.max(max10, c10);
      }
      let m;
      if (cal) {
        m = mesurer(video, res);
        enregistrer(m, t);
      } else if (manche?.active) {
        m = mesurer(video, res);
        traiterManche(m, t);
      }
      if (t - dernierAffichage < 250) return; // panneau rafraîchi 4 fois par seconde : ménage l'appareil
      dernierAffichage = t;
      if (manche?.t0 !== undefined) afficherManche();
      afficherProtocole();
      m ??= mesurer(video, res);
      const visage = m.visages === 1;
      const ps = pauses.stats();
      $("mesures").textContent = [
        `Mode de calcul : ${moteur.mode === "GPU" ? "carte graphique (GPU)" : "processeur (CPU)"} — ${moteur.raison ? `repli : ${moteur.raison}` : moteur.choix}`,
        `Cadence caméra : ${camera.pleine() ? f(camera.cadence(), 1) : "mesure en cours"} im/s`,
        `Cadence analysée : ${analyse10.pleine() ? f(c10, 1) : "mesure en cours"} im/s (10 s) · ${f(analyse1.cadence())} (1 s)`,
        `Fenêtres de 10 s : min ${f(min10, 1)}${momentMin === undefined ? "" : ` (à ${f(momentMin)} s)`} · max ${f(max10, 1)} · plafond ${CADENCE_MAX}`,
        `Temps d'analyse : moyen ${f(tempsTotal / analysees)} ms · max ${f(tempsMax)} ms · 1re image ${f(premiere)} ms`,
        `Pauses d'analyse (session) : ${ps.nombre}${ps.nombre ? ` · ${f(ps.totalMs / 1000, 1)} s au total · la plus longue ${f(ps.plusLongueMs / 1000, 1)} s` : ""}`,
        `Visages : ${m.visages}`,
        `Largeur : ${visage ? f(m.largeur) : "—"} %   Lacet : ${visage ? f(m.lacet) : "—"}°   Tangage : ${visage ? f(m.tangage) : "—"}°`,
        `Luminance : ${visage ? f(m.luminance) : "—"}/255`,
        `Sourire s : ${visage ? `${f(m.s, 2)} (G ${f(m.smileG, 2)} · D ${f(m.smileD, 2)})` : "—"}`,
        `cheekSquint : ${visage ? f(m.cheek, 2) : "—"}`,
        // Candidats de la parade 3 (D2 Q17, D8 n° 265) : restent-ils à 0 comme cheekSquint ?
        `Parade 3 : ${visage ? BS_CANDIDATS.map(([nom, g, d]) => `${nom} ${f(m.bs[g], 2)}${d ? `/${f(m.bs[d], 2)}` : ""}`).join(" · ") : "—"}`,
      ].join("\n");
    },
    erreur(e) {
      afficher("etat-mediapipe", `analyse arrêtée : ${e.message ?? e}`, "erreur");
    },
  });
}

// iOS exige un geste avant l'accès caméra et la lecture de la vidéo (D4 RT8).
$("demarrer").addEventListener("click", async () => {
  $("demarrer").disabled = true;
  afficher("etat-camera", "demande en cours…");
  let flux;
  try {
    flux = await demarrerCamera($("video"));
  } catch (e) {
    afficher("etat-camera", e.message, "erreur");
    $("demarrer").disabled = false;
    return;
  }
  const { width, height } = flux.getVideoTracks()[0].getSettings();
  afficher("etat-camera", `active (${width} × ${height})`, "ok");
  if (!("requestVideoFrameCallback" in HTMLVideoElement.prototype)) {
    afficher("etat-mediapipe", "ce navigateur ne permet pas l'analyse image par image", "erreur");
    return;
  }
  suivre($("video"), await moteurPret);
  $("cal-commencer").disabled = false;
});

$("cal-commencer").addEventListener("click", lancerCalibrage);
$("manche-bouton").addEventListener("click", demarrerManche);

// Protocole P0 : liste des séquences, boutons, touche de l'opérateur.
for (const s of SEQUENCES) $("proto-seq").add(new Option(`${s.code} — ${s.titre}`, s.code));
$("proto-seq").addEventListener("change", (e) => {
  protocole.seq = SEQUENCES.find((s) => s.code === e.target.value);
  afficherProtocole();
});
$("proto-testeur").addEventListener("input", afficherProtocole);
$("proto-lancer").addEventListener("click", lancerSequence);
$("proto-interrompre").addEventListener("click", () => finirSequence(true));
$("proto-op").addEventListener("click", marquerOp);
$("proto-oui").addEventListener("click", () => repondreRevue(true));
$("proto-non").addEventListener("click", () => repondreRevue(false));
$("proto-export").addEventListener("click", exporterJournal);

// Barre d'espace = « sourire vu » pendant une séquence ou un calibrage : interceptée avant tout bouton,
// à l'appui comme au relâchement, pour ne jamais activer le bouton qui a le focus (D8 n° 273).
for (const type of ["keydown", "keyup"]) {
  document.addEventListener(type, (e) => {
    const r = toucheOperateur(e, protocole.enCours !== null || cal !== null);
    if (r.bloquer) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (r.op) marquerOp();
  }, true);
}
// Après un clic, aucun bouton ne garde le focus : un appui d'espace ne peut plus l'activer.
document.addEventListener("click", (e) => e.target.closest?.("button")?.blur());

// Journal non exporté : quitter ou recharger la page demande confirmation (il serait perdu).
window.addEventListener("beforeunload", (e) => {
  if (journal.nonExportees() > 0) e.preventDefault();
});

afficherProtocole();
