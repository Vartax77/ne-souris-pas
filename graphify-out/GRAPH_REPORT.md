# Graph Report - ne-souris-pas  (2026-09-25)

## Corpus Check
- 12 files · ~52,249 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 930 nodes · 2516 edges · 58 communities (53 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Machine à états du match
- Structure de D2
- Plan de tests P1 et P2
- Architecture et risques D4
- Garde-fous P2 et arbitrage en jeu
- Cadrage et journal des décisions
- Cadence, écran noir et révélation
- Note de cadrage D1
- Protocole prototype 0
- Documents juridiques D7
- Réglages d’arbitrage simulés
- Services de relais et hébergement
- Détection MediaPipe et séquences
- Écrans d’erreur D5
- Tests réseau P1
- Conditions et critères P0
- Arrêt sur image et preuve
- Règles de travail du projet
- Âge et conditions d’utilisation
- Salon, session et match
- Capture et flux vidéo
- Score de sourire et variante
- Bases légales et registre
- Serveur de mise en relation
- Déconnexion, forfait, abandon
- Canal, délais et jauges
- Images valides et fautes
- Qualification RGPD du visage
- Écrans E1 à E11
- Journaux de test
- Analyse juridique D7
- Mentions légales et identité
- Rapport de session et priorités
- Performance et panel P0
- Règles R1 à R7
- Limites de mesure D2
- Périmètre v1 (source)
- Questions ouvertes consolidées
- Plafond d_max
- Source de vérité
- Compatibilité D4 §7
- Choix des services D4 §8
- Navigateurs et performances
- Lots de développement
- Transferts hors UE
- Mise en page
- Messages D4
- Coûts et volumes
- PWA sur iOS
- Parcours et gestes
- Contrôle de cohérence
- Horloges et cadence
- Vérifications juridiques
- Vouvoiement
- Hôte
- Invité
- Nom de domaine
- Relance graphify

## God Nodes (most connected - your core abstractions)
1. `D8 — Journal des décisions` - 177 edges
2. `D7 — Documents juridiques et confidentialité` - 146 edges
3. `D3 — Plan de tests et critères de décision` - 128 edges
4. `D2 — Règles du jeu et d'arbitrage` - 121 edges
5. `D4 — Architecture technique` - 105 edges
6. `D5 — Parcours utilisateur et maquettes d'écrans` - 72 edges
7. `Source de cadrage lots 1-2-3` - 56 edges
8. `D6 — Découpage en lots de développement` - 49 edges
9. `Prototype 0 détection seule` - 48 edges
10. `Tableau des réglages` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Projet Ne souris pas — instructions de conception` --references--> `Décisions de cadrage lots 1-2-3 (source de vérité)`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `D3 — Plan de tests et critères de décision` --references--> `Source de cadrage lots 1-2-3`  [EXTRACTED]
  docs/D3-plan-de-tests.md → sources/cadrage-lots-1-2-3.md
- `D4 — Architecture technique` --references--> `Source de cadrage lots 1-2-3`  [EXTRACTED]
  docs/D4-architecture-technique.md → sources/cadrage-lots-1-2-3.md
- `Données qui circulent` --references--> `D7 — Documents juridiques et confidentialité`  [INFERRED]
  docs/D4-architecture-technique.md → docs/D7-juridique-confidentialite.md
- `Case d'âge 18 ans` --references--> `D7 — Documents juridiques et confidentialité`  [INFERRED]
  docs/D5-parcours-maquettes.md → docs/D7-juridique-confidentialite.md

## Hyperedges (group relationships)
- **Calibrage et seuil propre au joueur** — docs_d2_regles_jeu_arbitrage_r1_calibrage, docs_d2_regles_jeu_arbitrage_neutre_n, docs_d2_regles_jeu_arbitrage_sourire_volontaire_v, docs_d2_regles_jeu_arbitrage_seuil_d, docs_d2_regles_jeu_arbitrage_coefficient_k_0_4, docs_d2_regles_jeu_arbitrage_seuil_maximal_d_max_0_35 [EXTRACTED 1.00]
- **Arbitrage de simultanéité** — docs_d2_regles_jeu_arbitrage_r5_horodatage_et_simultaneite, docs_d2_regles_jeu_arbitrage_erreur_d_horloge_e, docs_d2_regles_jeu_arbitrage_fenetre_effective_w, docs_d2_regles_jeu_arbitrage_intervalle_d_image_i, docs_d2_regles_jeu_arbitrage_cadence_d_analyse_commune, docs_d2_regles_jeu_arbitrage_allers_retours_de_synchronisation_5, docs_d3_plan_de_tests_mesure_des_horloges_par_flash_commun [INFERRED 0.85]
- **Réglage du seuil en P0** — docs_d3_plan_de_tests_pic_soutenu_p, docs_d3_plan_de_tests_ratio_r_p_d, docs_d3_plan_de_tests_intervalle_de_k, docs_d3_plan_de_tests_ordre_des_reglages_p0, docs_d3_plan_de_tests_groupe_de_reglage, docs_d3_plan_de_tests_groupe_de_validation, docs_d3_plan_de_tests_critere_g1_aucun_faux_positif_en_n_sur_le_groupe_de_validation [EXTRACTED 1.00]
- **Synchronisation à l'écran noir de chaque manche** — docs_d2_regles_jeu_arbitrage_synchronisation_des_horloges, docs_d2_regles_jeu_arbitrage_cadence_d_analyse_commune, docs_d4_architecture_technique_message_sync_resultat, docs_d4_architecture_technique_fenetre_w_max_100_ms_2e_i, docs_d5_parcours_maquettes_e6_ecran_noir_et_compte_a_rebours [EXTRACTED 1.00]
- **Arbitrage réparti symétrique** — docs_d4_architecture_technique_source_de_verite_de_l_arbitrage, docs_d4_architecture_technique_message_faute, docs_d4_architecture_technique_message_statut, docs_d4_architecture_technique_message_pic_final, docs_d4_architecture_technique_message_decision, docs_d4_architecture_technique_divergence_des_decisions, docs_d6_lots_developpement_l2_2_arbitrage_réparti [EXTRACTED 1.00]
- **Serveur unique en France après les prototypes** — docs_d4_architecture_technique_peerjs_serveur_auto_heberge, docs_d4_architecture_technique_coturn_auto_heberge, docs_d4_architecture_technique_ovhcloud_vps_1, docs_d4_architecture_technique_hebergement_statique [EXTRACTED 1.00]
- **Pages légales publiées depuis l'accueil** — docs_d7_juridique_confidentialite_mentions_legales, docs_d7_juridique_confidentialite_politique_de_confidentialite, docs_d7_juridique_confidentialite_conditions_d_utilisation, docs_d7_juridique_confidentialite_mise_en_ligne [EXTRACTED 1.00]
- **Registre simplifié : fiches T1 à T3** — docs_d7_juridique_confidentialite_registre_de_traitement_simplifie, docs_d7_juridique_confidentialite_fiche_t1_mise_en_relation_et_relais, docs_d7_juridique_confidentialite_fiche_t2_hebergement_du_site, docs_d7_juridique_confidentialite_fiche_t3_tests_des_prototypes [EXTRACTED 1.00]
- **Calcul de la fenêtre W et erreur d'horloge** — docs_rapport_session_incoherence_07, docs_rapport_session_incoherence_08, docs_rapport_session_priorite_2_salon_et_calcul_de_w, docs_d8_journal_decisions_n66 [INFERRED 0.85]

## Communities (58 total, 5 thin omitted)

### Community 0 - "Machine à états du match"
Cohesion: 0.05
Nodes (77): Délai de revanche 60 s, Durée de vie d'un salon sans invité 15 min, État Accueil, État Attente, État Autorisation, État Calibrage, État Connexion, État Décision (+69 more)

### Community 1 - "Structure de D2"
Cohesion: 0.08
Nodes (54): 1. Périmètre, 2. Définitions, 3. Tableau des réglages, 6. Déroulé du match, 7. Questions ouvertes, Allers-retours de synchronisation 5, D2 — Règles du jeu et d'arbitrage, Écart de pics pour égalité 0,05 (+46 more)

### Community 2 - "Plan de tests P1 et P2"
Cohesion: 0.12
Nodes (42): 2. Prototype 1 — appel vidéo seul, 3. Prototype 2 — duel complet, 4. Questions ouvertes, D3 — Plan de tests et critères de décision, 1. Conventions, 2. Vue d'ensemble, 4. Si un test échoue, 5. Questions ouvertes (+34 more)

### Community 3 - "Architecture et risques D4"
Cohesion: 0.08
Nodes (42): Décision Changer de mise en relation, Q4 Budget serveur auto-hébergé 4,57 € par mois, 11. Points d'extension pour le mode inconnus, 12. Risques techniques, 13. Questions ouvertes, 14. Sources, 1. Principes, 2. Schéma des composants (+34 more)

### Community 4 - "Garde-fous P2 et arbitrage en jeu"
Cohesion: 0.09
Nodes (41): Durée de la manche 60 s, Main devant la bouche, Q14 Décisions divergentes entre appareils, T21 Décisions divergentes, 10 matchs comptés, Contestation fondée, Critère A1 Aucune contestation fondée, Critère A3 Triche par la main dans 2 matchs sur 10 au plus (+33 more)

### Community 5 - "Cadrage et journal des décisions"
Cohesion: 0.10
Nodes (41): Seuil propre à chaque joueur, Questionnaire aux testeurs, Vidéo pair à pair WebRTC, Q7 — Nom de domaine et nom définitif, 1. Conventions, 2. Lot 1 — Remise en question de l'idée, 4. Lot 3 — Documents à concevoir, 5. Lot documentaire 1 — Arbitrages du 2026-09-25 (+33 more)

### Community 6 - "Cadence, écran noir et révélation"
Cohesion: 0.07
Nodes (38): Cadence d'analyse commune, Cadence d'analyse maximale 15 images/s, Compte à rebours 3 s, Durée minimale de l'écran noir 2 s, État Compte à rebours, État Écran noir, Intervalle d'image i, Q12 Son ouvert pendant l'écran noir (+30 more)

### Community 7 - "Note de cadrage D1"
Cohesion: 0.08
Nodes (35): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5. Hypothèses critiques, 6.1 Critère de réussite, 6.2 Prérequis et garde-fous, 6.3 Définitions provisoires (+27 more)

### Community 8 - "Protocole prototype 0"
Cohesion: 0.06
Nodes (33): 1.1 Objectif et risques testés, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur) (+25 more)

