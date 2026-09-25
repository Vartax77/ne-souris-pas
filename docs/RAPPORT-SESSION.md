# Rapport de session — lots 4 à 9

| Champ | Valeur |
|---|---|
| Objet | Rendre compte de l'enchaînement des lots 4 à 9 : fichiers produits, corrections de l'autocritique, hypothèses prises sans arbitrage, questions ouvertes, contrôle de cohérence |
| Statut | Brouillon |
| Date | 2026-09-25 |
| Dépend de | [D2](D2-regles-jeu-arbitrage.md), [D3](D3-plan-de-tests.md), [D4](D4-architecture-technique.md), [D5](D5-parcours-maquettes.md), [D6](D6-lots-developpement.md), [D7](D7-juridique-confidentialite.md), [D8](D8-journal-decisions.md) |

**Arbitré par Valentin le 2026-09-25** : incohérences et questions tranchées, voir [D8](D8-journal-decisions.md) §16 (n° 159 à 216). Le contenu ci-dessous décrit l'état avant arbitrage.

Règles de l'enchaînement : aucune question posée en cours de route ; option la plus prudente retenue et marquée « Hypothèse à valider » ; valeurs simulées de D2 utilisées telles quelles ; commit et `graphify update .` après chaque lot.

## 1. Lot 4 — D2 complet

**Fichiers** : [D2](D2-regles-jeu-arbitrage.md) (§1, §6 nouvelle, renvois de R5 et R7, §7 Q7 à Q14) ; [D8](D8-journal-decisions.md) n° 97 à 110 ; [README](README.md). Commit `docs: lot 4 — D2 complet…`.

**Corrections issues de l'autocritique** :

1. Le premier diagramme n'avait ni erreur de salon ni sortie « match annulé » depuis l'état Interrompu : ajoutées.
2. Une coupure en pleine manche faisait toujours rejouer la manche : un joueur pouvait couper son réseau pour effacer un sourire imminent. Ajout d'un garde-fou (deuxième coupure du même joueur = manche perdue) ; une faute déjà annoncée reste acquise.
3. Le forfait allait à « celui qui voit l'autre disparaître » : si le réseau tombe au milieu, les deux se déclarent vainqueurs. Le serveur de mise en relation devient arbitre de présence ; aucun vainqueur s'il ne voit personne.
4. L'abandon arrêtait la manche, donc effaçait une faute en cours : la manche continue pendant la confirmation.
5. Les jauges restaient visibles pendant l'écran noir, ce qui gâchait la révélation : elles sont cachées.
6. Six phrases de règles : ramenées à cinq, le détail de la perte de visage passant dans l'avertissement.
7. Contradiction repérée dans la source : « le salon expire à la fin du match » interdit revanche et reconnexion (Q7).
8. Forfait avant toute manche terminée : uniformisé en « match annulé » ; renvoi erroné §6.6 corrigé en §6.8.

**Hypothèses prises** (n° 98 à 109) : salon verrouillé à deux jusqu'à la fin de la session ; délais 20 s, 3 s, 30 s, 15 min ; manche interrompue rejouée avec garde-fou ; forfait arbitré par le serveur ; abandon sans pause ; revanche à deux dans les 60 s avec recalibrage ; repère de pic sur les jauges ; écran noir 2 s, arrêt sur image 5 s ; appareil trop lent (proposition de Q5 appliquée) ; décisions divergentes = manche rejouée ; son ouvert tout le match.

**Questions ouvertes** : D2 Q7 à Q14 (section 7.1).

## 2. Lot 5 — D4 Architecture technique

**Fichiers** : [D4](D4-architecture-technique.md) (nouveau) ; [D8](D8-journal-decisions.md) n° 111 à 125 ; README. Recherche web citée en D4 §14 (44 sources).

**Corrections issues de l'autocritique** :

