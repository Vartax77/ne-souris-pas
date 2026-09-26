# Graph Report - ne-souris-pas  (2026-09-26)

## Corpus Check
- 27 files · ~78,781 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 1389 nodes · 4086 edges · 76 communities
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 185 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6b455b55`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- D4 — Architecture technique
- §4.2 Canal de jeu
- Parcours de l'invité
- R5 — Horodatage et simultanéité
- E1 Accueil
- Source de cadrage lots 1-2-3
- D2-regles-jeu-arbitrage.md
- 14. Sources
- T2 : Accueil → Autorisation (Case cochée + Créer un duel ou Rejoindre le duel)
- D7-juridique-confidentialite.md
- 3. Tableau des réglages
- README.md
- 6. Déroulé du match
- 6.7 Réglages du déroulé
- 3. Écrans
- 10. Sources
- D5-parcours-maquettes.md
- D1 — Note de cadrage
- 1.5.3 Ordre des réglages
- Projet Ne souris pas — instructions de conception
- 3.5 Questionnaire aux testeurs
- D6-lots-developpement.md
- 1. Prototype 0 — détection seule, sans réseau
- main.js
- D6 §2 Vue d'ensemble
- L0.4 — Sourire et jauge
- 4. Écrans d'erreur
- calibrage.test.mjs
- Rapport de session — lots 4 à 9
- mesures.test.mjs
- R2 — Détection du sourire
- 13. Questions ouvertes
- 1. Données traitées
- Rapport §1 Lot 4 — D2 complet
- Rapport §2 Lot 5 — D4 Architecture technique
- 8.1 Avant l'ouverture au public
- D1 §5.2 Risques
- D1 §6 À quoi saura-t-on que la v1 a réussi
- pertes.test.mjs
- 3. Données qui circulent
- n° 69 : « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, n…
- arbitrage.test.mjs
- 2.6 Critères de décision (P1)
- E9 Fin de match
- 7.1 Ce que disent les sources
- §16.2 Questions ouvertes de D2 à D7
- D3-plan-de-tests.md
- n° 183 : Seuil plafonné à d_max = 0,35. À confirmer (P0)
- E5 Calibrage
- n° 31 : Réintégration du mode inconnus seulement après validation du jeu entre…
- n° 13 : Détection du sourire par MediaPipe Face Landmarker, sur l'appareil de…
- 6.3 Tableau des transitions
- detection.js
- V1 — Revanche spontanée dans ≥ 5 matchs sur 10
- Risque : Éclairage et angles
- n° 94 : Cadence commune : les deux appareils s'alignent sur la cadence la plus…
- n° 200 : Journaux du serveur auto-hébergé conservés 7 jours. Confirme n° 125.
- RAPPORT-SESSION.md
- 8. Mise en relation et relais : choix des services
- 7.4 Performances cibles
- n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…
- 7.2 Navigateurs cibles
- D1 §3 Périmètre de la v1
- 6.3 Divergence
- n° 17 : Apparition à chaque manche : écran noir, compte à rebours 3-2-1, révél…
- 2. Schéma des composants
- D6 §4 Si un test échoue
- E6 Écran noir et compte à rebours
- D6 — Découpage en lots de développement
- 8.4 Recommandation
- n° 199 : Après les prototypes : un serveur en France administré par Valentin (P…
- 9. Questions ouvertes
- n° 26 : Aucun enregistrement vidéo ni audio, nulle part.
- 3.6 Exclusions de la v1
- 5. Limites de mesure et décisions associées
- 12. Risques techniques

## God Nodes (most connected - your core abstractions)
1. `D4 — Architecture technique` - 164 edges
2. `Source de cadrage lots 1-2-3` - 74 edges
3. `D1 — Note de cadrage` - 46 edges
4. `3. Tableau des réglages` - 45 edges
5. `14. Sources` - 45 edges
6. `6.3 Tableau des transitions` - 37 edges
7. `§16.2 Questions ouvertes de D2 à D7` - 35 edges
8. `Rapport §6.3 Incohérences` - 26 edges
9. `R5 — Horodatage et simultanéité` - 26 edges
10. `R2 — Détection du sourire` - 26 edges

## Surprising Connections (you probably didn't know these)
- `4. Politique de confidentialité` --references--> `Source de cadrage lots 1-2-3`  [INFERRED]
  docs/D7-juridique-confidentialite.md → sources/cadrage-lots-1-2-3.md
- `rejouer()` --calls--> `creerSuiviPertes()`  [EXTRACTED]
  tests/pertes.test.mjs → app/js/pertes.js
- `Projet Ne souris pas — instructions de conception` --references--> `Décisions de cadrage lots 1-2-3 (source de vérité)`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Projet Ne souris pas — instructions de conception` --references--> `D4 — Architecture technique`  [EXTRACTED]
  CLAUDE.md → docs/D4-architecture-technique.md
- `D4 — Architecture technique` --references--> `Source de cadrage lots 1-2-3`  [EXTRACTED]
  docs/D4-architecture-technique.md → sources/cadrage-lots-1-2-3.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Boucle d'une manche (écran noir → arrêt sur image)** — docs_d2_regles_jeu_arbitrage_etat_ecran_noir, docs_d2_regles_jeu_arbitrage_etat_compte_a_rebours, docs_d2_regles_jeu_arbitrage_etat_manche, docs_d2_regles_jeu_arbitrage_etat_decision, docs_d2_regles_jeu_arbitrage_etat_arret_sur_image, docs_d2_regles_jeu_arbitrage_t13, docs_d2_regles_jeu_arbitrage_t15, docs_d2_regles_jeu_arbitrage_t17, docs_d2_regles_jeu_arbitrage_t19, docs_d2_regles_jeu_arbitrage_t22 [EXTRACTED 1.00]