### Community 9 - "Documents juridiques D7"
Cohesion: 0.10
Nodes (30): 10. Sources, 1. Données traitées, 3. Mentions légales, 4. Politique de confidentialité, 5. Conditions d'utilisation, 6. Registre de traitement simplifié, 7. Mise en ligne, 9. Questions ouvertes (+22 more)

### Community 10 - "Réglages d’arbitrage simulés"
Cohesion: 0.14
Nodes (29): Amplitude minimale v − n 0,15, Arbitre sévère, Coefficient k 0,4, Délai de visage perdu 1,5 s, Durée de la phase neutre 3 s, Durée de la phase sourire 2 s, Durée de maintien 500 ms, Écart-type maximal en phase neutre 0,05 (+21 more)

### Community 11 - "Services de relais et hébergement"
Cohesion: 0.09
Nodes (29): Cloudflare Realtime TURN, Cloudflare Workers + Durable Objects, Conditions à vérifier en P1, coturn auto-hébergé, ExpressTURN, GitHub Pages, Hetzner CX23, Metered Open Relay (+21 more)

### Community 12 - "Détection MediaPipe et séquences"
Cohesion: 0.14
Nodes (26): Séquence A0 Calibrage, Séquence A5 Provocation, Aucun tiers dans la page, Délégué GPU d'abord, CPU en secours, Détecteur créé une seule fois par session, Détection MediaPipe Face Landmarker, Fichiers MediaPipe version figée, Hébergement statique (+18 more)

