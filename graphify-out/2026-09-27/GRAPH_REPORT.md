# Graph Report - ne-souris-pas  (2026-09-27)

## Corpus Check
- 31 files · ~84,607 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 1429 nodes · 4192 edges · 75 communities
- Extraction: 95% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 188 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4b2a09bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- D4 — Architecture technique
- §4.2 Canal de jeu
- 6.3 Tableau des transitions
- R5 — Horodatage et simultanéité
- E1 Accueil
- Source de cadrage lots 1-2-3
- D2-regles-jeu-arbitrage.md
- 14. Sources
- L0.4 — Sourire et jauge
- D7-juridique-confidentialite.md
- 3. Tableau des réglages
- README.md
- 6. Déroulé du match
- journal.test.mjs
- 3. Écrans
- 10. Sources
- D5-parcours-maquettes.md
- D1 — Note de cadrage
- V1 — Revanche spontanée dans ≥ 5 matchs sur 10
- D6 §2 Vue d'ensemble
- n° 216 : Disque de l'ordinateur de Valentin non protégé (BitLocker chiffré, pro…
- D3-plan-de-tests.md
- 2.2.1 Combinaisons de réseaux
- main.js
- 3.1 Objectif et risques testés (P2)
- 3.5 Questionnaire aux testeurs
- 4. Écrans d'erreur
- calibrage.test.mjs
- Rapport de session — lots 4 à 9
- cadence.js
- R2 — Détection du sourire
- 13. Questions ouvertes
- 2.2 Pas de biométrie, pas de reconnaissance d'émotion
- Rapport §1 Lot 4 — D2 complet
- Rapport §2 Lot 5 — D4 Architecture technique
- 2.5 Registre et analyse d'impact
- D1 §4 Ce qu'on ne construit pas
- D1 §6 À quoi saura-t-on que la v1 a réussi
- pertes.test.mjs
- G3 — ≥ 10 images/s sans chauffe excessive
- n° 69 : « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, n…
- arbitrage.test.mjs
- protocole.js
- C4 — K1 à K7 conformes sur iPhone et Android
- 7.1 Ce que disent les sources
- R4 — Visage perdu
- 4. Questions ouvertes (D3)
- Priorité 4 : incohérences 9 à 13 (libellés et écrans)
- E9 Fin de match
- mesures.test.mjs
- D1 §5.2 Risques
- 6.2 Machine à états
- 1.3 Protocole pas à pas
- Texte : Politique de confidentialité
- 1. Données traitées
- §10 Valeurs de départ simulées
- 2.1 Qui est responsable de quoi
- D8-journal-decisions.md
- 12. Risques techniques
- 7.4 Performances cibles
- n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…
- 7.2 Navigateurs cibles
- n° 159 : Le salon se verrouille à deux joueurs dès l'arrivée de l'invité et exp…
- 2.9 Transferts hors de l'Union européenne
- 8.1 Avant l'ouverture au public
- Projet Ne souris pas — instructions de conception
- Texte : Mentions légales
- E6 Écran noir et compte à rebours
- D6 — Découpage en lots de développement
- 8.4 Recommandation
- 8.3 Serveur auto-hébergé en Europe
- D7 — Documents juridiques et confidentialité
- 8.2 Avant le mode inconnus
- 5. Limites de mesure et décisions associées
- RT9 — Page masquée : minuteries ralenties, caméra coupée

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
- `rejouer()` --calls--> `creerSuiviPertes()`  [EXTRACTED]
  tests/pertes.test.mjs → app/js/pertes.js
- `Projet Ne souris pas — instructions de conception` --references--> `Décisions de cadrage lots 1-2-3 (source de vérité)`  [EXTRACTED]
  CLAUDE.md → sources/cadrage-lots-1-2-3.md
- `Projet Ne souris pas — instructions de conception` --references--> `D4 — Architecture technique`  [EXTRACTED]
  CLAUDE.md → docs/D4-architecture-technique.md
- `D4 — Architecture technique` --references--> `Source de cadrage lots 1-2-3`  [EXTRACTED]
  docs/D4-architecture-technique.md → sources/cadrage-lots-1-2-3.md
- `Projet Ne souris pas — instructions de conception` --references--> `D1 — Note de cadrage`  [EXTRACTED]
  CLAUDE.md → docs/D1-note-de-cadrage.md

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

## Communities (75 total, 0 thin omitted)

### Community 0 - "D4 — Architecture technique"
Cohesion: 0.12
Nodes (32): Périmètre v1 : Budget, Décision P1 : Changer de mise en relation, D4 — Architecture technique, n° 111 : Aucun tiers dans la page : ni mesure d'audience, ni police, ni script…, n° 123 : Pas d'installation de la PWA proposée sur iOS ; le jeu se lance depuis…, n° 163 : Si le serveur public PeerJS fait échouer P1, ≈ 4,57 € par mois sont ac…, n° 175 : Lot L0.1 : la page est installable, sauf sur iOS où aucune installatio…, n° 176 : Lot L1.1 : bibliothèque cliente PeerJS servie par l'hébergement de la… (+24 more)

