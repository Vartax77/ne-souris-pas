# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 10 files · ~57,215 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1292 nodes · 3865 edges · 76 communities
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 181 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Périmètre v1 et déconnexions
- Données, preuve et mode inconnus
- États d'accueil et d'erreur
- Horloges et fenêtre W
- Écran d'accueil et liens légaux
- Politique de confidentialité et journal lots 1-3
- Limites de mesure D2
- Services de mise en relation
- Interface et messages de jeu
- Décisions juridiques D8
- Réglages de calibrage
- Risques et questions D3
- Décisions du prototype 0
- Structure de D2 et questions tranchées
- États de la manche
- Analyse juridique D7
- Cohérence D5 et questions D4
- Structure de D1
- Réglage du seuil en P0
- Consignes du projet
- Questionnaire P2
- Décisions de D6
- Panel et conditions P0
- Règles d'arbitrage R1 à R7
- Prototype 2 et lots P2
- Hypothèse H1 et arbitrage
- Fin de match et revanche
- Parcours joueurs D5
- Rapport de session
- Critère de revanche et ennui
- Détection du sourire R2
- Navigateurs cibles
- Journal P0
- Coupures et forfait
- Connexion P1
- AIPD, DSA et mode inconnus
- Exclusions de la v1
- Définitions de réussite
- Transitions de calibrage
- Grilles de résultats P0
- Composants techniques
- Déconnexions et abandon
- Prototype 1 et journal
- Risques techniques D4
- Sources MediaPipe et WebRTC
- Biométrie et AI Act
- Performance et chauffe
- Horloges P1 et iOS
- Coupures K1 à K7
- Structure de D3
- Données traitées et registre
- Délais du déroulé
- Méthode de réglage de k
- Garde-fous d'arbitrage P2
- Réseaux R1 à R6
- Vie privée H4 et journal P2
- Définitions de D2
- Risques du prototype 0
- Choix de compatibilité
- Performances cibles
- Vidéo H.264 et volumes
- Âge et conditions d'utilisation
- Cadence d'analyse
- Protocole P0
- Mise en page
- Coûts et journaux prestataires
- Salon et session
- Appareil trop lent
- Structure de D6
- Relais TURN
- Serveur auto-hébergé
- Mise en ligne et relecture D7
- Garde-fous P0
- Revue des détections
- Mode inconnus et acquisition
- Navigateur incompatible

## God Nodes (most connected - your core abstractions)
1. `D4 — Architecture technique` - 164 edges
2. `Source de cadrage lots 1-2-3` - 74 edges
3. `D1 — Note de cadrage` - 46 edges
4. `3. Tableau des réglages` - 45 edges
5. `14. Sources` - 45 edges
6. `6.3 Tableau des transitions` - 37 edges
7. `§16.2 Questions ouvertes de D2 à D7` - 35 edges
8. `R2 — Détection du sourire` - 26 edges
9. `R5 — Horodatage et simultanéité` - 26 edges
10. `Rapport §6.3 Incohérences` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Projet Ne souris pas — instructions de conception` --references--> `Décisions de cadrage lots 1-2-3 (source de vérité)`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Projet Ne souris pas — instructions de conception` --references--> `D4 — Architecture technique`  [EXTRACTED]
  CLAUDE.md → docs/D4-architecture-technique.md
- `D4 — Architecture technique` --references--> `Source de cadrage lots 1-2-3`  [EXTRACTED]
  docs/D4-architecture-technique.md → sources/cadrage-lots-1-2-3.md
- `L2.6 — Pages légales` --semantically_similar_to--> `Incohérence 13 : liens légaux sur l'accueil`  [INFERRED] [semantically similar]
  docs/D6-lots-developpement.md → docs/RAPPORT-SESSION.md
- `Projet Ne souris pas — instructions de conception` --references--> `D1 — Note de cadrage`  [EXTRACTED]
  CLAUDE.md → docs/D1-note-de-cadrage.md

