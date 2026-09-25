# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 5 files · ~6,161 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 71 nodes · 96 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e0f67f5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Exclusions de la v1 et conditions de réintégration
- Règles d'arbitrage
- Projet Ne souris pas — instructions de conception
- Serveur de mise en relation + relais TURN
- D1-note-de-cadrage.md
- Marquage À confirmer (P0/P1/P2)
- Concept : duel ne pas sourire, arbitrage automatique
- Documents écartés (cahier des charges, AIPD, étude de marché...)
- Format : manches 60 s, 2 manches gagnantes
- 3. Lot 2 — Périmètre de la v1
- D1 — Note de cadrage

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `D1 — Note de cadrage` - 8 edges
3. `3. Lot 2 — Périmètre de la v1` - 8 edges
4. `Règles d'arbitrage` - 8 edges
5. `D4 Architecture technique` - 8 edges
6. `D8 — Journal des décisions` - 7 edges
7. `D2 Règles du jeu et d'arbitrage` - 7 edges
8. `D3 Plan de tests et critères de décision` - 5 edges
9. `D6 Découpage en lots de développement` - 5 edges
10. `Exclusions de la v1 et conditions de réintégration` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Projet Ne souris pas — instructions de conception` --references--> `Décisions de cadrage lots 1-2-3 (source de vérité)`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Projet Ne souris pas — instructions de conception` --references--> `D2 Règles du jeu et d'arbitrage`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md

## Hyperedges (group relationships)
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]

## Communities (11 total, 3 thin omitted)

### Community 0 - "Exclusions de la v1 et conditions de réintégration"
Cohesion: 0.24
Nodes (10): Âge minimum 18 ans, Arrêt sur image comme preuve, sans enregistrement, Aucune provocation ajoutée par l'application, Clip partageable du fou rire (v2), Exclusions de la v1 et conditions de réintégration, H5 : valeur ajoutée vs simple appel vidéo, Hypothèses critiques H1-H6, Mode inconnus (type Chatroulette), exclu v1 (+2 more)

### Community 1 - "Règles d'arbitrage"
Cohesion: 0.29
Nodes (8): Calibrage 3 s visage neutre + contrôle lumière/cadrage, Sourires quasi simultanés (< 200 ms) : manche nulle, Horodatage local, horloges synchronisées à la révélation, Deux jauges visibles par les deux joueurs, Mécanique d'apparition : écran noir, 3-2-1, révélation simultanée, Règles d'arbitrage, Sourire = neutre + seuil maintenu 400 ms, Visage perdu > 1,5 s : avertissement puis manche perdue

### Community 2 - "Projet Ne souris pas — instructions de conception"
Cohesion: 0.47
Nodes (9): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, D2 Règles du jeu et d'arbitrage, D3 Plan de tests et critères de décision, D4 Architecture technique, D5 Parcours utilisateur et maquettes, D6 Découpage en lots de développement (+1 more)

### Community 3 - "Serveur de mise en relation + relais TURN"
Cohesion: 0.33
Nodes (6): Budget relais : 0 € prototype puis 10 €/mois max, MediaPipe Face Landmarker (détection locale du sourire), PWA web multi-appareil, Serveur de mise en relation + relais TURN, Vie privée : aucun enregistrement, aucun compte, salon à code éphémère, Vidéo/audio WebRTC pair à pair chiffré

### Community 5 - "Marquage À confirmer (P0/P1/P2)"
Cohesion: 0.33
Nodes (6): Marquage À confirmer (P0/P1/P2), Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Parole autorisée pendant les manches, Prototype 0 : détection seule, sans réseau, Prototype 1 : appel vidéo seul sur réseaux différents, Risque d'arbitrage injuste (faux positifs)

### Community 6 - "Concept : duel ne pas sourire, arbitrage automatique"
Cohesion: 0.67
Nodes (3): Concept : duel ne pas sourire, arbitrage automatique, Pivot A : duel 1v1 à distance entre amis, Décisions de cadrage lots 1-2-3 (source de vérité)

### Community 9 - "3. Lot 2 — Périmètre de la v1"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 10 - "D1 — Note de cadrage"
Cohesion: 0.25
Nodes (8): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6. À quoi saura-t-on que la v1 a réussi, 7. Questions ouvertes, D1 — Note de cadrage

## Knowledge Gaps
- **33 isolated node(s):** `1. Ce qu'on construit`, `2. Pour qui`, `3. Périmètre de la v1`, `4. Ce qu'on ne construit pas`, `5. Hypothèses critiques` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 33 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D8 — Journal des décisions` connect `3. Lot 2 — Périmètre de la v1` to `D1-note-de-cadrage.md`?**
  _High betweenness centrality (0.317) - this node is a cross-community bridge._
- **Why does `Projet Ne souris pas — instructions de conception` connect `Projet Ne souris pas — instructions de conception` to `D1-note-de-cadrage.md`, `Marquage À confirmer (P0/P1/P2)`, `Concept : duel ne pas sourire, arbitrage automatique`?**
  _High betweenness centrality (0.271) - this node is a cross-community bridge._
- **Why does `D1 — Note de cadrage` connect `D1 — Note de cadrage` to `D1-note-de-cadrage.md`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **What connects `1. Ce qu'on construit`, `2. Pour qui`, `3. Périmètre de la v1` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `3. Lot 2 — Périmètre de la v1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._