1. Premier choix : Cloudflare (0 € dans les deux phases). Revu : la signalisation serait à écrire et la société est américaine. Recommandation finale : PeerJS public + Metered Open Relay pour les prototypes, puis un serveur en France (PeerJS Server + coturn) à ≈ 4,57 €/mois. Cloudflare reste l'alternative.
2. Erreur d'horloge `e` d'abord estimée statistiquement, comme la simulation : remplacée par la borne garantie `a_min / 2`, plus prudente, avec ses conséquences chiffrées (Q1).
3. Le principe « aucun tiers » contredisait l'usage de PeerJS et de Metered : reformulé (aucun tiers dans la page ; seuls tiers = mise en relation et relais).
4. Signe du décalage faux dans l'exemple JSON : corrigé.
5. La recherche a montré que la configuration par défaut de PeerJS utilise un relais à identifiants publics et le STUN de Google : règle de remplacement ajoutée.
6. La documentation MediaPipe charge ses fichiers depuis un CDN tiers : fichiers servis par l'hébergement de la PWA.
7. Défauts de caméra connus pour les PWA installées sur iOS : décision n° 11 signalée comme fragile ; pas d'installation proposée sur iOS (Q6).
8. Flèches bidirectionnelles Mermaid au rendu incertain : simplifiées. Message d'erreur de version aligné sur D5.

**Hypothèses prises** (n° 111 à 125, D4 §13) : borne `e = a_min / 2` ; services des prototypes et d'après ; hébergement statique gratuit ; code de salon de 16 caractères ; image de preuve 480 px ; mise en page empilée en portrait ; H.264 avec iOS ; 640 × 480 à 1,7 Mbit/s ; journaux conservés 7 jours ; performances cibles (chargement, retard vidéo).

**Question de fond signalée** (règle 3) : n° 11 (PWA) sur iOS.

**Questions ouvertes** : D4 Q1 à Q10.

## 3. Lot 6 — D5 Parcours et maquettes

**Fichiers** : [D5](D5-parcours-maquettes.md) (nouveau) ; [D8](D8-journal-decisions.md) n° 126 à 133 ; README.

**Corrections issues de l'autocritique** :

1. Explication et case d'âge sur deux écrans : réunies, un geste de moins (invité : 5 gestes du lien au duel).
2. Le calibrage démarrait seul à la connexion, pendant que le joueur pose encore son téléphone : ajout d'un bouton « Commencer ».
3. Quatre écrans d'erreur (ceux de la source) : quatorze, un par état d'erreur de D2 et par risque de D4.
4. Accueil de l'invité « X vous défie » : impossible sans compte ni saisie, texte neutre.
5. Un bouton de partage de l'image de preuve apparaissait : retiré (n° 32, n° 69).
6. Question sur la mise en page en double avec D4 : renvoyée à D4 Q5.
7. Le graphe ne contenait que les titres des lots 4 et 5 : vérification faite par lecture, limite écrite dans D5 §5.

**Hypothèses prises** (n° 127, 129, 130, 133) : bouton « Commencer » ; vouvoiement ; pas de nom de l'hôte ; panneau des règles sans pause.

**Questions ouvertes** : D5 Q1 à Q7.

## 4. Lot 7 — D6, puis D3 prototypes 1 et 2

**Fichiers** : [D6](D6-lots-developpement.md) (nouveau) ; [D3](D3-plan-de-tests.md) §2, §3, §4 ; [D8](D8-journal-decisions.md) n° 134 à 147 ; README.

**Corrections issues de l'autocritique** :

1. Taux de revanche calculé sur tous les matchs, revanches comprises : une paire enthousiaste gonflait le critère. Les 10 matchs comptés sont les premiers matchs de 10 sessions.
2. Valentin pouvait jouer : exclu des matchs comptés (biais sur la revanche).
3. Aucune façon de mesurer l'erreur réelle des horloges : test du flash commun ajouté (il mesure aussi le retard vidéo).
4. « v1 réussie » exigeait tous les critères : réaligné sur n° 50 (seule la revanche est un critère de réussite ; les autres sont des garde-fous).
5. La note « triche par la main, à observer en jeu » est devenue le critère A3.
6. Pages légales en fin de liste, facultatives : placées avant le premier test P2 (le lien peut circuler plus loin que prévu).
7. Outil de rejeu prévu comme script séparé : il utilise le même code que le jeu (n° 137).

**Hypothèses prises** (n° 134, 138, 139, 141, 143, 146, 147) : séance de 3 à 4 h ; journal P2 avec accord oral ; pages légales avant P2 ; seuil C3 (19 flashs sur 20) ; organisation des 10 matchs ; seuils A2 (10 %) et A3 (2 sur 10) ; tests de contrôle.

**Questions ouvertes** : D6 Q1 à Q3 ; D3 Q1 (déjà ouverte), Q2 à Q9.

## 5. Lot 8 — D7 Juridique et confidentialité

