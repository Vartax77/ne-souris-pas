// Réglages de départ de l'arbitrage (D2 §3), en un seul endroit : le rejeu du lot L0.7 utilisera
// exactement les mêmes valeurs et le même code (D8 n° 137). Toutes sont « à confirmer (P0) ».

export const REGLAGES = Object.freeze({
  phaseNeutreMs: 3000, // durée de la phase neutre
  phaseSourireMs: 2000, // durée de la phase sourire
  presenceMin: 0.9, // part minimale d'images avec un seul visage, par phase
  deuxVisagesMax: 0.1, // part d'images à deux visages dans une phase au-delà de laquelle : « Un seul visage »
  largeurMin: 20, // % de la largeur de l'image (D2 Q15 : repli possible à 12 %)
  lacetMax: 25, // degrés, en valeur absolue
  tangageMax: 20, // degrés, en valeur absolue
  cameraSombreMax: 12, // im/s : sous ce seuil, la caméra ralentit faute de lumière (D8 n° 247)
  luminanceMin: 60, // sur 255 : filet de sécurité si la caméra garde sa cadence dans le noir
  ecartTypeMax: 0.05, // écart-type du score brut en phase neutre
  neutreMax: 0.35, // plafond du neutre n
  amplitudeMin: 0.15, // amplitude minimale v − n
  k: 0.4, // coefficient du seuil : d = k × (v − n)
  dMax: 0.35, // seuil maximal
  lissage: 3, // images valides par moyenne mobile pour le score lissé S
  // Manche (R2, R3, lot L0.4)
  m: 0.05, // marge : au-dessus de n + m, l'image est « en doute »
  maintienMs: 500, // durée minimale d'un sourire confirmé (première à dernière image souriante)
  imagesMinSourire: 3, // images souriantes minimales par sourire confirmé
  imagesTolerees: 1, // images non souriantes tolérées par série, si la suivante est souriante
  plancherCheek: 0.2, // variante : s compté seulement si cheekSquint atteint ce plancher (P0 seulement)
});