### Community 13 - "Écrans d’erreur D5"
Cohesion: 0.14
Nodes (25): 1. Conventions, 4. Écrans d'erreur, 5. Vérification de cohérence, 6. Questions ouvertes, D5 — Parcours utilisateur et maquettes d'écrans, n° 100 : Coupure en pleine manche, n° 102 : Page masquée ou appareil en veille, n° 103 : Abandon volontaire (+17 more)

### Community 14 - "Tests réseau P1"
Cohesion: 0.15
Nodes (22): Charge réelle, Chargement en 4G cache vide, Combinaison réseau R1 Wi-Fi deux opérateurs deux domiciles, Combinaison réseau R2 Wi-Fi et 4G, Combinaison réseau R3 4G même opérateur, Combinaison réseau R4 4G autre opérateur, Combinaison réseau R5 Wi-Fi restrictif et 4G, Combinaison réseau R6 Même Wi-Fi témoin (+14 more)

### Community 15 - "Conditions et critères P0"
Cohesion: 0.19
Nodes (20): Condition B1 pénombre, Condition B2 contre-jour, Condition B3 éclairage latéral, Condition N conditions normales, Critère G1 Aucun faux positif en N sur le groupe de validation, Critère G2 Aucun faux positif en condition dégradée acceptée, Critère G4 Calibrage réussi en N pour tous, Critère G5 Tous les sourires francs détectés en N (+12 more)