## Hyperedges (group relationships)
- **Chaîne de calcul de la fenêtre de simultanéité W** — docs_d2_regles_jeu_arbitrage_terme_aller_retour_minimal_a_min, docs_d2_regles_jeu_arbitrage_terme_erreur_d_horloge_e, docs_d2_regles_jeu_arbitrage_terme_intervalle_d_image_i, docs_d2_regles_jeu_arbitrage_terme_fenetre_effective_w, docs_d2_regles_jeu_arbitrage_reglage_fenetre_de_simultaneite_minimale, docs_d2_regles_jeu_arbitrage_reglage_allers_retours_de_synchronisation, docs_d2_regles_jeu_arbitrage_r5, docs_d2_regles_jeu_arbitrage_s5_6_synchronisation_des_horloges [EXTRACTED 1.00]
- **Calcul du seuil propre au joueur et de la jauge** — docs_d2_regles_jeu_arbitrage_terme_neutre_n, docs_d2_regles_jeu_arbitrage_terme_sourire_volontaire_v, docs_d2_regles_jeu_arbitrage_terme_seuil_d, docs_d2_regles_jeu_arbitrage_reglage_coefficient_k, docs_d2_regles_jeu_arbitrage_reglage_seuil_maximal_d_max, docs_d2_regles_jeu_arbitrage_terme_jauge_j, docs_d2_regles_jeu_arbitrage_r1 [EXTRACTED 1.00]
- **Boucle d'une manche (écran noir → arrêt sur image)** — docs_d2_regles_jeu_arbitrage_etat_ecran_noir, docs_d2_regles_jeu_arbitrage_etat_compte_a_rebours, docs_d2_regles_jeu_arbitrage_etat_manche, docs_d2_regles_jeu_arbitrage_etat_decision, docs_d2_regles_jeu_arbitrage_etat_arret_sur_image, docs_d2_regles_jeu_arbitrage_t13, docs_d2_regles_jeu_arbitrage_t15, docs_d2_regles_jeu_arbitrage_t17, docs_d2_regles_jeu_arbitrage_t19, docs_d2_regles_jeu_arbitrage_t22 [EXTRACTED 1.00]
- **Synchronisation d'horloge et fenêtre W** — docs_d4_architecture_technique_msg_sync_ping, docs_d4_architecture_technique_msg_sync_pong, docs_d4_architecture_technique_msg_sync_resultat, docs_d4_architecture_technique_a_min, docs_d4_architecture_technique_erreur_e, docs_d4_architecture_technique_fenetre_w, docs_d4_architecture_technique_decalage_theta [EXTRACTED 1.00]
- **Décision symétrique et vérifiable** — docs_d4_architecture_technique_msg_faute, docs_d4_architecture_technique_msg_statut, docs_d4_architecture_technique_msg_pic_final, docs_d4_architecture_technique_msg_decision, docs_d4_architecture_technique_6_3_divergence [EXTRACTED 1.00]
- **Pile auto-hébergée en France après prototypes** — docs_d4_architecture_technique_opt_peerjs_auto_heberge, docs_d4_architecture_technique_opt_coturn, docs_d4_architecture_technique_opt_ovhcloud_vps_1 [EXTRACTED 1.00]
- **Réglage du coefficient k à partir des pics soutenus** — docs_d3_plan_de_tests_s1_5_1, docs_d3_plan_de_tests_1_5_2_intervalle_de_k, docs_d3_plan_de_tests_etape_2, docs_d3_plan_de_tests_a1, docs_d3_plan_de_tests_a6, docs_d3_plan_de_tests_g1, docs_d3_plan_de_tests_g5 [EXTRACTED 1.00]
- **Validation de la borne d'horloge par flash commun** — docs_d3_plan_de_tests_s2_3_3, docs_d3_plan_de_tests_r2, docs_d3_plan_de_tests_r3, docs_d3_plan_de_tests_r6, docs_d3_plan_de_tests_c3, docs_d3_plan_de_tests_decision_p1_revoir_e, docs_d3_plan_de_tests_jp1_flashs [EXTRACTED 1.00]
- **Décision de réussite de la v1 et garde-fous** — docs_d3_plan_de_tests_v1, docs_d3_plan_de_tests_e1, docs_d3_plan_de_tests_crit_a1, docs_d3_plan_de_tests_crit_a2, docs_d3_plan_de_tests_crit_a3, docs_d3_plan_de_tests_t1, docs_d3_plan_de_tests_decision_p2_v1_reussie [EXTRACTED 1.00]
- **Liens juridiques de l'accueil vers les textes D7** — docs_d5_parcours_maquettes_e1, docs_d5_parcours_maquettes_lien_conditions_d_utilisation, docs_d5_parcours_maquettes_lien_mentions_legales, docs_d5_parcours_maquettes_lien_confidentialite, docs_d7_juridique_confidentialite_texte_conditions_d_utilisation, docs_d7_juridique_confidentialite_texte_mentions_legales, docs_d7_juridique_confidentialite_texte_politique_de_confidentialite [EXTRACTED 1.00]
- **Écrans d'erreur menant à « Créer un nouveau duel »** — docs_d5_parcours_maquettes_er5, docs_d5_parcours_maquettes_er10, docs_d5_parcours_maquettes_er11, docs_d5_parcours_maquettes_er13, docs_d5_parcours_maquettes_er14, docs_d5_parcours_maquettes_er15, docs_d5_parcours_maquettes_creer_un_nouveau_duel [EXTRACTED 1.00]
- **Traitements de l'adresse IP par l'éditeur** — docs_d4_architecture_technique_donnee_adresse_ip, docs_d7_juridique_confidentialite_registre_t1, docs_d7_juridique_confidentialite_registre_t2, docs_d7_juridique_confidentialite_2_1_qui_est_responsable_de_quoi, docs_d7_juridique_confidentialite_2_3_base_légale_conservation_information, docs_d7_juridique_confidentialite_v9 [INFERRED 0.85]
- **Réintroduction des provocations si ennui ou absence de revanche** — docs_d1_note_de_cadrage_critere_revanche_p2, docs_d1_note_de_cadrage_garde_fou_p2_ennui, docs_d1_note_de_cadrage_exclusion_provocations, docs_d6_lots_developpement_echec_v1, docs_d6_lots_developpement_echec_e1, docs_d1_note_de_cadrage_risque_ennui [INFERRED 0.85]
- **Chaîne P0 : socle, détection, calibrage, sourire, pertes, outils, rejeu** — docs_d6_lots_developpement_l0_1, docs_d6_lots_developpement_l0_2_détection, docs_d6_lots_developpement_l0_3, docs_d6_lots_developpement_l0_4, docs_d6_lots_developpement_l0_5, docs_d6_lots_developpement_l0_6, docs_d6_lots_developpement_l0_7 [EXTRACTED 1.00]
- **Reprise des documents après P0 (valeurs À confirmer propagées)** — docs_d6_lots_developpement_reprise_etape_1, docs_d6_lots_developpement_reprise_etape_2, docs_d6_lots_developpement_reprise_etape_3, docs_rapport_session_incoherence_22 [INFERRED 0.85]

## Communities (76 total, 0 thin omitted)

### Community 0 - "Périmètre v1 et déconnexions"
Cohesion: 0.05
Nodes (80): Périmètre v1 : Arbitrage, Périmètre v1 : Budget, Périmètre v1 : Déroulé, Périmètre v1 : Jeu, Périmètre v1 : Technique, D1 §3 Périmètre de la v1, 6.4.1 Détection, 1.2.3 Appareils (+72 more)

### Community 1 - "Données, preuve et mode inconnus"
Cohesion: 0.05
Nodes (51): 4.7 R7 — Arrêt sur image, R7 — Arrêt sur image, Aucun enregistrement, 11. Points d'extension pour le mode inconnus, 3. Données qui circulent, §4.1 Signalisation, 4.1 Signalisation (appareil ↔ serveur de mise en relation), §4.2 Canal de jeu (+43 more)

### Community 2 - "États d'accueil et d'erreur"
Cohesion: 0.09
Nodes (35): État Attente, État Autorisation, État Connexion, État Erreur caméra, État Erreur connexion, État Erreur salon, État Erreur version, État Salon expiré (+27 more)

### Community 3 - "Horloges et fenêtre W"
Cohesion: 0.19
Nodes (30): Q6 tranchée : e = a_min / 2, W = max(100 ms, e + i), R5 — Horodatage et simultanéité, Allers-retours de synchronisation 5 par révélation, Fenêtre de simultanéité minimale 100 ms, Multiplicateur de l'erreur d'horloge 1, 5.6 Synchronisation des horloges, Aller-retour minimal a_min, Erreur d'horloge e (+22 more)