- **Chaîne de calcul de la fenêtre de simultanéité W** — docs_d2_regles_jeu_arbitrage_terme_aller_retour_minimal_a_min, docs_d2_regles_jeu_arbitrage_terme_erreur_d_horloge_e, docs_d2_regles_jeu_arbitrage_terme_intervalle_d_image_i, docs_d2_regles_jeu_arbitrage_terme_fenetre_effective_w, docs_d2_regles_jeu_arbitrage_reglage_fenetre_de_simultaneite_minimale, docs_d2_regles_jeu_arbitrage_reglage_allers_retours_de_synchronisation, docs_d2_regles_jeu_arbitrage_r5, docs_d2_regles_jeu_arbitrage_s5_6_synchronisation_des_horloges [EXTRACTED 1.00]
- **Calcul du seuil propre au joueur et de la jauge** — docs_d2_regles_jeu_arbitrage_terme_neutre_n, docs_d2_regles_jeu_arbitrage_terme_sourire_volontaire_v, docs_d2_regles_jeu_arbitrage_terme_seuil_d, docs_d2_regles_jeu_arbitrage_reglage_coefficient_k, docs_d2_regles_jeu_arbitrage_reglage_seuil_maximal_d_max, docs_d2_regles_jeu_arbitrage_terme_jauge_j, docs_d2_regles_jeu_arbitrage_r1 [EXTRACTED 1.00]
- **Réglage du coefficient k à partir des pics soutenus** — docs_d3_plan_de_tests_s1_5_1, docs_d3_plan_de_tests_1_5_2_intervalle_de_k, docs_d3_plan_de_tests_etape_2, docs_d3_plan_de_tests_a1, docs_d3_plan_de_tests_a6, docs_d3_plan_de_tests_g1, docs_d3_plan_de_tests_g5 [EXTRACTED 1.00]
- **Validation de la borne d'horloge par flash commun** — docs_d3_plan_de_tests_s2_3_3, docs_d3_plan_de_tests_r2, docs_d3_plan_de_tests_r3, docs_d3_plan_de_tests_r6, docs_d3_plan_de_tests_c3, docs_d3_plan_de_tests_decision_p1_revoir_e, docs_d3_plan_de_tests_jp1_flashs [EXTRACTED 1.00]
- **Décision de réussite de la v1 et garde-fous** — docs_d3_plan_de_tests_v1, docs_d3_plan_de_tests_e1, docs_d3_plan_de_tests_crit_a1, docs_d3_plan_de_tests_crit_a2, docs_d3_plan_de_tests_crit_a3, docs_d3_plan_de_tests_t1, docs_d3_plan_de_tests_decision_p2_v1_reussie [EXTRACTED 1.00]
- **Décision symétrique et vérifiable** — docs_d4_architecture_technique_msg_faute, docs_d4_architecture_technique_msg_statut, docs_d4_architecture_technique_msg_pic_final, docs_d4_architecture_technique_msg_decision, docs_d4_architecture_technique_6_3_divergence [EXTRACTED 1.00]
- **Pile auto-hébergée en France après prototypes** — docs_d4_architecture_technique_opt_peerjs_auto_heberge, docs_d4_architecture_technique_opt_coturn, docs_d4_architecture_technique_opt_ovhcloud_vps_1 [EXTRACTED 1.00]
- **Synchronisation d'horloge et fenêtre W** — docs_d4_architecture_technique_msg_sync_ping, docs_d4_architecture_technique_msg_sync_pong, docs_d4_architecture_technique_msg_sync_resultat, docs_d4_architecture_technique_a_min, docs_d4_architecture_technique_erreur_e, docs_d4_architecture_technique_fenetre_w, docs_d4_architecture_technique_decalage_theta [EXTRACTED 1.00]
- **Liens juridiques de l'accueil vers les textes D7** — docs_d5_parcours_maquettes_e1, docs_d5_parcours_maquettes_lien_conditions_d_utilisation, docs_d5_parcours_maquettes_lien_mentions_legales, docs_d5_parcours_maquettes_lien_confidentialite, docs_d7_juridique_confidentialite_texte_conditions_d_utilisation, docs_d7_juridique_confidentialite_texte_mentions_legales, docs_d7_juridique_confidentialite_texte_politique_de_confidentialite [EXTRACTED 1.00]
- **Écrans d'erreur menant à « Créer un nouveau duel »** — docs_d5_parcours_maquettes_er5, docs_d5_parcours_maquettes_er10, docs_d5_parcours_maquettes_er11, docs_d5_parcours_maquettes_er13, docs_d5_parcours_maquettes_er14, docs_d5_parcours_maquettes_er15, docs_d5_parcours_maquettes_creer_un_nouveau_duel [EXTRACTED 1.00]
- **Chaîne P0 : socle, détection, calibrage, sourire, pertes, outils, rejeu** — docs_d6_lots_developpement_l0_1, docs_d6_lots_developpement_l0_2_détection, docs_d6_lots_developpement_l0_3, docs_d6_lots_developpement_l0_4, docs_d6_lots_developpement_l0_5, docs_d6_lots_developpement_l0_6, docs_d6_lots_developpement_l0_7 [EXTRACTED 1.00]
- **Traitements de l'adresse IP par l'éditeur** — docs_d4_architecture_technique_donnee_adresse_ip, docs_d7_juridique_confidentialite_registre_t1, docs_d7_juridique_confidentialite_registre_t2, docs_d7_juridique_confidentialite_2_1_qui_est_responsable_de_quoi, docs_d7_juridique_confidentialite_2_3_base_légale_conservation_information, docs_d7_juridique_confidentialite_v9 [INFERRED 0.85]
- **Réintroduction des provocations si ennui ou absence de revanche** — docs_d1_note_de_cadrage_critere_revanche_p2, docs_d1_note_de_cadrage_garde_fou_p2_ennui, docs_d1_note_de_cadrage_exclusion_provocations, docs_d6_lots_developpement_echec_v1, docs_d6_lots_developpement_echec_e1, docs_d1_note_de_cadrage_risque_ennui [INFERRED 0.85]
- **Reprise des documents après P0 (valeurs À confirmer propagées)** — docs_d6_lots_developpement_reprise_etape_1, docs_d6_lots_developpement_reprise_etape_2, docs_d6_lots_developpement_reprise_etape_3, docs_rapport_session_incoherence_22 [INFERRED 0.85]

## Communities (76 total, 0 thin omitted)

### Community 0 - "D4 — Architecture technique"
Cohesion: 0.11
Nodes (35): Périmètre v1 : Budget, Décision P1 : Changer de mise en relation, D4 — Architecture technique, D4 Q8 — Hébergement du prototype : GitHub Pages, Bouton « Créer un duel », Bouton « Rejoindre le duel », Services utilisés (prototypes et ouverture), n° 119 : Prototypes P1 et P2 : mise en relation par le serveur public PeerJS, r… (+27 more)

### Community 1 - "§4.2 Canal de jeu"
Cohesion: 0.15
Nodes (16): §4.2 Canal de jeu, 5.2 Cadence d'analyse, 5. Horloges et cadence, Extension — Arbitrage vérifiable par le serveur, Message abandon, Message bonjour, Message calibrage, Message faute (+8 more)

