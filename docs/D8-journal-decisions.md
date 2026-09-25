# D8 — Journal des décisions

| Champ | Valeur |
|---|---|
| Objet | Tracer chaque décision du projet : date, contenu, raison, alternatives écartées, source |
| Statut | Brouillon |
| Date | 2026-09-25 |
| Dépend de | [Source de cadrage](../sources/cadrage-lots-1-2-3.md) |
| Utilisé par | [D1](D1-note-de-cadrage.md) et tous les documents suivants |

## 1. Conventions

- Une ligne par décision, dans l'ordre chronologique, puis dans l'ordre de la source.
- Les décisions des lots 1, 2 et 3 portent la date de validation de la source : 2026-09-22, date confirmée par Valentin le 2026-09-25.
- « Non documentée » : la source ne donne ni raison ni alternative. Rien n'est inventé.
- Une raison ajoutée après coup par Valentin est suivie de « (Valentin, date) » ; la décision elle-même reste inchangée.
- Colonne Source : section de la [source de cadrage](../sources/cadrage-lots-1-2-3.md), ou document qui a porté l'arbitrage.
- Toute valeur non encore validée par un test est marquée **À confirmer (P0)**, **(P1)** ou **(P2)** selon le prototype qui la validera.
- Une décision modifiée n'est jamais effacée : une nouvelle ligne la remplace et cite son numéro.

## 2. Lot 1 — Remise en question de l'idée

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 1 | 2026-09-22 | Un seul appareil par joueur, celui de son choix (téléphone, tablette, ordinateur). Jeu principalement à distance. | Non documentée | Non documentée | §2.4, §3.1 |
| 2 | 2026-09-22 | Objectif : prototype fun et pièce de portfolio. Monétisation décidée seulement après test avec de vrais joueurs. | Monétisation jugée faible (risque identifié) | Monétiser dès la v1 | §2.3, §2.4, §3.6 |
| 3 | 2026-09-22 | Aucune provocation ajoutée par l'application. | L'apparition soudaine du visage suffit | Provocations de l'application (réintégrables si le critère d'ennui est franchi, voir n° 42) | §2.4, §3.6 |
| 4 | 2026-09-22 | Pivot A : duel à distance. | Non documentée | Mode soirée sur grand écran (abandonné) ; clip partageable en v1 (reporté, voir n° 32) | §2.4 |

## 3. Lot 2 — Périmètre de la v1

### 3.1 Public, budget, format

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 5 | 2026-09-22 | Âge minimum : 18 ans, dès la v1. | La cible à terme (inconnus, type Chatroulette) est incompatible avec des mineurs (Valentin, 2026-09-25) | Non documentée | §3.1 |
| 6 | 2026-09-22 | Vision à terme : rencontre avec des inconnus, proche de Chatroulette. Exclue de la v1. | La v1 couvre le cas principal sans le risque des inconnus | Mode inconnus dès la v1 | §3.1, §3.3 |
| 7 | 2026-09-22 | Budget relais : 0 € pour le prototype (offres à quota gratuit), puis 10 € par mois maximum. | Plafond fixé par le porteur, sans revenu attendu du prototype (Valentin, 2026-09-25) | Non documentée | §3.1 |
| 8 | 2026-09-22 | Parole autorisée pendant les manches. | Les joueurs sont les seuls provocateurs (duel symétrique) | Non documentée | §3.1, §3.3 |
| 9 | 2026-09-22 | Les deux jauges sont visibles par les deux joueurs. | Voir l'autre flancher crée la tension sans rien ajouter au jeu (Valentin, 2026-09-25) | Non documentée | §3.1 |
| 10 | 2026-09-22 | Manche de 60 s, match en 2 manches gagnantes, valeurs ajustables après tests. **À confirmer (P2)** | Parties courtes, revanche facile | Non documentée | §3.1, §3.3 |

### 3.2 Plateforme

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 11 | 2026-09-22 | PWA web, tout navigateur récent avec caméra frontale ou webcam. | Une seule base de code ; invitation par lien sans installation | Non documentée | §3.2 |
| 12 | 2026-09-22 | Vidéo et audio en WebRTC pair à pair. | Le flux ne passe par aucun serveur capable de le lire ou de le stocker | Non documentée | §3.2 |
| 13 | 2026-09-22 | Détection du sourire par MediaPipe Face Landmarker, sur l'appareil de chaque joueur. | Chaque appareil juge son joueur ; la latence réseau ne fausse pas le jugement | Non documentée | §2.2, §3.2 |
| 14 | 2026-09-22 | Petit serveur de mise en relation et relais vidéo (TURN). | Sans relais, une partie des connexions (4G, certains réseaux) échoue | Non documentée | §3.2 |