### Community 16 - "Arrêt sur image et preuve"
Cohesion: 0.18
Nodes (18): Aucun enregistrement, État Arrêt sur image, R7 Arrêt sur image, T19 Une faute retenue ou pics séparés, T20 Égalité manche rejouée, T22 Fin arrêt sur image sans vainqueur du match, Revue des détections, Image de preuve (+10 more)

### Community 17 - "Règles de travail du projet"
Cohesion: 0.35
Nodes (7): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Marquage À confirmer (P0/P1/P2), Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Documents de conception — « Ne souris pas », Décisions de cadrage lots 1-2-3 (source de vérité)

### Community 18 - "Âge et conditions d’utilisation"
Cohesion: 0.15
Nodes (17): Âge minimum : case « J'ai 18 ans ou plus », Arcom référentiel de vérification de l'âge [J15], Conditions d'utilisation, Conseil constitutionnel décision 2026-911 DC [J17], Enregistrement par l'adversaire, Loi 2023-566 majorité numérique [J16], Pharos [J21], I4 : vérification d'âge et protection des mineurs (+9 more)

### Community 19 - "Salon, session et match"
Cohesion: 0.16
Nodes (16): Manche, Match en 2 manches gagnantes, Q7 Salon verrouillé jusqu'à la fin de session, Salon, Salon verrouillé jusqu'à la fin de session, Session, Enveloppe des messages de jeu, Limite acceptée : client modifié (+8 more)

### Community 20 - "Capture et flux vidéo"
Cohesion: 0.22
Nodes (16): Capture caméra et micro, Données qui circulent, Flux caméra unique, Module WebRTC, Q9 — Vidéo en H.264 avec un iPhone, S15 — webrtcHacks Guide to Safari WebRTC, S21 — MDN codecs WebRTC, Vidéo en H.264 avec un appareil iOS (+8 more)

### Community 21 - "Score de sourire et variante"
Cohesion: 0.17
Nodes (15): Marge m, Marge m 0,05, MediaPipe Face Landmarker, Parole et départage, Plancher de la variante cheekSquint 0,20, Score brut s, Variante cheekSquint, Exposition cible 60 min (+7 more)

### Community 22 - "Bases légales et registre"
Cohesion: 0.16
Nodes (15): Base légale : exécution du service (art. 6.1.b), Base légale : intérêt légitime (art. 6.1.f), Fiche T1 — Mise en relation et relais, Fiche T2 — Hébergement du site, Information des personnes (article 13 RGPD), Mise en ligne des pages légales, CNIL modèle de registre simplifié [J11], V3 : registre pour un particulier (+7 more)

### Community 23 - "Serveur de mise en relation"
Cohesion: 0.15
Nodes (14): Ably, Code du salon, Firebase Realtime Database, Le serveur ne voit que la mise en relation, Message battement, RT9 — Page masquée, Serveur de mise en relation, Signalisation (+6 more)

### Community 24 - "Déconnexion, forfait, abandon"
Cohesion: 0.21
Nodes (13): Abandon volontaire, Délai de reconnexion 30 s, Forfait, Page masquée ou appareil en veille, Q10 Forfait selon le serveur de mise en relation, Serveur de mise en relation arbitre de présence, Critère C4 Coupures conformes à D2 §6.4, Scénario de coupure K2 Wi-Fi coupé 40 s (+5 more)

### Community 25 - "Canal, délais et jauges"
Cohesion: 0.17
Nodes (13): Absence de jauge avant grisé 1 s, Adversaire injoignable, Canal pair à pair, Comportement des jauges, Délai de connexion 20 s, Durée de l'arrêt sur image 5 s, Nouvelle mesure de cadence 5 s, Q11 Durées du déroulé (+5 more)

