// Garde-fou de R7.5 et de D7 (D8 n° 26, n° 69) : aucun code de l'application n'écrit dans le stockage
// du navigateur. Vérifiable sans Mac pour l'iPhone. Lancer : node --test "tests/*.test.mjs"

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

const DOSSIER = new URL("../app/js/", import.meta.url);
const INTERDITS = ["localStorage", "sessionStorage", "indexedDB", "caches.", "document.cookie", "openDatabase"];

test("aucun accès au stockage du navigateur dans app/js", () => {
  const trouves = [];
  for (const nom of readdirSync(DOSSIER).filter((n) => n.endsWith(".js"))) {
    const code = readFileSync(new URL(nom, DOSSIER), "utf8");
    for (const mot of INTERDITS) if (code.includes(mot)) trouves.push(`${nom} : ${mot}`);
  }
  assert.deepEqual(trouves, []);
});