### 3.3 Mode de jeu

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 15 | 2026-09-22 | Duel 1 contre 1 à distance, entre amis, via un lien d'invitation. | Cas d'usage principal, sans le risque des inconnus | Jeu avec des inconnus (n° 6) | §3.3 |
| 16 | 2026-09-22 | Duel symétrique : les deux joueurs tiennent et peuvent faire rire l'autre (grimaces, paroles). | Les joueurs sont les seuls provocateurs | Provocations de l'application (n° 3) | §3.3 |
| 17 | 2026-09-22 | Apparition à chaque manche : écran noir, compte à rebours 3-2-1, révélation simultanée des deux visages. | Transforme l'intuition « l'apparition intimide » en moment fort répété | Non documentée | §3.3 |

### 3.4 Règles d'arbitrage

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 18 | 2026-09-22 | Avant la partie : calibrage de 3 s visage neutre, contrôle lumière et cadrage. Pas de démarrage si la qualité est insuffisante. Durée **À confirmer (P0)**. Modifiée par n° 64 et confirmée par n° 71. | Non documentée | Non documentée | §3.4 |
| 19 | 2026-09-22 | Sourire détecté : mesure au-dessus du neutre de référence + seuil, maintenue au moins 400 ms. Seuil et durée **À confirmer (P0)**. Seuil modifié par n° 64. | Non documentée | Non documentée | §3.4 |
| 20 | 2026-09-22 | Zone de doute (entre neutre et sourire) : aucune pénalité, la jauge du joueur monte. | Non documentée | Non documentée | §3.4 |
| 21 | 2026-09-22 | Visage perdu plus de 1,5 s : avertissement. Deuxième fois dans la manche : manche perdue. Durée **À confirmer (P0)** | Non documentée | Non documentée | §3.4 |
| 22 | 2026-09-22 | Qui a souri en premier : horodatage local sur chaque appareil, horloges synchronisées au signal de révélation. Précision **À confirmer (P1)** (marquage modifié par n° 55) | Non documentée | Non documentée | §3.4 |
| 23 | 2026-09-22 | Sourires quasi simultanés (écart < 200 ms) : manche nulle, rejouée. Écart **À confirmer (P2)**. Modifiée par n° 66. | Non documentée | Non documentée | §3.4 |
| 24 | 2026-09-22 | Personne ne craque en 60 s : perd celui dont la jauge est montée le plus haut pendant la manche. Précisée par n° 49. | Non documentée | Non documentée | §3.4 |
| 25 | 2026-09-22 | Preuve : arrêt sur image sur les deux écrans au moment de la détection, sans enregistrement. | Non documentée | Clip vidéo (v2, n° 32) | §3.4 |

### 3.5 Vidéo et vie privée

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 26 | 2026-09-22 | Aucun enregistrement vidéo ni audio, nulle part. | Non documentée | Non documentée | §3.5 |
| 27 | 2026-09-22 | Flux chiffrés de bout en bout par WebRTC ; le relais transmet sans pouvoir lire. | Non documentée | Non documentée | §3.5 |
| 28 | 2026-09-22 | Aucun compte : salon à code aléatoire, qui expire à la fin du match. | Non documentée | Comptes (reportés avec le mode inconnus, n° 33) | §3.5 |
| 29 | 2026-09-22 | Case « j'ai 18 ans ou plus » et écran d'explication avant la demande d'accès caméra et micro. | Non documentée | Non documentée | §3.5 |
| 30 | 2026-09-22 | Courte page de confidentialité : analyse locale, rien de stocké. | Non documentée | Non documentée | §3.5 |

### 3.6 Exclusions de la v1

