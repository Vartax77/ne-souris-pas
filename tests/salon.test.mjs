// Vérification du salon (lot L1.1) : code, lien, et automate hôte/invité avec un faux serveur PeerJS en mémoire.
// Lancer : node --test "tests/*.test.mjs". Hors de app/ : jamais publié.

import { test } from "node:test";
import assert from "node:assert/strict";
import { creerCode, lienDuSalon, codeDuLien, creerSalon, ALPHABET, LONGUEUR_CODE, PREFIXE, EXPIRATION_MS, CONNEXION_MS } from "../app/js/salon.js";

// Faux serveur PeerJS : identifiants inscrits, connexions de données en paires. Les événements partent en différé,
// comme sur le réseau, après que l'appelant a posé ses écouteurs.
const plusTard = (fn) => setImmediate(fn);
const attendre = () => new Promise((r) => setImmediate(() => setImmediate(r)));

function emetteur() {
  const ecouteurs = {};
  return {
    on(ev, fn) { (ecouteurs[ev] ??= []).push(fn); },
    emit(ev, ...a) { for (const fn of ecouteurs[ev] ?? []) fn(...a); },
  };
}

function fauxServeur({ injoignables = new Set() } = {}) {
  const inscrits = new Map();
  function creerPeer(id) {
    const p = { ...emetteur(), id, detruit: false, conns: [] };
    const inscrire = () => {
      if (inscrits.has(id)) return plusTard(() => p.emit("error", { type: "unavailable-id" }));
      inscrits.set(id, p);
      plusTard(() => p.emit("open", id));
    };
    p.connect = (cible) => {
      const a = { ...emetteur(), ouverte: false }, b = { ...emetteur(), ouverte: false };
      const relier = (x, y) => {
        x.send = (m) => { if (x.ouverte) plusTard(() => y.emit("data", m)); };
        x.close = () => {
          if (!x.ouverte && !y.ouverte && x.ferme) return;
          x.ferme = y.ferme = true; x.ouverte = y.ouverte = false;
          plusTard(() => { x.emit("close"); y.emit("close"); });
        };
      };
      relier(a, b); relier(b, a);
      p.conns.push(a);
      const autre = inscrits.get(cible);
      if (!autre || injoignables.has(cible)) {
        plusTard(() => p.emit("error", { type: "peer-unavailable" }));
        return a;
      }
      autre.conns.push(b);
      plusTard(() => {
        autre.emit("connection", b);
        plusTard(() => { a.ouverte = b.ouverte = true; a.emit("open"); b.emit("open"); });
      });
      return a;
    };
    p.reconnect = () => { p.reconnexions = (p.reconnexions ?? 0) + 1; };
    p.destroy = () => {
      if (p.detruit) return;
      p.detruit = true;
      if (inscrits.get(id) === p) inscrits.delete(id);
      for (const c of p.conns) c.close();
    };
    inscrire();
    return p;
  }
  return { creerPeer, inscrits };
}

function fausseHorloge() {
  let t = 0;
  const minuteries = [];
  return {
    maintenant: () => t,
    minuterie(fn, ms) {
      const m = { a: t + ms, fn, annulee: false };
      minuteries.push(m);
      return () => { m.annulee = true; };
    },
    avancer(ms) {
      t += ms;
      for (const m of minuteries) if (!m.annulee && !m.fait && m.a <= t) { m.fait = true; m.fn(); }
    },
  };
}

// Un joueur : son salon et la liste des états qu'il a affichés.
function joueur(serveur, horloge, codes) {
  const etats = [];
  const salon = creerSalon({
    creerPeer: serveur.creerPeer, horloge,
    surEtat: (etat, info) => etats.push({ etat, ...info }),
    ...(codes ? { nouveauCode: () => codes.shift() } : {}),
  });
  return { salon, etats, dernier: () => etats.at(-1)?.etat };
}

test("code : 20 caractères de l'alphabet de 62, tirés sans biais ; deux codes différents", () => {
  const c = creerCode();
  assert.equal(c.length, LONGUEUR_CODE);
  assert.ok([...c].every((x) => ALPHABET.includes(x)));
  assert.notEqual(creerCode(), creerCode());
  // Octets ≥ 248 rejetés : 248 à 255 ne produisent aucun caractère.
  let appels = 0;
  const c2 = creerCode((n) => (appels++ === 0 ? new Uint8Array(n).fill(250) : new Uint8Array(n).fill(1)));
  assert.equal(c2, "B".repeat(20));
});

test("lien : le code est après le # ; le lien se relit ; fragment vide ou invalide → aucun code", () => {
  const code = "Ab3".padEnd(20, "x");
  const lien = lienDuSalon("https://vartax77.github.io/ne-souris-pas/duel.html#ancien", code);
  assert.equal(lien, `https://vartax77.github.io/ne-souris-pas/duel.html#${code}`);
  assert.equal(codeDuLien(new URL(lien).hash), code);
  for (const f of ["", "#", "#court", `#${code}!`, `#${code}x`, null]) assert.equal(codeDuLien(f), null, String(f));
});

