# Documents de conception — « Ne souris pas »

Source de vérité : [cadrage des lots 1, 2 et 3](../sources/cadrage-lots-1-2-3.md). Décisions : [D8](D8-journal-decisions.md).

| N° | Document | Priorité | Statut | Dernière modification |
|---|---|---|---|---|
| D1 | [Note de cadrage](D1-note-de-cadrage.md) | Priorité 1 | Brouillon (tableau des risques ajouté) | 2026-09-25 |
| D2 | [Règles du jeu et d'arbitrage](D2-regles-jeu-arbitrage.md) | Priorité 1 (arbitrage), Priorité 2 (reste) | Brouillon (complet ; question ouverte : Q17) | 2026-09-26 |
| D3 | [Plan de tests et critères de décision](D3-plan-de-tests.md) | Priorité 1 (prototype 0), Priorité 2 (prototypes 1 et 2) | Brouillon (complet, arbitré ; aucune question ouverte) | 2026-09-27 |
| D4 | [Architecture technique](D4-architecture-technique.md) | Priorité 2 | Brouillon (aucune question ouverte) | 2026-09-26 |
| D5 | [Parcours utilisateur et maquettes d'écrans](D5-parcours-maquettes.md) | Priorité 2 | Brouillon (arbitré ; une question ouverte : Q8) | 2026-09-26 |
| D6 | [Découpage en lots de développement](D6-lots-developpement.md) | Priorité 2 | Brouillon (arbitré ; aucune question ouverte) | 2026-09-27 |
| D7 | [Documents juridiques et confidentialité](D7-juridique-confidentialite.md) | Priorité 3 | Brouillon (arbitré ; à faire relire ; champs [À COMPLÉTER] à remplir) | 2026-09-25 |
| D8 | [Journal des décisions](D8-journal-decisions.md) | Continue | Brouillon (n° 1 à 308) | 2026-09-27 |

Document de séance : [fiche d'information testeur](fiche-information-testeur-P0.md) (prototype 0, lue avant l'accord oral ; brouillon, 2026-09-27).

Priorité 1 : avant de coder le prototype 0. Priorité 2 : avant les prototypes 1 et 2. Priorité 3 : avant que le lien circule hors du cercle proche. P0, P1, P2 désignent uniquement les prototypes.

Rapport de la session du 2026-09-25 (lots 4 à 9, contrôle de cohérence, questions ouvertes) : [RAPPORT-SESSION](RAPPORT-SESSION.md). Arbitrages de Valentin sur ce rapport : [D8](D8-journal-decisions.md) §16 (n° 159 à 218).

Code du prototype 0 : dossier [`app/`](../app/), publié sur GitHub Pages par [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) (n° 219 à 308). Lots L0.1 à L0.6a : **terminés** (relevés en [D3](D3-plan-de-tests.md) §1.7 ; L0.3 sur le PC, essais iPhone reportés au protocole P0 ; L0.6a sur le PC et l’iPhone 15 Pro). L0.6b (session PERF) : **terminé pour le code** ; séances réelles sur l’iPhone XR puis l’iPhone 15 Pro au début de la première séance P0, G3 à confirmer (P0). L0.7 (rejeu, `node outils/rejeu.mjs`) : **terminé**. **Le code du prototype 0 est complet** (L0.1 à L0.7) ; prochaine étape : première séance P0, préparée en [D3](D3-plan-de-tests.md) §1.8. **Prototype 1 commencé en parallèle** (n° 302) : développement par vagues (n° 307) ; vague 1 = L1.1 à L1.4 (page `app/duel.html`), une séance sur appareils de 30 min en fin de vague ; L1.1 terminé côté code ([D6](D6-lots-developpement.md)). Question ouverte sur la parole : [D2](D2-regles-jeu-arbitrage.md) Q17. Vérification automatique : `node --test "tests/*.test.mjs"`.
