# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 12 files · ~52,249 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 394 nodes · 531 edges · 20 communities (16 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `08b3124e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Prototype 0 : détection seule, sans réseau
- 1.4 Mesures et grille de résultats
- n° 77 : critères de décision Go / Ajustement / Abandon
- D2-regles-jeu-arbitrage.md
- 4. Règles d'arbitrage
- Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)
- Cadence d'analyse commune (15 max, 10 min)
- 3.1 Prototype 0 — détection seule
- 3. Lot 2 — Périmètre de la v1
- D1 — Note de cadrage
- D4 — Architecture technique
- 2. Analyse
- R4 — Visage perdu (1,5 s, 2 pertes)
- Condition B2 — contre-jour
- Condition B3 — éclairage latéral
- A4 — Gestes parasites (60 s)
- Documents écartés (cahier des charges, AIPD, étude de marché...)
- 3. Écrans
- Seuil propre au joueur d = min(k × (v − n), d_max), k = 0,4
- Rapport de session — lots 4 à 9

## God Nodes (most connected - your core abstractions)
1. `D4 — Architecture technique` - 15 edges
2. `3. Écrans` - 12 edges
3. `Projet Ne souris pas — instructions de conception` - 12 edges
4. `2. Analyse` - 11 edges
5. `D7 — Documents juridiques et confidentialité` - 11 edges
6. `1.4 Mesures et grille de résultats` - 10 edges
7. `Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)` - 10 edges
8. `Rapport de session — lots 4 à 9` - 9 edges
9. `1.3 Protocole pas à pas` - 9 edges
10. `Prototype 0 : détection seule, sans réseau` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 0 : détection seule, sans réseau`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 1 : appel vidéo seul sur réseaux différents`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Marquage À confirmer (P0/P1/P2)` --conceptually_related_to--> `Prototype 2 : duel complet, 10 matchs avec des proches`  [INFERRED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m)` --implements--> `Marquage À confirmer (P0/P1/P2)`  [EXTRACTED]
  docs/D1-note-de-cadrage.md → CLAUDE.md
- `Prototype 0 : détection seule, sans réseau` --references--> `R1 — Calibrage`  [EXTRACTED]
  sources/cadrage-lots-1-2-3.md → docs/D2-regles-jeu-arbitrage.md

## Hyperedges (group relationships)
- **Chaîne d'arbitrage R1 à R7** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_r2_detection_sourire, docs_d2_regles_jeu_arbitrage_r3_jauge, docs_d2_regles_jeu_arbitrage_r4_visage_perdu, docs_d2_regles_jeu_arbitrage_r5_simultaneite, docs_d2_regles_jeu_arbitrage_r6_departage, docs_d2_regles_jeu_arbitrage_r7_arret_sur_image [EXTRACTED 1.00]
- **Critères G1 à G6 conditionnant le Go** — docs_d3_plan_de_tests_g1, docs_d3_plan_de_tests_g2, docs_d3_plan_de_tests_g3, docs_d3_plan_de_tests_g4, docs_d3_plan_de_tests_g5, docs_d3_plan_de_tests_g6, docs_d3_plan_de_tests_decision_go [EXTRACTED 1.00]
- **Plateforme technique v1 (PWA, WebRTC, détection locale, relais)** — sources_cadrage_lots_1_2_3_pwa, sources_cadrage_lots_1_2_3_webrtc_p2p, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_serveur_relais_turn [EXTRACTED 1.00]
- **Prototypes de validation des risques** — sources_cadrage_lots_1_2_3_prototype_0, sources_cadrage_lots_1_2_3_prototype_1, sources_cadrage_lots_1_2_3_prototype_2, docs_d3_plan_de_tests [EXTRACTED 1.00]
- **Hiérarchie des critères v1 : réussite vs prérequis** — docs_d1_note_de_cadrage_critere_revanche_spontanee, docs_d1_note_de_cadrage_prerequis_garde_fous, docs_d1_note_de_cadrage_critere_performance_p0, docs_d1_note_de_cadrage_critere_connexion_p1, docs_d1_note_de_cadrage_critere_faux_positif_p0 [EXTRACTED 1.00]
- **Équité temporelle entre appareils** — docs_d2_regles_jeu_arbitrage_cadence_commune, docs_d2_regles_jeu_arbitrage_intervalle_image_i, docs_d2_regles_jeu_arbitrage_synchro_horloges, docs_d2_regles_jeu_arbitrage_erreur_horloge_e, docs_d2_regles_jeu_arbitrage_fenetre_w, docs_d2_regles_jeu_arbitrage_horodatage_retroactif [INFERRED 0.85]
- **Chaîne d'arbitrage du sourire** — sources_cadrage_lots_1_2_3_calibrage_neutre, sources_cadrage_lots_1_2_3_mediapipe_face_landmarker, sources_cadrage_lots_1_2_3_seuil_sourire_400ms, sources_cadrage_lots_1_2_3_horodatage_synchro, sources_cadrage_lots_1_2_3_egalite_200ms, sources_cadrage_lots_1_2_3_arret_sur_image [INFERRED 0.85]