### Community 1 - "§4.2 Canal de jeu"
Cohesion: 0.06
Nodes (44): 11. Points d'extension pour le mode inconnus, 3. Données qui circulent, §4.1 Signalisation, 4.1 Signalisation (appareil ↔ serveur de mise en relation), §4.2 Canal de jeu, 4.2 Canal de jeu (appareil ↔ appareil), 4. Messages, 5.2 Cadence d'analyse (+36 more)

### Community 2 - "6.3 Tableau des transitions"
Cohesion: 0.15
Nodes (23): État Accueil, État Attente, État Autorisation, État Erreur salon, État Manche, État Salon expiré, Durée de vie d'un salon sans invité 15 min, 6.3 Tableau des transitions (+15 more)

### Community 3 - "R5 — Horodatage et simultanéité"
Cohesion: 0.18
Nodes (31): Q6 tranchée : e = a_min / 2, W = max(100 ms, e + i), R5 — Horodatage et simultanéité, Allers-retours de synchronisation 5 par révélation, Fenêtre de simultanéité minimale 100 ms, Multiplicateur de l'erreur d'horloge 1, 5.6 Synchronisation des horloges, Aller-retour minimal a_min, Erreur d'horloge e (+23 more)

### Community 4 - "E1 Accueil"
Cohesion: 0.16
Nodes (18): Case « J'ai 18 ans ou plus », Bouton « Créer un duel », E1 Accueil, Lien « Conditions d'utilisation », Lien « Confidentialité », Lien « Mentions légales », Bouton « Rejoindre le duel », 5. Conditions d'utilisation (+10 more)

### Community 5 - "Source de cadrage lots 1-2-3"
Cohesion: 0.11
Nodes (28): 1. Principes, 6.2 Pourquoi pas un arbitre central, Serveur de mise en relation, Principe 1 — L'analyse reste sur l'appareil, Principe 2 — La vidéo va de pair à pair, Principe 3 — Le serveur ne voit que la mise en relation, Principe 4 — Rien n'est stocké, 4. Politique de confidentialité (+20 more)

### Community 6 - "D2-regles-jeu-arbitrage.md"
Cohesion: 0.07
Nodes (49): Délai de visage perdu 1,5 s, 1.5.1 Pic soutenu, 1.5.2 Intervalle de `k`, 1.5.3 Ordre des réglages, 1.5 Méthode de réglage du seuil, Séquence A0 — Calibrage, Étape de réglage 10 : Vérification, Étape de réglage 2 : Coefficient k (+41 more)

### Community 7 - "14. Sources"
Cohesion: 0.12
Nodes (26): 14. Sources, 8.1 Mise en relation, Cloudflare Workers + Durable Objects, Firebase Realtime Database, PeerJS, serveur auto-hébergé (peer 1.0.2), PeerJS, serveur public, Supabase Realtime, S10 Can I use RTCPeerConnection (+18 more)

### Community 8 - "L0.4 — Sourire et jauge"
Cohesion: 0.11
Nodes (42): H1 : La détection est assez fiable pour être acceptée, Risque : Arbitrage injuste (faux positifs), Risque : Faux positifs dus à la parole, à la barbe, à une bouche relevée, Risque : Triche : main devant la bouche, tête tournée, 1.6.2 Décisions et effet sur D2, Séquence A1 — Neutre silencieux, Séquence A2 — Parole libre, Séquence A3 — Voyelles tenues (+34 more)

