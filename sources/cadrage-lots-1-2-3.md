# « Ne souris pas » — Décisions de cadrage (lots 1, 2 et 3)

Statut : Validé par Valentin — 22 septembre 2026
Rôle : source de vérité de toutes les décisions prises avant la conception documentaire.

## 1. Concept

Application de jeu à deux joueurs. Chaque joueur apparaît via la caméra de son appareil ; les deux visages sont affichés côte à côte. Le but : ne pas sourire ni rire. L'application reconnaît le sourire sur chaque visage pour arbitrer le match automatiquement.

Porteur : développeur solo, spécialisé en PWA.

## 2. Lot 1 — Remise en question de l'idée (synthèse)

### 2.1 Hypothèses critiques

| # | Hypothèse | Solidité |
|---|---|---|
| H1 | La détection du sourire est assez fiable pour que les joueurs acceptent l'arbitrage | Moyenne |
| H2 | Voir l'autre lutter suffit à faire rire, sans contenu externe | Faible |
| H3 | Une partie courte donne envie d'en rejouer une autre | Moyenne |
| H4 | Les joueurs acceptent d'être filmés et analysés | Bonne entre proches, fragile avec des inconnus |
| H5 | L'application apporte plus qu'un simple appel vidéo où l'on se lance le défi soi-même | Critique |
| H6 | Chaque joueur dispose d'un appareil récent avec caméra frontale correcte | Bonne |

Valeur ajoutée par rapport à un appel vidéo (H5) : arbitre impartial, mesure précise, clip du moment où l'un craque (hors v1).

### 2.2 Forces

- Règle comprise en une seconde.
- L'arbitre automatique crée la tension et supprime la contestation.
- Le moment où l'un craque est naturellement drôle et partageable.
- La technique existe dans le navigateur (MediaPipe Face Landmarker, mesures de sourire en local, y compris Safari iOS).
- L'analyse peut rester sur chaque appareil : seuls des événements horodatés circulent.

### 2.3 Risques majeurs

1. L'ennui (H2) : sans provocation, il ne se passe rien.
2. L'arbitrage injuste (faux positifs) : une seule erreur visible détruit la confiance.
3. La différenciation face aux filtres gratuits des réseaux sociaux (H5).

Autres risques identifiés : faux positifs liés à la parole, à la barbe, à une bouche naturellement relevée ; éclairage et angles ; triche (main devant la bouche, tête tournée) ; latence vidéo ; échec de connexion WebRTC sur certains réseaux ; chauffe et batterie sur iOS, mise en veille, blocage du son ; vie privée des flux vidéo ; acquisition (il faut convaincre deux personnes) ; monétisation faible.

### 2.4 Arbitrages de Valentin sur le lot 1

| Question | Décision |
|---|---|
| Cible | Un seul appareil par joueur, celui de son choix (téléphone, ordinateur, tablette). Jeu **principalement à distance**, avec un ami ou des inconnus |
| Objectif | Prototype fun + pièce de portfolio ; monétisation décidée seulement après test avec de vrais joueurs |
| Provocations | **Aucune ajoutée par l'application** : l'apparition soudaine du visage suffit |
| Variante retenue | Pivot A : duel à distance (le mode soirée sur grand écran est abandonné ; le clip partageable est hors v1) |

## 3. Lot 2 — Périmètre de la première version

### 3.1 Décisions de Valentin sur le lot 2

| Point | Décision |
|---|---|
| Âge minimum | **18 ans**, dès la v1 |
| Vision produit | Fonctionnement cible proche de Chatroulette (rencontre avec des inconnus) ; **exclu de la v1**, réintégré plus tard à 18 ans minimum |
| Appareil | Un appareil par joueur, celui de son choix |
| Budget relais | Zéro euro pour le prototype (offres à quota gratuit), puis **10 € par mois maximum** |
| Son | **Parole autorisée** pendant les manches |
| Jauges | Les **deux jauges** visibles par les deux joueurs |
| Format | Manches de **60 s**, match en **2 manches gagnantes** (valeurs ajustables après tests) |

### 3.2 Plateforme

| Choix | Justification |
|---|---|
| PWA web, un appareil par joueur, tout navigateur récent avec caméra frontale ou webcam | Une seule base de code ; invitation par lien sans installation |
| Vidéo et audio en WebRTC pair à pair | Le flux ne passe par aucun serveur capable de le lire ou de le stocker |
| Détection du sourire par MediaPipe Face Landmarker, exécutée sur l'appareil de chaque joueur | Chaque appareil juge son propre joueur ; la latence réseau ne fausse pas le jugement |
| Petit serveur de mise en relation + relais vidéo (TURN) | Sans relais, une partie des connexions (4G, certains réseaux) échoue |

### 3.3 Mode de jeu