## Communities (20 total, 4 thin omitted)

### Community 0 - "Prototype 0 : détection seule, sans réseau"
Cohesion: 0.07
Nodes (40): Marquage À confirmer (P0/P1/P2), P1 connexion : 100 % des connexions aboutissent avec relais, P0 détection : aucun faux positif en conditions normales, P0 performance : ≥ 10 images/s sans chauffe excessive en 5 min, Critère de réussite v1 : revanche spontanée (≥ moitié des matchs P2), Définition provisoire : 100 % des connexions (10 essais par combinaison de réseaux), Définition provisoire : chauffe excessive, Définition provisoire : conditions normales (intérieur éclairé, face, < 1 m) (+32 more)

### Community 1 - "1.4 Mesures et grille de résultats"
Cohesion: 0.05
Nodes (37): 1.1 Objectif et risques testés, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur) (+29 more)

### Community 2 - "n° 77 : critères de décision Go / Ajustement / Abandon"
Cohesion: 0.10
Nodes (28): Aucun enregistrement (aucun stockage persistant, mémoire vive permise), R7 — Arrêt sur image (image de preuve), Accord oral du testeur noté dans la fiche, Condition B1 — pénombre, Condition N — conditions normales mesurables, Décision Abandon de l'arbitrage tel que défini (après 2 cycles), Détection litigieuse (compte comme faux positif), Fiche testeur (codes T01…, carnation effacée) (+20 more)

### Community 3 - "D2-regles-jeu-arbitrage.md"
Cohesion: 0.26
Nodes (13): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Déroulé du match (lot 4, à rédiger), Conventions du journal (une ligne par décision, jamais effacée), Convention : Priorité 1/2/3 en toutes lettres, P0/P1/P2 = prototypes, Documents de conception — « Ne souris pas » (+5 more)

### Community 4 - "4. Règles d'arbitrage"
Cohesion: 0.09
Nodes (22): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité (+14 more)

### Community 5 - "Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)"
Cohesion: 0.08
Nodes (35): Option « arbitre sévère » à 400 ms — dette produit, Horodatage rétroactif (première image de la série), Durée de maintien 500 ms (≥ 3 images, 1 image tolérée), Marge m (frontière neutre / doute, 0,05), MediaPipe Face Landmarker (blendshapes, matrice, numFaces 2), R2 — Détection du sourire, Score brut s (moyenne mouthSmileLeft/Right), Score lissé S (moyenne mobile sur 3 images) (+27 more)

### Community 6 - "Cadence d'analyse commune (15 max, 10 min)"
Cohesion: 0.17
Nodes (22): Cadence d'analyse commune (15 max, 10 min), Erreur d'horloge e, Faute (sourire confirmé ou deuxième perte de visage), Fenêtre effective W = max(100 ms, 2 × e + i), Intervalle d'image i (67 ms à 15 img/s, 100 ms à 10 img/s), Q5 (D2) — appareil sous 10 images/s, Q6 (D2) — multiplicateur de e : 2 ou 1 ?, R5 — Horodatage et simultanéité (+14 more)

### Community 7 - "3.1 Prototype 0 — détection seule"
Cohesion: 0.07
Nodes (27): 1. Conventions, 2. Vue d'ensemble, 3.1 Prototype 0 — détection seule, 3.2 Prototype 1 — appel vidéo seul, 3.3 Prototype 2 — duel complet, 3. Détail des lots, 4. Si un test échoue, 5. Questions ouvertes (+19 more)

### Community 8 - "3. Lot 2 — Périmètre de la v1"
Cohesion: 0.14
Nodes (14): 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1 (+6 more)

### Community 9 - "D1 — Note de cadrage"
Cohesion: 0.18
Nodes (11): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+3 more)

