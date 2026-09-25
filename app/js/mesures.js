// Mesures brutes d'un visage (D2 §2, lot L0.2). Fonctions pures, sans accès à la page :
// vérifiées par tests/mesures.test.mjs.

const DEG = 180 / Math.PI;

// Matrice de transformation du visage : 4 × 4, rangée par colonnes (data[colonne * 4 + ligne]),
// rangement par défaut des matrices MediaPipe. Lacet = rotation autour de l'axe vertical,
// tangage = autour de l'axe horizontal (D2 §2). Le sens est vérifié sur appareil (L0.2).
export function angles(data) {
  const lacet = Math.atan2(data[8], data[10]) * DEG;
  const tangage = Math.asin(Math.max(-1, Math.min(1, -data[9]))) * DEG;
  return { lacet, tangage };
}

// Rectangle englobant des repères, en coordonnées normalisées (0 à 1).
export function rectangle(reperes) {
  let x0 = 1, y0 = 1, x1 = 0, y1 = 0;
  for (const { x, y } of reperes) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return { x0, y0, x1, y1 };
}

// Largeur du visage, en % de la largeur de l'image (D2 §2).
export function largeur(rect) {
  return (rect.x1 - rect.x0) * 100;
}

// Luminance moyenne (0 à 255) des pixels RGBA situés dans le rectangle normalisé.
// Calculée sur les pixels, pas par MediaPipe (D2 R1).
export function luminance(pixels, l, h, rect) {
  const xa = Math.max(0, Math.floor(rect.x0 * l)), xb = Math.min(l, Math.ceil(rect.x1 * l));
  const ya = Math.max(0, Math.floor(rect.y0 * h)), yb = Math.min(h, Math.ceil(rect.y1 * h));
  let somme = 0, n = 0;
  for (let y = ya; y < yb; y++) {
    for (let x = xa; x < xb; x++) {
      const i = (y * l + x) * 4;
      somme += 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
      n++;
    }
  }
  return n ? somme / n : NaN;
}

// Scores de sourire bruts : formule de base s et variante cheekSquint (D2 §2, n° 72).
export function scores(categories) {
  const v = {};
  for (const c of categories) v[c.categoryName] = c.score;
  return {
    smileG: v.mouthSmileLeft,
    smileD: v.mouthSmileRight,
    s: (v.mouthSmileLeft + v.mouthSmileRight) / 2,
    cheek: (v.cheekSquintLeft + v.cheekSquintRight) / 2,
  };
}
