// Garde-fou de R7.5 et de D7 (D8 n° 26, n° 69) : aucun code de l'application n'écrit dans le stockage
// du navigateur. Vérifiable sans Mac pour l'iPhone. Lancer : node --test "tests/*.test.mjs"
// Seule exception (n° 315) : le journal P1 de duel.js, sous une seule clé, sans image, son ni adresse.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const DOSSIER = new URL("../app/js/", import.meta.url);
const INTERDITS = ["localStorage", "sessionStorage", "indexedDB", "caches.", "document.cookie", "openDatabase"];

test("aucun accès au stockage du navigateur dans app/js, sauf le journal P1", () => {
  const trouves = [];
  for (const nom of readdirSync(DOSSIER).filter((n) => n.endsWith(".js"))) {
    let code = readFileSync(new URL(nom, DOSSIER), "utf8");
    if (nom === "duel.js") code = code.replaceAll("localStorage.getItem(CLE_JOURNAL)", "").replaceAll("localStorage.setItem(CLE_JOURNAL,", "");
    for (const mot of INTERDITS) if (code.includes(mot)) trouves.push(`${nom} : ${mot}`);
  }
  assert.deepEqual(trouves, []);
});