### Community 9 - "D7-juridique-confidentialite.md"
Cohesion: 0.19
Nodes (23): n° 148 : L'éditeur se considère responsable des traitements d'adresses IP (mise…, n° 149 : Vocabulaire imposé : « détection du sourire », jamais « détection des…, n° 150 : Bases légales : exécution du service pour la mise en relation et le re…, n° 151 : Identité de l'éditeur publiée dans les mentions légales et la politiqu…, n° 152 : Aucun cookie, traceur ni stockage dans le navigateur, donc aucun bande…, n° 153 : Registre simplifié tenu (mise en relation et relais, hébergement, test…, n° 154 : Pas d'analyse d'impact en v1 entre amis ; analyse d'impact préalable a…, n° 155 : Conditions d'utilisation : 18 ans minimum déclarés ; neuf comportement… (+15 more)

### Community 10 - "3. Tableau des réglages"
Cohesion: 0.14
Nodes (36): 2. Définitions, 3. Tableau des réglages, R1 — Calibrage, R3 — Zone de doute et jauge, Amplitude minimale v − n 0,15, Coefficient k 0,4, Durée de la phase neutre 3 s, Durée de la phase sourire 2 s (+28 more)

### Community 11 - "README.md"
Cohesion: 0.10
Nodes (29): État Navigateur incompatible, T32 : Ouverture → Navigateur incompatible (Ouverture), 3.2 Panel et organisation (P2), D4 Q10 — Nom de domaine reporté (n° 46) , 5. Vérification de cohérence, ER8 Navigateur incompatible, D5 Q4 — Ajouts dans D2 : état Navigateur incompatible, erreur de version, caméra occupée, panneau des règles, D6 §6 Questions ouvertes (D6) (+21 more)

### Community 12 - "6. Déroulé du match"
Cohesion: 0.10
Nodes (31): 6. Déroulé du match, 7. Questions ouvertes, État Interrompu, Q10 tranchée : forfait arbitré par le serveur de mise en relation, Q11 tranchée : durées du déroulé validées comme valeurs de départ, Q13 tranchée : repère du pic sur les jauges, Q9 tranchée : manche interrompue rejouée, avec garde-fou, Absence de jauge avant grisé 1 s (+23 more)

### Community 13 - "journal.test.mjs"
Cohesion: 0.17
Nodes (12): cellule(), COLONNES, creerJournal(), nombre(), ref_node_assert, ref_node_fs, ref_node_test, bs() (+4 more)

### Community 14 - "3. Écrans"
Cohesion: 0.10
Nodes (26): État Connexion, État Erreur connexion, Délai de connexion 20 s, T10 : Calibrage → Calibrage (A réussit son calibrage), T11 : Calibrage → Calibrage (A échoue (R1)), T8 : Connexion → Calibrage (Canal établi), T9 : Connexion → Erreur connexion (Échec après 20 s), 3.1 E1 — Accueil : explication et âge (+18 more)

### Community 15 - "10. Sources"
Cohesion: 0.19
Nodes (17): 10. Sources, 2.3 Base légale, conservation, information, 2.6 Mentions légales, 2.7 Âge minimum, 2. Analyse, J13 Loi 2004-575 (LCEN), articles 1-1 et 1-2, J14 Service-public.fr, mentions obligatoires d'un site, J15 Arcom, référentiel de vérification de l'âge (+9 more)

### Community 16 - "D5-parcours-maquettes.md"
Cohesion: 0.11
Nodes (34): 2.1 Parcours de l'hôte, 2.2 Parcours de l'invité, 2.3 Nombre de gestes, 2. Parcours, 6. Questions ouvertes, Bouton « Commencer », D5 — Parcours utilisateur et maquettes d'écrans, D5 Q1 — Vouvoiement (+26 more)

### Community 17 - "D1 — Note de cadrage"
Cohesion: 0.10
Nodes (22): 1. Ce qu'on construit, 2. Pour qui, 3. Périmètre de la v1, 4. Ce qu'on ne construit pas, 5.1 Hypothèses critiques, 5.2 Risques, 5. Hypothèses et risques, 6.1 Critère de réussite (+14 more)

### Community 18 - "V1 — Revanche spontanée dans ≥ 5 matchs sur 10"
Cohesion: 0.12
Nodes (32): Garde-fou P2 : ennui, H2 : Voir l'autre lutter suffit à faire rire, H3 : Une partie courte donne envie de rejouer, H5 : L'application apporte plus qu'un appel vidéo, Risque : Ennui : sans provocation, il ne se passe rien, D1 §5.1 Hypothèses critiques, D1 §5 Hypothèses et risques, 5.4 Main devant la bouche (+24 more)

### Community 19 - "D6 §2 Vue d'ensemble"
Cohesion: 0.11
Nodes (40): Risque : Échec de connexion sur certains réseaux, Risque : Latence vidéo, 2. Prototype 1 — appel vidéo seul, C1 — 10 réussites sur 10 par combinaison, C2 — Établissement en 20 s au plus, C3 — ≥ 19 flashs sur 20 avec écart ≤ e + i, C6 — Image et son des deux côtés sur iOS, Décision P1 : Changer de relais (+32 more)

### Community 20 - "n° 216 : Disque de l'ordinateur de Valentin non protégé (BitLocker chiffré, pro…"
Cohesion: 0.09
Nodes (32): 1.4.1 Journal numérique, 1.4.2 Fiche testeur, 1.4.3 Calibrage, 1.4.4 Séquences en conditions normales, 1.4.5 Sourires commandés (A6), 1.4.6 Mouvements (A7), 1.4.7 Conditions dégradées, 1.4.8 Performance (+24 more)

### Community 21 - "D3-plan-de-tests.md"
Cohesion: 0.14
Nodes (35): D6 §1 Conventions, n° 134 : Développement découpé en 18 lots : 7 pour P0, 5 pour P1, 6 pour P2 ; c…, n° 135 : Un lot est « terminé » quand son critère est vérifié sur un appareil r…, n° 136 : Pour chaque test en échec : lots modifiés, abandonnés ou suspendus. Pr…, n° 137 : L'outil de rejeu (L0.7) utilise le même code d'arbitrage qu'en jeu, ja…, n° 139 : Pages légales (D7) en ligne avant le premier test P2. Avance la Priori…, n° 140 : P1 : sept combinaisons de réseaux (deux box, Wi-Fi et 4G, 4G même opér…, n° 141 : Erreur réelle des horloges mesurée par un flash commun filmé par les d… (+27 more)

### Community 22 - "2.2.1 Combinaisons de réseaux"
Cohesion: 0.08
Nodes (36): Risque : Éclairage et angles, 1.2.1 Testeurs, 1.2.2 Conditions, 1.2.3 Appareils, 1.2.4 Volume et durée, 1.2 Panel, iPhone 15 (2023), iPhone XR (2018) (+28 more)

### Community 23 - "main.js"
Cohesion: 0.12
Nodes (37): app_js_capture, app_js_capture_demarrercamera, afficher(), afficherManche(), afficherProtocole(), arreterManche(), BS_CANDIDATS, calibrages (+29 more)

### Community 24 - "3.1 Objectif et risques testés (P2)"
Cohesion: 0.12
Nodes (33): H4 : Les joueurs acceptent d'être filmés et analysés, Risque : Vie privée des flux vidéo, 3. Prototype 2 — duel complet, 4. Questions ouvertes, D3 — Plan de tests et critères de décision, Journal P2 : engagement (revanche, t_lien_duel), Journal P2 : identification (session, match, manche, app_hote, app_invite), Journal P2 : issue de la manche (duree, cause, perdant, ecart_fautes, pics) (+25 more)

### Community 25 - "3.5 Questionnaire aux testeurs"
Cohesion: 0.12
Nodes (19): Question 1 : Vous êtes-vous amusé ?, Question 11 : Garder ou partager l'image ?, Question 12 : Gêne d'être filmé et analysé, Question 15 : Difficultés ou confusion dans l'application, Question 16 : joué pareil en simple appel vidéo ?, Question 2 : Ce qui a fait rire, ou pas, Question 3 : L'arbitrage a-t-il paru juste ?, Question 5 : Sourire non vu ? (+11 more)

### Community 26 - "4. Écrans d'erreur"
Cohesion: 0.18
Nodes (18): État Erreur caméra, État Erreur version, T27 : Interrompu → Fin de match (30 s dépassées), T3 : Autorisation → Erreur caméra (Accès refusé), T33 : Connexion → Erreur version (Canal établi), 4. Écrans d'erreur, Bouton « Créer un nouveau duel », ER1 Caméra refusée (+10 more)

### Community 27 - "calibrage.test.mjs"
Cohesion: 0.20
Nodes (13): ecartType(), evaluerCalibrage(), lisser(), mediane(), MESSAGES, moyenne(), part(), unVisage() (+5 more)

### Community 28 - "Rapport de session — lots 4 à 9"
Cohesion: 0.11
Nodes (18): 1. Lot 4 — D2 complet, 2. Lot 5 — D4 Architecture technique, 3. Lot 6 — D5 Parcours et maquettes, 4. Lot 7 — D6, puis D3 prototypes 1 et 2, 5. Lot 8 — D7 Juridique et confidentialité, 6.1 Méthode et limite, 6.2 Résultats par contrôle, 6.3 Incohérences (+10 more)

### Community 29 - "cadence.js"
Cohesion: 0.23
Nodes (12): CADENCE_MAX, creerCompteurPauses(), creerFenetre(), creerLimiteur(), creer(), lancerAnalyse(), modeParDefaut(), preparerMoteur() (+4 more)

### Community 30 - "R2 — Détection du sourire"
Cohesion: 0.12
Nodes (24): 4.6 R6 — Départage à 60 s, R2 — Détection du sourire, R6 — Départage à 60 s, Durée de la manche 60 s, Durée de maintien 500 ms, Images minimales par sourire 3 images, Images tolérées dans une série 1 image, Plancher de la variante cheekSquint 0,20 (+16 more)

### Community 31 - "13. Questions ouvertes"
Cohesion: 0.21
Nodes (15): §10.1 Principes de mise en page, 10.1 Principes, 10.2 Téléphone, portrait, 10.3 Ordinateur ou tablette, paysage, 10. Mise en page, 13. Questions ouvertes, Cible — PWA installée, D4 Q5 — Vidéos empilées en portrait (+7 more)

### Community 32 - "2.2 Pas de biométrie, pas de reconnaissance d'émotion"
Cohesion: 0.33
Nodes (6): 2.2 Pas de biométrie, pas de reconnaissance d'émotion, Donnée : Mesures du visage, J4 CEPD, lignes directrices 3/2019 sur les dispositifs vidéo, J5 Règlement (UE) 2024/1689 (AI Act), considérant 18, Politique de confidentialité 3. La détection du sourire, V6 Qualification non biométrique et hors reconnaissance des émotions

### Community 33 - "Rapport §1 Lot 4 — D2 complet"
Cohesion: 0.19
Nodes (20): Risque P1 : coupure mal gérée, n° 100 : Coupure en pleine manche : une faute déjà annoncée reste acquise ; sin…, n° 101 : Forfait après 30 s contre le joueur que le serveur de mise en relation…, n° 102 : Page masquée ou appareil en veille : perte de visage (R4), sans except…, n° 103 : Abandon volontaire : bouton avec confirmation ; la manche continue pen…, n° 104 : Revanche : acceptée par les deux dans les 60 s ; nouveau match à 0–0,…, n° 105 : Jauges : cachées hors manche ; figées en décision et sur image invalid…, n° 106 : Durées : écran noir 2 s au moins ; compte à rebours 3 s ; arrêt sur im… (+12 more)

### Community 34 - "Rapport §2 Lot 5 — D4 Architecture technique"
Cohesion: 0.18
Nodes (18): 9.3 Journaux des prestataires, D4 Q4 — Journaux conservés 7 jours, D5 Q5 — Vidéos empilées en portrait (D4 Q5), n° 112 : Un seul flux caméra et micro par appareil, partagé entre la détection…, n° 116 : Source de vérité : chaque appareil pour les fautes de son joueur ; déc…, n° 117 : Image de preuve : JPEG de 480 pixels de large, qualité 0,7, envoyée en…, n° 118 : Mise en page : vidéos empilées en portrait (adversaire en haut), côte…, n° 119 : Prototypes P1 et P2 : mise en relation par le serveur public PeerJS, r… (+10 more)

### Community 35 - "2.5 Registre et analyse d'impact"
Cohesion: 0.29
Nodes (7): 2.5 Registre et analyse d'impact, 6. Registre de traitement simplifié, J10 CNIL, registre des activités de traitement, J11 CNIL, modèle de registre simplifié, J12 CNIL, liste des traitements soumis à AIPD, Registre T2 — Hébergement du site, V3 Registre pour un particulier sans activité économique

### Community 36 - "D1 §4 Ce qu'on ne construit pas"
Cohesion: 0.15
Nodes (13): Exclu v1 : Clip partageable du fou rire, Exclu v1 : Comptes, classements, historique, Exclu v1 : Détection sonore du rire, Exclu v1 : Jeu avec des inconnus, Exclu v1 : Mode soirée sur grand écran, Exclu v1 : Monétisation, Risque : Monétisation faible, D1 §4 Ce qu'on ne construit pas (+5 more)

### Community 37 - "D1 §6 À quoi saura-t-on que la v1 a réussi"
Cohesion: 0.11
Nodes (26): Critère de réussite P2 : revanche spontanée, Définition : 100 % des connexions, Définition : chauffe excessive, Définition : conditions normales, Exclu v1 : Provocations de l'application, Garde-fou P0 : aucun faux positif, Garde-fou P0 : performance ≥ 10 images/s, Garde-fou P1 : 100 % des connexions (+18 more)

### Community 38 - "pertes.test.mjs"
Cohesion: 0.24
Nodes (5): creerSuiviPertes(), evaluer(), evenement(), creerPreuve(), rejouer()

### Community 39 - "G3 — ≥ 10 images/s sans chauffe excessive"
Cohesion: 0.20
Nodes (17): H6 : Chaque joueur a un appareil récent avec caméra correcte, Risque : Chauffe et batterie sur iOS, C5 — G3 tenu pendant l'appel réel, Décision P0 : Ajustement — performance, Décision P1 : Alléger la charge, G3 — ≥ 10 images/s sans chauffe excessive, Risque P1 : performance avec un vrai appel, 1.3.8 Session performance (+9 more)

### Community 40 - "n° 69 : « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, n…"
Cohesion: 0.17
Nodes (15): 4.1 R1 — Calibrage, 4.2 R2 — Détection du sourire, 4.3 R3 — Zone de doute et jauge, 4.4 R4 — Visage perdu, 4.5 R5 — Horodatage et simultanéité, 4.7 R7 — Arrêt sur image, 4. Règles d'arbitrage, R7 — Arrêt sur image (+7 more)

### Community 41 - "arbitrage.test.mjs"
Cohesion: 0.26
Nodes (11): creerLissage(), creerPicSoutenu(), creerSuiviSourire(), etatImage(), imageValide(), jauge(), traiterManche(), manche() (+3 more)

### Community 42 - "protocole.js"
Cohesion: 0.24
Nodes (8): avancerSequence(), repondreRevue(), classerRevue(), dureeTotale(), etapeA(), operateurAVu(), SEQUENCES, toucheOperateur()

### Community 43 - "C4 — K1 à K7 conformes sur iPhone et Android"
Cohesion: 0.42
Nodes (10): Risque : Mise en veille, blocage du son sur iOS, C4 — K1 à K7 conformes sur iPhone et Android, K1 — Wi-Fi de A coupé 10 s, K2 — Wi-Fi de A coupé 40 s, K3 — A dans une autre application 5 s, K4 — A dans une autre application 40 s, K5 — A verrouille l'écran 10 s, K6 — A ferme l'onglet (+2 more)

### Community 44 - "7.1 Ce que disent les sources"
Cohesion: 0.14
Nodes (18): 7.1 Ce que disent les sources, RT8 — Lecture automatique bloquée sur iOS, S1 MediaPipe setup web, S14 WebKit video policies iOS, S15 webrtcHacks Safari WebRTC, S2 npm tasks-vision, S3 Modèle Face Landmarker, S4 Face landmark guide (+10 more)

### Community 45 - "R4 — Visage perdu"
Cohesion: 0.23
Nodes (13): Q1-Q8 premier brouillon tranchées : voir D8, R4 — Visage perdu, Écart de pics pour égalité 0,05, Perte continue maximale 5 s, Pertes avant manche perdue 2 pertes par manche, 5.3 Perte prolongée, 5.7 Deux visages dans le champ, 6.4.4 Page masquée ou appareil en veille (+5 more)

### Community 46 - "4. Questions ouvertes (D3)"
Cohesion: 0.10
Nodes (28): 1.1 Objectif et risques testés, 1.6.1 Critères, 1.6 Critères de décision, 1. Prototype 0 — détection seule, sans réseau, Détection faux positif, Détection litigieuse, Revue d'une détection, Risque P0 : calibrage trop strict ou trop laxiste (+20 more)

### Community 47 - "Priorité 4 : incohérences 9 à 13 (libellés et écrans)"
Cohesion: 0.50
Nodes (4): D3 Q1 (rapport), Priorité 1 : D3 Q1 (appareils), Priorité 4 : incohérences 9 à 13 (libellés et écrans), Rapport §8 À décider en priorité

### Community 48 - "E9 Fin de match"
Cohesion: 0.23
Nodes (13): État Fin de match, État Fin de session, Q8 tranchée : recalibrer à chaque revanche, Délai de revanche 60 s, T28 : Fin de match → Fin de match (A accepte la revanche), T29 : Fin de match → Calibrage (Les deux acceptent la revanche), T30 : Fin de match → Fin de session (A quitte), T31 : Fin de match → Fin de session (60 s sans accord des deux) (+5 more)

### Community 49 - "mesures.test.mjs"
Cohesion: 0.38
Nodes (7): mesurer(), angles(), largeur(), luminance(), rectangle(), scores(), valeurs()

### Community 50 - "D1 §5.2 Risques"
Cohesion: 0.29
Nodes (11): Exclu v1 : Différenciation face aux filtres et acquisition de joueurs, Risque : Acquisition : il faut convaincre deux personnes, Risque : Différenciation face aux filtres des réseaux sociaux, D1 §5.2 Risques, Question 13 : Rejouer avec un autre ami ?, Question 14 : Jouer avec un inconnu ?, Risque P2 : différenciation face aux filtres ; acquisition, n° 164 : D1 porte un tableau des risques de la source §2.3, chacun relié à un t… (+3 more)

### Community 51 - "6.2 Machine à états"
Cohesion: 0.25
Nodes (17): État Arrêt sur image, État Calibrage, État Décision, État Écran noir, État En jeu, Q12 tranchée : son ouvert pendant l'écran noir, Q14 tranchée : décisions divergentes, manche rejouée, 6.2 Machine à états (+9 more)

### Community 52 - "1.3 Protocole pas à pas"
Cohesion: 0.22
Nodes (9): 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole, 1.3.2 Préparation (5 min, avant l'arrivée du testeur), 1.3.3 Accueil (3 min), 1.3.4 Séquences en conditions normales (environ 15 min), 1.3.5 Conditions dégradées (environ 8 min), 1.3.6 Exagération (environ 3 min), 1.3.7 Fin de session (3 min), 1.3.8 Session performance (Valentin seul, par appareil) (+1 more)

### Community 53 - "Texte : Politique de confidentialité"
Cohesion: 0.20
Nodes (10): Bloc « Votre caméra et votre micro », 2.10 Enregistrement par l'adversaire, Conditions d'utilisation 3. Ce qui est interdit, Politique de confidentialité 11. Mise à jour, Politique de confidentialité 2. Votre caméra et votre micro, Politique de confidentialité 4. Ce que votre adversaire peut faire, Politique de confidentialité 5. Les données que nous traitons, Politique de confidentialité 6. Qui reçoit ces données ? (+2 more)

### Community 54 - "1. Données traitées"
Cohesion: 0.22
Nodes (9): D4 Q8 — Hébergement du prototype : GitHub Pages, 1. Données traitées, Donnée : Code du salon et descriptions de connexion, Donnée : Image de preuve, Donnée : Image et son de la caméra, Donnée : Jauge, événements de jeu et informations techniques, Donnée : Volume relayé, Services utilisés (prototypes et ouverture) (+1 more)

### Community 55 - "§10 Valeurs de départ simulées"
Cohesion: 0.25
Nodes (11): Q2-Q4 valeurs simulées tranchées : voir D8, Cadence d'analyse maximale 15 images/s, Cadence d'analyse minimale 10 images/s, Cadence d'analyse, Image analysée, Intervalle d'image i, n° 115 : Cadence négociée à la connexion (message bonjour), puis refixée par l'…, n° 86 : Cadence d'analyse : 15 images/s, plafonnée et identique sur les deux a… (+3 more)

### Community 56 - "2.1 Qui est responsable de quoi"
Cohesion: 0.22
Nodes (9): 2.1 Qui est responsable de quoi, 2.4 Caméra, micro et stockage dans le navigateur, I2 Fin de l'exemption domestique entre inconnus, J1 CJUE, 19 octobre 2016, Breyer, C-582/14, J2 CNIL, « L'adresse IP est une donnée à caractère personnel », J3 CNIL, recommandation « applications mobiles », 24 septembre 2024, J9 CNIL, cookies et traceurs, « Que dit la loi ? », Politique de confidentialité 8. Cookies (+1 more)

### Community 57 - "D8-journal-decisions.md"
Cohesion: 0.22
Nodes (14): Reprise 1 : D2 §3, valeurs mesurées, Reprise 2 : D4 §5 et §7, Reprise 3 : critères « Terminé quand » de D6, D6 §5 Reprise des documents après le prototype 0, 1. Conventions, 4. Lot 3 — Documents à concevoir, 6. Questions ouvertes, D8 — Journal des décisions (+6 more)

### Community 58 - "12. Risques techniques"
Cohesion: 0.10
Nodes (27): 12. Risques techniques, 2. Schéma des composants, 7.3 Choix qui en découlent, 7. Compatibilité et performances cibles, 8. Mise en relation et relais : choix des services, Choix — Détecteur créé une seule fois par session, Choix — Un seul flux caméra et micro partagé, Choix — Délégué GPU d'abord, CPU en secours (+19 more)

### Community 59 - "7.4 Performances cibles"
Cohesion: 0.24
Nodes (10): 7.4 Performances cibles, Performance — Cadence d'analyse : 10 à 15 images/s, Performance — Chauffe : critère G3, Performance — Établissement de la connexion ≤ 20 s, Performance — Image de preuve reçue ≤ 2 s, Performance — Modèle prêt ≤ 15 s en 4G, Performance — Premier chargement ≤ 3 s en 4G, Performance — Retard vidéo ≤ 300 ms (+2 more)

### Community 60 - "n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…"
Cohesion: 0.36
Nodes (8): 9.1 Volumes, 9. Coûts, volumes et journaux, Choix — H.264 si un appareil iOS est dans le duel, Performance — Vidéo envoyée 640 × 480, ≤ 1,7 Mbit/s, D4 Q9 — H.264 quand un iPhone joue , S22 libwebrtc webrtc_video_engine, S43 webrtcHacks statistiques 2016, n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…

### Community 61 - "7.2 Navigateurs cibles"
Cohesion: 0.31
Nodes (9): 7.2 Navigateurs cibles, Cible — Chrome Android, Cible — Chrome, Edge ordinateur, Cible — Chrome ou Firefox pour iOS, Cible — Firefox ordinateur, Cible — Safari iOS/iPadOS 15+, Cible — Safari macOS 15+, D4 Q7 — Firefox et navigateurs iOS non-Safari : cibles selon P0 et P1 (+1 more)

### Community 62 - "n° 159 : Le salon se verrouille à deux joueurs dès l'arrivée de l'invité et exp…"
Cohesion: 0.23
Nodes (12): Périmètre v1 : Arbitrage, Périmètre v1 : Déroulé, Périmètre v1 : Jeu, Périmètre v1 : Technique, Périmètre v1 : Vie privée, D1 §3 Périmètre de la v1, Q7 tranchée : salon verrouillé à deux, expire à la fin de la session, 6.5.3 Salon et revanche (+4 more)

### Community 63 - "2.9 Transferts hors de l'Union européenne"
Cohesion: 0.29
Nodes (7): Donnée — Adresse IP, 2.9 Transferts hors de l'Union européenne, J19 Décision d'exécution (UE) 2023/1795 (Data Privacy Framework), J20 Tribunal de l'UE, T-553/23, Latombe ; pourvoi C-703/25 P, Politique de confidentialité 7. Hors de l'Union européenne, Registre T1 — Mise en relation et relais, V7 Transferts hors UE pendant les prototypes

### Community 64 - "8.1 Avant l'ouverture au public"
Cohesion: 0.29
Nodes (7): 8.1 Avant l'ouverture au public, D7 Q4 — Identité de l'éditeur publiée, V1 Identité de l'éditeur ou anonymat LCEN, V10 Base légale et information des testeurs (accord oral), V11 Rédaction des conditions d'utilisation, V5 Conservation des données de connexion (décret 2021-1362), V9 Durée de conservation des journaux (7 jours)

### Community 65 - "Projet Ne souris pas — instructions de conception"
Cohesion: 0.33
Nodes (6): Procédure de fin de lot (README, commit, synthèse), Utilisation du graphe graphify, Marquage À confirmer (P0/P1/P2), Projet Ne souris pas — instructions de conception, Règles de travail documentaires (autocritique, À confirmer P0/P1/P2, liens relatifs), Décisions de cadrage lots 1-2-3 (source de vérité)

### Community 66 - "Texte : Mentions légales"
Cohesion: 0.50
Nodes (4): 3. Mentions légales, Conditions d'utilisation 7. En cas de problème, J21 Pharos, plateforme de signalement, Texte : Mentions légales

### Community 67 - "E6 Écran noir et compte à rebours"
Cohesion: 0.25
Nodes (14): État Compte à rebours, Q5 tranchée : appareil sous 10 images/s, Compte à rebours 3 s, Nouvelle mesure de cadence 5 s, 5.8 Cadence d'analyse commune, T13 : Écran noir → Compte à rebours (Synchronisation (5 allers-retours)), T14 : Écran noir → Écran noir (Cadence de A sous 10 images/s), E6 Écran noir et compte à rebours (+6 more)

### Community 68 - "D6 — Découpage en lots de développement"
Cohesion: 0.40
Nodes (5): 1. Conventions, 2. Vue d'ensemble, 4. Si un test échoue, 5. Questions ouvertes, D6 — Découpage en lots de développement

### Community 69 - "8.4 Recommandation"
Cohesion: 0.11
Nodes (23): 8.2 Relais TURN, 8.4 Recommandation, 9.2 À partir de quel volume ça coûte, Cloudflare Realtime TURN, coturn auto-hébergé, ExpressTURN, Metered Open Relay, OVHcloud VPS-1 (+15 more)

### Community 70 - "8.3 Serveur auto-hébergé en Europe"
Cohesion: 0.40
Nodes (5): 8.3 Serveur auto-hébergé en Europe, Hetzner CX23, Scaleway DEV1-S, S41 Hetzner Cloud, S42 Scaleway instances

### Community 71 - "D7 — Documents juridiques et confidentialité"
Cohesion: 0.31
Nodes (9): 7. Mise en ligne, 8. Points à faire vérifier par un professionnel, 9. Questions ouvertes, D7 — Documents juridiques et confidentialité, D7 Q1 — Relecture dès l'ouverture par un avocat ou juriste spécialisé en données personnelles, D7 Q2 — Champs [À COMPLÉTER] laissés tels quels, remplis par Valentin avant la mise en ligne, D7 Q3 — Lien « Conditions d'utilisation » sous la case d'âge ; « Mentions légales » sur l'accueil, n° 213 : Relecture de D7 dès l'ouverture au-delà des proches, par un avocat ou… (+1 more)

### Community 72 - "8.2 Avant le mode inconnus"
Cohesion: 0.22
Nodes (9): 2.8 Règlement sur les services numériques (DSA), 8.2 Avant le mode inconnus, I1 Analyse d'impact (AIPD), I3 Qualification DSA du mode inconnus, I4 Vérification d'âge et protection des mineurs, I5 Modération ou arbitrage vérifié côté serveur, I8 Statut de l'éditeur en cas de monétisation, J18 Règlement (UE) 2022/2065 (DSA) (+1 more)

### Community 77 - "5. Limites de mesure et décisions associées"
Cohesion: 0.16
Nodes (14): 1. Périmètre, 5.1 Seuil propre à chaque joueur — décidé (n° 64), 5.2 Exagérer le sourire volontaire — nouveau risque, 5.3 Perte prolongée — décidé (n° 65), 5.4 Main devant la bouche — limite acceptée en v1 (n° 70), 5.5 Parole et départage — variante testée en P0 (n° 72), 5.6 Synchronisation des horloges — décidé (n° 66), 5.7 Deux visages dans le champ — décidé (n° 67) (+6 more)

### Community 82 - "RT9 — Page masquée : minuteries ralenties, caméra coupée"
Cohesion: 0.50
Nodes (4): Message battement, RT9 — Page masquée : minuteries ralenties, caméra coupée, S19 Forums Apple Developer, iOS, arrière-plan

## Ambiguous Edges - Review These
- `L0.1 — Socle` → `D6 Q1 (rapport)`  [AMBIGUOUS]
  docs/RAPPORT-SESSION.md · relation: conceptually_related_to

## Knowledge Gaps
- **153 isolated node(s):** `force`, `toile`, `ctx`, `calibrages`, `journal` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 174 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `L0.1 — Socle` and `D6 Q1 (rapport)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `D4 — Architecture technique` connect `D4 — Architecture technique` to `§4.2 Canal de jeu`, `R5 — Horodatage et simultanéité`, `E1 Accueil`, `Source de cadrage lots 1-2-3`, `D2-regles-jeu-arbitrage.md`, `14. Sources`, `D7-juridique-confidentialite.md`, `README.md`, `6. Déroulé du match`, `3. Écrans`, `D5-parcours-maquettes.md`, `D1 — Note de cadrage`, `V1 — Revanche spontanée dans ≥ 5 matchs sur 10`, `D6 §2 Vue d'ensemble`, `D3-plan-de-tests.md`, `2.2.1 Combinaisons de réseaux`, `3.1 Objectif et risques testés (P2)`, `4. Écrans d'erreur`, `13. Questions ouvertes`, `Rapport §1 Lot 4 — D2 complet`, `Rapport §2 Lot 5 — D4 Architecture technique`, `D1 §6 À quoi saura-t-on que la v1 a réussi`, `G3 — ≥ 10 images/s sans chauffe excessive`, `n° 69 : « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, n…`, `6.2 Machine à états`, `1. Données traitées`, `§10 Valeurs de départ simulées`, `2.1 Qui est responsable de quoi`, `D8-journal-decisions.md`, `12. Risques techniques`, `7.4 Performances cibles`, `n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…`, `7.2 Navigateurs cibles`, `n° 159 : Le salon se verrouille à deux joueurs dès l'arrivée de l'invité et exp…`, `Projet Ne souris pas — instructions de conception`, `E6 Écran noir et compte à rebours`, `8.4 Recommandation`, `8.2 Avant le mode inconnus`, `5. Limites de mesure et décisions associées`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **Why does `14. Sources` connect `14. Sources` to `D4 — Architecture technique`, `8.4 Recommandation`, `8.3 Serveur auto-hébergé en Europe`, `7.1 Ce que disent les sources`, `RT9 — Page masquée : minuteries ralenties, caméra coupée`, `12. Risques techniques`, `n° 205 : H.264 quand un iPhone joue ; 640 × 480, 1,7 Mbit/s au plus. Confirme n…`, `13. Questions ouvertes`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `D1 — Note de cadrage` connect `D1 — Note de cadrage` to `D4 — Architecture technique`, `Projet Ne souris pas — instructions de conception`, `D1 §4 Ce qu'on ne construit pas`, `D1 §6 À quoi saura-t-on que la v1 a réussi`, `D2-regles-jeu-arbitrage.md`, `Source de cadrage lots 1-2-3`, `D7-juridique-confidentialite.md`, `README.md`, `4. Questions ouvertes (D3)`, `V1 — Revanche spontanée dans ≥ 5 matchs sur 10`, `D1 §5.2 Risques`, `D3-plan-de-tests.md`, `3.1 Objectif et risques testés (P2)`, `D8-journal-decisions.md`, `n° 159 : Le salon se verrouille à deux joueurs dès l'arrivée de l'invité et exp…`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `force`, `toile`, `ctx` to the rest of the system?**
  _153 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `D4 — Architecture technique` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Should `§4.2 Canal de jeu` be split into smaller, more focused modules?**
  _Cohesion score 0.0613107822410148 - nodes in this community are weakly interconnected._