| Choix | Justification |
|---|---|
| Duel 1 contre 1 à distance, entre amis, via un lien d'invitation | Cas d'usage principal, sans le risque des inconnus |
| Duel symétrique : les deux joueurs doivent tenir et peuvent faire rire l'autre (grimaces, paroles) | Les joueurs sont les seuls provocateurs |
| L'apparition comme mécanique : écran noir, compte à rebours 3-2-1, révélation simultanée des deux visages à chaque manche | Transforme l'intuition « l'apparition intimide » en moment fort répété |
| Match en 2 manches gagnantes, manche de 60 s | Parties courtes, revanche facile |

### 3.4 Règles d'arbitrage

| Situation | Règle |
|---|---|
| Avant la partie | Calibrage de 3 s visage neutre + contrôle lumière et cadrage ; pas de démarrage si la qualité est insuffisante |
| Sourire détecté | Mesure au-dessus du neutre de référence + seuil, maintenue au moins 400 ms (seuil exact fixé par le prototype 0) |
| Zone de doute | Entre « neutre » et « sourire » : aucune pénalité, la jauge du joueur monte |
| Visage perdu | Plus de 1,5 s : avertissement ; deuxième fois dans la manche : manche perdue |
| Qui a souri en premier | Horodatage local sur chaque appareil, horloges synchronisées au signal de révélation |
| Sourires quasi simultanés (écart < 200 ms) | Manche nulle, rejouée |
| Personne ne craque en 60 s | Perd celui dont la jauge est montée le plus haut pendant la manche |
| Preuve | Arrêt sur image sur les deux écrans au moment de la détection, sans enregistrement |

### 3.5 Vidéo et vie privée

- Aucun enregistrement vidéo ni audio, nulle part.
- Flux chiffrés de bout en bout par WebRTC ; le relais transmet sans pouvoir lire.
- Aucun compte : salon à code aléatoire, qui expire à la fin du match.
- Case « j'ai 18 ans ou plus » + écran d'explication avant la demande d'accès caméra et micro.
- Courte page de confidentialité : analyse locale, rien de stocké.

### 3.6 Exclusions de la v1

| Exclu | Réintégration |
|---|---|
| Jeu avec des inconnus | Après validation du jeu entre amis, avec 18 ans minimum, signalement, bannissement, modération et arbitrage vérifié côté serveur |
| Clip partageable du fou rire | v2, si les testeurs veulent partager (double consentement) |
| Provocations de l'application | Seulement si le critère d'ennui est franchi (voir 3.7) |
| Comptes, classements, historique | Avec le mode inconnus |
| Détection sonore du rire | v2, si les testeurs rient sans sourire visible |
| Monétisation | Après les tests |
| Mode soirée sur grand écran | Abandonné |

### 3.7 Risques restants et tests

| Risque | Test | Critère de décision |
|---|---|---|
| Arbitrage injuste | Prototype 0 : détection seule, sans réseau, 5 à 10 visages (barbe, lunettes, pénombre, parole) | Aucun faux positif en conditions normales, sinon revoir le seuil |
| Performance | Prototype 0 sur l'appareil le plus ancien disponible | Au moins 10 images analysées par seconde, sans chauffe excessive en 5 minutes |
| Connexion à distance | Prototype 1 : appel vidéo seul sur réseaux différents (Wi-Fi / 4G, box différentes) | 100 % des connexions aboutissent avec le relais |
| Ennui | Prototype 2 : duel complet, 10 matchs avec des proches | Si plus de la moitié des manches vont au bout des 60 s, réintroduire des provocations |
| Intérêt du jeu | Même test | Revanche spontanée dans au moins la moitié des matchs |
| Demande pour le mode inconnus | Question aux testeurs : « joueriez-vous avec un inconnu ? » | Oriente le lancement de ce chantier |

## 4. Lot 3 — Documents à concevoir

Barème — Effort : faible = une séance, moyen = deux ou trois, élevé = davantage. Priorité : P1 = avant de coder le prototype 0 ; P2 = avant les prototypes 1 et 2 ; P3 = avant que le lien circule hors du cercle proche.

| N° | Document | Priorité | Effort | Dépend de |
|---|---|---|---|---|
| D1 | Note de cadrage | P1 | Faible | — |
| D2 | Règles du jeu et d'arbitrage | P1 (partie arbitrage), P2 (reste) | Moyen | D1 |
| D3 | Plan de tests et critères de décision | P1 (prototype 0), P2 (prototypes 1 et 2) | Faible | D2, puis D4 |
| D4 | Architecture technique | P2 | Moyen à élevé | D1, D2 |
| D5 | Parcours utilisateur et maquettes d'écrans | P2 | Moyen | D2 |
| D6 | Découpage en lots de développement | P2 | Faible | D2, D4, D5 |
| D7 | Documents juridiques et confidentialité | P3 | Faible à moyen | D4 |
| D8 | Journal des décisions | Continu | Très faible | — |