**Fichiers** : [D7](D7-juridique-confidentialite.md) (nouveau) ; [D8](D8-journal-decisions.md) n° 148 à 158 ; README. Recherche web citée en D7 §10 (21 sources, CNIL et textes officiels en priorité).

**Corrections issues de l'autocritique** :

1. Premier choix : anonymat de l'éditeur permis par la LCEN. Revu : le RGPD impose l'identité du responsable, et un hébergeur gratuit ne recueille pas forcément cette identité. L'identité est donc publiée (V1).
2. « Seule votre adresse IP passe par nos serveurs » était faux quand la vidéo est relayée : phrase corrigée.
3. Les journaux de test (P0, P2) manquaient au registre : ajoutés (T3).
4. Risque de présenter la fonction comme une analyse d'émotions (AI Act) : vocabulaire imposé, « détection du sourire » uniquement.
5. La politique ne disait pas que l'adversaire peut filmer son écran : c'est ajouté, et l'interdiction figure dans les conditions d'utilisation.
6. Relecture juridique prévue seulement avant le mode inconnus (n° 47) : proposée dès l'ouverture au public.
7. Considérants du DSA lus sur un site miroir : limite signalée.

**Hypothèses prises** (n° 148, 151, 157, 158) : partage des responsabilités ; identité publiée ; journaux de test au registre ; relecture dès l'ouverture.

**Questions ouvertes** : D7 Q1 à Q5 ; points à faire vérifier V1 à V11 et I1 à I8.

## 6. Lot 9 — Contrôle de cohérence

### 6.1 Méthode et limite

- `graphify update .` lancé, puis lecture de `graphify-out/GRAPH_REPORT.md` (375 nœuds, 504 liens, 19 communautés).
- `graphify query` et `graphify path` utilisés sur les réglages et les décisions. **Limite** : `graphify update .` ne fait qu'une extraction structurelle. Pour les documents des lots 4 à 8, le graphe ne contient que les **titres de section**, pas les décisions ni les valeurs. Exemple : le chemin « Fenêtre effective W » → « D4 » passe par des nœuds de D2 seulement ; « 6.2 Machine à états » n'existe pas comme nœud.
- Les contrôles ont donc été faits par lecture et recherche de chaque valeur dans D1 à D7. Relancer `/graphify . --update` permettra de les refaire par le graphe.

### 6.2 Résultats par contrôle

| Contrôle | Résultat |
|---|---|
| Chaque décision de D8 appliquée dans les documents concernés | Oui pour les n° 1 à 158, sauf les n° 7, 28, 45, 111, 123 et 124 (lignes 21, 1, 22, 16, 15, 17 du tableau 6.3) |
| Aucun réglage avec deux valeurs différentes entre D2, D3, D4 et D6 | Aucune valeur contradictoire. Deux divergences de définition : calcul de `e` et nombre d'échantillons de synchronisation (lignes 7 et 8). « `k` = 0,5 » dans D3 §1.5.2 est un exemple de calcul, pas un réglage |
| Chaque risque de D1 a un test dans D3 et un lot dans D6 | D1 n'a pas de section « risques » ; contrôle fait sur ses hypothèses H1 à H6 et ses garde-fous. H1, H2, H3, H6 et les garde-fous : test et lot présents. H5 et H4 : pas de critère (lignes 3 et 4) |
| Chaque écran de D5 correspond à un état de D2 | Oui pour E1 à E10 et 11 erreurs sur 14. Sans état ni événement dans D2 : E11, ER8, ER9, ER12 (ligne 12) |

### 6.3 Incohérences

Rien n'a été corrigé.