### Community 26 - "Images valides et fautes"
Cohesion: 0.19
Nodes (13): Deux visages dans le champ, Faute, Image de doute, Image souriante, Image valide, Images minimales par sourire 3, Images tolérées dans une série 1, Pertes avant manche perdue 2 (+5 more)

### Community 27 - "Qualification RGPD du visage"
Cohesion: 0.15
Nodes (13): Adresse IP : donnée personnelle, AI Act (règlement 2024/1689) considérant 18 [J5], CEPD lignes directrices 3/2019 [J4], CJUE Breyer C-582/14 [J1], Exemption RGPD du traitement local et pair à pair, Pas de biométrie ni de reconnaissance d'émotion, I2 : fin de l'exemption domestique entre inconnus, V2 : rôle de l'éditeur quand le flux passe par le relais (+5 more)

### Community 28 - "Écrans E1 à E11"
Cohesion: 0.17
Nodes (12): 3.10 E10 — Interruption, 3.11 E11 — Règles, 3.1 E1 — Accueil : explication et âge, 3.2 E2 — Autorisation, 3.3 E3 — Attente (hôte), 3.4 E4 — Connexion, 3.5 E5 — Calibrage, 3.6 E6 — Écran noir, compte à rebours, révélation (+4 more)

### Community 29 - "Journaux de test"
Cohesion: 0.33
Nodes (11): Fiche testeur, Journal numérique P0, Q2 — Accord des joueurs pour l'export du journal P2, Données traitées (inventaire), Fiche T3 — Tests des prototypes, V10 : base légale des testeurs (accord oral), Q5 : disque chiffré pour les journaux de test, n° 138 : Journal P2 exporté en fin de session depuis l'appareil de l'hôte,… (+3 more)

### Community 30 - "Analyse juridique D7"
Cohesion: 0.18
Nodes (11): 2.10 Enregistrement par l'adversaire, 2.1 Qui est responsable de quoi, 2.2 Pas de biométrie, pas de reconnaissance d'émotion, 2.3 Base légale, conservation, information, 2.4 Caméra, micro et stockage dans le navigateur, 2.5 Registre et analyse d'impact, 2.6 Mentions légales, 2.7 Âge minimum (+3 more)

### Community 31 - "Mentions légales et identité"
Cohesion: 0.33
Nodes (11): Identité de l'éditeur publiée plutôt qu'anonymat LCEN, LCEN (loi 2004-575) article 1-1 (loi SREN), Mentions légales, V1 : identité de l'éditeur ou anonymat LCEN, Q1 : relecture juridique dès l'ouverture au public, Q2 : identité de l'éditeur et hébergeurs, Q4 : identité publiée plutôt qu'anonymat LCEN, n° 151 : Identité de l'éditeur publiée dans les mentions légales et la… (+3 more)

### Community 32 - "Rapport de session et priorités"
Cohesion: 0.20
Nodes (10): 1. Lot 4 — D2 complet, 2. Lot 5 — D4 Architecture technique, 3. Lot 6 — D5 Parcours et maquettes, 4. Lot 7 — D6, puis D3 prototypes 1 et 2, 5. Lot 8 — D7 Juridique et confidentialité, 8. À décider en priorité, Priorité 1 : D3 Q1 (appareils), bloque P0, Rapport de session — lots 4 à 9 (+2 more)

### Community 33 - "Performance et panel P0"
Cohesion: 0.28
Nodes (9): Cadence d'analyse minimale 10 images/s, Chauffe excessive, Critère G3 Au moins 10 images/s sans chauffe excessive, Groupe de réglage, Groupe de validation, Panel de 8 testeurs, Q1 Appareils disponibles, Session performance (+1 more)

### Community 34 - "Règles R1 à R7"
Cohesion: 0.25
Nodes (8): 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité, 4.6 R6 — Départage à 60 s, 4.7 R7 — Arrêt sur image, 4. Règles d'arbitrage

### Community 35 - "Limites de mesure D2"
Cohesion: 0.25
Nodes (8): 5.1 Seuil propre à chaque joueur — décidé (n° 64), 5.2 Exagérer le sourire volontaire — nouveau risque, 5.3 Perte prolongée — décidé (n° 65), 5.4 Main devant la bouche — limite acceptée en v1 (n° 70), 5.5 Parole et départage — variante testée en P0 (n° 72), 5.6 Synchronisation des horloges — décidé (n° 66), 5.7 Deux visages dans le champ — décidé (n° 67), 5. Limites de mesure et décisions associées

