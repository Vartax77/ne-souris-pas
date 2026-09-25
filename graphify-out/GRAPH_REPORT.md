# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 3 files · ~16,357 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 215 nodes · 317 edges · 14 communities (13 shown, 1 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Seuil, calibrage et score
- Protocole du prototype 0
- Structure du document D2
- Vérité terrain et validation P0
- Pilotage documentaire et index
- Critères de test et marquage
- Performance et abandon P0
- Structure du journal D8
- Exclusions, hypothèses et réussite
- Règles d'arbitrage de la source
- Structure de la note D1
- Arbitrage D2 : fautes et limites
- Grilles de résultats P0
- Documents écartés

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `1.4 Mesures et grille de résultats` - 10 edges
3. `D4 Architecture technique` - 10 edges
4. `1.3 Protocole pas à pas` - 9 edges
5. `Décision Go → coder le prototype 1` - 9 edges
6. `4. Règles d'arbitrage` - 8 edges
7. `5. Limites de mesure et décisions associées` - 8 edges
8. `D2 — Règles du jeu et d'arbitrage` - 8 edges
9. `3. Lot 2 — Périmètre de la v1` - 8 edges
10. `D1 — Note de cadrage` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Fenêtre effective W = max(200 ms, 2 × e)` --references--> `D4 Architecture technique`  [EXTRACTED]
  docs/D2-regles-jeu-arbitrage.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Panel : 8 testeurs visés (minimum 5), profils à couvrir` --implements--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  docs/D3-plan-de-tests.md → sources/cadrage-lots-1-2-3.md
- `Décision Go → coder le prototype 1` --references--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  docs/D3-plan-de-tests.md → sources/cadrage-lots-1-2-3.md
- `n° 36 : P0 arbitrage, aucun faux positif en conditions normales` --conceptually_related_to--> `Risque d'arbitrage injuste (faux positifs)`  [INFERRED]
  docs/D8-journal-decisions.md → sources/cadrage-lots-1-2-3.md

## Hyperedges (group relationships)
- **Règles d'arbitrage R1 à R7** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_r2_detection_sourire, docs_d2_regles_jeu_arbitrage_r3_zone_doute_jauge, docs_d2_regles_jeu_arbitrage_r4_visage_perdu, docs_d2_regles_jeu_arbitrage_r5_simultaneite, docs_d2_regles_jeu_arbitrage_r6_departage, docs_d2_regles_jeu_arbitrage_r7_arret_sur_image [EXTRACTED 1.00]
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0 [EXTRACTED 1.00]
- **Chaîne calibrage → seuil individuel → jauge → départage** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_seuil_propre_joueur, docs_d2_regles_jeu_arbitrage_d_max, docs_d2_regles_jeu_arbitrage_jauge, docs_d2_regles_jeu_arbitrage_r6_departage [INFERRED 0.85]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]
- **Critères de décision du prototype 0 (G1 à G6)** — docs_d3_plan_de_tests_critere_g1, docs_d3_plan_de_tests_critere_g2, docs_d3_plan_de_tests_critere_g3, docs_d3_plan_de_tests_critere_g4, docs_d3_plan_de_tests_critere_g5, docs_d3_plan_de_tests_critere_g6, docs_d3_plan_de_tests_decision_go [EXTRACTED 1.00]
- **Méthode de réglage du seuil (pic soutenu, intervalle de k, groupes, validation)** — docs_d3_plan_de_tests_pic_soutenu, docs_d3_plan_de_tests_intervalle_k, docs_d3_plan_de_tests_groupe_reglage, docs_d3_plan_de_tests_groupe_validation, docs_d3_plan_de_tests_verification_etape_10, docs_d3_plan_de_tests_ordre_reglages [EXTRACTED 1.00]
- **Arbitrages de Valentin sur D3 (n° 78 à 82)** — docs_d8_journal_decisions_n78, docs_d8_journal_decisions_n79, docs_d8_journal_decisions_n80, docs_d8_journal_decisions_n81, docs_d8_journal_decisions_n82 [EXTRACTED 1.00]

## Communities (14 total, 1 thin omitted)

### Community 0 - "Seuil, calibrage et score"
Cohesion: 0.11
Nodes (28): Seuil maximal d_max = 0,35, MediaPipe Face Landmarker, Q1 — Plafonner le seuil à d_max ?, R1 — Calibrage (neutre 3 s + sourire 2 s), R2 — Détection du sourire (série ≥ 400 ms, ≥ 3 images), Score brut s (moyenne mouthSmileLeft/Right), Seuil propre au joueur d = min(k × (v − n), d_max), Tableau des réglages d'arbitrage (+20 more)

### Community 1 - "Protocole du prototype 0"
Cohesion: 0.07
Nodes (27): 1.1 Objectif et risques testés, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur) (+19 more)

### Community 2 - "Structure du document D2"
Cohesion: 0.09
Nodes (22): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité (+14 more)

