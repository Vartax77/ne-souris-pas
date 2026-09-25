# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 4 files · ~18,102 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 266 nodes · 377 edges · 17 communities (13 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Critères des prototypes
- Protocole du prototype 0
- Vérité terrain et preuve
- Pilotage documentaire et index
- Structure de D2
- Seuil, calibrage et score
- Simultanéité et fautes
- Réglages et décisions P0
- Journal des décisions (source)
- Note de cadrage D1
- Maintien et réglage de k
- Cadence et performance
- Visage perdu et limites
- Contre-jour
- Éclairage latéral
- Gestes parasites
- Documents écartés

## God Nodes (most connected - your core abstractions)
1. `Projet Ne souris pas — instructions de conception` - 12 edges
2. `1.4 Mesures et grille de résultats` - 10 edges
3. `Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)` - 10 edges
4. `1.3 Protocole pas à pas` - 9 edges
5. `Prototype 0 : détection seule, sans réseau` - 9 edges
6. `Seuil propre au joueur d = min(k × (v − n), d_max), k = 0,4` - 9 edges
7. `D1 — Note de cadrage` - 8 edges
8. `4. Règles d'arbitrage` - 8 edges
9. `5. Limites de mesure et décisions associées` - 8 edges
10. `D2 — Règles du jeu et d'arbitrage` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Projet Ne souris pas — instructions de conception` --references--> `D5 Parcours utilisateur et maquettes`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m)` --implements--> `Marquage À confirmer (P0/P1/P2)`  [EXTRACTED]
  docs/D1-note-de-cadrage.md → CLAUDE.md

## Hyperedges (group relationships)
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0 [EXTRACTED 1.00]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]
- **Chaîne d'arbitrage R1 à R7** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_r2_detection_sourire, docs_d2_regles_jeu_arbitrage_r3_jauge, docs_d2_regles_jeu_arbitrage_r4_visage_perdu, docs_d2_regles_jeu_arbitrage_r5_simultaneite, docs_d2_regles_jeu_arbitrage_r6_departage, docs_d2_regles_jeu_arbitrage_r7_arret_sur_image [EXTRACTED 1.00]
- **Équité temporelle entre appareils** — docs_d2_regles_jeu_arbitrage_cadence_commune, docs_d2_regles_jeu_arbitrage_intervalle_image_i, docs_d2_regles_jeu_arbitrage_synchro_horloges, docs_d2_regles_jeu_arbitrage_erreur_horloge_e, docs_d2_regles_jeu_arbitrage_fenetre_w, docs_d2_regles_jeu_arbitrage_horodatage_retroactif [INFERRED 0.85]
- **Critères G1 à G6 conditionnant le Go** — docs_d3_plan_de_tests_g1, docs_d3_plan_de_tests_g2, docs_d3_plan_de_tests_g3, docs_d3_plan_de_tests_g4, docs_d3_plan_de_tests_g5, docs_d3_plan_de_tests_g6, docs_d3_plan_de_tests_decision_go [EXTRACTED 1.00]

## Communities (17 total, 4 thin omitted)

### Community 0 - "Critères des prototypes"
Cohesion: 0.07
Nodes (40): Marquage À confirmer (P0/P1/P2), P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : chauffe excessive, Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m) (+32 more)

### Community 1 - "Protocole du prototype 0"
Cohesion: 0.05
Nodes (37): 1.1 Objectif et risques testés, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur) (+29 more)

### Community 2 - "Vérité terrain et preuve"
Cohesion: 0.09
Nodes (29): Aucun enregistrement (aucun stockage persistant, mémoire vive permise), R7 — Arrêt sur image (image de preuve), Accord oral du testeur noté dans la fiche, Condition B1 — pénombre, Condition N — conditions normales mesurables, Détection litigieuse (compte comme faux positif), Étape 10 — vérification sur le groupe de validation, Étape 9 — rejeu maintien 400/600 ms, lissage 2/4 images (+21 more)

### Community 3 - "Pilotage documentaire et index"
Cohesion: 0.17
Nodes (17): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Déroulé du match (lot 4, à rédiger), D4 Architecture technique, D5 Parcours utilisateur et maquettes, D6 Découpage en lots de développement (+9 more)

### Community 4 - "Structure de D2"
Cohesion: 0.09
Nodes (22): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité (+14 more)

### Community 5 - "Seuil, calibrage et score"
Cohesion: 0.13
Nodes (22): Calibrage du neutre n (médiane de S, 3 s), Calibrage du sourire volontaire v (maximum de S, 2 s), Horodatage rétroactif (première image de la série), MediaPipe Face Landmarker (blendshapes, matrice, numFaces 2), R1 — Calibrage, R2 — Détection du sourire, Score brut s (moyenne mouthSmileLeft/Right), Score lissé S (moyenne mobile sur 3 images) (+14 more)