### Community 2 - "Parcours de l'invité"
Cohesion: 0.12
Nodes (24): État Attente, État Autorisation, État Connexion, État Erreur connexion, État Erreur salon, État Salon expiré, Délai de connexion 20 s, Durée de vie d'un salon sans invité 15 min (+16 more)

### Community 3 - "R5 — Horodatage et simultanéité"
Cohesion: 0.18
Nodes (31): Q6 tranchée : e = a_min / 2, W = max(100 ms, e + i), R5 — Horodatage et simultanéité, Allers-retours de synchronisation 5 par révélation, Fenêtre de simultanéité minimale 100 ms, Multiplicateur de l'erreur d'horloge 1, 5.6 Synchronisation des horloges, Aller-retour minimal a_min, Erreur d'horloge e (+23 more)

### Community 4 - "E1 Accueil"
Cohesion: 0.08
Nodes (35): Bloc « Votre caméra et votre micro », Case « J'ai 18 ans ou plus », E1 Accueil, Lien « Conditions d'utilisation », Lien « Confidentialité », Lien « Mentions légales », 2.10 Enregistrement par l'adversaire, 2.7 Âge minimum (+27 more)

### Community 5 - "Source de cadrage lots 1-2-3"
Cohesion: 0.11
Nodes (27): Question 11 : Garder ou partager l'image ?, Question 16 : joué pareil en simple appel vidéo ?, Risque P2 : rien de plus qu'un appel vidéo, 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.3 Mode de jeu, 3. Lot 2 — Périmètre de la v1 (+19 more)