Les exclusions déjà tracées ne sont pas répétées : mode inconnus (n° 6), provocations et condition de réintégration (n° 3, n° 42), monétisation (n° 2), mode soirée abandonné (n° 4).

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 31 | 2026-09-22 | Réintégration du mode inconnus seulement après validation du jeu entre amis, avec 18 ans minimum, signalement, bannissement, modération et arbitrage vérifié côté serveur. | Non documentée | Non documentée | §3.6 |
| 32 | 2026-09-22 | Clip partageable du fou rire : v2, si les testeurs veulent partager, avec double consentement. | Non documentée | Clip en v1 | §2.1, §3.6 |
| 33 | 2026-09-22 | Comptes, classements, historique : avec le mode inconnus. | Non documentée | Non documentée | §3.6 |
| 34 | 2026-09-22 | Détection sonore du rire : v2, si les testeurs rient sans sourire visible. | Non documentée | Non documentée | §3.6 |

### 3.7 Tests et critères de décision

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 35 | 2026-09-22 | Valider la détection avant tout réseau : prototype 0 (détection seule), puis prototype 1 (appel vidéo seul), puis prototype 2 (duel complet). | Chaque prototype teste un risque distinct (tableau §3.7) | Non documentée | §3.7 |
| 36 | 2026-09-22 | P0 — arbitrage : 5 à 10 visages (barbe, lunettes, pénombre, parole). Critère : aucun faux positif en conditions normales, sinon revoir le seuil. | Une seule erreur visible détruit la confiance | Non documentée | §2.3, §3.7 |
| 37 | 2026-09-22 | P0 — performance, sur l'appareil le plus ancien disponible. Critère : au moins 10 images analysées par seconde, sans chauffe excessive en 5 minutes. | Non documentée | Non documentée | §3.7 |
| 38 | 2026-09-22 | P1 — connexion : appel vidéo seul sur réseaux différents (Wi-Fi / 4G, box différentes). Critère : 100 % des connexions aboutissent avec le relais. | Non documentée | Non documentée | §3.7 |
| 39 | 2026-09-22 | P2 — duel complet : 10 matchs avec des proches. | Non documentée | Non documentée | §3.7 |
| 40 | 2026-09-22 | P2 — intérêt : revanche spontanée dans au moins la moitié des matchs. | Non documentée | Non documentée | §3.7 |
| 41 | 2026-09-22 | P2 — demande : poser aux testeurs « joueriez-vous avec un inconnu ? ». La réponse oriente le lancement du mode inconnus. | Non documentée | Non documentée | §3.7 |
| 42 | 2026-09-22 | P2 — ennui : si plus de la moitié des manches vont au bout des 60 s, réintroduire des provocations. | Risque d'ennui (H2, solidité faible) | Non documentée | §2.3, §3.7 |

## 4. Lot 3 — Documents à concevoir

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 43 | 2026-09-22 | Huit documents à produire (D1 à D8), avec priorité, effort et dépendances. Priorités nommées à l'origine P1/P2/P3, renommées par n° 48. | Non documentée | Voir n° 46 | §4 |
| 44 | 2026-09-22 | Barème — priorité 1 : avant de coder le prototype 0 ; priorité 2 : avant les prototypes 1 et 2 ; priorité 3 : avant que le lien circule hors du cercle proche. Effort : faible = une séance, moyen = deux ou trois, élevé = davantage. | Non documentée | Non documentée | §4 |
| 45 | 2026-09-22 | Ordre de production : D1 et D8 ; D2 arbitrage ; D3 prototype 0 ; code et test du prototype 0 ; D2 complet, D4, D5 ; D6 puis D3 prototypes 1 et 2 ; D7. | Suit le barème de priorité (n° 44) | Non documentée | §4.2 |
| 46 | 2026-09-22 | Documents écartés : cahier des charges complet, dossier du mode inconnus, analyse d'impact (AIPD), étude de marché et modèle économique, nom et identité visuelle, plan de communication, manuel utilisateur, plan de sauvegarde. | Doublons ou prématurés (détail en §4.3) | — | §4.3 |
| 47 | 2026-09-22 | D7 relu par une personne qualifiée avant le mode inconnus. | Non documentée | Non documentée | §4.1 |