test("hôte et invité se trouvent ; un troisième reçoit « lien plus valable » ; l'hôte garde le premier", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const hote = joueur(s, h), invite = joueur(s, h), intrus = joueur(s, h);
  hote.salon.creer();
  await attendre();
  assert.equal(hote.dernier(), "attente");
  const code = hote.etats[0].code;
  assert.ok(s.inscrits.has(PREFIXE + code));
  invite.salon.rejoindre(code);
  await attendre(); await attendre();
  assert.equal(invite.dernier(), "trouve");
  assert.equal(hote.dernier(), "trouve");
  intrus.salon.rejoindre(code);
  await attendre(); await attendre();
  h.avancer(1000); // l'hôte ferme la connexion refusée
  await attendre();
  assert.equal(intrus.dernier(), "er6");
  assert.equal(hote.dernier(), "trouve");
  assert.equal(invite.dernier(), "trouve");
});

test("code inconnu → « lien plus valable »", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const invite = joueur(s, h);
  invite.salon.rejoindre("Z".repeat(20));
  await attendre(); await attendre();
  assert.equal(invite.dernier(), "er6");
});

test("15 min sans invité → « Personne n'a rejoint » ; un invité tardif → « lien plus valable »", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const hote = joueur(s, h), tardif = joueur(s, h);
  hote.salon.creer();
  await attendre();
  const code = hote.etats[0].code;
  h.avancer(EXPIRATION_MS - 1000); // 14 min 59 s
  assert.equal(hote.dernier(), "attente");
  h.avancer(1000);
  assert.equal(hote.dernier(), "er11");
  assert.ok(!s.inscrits.has(PREFIXE + code)); // code libéré
  tardif.salon.rejoindre(code);
  await attendre(); await attendre();
  assert.equal(tardif.dernier(), "er6");
});

test("après la rencontre, pas d'expiration à 15 min", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const hote = joueur(s, h), invite = joueur(s, h);
  hote.salon.creer();
  await attendre();
  invite.salon.rejoindre(hote.etats[0].code);
  await attendre(); await attendre();
  h.avancer(EXPIRATION_MS * 2);
  assert.equal(hote.dernier(), "trouve");
  assert.equal(invite.dernier(), "trouve");
});

test("« Quitter » chez l'un → « adversaire parti » chez l'autre ; le lien ne vaut plus", async () => {
  for (const partant of ["invite", "hote"]) {
    const s = fauxServeur(), h = fausseHorloge();
    const j = { hote: joueur(s, h), invite: joueur(s, h) }, apres = joueur(s, h);
    j.hote.salon.creer();
    await attendre();
    const code = j.hote.etats[0].code;
    j.invite.salon.rejoindre(code);
    await attendre(); await attendre();
    j[partant].salon.quitter();
    await attendre(); await attendre();
    const reste = partant === "invite" ? "hote" : "invite";
    assert.equal(j[partant].dernier(), "ferme", partant);
    assert.equal(j[reste].dernier(), "er5", partant);
    apres.salon.rejoindre(code);
    await attendre(); await attendre();
    assert.equal(apres.dernier(), "er6", partant);
  }
});

test("« Annuler » en attente : le lien ne vaut plus", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const hote = joueur(s, h), invite = joueur(s, h);
  hote.salon.creer();
  await attendre();
  hote.salon.quitter();
  invite.salon.rejoindre(hote.etats[0].code);
  await attendre(); await attendre();
  assert.equal(hote.dernier(), "ferme");
  assert.equal(invite.dernier(), "er6");
});

test("identifiant déjà pris → un nouveau code, une seule fois", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const pris = "P".repeat(20), libre = "L".repeat(20);
  s.creerPeer(PREFIXE + pris);
  await attendre();
  const hote = joueur(s, h, [pris, libre]);
  hote.salon.creer();
  await attendre(); await attendre();
  assert.equal(hote.dernier(), "attente");
  assert.equal(hote.etats.at(-1).code, libre);
  // Deux fois pris : erreur affichée (ER4), pas de boucle.
  s.creerPeer(PREFIXE + libre + "2");
  const autre = joueur(s, h, [pris, libre]);
  autre.salon.creer();
  await attendre(); await attendre();
  assert.equal(autre.dernier(), "er4");
  assert.equal(autre.etats.at(-1).cause, "unavailable-id");
});

test("hôte injoignable au-delà de 20 s → « Impossible de joindre votre adversaire » (ER4)", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const hote = joueur(s, h), invite = joueur(s, h);
  hote.salon.creer();
  await attendre();
  const code = hote.etats[0].code;
  // La connexion de données n'aboutit jamais (réseau bloqué) : on retire l'ouverture.
  const peerHote = s.inscrits.get(PREFIXE + code);
  peerHote.emit = ((emit) => (ev, ...a) => (ev === "connection" ? undefined : emit(ev, ...a)))(peerHote.emit);
  invite.salon.rejoindre(code);
  await attendre(); await attendre();
  h.avancer(CONNEXION_MS - 1);
  assert.notEqual(invite.dernier(), "er4");
  h.avancer(1);
  assert.equal(invite.dernier(), "er4");
});

test("serveur perdu (page masquée sur iPhone) : réinscription sous le même identifiant", async () => {
  const s = fauxServeur(), h = fausseHorloge();
  const hote = joueur(s, h);
  hote.salon.creer();
  await attendre();
  const peer = s.inscrits.get(PREFIXE + hote.etats[0].code);
  peer.emit("disconnected");
  assert.equal(peer.reconnexions, 1);
  hote.salon.quitter();
  peer.emit("disconnected"); // après la fin : aucune réinscription
  assert.equal(peer.reconnexions, 1);
});
