// Protocole du prototype 0 (D3 §1.3, lot L0.6a). Séquences en données, touche de l'opérateur et classement
// de la revue : fonctions pures, vérifiées par tests/protocole.test.mjs.

// Séquences de D3 §1.3.4 à §1.3.6, dans l'ordre. etapes : [consigne affichée au testeur, durée en s].
// calibrage : séquence faite seulement de calibrages (A0). calibrageAvant : un calibrage fait avec cette
// séquence sélectionnée est exigé avant de la lancer. revue : revue des sourires confirmés en fin de séquence.
const alterner = (consigne, fois) =>
  Array.from({ length: fois }, () => [[consigne, 5], ["Visage neutre", 5]]).flat();

const DEGRADEE = (code, titre, preparation) => ({
  code, titre, preparation, calibrageAvant: true, revue: true,
  etapes: [
    ["Visage neutre, sans parler", 30],
    ["Parlez normalement", 30],
    ["Souriez franchement", 5], ["Visage neutre", 5],
    ["Souriez franchement", 5], ["Visage neutre", 5],
  ],
});

export const SEQUENCES = Object.freeze([
  { code: "A0", titre: "Calibrage", calibrage: true,
    preparation: "Trois calibrages réussis de suite, dont un volontairement timide ; après le timide, faire A2 abrégée et A3 (n° 258). Utilisez le bouton « Commencer » du calibrage." },
  { code: "A1", titre: "Neutre silencieux", revue: true,
    etapes: [["Regardez l'écran, visage détendu, sans parler", 60]] },
  { code: "A2", titre: "Parole libre", revue: true,
    etapes: [["Racontez votre journée, sans chercher à rire", 270]] },
  { code: "A3", titre: "Voyelles tenues", revue: true,
    etapes: [
      ["Lisez, chacun tenu 1 s : « iii », « ouistiti », « cheese », « pipi », « merci »", 55],
      ["Répétez « pi-pi-pi-pi » sans pause", 5],
    ] },
  { code: "A4", titre: "Gestes parasites", revue: true,
    etapes: [["Bâillez deux fois, toussez, pincez les lèvres, mordez votre lèvre, déglutissez, humectez vos lèvres", 60]] },
  { code: "A5", titre: "Provocation", revue: true,
    etapes: [["Tenez sans sourire : l'opérateur vous provoque (1re minute)", 60],
      ["Tenez sans sourire : l'opérateur vous provoque (2e minute)", 60]] },
  { code: "A6", titre: "Sourires commandés",
    etapes: [["Visage neutre", 10], ...alterner("Sourire léger", 3), ...alterner("Sourire franc", 3), ...alterner("Riez", 2)] },
  { code: "A7", titre: "Mouvements",
    etapes: [
      ["Tournez lentement la tête à gauche, puis à droite", 20],
      ["Penchez la tête en avant, puis en arrière", 20],
      ["Reculez jusqu'à 1,5 m, puis revenez", 20],
      ["Sortez du champ 2 s, puis revenez", 10],
      ["Sortez du champ 6 s, puis revenez", 15],
      ["Souriez derrière votre main", 15],
      ["Une deuxième personne passe derrière vous", 20],
    ] },
  DEGRADEE("B1", "Pénombre", "Seule la lumière de l'écran, ou une lampe éloignée. Calibrez d'abord, avec B1 sélectionnée."),
  DEGRADEE("B2", "Contre-jour", "Fenêtre ou lampe derrière le testeur. Calibrez d'abord, avec B2 sélectionnée."),
  DEGRADEE("B3", "Éclairage latéral", "Une seule source sur le côté. Calibrez d'abord, avec B3 sélectionnée."),
  { code: "C", titre: "Exagération", calibrageAvant: true,
    preparation: "Calibrez d'abord, avec C sélectionnée, en forçant le sourire volontaire au maximum ; notez d et « plafonné ».",
    etapes: [["Vous pouvez sourire franchement : l'opérateur vous provoque", 60]] },
]);

export const dureeTotale = (seq) => (seq.etapes ?? []).reduce((a, [, s]) => a + s, 0);

// Étape en cours après ecouleS secondes : { index, consigne, resteS } ; null une fois la séquence finie.
export function etapeA(seq, ecouleS) {
  let debut = 0;
  for (const [index, [consigne, duree]] of (seq.etapes ?? []).entries()) {
    if (ecouleS < debut + duree) return { index, consigne, resteS: debut + duree - ecouleS };
    debut += duree;
  }
  return null;
}

// Touche de l'opérateur (D3 §1.3.4) : la barre d'espace. Pendant une séquence ou un calibrage, elle ne doit
// jamais activer le bouton qui a le focus (un bouton s'active à l'appui ET au relâchement de l'espace) :
// on la bloque à l'appui comme au relâchement. Seul l'appui compte, et une touche maintenue une seule fois.
// Hors séquence, elle garde son rôle normal.
export function toucheOperateur(e, actif) {
  const espace = e.code === "Space" || e.key === " ";
  if (!actif || !espace) return { op: false, bloquer: false };
  return { op: e.type === "keydown" && !e.repeat, bloquer: true };
}

// L'opérateur a-t-il vu ce sourire ? Touche pressée entre avantMs avant le début de la série et apresMs après
// sa confirmation. Fenêtre de départ : 0,5 s avant, 2 s après (À confirmer (P0), D8 n° 272).
export function operateurAVu(pressions, debut, confirmation, avantMs = 500, apresMs = 2000) {
  return pressions.some((t) => t >= debut - avantMs && t <= confirmation + apresMs);
}

// Classement de la revue (D3 §1.3.4) : le testeur dit si c'est un sourire ; la touche dit si l'opérateur l'a vu.
export function classerRevue(testeurDitSourire, opVu) {
  if (testeurDitSourire) return "confirmee";
  return opVu ? "litigieuse" : "faux_positif";
}
