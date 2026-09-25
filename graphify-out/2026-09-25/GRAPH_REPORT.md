# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 7 files · ~16,067 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 207 nodes · 294 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c19c6bf8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- D8-journal-decisions.md
- 4. Règles d'arbitrage
- Prototype 0 : détection seule, sans réseau
- Projet Ne souris pas — instructions de conception
- 3. Lot 2 — Périmètre de la v1
- Règles d'arbitrage
- Structure de la note D1
- 1.4 Mesures et grille de résultats
- R6 — Départage à 60 s par pic de jauge
- n° 35 — Prototypes P0 (détection), P1 (appel), P2 (duel)
- Aucun enregistrement (aucun stockage persistant)
- 1.3 Protocole pas à pas
- Mode inconnus (vision à terme, exclu v1)
- n° 46 — Documents écartés
- Documents écartés (cahier des charges, AIPD, étude de marché...)

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `1.4 Mesures et grille de résultats` - 10 edges
3. `D4 Architecture technique` - 10 edges
4. `1.3 Protocole pas à pas` - 9 edges
5. `4. Règles d'arbitrage` - 8 edges
6. `5. Limites de mesure et décisions associées` - 8 edges
7. `D2 — Règles du jeu et d'arbitrage` - 8 edges
8. `3. Lot 2 — Périmètre de la v1` - 8 edges
9. `D1 — Note de cadrage` - 8 edges
10. `D7 Juridique et confidentialité` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m)` --implements--> `Marquage À confirmer (P0/P1/P2)`  [EXTRACTED]
  docs/D1-note-de-cadrage.md → CLAUDE.md
- `Fenêtre effective W = max(200 ms, 2 × e)` --references--> `D4 Architecture technique`  [EXTRACTED]
  docs/D2-regles-jeu-arbitrage.md → sources/cadrage-lots-1-2-3.md

## Hyperedges (group relationships)
- **Règles d'arbitrage R1 à R7** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_r2_detection_sourire, docs_d2_regles_jeu_arbitrage_r3_zone_doute_jauge, docs_d2_regles_jeu_arbitrage_r4_visage_perdu, docs_d2_regles_jeu_arbitrage_r5_simultaneite, docs_d2_regles_jeu_arbitrage_r6_departage, docs_d2_regles_jeu_arbitrage_r7_arret_sur_image [EXTRACTED 1.00]
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0 [EXTRACTED 1.00]
- **Confidentialité : analyse locale, pair à pair, rien de stocké** — docs_d8_journal_decisions_pwa_webrtc, docs_d8_journal_decisions_jugement_local, docs_d2_regles_jeu_arbitrage_aucun_enregistrement, docs_d8_journal_decisions_aucun_compte [INFERRED 0.75]
- **Chaîne calibrage → seuil individuel → jauge → départage** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_seuil_propre_joueur, docs_d2_regles_jeu_arbitrage_d_max, docs_d2_regles_jeu_arbitrage_jauge, docs_d2_regles_jeu_arbitrage_r6_departage [INFERRED 0.85]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]

## Communities (15 total, 2 thin omitted)

### Community 0 - "D8-journal-decisions.md"
Cohesion: 0.10
Nodes (30): Seuil maximal d_max = 0,35, Faute (sourire confirmé ou deuxième perte), Fenêtre effective W = max(200 ms, 2 × e), Hand Landmarker (dette technique), Image valide / invalide, Main devant la bouche — limite acceptée v1, MediaPipe Face Landmarker, Q1 — Plafonner le seuil à d_max ? (+22 more)

### Community 1 - "4. Règles d'arbitrage"
Cohesion: 0.09
Nodes (22): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité (+14 more)

### Community 2 - "Prototype 0 : détection seule, sans réseau"
Cohesion: 0.10
Nodes (29): Marquage À confirmer (P0/P1/P2), Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : chauffe excessive (+21 more)

### Community 3 - "Projet Ne souris pas — instructions de conception"
Cohesion: 0.29
Nodes (12): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, D4 Architecture technique, D5 Parcours utilisateur et maquettes, D6 Découpage en lots de développement, D7 Juridique et confidentialité, Documents de conception — « Ne souris pas » (+4 more)

### Community 4 - "3. Lot 2 — Périmètre de la v1"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 5 - "Règles d'arbitrage"
Cohesion: 0.18
Nodes (12): Arrêt sur image comme preuve, sans enregistrement, Calibrage 3 s visage neutre + contrôle lumière/cadrage, Sourires quasi simultanés (< 200 ms) : manche nulle, Horodatage local, horloges synchronisées à la révélation, Deux jauges visibles par les deux joueurs, Mécanique d'apparition : écran noir, 3-2-1, révélation simultanée, MediaPipe Face Landmarker (détection locale du sourire), PWA web multi-appareil (+4 more)

### Community 6 - "Structure de la note D1"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

### Community 7 - "1.4 Mesures et grille de résultats"
Cohesion: 0.07
Nodes (28): 1.1 Objectif et risques testés, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, 1.4.1 Journal numérique, 1.4.2 Fiche testeur (+20 more)

### Community 8 - "R6 — Départage à 60 s par pic de jauge"
Cohesion: 0.24
Nodes (11): Jauge J et pic de jauge, R3 — Zone de doute et jauge, R6 — Départage à 60 s par pic de jauge, n° 1 — Un appareil par joueur, jeu à distance, Exclusions v1 : clip partageable, comptes, détection sonore, n° 10 — Manche de 60 s, 2 manches gagnantes, n° 49 : jauge comparée = pic atteint, pas le cumul, n° 59 : jauge normalisée, figée sur image invalide (+3 more)

### Community 9 - "n° 35 — Prototypes P0 (détection), P1 (appel), P2 (duel)"
Cohesion: 0.20
Nodes (11): Tableau des réglages d'arbitrage, n° 3 — Aucune provocation de l'application, Convention Priorité 1/2/3 vs prototypes P0/P1/P2, n° 50 — Critère de réussite : revanche spontanée, n° 50 : critère de réussite v1 = revanche spontanée, n° 51 : définitions provisoires des critères P0/P1, n° 52 : performance en échec → réduire fréquence ou résolution, n° 54 : revanche en échec → réintroduire des provocations (+3 more)

### Community 10 - "Aucun enregistrement (aucun stockage persistant)"
Cohesion: 0.29
Nodes (8): Aucun enregistrement (aucun stockage persistant), R7 — Arrêt sur image (image de preuve), n° 7 — Budget relais 0 € puis 10 € par mois, n° 53 : connexion en échec → changer de service de relais, n° 63 : arrêt sur image prise par l'appareil du joueur, n° 69 : aucun enregistrement = aucun stockage persistant, n° 11-12 — PWA web et WebRTC pair à pair, n° 14 — Serveur de mise en relation et relais TURN

### Community 11 - "1.3 Protocole pas à pas"
Cohesion: 0.22
Nodes (9): 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur), 1.3.3 Accueil (3 min), 1.3.4 Séquences en conditions normales (environ 15 min), 1.3.5 Conditions dégradées (environ 8 min), 1.3.6 Exagération (environ 3 min), 1.3.7 Fin de session (3 min), 1.3.8 Session performance (Valentin seul, par appareil) (+1 more)

### Community 12 - "Mode inconnus (vision à terme, exclu v1)"
Cohesion: 0.67
Nodes (3): n° 5 — Âge minimum 18 ans, n° 28 — Aucun compte, salon à code aléatoire, Mode inconnus (vision à terme, exclu v1)

## Knowledge Gaps
- **93 isolated node(s):** `1.1 Objectif et risques testés`, `1.2.1 Testeurs`, `1.2.2 Conditions`, `1.2.3 Appareils`, `1.2.4 Volume et durée` (+88 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 93 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D3 — Plan de tests et critères de décision` connect `1.4 Mesures et grille de résultats` to `Projet Ne souris pas — instructions de conception`?**
  _High betweenness centrality (0.286) - this node is a cross-community bridge._
- **Why does `1. Prototype 0 — détection seule, sans réseau` connect `1.4 Mesures et grille de résultats` to `1.3 Protocole pas à pas`?**
  _High betweenness centrality (0.275) - this node is a cross-community bridge._
- **Why does `D2 — Règles du jeu et d'arbitrage` connect `4. Règles d'arbitrage` to `Projet Ne souris pas — instructions de conception`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **What connects `1.1 Objectif et risques testés`, `1.2.1 Testeurs`, `1.2.2 Conditions` to the rest of the system?**
  _93 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `D8-journal-decisions.md` be split into smaller, more focused modules?**
  _Cohesion score 0.1032258064516129 - nodes in this community are weakly interconnected._
- **Should `4. Règles d'arbitrage` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Prototype 0 : détection seule, sans réseau` be split into smaller, more focused modules?**
  _Cohesion score 0.0960591133004926 - nodes in this community are weakly interconnected._