| N° | Document | Problème | Correction proposée |
|---|---|---|---|
| 1 | [D1](D1-note-de-cadrage.md) §3 | « Salon à code qui expire à la fin du match » contredit l'hypothèse n° 98 (expiration à la fin de la session), appliquée dans D2 §6.5.3 et D4 §3 | Après la réponse à D2 Q7, écrire « à la fin de la session » dans D1 |
| 2 | [D1](D1-note-de-cadrage.md) | Pas de section « risques » : le contrôle risque → test → lot passe par les hypothèses | Ajouter à D1 un tableau des risques de la source §2.3, avec renvoi au test de D3 et au lot de D6 |
| 3 | [D1](D1-note-de-cadrage.md) H5, [D3](D3-plan-de-tests.md) §3 | H5 (« plus qu'un appel vidéo », solidité critique) n'a aucun test direct ; V1 ne la mesure qu'indirectement | Ajouter au questionnaire P2 : « Auriez-vous joué pareil en simple appel vidéo ? Qu'apporte l'arbitre ? », avec un indicateur |
| 4 | [D1](D1-note-de-cadrage.md) H4, [D3](D3-plan-de-tests.md) §3.6 | H4 (accepter d'être filmé) est mesurée (question 12) sans seuil ni décision | Fixer un seuil, ou écrire explicitement « information seulement » dans D1 |
| 5 | Source §2.3, [D3](D3-plan-de-tests.md) | Risques « différenciation face aux filtres » et « acquisition » : aucun test ni lot | Les déclarer hors v1 dans D1, ou les rattacher aux questions 13 et 14 du questionnaire |
| 6 | [D3](D3-plan-de-tests.md) §2.6, [D4](D4-architecture-technique.md) §7.4 | Retard vidéo (300 ms), chargement (3 s et 15 s) et écran noir (2 s) sont « à confirmer (P1) » sans critère C associé | Ajouter un critère C7, ou les classer « information » |
| 7 | [D2](D2-regles-jeu-arbitrage.md) §5.6 et Q6, [D4](D4-architecture-technique.md) §5.1 | Q6 raisonne avec `e` ≈ 24 ms (simulation). D4 définit `e` = moitié du plus petit aller-retour (30 à 100 ms). `W` réel : 127 à 267 ms, pas 115 ms ; le plancher de 100 ms ne sert jamais | Trancher D4 Q1 et D2 Q6 ensemble, puis réécrire les chiffres de Q6 |
| 8 | [D2](D2-regles-jeu-arbitrage.md) R5 et §3, [D4](D4-architecture-technique.md) §5.1 | D2 : « échantillons retenus au plus faible aller-retour » (pluriel) ; D4 : un seul échantillon | Aligner D2 sur D4, ou fixer le nombre d'échantillons |
| 9 | [D2](D2-regles-jeu-arbitrage.md) T1, T2, [D5](D5-parcours-maquettes.md) E1 | Bouton « Continuer » dans D2 ; « Créer un duel » et « Rejoindre le duel » dans D5 | Reprendre les libellés de D5 dans D2 |
| 10 | [D2](D2-regles-jeu-arbitrage.md) T7, T30, T31, 6.4.3, [D5](D5-parcours-maquettes.md) ER5, ER10, ER11, ER13, ER14 | Deux libellés pour la même action : « Créer un nouveau salon » et « Créer un nouveau duel » | Un seul libellé, « Créer un nouveau duel » : le mot « salon » n'apparaît pas ailleurs à l'écran |
| 11 | [D2](D2-regles-jeu-arbitrage.md) §6.4.2 et §6.5.1, [D5](D5-parcours-maquettes.md) E9 | Match annulé par abandon : D2 permet la revanche. Match annulé par coupure : D2 va en fin de session. D5 E9 affiche un seul cas « Match annulé », sans revanche | Deux lignes dans D5 E9 : annulé par abandon (revanche possible), annulé par coupure (fin de session, écran d'erreur) |
| 12 | [D2](D2-regles-jeu-arbitrage.md) §6.2, [D5](D5-parcours-maquettes.md) E11, ER8, ER9, ER12 | Panneau des règles, navigateur incompatible, versions différentes et caméra occupée n'ont ni état ni événement dans D2 | Ajouter à D2 : état « Navigateur incompatible » ; événements « version différente » (Connexion) et « caméra occupée » (T3) ; règle du panneau (D5 Q4) |
| 13 | [D5](D5-parcours-maquettes.md) E1, [D7](D7-juridique-confidentialite.md) §5 et Q3 | D7 place les liens « Conditions d'utilisation » et « Mentions légales » sur l'accueil ; D5 E1 n'a que « Confidentialité » | Ajouter les deux liens à E1, textes et maquettes |
| 14 | [D5](D5-parcours-maquettes.md) ER8, [D4](D4-architecture-technique.md) §7.2 | ER8 recommande Firefox, que D4 classe « à tester » | Revoir le message d'ER8 après les tests P0 et P1 |
| 15 | [D6](D6-lots-developpement.md) L0.1, [D4](D4-architecture-technique.md) §7.2 (n° 123) | L0.1 rend la page installable sans rappeler qu'aucune installation n'est proposée sur iOS | Le préciser dans les tâches de L0.1 |
| 16 | [D6](D6-lots-developpement.md) L1.1, [D4](D4-architecture-technique.md) §1 (n° 111) | Rien n'impose de servir la bibliothèque PeerJS depuis l'hébergement de la PWA, alors que c'est exigé pour MediaPipe | Ajouter cette tâche à L1.1 |
| 17 | [D6](D6-lots-developpement.md) L1.2, L1.5, [D4](D4-architecture-technique.md) Q9 (n° 124) | H.264 et 640 × 480 ne figurent dans aucune tâche | Ajouter à L1.2 ; mesurer en L1.5 |
| 18 | [D6](D6-lots-developpement.md) L2.1 | Toute la machine à états en un lot : risque de dépasser une séance (règle D6 §1) | Couper en deux : accueil → calibrage, puis écran noir → score |
| 19 | [D7](D7-juridique-confidentialite.md) §1 et §4 point 3, [D4](D4-architecture-technique.md) §4.2 | D7 : « seule une jauge est envoyée ». D4 envoie aussi le pic, les fautes horodatées, l'état du calibrage, la cadence et le type d'appareil | Compléter la politique : « la jauge, les événements de jeu et des informations techniques (cadence, type d'appareil) » |
| 20 | [D7](D7-juridique-confidentialite.md) §1 et §2.4, [D4](D4-architecture-technique.md) §3, [D6](D6-lots-developpement.md) L0.1 | D7 : « aucun stockage dans le navigateur ». D4 et D6 : les fichiers de l'application sont mis en cache (service worker) | Préciser dans D7 : cache des fichiers de l'application, strictement nécessaire, sans donnée personnelle |
| 21 | [D1](D1-note-de-cadrage.md) §3, [D8](D8-journal-decisions.md) n° 7, [D4](D4-architecture-technique.md) §8.4 | Le budget de 10 €/mois est un budget « relais » ; D4 y impute aussi la mise en relation, l'hébergement et le domaine | Confirmer que les 10 € couvrent tout (D4 Q3), puis aligner D1 |
| 22 | [D8](D8-journal-decisions.md) n° 45 | Ordre de production : D2 complet, D4 à D7 devaient suivre le prototype 0. Les valeurs « À confirmer (P0) » sont donc propagées dans D4 à D6 sans mesure | Après P0, reprendre dans l'ordre D2 §3, D4 §5 et §7, puis les critères de D6 |
| 23 | [D2](D2-regles-jeu-arbitrage.md) §5.8 | « Le cas d'un appareil sous 10 images/s reste ouvert (Q5) », alors que T14 applique déjà une hypothèse | Citer l'hypothèse n° 107 dans §5.8 |
| 24 | `graphify-out/` | Le graphe n'a que les titres des sections des lots 4 à 8 | Relancer `/graphify . --update` |

## 7. Questions ouvertes restantes, tous documents

Toutes figurent aussi dans la section « Questions ouvertes » de leur document.

### 7.1 D2 — Règles du jeu et d'arbitrage

| N° | Question | Proposition |
|---|---|---|
| D2 Q1 | Plafonner le seuil à `d_max` pour empêcher de gonfler son seuil ? | Oui, `d_max` = 0,35, à confirmer (P0) |
| D2 Q5 | Appareil sous 10 images/s : avant et pendant la manche ? | Proposition appliquée comme hypothèse (T14) |
| D2 Q6 | Multiplicateur de `e` : 2 ou 1 ? | Voir ligne 7 du tableau 6.3 |
| D2 Q7 | Salon verrouillé jusqu'à la fin de la session, pas du match ? | Oui |
| D2 Q8 | Recalibrer à chaque revanche ? | Oui, à revoir après P2 |
| D2 Q9 | Coupure en manche : rejouée, avec garde-fou ? | Oui |
| D2 Q10 | Forfait arbitré par le serveur de mise en relation ? | Oui, faisabilité en P1 |
| D2 Q11 | Durées du déroulé (15 min, 20 s, 3 s, 30 s, 2 s, 5 s, 60 s) ? | Oui, à mesurer |
| D2 Q12 | Son ouvert pendant l'écran noir ? | Oui |
| D2 Q13 | Repère du pic sur les jauges ? | Oui |
| D2 Q14 | Décisions divergentes = manche rejouée ? | Oui |

### 7.2 D3 — Plan de tests

| N° | Question | Proposition |
|---|---|---|
| D3 Q1 | Modèles des appareils disponibles (le plus ancien, iPhone, ordinateur) | **À fournir** |
| D3 Q2 | Wi-Fi restrictif disponible pour R5 ? | Sinon, relais forcé en TLS |
| D3 Q3 | C3 : 19 flashs sur 20 ? | Oui |
| D3 Q4 | Accepter ≈ 4,57 €/mois avant la fin des prototypes si le serveur public PeerJS échoue ? | **À décider** |
| D3 Q5 | 10 matchs = premiers matchs de 10 sessions ? | Oui |
| D3 Q6 | Valentin ne joue pas dans les matchs comptés ? | Oui |
| D3 Q7 | Observation de 5 matchs sur 10 ? | Oui |
| D3 Q8 | Seuils A2 (10 %) et A3 (2 sur 10) ? | Oui |
| D3 Q9 | Un proche disponible pour R1 et R4 ? | **À fournir** |

### 7.3 D4 — Architecture technique

| N° | Question | Proposition |
|---|---|---|
| D4 Q1 | `e` : borne garantie ou estimation statistique ? | Borne, comparée en P1 |
| D4 Q2 | Prototypes sur PeerJS public et Metered ? | Oui, entre proches |
| D4 Q3 | Après : serveur en France administré soi-même, ou Cloudflare ? | Serveur en France |
| D4 Q4 | Journaux conservés 7 jours ? | Oui |
| D4 Q5 | Vidéos empilées en portrait ? | Oui |
| D4 Q6 | Pas d'installation de la PWA sur iOS ? | Oui |
| D4 Q7 | Firefox et navigateurs iOS autres que Safari : cibles ? | Selon P0 et P1 |
| D4 Q8 | Hébergement statique du prototype | **À fournir** |
| D4 Q9 | H.264 quand un iPhone joue ? | Oui, à mesurer |
| D4 Q10 | Nom de domaine et prix | **À fournir** |

### 7.4 D5 — Parcours et maquettes

| N° | Question | Proposition |
|---|---|---|
| D5 Q1 | Tutoiement ou vouvoiement ? | Vouvoiement |
| D5 Q2 | Champ prénom pour l'hôte ? | Non |
| D5 Q3 | Bouton « Commencer » avant le calibrage ? | Oui |
| D5 Q4 | Ajouts à D2 (navigateur incompatible, panneau des règles) ? | Oui |
| D5 Q5 | Mise en page | Voir D4 Q5 |
| D5 Q6 | Relancer `/graphify . --update` ? | Oui |
| D5 Q7 | Nom de domaine et nom du jeu | Plus tard (n° 46) |

### 7.5 D6 — Lots de développement

| N° | Question | Proposition |
|---|---|---|
| D6 Q1 | Durée d'une séance ? | 3 à 4 heures |
| D6 Q2 | Journal P2 avec accord oral ? | Oui |
| D6 Q3 | Pages légales avant le premier test P2 ? | Oui |

### 7.6 D7 — Juridique et confidentialité

| N° | Question | Proposition |
|---|---|---|
| D7 Q1 | Relecture juridique dès l'ouverture au public ? Par qui ? | Oui ; avocat ou juriste en données personnelles |
| D7 Q2 | Identité, adresse, contact de l'éditeur ; hébergeurs | **À fournir** |
| D7 Q3 | Lien « Conditions d'utilisation » sous la case d'âge ? | Oui |
| D7 Q4 | Publier l'identité plutôt que l'anonymat LCEN ? | Oui |
| D7 Q5 | Disque chiffré pour les journaux de test ? | **À fournir** |
| D7 V1 à V11, I1 à I8 | Points à faire vérifier par un professionnel | Voir [D7](D7-juridique-confidentialite.md) §8 |

D1 et D8 n'ont aucune question ouverte.

## 8. À décider en priorité

1. **D3 Q1** (appareils) : bloque le prototype 0, donc toutes les valeurs « À confirmer (P0) ».
2. **D2 Q7** (salon) et **D2 Q6 / D4 Q1** (calcul de `W`) : ils touchent D1, D2 et D4 à la fois.
3. **D4 Q2, Q3, Q8 et D3 Q4** (services, budget) : ils conditionnent P1 et le contenu de D7.
4. **Incohérences 9 à 13** du tableau 6.3 : libellés et écrans, peu coûteuses à corriger avant le code.