### Community 6 - "Simultanéité et fautes"
Cohesion: 0.18
Nodes (17): Erreur d'horloge e, Faute (sourire confirmé ou deuxième perte de visage), Fenêtre effective W = max(100 ms, 2 × e + i), Intervalle d'image i (67 ms à 15 img/s, 100 ms à 10 img/s), Jauge J = (S − n − m) / (d − m) bornée, Pic de jauge de la manche, Q6 (D2) — multiplicateur de e : 2 ou 1 ?, R3 — Zone de doute et jauge (+9 more)

### Community 7 - "Réglages et décisions P0"
Cohesion: 0.18
Nodes (15): Plafond du seuil d_max (0,35), Marge m (frontière neutre / doute, 0,05), Q1 (D2) — plafonner le seuil à d_max ?, Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2), Décision Abandon de l'arbitrage tel que défini (après 2 cycles), Décision Ajustement (faux positifs, dégradé, calibrage, performance, faux négatifs), Décision Go (coder le prototype 1), Options en cas d'abandon (contestable, sourire franc, appareils, arrêt) (+7 more)

### Community 8 - "Journal des décisions (source)"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 9 - "Note de cadrage D1"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

### Community 10 - "Maintien et réglage de k"
Cohesion: 0.25
Nodes (11): Option « arbitre sévère » à 400 ms — dette produit, Durée de maintien 500 ms (≥ 3 images, 1 image tolérée), Exposition cible 60 min de non-sourire en N, G6 — exposition N cumulée ≥ 60 min, Groupe de réglage (2/3 des testeurs), Intervalle de k (milieu entre max k_min et min k_max), Pic soutenu P (maintenu ≥ 500 ms), n° 76 : méthode de réglage : pic soutenu, intervalle de k, groupes, 60 min (+3 more)

### Community 11 - "Cadence et performance"
Cohesion: 0.36
Nodes (11): Cadence d'analyse commune (15 max, 10 min), Q5 (D2) — appareil sous 10 images/s, Charge vidéo simulée (appel WebRTC en boucle locale), Chauffe excessive (fenêtre 10 s sous 10 img/s, ralentissement, brûlant), G3 — ≥ 10 img/s sans chauffe, appareil ancien, avec et sans charge, Session performance (par appareil, 25 min), n° 37 : P0 performance : ≥ 10 img/s sans chauffe en 5 min, n° 75 : définition de la chauffe excessive (+3 more)

### Community 12 - "Visage perdu et limites"
Cohesion: 0.29
Nodes (11): Deux visages dans le champ = image invalide, Hand Landmarker — dette technique, Image valide / invalide (un seul visage, largeur, angles), Main devant la bouche — limite acceptée en v1, Perte continue > 5 s = faute, R4 — Visage perdu (1,5 s, 2 pertes), A7 — Mouvements (2 min), n° 65 : perte continue > 5 s = faute (+3 more)

## Knowledge Gaps
- **103 isolated node(s):** `1.1 Objectif et risques testés`, `1.2.1 Testeurs`, `1.2.2 Conditions`, `1.2.3 Appareils`, `1.2.4 Volume et durée` (+98 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 111 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)` connect `Réglages et décisions P0` to `Critères des prototypes`, `Vérité terrain et preuve`, `Pilotage documentaire et index`, `Simultanéité et fautes`, `Maintien et réglage de k`, `Cadence et performance`?**
  _High betweenness centrality (0.309) - this node is a cross-community bridge._
- **Why does `Prototype 0 : détection seule, sans réseau` connect `Critères des prototypes` to `Vérité terrain et preuve`, `Pilotage documentaire et index`, `Seuil, calibrage et score`, `Réglages et décisions P0`?**
  _High betweenness centrality (0.249) - this node is a cross-community bridge._
- **Why does `D3 — Plan de tests et critères de décision` connect `Protocole du prototype 0` to `Pilotage documentaire et index`?**
  _High betweenness centrality (0.234) - this node is a cross-community bridge._
- **What connects `1.1 Objectif et risques testés`, `1.2.1 Testeurs`, `1.2.2 Conditions` to the rest of the system?**
  _103 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Critères des prototypes` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._
- **Should `Protocole du prototype 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `Vérité terrain et preuve` be split into smaller, more focused modules?**
  _Cohesion score 0.09113300492610837 - nodes in this community are weakly interconnected._