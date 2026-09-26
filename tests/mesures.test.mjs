// Vérification des calculs du lot L0.2. Lancer depuis la racine du dépôt : node --test tests/
// Hors de app/ : jamais publié sur GitHub Pages.

import { test } from "node:test";
import assert from "node:assert/strict";
import { angles, rectangle, largeur, luminance, scores } from "../app/js/mesures.js";
import { creerLimiteur, creerFenetre } from "../app/js/cadence.js";

const RAD = Math.PI / 180;
const proche = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg} : ${a} au lieu de ${b}`);

// Matrice 4 × 4 rangée par colonnes, rotation R = Ry(lacet) · Rx(tangage), sans translation.
function matrice(lacetDeg, tangageDeg) {
  const [cy, sy] = [Math.cos(lacetDeg * RAD), Math.sin(lacetDeg * RAD)];
  const [cx, sx] = [Math.cos(tangageDeg * RAD), Math.sin(tangageDeg * RAD)];
  const R = [
    [cy, sy * sx, sy * cx],
    [0, cx, -sx],
    [-sy, cy * sx, cy * cx],
  ];
  const d = new Array(16).fill(0);
  for (let c = 0; c < 3; c++) for (let l = 0; l < 3; l++) d[c * 4 + l] = R[l][c];
  d[15] = 1;
  return d;
}

test("angles : lacet et tangage retrouvés depuis la matrice", () => {
  for (const [lacet, tangage] of [[0, 0], [25, 0], [-25, 0], [0, 20], [0, -20], [30, -15]]) {
    const a = angles(matrice(lacet, tangage));
    proche(a.lacet, lacet, 1e-9, `lacet (${lacet}, ${tangage})`);
    proche(a.tangage, tangage, 1e-9, `tangage (${lacet}, ${tangage})`);
  }
});

// Convention relevée sur appareil (D8 n° 235). Matrice d'un visage tourné de +27° vers la gauche du joueur
// (rotation positive autour de l'axe vertical, comme la produit MediaPipe) et d'un menton baissé de +29°.
test("convention : lacet > 0 = tête vers la gauche du joueur, tangage > 0 = menton vers le bas", () => {
  assert.ok(angles(matrice(27, 0)).lacet > 0, "tête vers la gauche du joueur : lacet positif");
  assert.ok(angles(matrice(-27, 0)).lacet < 0, "tête vers la droite du joueur : lacet négatif");
  assert.ok(angles(matrice(0, 29)).tangage > 0, "menton vers le bas : tangage positif");
  assert.ok(angles(matrice(0, -29)).tangage < 0, "menton vers le haut : tangage négatif");
});

test("largeur : écart horizontal des repères en %", () => {
  const r = rectangle([{ x: 0.3, y: 0.2 }, { x: 0.55, y: 0.6 }, { x: 0.4, y: 0.4 }]);
  assert.deepEqual(r, { x0: 0.3, y0: 0.2, x1: 0.55, y1: 0.6 });
  proche(largeur(r), 25, 1e-9, "largeur");
});

test("luminance : moyenne pondérée dans le seul rectangle du visage", () => {
  const l = 4, h = 4, px = new Uint8ClampedArray(l * h * 4);
  // Moitié gauche blanche, moitié droite noire.
  for (let y = 0; y < h; y++) for (let x = 0; x < l; x++) {
    const v = x < 2 ? 255 : 0, i = (y * l + x) * 4;
    px[i] = px[i + 1] = px[i + 2] = v;
    px[i + 3] = 255;
  }
  proche(luminance(px, l, h, { x0: 0, y0: 0, x1: 0.5, y1: 1 }), 255, 1e-9, "zone blanche");
  proche(luminance(px, l, h, { x0: 0.5, y0: 0, x1: 1, y1: 1 }), 0, 1e-9, "zone noire");
  proche(luminance(px, l, h, { x0: 0, y0: 0, x1: 1, y1: 1 }), 127.5, 1e-9, "image entière");
});

test("scores : s et cheekSquint = moyennes gauche et droite", () => {
  const sc = scores([
    { categoryName: "mouthSmileLeft", score: 0.2 },
    { categoryName: "mouthSmileRight", score: 0.4 },
    { categoryName: "cheekSquintLeft", score: 0.1 },
    { categoryName: "cheekSquintRight", score: 0.3 },
  ]);
  proche(sc.s, 0.3, 1e-9, "s");
  proche(sc.cheek, 0.2, 1e-9, "cheekSquint");
});

// Caméra simulée : horodatages irréguliers (± jitter ms), pendant `duree` ms.
function camera(ips, jitter, duree) {
  const t = [];
  let graine = 1;
  const alea = () => ((graine = (graine * 16807) % 2147483647) / 2147483647) * 2 - 1;
  for (let k = 0; k * 1000 / ips < duree; k++) t.push(1000 + k * 1000 / ips + alea() * jitter);
  return t;
}

function cadenceAnalysee(ips, jitter) {
  const autoriser = creerLimiteur(15);
  const f10 = creerFenetre(10000), f1 = creerFenetre(1000);
  let max = 0, max1 = 0;
  for (const t of camera(ips, jitter, 60000)) {
    if (!autoriser(t)) continue;
    f10.ajouter(t);
    f1.ajouter(t);
    if (f10.pleine()) max = Math.max(max, f10.cadence());
    if (f1.pleine()) max1 = Math.max(max1, f1.cadence());
  }
  return { fin: f10.cadence(), max, max1 };
}

test("plafond : 15 images/s sur 10 s, jamais plus, quelle que soit la caméra", () => {
  for (const [ips, jitter] of [[30, 0], [30, 4], [30, 10], [60, 2], [24, 5], [15, 3]]) {
    const { fin, max, max1 } = cadenceAnalysee(ips, jitter);
    assert.ok(max <= 15, `caméra ${ips} im/s ± ${jitter} ms : max sur 10 s ${max}`);
    assert.ok(max1 <= 15, `caméra ${ips} im/s ± ${jitter} ms : max sur 1 s ${max1}`);
    // Caméra plus rapide que le plafond : le plafond, à 1 image/s près (prix du plafond strict).
    if (ips >= 24) assert.ok(fin >= 14, `caméra ${ips} im/s ± ${jitter} ms : ${fin} im/s seulement`);
  }
});

test("plafond : une caméra plus lente que 15 images/s n'est pas freinée", () => {
  const { fin } = cadenceAnalysee(12, 3);
  proche(fin, 12, 0.1, "caméra à 12 im/s");
});