## 5. Lot documentaire 1 — Arbitrages du 2026-09-25

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 48 | 2026-09-25 | Les priorités documentaires s'écrivent « Priorité 1 », « Priorité 2 », « Priorité 3 » en toutes lettres. Les sigles P0, P1, P2 sont réservés aux prototypes, dans tous les documents. Modifie n° 43. | « P1 » avait deux sens (document et prototype) | Garder P1/P2/P3 ; lettres A/B/C | Arbitrage de Valentin, lot 1 |
| 49 | 2026-09-25 | En fin de manche sans sourire, la jauge comparée est le pic atteint (valeur maximale), pas le cumul. Précise n° 24. | Formulation « montée le plus haut » ambiguë | Cumul sur la manche | Arbitrage de Valentin, lot 1 |
| 50 | 2026-09-25 | Critère de réussite de la v1 : la revanche spontanée (n° 40). Performance (n° 37) et connexion (n° 38) sont des prérequis, pas des critères de réussite. | Le jeu doit donner envie de rejouer ; la technique ne fait que le permettre | Tous les critères au même rang | Arbitrage de Valentin, lot 1 |
| 51 | 2026-09-25 | Définitions provisoires, à préciser dans [D3](D3-plan-de-tests.md) : « conditions normales » = intérieur éclairé, visage de face à moins d'un mètre ; « chauffe excessive » = l'appareil ralentit visiblement ou la détection passe sous 10 images par seconde avant 5 minutes ; « 100 % des connexions » = sur 10 essais par combinaison de réseaux. **À confirmer (P0)** et **(P1)** | Rendre les critères n° 36 à 38 mesurables | Non documentée | Arbitrage de Valentin, lot 1 |
| 52 | 2026-09-25 | Si la performance échoue (n° 37) : réduire la fréquence d'analyse ou la résolution, puis retester. | Non documentée | Non documentée | Arbitrage de Valentin, lot 1 |
| 53 | 2026-09-25 | Si la connexion échoue (n° 38) : changer de service de relais. | Non documentée | Non documentée | Arbitrage de Valentin, lot 1 |
| 54 | 2026-09-25 | Si le critère de revanche échoue (n° 40) : réintroduire des provocations. Étend n° 42, qui ne prévoyait les provocations qu'en cas d'ennui. | Non documentée | Non documentée | Arbitrage de Valentin, lot 1 |
| 55 | 2026-09-25 | Marquage : la synchronisation des horloges (n° 22) passe de P2 à P1 ; le visage perdu à 1,5 s (n° 21) reste P0. | La synchronisation est un test réseau | Garder P2 | Arbitrage de Valentin, lot 1 |

## 6. Lot documentaire 2 — D2, partie arbitrage

