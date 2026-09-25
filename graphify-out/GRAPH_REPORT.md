# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 3 files · ~6,500 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 94 nodes · 155 edges · 7 communities
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.87)
- Token cost: 66,719 input · 0 output

## Community Hubs (Navigation)
- Pilotage documentaire et index
- Critères de test et marquage
- Structure du journal D8
- Réussite v1 et risque d'ennui
- Arbitrage et décisions du 25/09
- Plateforme, vie privée, exclusions
- Structure de la note D1

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `Règles d'arbitrage` - 9 edges
3. `D4 Architecture technique` - 9 edges
4. `Index des documents D1 à D8 (priorité, statut, date)` - 9 edges
5. `D1 — Note de cadrage` - 8 edges
6. `3. Lot 2 — Périmètre de la v1` - 8 edges
7. `D2 Règles du jeu et d'arbitrage` - 8 edges
8. `D3 Plan de tests et critères de décision` - 8 edges
9. `D8 — Journal des décisions` - 7 edges
10. `Marquage À confirmer (P0/P1/P2)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `n° 48 : « Priorité 1/2/3 » en toutes lettres, P0/P1/P2 réservés aux prototypes` --conceptually_related_to--> `Marquage À confirmer (P0/P1/P2)`  [INFERRED]
  docs/D8-journal-decisions.md → CLAUDE.md
- `n° 51 : définitions provisoires des critères n° 36 à 38` --references--> `D3 Plan de tests et critères de décision`  [EXTRACTED]
  docs/D8-journal-decisions.md → sources/cadrage-lots-1-2-3.md
- `n° 52 à 54 : conduites en cas d'échec (réduire analyse, changer relais, réintroduire provocations)` --conceptually_related_to--> `Budget relais : 0 € prototype puis 10 €/mois max`  [INFERRED]
  docs/D8-journal-decisions.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md

## Hyperedges (group relationships)
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0, docs_d8_journal_decisions_d50_revanche_critere [EXTRACTED 1.00]
- **Définitions provisoires rendant les critères mesurables** — docs_d1_note_de_cadrage_def_conditions_normales, docs_d1_note_de_cadrage_def_chauffe_excessive, docs_d1_note_de_cadrage_def_100_connexions, docs_d8_journal_decisions_d51_definitions_provisoires [EXTRACTED 1.00]
- **Arbitrages de Valentin du 2026-09-25** — docs_d8_journal_decisions_d48_priorites_vs_prototypes, docs_d8_journal_decisions_d49_jauge_pic, docs_d8_journal_decisions_d50_revanche_critere, docs_d8_journal_decisions_d51_definitions_provisoires, docs_d8_journal_decisions_conduites_echec, docs_d8_journal_decisions_d55_synchro_p1 [EXTRACTED 1.00]

## Communities (7 total, 0 thin omitted)

### Community 0 - "Pilotage documentaire et index"
Cohesion: 0.30
Nodes (14): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, D2 Règles du jeu et d'arbitrage, D3 Plan de tests et critères de décision, D4 Architecture technique, D5 Parcours utilisateur et maquettes, D6 Découpage en lots de développement (+6 more)

### Community 1 - "Critères de test et marquage"
Cohesion: 0.17
Nodes (14): Marquage À confirmer (P0/P1/P2), Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : chauffe excessive, Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m) (+6 more)

### Community 2 - "Structure du journal D8"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 3 - "Réussite v1 et risque d'ennui"
Cohesion: 0.19
Nodes (13): Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Périmètre de la v1 (D1 §3), Prérequis et garde-fous (conditionnent le passage au prototype suivant), n° 52 à 54 : conduites en cas d'échec (réduire analyse, changer relais, réintroduire provocations), n° 50 : revanche spontanée = critère de réussite ; performance et connexion = prérequis, Aucune provocation ajoutée par l'application, Budget relais : 0 € prototype puis 10 €/mois max, Format : manches 60 s, 2 manches gagnantes (+5 more)

### Community 4 - "Arbitrage et décisions du 25/09"
Cohesion: 0.22
Nodes (13): Lot documentaire 1 — Arbitrages du 2026-09-25 (n° 48 à 55), n° 48 : « Priorité 1/2/3 » en toutes lettres, P0/P1/P2 réservés aux prototypes, n° 49 : jauge comparée = pic atteint, pas le cumul, n° 55 : synchronisation des horloges passe de P2 à P1 ; visage perdu reste P0, Barème Priorité 1/2/3 (avant P0 / avant P1-P2 / avant diffusion hors cercle proche), Calibrage 3 s visage neutre + contrôle lumière/cadrage, Sourires quasi simultanés (< 200 ms) : manche nulle, Horodatage local, horloges synchronisées à la révélation (+5 more)

### Community 5 - "Plateforme, vie privée, exclusions"
Cohesion: 0.20
Nodes (12): Exclusions v1 et conditions de retour, Âge minimum 18 ans, Arrêt sur image comme preuve, sans enregistrement, Clip partageable du fou rire (v2), Exclusions de la v1 et conditions de réintégration, H5 : valeur ajoutée vs simple appel vidéo, MediaPipe Face Landmarker (détection locale du sourire), Mode inconnus (type Chatroulette), exclu v1 (+4 more)

### Community 6 - "Structure de la note D1"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

## Knowledge Gaps
- **30 isolated node(s):** `1. Ce qu'on construit`, `2. Pour qui`, `3. Périmètre de la v1`, `4. Ce qu'on ne construit pas`, `5. Hypothèses critiques` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 30 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D8 — Journal des décisions` connect `Structure du journal D8` to `Critères de test et marquage`?**
  _High betweenness centrality (0.255) - this node is a cross-community bridge._
- **Why does `D1 — Note de cadrage` connect `Structure de la note D1` to `Pilotage documentaire et index`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **What connects `1. Ce qu'on construit`, `2. Pour qui`, `3. Périmètre de la v1` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Structure du journal D8` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._