### Community 36 - "Périmètre v1 (source)"
Cohesion: 0.25
Nodes (8): 3.1 Public, budget, format, 3.2 Plateforme, 3.3 Mode de jeu, 3.4 Règles d'arbitrage, 3.5 Vidéo et vie privée, 3.6 Exclusions de la v1, 3.7 Tests et critères de décision, 3. Lot 2 — Périmètre de la v1

### Community 37 - "Questions ouvertes consolidées"
Cohesion: 0.29
Nodes (7): 7.1 D2 — Règles du jeu et d'arbitrage, 7.2 D3 — Plan de tests, 7.3 D4 — Architecture technique, 7.4 D5 — Parcours et maquettes, 7.5 D6 — Lots de développement, 7.6 D7 — Juridique et confidentialité, 7. Questions ouvertes restantes, tous documents

### Community 38 - "Plafond d_max"
Cohesion: 0.70
Nodes (5): Exagérer le sourire volontaire, Q1 Plafonner le seuil à d_max, Seuil maximal d_max 0,35, Risque Seuil gonflé par exagération, Séquence C Exagération

### Community 39 - "Source de vérité"
Cohesion: 0.40
Nodes (5): 6.1 Répartition, 6.2 Pourquoi pas un arbitre central, 6.3 Divergence, 6.4 Limite acceptée en v1, 6. Source de vérité de l'arbitrage

### Community 40 - "Compatibilité D4 §7"
Cohesion: 0.40
Nodes (5): 7.1 Ce que disent les sources, 7.2 Navigateurs cibles, 7.3 Choix qui en découlent, 7.4 Performances cibles, 7. Compatibilité et performances cibles

### Community 41 - "Choix des services D4 §8"
Cohesion: 0.40
Nodes (5): 8.1 Mise en relation, 8.2 Relais TURN, 8.3 Serveur auto-hébergé en Europe, 8.4 Recommandation, 8. Mise en relation et relais : choix des services

### Community 42 - "Navigateurs et performances"
Cohesion: 0.40
Nodes (5): Compatibilité et performances cibles, Navigateurs cibles, Performances cibles, Q7 — Firefox et navigateurs iOS tiers en cible, S22 — libwebrtc webrtc_video_engine.cc

### Community 43 - "Lots de développement"
Cohesion: 0.40
Nodes (5): Lot de développement, Q1 — Durée d'une séance, n° 44 : Barème — priorité 1, n° 45 : Ordre de production, Incohérence 22 : Ordre de production

### Community 44 - "Transferts hors UE"
Cohesion: 0.50
Nodes (5): Tribunal UE Latombe T-553/23, pourvoi C-703/25 P [J20], Data Privacy Framework (décision 2023/1795) [J19], Serveur public PeerJS, V7 : transferts hors UE pendant les prototypes, Transferts hors Union européenne

### Community 45 - "Mise en page"
Cohesion: 0.50
Nodes (4): 10.1 Principes, 10.2 Téléphone, portrait, 10.3 Ordinateur ou tablette, paysage, 10. Mise en page

### Community 46 - "Messages D4"
Cohesion: 0.50
Nodes (4): 4.1 Signalisation (appareil ↔ serveur de mise en relation), 4.2 Canal de jeu (appareil ↔ appareil), 4.3 Image de preuve, 4. Messages

### Community 47 - "Coûts et volumes"
Cohesion: 0.50
Nodes (4): 9.1 Volumes, 9.2 À partir de quel volume ça coûte, 9.3 Journaux des prestataires, 9. Coûts, volumes et journaux

### Community 48 - "PWA sur iOS"
Cohesion: 0.67
Nodes (4): PWA non installée sur iOS, Q6 — Ne pas proposer l'installation PWA sur iOS, S17 — WebKit bogue 252465 (vidéo noire PWA), n° 11 : PWA web, tout navigateur récent avec caméra frontale ou webcam

### Community 49 - "Parcours et gestes"
Cohesion: 0.50
Nodes (4): 2.1 Parcours de l'hôte, 2.2 Parcours de l'invité, 2.3 Nombre de gestes, 2. Parcours

