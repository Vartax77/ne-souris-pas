# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 3 files · ~11,607 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 170 nodes · 257 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.85)
- Token cost: 84,051 input · 0 output

## Community Hubs (Navigation)
- Arbitrage D2 : fautes et limites
- Structure du document D2
- Critères de test et marquage
- Pilotage documentaire et index
- Structure du journal D8
- Règles d'arbitrage de la source
- Structure de la note D1
- Périmètre v1 et exclusions
- Jauge, pic et départage
- Tests, priorités et échecs
- Vie privée et image de preuve
- Score de sourire MediaPipe
- Âge, comptes, mode inconnus
- Décision documents écartés
- Documents écartés

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `D3 Plan de tests et critères de décision` - 10 edges
3. `D4 Architecture technique` - 10 edges
4. `3. Lot 2 — Périmètre de la v1` - 8 edges
5. `D1 — Note de cadrage` - 8 edges
6. `4. Règles d'arbitrage` - 8 edges
7. `D2 — Règles du jeu et d'arbitrage` - 8 edges
8. `5. Limites de mesure et décisions associées` - 8 edges
9. `D7 Juridique et confidentialité` - 8 edges
10. `Règles d'arbitrage` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Tableau des réglages d'arbitrage` --conceptually_related_to--> `D3 Plan de tests et critères de décision`  [INFERRED]
  docs/D2-regles-jeu-arbitrage.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m)` --implements--> `Marquage À confirmer (P0/P1/P2)`  [EXTRACTED]
  docs/D1-note-de-cadrage.md → CLAUDE.md

## Hyperedges (group relationships)
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0 [EXTRACTED 1.00]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]
- **Règles d'arbitrage R1 à R7** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_r2_detection_sourire, docs_d2_regles_jeu_arbitrage_r3_zone_doute_jauge, docs_d2_regles_jeu_arbitrage_r4_visage_perdu, docs_d2_regles_jeu_arbitrage_r5_simultaneite, docs_d2_regles_jeu_arbitrage_r6_departage, docs_d2_regles_jeu_arbitrage_r7_arret_sur_image [EXTRACTED 1.00]
- **Chaîne calibrage → seuil individuel → jauge → départage** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_seuil_propre_joueur, docs_d2_regles_jeu_arbitrage_d_max, docs_d2_regles_jeu_arbitrage_jauge, docs_d2_regles_jeu_arbitrage_r6_departage [INFERRED 0.85]
- **Confidentialité : analyse locale, pair à pair, rien de stocké** — docs_d8_journal_decisions_pwa_webrtc, docs_d8_journal_decisions_jugement_local, docs_d2_regles_jeu_arbitrage_aucun_enregistrement, docs_d8_journal_decisions_aucun_compte [INFERRED 0.75]

## Communities (15 total, 2 thin omitted)

### Community 0 - "Arbitrage D2 : fautes et limites"
Cohesion: 0.13
Nodes (25): Seuil maximal d_max = 0,35, Faute (sourire confirmé ou deuxième perte), Fenêtre effective W = max(200 ms, 2 × e), Hand Landmarker (dette technique), Image valide / invalide, Main devant la bouche — limite acceptée v1, Q1 — Plafonner le seuil à d_max ?, R1 — Calibrage (neutre 3 s + sourire 2 s) (+17 more)

### Community 1 - "Structure du document D2"
Cohesion: 0.09
Nodes (22): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité (+14 more)

### Community 2 - "Critères de test et marquage"
Cohesion: 0.14
Nodes (18): Marquage À confirmer (P0/P1/P2), Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : chauffe excessive, Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m) (+10 more)

### Community 3 - "Pilotage documentaire et index"
Cohesion: 0.29
Nodes (13): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, D3 Plan de tests et critères de décision, D4 Architecture technique, D5 Parcours utilisateur et maquettes, D6 Découpage en lots de développement, D7 Juridique et confidentialité (+5 more)

### Community 4 - "Structure du journal D8"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 5 - "Règles d'arbitrage de la source"
Cohesion: 0.18
Nodes (12): Arrêt sur image comme preuve, sans enregistrement, Calibrage 3 s visage neutre + contrôle lumière/cadrage, Sourires quasi simultanés (< 200 ms) : manche nulle, Horodatage local, horloges synchronisées à la révélation, Deux jauges visibles par les deux joueurs, Mécanique d'apparition : écran noir, 3-2-1, révélation simultanée, MediaPipe Face Landmarker (détection locale du sourire), PWA web multi-appareil (+4 more)

### Community 6 - "Structure de la note D1"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

### Community 7 - "Périmètre v1 et exclusions"
Cohesion: 0.27
Nodes (11): Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Exclusions v1 et conditions de retour, Âge minimum 18 ans, Aucune provocation ajoutée par l'application, Clip partageable du fou rire (v2), Exclusions de la v1 et conditions de réintégration, H5 : valeur ajoutée vs simple appel vidéo, Hypothèses critiques H1-H6 (+3 more)

### Community 8 - "Jauge, pic et départage"
Cohesion: 0.27
Nodes (10): Jauge J et pic de jauge, R3 — Zone de doute et jauge, R6 — Départage à 60 s par pic de jauge, n° 1 — Un appareil par joueur, jeu à distance, Exclusions v1 : clip partageable, comptes, détection sonore, n° 10 — Manche de 60 s, 2 manches gagnantes, n° 49 : jauge comparée = pic atteint, pas le cumul, n° 59 : jauge normalisée, figée sur image invalide (+2 more)

### Community 9 - "Tests, priorités et échecs"
Cohesion: 0.22
Nodes (10): Tableau des réglages d'arbitrage, n° 3 — Aucune provocation de l'application, Convention Priorité 1/2/3 vs prototypes P0/P1/P2, n° 50 — Critère de réussite : revanche spontanée, n° 50 : critère de réussite v1 = revanche spontanée, n° 51 : définitions provisoires des critères P0/P1, n° 52 : performance en échec → réduire fréquence ou résolution, n° 54 : revanche en échec → réintroduire des provocations (+2 more)

### Community 10 - "Vie privée et image de preuve"
Cohesion: 0.29
Nodes (8): Aucun enregistrement (aucun stockage persistant), R7 — Arrêt sur image (image de preuve), n° 7 — Budget relais 0 € puis 10 € par mois, n° 53 : connexion en échec → changer de service de relais, n° 63 : arrêt sur image prise par l'appareil du joueur, n° 69 : aucun enregistrement = aucun stockage persistant, n° 11-12 — PWA web et WebRTC pair à pair, n° 14 — Serveur de mise en relation et relais TURN

### Community 11 - "Score de sourire MediaPipe"
Cohesion: 0.33
Nodes (7): MediaPipe Face Landmarker, Score brut s (moyenne mouthSmileLeft/Right), Variante du score cheekSquint, n° 13 — Chaque appareil juge son joueur, n° 56 : score = moyenne mouthSmile, lissée 200 ms, n° 72 : variante cheekSquint testée en P0, n° 8 — Parole autorisée pendant les manches

### Community 12 - "Âge, comptes, mode inconnus"
Cohesion: 0.67
Nodes (3): n° 5 — Âge minimum 18 ans, n° 28 — Aucun compte, salon à code aléatoire, Mode inconnus (vision à terme, exclu v1)

## Knowledge Gaps
- **63 isolated node(s):** `Documents de conception — « Ne souris pas »`, `1. Conventions`, `2. Lot 1 — Remise en question de l'idée`, `3.1 Public, budget, format`, `3.2 Plateforme` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 63 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `D2 — Règles du jeu et d'arbitrage` connect `Structure du document D2` to `Pilotage documentaire et index`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **Why does `D8 — Journal des décisions` connect `Structure du journal D8` to `Arbitrage D2 : fautes et limites`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `D1 — Note de cadrage` connect `Structure de la note D1` to `Pilotage documentaire et index`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `Documents de conception — « Ne souris pas »`, `1. Conventions`, `2. Lot 1 — Remise en question de l'idée` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Arbitrage D2 : fautes et limites` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._
- **Should `Structure du document D2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Critères de test et marquage` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._