### Community 6 - "D2-regles-jeu-arbitrage.md"
Cohesion: 0.11
Nodes (32): Durée de maintien 500 ms, Fenêtre de lissage 3 images, 5.9 Arbitre sévère, n° 19 : Sourire détecté : mesure au-dessus du neutre de référence + seuil, mai…, n° 20 : Zone de doute (entre neutre et sourire) : aucune pénalité, la jauge du…, n° 21 : Visage perdu plus de 1,5 s : avertissement. Deuxième fois dans la manc…, n° 25 : Preuve : arrêt sur image sur les deux écrans au moment de la détection…, n° 56 : Score de sourire = moyenne de mouthSmileLeft et mouthSmileRight (Media… (+24 more)

### Community 7 - "14. Sources"
Cohesion: 0.12
Nodes (25): 14. Sources, 8.1 Mise en relation, Choix — Délégué GPU d'abord, CPU en secours, Cloudflare Workers + Durable Objects, Firebase Realtime Database, PeerJS, serveur auto-hébergé (peer 1.0.2), Supabase Realtime, S10 Can I use RTCPeerConnection (+17 more)

### Community 8 - "T2 : Accueil → Autorisation (Case cochée + Créer un duel ou Rejoindre le duel)"
Cohesion: 0.33
Nodes (7): État Accueil, T1 : Ouverture → Accueil (Ouverture (hôte ou lien invité)), T2 : Accueil → Autorisation (Case cochée + Créer un duel ou Rejoindre le duel), Incohérence 11 : match annulé et revanche, Incohérence 12 : écrans sans état D2, Incohérence 9 : libellé Continuer vs Créer un duel, Priorité 4 : incohérences 9 à 13 (libellés et écrans)

### Community 9 - "D7-juridique-confidentialite.md"
Cohesion: 0.18
Nodes (24): n° 148 : L'éditeur se considère responsable des traitements d'adresses IP (mise…, n° 149 : Vocabulaire imposé : « détection du sourire », jamais « détection des…, n° 150 : Bases légales : exécution du service pour la mise en relation et le re…, n° 151 : Identité de l'éditeur publiée dans les mentions légales et la politiqu…, n° 152 : Aucun cookie, traceur ni stockage dans le navigateur, donc aucun bande…, n° 153 : Registre simplifié tenu (mise en relation et relais, hébergement, test…, n° 154 : Pas d'analyse d'impact en v1 entre amis ; analyse d'impact préalable a…, n° 155 : Conditions d'utilisation : 18 ans minimum déclarés ; neuf comportement… (+16 more)

### Community 10 - "3. Tableau des réglages"
Cohesion: 0.16
Nodes (29): 3. Tableau des réglages, R1 — Calibrage, R4 — Visage perdu, Amplitude minimale v − n 0,15, Coefficient k 0,4, Délai de visage perdu 1,5 s, Durée de la phase neutre 3 s, Durée de la phase sourire 2 s (+21 more)

### Community 11 - "README.md"
Cohesion: 0.12
Nodes (20): État Navigateur incompatible, T32 : Ouverture → Navigateur incompatible (Ouverture), 5. Vérification de cohérence, ER8 Navigateur incompatible, n° 105 : Jauges : cachées hors manche ; figées en décision et sur image invalid…, n° 113 : Messages de jeu sur un canal de données WebRTC unique, fiable et ordon…, n° 169 : Boutons de l'accueil : « Créer un duel » (hôte), « Rejoindre le duel »…, n° 174 : Écran ER8 gardé, message « Ce navigateur ne permet pas de jouer. Utili… (+12 more)

### Community 12 - "6. Déroulé du match"
Cohesion: 0.15
Nodes (21): 6. Déroulé du match, Q10 tranchée : forfait arbitré par le serveur de mise en relation, Q12 tranchée : son ouvert pendant l'écran noir, Q13 tranchée : repère du pic sur les jauges, Q14 tranchée : décisions divergentes, manche rejouée, Q7 tranchée : salon verrouillé à deux, expire à la fin de la session, 6.1 Vocabulaire, 6.4.1 Détection (+13 more)

### Community 13 - "6.7 Réglages du déroulé"
Cohesion: 0.14
Nodes (18): État Interrompu, Q11 tranchée : durées du déroulé validées comme valeurs de départ, Q9 tranchée : manche interrompue rejouée, avec garde-fou, Absence de jauge avant grisé 1 s, Compte à rebours 3 s, Délai de reconnexion 30 s, Durée de l'arrêt sur image 5 s, Durée minimale de l'écran noir 2 s (+10 more)

### Community 14 - "3. Écrans"
Cohesion: 0.17
Nodes (12): 3.11 E11 — Règles, 3.1 E1 — Accueil : explication et âge, 3.3 E3 — Attente (hôte), 3.5 E5 — Calibrage, 3.6 E6 — Écran noir, compte à rebours, révélation, 3.7 E7 — Duel, 3.8 E8 — Arrêt sur image, 3.9 E9 — Fin de match et revanche (+4 more)

### Community 15 - "10. Sources"
Cohesion: 0.10
Nodes (31): Donnée — Adresse IP, 10. Sources, 2.1 Qui est responsable de quoi, 2.3 Base légale, conservation, information, 2.4 Caméra, micro et stockage dans le navigateur, 2.6 Mentions légales, 2.9 Transferts hors de l'Union européenne, 2. Analyse (+23 more)

### Community 16 - "D5-parcours-maquettes.md"
Cohesion: 0.10
Nodes (38): D4 Q10 — Nom de domaine reporté (n° 46) , 2.1 Parcours de l'hôte, 2.2 Parcours de l'invité, 2.3 Nombre de gestes, 2. Parcours, 6. Questions ouvertes, Bouton « Commencer », D5 — Parcours utilisateur et maquettes d'écrans (+30 more)

### Community 17 - "D1 — Note de cadrage"
Cohesion: 0.07
Nodes (32): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5.1 Hypothèses critiques, 5.2 Risques, 5. Hypothèses et risques, 6.1 Critère de réussite (+24 more)

### Community 18 - "1.5.3 Ordre des réglages"
Cohesion: 0.22
Nodes (11): 1.5.1 Pic soutenu, 1.5.2 Intervalle de `k`, 1.5.3 Ordre des réglages, 1.5 Méthode de réglage du seuil, Décision P0 : Ajustement — faux positifs en N, Étape de réglage 2 : Coefficient k, Étape de réglage 4 : Marge m, Étape de réglage 7 : Lacet, tangage, largeur minimale (+3 more)

### Community 19 - "Projet Ne souris pas — instructions de conception"
Cohesion: 0.33
Nodes (6): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Marquage À confirmer (P0/P1/P2), Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Décisions de cadrage lots 1-2-3 (source de vérité)

### Community 20 - "3.5 Questionnaire aux testeurs"
Cohesion: 0.10
Nodes (22): Détection confirmée, Détection faux positif, Détection litigieuse, Journal P0 : état de l'arbitrage (S, J, etat, faute, op), Question 1 : Vous êtes-vous amusé ?, Question 10 : Aide pour faire rire l'autre ?, Question 13 : Rejouer avec un autre ami ?, Question 14 : Jouer avec un inconnu ? (+14 more)

### Community 21 - "D6-lots-developpement.md"
Cohesion: 0.21
Nodes (21): n° 134 : Développement découpé en 18 lots : 7 pour P0, 5 pour P1, 6 pour P2 ; c…, n° 135 : Un lot est « terminé » quand son critère est vérifié sur un appareil r…, n° 136 : Pour chaque test en échec : lots modifiés, abandonnés ou suspendus. Pr…, n° 137 : L'outil de rejeu (L0.7) utilise le même code d'arbitrage qu'en jeu, ja…, n° 139 : Pages légales (D7) en ligne avant le premier test P2. Avance la Priori…, n° 141 : Erreur réelle des horloges mesurée par un flash commun filmé par les d…, n° 142 : Sept scénarios de coupure (K1 à K7), dont coupure simultanée des deux…, n° 143 : P2 : les 10 matchs comptés sont les premiers matchs de 10 sessions dis… (+13 more)

### Community 22 - "1. Prototype 0 — détection seule, sans réseau"
Cohesion: 0.05
Nodes (42): 1.1 Objectif et risques testés, 1.2.1 Testeurs, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur), 1.3.3 Accueil (3 min) (+34 more)

### Community 23 - "main.js"
Cohesion: 0.17
Nodes (22): creerCompteurPauses(), app_js_capture, app_js_capture_demarrercamera, afficher(), afficherManche(), arreterManche(), BS_CANDIDATS, capturerImage() (+14 more)

### Community 24 - "D6 §2 Vue d'ensemble"
Cohesion: 0.17
Nodes (28): H4 : Les joueurs acceptent d'être filmés et analysés, Risque : Vie privée des flux vidéo, 3. Prototype 2 — duel complet, Journal P2 : engagement (revanche, t_lien_duel), Journal P2 : identification (session, match, manche, app_hote, app_invite), Journal P2 : issue de la manche (duree, cause, perdant, ecart_fautes, pics), Journal P2 : technique (e, w, cadence, divergence, preuve, coupures), Question 12 : Gêne d'être filmé et analysé (+20 more)

### Community 25 - "L0.4 — Sourire et jauge"
Cohesion: 0.10
Nodes (41): H1 : La détection est assez fiable pour être acceptée, Risque : Arbitrage injuste (faux positifs), Risque : Faux positifs dus à la parole, à la barbe, à une bouche relevée, 1.4.2 Fiche testeur, 1.6.2 Décisions et effet sur D2, Séquence A0 — Calibrage, Séquence A1 — Neutre silencieux, Séquence A2 — Parole libre (+33 more)

### Community 26 - "4. Écrans d'erreur"
Cohesion: 0.23
Nodes (15): État Erreur caméra, T27 : Interrompu → Fin de match (30 s dépassées), T3 : Autorisation → Erreur caméra (Accès refusé), 4. Écrans d'erreur, Bouton « Créer un nouveau duel », ER1 Caméra refusée, ER10 Connexion perdue, aucun vainqueur, ER11 Salon expiré sans invité (+7 more)

### Community 27 - "calibrage.test.mjs"
Cohesion: 0.20
Nodes (13): ecartType(), evaluerCalibrage(), lisser(), mediane(), MESSAGES, moyenne(), part(), unVisage() (+5 more)

### Community 28 - "Rapport de session — lots 4 à 9"
Cohesion: 0.11
Nodes (18): 1. Lot 4 — D2 complet, 2. Lot 5 — D4 Architecture technique, 3. Lot 6 — D5 Parcours et maquettes, 4. Lot 7 — D6, puis D3 prototypes 1 et 2, 5. Lot 8 — D7 Juridique et confidentialité, 6.1 Méthode et limite, 6.2 Résultats par contrôle, 6.3 Incohérences (+10 more)

### Community 29 - "mesures.test.mjs"
Cohesion: 0.24
Nodes (12): CADENCE_MAX, creerFenetre(), creerLimiteur(), mesurer(), angles(), largeur(), luminance(), rectangle() (+4 more)

### Community 30 - "R2 — Détection du sourire"
Cohesion: 0.12
Nodes (32): 2. Définitions, R2 — Détection du sourire, R3 — Zone de doute et jauge, R6 — Départage à 60 s, Durée de la manche 60 s, Écart de pics pour égalité 0,05, Images minimales par sourire 3 images, Images tolérées dans une série 1 image (+24 more)

### Community 31 - "13. Questions ouvertes"
Cohesion: 0.54
Nodes (8): 13. Questions ouvertes, Cible — PWA installée, D4 Q6 — Pas d'installation PWA sur iOS, S16 WebKit bogue 185448, S17 WebKit bogue 252465, S18 STRICH iOS PWA caméra, iOS, PWA installée, n° 202 : Pas d'installation de la PWA proposée sur iOS. Confirme n° 123 ; tranc…

### Community 32 - "1. Données traitées"
Cohesion: 0.17
Nodes (12): 1. Données traitées, 2.2 Pas de biométrie, pas de reconnaissance d'émotion, Donnée : Code du salon et descriptions de connexion, Donnée : Image de preuve, Donnée : Image et son de la caméra, Donnée : Jauge, événements de jeu et informations techniques, Donnée : Mesures du visage, Donnée : Volume relayé (+4 more)

### Community 33 - "Rapport §1 Lot 4 — D2 complet"
Cohesion: 0.27
Nodes (15): Risque P1 : coupure mal gérée, n° 100 : Coupure en pleine manche : une faute déjà annoncée reste acquise ; sin…, n° 101 : Forfait après 30 s contre le joueur que le serveur de mise en relation…, n° 102 : Page masquée ou appareil en veille : perte de visage (R4), sans except…, n° 103 : Abandon volontaire : bouton avec confirmation ; la manche continue pen…, n° 104 : Revanche : acceptée par les deux dans les 60 s ; nouveau match à 0–0,…, n° 106 : Durées : écran noir 2 s au moins ; compte à rebours 3 s ; arrêt sur im…, n° 108 : Si les deux appareils calculent des décisions différentes, la manche e… (+7 more)

### Community 34 - "Rapport §2 Lot 5 — D4 Architecture technique"
Cohesion: 0.20
Nodes (16): L1.1 — Salon, n° 111 : Aucun tiers dans la page : ni mesure d'audience, ni police, ni script…, n° 112 : Un seul flux caméra et micro par appareil, partagé entre la détection…, n° 116 : Source de vérité : chaque appareil pour les fautes de son joueur ; déc…, n° 117 : Image de preuve : JPEG de 480 pixels de large, qualité 0,7, envoyée en…, n° 118 : Mise en page : vidéos empilées en portrait (adversaire en haut), côte…, n° 121 : Relais par défaut de PeerJS (identifiants publics) et STUN de Google r…, n° 122 : Code de salon d'au moins 16 caractères aléatoires, tirés par le généra… (+8 more)

### Community 35 - "8.1 Avant l'ouverture au public"
Cohesion: 0.10
Nodes (22): 2.5 Registre et analyse d'impact, 2.8 Règlement sur les services numériques (DSA), 8.1 Avant l'ouverture au public, 8.2 Avant le mode inconnus, 8. Points à faire vérifier par un professionnel, I1 Analyse d'impact (AIPD), I2 Fin de l'exemption domestique entre inconnus, I3 Qualification DSA du mode inconnus (+14 more)

### Community 36 - "D1 §5.2 Risques"
Cohesion: 0.17
Nodes (15): Exclu v1 : Clip partageable du fou rire, Exclu v1 : Comptes, classements, historique, Exclu v1 : Détection sonore du rire, Exclu v1 : Différenciation face aux filtres et acquisition de joueurs, Exclu v1 : Jeu avec des inconnus, Exclu v1 : Mode soirée sur grand écran, Exclu v1 : Monétisation, Risque : Acquisition : il faut convaincre deux personnes (+7 more)

### Community 37 - "D1 §6 À quoi saura-t-on que la v1 a réussi"
Cohesion: 0.14
Nodes (23): D1 §6.3 Définitions provisoires, D1 §6 À quoi saura-t-on que la v1 a réussi, 6.5.2 Revanche, Décision P0 : Ajustement — performance, Risque P1 : connexion impossible sur certains réseaux, Risque P2 : le jeu ne donne pas envie de rejouer, 1.3.8 Session performance, RT1 — La détection GPU échoue ; repli CPU (+15 more)

### Community 38 - "pertes.test.mjs"
Cohesion: 0.15
Nodes (10): creerSuiviPertes(), evaluer(), evenement(), creerPreuve(), ref_node_assert, ref_node_fs, ref_node_test, rejouer() (+2 more)

### Community 39 - "3. Données qui circulent"
Cohesion: 0.17
Nodes (12): 3. Données qui circulent, §4.1 Signalisation, 4.1 Signalisation (appareil ↔ serveur de mise en relation), 4.2 Canal de jeu (appareil ↔ appareil), 4. Messages, WebRTC (pistes + canal de données), Donnée — Code du salon, Donnée — Fichiers PWA, modèle, WebAssembly (+4 more)

### Community 40 - "n° 69 : « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, n…"
Cohesion: 0.18
Nodes (14): 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité, 4.6 R6 — Départage à 60 s, 4.7 R7 — Arrêt sur image, 4. Règles d'arbitrage (+6 more)

### Community 41 - "arbitrage.test.mjs"
Cohesion: 0.26
Nodes (11): creerLissage(), creerPicSoutenu(), creerSuiviSourire(), etatImage(), imageValide(), jauge(), traiterManche(), manche() (+3 more)

### Community 42 - "2.6 Critères de décision (P1)"
Cohesion: 0.05
Nodes (75): Définition : 100 % des connexions, Définition : chauffe excessive, Définition : conditions normales, Garde-fou P0 : aucun faux positif, Garde-fou P0 : performance ≥ 10 images/s, Garde-fou P1 : 100 % des connexions, H6 : Chaque joueur a un appareil récent avec caméra correcte, Risque : Chauffe et batterie sur iOS (+67 more)

### Community 43 - "E9 Fin de match"
Cohesion: 0.27
Nodes (11): État Fin de match, État Fin de session, Délai de revanche 60 s, T24 : En jeu → Fin de match (A abandonne (6.5)), T28 : Fin de match → Fin de match (A accepte la revanche), T30 : Fin de match → Fin de session (A quitte), T31 : Fin de match → Fin de session (60 s sans accord des deux), E9 Fin de match (+3 more)

### Community 44 - "7.1 Ce que disent les sources"
Cohesion: 0.15
Nodes (17): 7.1 Ce que disent les sources, S1 MediaPipe setup web, S13 PeerJS dépôt, S19 Forums Apple Developer, S2 npm tasks-vision, S3 Modèle Face Landmarker, S4 Face landmark guide, S5 Face landmark guide Web (+9 more)

### Community 45 - "§16.2 Questions ouvertes de D2 à D7"
Cohesion: 0.19
Nodes (21): Journal P0 : scores bruts (smileG/D, cheekG/D, lum), Journal P0 : géométrie du visage (faces, largeur, lacet, tangage), Journal P0 : identification (t, seq), 1.4.1 Journal numérique P0, 3.2 Panel et organisation (P2), D6 §1 Conventions, D6 §6 Questions ouvertes (D6), Protection BitLocker de l'ordinateur de l'éditeur (+13 more)

### Community 46 - "D3-plan-de-tests.md"
Cohesion: 0.16
Nodes (26): Risque P2 : arbitrage contesté en jeu, 4. Questions ouvertes (D3), n° 164 : D1 porte un tableau des risques de la source §2.3, chacun relié à un t…, n° 193 : R5 (Wi-Fi restrictif) testé seulement si un tel réseau est disponible…, n° 194 : Critère C3 : au moins 19 flashs sur 20 avec un écart couvert par e + i…, n° 196 : Seuils des garde-fous P2 : au plus 10 % de manches nulles (A2) ; trich…, n° 36 : P0 — arbitrage : 5 à 10 visages (barbe, lunettes, pénombre, parole). C…, n° 37 : P0 — performance, sur l'appareil le plus ancien disponible. Critère :… (+18 more)

### Community 47 - "n° 183 : Seuil plafonné à d_max = 0,35. À confirmer (P0)"
Cohesion: 0.43
Nodes (7): Q1 tranchée : plafond d_max = 0,35, Seuil maximal d_max 0,35, 5.2 Exagérer le sourire volontaire, Étape de réglage 3 : Seuil maximal d_max, Risque P0 : seuil gonflé en exagérant le sourire volontaire, 1.3.6 Exagération, n° 183 : Seuil plafonné à d_max = 0,35. À confirmer (P0)

### Community 48 - "E5 Calibrage"
Cohesion: 0.48
Nodes (7): État Calibrage, T10 : Calibrage → Calibrage (A réussit son calibrage), T11 : Calibrage → Calibrage (A échoue (R1)), T29 : Fin de match → Calibrage (Les deux acceptent la revanche), T8 : Connexion → Calibrage (Canal établi), E5 Calibrage, ER3 Lumière insuffisante

### Community 49 - "n° 31 : Réintégration du mode inconnus seulement après validation du jeu entre…"
Cohesion: 0.42
Nodes (9): 11. Points d'extension pour le mode inconnus, 6.4 Limite acceptée en v1, Extension — Bannissement, Extension — Coûts, Extension — Mise en relation aléatoire, Extension — Modération, Extension — Signalement, RT14 — Client modifié qui ne déclare jamais ses fautes (+1 more)

### Community 50 - "n° 13 : Détection du sourire par MediaPipe Face Landmarker, sur l'appareil de…"
Cohesion: 0.25
Nodes (9): 1. Principes, 6.2 Pourquoi pas un arbitre central, Principe 1 — L'analyse reste sur l'appareil, Principe 2 — La vidéo va de pair à pair, Principe 4 — Rien n'est stocké, 3.2 Plateforme, n° 11 : PWA web, tout navigateur récent avec caméra frontale ou webcam., n° 12 : Vidéo et audio en WebRTC pair à pair. (+1 more)

### Community 51 - "6.3 Tableau des transitions"
Cohesion: 0.23
Nodes (20): État Arrêt sur image, État Compte à rebours, État Décision, État En jeu, État Erreur version, État Manche, 6.2 Machine à états, 6.3 Tableau des transitions (+12 more)

### Community 52 - "detection.js"
Cohesion: 0.53
Nodes (5): creer(), lancerAnalyse(), modeParDefaut(), preparerMoteur(), replierSurCPU()

### Community 53 - "V1 — Revanche spontanée dans ≥ 5 matchs sur 10"
Cohesion: 0.11
Nodes (30): Critère de réussite P2 : revanche spontanée, Exclu v1 : Provocations de l'application, Garde-fou P2 : ennui, H2 : Voir l'autre lutter suffit à faire rire, H3 : Une partie courte donne envie de rejouer, Risque : Ennui : sans provocation, il ne se passe rien, D1 §6.1 Critère de réussite, 5.4 Main devant la bouche (+22 more)

### Community 54 - "Risque : Éclairage et angles"
Cohesion: 0.48
Nodes (7): Risque : Éclairage et angles, 1.2.2 Conditions, Condition B1 — pénombre, Condition B2 — contre-jour, Condition B3 — éclairage latéral, Condition N — conditions normales, Étape de réglage 6 : Luminance minimale

### Community 55 - "n° 94 : Cadence commune : les deux appareils s'alignent sur la cadence la plus…"
Cohesion: 0.33
Nodes (7): Q2-Q4 valeurs simulées tranchées : voir D8, Cadence d'analyse maximale 15 images/s, Cadence d'analyse minimale 10 images/s, n° 115 : Cadence négociée à la connexion (message bonjour), puis refixée par l'…, n° 86 : Cadence d'analyse : 15 images/s, plafonnée et identique sur les deux a…, n° 94 : Cadence commune : les deux appareils s'alignent sur la cadence la plus…, n° 96 : D3 aligné sur les valeurs simulées : pic soutenu sur 500 ms ; rejeu de…

### Community 56 - "n° 200 : Journaux du serveur auto-hébergé conservés 7 jours. Confirme n° 125."
Cohesion: 0.29
Nodes (8): 9.2 À partir de quel volume ça coûte, 9.3 Journaux des prestataires, 9. Coûts, volumes et journaux, Cloudflare Realtime TURN, D4 Q4 — Journaux conservés 7 jours, S33 Cloudflare Realtime tarifs, S34 Cloudflare TURN identifiants, n° 200 : Journaux du serveur auto-hébergé conservés 7 jours. Confirme n° 125.

### Community 57 - "RAPPORT-SESSION.md"
Cohesion: 0.23
Nodes (13): Reprise 1 : D2 §3, valeurs mesurées, Reprise 2 : D4 §5 et §7, Reprise 3 : critères « Terminé quand » de D6, D6 §5 Reprise des documents après le prototype 0, n° 181 : Après la décision « Go » de P0, reprendre dans l'ordre : D2 §3, puis D…, n° 45 : Ordre de production : D1 et D8 ; D2 arbitrage ; D3 prototype 0 ; code…, D3 Q1 (rapport), Incohérence 22 : ordre de production (+5 more)

### Community 58 - "8. Mise en relation et relais : choix des services"
Cohesion: 0.14
Nodes (14): 7.3 Choix qui en découlent, 7. Compatibilité et performances cibles, 8. Mise en relation et relais : choix des services, Choix — Un seul flux caméra et micro partagé, Choix — Fichiers MediaPipe servis par l'hébergement de la PWA, version figée, Choix — Modèle et WebAssembly chargés dès l'accueil, Capture caméra + micro, Principe 5 — Aucun tiers dans la page (+6 more)

### Community 59 - "7.4 Performances cibles"
Cohesion: 0.24
Nodes (10): 7.4 Performances cibles, Performance — Cadence d'analyse : 10 à 15 images/s, Performance — Chauffe : critère G3, Performance — Établissement de la connexion ≤ 20 s, Performance — Image de preuve reçue ≤ 2 s, Performance — Modèle prêt ≤ 15 s en 4G, Performance — Premier chargement ≤ 3 s en 4G, Performance — Retard vidéo ≤ 300 ms (+2 more)

### Community 60 - "n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…"
Cohesion: 0.43
Nodes (7): 9.1 Volumes, Choix — H.264 si un appareil iOS est dans le duel, Performance — Vidéo envoyée 640 × 480, ≤ 1,7 Mbit/s, D4 Q9 — H.264 quand un iPhone joue , S22 libwebrtc webrtc_video_engine, S43 webrtcHacks statistiques 2016, n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…

### Community 61 - "7.2 Navigateurs cibles"
Cohesion: 0.31
Nodes (9): 7.2 Navigateurs cibles, Cible — Chrome Android, Cible — Chrome, Edge ordinateur, Cible — Chrome ou Firefox pour iOS, Cible — Firefox ordinateur, Cible — Safari iOS/iPadOS 15+, Cible — Safari macOS 15+, D4 Q7 — Firefox et navigateurs iOS non-Safari : cibles selon P0 et P1 (+1 more)

### Community 62 - "D1 §3 Périmètre de la v1"
Cohesion: 0.33
Nodes (6): Périmètre v1 : Arbitrage, Périmètre v1 : Déroulé, Périmètre v1 : Jeu, Périmètre v1 : Technique, Périmètre v1 : Vie privée, D1 §3 Périmètre de la v1

### Community 63 - "6.3 Divergence"
Cohesion: 0.40
Nodes (6): 6.1 Répartition, 6.3 Divergence, 6. Source de vérité de l'arbitrage, Arbitrage (R1 à R7, horloge), Message decision, RT7 — Décisions différentes sur les deux appareils

### Community 64 - "n° 17 : Apparition à chaque manche : écran noir, compte à rebours 3-2-1, révél…"
Cohesion: 0.22
Nodes (10): §10.1 Principes de mise en page, 10.1 Principes, 10.2 Téléphone, portrait, 10.3 Ordinateur ou tablette, paysage, 10. Mise en page, D4 Q5 — Vidéos empilées en portrait, RT13 — Écran en veille pendant attente ou calibrage, D5 Q5 — Vidéos empilées en portrait (D4 Q5) (+2 more)

### Community 65 - "2. Schéma des composants"
Cohesion: 0.25
Nodes (8): 2. Schéma des composants, Choix — Détecteur créé une seule fois par session, Détection MediaPipe Face Landmarker, Hébergement statique, Interface PWA, Serveur de mise en relation, Principe 3 — Le serveur ne voit que la mise en relation, RT11 — Fuite de mémoire au fil des revanches

### Community 66 - "D6 §4 Si un test échoue"
Cohesion: 0.12
Nodes (22): Risque : Triche : main devant la bouche, tête tournée, Séquence A7 — Mouvements, 1.3 Protocole pas à pas (P0), 1.3.1 Ce que le prototype 0 doit offrir, 1.3.2 Préparation, 1.3.3 Accueil, 1.3.5 Conditions dégradées (protocole), 1.3.7 Fin de session (+14 more)

### Community 67 - "E6 Écran noir et compte à rebours"
Cohesion: 0.33
Nodes (13): État Écran noir, Q5 tranchée : appareil sous 10 images/s, Nouvelle mesure de cadence 5 s, 5.8 Cadence d'analyse commune, T12 : Calibrage → Écran noir (Deux calibrages réussis), T13 : Écran noir → Compte à rebours (Synchronisation (5 allers-retours)), T14 : Écran noir → Écran noir (Cadence de A sous 10 images/s), T22 : Arrêt sur image → Écran noir (5 s écoulées) (+5 more)

### Community 68 - "D6 — Découpage en lots de développement"
Cohesion: 0.25
Nodes (8): 1. Conventions, 2. Vue d'ensemble, 3.1 Prototype 0 — détection seule, 3.2 Prototype 1 — appel vidéo seul, 3. Détail des lots, 4. Si un test échoue, 5. Questions ouvertes, D6 — Découpage en lots de développement

### Community 69 - "8.4 Recommandation"
Cohesion: 0.14
Nodes (18): 8.2 Relais TURN, 8.4 Recommandation, coturn auto-hébergé, ExpressTURN, Metered Open Relay, PeerJS, serveur public, Twilio TURN, D4 Q2 — Prototypes sur serveur public PeerJS et Metered (+10 more)

### Community 70 - "n° 199 : Après les prototypes : un serveur en France administré par Valentin (P…"
Cohesion: 0.22
Nodes (9): 8.3 Serveur auto-hébergé en Europe, Hetzner CX23, OVHcloud VPS-1, Scaleway DEV1-S, D4 Q3 — Après prototypes : serveur en France, S40 OVHcloud VPS, S41 Hetzner Cloud, S42 Scaleway instances (+1 more)

### Community 71 - "9. Questions ouvertes"
Cohesion: 0.29
Nodes (7): 7. Mise en ligne, 9. Questions ouvertes, D7 Q2 — Champs [À COMPLÉTER] laissés tels quels, remplis par Valentin avant la mise en ligne, D7 Q3 — Lien « Conditions d'utilisation » sous la case d'âge ; « Mentions légales » sur l'accueil, D7 Q4 — Identité de l'éditeur publiée, V1 Identité de l'éditeur ou anonymat LCEN, n° 214 : Les champs [À COMPLÉTER] de D7 restent tels quels ; Valentin les rempl…

### Community 72 - "n° 26 : Aucun enregistrement vidéo ni audio, nulle part."
Cohesion: 0.33
Nodes (6): 4. Politique de confidentialité, I6 Signalement, bannissement, preuves, coopération Pharos, 3.5 Vidéo et vie privée, n° 26 : Aucun enregistrement vidéo ni audio, nulle part., n° 27 : Flux chiffrés de bout en bout par WebRTC ; le relais transmet sans pou…, n° 30 : Courte page de confidentialité : analyse locale, rien de stocké.

### Community 73 - "3.6 Exclusions de la v1"
Cohesion: 0.40
Nodes (5): Question 7 : Rire sans sourire ?, I7 Comptes et historique, 3.6 Exclusions de la v1, n° 33 : Comptes, classements, historique : avec le mode inconnus., n° 34 : Détection sonore du rire : v2, si les testeurs rient sans sourire visi…

### Community 77 - "5. Limites de mesure et décisions associées"
Cohesion: 0.12
Nodes (21): 1. Périmètre, 5.1 Seuil propre à chaque joueur — décidé (n° 64), 5.2 Exagérer le sourire volontaire — nouveau risque, 5.3 Perte prolongée — décidé (n° 65), 5.4 Main devant la bouche — limite acceptée en v1 (n° 70), 5.5 Parole et départage — variante testée en P0 (n° 72), 5.6 Synchronisation des horloges — décidé (n° 66), 5.7 Deux visages dans le champ — décidé (n° 67) (+13 more)

### Community 82 - "12. Risques techniques"
Cohesion: 0.29
Nodes (8): 12. Risques techniques, Relais STUN / TURN, Message battement, RT10 — Image de preuve trop grosse ou perdue, RT3 — Connexion directe impossible (NAT symétrique, 4G, entreprise), RT4 — Quota gratuit du relais épuisé, RT5 — Service de mise en relation indisponible, RT9 — Page masquée : minuteries ralenties, caméra coupée

## Ambiguous Edges - Review These
- `D6 Q1 (rapport)` → `L0.1 — Socle`  [AMBIGUOUS]
  docs/RAPPORT-SESSION.md · relation: conceptually_related_to

## Knowledge Gaps
- **149 isolated node(s):** `force`, `toile`, `ctx`, `BS_CANDIDATS`, `Décisions de cadrage lots 1-2-3 (source de vérité)` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 166 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `D6 Q1 (rapport)` and `L0.1 — Socle`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `D4 — Architecture technique` connect `D4 — Architecture technique` to `§4.2 Canal de jeu`, `Parcours de l'invité`, `R5 — Horodatage et simultanéité`, `Source de cadrage lots 1-2-3`, `D2-regles-jeu-arbitrage.md`, `14. Sources`, `D7-juridique-confidentialite.md`, `README.md`, `6. Déroulé du match`, `10. Sources`, `D5-parcours-maquettes.md`, `D1 — Note de cadrage`, `Projet Ne souris pas — instructions de conception`, `D6-lots-developpement.md`, `1. Prototype 0 — détection seule, sans réseau`, `D6 §2 Vue d'ensemble`, `13. Questions ouvertes`, `1. Données traitées`, `Rapport §1 Lot 4 — D2 complet`, `Rapport §2 Lot 5 — D4 Architecture technique`, `8.1 Avant l'ouverture au public`, `D1 §6 À quoi saura-t-on que la v1 a réussi`, `3. Données qui circulent`, `n° 69 : « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, n…`, `2.6 Critères de décision (P1)`, `§16.2 Questions ouvertes de D2 à D7`, `D3-plan-de-tests.md`, `n° 31 : Réintégration du mode inconnus seulement après validation du jeu entre…`, `n° 13 : Détection du sourire par MediaPipe Face Landmarker, sur l'appareil de…`, `6.3 Tableau des transitions`, `V1 — Revanche spontanée dans ≥ 5 matchs sur 10`, `n° 94 : Cadence commune : les deux appareils s'alignent sur la cadence la plus…`, `n° 200 : Journaux du serveur auto-hébergé conservés 7 jours. Confirme n° 125.`, `RAPPORT-SESSION.md`, `8. Mise en relation et relais : choix des services`, `7.4 Performances cibles`, `n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…`, `7.2 Navigateurs cibles`, `D1 §3 Périmètre de la v1`, `6.3 Divergence`, `n° 17 : Apparition à chaque manche : écran noir, compte à rebours 3-2-1, révél…`, `2. Schéma des composants`, `D6 §4 Si un test échoue`, `E6 Écran noir et compte à rebours`, `8.4 Recommandation`, `n° 199 : Après les prototypes : un serveur en France administré par Valentin (P…`, `n° 26 : Aucun enregistrement vidéo ni audio, nulle part.`, `5. Limites de mesure et décisions associées`, `12. Risques techniques`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **Why does `14. Sources` connect `14. Sources` to `D4 — Architecture technique`, `8.4 Recommandation`, `n° 199 : Après les prototypes : un serveur en France administré par Valentin (P…`, `7.1 Ce que disent les sources`, `n° 200 : Journaux du serveur auto-hébergé conservés 7 jours. Confirme n° 125.`, `8. Mise en relation et relais : choix des services`, `n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…`, `13. Questions ouvertes`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `Source de cadrage lots 1-2-3` connect `Source de cadrage lots 1-2-3` to `D4 — Architecture technique`, `R5 — Horodatage et simultanéité`, `E1 Accueil`, `D2-regles-jeu-arbitrage.md`, `D7-juridique-confidentialite.md`, `README.md`, `6. Déroulé du match`, `D5-parcours-maquettes.md`, `D1 — Note de cadrage`, `3.5 Questionnaire aux testeurs`, `D6-lots-developpement.md`, `D6 §2 Vue d'ensemble`, `R2 — Détection du sourire`, `Rapport §1 Lot 4 — D2 complet`, `Rapport §2 Lot 5 — D4 Architecture technique`, `D1 §5.2 Risques`, `D1 §6 À quoi saura-t-on que la v1 a réussi`, `2.6 Critères de décision (P1)`, `D3-plan-de-tests.md`, `n° 31 : Réintégration du mode inconnus seulement après validation du jeu entre…`, `n° 13 : Détection du sourire par MediaPipe Face Landmarker, sur l'appareil de…`, `RAPPORT-SESSION.md`, `n° 17 : Apparition à chaque manche : écran noir, compte à rebours 3-2-1, révél…`, `n° 26 : Aucun enregistrement vidéo ni audio, nulle part.`, `3.6 Exclusions de la v1`, `5. Limites de mesure et décisions associées`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `force`, `toile`, `ctx` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `D4 — Architecture technique` be split into smaller, more focused modules?**
  _Cohesion score 0.11092436974789915 - nodes in this community are weakly interconnected._
- **Should `Parcours de l'invité` be split into smaller, more focused modules?**
  _Cohesion score 0.11956521739130435 - nodes in this community are weakly interconnected._