### Community 50 - "Contrôle de cohérence"
Cohesion: 0.50
Nodes (4): 6.1 Méthode et limite, 6.2 Résultats par contrôle, 6.3 Incohérences, 6. Lot 9 — Contrôle de cohérence

### Community 51 - "Horloges et cadence"
Cohesion: 0.67
Nodes (3): 5.1 Synchronisation des horloges, 5.2 Cadence d'analyse, 5. Horloges et cadence

### Community 52 - "Vérifications juridiques"
Cohesion: 0.67
Nodes (3): 8.1 Avant l'ouverture au public, 8.2 Avant le mode inconnus, 8. Points à faire vérifier par un professionnel

## Ambiguous Edges - Review These
- `L2.2 — Arbitrage réparti` → `Critère A1 Aucune contestation fondée`  [AMBIGUOUS]
  docs/D6-lots-developpement.md · relation: references

## Knowledge Gaps
- **226 isolated node(s):** `Décisions de cadrage lots 1-2-3 (source de vérité)`, `1.1 Objectif et risques testés`, `1.2.1 Testeurs`, `1.2.2 Conditions`, `1.2.3 Appareils` (+221 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 229 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `L2.2 — Arbitrage réparti` and `Critère A1 Aucune contestation fondée`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `D7 — Documents juridiques et confidentialité` connect `Documents juridiques D7` to `Machine à états du match`, `Structure de D2`, `Plan de tests P1 et P2`, `Architecture et risques D4`, `Garde-fous P2 et arbitrage en jeu`, `Cadrage et journal des décisions`, `Services de relais et hébergement`, `Écrans d’erreur D5`, `Arrêt sur image et preuve`, `Règles de travail du projet`, `Âge et conditions d’utilisation`, `Salon, session et match`, `Capture et flux vidéo`, `Bases légales et registre`, `Qualification RGPD du visage`, `Journaux de test`, `Analyse juridique D7`, `Mentions légales et identité`, `Rapport de session et priorités`, `Lots de développement`, `Transferts hors UE`, `Vérifications juridiques`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **Why does `D2 — Règles du jeu et d'arbitrage` connect `Structure de D2` to `Machine à états du match`, `Plan de tests P1 et P2`, `Architecture et risques D4`, `Garde-fous P2 et arbitrage en jeu`, `Cadrage et journal des décisions`, `Cadence, écran noir et révélation`, `Note de cadrage D1`, `Documents juridiques D7`, `Réglages d’arbitrage simulés`, `Détection MediaPipe et séquences`, `Écrans d’erreur D5`, `Conditions et critères P0`, `Arrêt sur image et preuve`, `Règles de travail du projet`, `Âge et conditions d’utilisation`, `Salon, session et match`, `Score de sourire et variante`, `Serveur de mise en relation`, `Déconnexion, forfait, abandon`, `Canal, délais et jauges`, `Images valides et fautes`, `Rapport de session et priorités`, `Règles R1 à R7`, `Limites de mesure D2`, `Plafond d_max`, `Lots de développement`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **Why does `D3 — Plan de tests et critères de décision` connect `Plan de tests P1 et P2` to `Machine à états du match`, `Structure de D2`, `Architecture et risques D4`, `Garde-fous P2 et arbitrage en jeu`, `Cadrage et journal des décisions`, `Note de cadrage D1`, `Protocole prototype 0`, `Documents juridiques D7`, `Réglages d’arbitrage simulés`, `Services de relais et hébergement`, `Détection MediaPipe et séquences`, `Écrans d’erreur D5`, `Tests réseau P1`, `Conditions et critères P0`, `Arrêt sur image et preuve`, `Règles de travail du projet`, `Score de sourire et variante`, `Images valides et fautes`, `Journaux de test`, `Rapport de session et priorités`, `Performance et panel P0`, `Navigateurs et performances`, `Lots de développement`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `D7 — Documents juridiques et confidentialité` (e.g. with `Données qui circulent` and `Case d'âge 18 ans`) actually correct?**
  _`D7 — Documents juridiques et confidentialité` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Décisions de cadrage lots 1-2-3 (source de vérité)`, `1.1 Objectif et risques testés`, `1.2.1 Testeurs` to the rest of the system?**
  _226 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Machine à états du match` be split into smaller, more focused modules?**
  _Cohesion score 0.054340396445659606 - nodes in this community are weakly interconnected._