Précisions nécessaires pour coder l'arbitrage. Elles complètent les n° 18 à 25 sans les contredire. Les propositions qui modifient une décision restent dans les questions ouvertes de [D2](D2-regles-jeu-arbitrage.md) §7 jusqu'à l'accord de Valentin.

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 56 | 2026-09-25 | Score de sourire = moyenne de `mouthSmileLeft` et `mouthSmileRight` (MediaPipe), lissée sur 200 ms. Neutre = médiane du score lissé pendant le calibrage. **À confirmer (P0)**. Variante testée : n° 72. | Mesure simple, disponible sur tous les navigateurs ; le lissage évite qu'une image bruitée décide | Maximum des deux côtés (plus de faux positifs en parlant) ; variante avec `cheekSquint` (à comparer en P0) | [D2](D2-regles-jeu-arbitrage.md) §2 |
| 57 | 2026-09-25 | Critères de rejet du calibrage : présence < 90 %, visage < 20 % de la largeur, angles hors limites, luminance < 60/255, écart-type > 0,05, neutre > 0,35. Essais illimités, première cause affichée. Précise n° 18. **À confirmer (P0)** | Rendre « qualité insuffisante » mesurable ; empêcher un neutre truqué | Limiter le nombre d'essais | [D2](D2-regles-jeu-arbitrage.md) R1 |
| 58 | 2026-09-25 | Sourire confirmé = série d'images souriantes couvrant au moins 400 ms et au moins 3 images, une image non souriante tolérée. Horodatage = première image de la série. Précise n° 19. **À confirmer (P0)** | Rendre la durée de maintien indépendante de la cadence ; dater le sourire au moment où il apparaît | Horodatage à la confirmation (retarde tous les sourires de 400 ms sans rien gagner) | [D2](D2-regles-jeu-arbitrage.md) R2 |
| 59 | 2026-09-25 | Jauge = (S − n − m) / (d − m), bornée entre 0 et 1 ; figée sur image invalide ; pic remis à zéro à chaque manche. Précise n° 20 et n° 49. **À confirmer (P0)** | Jauges comparables entre joueurs ; pas de pic créé par une image invalide | Jauge brute non normalisée | [D2](D2-regles-jeu-arbitrage.md) R3 |
| 60 | 2026-09-25 | Image invalide = aucun visage, deux visages, visage trop petit ou angles hors limites ; elle compte comme visage perdu. La faute par deuxième perte est datée au début de la perte + 1,5 s. Précise n° 21. **À confirmer (P0)** ; traitement des deux visages confirmé par n° 67 | Empêcher d'échapper au jugement en tournant la tête ; dater la faute quand elle est constituée | Suivre le visage calibré (D2 Q4) | [D2](D2-regles-jeu-arbitrage.md) R4 |
| 61 | 2026-09-25 | La règle de simultanéité (200 ms) s'applique à toute faute, sourire ou deuxième perte. Chaque appareil déclare sa première faute ou son absence de faute jusqu'à T + 200 ms ; décision identique sur les deux appareils. Précise n° 22 et n° 23. | Un seul ordre des fautes, quel que soit leur type | Priorité du sourire sur la perte | [D2](D2-regles-jeu-arbitrage.md) R5 |
| 62 | 2026-09-25 | Une faute compte si son horodatage est dans [t0 ; t0 + 60 s[ ; une série commencée avant 60 s peut être confirmée après. Précise n° 24. | Pas de faute perdue à la dernière seconde | Couper l'analyse à 60 s pile | [D2](D2-regles-jeu-arbitrage.md) R2, R6 |
| 63 | 2026-09-25 | Arrêt sur image : image prise par l'appareil du joueur qui sourit, au score le plus haut de la série, gardée en mémoire seulement, effacée à la révélation suivante. Aucune image pour une perte, un départage ou une manche nulle. Précise n° 25. Transmission et effacement modifiés par n° 69. | Image nette et exacte, sans enregistrement | Figer le flux reçu (retardé, compressé) | [D2](D2-regles-jeu-arbitrage.md) R7 |

## 7. Lot documentaire 2 — Arbitrages de Valentin sur D2

Réponses de Valentin du 2026-09-25 aux questions Q1 à Q8 du premier brouillon de [D2](D2-regles-jeu-arbitrage.md).

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 64 | 2026-09-25 | Calibrage en deux temps : 3 s de neutre, puis 2 s de sourire volontaire. Seuil propre à chaque joueur : `d = k × (v − n)`, `k` = 0,5 ; amplitude minimale `v − n` = 0,15. Modifie n° 18 et n° 19 (le seuil n'est plus un écart fixe). **À confirmer (P0)** | Un seuil fixe est injuste : l'amplitude mesurée varie selon le visage (barbe, bouche relevée) | Seuil fixe identique pour tous | Arbitrage de Valentin, lot 2 (D2 Q1) |
| 65 | 2026-09-25 | Une perte de visage continue de plus de 5 s compte comme deuxième perte, donc comme faute. Complète n° 21 et n° 60. **À confirmer (P0)** | Sans cela, un joueur échappe au jugement en sortant du champ | Compter les pertes sans limite de durée | Arbitrage de Valentin, lot 2 (D2 Q2) |
| 66 | 2026-09-25 | Estimation du décalage des horloges avant chaque révélation. Fenêtre de simultanéité effective `W = max(200 ms, 2 × erreur estimée)`. Modifie n° 23, précise n° 22 et n° 61. **À confirmer (P1)** | La latence réseau est du même ordre que 200 ms | Fenêtre fixe de 200 ms | Arbitrage de Valentin, lot 2 (D2 Q3) |
| 67 | 2026-09-25 | Deux visages dans le champ = image invalide. Confirme n° 60. | Plus simple, et empêche de se faire remplacer | Suivre le visage le plus proche de la position calibrée | Arbitrage de Valentin, lot 2 (D2 Q4) |
| 68 | 2026-09-25 | Départage à 60 s : pics de jauge égaux à moins de 0,05 = manche nulle, rejouée. Précise n° 24 et n° 49. **À confirmer (P2)** | Un écart infime ne départage pas honnêtement | Non documentée | Arbitrage de Valentin, lot 2 (D2 Q5) |
| 69 | 2026-09-25 | « Aucun enregistrement » (n° 26) signifie aucun stockage persistant, nulle part. L'image de preuve peut être transmise à l'adversaire ; elle reste en mémoire vive et disparaît à la fin du match. Modifie n° 63 (effacement à la fin du match au lieu de la révélation suivante). À reprendre dans [D7](D7-juridique-confidentialite.md). | Image nette et exacte sans rien stocker | Figer le flux vidéo reçu (retardé, compressé) | Arbitrage de Valentin, lot 2 (D2 Q6) |
| 70 | 2026-09-25 | Main devant la bouche : limite acceptée en v1. Hand Landmarker inscrit en dette technique, à mesurer seulement si les tests P0 montrent que la triche par la main est fréquente. | Coût en performance d'une deuxième analyse ; entre amis, l'adversaire voit la main | Hand Landmarker dès la v1 | Arbitrage de Valentin, lot 2 (D2 Q7) |
| 71 | 2026-09-25 | Calibrage une fois par match. Confirme n° 18. | Conforme à la source | Calibrage avant chaque manche | Arbitrage de Valentin, lot 2 (D2 Q8) |
| 72 | 2026-09-25 | Variante du score avec `cheekSquint` testée en P0 à côté de la formule de base (n° 56), sans la remplacer. **À confirmer (P0)** | Réduire les faux positifs dus à la parole | Remplacer d'emblée la formule de base | Arbitrage de Valentin, lot 2 |

## 8. Lot documentaire 3 — D3, partie prototype 0

Précisions de méthode pour le prototype 0. Elles complètent les n° 36, 37, 51 et 52 sans les contredire. Les propositions qui ajoutent un critère restent dans les questions ouvertes de [D3](D3-plan-de-tests.md) §4 jusqu'à l'accord de Valentin.

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 73 | 2026-09-25 | Le prototype 0 tient un journal numérique image par image (scores, angles, luminance, états), sans image ni son ni nom. Il reste sur l'ordinateur de Valentin et est supprimé à la clôture du prototype 0. Précise n° 36 ; compatible avec n° 26 et n° 69, qui portent sur le jeu. | Rejouer l'arbitrage avec d'autres valeurs sans refaire les sessions | Enregistrer la vidéo des sessions pour l'annoter (contraire à l'esprit de n° 26) ; noter à la main sans journal (réglage impossible) | [D3](D3-plan-de-tests.md) §1.4.1 |
| 74 | 2026-09-25 | Faux positif = sourire confirmé que le testeur juge « pas un sourire » sur l'image de preuve et que l'opérateur n'a pas vu. « Conditions normales » rendues mesurables (calibrage réussi, luminance, largeur, angles). Toute condition acceptée par le calibrage compte comme jouable et doit respecter le critère. Précise n° 36 et n° 51. **À confirmer (P0)** | Une vérité terrain sans vidéo ; un calibrage qui accepte la pénombre engage l'arbitrage en pénombre | Vérité terrain par l'opérateur seul | [D3](D3-plan-de-tests.md) §1.2.2, §1.3.4 |
| 75 | 2026-09-25 | Chauffe excessive = une fenêtre de 10 s sous 10 images/s pendant les 5 premières minutes, ou ralentissement visible, ou appareil brûlant au toucher. Précise n° 37 et n° 51. **À confirmer (P0)** | Rendre le critère vérifiable dans le journal | Moyenne sur 5 min (masque les chutes) | [D3](D3-plan-de-tests.md) §1.3.8 |
| 76 | 2026-09-25 | Méthode de réglage : pic soutenu par séquence, intervalle de `k` commun à tous les testeurs, `k` au milieu de l'intervalle ; groupe de réglage (2/3 des testeurs) et groupe de validation (1/3) ; exposition cible de 60 min de non-sourire en conditions normales. | Réglage faisable au tableur ; éviter un seuil ajusté aux seuls testeurs qui ont servi à le régler | Essais et erreurs en direct ; réglage sur tous les testeurs sans validation | [D3](D3-plan-de-tests.md) §1.2.4, §1.5 |
| 77 | 2026-09-25 | Critères de décision du prototype 0 : go, ajustement, abandon de l'arbitrage tel que défini, avec l'effet de chacun sur [D2](D2-regles-jeu-arbitrage.md). En cas d'abandon, les options (arbitrage contestable, sourire franc seulement, restriction des appareils, arrêt) sont soumises à Valentin. Précise n° 36, n° 37 et n° 52. | La source ne prévoyait que « revoir le seuil » | Aucun cas d'abandon | [D3](D3-plan-de-tests.md) §1.6 |

## 9. Lot documentaire 3 — Arbitrages de Valentin sur D3

Réponses de Valentin du 2026-09-25 aux questions Q2 à Q6 de [D3](D3-plan-de-tests.md). Q1 (appareils) reste ouverte.

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 78 | 2026-09-25 | Accord oral des testeurs, noté dans la fiche. Carnation notée en catégorie grossière (claire, mate, foncée), sans nom associé ; effacée avec les journaux à la clôture du prototype 0. Précise n° 73. | Les détecteurs de visage sont sensibles à la carnation ; ne garder que le strict nécessaire | Fiche signée ; ne pas noter la carnation | Arbitrage de Valentin, lot 3 (D3 Q2) |
| 79 | 2026-09-25 | Critère G5 : tous les sourires francs détectés en conditions normales. Complète n° 36. **À confirmer (P0)** | Un sourire franc raté détruit la confiance autant qu'un faux positif | Critère sur les seuls faux positifs | Arbitrage de Valentin, lot 3 (D3 Q3) |
| 80 | 2026-09-25 | Une détection contestée par le testeur alors que l'opérateur a vu un sourire (litigieuse) compte comme faux positif. Précise n° 74. | En jeu, ce serait une contestation | Compter les litigieuses à part | Arbitrage de Valentin, lot 3 (D3 Q4) |
| 81 | 2026-09-25 | Le critère de performance s'applique aux deux mesures : sans charge et avec appel vidéo simulé en boucle locale. Précise n° 37 et n° 75. | Sans appel vidéo, la mesure est optimiste | Mesure sans charge seulement | Arbitrage de Valentin, lot 3 (D3 Q5) |
| 82 | 2026-09-25 | Au plus deux cycles d'ajustement avant de décider l'abandon de l'arbitrage tel que défini. Précise n° 77. | Borner le réglage | Nombre de cycles non limité | Arbitrage de Valentin, lot 3 (D3 Q6) |

## 10. Valeurs de départ simulées

Valeurs de départ fournies par Valentin le 2026-09-25. Elles viennent d'un **modèle du signal MediaPipe**, pas de mesures : score neutre entre 0,03 et 0,35, sourire volontaire entre 0,55 et 0,95, pics de parole jusqu'à 0,4. Statut de chacune : « Simulé, à confirmer » par le prototype indiqué. Les n° 94 à 96 sont les arbitrages de Valentin sur les questions qu'elles ont soulevées. Elles restent soumises à la méthode de réglage du prototype 0 (n° 76).

| N° | Date | Décision | Raison | Alternatives écartées | Source |
|---|---|---|---|---|---|
| 83 | 2026-09-25 | Seuil absolu = neutre + `k` × (sourire volontaire − neutre), `k` = 0,4. Modifie n° 64 (`k` = 0,5). Plafond `d_max` inchangé. Simulé, **à confirmer (P0)** | Selon la simulation, entre 0,3 et 0,5, le résultat dépend peu de `k` une fois le maintien fixé ; 0,4 garde de la marge des deux côtés | `k` = 0,5 ; `k` = 0,3 | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 84 | 2026-09-25 | Durée de maintien : 500 ms. Modifie n° 19 et n° 58 (400 ms). Option « arbitre sévère » à 400 ms inscrite en dette produit. Simulé, **à confirmer (P0)** | Selon la simulation, la parole produit 0,5 faux positif par 20 min à 400 ms, quasi zéro à 500 ms. Coût accepté : la moitié des sourires réprimés de 250 ms ne sont plus détectés | 400 ms (source) | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 85 | 2026-09-25 | Horodatage d'une faute de sourire : début de la série au-dessus du seuil (rétroactif), pas la fin du maintien. Confirme n° 58. Simulé, **à confirmer (P0)** | L'instant a un sens physique : le début du sourire | Horodater à la confirmation (fin du maintien) | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 86 | 2026-09-25 | Cadence d'analyse : 15 images/s, plafonnée et identique sur les deux appareils. Nouvelle décision. Simulé, **à confirmer (P0)** | Des cadences différentes biaisent « qui a souri en premier » | Cadence libre, la plus haute possible par appareil | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 87 | 2026-09-25 | Lissage : moyenne mobile sur 3 images. Modifie n° 56 (200 ms, équivalent à 15 images/s). Simulé, **à confirmer (P0)** | Selon la simulation, 3 images suppriment les faux positifs résiduels ; 5 images dégradent la détection | Fenêtre de 200 ms ; 5 images | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 88 | 2026-09-25 | Fenêtre de simultanéité : 100 ms ; fenêtre effective `W = max(100 ms, 2 × erreur de synchro estimée)`. Modifie n° 23, n° 61 et n° 66 (200 ms). Simulé, **à confirmer (P2)** ; multiplicateur **à confirmer (P1)** | Selon la simulation, erreur de synchro de 24 ms au 95e centile plus une image (67 ms) : au-delà de 100 ms, l'erreur de classement est nulle. 200 ms produisait des manches nulles inutiles | Plancher de 200 ms | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 89 | 2026-09-25 | Synchronisation des horloges : 5 allers-retours avant chaque révélation ; échantillons retenus au plus faible aller-retour. Précise n° 22 et n° 66. Simulé, **à confirmer (P1)** | Selon la simulation, erreur au 95e centile : 41 ms avec 1 aller-retour, 24 ms avec 5 ; 10 n'améliorent plus | 1 aller-retour ; 10 allers-retours | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 90 | 2026-09-25 | Calibrage du neutre : 3 s, valeur = médiane du score lissé. Confirme n° 18, n° 56 et n° 64. Simulé, **à confirmer (P0)** | Selon la simulation, erreur sous 2 points sur 100, même avec un micro-mouvement ; 5 s n'apportent rien | Phase neutre de 5 s | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 91 | 2026-09-25 | Calibrage du sourire volontaire : 2 s, valeur = maximum du score lissé. Modifie la définition de `v` (médiane de la dernière seconde). Simulé, **à confirmer (P0)** | Viser haut : selon la simulation, sous-estimer `v` de 40 % multiplie les faux positifs par 20 ; le surestimer de 40 % ne coûte que 7 % de sourires manqués | Médiane de la dernière seconde | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 92 | 2026-09-25 | Délai de visage perdu : 1,5 s, inchangé par la simulation. Confirme n° 21. Simulé, **à confirmer (P0)** | Non documentée | Non documentée | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 93 | 2026-09-25 | Durée de la manche : 60 s, inchangée par la simulation. Confirme n° 10. Simulé, **à confirmer (P2)** | Non documentée | Non documentée | Valeurs de départ simulées, [D2](D2-regles-jeu-arbitrage.md) §3 |
| 94 | 2026-09-25 | Cadence commune : les deux appareils s'alignent sur la cadence la plus basse, mesurée avant chaque révélation, avec un plancher de 10 images/s. Précise n° 86. **À confirmer (P0)** | Une cadence commune est la condition de l'équité (n° 86) ; 10 images/s est le critère de performance du prototype 0 (n° 37) | Imposer 15 images/s aux deux appareils ; laisser chaque appareil à sa cadence | Arbitrage de Valentin, valeurs simulées (D2 Q2) |
| 95 | 2026-09-25 | Fenêtre effective `W = max(100 ms, 2 × e + i)`, `i` étant l'intervalle d'image de la cadence commune. Modifie n° 66 et n° 88. **À confirmer (P1)** | Un horodatage n'est connu qu'à une image près : on ne désigne pas de perdant sur un écart non mesurable | `W = max(100 ms, 2 × e)` | Arbitrage de Valentin, valeurs simulées (D2 Q3) |
| 96 | 2026-09-25 | [D3](D3-plan-de-tests.md) aligné sur les valeurs simulées : pic soutenu sur 500 ms ; rejeu de l'étape 9 avec 400 et 600 ms de maintien, 2 et 4 images de lissage. | Cohérence entre D2 et D3 | Attendre le lot 7 | Arbitrage de Valentin, valeurs simulées (D2 Q4) |

## 11. Questions ouvertes

Aucune dans ce journal. Q1 (dates) et Q2 (raisons des n° 5, 7 et 9) ont été résolues par Valentin le 2026-09-25. Les questions du lot 2 et des valeurs simulées sont dans [D2](D2-regles-jeu-arbitrage.md) §7 ; celles du lot 3 dans [D3](D3-plan-de-tests.md) §4.