### Community 4 - "Écran d'accueil et liens légaux"
Cohesion: 0.09
Nodes (30): Bloc « Votre caméra et votre micro », Bouton « Créer un duel », E1 Accueil, Lien « Conditions d'utilisation », Lien « Confidentialité », Lien « Mentions légales », Bouton « Rejoindre le duel », §3.1 E1 — Accueil (+22 more)

### Community 5 - "Politique de confidentialité et journal lots 1-3"
Cohesion: 0.11
Nodes (30): 4. Politique de confidentialité, 2. Lot 1 — Remise en question de l'idée, 3.1 Public, budget, format, 3.3 Mode de jeu, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1, 3.7 Tests et critères de décision, 3. Lot 2 — Périmètre de la v1 (+22 more)

### Community 6 - "Limites de mesure D2"
Cohesion: 0.09
Nodes (28): 5.1 Seuil propre à chaque joueur — décidé (n° 64), 5.2 Exagérer le sourire volontaire — nouveau risque, 5.3 Perte prolongée — décidé (n° 65), 5.4 Main devant la bouche — limite acceptée en v1 (n° 70), 5.5 Parole et départage — variante testée en P0 (n° 72), 5.6 Synchronisation des horloges — décidé (n° 66), 5.7 Deux visages dans le champ — décidé (n° 67), 5. Limites de mesure et décisions associées (+20 more)

### Community 7 - "Services de mise en relation"
Cohesion: 0.12
Nodes (28): 14. Sources, 8.1 Mise en relation, 8.4 Recommandation, Cloudflare Realtime TURN, Cloudflare Workers + Durable Objects, Firebase Realtime Database, PeerJS, serveur auto-hébergé (peer 1.0.2), PeerJS, serveur public (+20 more)