### 4.1 Contenu attendu de chaque document

**D1 — Note de cadrage.** Une page de référence. Vision (duel à distance, cible Chatroulette à terme), public (18 ans et plus), périmètre v1, exclusions et conditions de réintégration, hypothèses critiques, critères de succès des tests. Questions : qu'est-ce qu'on construit, pour qui, qu'est-ce qu'on ne construit pas, à quoi saura-t-on que la v1 a réussi ?

**D2 — Règles du jeu et d'arbitrage.** Déroulé d'un match étape par étape (salon, calibrage, écran noir, compte à rebours, révélation, manche, arrêt sur image, fin, revanche) ; règles d'arbitrage ; comportement des jauges ; tableau des réglages avec valeur de départ (seuil, 400 ms, 1,5 s, 200 ms, 60 s). Questions : que se passe-t-il à chaque instant ? En cas de déconnexion en pleine manche, de non-retour, d'abandon volontaire ? Quels réglages restent modifiables après tests ?

**D3 — Plan de tests et critères de décision.** Une partie par prototype. P0 : panel de visages, conditions, mesures, grille de résultats, méthode de réglage du seuil. P1 : combinaisons de réseaux, taux de connexion attendu. P2 : déroulé des 10 matchs, métriques, questions aux testeurs. Question : quel résultat valide ou invalide chaque risque, et quelle décision en découle ?

**D4 — Architecture technique.** Schéma des composants (PWA, module de détection, module WebRTC, serveur de mise en relation, relais) ; format des messages (événements horodatés, synchronisation des horloges, fin de manche) ; choix des services de mise en relation et de relais (quota gratuit, conditions à vérifier, coûts en euros) ; compatibilité navigateurs (Safari iOS, Chrome Android, ordinateur) ; performances cibles ; mise en page téléphone portrait / ordinateur paysage ; points d'extension pour le futur mode inconnus (mise en relation aléatoire, arbitrage vérifiable par le serveur, signalement). Questions : quelles données circulent, par où ? Où est la source de vérité de l'arbitrage ? Qu'est-ce qui coûte et à partir de quel volume ? Comment ne pas rendre le mode inconnus impossible ?

**D5 — Parcours utilisateur et maquettes d'écrans.** Parcours hôte (créer un salon, partager le lien) et invité (ouvrir le lien, rejoindre) ; écran d'explication avant l'accès caméra et micro ; case d'âge ; calibrage ; compte à rebours et révélation ; écran de duel (deux vidéos, deux jauges) ; arrêt sur image ; fin de match et revanche ; écrans d'erreur (caméra refusée, lumière insuffisante, connexion impossible, adversaire parti). Chaque écran en version téléphone et ordinateur. Questions : combien de gestes du lien reçu au duel ? Que voit le joueur quand quelque chose échoue ?

**D6 — Découpage en lots de développement.** Lots rattachés aux prototypes (P0 détection seule ; P1 appel vidéo seul ; P2 duel complet), tâches, critère de « terminé », lien vers la partie de D3 qui teste chaque lot. Questions : que livre chaque lot ? Quel lot abandonner ou modifier si un test échoue ?

**D7 — Documents juridiques et confidentialité.** Politique de confidentialité (caméra, micro, analyse locale, aucun enregistrement, données techniques qui transitent : adresse IP via mise en relation et relais, pays d'hébergement) ; mentions légales ; conditions d'utilisation (18 ans minimum, comportements interdits) ; registre de traitement simplifié. À faire relire par une personne qualifiée avant le mode inconnus.

**D8 — Journal des décisions.** Une ligne par décision : date, décision, raison, alternatives écartées. Les décisions des lots 1 et 2 constituent les premières entrées.

### 4.2 Ordre de production

1. D1 et D8 (premières entrées).
2. D2, partie arbitrage.
3. D3, partie prototype 0 → le code du prototype 0 peut commencer.
4. Développement et test du prototype 0 (réglage du seuil ; correction de D2 si nécessaire).
5. D2 complet, puis D4 et D5.
6. D6, puis D3 parties prototypes 1 et 2.
7. D7, avant d'ouvrir le lien au-delà des proches.

### 4.3 Documents écartés

Cahier des charges complet (doublon de D1 + D2 + D5) ; dossier du mode inconnus (modération, vérification d'âge, obligations des plateformes : après validation du prototype 2) ; analyse d'impact sur la protection des données (avec le mode inconnus) ; étude de marché et modèle économique (après tests) ; nom et identité visuelle (après tests) ; plan de communication ; manuel utilisateur (règles affichées dans l'application) ; plan de sauvegarde (aucune donnée stockée).
