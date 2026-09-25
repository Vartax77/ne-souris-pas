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
- Les décisions des lots 1, 2 et 3 portent la date de validation de la source : 2026-09-22 (voir question ouverte Q1).
- « Non documentée » : la source ne donne ni raison ni alternative. Rien n'est inventé.
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
| 5 | 2026-09-22 | Âge minimum : 18 ans, dès la v1. | Non documentée | Non documentée | §3.1 |
| 6 | 2026-09-22 | Vision à terme : rencontre avec des inconnus, proche de Chatroulette. Exclue de la v1. | La v1 couvre le cas principal sans le risque des inconnus | Mode inconnus dès la v1 | §3.1, §3.3 |
| 7 | 2026-09-22 | Budget relais : 0 € pour le prototype (offres à quota gratuit), puis 10 € par mois maximum. | Non documentée | Non documentée | §3.1 |
| 8 | 2026-09-22 | Parole autorisée pendant les manches. | Les joueurs sont les seuls provocateurs (duel symétrique) | Non documentée | §3.1, §3.3 |
| 9 | 2026-09-22 | Les deux jauges sont visibles par les deux joueurs. | Non documentée | Non documentée | §3.1 |
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
| 18 | 2026-09-22 | Avant la partie : calibrage de 3 s visage neutre, contrôle lumière et cadrage. Pas de démarrage si la qualité est insuffisante. Durée **À confirmer (P0)** | Non documentée | Non documentée | §3.4 |
| 19 | 2026-09-22 | Sourire détecté : mesure au-dessus du neutre de référence + seuil, maintenue au moins 400 ms. Seuil et durée **À confirmer (P0)** | Non documentée | Non documentée | §3.4 |
| 20 | 2026-09-22 | Zone de doute (entre neutre et sourire) : aucune pénalité, la jauge du joueur monte. | Non documentée | Non documentée | §3.4 |
| 21 | 2026-09-22 | Visage perdu plus de 1,5 s : avertissement. Deuxième fois dans la manche : manche perdue. Durée **À confirmer (P0)** | Non documentée | Non documentée | §3.4 |
| 22 | 2026-09-22 | Qui a souri en premier : horodatage local sur chaque appareil, horloges synchronisées au signal de révélation. Précision **À confirmer (P2)** | Non documentée | Non documentée | §3.4 |
| 23 | 2026-09-22 | Sourires quasi simultanés (écart < 200 ms) : manche nulle, rejouée. Écart **À confirmer (P2)** | Non documentée | Non documentée | §3.4 |
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

## 6. Questions ouvertes

| N° | Question | Impact |
|---|---|---|
| Q1 | Les décisions des lots 1 et 2 ont-elles des dates distinctes ? Elles sont toutes datées du 2026-09-22, date de validation de la source. | Ordre chronologique exact du journal |
| Q2 | Veux-tu compléter les raisons et alternatives marquées « Non documentée », en priorité pour les n° 5 (18 ans dès la v1), 7 (budget) et 9 (deux jauges visibles) ? | Traçabilité des choix |