### Community 8 - "Interface et messages de jeu"
Cohesion: 0.16
Nodes (25): Interface PWA, n° 105 : Jauges : cachées hors manche ; figées en décision et sur image invalid…, n° 113 : Messages de jeu sur un canal de données WebRTC unique, fiable et ordon…, n° 126 : Explication, règles et case d'âge réunies sur un seul écran d'accueil,…, n° 127 : Bouton « Commencer » avant chaque calibrage. Hypothèse à valider (D5 Q…, n° 128 : Nombre de gestes : 5 pour l'invité du lien au duel, 7 pour l'hôte (par…, n° 129 : Vouvoiement dans toute l'interface. Hypothèse à valider (D5 Q1), n° 130 : L'invité ne voit pas le nom de l'hôte ; aucun champ prénom. Hypothèse… (+17 more)

### Community 9 - "Décisions juridiques D8"
Cohesion: 0.17
Nodes (25): n° 148 : L'éditeur se considère responsable des traitements d'adresses IP (mise…, n° 149 : Vocabulaire imposé : « détection du sourire », jamais « détection des…, n° 150 : Bases légales : exécution du service pour la mise en relation et le re…, n° 151 : Identité de l'éditeur publiée dans les mentions légales et la politiqu…, n° 152 : Aucun cookie, traceur ni stockage dans le navigateur, donc aucun bande…, n° 153 : Registre simplifié tenu (mise en relation et relais, hébergement, test…, n° 154 : Pas d'analyse d'impact en v1 entre amis ; analyse d'impact préalable a…, n° 155 : Conditions d'utilisation : 18 ans minimum déclarés ; neuf comportement… (+17 more)

### Community 10 - "Réglages de calibrage"
Cohesion: 0.17
Nodes (25): 3. Tableau des réglages, Q1 tranchée : plafond d_max = 0,35, R1 — Calibrage, R4 — Visage perdu, Amplitude minimale v − n 0,15, Délai de visage perdu 1,5 s, Durée de la phase sourire 2 s, Écart-type maximal en phase neutre 0,05 (+17 more)

### Community 11 - "Risques et questions D3"
Cohesion: 0.16
Nodes (24): Risque P2 : arbitrage contesté en jeu, 4. Questions ouvertes (D3), n° 164 : D1 porte un tableau des risques de la source §2.3, chacun relié à un t…, n° 194 : Critère C3 : au moins 19 flashs sur 20 avec un écart couvert par e + i…, n° 195 : P2 : les 10 matchs comptés sont les premiers matchs de 10 sessions ; V…, n° 37 : P0 — performance, sur l'appareil le plus ancien disponible. Critère :…, n° 75 : Chauffe excessive = une fenêtre de 10 s sous 10 images/s pendant les 5…, n° 76 : Méthode de réglage : pic soutenu par séquence, intervalle de k commun… (+16 more)

### Community 12 - "Décisions du prototype 0"
Cohesion: 0.13
Nodes (25): 1.6.2 Décisions et effet sur D2, Décision P0 : Ajustement — calibrage trop strict, Décision P0 : Ajustement — faux négatifs, Décision P0 : Ajustement — faux positifs en dégradé, Décision P0 : Go, Étape de réglage 10 : Vérification, G1 — Aucun faux positif en N (validation), G2 — Aucun faux positif en dégradé accepté (+17 more)

### Community 13 - "Structure de D2 et questions tranchées"
Cohesion: 0.13
Nodes (24): 1. Périmètre, 6. Déroulé du match, 7. Questions ouvertes, D2 — Règles du jeu et d'arbitrage, Q10 tranchée : forfait arbitré par le serveur de mise en relation, Q11 tranchée : durées du déroulé validées comme valeurs de départ, Q12 tranchée : son ouvert pendant l'écran noir, Q13 tranchée : repère du pic sur les jauges (+16 more)

### Community 14 - "États de la manche"
Cohesion: 0.21
Nodes (24): État Arrêt sur image, État Calibrage, État Compte à rebours, État Décision, État Écran noir, État En jeu, État Manche, Compte à rebours 3 s (+16 more)

### Community 15 - "Analyse juridique D7"
Cohesion: 0.13
Nodes (24): 10. Sources, 2.1 Qui est responsable de quoi, 2.3 Base légale, conservation, information, 2.4 Caméra, micro et stockage dans le navigateur, 2.6 Mentions légales, 2.9 Transferts hors de l'Union européenne, 2. Analyse, I2 Fin de l'exemption domestique entre inconnus (+16 more)

### Community 16 - "Cohérence D5 et questions D4"
Cohesion: 0.16
Nodes (22): D4 Q3 — Après prototypes : serveur en France, 5. Vérification de cohérence, E11 Règles, D5 Q4 — Ajouts dans D2 : état Navigateur incompatible, erreur de version, caméra occupée, panneau des règles, n° 162 : Le budget de 10 € par mois après les prototypes couvre tout : relais,…, n° 165 : H4 (accepter d'être filmé) : question 12 du questionnaire P2, informat…, n° 169 : Boutons de l'accueil : « Créer un duel » (hôte), « Rejoindre le duel »…, n° 170 : Un seul libellé pour recommencer : « Créer un nouveau duel ». (+14 more)

### Community 17 - "Structure de D1"
Cohesion: 0.10
Nodes (22): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5.1 Hypothèses critiques, 5.2 Risques, 5. Hypothèses et risques, 6.1 Critère de réussite (+14 more)

### Community 18 - "Réglage du seuil en P0"
Cohesion: 0.18
Nodes (21): Séquence A0 — Calibrage, Étape de réglage 3 : Seuil maximal d_max, Étape de réglage 5 : Écart-type max, plafond du neutre, amplitude minimale, Risque P0 : seuil gonflé en exagérant le sourire volontaire, 1.3.6 Exagération, L0.3 — Calibrage, n° 183 : Seuil plafonné à d_max = 0,35. À confirmer (P0), n° 20 : Zone de doute (entre neutre et sourire) : aucune pénalité, la jauge du… (+13 more)

### Community 19 - "Consignes du projet"
Cohesion: 0.13
Nodes (20): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Marquage À confirmer (P0/P1/P2), Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Reprise 1 : D2 §3, valeurs mesurées, Reprise 2 : D4 §5 et §7, Reprise 3 : critères « Terminé quand » de D6 (+12 more)

### Community 20 - "Questionnaire P2"
Cohesion: 0.10
Nodes (21): Question 1 : Vous êtes-vous amusé ?, Question 10 : Aide pour faire rire l'autre ?, Question 11 : Garder ou partager l'image ?, Question 12 : Gêne d'être filmé et analysé, Question 15 : Difficultés ou confusion dans l'application, Question 16 : joué pareil en simple appel vidéo ?, Question 2 : Ce qui a fait rire, ou pas, Question 3 : L'arbitrage a-t-il paru juste ? (+13 more)

### Community 21 - "Décisions de D6"
Cohesion: 0.24
Nodes (20): D6 §6 Questions ouvertes (D6), n° 134 : Développement découpé en 18 lots : 7 pour P0, 5 pour P1, 6 pour P2 ; c…, n° 135 : Un lot est « terminé » quand son critère est vérifié sur un appareil r…, n° 136 : Pour chaque test en échec : lots modifiés, abandonnés ou suspendus. Pr…, n° 137 : L'outil de rejeu (L0.7) utilise le même code d'arbitrage qu'en jeu, ja…, n° 139 : Pages légales (D7) en ligne avant le premier test P2. Avance la Priori…, n° 140 : P1 : sept combinaisons de réseaux (deux box, Wi-Fi et 4G, 4G même opér…, n° 141 : Erreur réelle des horloges mesurée par un flash commun filmé par les d… (+12 more)

### Community 22 - "Panel et conditions P0"
Cohesion: 0.13
Nodes (19): Risque : Éclairage et angles, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.4 Volume et durée, 1.2 Panel, Condition B1 — pénombre, Condition B2 — contre-jour, Condition B3 — éclairage latéral (+11 more)

### Community 23 - "Règles d'arbitrage R1 à R7"
Cohesion: 0.15
Nodes (19): 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité, 4.6 R6 — Départage à 60 s, 4. Règles d'arbitrage, R3 — Zone de doute et jauge (+11 more)

### Community 24 - "Prototype 2 et lots P2"
Cohesion: 0.27
Nodes (19): 3. Prototype 2 — duel complet, 3.1 Objectif et risques testés (P2), 3.3 Déroulé des 10 matchs, 3.3 Prototype 2 — duel complet, Échec P0 — abandon de l'arbitrage (n° 82), L0.6 — Outils de test, L0.7 — Rejeu, L2.1 — Déroulé (+11 more)

### Community 25 - "Hypothèse H1 et arbitrage"
Cohesion: 0.24
Nodes (18): H1 : La détection est assez fiable pour être acceptée, Risque : Arbitrage injuste (faux positifs), Risque : Faux positifs dus à la parole, à la barbe, à une bouche relevée, Risque : Triche : main devant la bouche, tête tournée, Séquence A1 — Neutre silencieux, Séquence A2 — Parole libre, Séquence A3 — Voyelles tenues, Séquence A4 — Gestes parasites (+10 more)

### Community 26 - "Fin de match et revanche"
Cohesion: 0.18
Nodes (18): État Fin de match, État Fin de session, Délai de revanche 60 s, 6.5 Abandon volontaire et revanche, T24 : En jeu → Fin de match (A abandonne (6.5)), T27 : Interrompu → Fin de match (30 s dépassées), T28 : Fin de match → Fin de match (A accepte la revanche), T30 : Fin de match → Fin de session (A quitte) (+10 more)

### Community 27 - "Parcours joueurs D5"
Cohesion: 0.13
Nodes (18): D4 Q10 — Nom de domaine reporté (n° 46) , 2.1 Parcours de l'hôte, 2.2 Parcours de l'invité, 2.3 Nombre de gestes, 2. Parcours, 6. Questions ouvertes, D5 — Parcours utilisateur et maquettes d'écrans, D5 Q1 — Vouvoiement (+10 more)

### Community 28 - "Rapport de session"
Cohesion: 0.11
Nodes (18): 1. Lot 4 — D2 complet, 2. Lot 5 — D4 Architecture technique, 3. Lot 6 — D5 Parcours et maquettes, 4. Lot 7 — D6, puis D3 prototypes 1 et 2, 5. Lot 8 — D7 Juridique et confidentialité, 6.1 Méthode et limite, 6.2 Résultats par contrôle, 6.3 Incohérences (+10 more)

### Community 29 - "Critère de revanche et ennui"
Cohesion: 0.18
Nodes (17): Critère de réussite P2 : revanche spontanée, Exclu v1 : Provocations de l'application, Garde-fou P2 : ennui, H2 : Voir l'autre lutter suffit à faire rire, H3 : Une partie courte donne envie de rejouer, H5 : L'application apporte plus qu'un appel vidéo, Risque : Ennui : sans provocation, il ne se passe rien, D1 §5.1 Hypothèses critiques (+9 more)

### Community 30 - "Détection du sourire R2"
Cohesion: 0.17
Nodes (17): R2 — Détection du sourire, Durée de maintien 500 ms, Images minimales par sourire 3 images, Images tolérées dans une série 1 image, Plancher de la variante cheekSquint 0,20, Règle affichée 1 : Le premier qui sourit perd la manche ; deux manches gagnées remportent le match., Règle affichée 2 : Parlez, grimacez, faites rire l'autre : tout est permis., Règle affichée 3 : Gardez votre visage visible et seul à l'écran, sinon vous perdez la manche. (+9 more)

### Community 31 - "Navigateurs cibles"
Cohesion: 0.21
Nodes (17): 13. Questions ouvertes, 7.2 Navigateurs cibles, Cible — Chrome Android, Cible — Chrome, Edge ordinateur, Cible — Chrome ou Firefox pour iOS, Cible — Firefox ordinateur, Cible — PWA installée, Cible — Safari iOS/iPadOS 15+ (+9 more)

### Community 32 - "Journal P0"
Cohesion: 0.24
Nodes (16): Journal P0 : scores bruts (smileG/D, cheekG/D, lum), Journal P0 : géométrie du visage (faces, largeur, lacet, tangage), Journal P0 : identification (t, seq), 1.4.1 Journal numérique P0, 3.2 Panel et organisation (P2), D6 §1 Conventions, Protection BitLocker de l'ordinateur de l'éditeur, Donnée : Journaux de test P0 et P2 (+8 more)

### Community 33 - "Coupures et forfait"
Cohesion: 0.25
Nodes (16): Risque P1 : coupure mal gérée, n° 100 : Coupure en pleine manche : une faute déjà annoncée reste acquise ; sin…, n° 101 : Forfait après 30 s contre le joueur que le serveur de mise en relation…, n° 102 : Page masquée ou appareil en veille : perte de visage (R4), sans except…, n° 103 : Abandon volontaire : bouton avec confirmation ; la manche continue pen…, n° 104 : Revanche : acceptée par les deux dans les 60 s ; nouveau match à 0–0,…, n° 106 : Durées : écran noir 2 s au moins ; compte à rebours 3 s ; arrêt sur im…, n° 107 : Appareil sous 10 images/s avant la révélation : la manche ne démarre p… (+8 more)

### Community 34 - "Connexion P1"
Cohesion: 0.26
Nodes (15): Définition : 100 % des connexions, Garde-fou P1 : 100 % des connexions, Risque : Échec de connexion sur certains réseaux, C1 — 10 réussites sur 10 par combinaison, C2 — Établissement en 20 s au plus, Décision P1 : Revoir les délais, Risque P1 : connexion impossible sur certains réseaux, Risque P1 : connexion trop lente (+7 more)

### Community 35 - "AIPD, DSA et mode inconnus"
Cohesion: 0.13
Nodes (15): 2.5 Registre et analyse d'impact, 2.8 Règlement sur les services numériques (DSA), 8.2 Avant le mode inconnus, I1 Analyse d'impact (AIPD), I3 Qualification DSA du mode inconnus, I4 Vérification d'âge et protection des mineurs, I5 Modération ou arbitrage vérifié côté serveur, I6 Signalement, bannissement, preuves, coopération Pharos (+7 more)

### Community 36 - "Exclusions de la v1"
Cohesion: 0.19
Nodes (14): Exclu v1 : Clip partageable du fou rire, Exclu v1 : Comptes, classements, historique, Exclu v1 : Détection sonore du rire, Exclu v1 : Différenciation face aux filtres et acquisition de joueurs, Exclu v1 : Jeu avec des inconnus, Exclu v1 : Mode soirée sur grand écran, Exclu v1 : Monétisation, Risque : Acquisition : il faut convaincre deux personnes (+6 more)

### Community 37 - "Définitions de réussite"
Cohesion: 0.21
Nodes (14): D1 §6.3 Définitions provisoires, D1 §6 À quoi saura-t-on que la v1 a réussi, 6.5.2 Revanche, Risque P2 : le jeu ne donne pas envie de rejouer, RT1 — La détection GPU échoue ; repli CPU, 5. Lot documentaire 1 — Arbitrages du 2026-09-25, n° 40 : P2 — intérêt : revanche spontanée dans au moins la moitié des matchs., n° 42 : P2 — ennui : si plus de la moitié des manches vont au bout des 60 s, r… (+6 more)

### Community 38 - "Transitions de calibrage"
Cohesion: 0.15
Nodes (14): T10 : Calibrage → Calibrage (A réussit son calibrage), T11 : Calibrage → Calibrage (A échoue (R1)), T29 : Fin de match → Calibrage (Les deux acceptent la revanche), 3.11 E11 — Règles, 3.1 E1 — Accueil : explication et âge, 3.3 E3 — Attente (hôte), 3.5 E5 — Calibrage, 3.6 E6 — Écran noir, compte à rebours, révélation (+6 more)

### Community 39 - "Grilles de résultats P0"
Cohesion: 0.14
Nodes (14): 1.4.1 Journal numérique, 1.4.2 Fiche testeur, 1.4.3 Calibrage, 1.4.4 Séquences en conditions normales, 1.4.5 Sourires commandés (A6), 1.4.6 Mouvements (A7), 1.4.7 Conditions dégradées, 1.4.8 Performance (+6 more)

### Community 40 - "Composants techniques"
Cohesion: 0.14
Nodes (14): 2. Schéma des composants, Choix — Un seul flux caméra et micro partagé, Capture caméra + micro, Détection MediaPipe Face Landmarker, Hébergement statique, Relais STUN / TURN, Serveur de mise en relation, Principe 3 — Le serveur ne voit que la mise en relation (+6 more)

### Community 41 - "Déconnexions et abandon"
Cohesion: 0.19
Nodes (13): État Accueil, Q9 tranchée : manche interrompue rejouée, avec garde-fou, Manches interrompues tolérées 1 par joueur et par match, 6.4.2 Selon l'état, 6.4.3 Forfait, 6.4 Déconnexions, 6.5.1 Abandon, T1 : Ouverture → Accueil (Ouverture (hôte ou lien invité)) (+5 more)

### Community 42 - "Prototype 1 et journal"
Cohesion: 0.15
Nodes (13): 2. Prototype 1 — appel vidéo seul, Journal P1 : chemin réseau (candidat, relais_proto), Journal P1 : essai (essai, combi, app_a, app_b), Journal des flashs P1, Journal P1 : qualité (rtt, debit, pertes, gels), Journal P1 : résultat (reussi, t_etab, son_img), 2.2 Réseaux, appareils, volume, 2.2.2 Volume (P1) (+5 more)

### Community 43 - "Risques techniques D4"
Cohesion: 0.18
Nodes (13): 12. Risques techniques, 8. Mise en relation et relais : choix des services, Choix — Fichiers MediaPipe servis par l'hébergement de la PWA, version figée, Message battement, Principe 5 — Aucun tiers dans la page, RT10 — Image de preuve trop grosse ou perdue, RT12 — Mise à jour navigateur ou MediaPipe, RT13 — Écran en veille pendant attente ou calibrage (+5 more)

### Community 44 - "Sources MediaPipe et WebRTC"
Cohesion: 0.21
Nodes (13): 7.1 Ce que disent les sources, S1 MediaPipe setup web, S2 npm tasks-vision, S3 Modèle Face Landmarker, S4 Face landmark guide, S5 Face landmark guide Web, S6 MediaPipe ticket 3303, MediaPipe, blendshapes (+5 more)

### Community 45 - "Biométrie et AI Act"
Cohesion: 0.15
Nodes (13): 2.2 Pas de biométrie, pas de reconnaissance d'émotion, 8.1 Avant l'ouverture au public, Donnée : Mesures du visage, J4 CEPD, lignes directrices 3/2019 sur les dispositifs vidéo, J5 Règlement (UE) 2024/1689 (AI Act), considérant 18, Politique de confidentialité 3. La détection du sourire, D7 Q4 — Identité de l'éditeur publiée, V1 Identité de l'éditeur ou anonymat LCEN (+5 more)

### Community 46 - "Performance et chauffe"
Cohesion: 0.30
Nodes (12): H6 : Chaque joueur a un appareil récent avec caméra correcte, Risque : Chauffe et batterie sur iOS, C5 — G3 tenu pendant l'appel réel, Décision P0 : Ajustement — performance, Décision P1 : Alléger la charge, G3 — ≥ 10 images/s sans chauffe excessive, Risque P1 : performance avec un vrai appel, 1.3.8 Session performance (+4 more)

### Community 47 - "Horloges P1 et iOS"
Cohesion: 0.29
Nodes (12): Risque : Latence vidéo, C3 — ≥ 19 flashs sur 20 avec écart ≤ e + i, C6 — Image et son des deux côtés sur iOS, Décision P1 : Corriger iOS, Décision P1 : Go, Décision P1 : Revoir e, Risque P1 : vidéo ou son muets sur iOS, 2.3.3 Mesure des horloges par flash commun (+4 more)

### Community 48 - "Coupures K1 à K7"
Cohesion: 0.36
Nodes (12): Risque : Mise en veille, blocage du son sur iOS, C4 — K1 à K7 conformes sur iPhone et Android, K1 — Wi-Fi de A coupé 10 s, K2 — Wi-Fi de A coupé 40 s, K3 — A dans une autre application 5 s, K4 — A dans une autre application 40 s, K5 — A verrouille l'écran 10 s, K6 — A ferme l'onglet (+4 more)

### Community 49 - "Structure de D3"
Cohesion: 0.17
Nodes (12): 1.1 Objectif et risques testés, 1.6.1 Critères, 1.6 Critères de décision, 1. Prototype 0 — détection seule, sans réseau, 4. Questions ouvertes, D3 — Plan de tests et critères de décision, 1.3 Protocole pas à pas (P0), 1.3.1 Ce que le prototype 0 doit offrir (+4 more)

### Community 50 - "Données traitées et registre"
Cohesion: 0.17
Nodes (12): Donnée — Adresse IP, 1. Données traitées, 6. Registre de traitement simplifié, Donnée : Code du salon et descriptions de connexion, Donnée : Image de preuve, Donnée : Image et son de la caméra, Donnée : Jauge, événements de jeu et informations techniques, Donnée : Volume relayé (+4 more)

### Community 51 - "Délais du déroulé"
Cohesion: 0.22
Nodes (11): État Interrompu, Absence de jauge avant grisé 1 s, Délai de reconnexion 30 s, Durée de l'arrêt sur image 5 s, Durée minimale de l'écran noir 2 s, Silence avant adversaire injoignable 3 s, 6.7 Réglages du déroulé, T25 : En jeu → Interrompu (B injoignable) (+3 more)

### Community 52 - "Méthode de réglage de k"
Cohesion: 0.22
Nodes (11): 1.5.1 Pic soutenu, 1.5.2 Intervalle de `k`, 1.5.3 Ordre des réglages, 1.5 Méthode de réglage du seuil, Décision P0 : Ajustement — faux positifs en N, Étape de réglage 2 : Coefficient k, Étape de réglage 4 : Marge m, Étape de réglage 7 : Lacet, tangage, largeur minimale (+3 more)

### Community 53 - "Garde-fous d'arbitrage P2"
Cohesion: 0.36
Nodes (11): A1 — Aucune contestation fondée, A2 — ≤ 10 % de manches nulles, aucune divergence, A3 — Triche par la main dans ≤ 2 matchs sur 10, Décision P2 : Arbitrage à retravailler, Décision P2 : Technique à corriger, Décision P2 : v1 réussie, Risque P2 : défaillance technique en match, Risque P2 : trop de manches nulles ou divergentes (+3 more)

### Community 54 - "Réseaux R1 à R6"
Cohesion: 0.27
Nodes (11): Décision P1 : Changer de relais, R1 — Wi-Fi / Wi-Fi autre opérateur, R2 — Wi-Fi / 4G ou 5G, R3 — 4G / 4G même opérateur, R4 — 4G / 4G autre opérateur, R5 — Wi-Fi restrictif / 4G, R6 — même Wi-Fi (témoin), RF — Relais forcé (+3 more)

### Community 55 - "Vie privée H4 et journal P2"
Cohesion: 0.29
Nodes (10): H4 : Les joueurs acceptent d'être filmés et analysés, Risque : Vie privée des flux vidéo, Journal P2 : engagement (revanche, t_lien_duel), Journal P2 : identification (session, match, manche, app_hote, app_invite), Journal P2 : issue de la manche (duree, cause, perdant, ecart_fautes, pics), Journal P2 : technique (e, w, cadence, divergence, preuve, coupures), 3.4 Métriques (P2), 3.6 Grille de résultats (P2) (+2 more)

### Community 56 - "Définitions de D2"
Cohesion: 0.47
Nodes (10): 2. Définitions, Image de doute, Image souriante, Jauge J, Marge m, Neutre n, Score brut s, Score lissé S (+2 more)

### Community 57 - "Risques du prototype 0"
Cohesion: 0.22
Nodes (10): 5.4 Main devant la bouche, Risque P0 : sourire franc non détecté (faux négatif), Risque P0 : arbitrage injuste (faux positif), Risque P0 : sourire caché derrière la main, Risque P0 : performance insuffisante sur appareil ancien, Risque P0 : pertes de visage injustifiées, Risque P2 : triche par la main devant la bouche, 1.1 Objectif et risques testés (P0) (+2 more)

### Community 58 - "Choix de compatibilité"
Cohesion: 0.22
Nodes (10): 7.3 Choix qui en découlent, 7. Compatibilité et performances cibles, Choix — Détecteur créé une seule fois par session, Choix — Délégué GPU d'abord, CPU en secours, Choix — Modèle et WebAssembly chargés dès l'accueil, RT11 — Fuite de mémoire au fil des revanches, S7 MediaPipe ticket 6142, MediaPipe sur iOS (+2 more)

### Community 59 - "Performances cibles"
Cohesion: 0.24
Nodes (10): 7.4 Performances cibles, Performance — Cadence d'analyse : 10 à 15 images/s, Performance — Chauffe : critère G3, Performance — Établissement de la connexion ≤ 20 s, Performance — Image de preuve reçue ≤ 2 s, Performance — Modèle prêt ≤ 15 s en 4G, Performance — Premier chargement ≤ 3 s en 4G, Performance — Retard vidéo ≤ 300 ms (+2 more)

### Community 60 - "Vidéo H.264 et volumes"
Cohesion: 0.27
Nodes (10): 9.1 Volumes, Choix — H.264 si un appareil iOS est dans le duel, Performance — Vidéo envoyée 640 × 480, ≤ 1,7 Mbit/s, D4 Q9 — H.264 quand un iPhone joue , S20 RFC 7742, S21 MDN codecs WebRTC, S22 libwebrtc webrtc_video_engine, S43 webrtcHacks statistiques 2016 (+2 more)

### Community 61 - "Âge et conditions d'utilisation"
Cohesion: 0.22
Nodes (10): Case « J'ai 18 ans ou plus », 2.7 Âge minimum, 5. Conditions d'utilisation, Conditions d'utilisation 2. Qui peut jouer, J15 Arcom, référentiel de vérification de l'âge, J16 Loi 2023-566 du 7 juillet 2023 (majorité numérique), J17 Conseil constitutionnel, décision n° 2026-911 DC du 14 août 2026, Politique de confidentialité 10. Âge (+2 more)

### Community 62 - "Cadence d'analyse"
Cohesion: 0.31
Nodes (9): Cadence d'analyse maximale 15 images/s, Cadence d'analyse minimale 10 images/s, Cadence d'analyse, Image analysée, Intervalle d'image i, n° 115 : Cadence négociée à la connexion (message bonjour), puis refixée par l'…, n° 86 : Cadence d'analyse : 15 images/s, plafonnée et identique sur les deux a…, n° 94 : Cadence commune : les deux appareils s'alignent sur la cadence la plus… (+1 more)

### Community 63 - "Protocole P0"
Cohesion: 0.22
Nodes (9): 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur), 1.3.3 Accueil (3 min), 1.3.4 Séquences en conditions normales (environ 15 min), 1.3.5 Conditions dégradées (environ 8 min), 1.3.6 Exagération (environ 3 min), 1.3.7 Fin de session (3 min), 1.3.8 Session performance (Valentin seul, par appareil) (+1 more)

### Community 64 - "Mise en page"
Cohesion: 0.25
Nodes (9): §10.1 Principes de mise en page, 10.1 Principes, 10.2 Téléphone, portrait, 10.3 Ordinateur ou tablette, paysage, 10. Mise en page, D4 Q5 — Vidéos empilées en portrait, D5 Q5 — Vidéos empilées en portrait (D4 Q5), n° 17 : Apparition à chaque manche : écran noir, compte à rebours 3-2-1, révél… (+1 more)

### Community 65 - "Coûts et journaux prestataires"
Cohesion: 0.25
Nodes (9): 9.2 À partir de quel volume ça coûte, 9.3 Journaux des prestataires, 9. Coûts, volumes et journaux, Metered Open Relay, D4 Q2 — Prototypes sur serveur public PeerJS et Metered, D4 Q4 — Journaux conservés 7 jours, S35 Metered Open Relay, S36 Metered offres TURN (+1 more)

### Community 66 - "Salon et session"
Cohesion: 0.39
Nodes (8): Périmètre v1 : Vie privée, Q7 tranchée : salon verrouillé à deux, expire à la fin de la session, 6.5.3 Salon et revanche, Donnée — Code du salon, n° 159 : Le salon se verrouille à deux joueurs dès l'arrivée de l'invité et exp…, n° 28 : Aucun compte : salon à code aléatoire, qui expire à la fin du match., n° 98 : Le salon se verrouille à deux joueurs dès l'arrivée de l'invité, reste…, Incohérence 1 : salon qui expire

### Community 67 - "Appareil trop lent"
Cohesion: 0.39
Nodes (8): Q5 tranchée : appareil sous 10 images/s, Nouvelle mesure de cadence 5 s, 5.8 Cadence d'analyse commune, T14 : Écran noir → Écran noir (Cadence de A sous 10 images/s), E6 Écran noir et compte à rebours, ER7 Appareil trop lent, D2 Q5 (rapport), Incohérence 23 : D2 §5.8 et hypothèse n° 107

### Community 68 - "Structure de D6"
Cohesion: 0.25
Nodes (8): 1. Conventions, 2. Vue d'ensemble, 3.1 Prototype 0 — détection seule, 3.2 Prototype 1 — appel vidéo seul, 3. Détail des lots, 4. Si un test échoue, 5. Questions ouvertes, D6 — Découpage en lots de développement

### Community 69 - "Relais TURN"
Cohesion: 0.29
Nodes (7): 8.2 Relais TURN, coturn auto-hébergé, ExpressTURN, Twilio TURN, S37 ExpressTURN, S38 Twilio tarifs STUN/TURN, S39 coturn

### Community 70 - "Serveur auto-hébergé"
Cohesion: 0.29
Nodes (7): 8.3 Serveur auto-hébergé en Europe, Hetzner CX23, OVHcloud VPS-1, Scaleway DEV1-S, S40 OVHcloud VPS, S41 Hetzner Cloud, S42 Scaleway instances

### Community 71 - "Mise en ligne et relecture D7"
Cohesion: 0.43
Nodes (7): 7. Mise en ligne, 8. Points à faire vérifier par un professionnel, 9. Questions ouvertes, D7 — Documents juridiques et confidentialité, D7 Q1 — Relecture dès l'ouverture par un avocat ou juriste spécialisé en données personnelles, D7 Q2 — Champs [À COMPLÉTER] laissés tels quels, remplis par Valentin avant la mise en ligne, n° 213 : Relecture de D7 dès l'ouverture au-delà des proches, par un avocat ou…

### Community 72 - "Garde-fous P0"
Cohesion: 0.40
Nodes (5): Définition : chauffe excessive, Définition : conditions normales, Garde-fou P0 : aucun faux positif, Garde-fou P0 : performance ≥ 10 images/s, D1 §6.2 Prérequis et garde-fous

### Community 73 - "Revue des détections"
Cohesion: 0.40
Nodes (5): Détection confirmée, Détection faux positif, Détection litigieuse, Journal P0 : état de l'arbitrage (S, J, etat, faute, op), Revue d'une détection

### Community 74 - "Mode inconnus et acquisition"
Cohesion: 0.60
Nodes (5): Question 13 : Rejouer avec un autre ami ?, Question 14 : Jouer avec un inconnu ?, Risque P2 : différenciation face aux filtres ; acquisition, Risque P2 : demande pour le mode inconnus, n° 166 : Différenciation face aux filtres des réseaux sociaux et acquisition :…

### Community 75 - "Navigateur incompatible"
Cohesion: 0.67
Nodes (3): État Navigateur incompatible, T32 : Ouverture → Navigateur incompatible (Ouverture), ER8 Navigateur incompatible

## Ambiguous Edges - Review These
- `L0.1 — Socle` → `D6 Q1 (rapport)`  [AMBIGUOUS]
  docs/RAPPORT-SESSION.md · relation: conceptually_related_to

## Knowledge Gaps
- **141 isolated node(s):** `Décisions de cadrage lots 1-2-3 (source de vérité)`, `6.1 Méthode et limite`, `6.2 Résultats par contrôle`, `6.3 Incohérences`, `Documents de conception — « Ne souris pas »` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 145 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `L0.1 — Socle` and `D6 Q1 (rapport)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `D4 — Architecture technique` connect `Périmètre v1 et déconnexions` to `Données, preuve et mode inconnus`, `États d'accueil et d'erreur`, `Horloges et fenêtre W`, `Écran d'accueil et liens légaux`, `Politique de confidentialité et journal lots 1-3`, `Services de mise en relation`, `Interface et messages de jeu`, `Décisions juridiques D8`, `Risques et questions D3`, `Structure de D2 et questions tranchées`, `États de la manche`, `Analyse juridique D7`, `Cohérence D5 et questions D4`, `Structure de D1`, `Réglage du seuil en P0`, `Consignes du projet`, `Décisions de D6`, `Prototype 2 et lots P2`, `Parcours joueurs D5`, `Navigateurs cibles`, `Journal P0`, `Coupures et forfait`, `Connexion P1`, `AIPD, DSA et mode inconnus`, `Composants techniques`, `Risques techniques D4`, `Performance et chauffe`, `Horloges P1 et iOS`, `Coupures K1 à K7`, `Données traitées et registre`, `Garde-fous d'arbitrage P2`, `Réseaux R1 à R6`, `Choix de compatibilité`, `Performances cibles`, `Vidéo H.264 et volumes`, `Cadence d'analyse`, `Mise en page`, `Coûts et journaux prestataires`, `Salon et session`?**
  _High betweenness centrality (0.280) - this node is a cross-community bridge._
- **Why does `14. Sources` connect `Services de mise en relation` to `Périmètre v1 et déconnexions`, `Coûts et journaux prestataires`, `Relais TURN`, `Serveur auto-hébergé`, `Composants techniques`, `Risques techniques D4`, `Sources MediaPipe et WebRTC`, `Choix de compatibilité`, `Vidéo H.264 et volumes`, `Navigateurs cibles`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `D1 — Note de cadrage` connect `Structure de D1` to `Périmètre v1 et déconnexions`, `Salon et session`, `Exclusions de la v1`, `Définitions de réussite`, `Politique de confidentialité et journal lots 1-3`, `Garde-fous P0`, `Décisions juridiques D8`, `Mode inconnus et acquisition`, `Risques et questions D3`, `Cohérence D5 et questions D4`, `Réglage du seuil en P0`, `Consignes du projet`, `Décisions de D6`, `Vie privée H4 et journal P2`, `Risques du prototype 0`, `Critère de revanche et ennui`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `Décisions de cadrage lots 1-2-3 (source de vérité)`, `6.1 Méthode et limite`, `6.2 Résultats par contrôle` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Périmètre v1 et déconnexions` be split into smaller, more focused modules?**
  _Cohesion score 0.05308641975308642 - nodes in this community are weakly interconnected._
- **Should `Données, preuve et mode inconnus` be split into smaller, more focused modules?**
  _Cohesion score 0.054901960784313725 - nodes in this community are weakly interconnected._