### Community 10 - "D4 — Architecture technique"
Cohesion: 0.05
Nodes (38): 10.1 Principes, 10.2 Téléphone, portrait, 10.3 Ordinateur ou tablette, paysage, 10. Mise en page, 11. Points d'extension pour le mode inconnus, 12. Risques techniques, 13. Questions ouvertes, 14. Sources (+30 more)

### Community 11 - "2. Analyse"
Cohesion: 0.09
Nodes (23): 10. Sources, 1. Données traitées, 2.10 Enregistrement par l'adversaire, 2.1 Qui est responsable de quoi, 2.2 Pas de biométrie, pas de reconnaissance d'émotion, 2.3 Base légale, conservation, information, 2.4 Caméra, micro et stockage dans le navigateur, 2.5 Registre et analyse d'impact (+15 more)

### Community 12 - "R4 — Visage perdu (1,5 s, 2 pertes)"
Cohesion: 0.29
Nodes (11): Deux visages dans le champ = image invalide, Hand Landmarker — dette technique, Image valide / invalide (un seul visage, largeur, angles), Main devant la bouche — limite acceptée en v1, Perte continue > 5 s = faute, R4 — Visage perdu (1,5 s, 2 pertes), A7 — Mouvements (2 min), n° 65 : perte continue > 5 s = faute (+3 more)

### Community 17 - "3. Écrans"
Cohesion: 0.10
Nodes (21): 1. Conventions, 2.1 Parcours de l'hôte, 2.2 Parcours de l'invité, 2.3 Nombre de gestes, 2. Parcours, 3.10 E10 — Interruption, 3.11 E11 — Règles, 3.1 E1 — Accueil : explication et âge (+13 more)

### Community 18 - "Seuil propre au joueur d = min(k × (v − n), d_max), k = 0,4"
Cohesion: 0.14
Nodes (20): Calibrage du neutre n (médiane de S, 3 s), Calibrage du sourire volontaire v (maximum de S, 2 s), Plafond du seuil d_max (0,35), Jauge J = (S − n − m) / (d − m) bornée, Pic de jauge de la manche, Q1 (D2) — plafonner le seuil à d_max ?, R1 — Calibrage, R3 — Zone de doute et jauge (+12 more)

### Community 19 - "Rapport de session — lots 4 à 9"
Cohesion: 0.11
Nodes (18): 1. Lot 4 — D2 complet, 2. Lot 5 — D4 Architecture technique, 3. Lot 6 — D5 Parcours et maquettes, 4. Lot 7 — D6, puis D3 prototypes 1 et 2, 5. Lot 8 — D7 Juridique et confidentialité, 6.1 Méthode et limite, 6.2 Résultats par contrôle, 6.3 Incohérences (+10 more)

## Knowledge Gaps
- **208 isolated node(s):** `1. Lot 4 — D2 complet`, `2. Lot 5 — D4 Architecture technique`, `3. Lot 6 — D5 Parcours et maquettes`, `4. Lot 7 — D6, puis D3 prototypes 1 et 2`, `5. Lot 8 — D7 Juridique et confidentialité` (+203 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 216 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)` connect `Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)` to `Prototype 0 : détection seule, sans réseau`, `n° 77 : critères de décision Go / Ajustement / Abandon`, `D2-regles-jeu-arbitrage.md`, `Cadence d'analyse commune (15 max, 10 min)`, `Seuil propre au joueur d = min(k × (v − n), d_max), k = 0,4`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **Why does `D4 — Architecture technique` connect `D4 — Architecture technique` to `D2-regles-jeu-arbitrage.md`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `Prototype 0 : détection seule, sans réseau` connect `Prototype 0 : détection seule, sans réseau` to `n° 77 : critères de décision Go / Ajustement / Abandon`, `Seuil propre au joueur d = min(k × (v − n), d_max), k = 0,4`, `D2-regles-jeu-arbitrage.md`, `Tableau des réglages (valeurs de départ, À confirmer P0/P1/P2)`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **What connects `1. Lot 4 — D2 complet`, `2. Lot 5 — D4 Architecture technique`, `3. Lot 6 — D5 Parcours et maquettes` to the rest of the system?**
  _208 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prototype 0 : détection seule, sans réseau` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._
- **Should `1.4 Mesures et grille de résultats` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `n° 77 : critères de décision Go / Ajustement / Abandon` be split into smaller, more focused modules?**
  _Cohesion score 0.09788359788359788 - nodes in this community are weakly interconnected._