### Community 3 - "Vérité terrain et validation P0"
Cohesion: 0.14
Nodes (21): Aucun enregistrement (aucun stockage persistant), R7 — Arrêt sur image (image de preuve), Accord oral du testeur, noté dans la fiche, Condition N mesurable (luminance ≥ 60/255, largeur ≥ 20 %, angles), G1 — Aucun faux positif ni litigieuse en N (groupe de validation), Détection litigieuse (comptée comme faux positif), Fiche testeur (code, groupe, profil, carnation), Groupe de réglage (2/3 des testeurs) (+13 more)

### Community 4 - "Pilotage documentaire et index"
Cohesion: 0.29
Nodes (13): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), D4 Architecture technique, D5 Parcours utilisateur et maquettes, D6 Découpage en lots de développement, D7 Juridique et confidentialité (+5 more)

### Community 5 - "Critères de test et marquage"
Cohesion: 0.18
Nodes (14): Marquage À confirmer (P0/P1/P2), P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m), Périmètre de la v1 (D1 §3), Prérequis et garde-fous (conditionnent le passage au prototype suivant), Budget relais : 0 € prototype puis 10 €/mois max (+6 more)

### Community 6 - "Performance et abandon P0"
Cohesion: 0.22
Nodes (14): P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Définition provisoire : chauffe excessive, Charge vidéo simulée (appel WebRTC en boucle locale), Chauffe excessive (fenêtre de 10 s < 10 images/s, ralentissement, brûlant), G3 — ≥ 10 images/s sans chauffe, sans et avec charge vidéo, Abandon de l'arbitrage tel que défini (après 2 cycles), Q1 — Appareils disponibles (le plus ancien, iPhone, ordinateur), Session performance (10 min sans charge, 10 min avec charge) (+6 more)

### Community 7 - "Structure du journal D8"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 8 - "Exclusions, hypothèses et réussite"
Cohesion: 0.24
Nodes (12): Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Exclusions v1 et conditions de retour, Options en cas d'abandon (contestable, sourire franc seul, appareils, arrêt) — non décidées, Âge minimum 18 ans, Aucune provocation ajoutée par l'application, Clip partageable du fou rire (v2), Exclusions de la v1 et conditions de réintégration, H5 : valeur ajoutée vs simple appel vidéo (+4 more)

### Community 9 - "Règles d'arbitrage de la source"
Cohesion: 0.18
Nodes (12): Arrêt sur image comme preuve, sans enregistrement, Calibrage 3 s visage neutre + contrôle lumière/cadrage, Sourires quasi simultanés (< 200 ms) : manche nulle, Horodatage local, horloges synchronisées à la révélation, Deux jauges visibles par les deux joueurs, Mécanique d'apparition : écran noir, 3-2-1, révélation simultanée, MediaPipe Face Landmarker (détection locale du sourire), PWA web multi-appareil (+4 more)

### Community 10 - "Structure de la note D1"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

### Community 11 - "Arbitrage D2 : fautes et limites"
Cohesion: 0.18
Nodes (11): Faute (sourire confirmé ou deuxième perte), Fenêtre effective W = max(200 ms, 2 × e), Hand Landmarker (dette technique), Image valide / invalide, Jauge J et pic de jauge, Main devant la bouche — limite acceptée v1, R3 — Zone de doute et jauge, R4 — Visage perdu (1,5 s, 2 pertes, 5 s continues) (+3 more)

### Community 12 - "Grilles de résultats P0"
Cohesion: 0.20
Nodes (10): 1.4.1 Journal numérique, 1.4.2 Fiche testeur, 1.4.3 Calibrage, 1.4.4 Séquences en conditions normales, 1.4.5 Sourires commandés (A6), 1.4.6 Mouvements (A7), 1.4.7 Conditions dégradées, 1.4.8 Performance (+2 more)

## Knowledge Gaps
- **91 isolated node(s):** `1. Périmètre`, `2. Définitions`, `3. Tableau des réglages`, `4.1 R1 — Calibrage`, `4.2 R2 — Détection du sourire` (+86 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 91 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D3 — Plan de tests et critères de décision` connect `Protocole du prototype 0` to `Pilotage documentaire et index`?**
  _High betweenness centrality (0.284) - this node is a cross-community bridge._
- **Why does `1. Prototype 0 — détection seule, sans réseau` connect `Protocole du prototype 0` to `Grilles de résultats P0`?**
  _High betweenness centrality (0.272) - this node is a cross-community bridge._
- **Why does `D2 — Règles du jeu et d'arbitrage` connect `Structure du document D2` to `Pilotage documentaire et index`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **What connects `1. Périmètre`, `2. Définitions`, `3. Tableau des réglages` to the rest of the system?**
  _91 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seuil, calibrage et score` be split into smaller, more focused modules?**
  _Cohesion score 0.10582010582010581 - nodes in this community are weakly interconnected._
- **Should `Protocole du prototype 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Structure du document D2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._