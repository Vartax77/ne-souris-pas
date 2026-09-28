// Écran de flash commun (D3 §2.3.3, lot L1.4) : noir et blanc en alternance toutes les 2 s, après un toucher.
// Le verrouillage de l'écran est évité quand le navigateur le permet (écran allumé pendant la mesure).

const PERIODE_MS = 2000;
let blanc = false, marche = false;

document.body.addEventListener("click", async () => {
  if (marche) return;
  marche = true;
  document.getElementById("consigne").hidden = true;
  try { await navigator.wakeLock?.request("screen"); } catch { /* sans maintien de l'écran : régler la veille à la main */ }
  setInterval(() => {
    blanc = !blanc;
    document.body.classList.toggle("blanc", blanc);
  }, PERIODE_MS);
});
