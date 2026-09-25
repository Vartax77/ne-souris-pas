# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 6 files · ~11,026 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 116 nodes · 178 edges · 9 communities
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac57f72f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Projet Ne souris pas — instructions de conception
- Prérequis et garde-fous (conditionnent le passage au prototype suivant)
- 3. Lot 2 — Périmètre de la v1
- Aucune provocation ajoutée par l'application
- Règles d'arbitrage
- Vie privée : aucun enregistrement, aucun compte, salon à code éphémère
- D1 — Note de cadrage
- 4. Règles d'arbitrage
- 5. Limites de mesure et règles jugées injustes

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `D4 Architecture technique` - 9 edges
3. `Règles d'arbitrage` - 9 edges
4. `Index des documents D1 à D8 (priorité, statut, date)` - 9 edges
5. `D2 — Règles du jeu et d'arbitrage` - 8 edges
6. `4. Règles d'arbitrage` - 8 edges
7. `5. Limites de mesure et règles jugées injustes` - 8 edges
8. `3. Lot 2 — Périmètre de la v1` - 8 edges
9. `D1 — Note de cadrage` - 8 edges
10. `D3 Plan de tests et critères de décision` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `n° 48 : « Priorité 1/2/3 » en toutes lettres, P0/P1/P2 réservés aux prototypes` --conceptually_related_to--> `Marquage À confirmer (P0/P1/P2)`  [INFERRED]
  docs/D8-journal-decisions.md → CLAUDE.md
- `n° 51 : définitions provisoires des critères n° 36 à 38` --references--> `D3 Plan de tests et critères de décision`  [EXTRACTED]
  docs/D8-journal-decisions.md → sources/cadrage-lots-1-2-3.md

## Hyperedges (group relationships)
- **Arbitrages de Valentin du 2026-09-25** — docs_d8_journal_decisions_d48_priorites_vs_prototypes, docs_d8_journal_decisions_d49_jauge_pic, docs_d8_journal_decisions_d50_revanche_critere, docs_d8_journal_decisions_d51_definitions_provisoires, docs_d8_journal_decisions_conduites_echec, docs_d8_journal_decisions_d55_synchro_p1 [EXTRACTED 1.00]
- **Définitions provisoires rendant les critères mesurables** — docs_d1_note_de_cadrage_def_conditions_normales, docs_d1_note_de_cadrage_def_chauffe_excessive, docs_d1_note_de_cadrage_def_100_connexions, docs_d8_journal_decisions_d51_definitions_provisoires [EXTRACTED 1.00]
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0, docs_d8_journal_decisions_d50_revanche_critere [EXTRACTED 1.00]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Projet Ne souris pas — instructions de conception"
Cohesion: 0.23
Nodes (17): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Marquage À confirmer (P0/P1/P2), Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), D3 Plan de tests et critères de décision, D4 Architecture technique, D5 Parcours utilisateur et maquettes (+9 more)

### Community 1 - "Prérequis et garde-fous (conditionnent le passage au prototype suivant)"
Cohesion: 0.13
Nodes (19): P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : chauffe excessive, Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m), Périmètre de la v1 (D1 §3), Prérequis et garde-fous (conditionnent le passage au prototype suivant) (+11 more)

### Community 2 - "3. Lot 2 — Périmètre de la v1"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 3 - "Aucune provocation ajoutée par l'application"
Cohesion: 0.24
Nodes (12): Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Exclusions v1 et conditions de retour, Âge minimum 18 ans, Aucune provocation ajoutée par l'application, Clip partageable du fou rire (v2), Exclusions de la v1 et conditions de réintégration, H5 : valeur ajoutée vs simple appel vidéo, Hypothèses critiques H1-H6 (+4 more)

### Community 4 - "Règles d'arbitrage"
Cohesion: 0.22
Nodes (13): Lot documentaire 1 — Arbitrages du 2026-09-25 (n° 48 à 55), n° 48 : « Priorité 1/2/3 » en toutes lettres, P0/P1/P2 réservés aux prototypes, n° 49 : jauge comparée = pic atteint, pas le cumul, n° 55 : synchronisation des horloges passe de P2 à P1 ; visage perdu reste P0, Barème Priorité 1/2/3 (avant P0 / avant P1-P2 / avant diffusion hors cercle proche), Calibrage 3 s visage neutre + contrôle lumière/cadrage, Sourires quasi simultanés (< 200 ms) : manche nulle, Horodatage local, horloges synchronisées à la révélation (+5 more)

### Community 5 - "Vie privée : aucun enregistrement, aucun compte, salon à code éphémère"
Cohesion: 0.50
Nodes (4): Arrêt sur image comme preuve, sans enregistrement, MediaPipe Face Landmarker (détection locale du sourire), PWA web multi-appareil, Vie privée : aucun enregistrement, aucun compte, salon à code éphémère

### Community 6 - "D1 — Note de cadrage"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

### Community 7 - "4. Règles d'arbitrage"
Cohesion: 0.14
Nodes (14): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité (+6 more)

### Community 8 - "5. Limites de mesure et règles jugées injustes"
Cohesion: 0.25
Nodes (8): 5.1 Un seuil identique pour tous les visages est injuste, 5.2 Tricher au calibrage, 5.3 Une perte prolongée permet d'échapper au jugement, 5.4 Main devant la bouche : non mesurable, 5.5 Synchronisation : 200 ms, c'est serré, 5.6 Parole et départage, 5.7 Deux visages dans le champ, 5. Limites de mesure et règles jugées injustes

## Knowledge Gaps
- **49 isolated node(s):** `1. Périmètre`, `2. Définitions`, `3. Tableau des réglages`, `4.1 R1 — Calibrage`, `4.2 R2 — Détection du sourire` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 49 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D2 — Règles du jeu et d'arbitrage` connect `4. Règles d'arbitrage` to `Projet Ne souris pas — instructions de conception`, `5. Limites de mesure et règles jugées injustes`?**
  _High betweenness centrality (0.325) - this node is a cross-community bridge._
- **Why does `D8 — Journal des décisions` connect `3. Lot 2 — Périmètre de la v1` to `Projet Ne souris pas — instructions de conception`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `D1 — Note de cadrage` connect `D1 — Note de cadrage` to `Projet Ne souris pas — instructions de conception`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **What connects `1. Périmètre`, `2. Définitions`, `3. Tableau des réglages` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prérequis et garde-fous (conditionnent le passage au prototype suivant)` be split into smaller, more focused modules?**
  _Cohesion score 0.13450292397660818 - nodes in this community are weakly interconnected._
- **Should `3. Lot 2 — Périmètre de la v1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `4. Règles d'arbitrage` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._