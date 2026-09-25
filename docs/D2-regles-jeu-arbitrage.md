# D2 — Règles du jeu et d'arbitrage

| Champ | Valeur |
|---|---|
| Objet | Fixer les règles d'arbitrage et leurs réglages, assez précisément pour les coder sans interprétation |
| Statut | Brouillon — partie arbitrage seulement (Priorité 1) ; le déroulé du match viendra au lot 4 (Priorité 2) |
| Date | 2026-09-25 |
| Dépend de | [D1](D1-note-de-cadrage.md) ; [source de cadrage](../sources/cadrage-lots-1-2-3.md) §3.4 ; [D8](D8-journal-decisions.md) n° 18 à 26, 49, 56 à 72, 83 à 96 |
| Utilisé par | [D3](D3-plan-de-tests.md) (réglage des valeurs en P0) ; [D4](D4-architecture-technique.md) (messages, horloges) ; [D5](D5-parcours-maquettes.md) (écrans) ; [D7](D7-juridique-confidentialite.md) (image de preuve) |

## 1. Périmètre

- Ce document couvre l'arbitrage : calibrage, détection, jauge, visage perdu, simultanéité, départage, arrêt sur image.
- Le déroulé du match (salon, écran noir, compte à rebours, revanche, déconnexion, abandon) relève du lot 4 (section 6).
- Le transport des messages et la synchronisation des horloges relèvent de [D4](D4-architecture-technique.md).
- Chaque appareil juge **son propre joueur** (n° 13). Les règles ci-dessous s'appliquent à l'identique sur les deux appareils.

## 2. Définitions

Toutes les mesures viennent de MediaPipe Face Landmarker, exécuté sur l'appareil du joueur, avec les options `outputFaceBlendshapes: true`, `outputFacialTransformationMatrixes: true` et `numFaces: 2`.

| Terme | Définition |
|---|---|
| Image analysée | Une image de la caméra passée à Face Landmarker, avec son horodatage local en millisecondes |
| Score brut `s` | Moyenne de `mouthSmileLeft` et `mouthSmileRight` (de 0 à 1). Formule de base. **À confirmer (P0)** |
| Variante du score | `s` compté seulement si la moyenne de `cheekSquintLeft` et `cheekSquintRight` dépasse un plancher. Testée en P0 à côté de la formule de base, sans la remplacer (n° 72) |
| Cadence d'analyse | Nombre d'images analysées par seconde : 15 au plus, identique sur les deux appareils, alignée sur l'appareil le plus lent, 10 au moins (5.8) |
| Intervalle d'image `i` | 1 s divisée par la cadence commune : 67 ms à 15 images/s, 100 ms à 10 images/s |
| Score lissé `S` | Moyenne mobile des scores bruts des 3 dernières images valides (200 ms à 15 images/s) |
| Neutre `n` | Médiane de `S` pendant la phase neutre du calibrage (R1) |
| Sourire volontaire `v` | Maximum de `S` pendant la phase sourire du calibrage (R1) |
| Seuil `d` | Seuil propre au joueur : `d = min(k × (v − n), d_max)`. Une image est souriante au-dessus de `n + d`, soit `n + k × (v − n)` hors plafond |
| Marge `m` | Écart au-dessus du neutre en dessous duquel le joueur est « neutre » |
| Image valide | Exactement un visage détecté, dont la largeur et les angles respectent les réglages (section 3) |
| Image souriante | Image valide avec `S ≥ n + d` |
| Image de doute | Image valide avec `n + m < S < n + d` |
| Jauge `J` | `J = min(1, max(0, (S − n − m) / (d − m)))`, affichée en pourcentage |
| t0 | Signal de révélation de la manche. Tous les temps de manche sont comptés depuis t0 |
| Erreur d'horloge `e` | Incertitude estimée sur le décalage entre les horloges des deux appareils, mesurée avant chaque révélation ([D4](D4-architecture-technique.md)) |
| Fenêtre effective `W` | `W = max(100 ms, 2 × e + i)` |
| Faute | Sourire confirmé (R2) ou deuxième perte de visage (R4). La première faute fait perdre la manche |
| Aucun enregistrement | Aucun stockage persistant, nulle part : ni disque, ni stockage du navigateur, ni serveur. La mémoire vive est permise (n° 69) |

Angles : lacet (tête tournée) et tangage (tête penchée), calculés depuis la matrice de transformation du visage.
Largeur du visage : écart horizontal entre les repères extrêmes, rapporté à la largeur de l'image.

## 3. Tableau des réglages

Toutes les valeurs sont modifiables après les tests. « Hypothèse » : valeur de départ choisie pour être testée, pas mesurée. « Simulé » : valeur de départ issue d'une simulation du signal MediaPipe (n° 83 à 93), pas d'une mesure.

| Nom | Valeur de départ | Unité | Rôle | Origine | Validé par |
|---|---|---|---|---|---|
| Durée de la phase neutre | 3 | s | Mesure du neutre `n` (médiane de `S`) | Source ; simulation (n° 90) | Simulé, **à confirmer (P0)** |
| Durée de la phase sourire | 2 | s | Mesure du sourire volontaire `v` (maximum de `S`) | Valentin (n° 64) ; simulation (n° 91) | Simulé, **à confirmer (P0)** |
| Présence minimale au calibrage | 90 | % des images, par phase | Rejette un calibrage où le visage sort du champ | Hypothèse | **À confirmer (P0)** |
| Largeur minimale du visage | 20 | % de la largeur de l'image | Rejette un visage trop loin ; image invalide en manche | Hypothèse | **À confirmer (P0)** |
| Lacet maximal | 25 | degrés | Au-delà, image invalide (tête tournée) | Hypothèse | **À confirmer (P0)** |
| Tangage maximal | 20 | degrés | Au-delà, image invalide (tête penchée) | Hypothèse | **À confirmer (P0)** |
| Luminance minimale du visage | 60 | niveau sur 255 | Rejette un calibrage trop sombre | Hypothèse | **À confirmer (P0)** |
| Écart-type maximal en phase neutre | 0,05 | score | Rejette un neutre où le visage bouge ou sourit | Hypothèse | **À confirmer (P0)** |
| Plafond du neutre | 0,35 | score | Rejette un neutre trop haut | Hypothèse | **À confirmer (P0)** |
| Amplitude minimale `v − n` | 0,15 | score | Rejette un sourire volontaire trop faible | Hypothèse | **À confirmer (P0)** |
| Coefficient `k` | 0,4 | sans unité | Place le seuil à 40 % du chemin entre neutre et sourire volontaire | Simulation (n° 83) | Simulé, **à confirmer (P0)** |
| Seuil maximal `d_max` | 0,35 | score | Empêche de gonfler son seuil en exagérant le sourire volontaire (5.2, Q1) | Hypothèse, provisoire | **À confirmer (P0)** |
| Plancher de la variante `cheekSquint` | 0,20 | score | Variante du score testée en P0 | Hypothèse | **À confirmer (P0)** |
| Cadence d'analyse maximale | 15 | images/s | Plafond commun aux deux appareils ; une cadence différente biaise « qui a souri en premier » | Simulation (n° 86) | Simulé, **à confirmer (P0)** |
| Cadence d'analyse minimale | 10 | images/s | Plancher de la cadence commune | Valentin (n° 94) | **À confirmer (P0)** |
| Fenêtre de lissage | 3 | images | Moyenne mobile pour `S` ; évite qu'une image bruitée compte | Simulation (n° 87) | Simulé, **à confirmer (P0)** |
| Marge `m` | 0,05 | score | Frontière neutre / zone de doute | Hypothèse | **À confirmer (P0)** |
| Durée de maintien | 500 | ms | Durée minimale d'un sourire confirmé | Simulation (n° 84), modifie la source | Simulé, **à confirmer (P0)** |
| Images minimales par sourire | 3 | images | Évite de confirmer sur deux images espacées | Hypothèse | **À confirmer (P0)** |
| Images tolérées dans une série | 1 | image | Une image non souriante isolée n'interrompt pas la série | Hypothèse | **À confirmer (P0)** |
| Délai de visage perdu | 1,5 | s | Au-delà, perte comptée | Source ; inchangé par la simulation (n° 92) | Simulé, **à confirmer (P0)** |
| Perte continue maximale | 5 | s | Au-delà, la perte compte comme deuxième perte | Valentin (n° 65) | **À confirmer (P0)** |
| Pertes avant manche perdue | 2 | pertes par manche | La deuxième perte est une faute | Source | **À confirmer (P0)** |
| Fenêtre de simultanéité minimale | 100 | ms | Plancher de `W` | Simulation (n° 88), modifie la source | Simulé, **à confirmer (P2)** |
| Multiplicateur de l'erreur d'horloge | 2 | sans unité | `W = max(100 ms, 2 × e + i)` (n° 95) | Valentin (n° 66) | **À confirmer (P1)** |
| Allers-retours de synchronisation | 5 | allers-retours par révélation | Estimation du décalage des horloges ; échantillons retenus au plus faible aller-retour | Simulation (n° 89) | Simulé, **à confirmer (P1)** |
| Durée de la manche | 60 | s | Départage au-delà | Source ; inchangée par la simulation (n° 93) | Simulé, **à confirmer (P2)** |
| Écart de pics pour égalité | 0,05 | jauge (0 à 1) | Départage : pics plus proches = manche nulle | Valentin (n° 68) | **À confirmer (P2)** |

## 4. Règles d'arbitrage

Colonnes des tableaux de cas limites : le cas, puis le comportement attendu de l'application. « Rien de particulier » signifie que la règle s'applique telle quelle.

### 4.1 R1 — Calibrage

1. Le calibrage a lieu une fois par match, avant la première manche (n° 18, confirmé par n° 71).
2. **Phase neutre** : le joueur regarde la caméra, visage neutre, pendant 3 s.
3. **Phase sourire** : le joueur sourit franchement pendant 2 s. `v` est le maximum de `S` sur la phase. On vise haut : selon la simulation, sous-estimer `v` coûte environ 20 fois plus de faux positifs que le surestimer (n° 91).
4. Le calibrage est rejeté si une seule de ces conditions est vraie :
   - moins de 90 % d'images valides dans l'une des phases ;
   - largeur médiane du visage sous 20 % ;
   - lacet ou tangage médian au-delà des limites ;
   - luminance moyenne de la zone du visage sous 60/255 (calculée sur les pixels de l'image, pas par MediaPipe) ;
   - écart-type du score brut au-dessus de 0,05 en phase neutre ;
   - neutre `n` au-dessus de 0,35 ;
   - amplitude `v − n` sous 0,15.
5. En cas de rejet, l'application affiche la **première** cause rencontrée, dans l'ordre ci-dessus, et fait recommencer les deux phases. Le nombre d'essais n'est pas limité.
6. En cas de succès, l'appareil garde `n` et calcule `d = min(0,4 × (v − n), 0,35)`. La manche ne peut pas démarrer tant que les deux joueurs n'ont pas réussi leur calibrage.
7. Si le seuil est plafonné par `d_max`, rien n'est affiché au joueur. Le plafonnement est noté pour l'analyse des tests P0.

| Cas | Comportement attendu |
|---|---|
| Parole | En phase neutre, l'écart-type dépasse 0,05 : rejet, message « Restez silencieux et immobile ». En phase sourire, rien de particulier. |
| Bâillement | En phase neutre, même effet que la parole : rejet. |
| Rire sans sourire | Rien de particulier. |
| Lunettes | Calibrer avec les lunettes portées pendant le jeu. Un reflet qui empêche la détection fait baisser la présence : rejet pour cause de présence. |
| Barbe | L'amplitude mesurée est plus faible, mais le seuil propre au joueur s'y adapte. Si `v − n < 0,15` : rejet, message « Souriez franchement ». |
| Deux visages | Images invalides. Si elles dépassent 10 % d'une phase : rejet, message « Un seul visage dans le champ ». |
| Caméra coupée | Aucune image : rejet pour cause de présence. |

### 4.2 R2 — Détection du sourire

1. Une série commence à la première image souriante dont l'horodatage est ≥ t0.
2. La série continue tant que les images sont souriantes. Une seule image non souriante (doute, neutre ou invalide) est tolérée par série, à condition que l'image suivante soit souriante. Sinon, la série s'arrête et rien n'est compté.
3. Le sourire est **confirmé** dès que la série couvre au moins 500 ms (entre sa première et sa dernière image souriante) et contient au moins 3 images souriantes.
4. L'horodatage du sourire est celui de la **première image** de la série, pas celui de la confirmation : horodatage rétroactif (n° 85).
5. Un sourire confirmé est une faute. Il ne compte que si son horodatage est dans [t0 ; t0 + 60 s[ (voir R6).
6. L'analyse continue pendant l'écran noir et le compte à rebours, pour que `S` soit déjà calculé à t0. Les images antérieures à t0 ne comptent pas pour les fautes.
7. En P0 seulement, la variante `cheekSquint` est calculée en parallèle et journalisée. Elle ne décide rien en jeu (n° 72).

| Cas | Comportement attendu |
|---|---|
| Parole | Autorisée (n° 8). Les syllabes brèves ne tiennent pas 500 ms : pas de faute. Selon la simulation, 0,5 faux positif par 20 min à 400 ms, quasi zéro à 500 ms (n° 84). Une voyelle tenue qui étire la bouche (« iii ») peut produire une faute : risque mesuré en P0 avec la variante `cheekSquint`. |
| Bâillement | Aucune exception. Si `S` dépasse le seuil 500 ms, c'est une faute. À mesurer en P0. |
| Rire sans sourire | Un rire sonore sans sourire visible n'est pas une faute (la détection sonore est reportée en v2, n° 34). Un rire bouche ouverte fait monter `mouthSmile` : faute normale. |
| Lunettes | Rien de particulier : le score ne dépend que de la bouche. |
| Barbe | Rien de particulier : le seuil est propre au joueur. |
| Deux visages | Images invalides : elles cassent la série (au-delà de l'image tolérée). La durée compte pour R4. |
| Caméra coupée | Aucune image : la série s'arrête. R4 s'applique. |

### 4.3 R3 — Zone de doute et jauge

1. La jauge `J` est calculée sur chaque image valide ≥ t0 et envoyée à l'adversaire pour affichage (les deux jauges sont visibles, n° 9).
2. La zone de doute ne donne aucune pénalité (n° 20). Seule R2 crée une faute de sourire.
3. L'appareil garde le **pic** de `J` de la manche : sa valeur maximale depuis t0 (n° 49). Le pic sert au départage (R6).
4. Sur une image invalide, `J` n'est pas recalculée : la dernière valeur reste affichée et le pic ne change pas.
5. Le pic est remis à zéro à chaque nouvelle manche, y compris une manche rejouée.

| Cas | Comportement attendu |
|---|---|
| Parole | La jauge bouge pendant la parole. C'est voulu : l'adversaire voit l'effort. Le pic peut monter, ce qui pèse au départage (voir 5.5). |
| Bâillement | La jauge peut monter. Aucune pénalité. |
| Rire sans sourire | La jauge reste basse. |
| Lunettes | Rien de particulier. |
| Barbe | Rien de particulier : la jauge est normalisée par le seuil propre au joueur. |
| Deux visages | Images invalides : jauge figée. |
| Caméra coupée | Jauge figée à sa dernière valeur. |

### 4.4 R4 — Visage perdu

1. Une **perte** commence à la première image invalide ou, si aucune image n'arrive, à la dernière image reçue. Une image est invalide si aucun visage n'est détecté, si deux visages sont détectés, si le visage est trop petit ou si ses angles dépassent les limites.
2. La perte se termine à la première image valide.
3. Une perte est **comptée** quand elle dure plus de 1,5 s. À ce moment :
   - première perte comptée de la manche : avertissement affiché aux deux joueurs ;
   - deuxième perte comptée de la manche : faute, horodatée au début de la perte + 1,5 s.
4. Une perte continue qui dure plus de 5 s compte comme deuxième perte, même si c'est la première de la manche (n° 65). Faute horodatée au début de la perte + 5 s.
5. Le compteur de pertes est remis à zéro à chaque manche.
6. Les pertes ne comptent qu'après t0. Une perte en cours à t0 commence à t0.

| Cas | Comportement attendu |
|---|---|
| Parole | Rien de particulier. |
| Bâillement | Une main devant la bouche ne fait souvent pas perdre le visage : MediaPipe continue d'estimer la bouche. Limite acceptée en v1 (5.4). Un bâillement tête en arrière dépasse le tangage : perte si plus de 1,5 s. |
| Rire sans sourire | Se cacher le visage pour rire : perte si plus de 1,5 s, faute si plus de 5 s. Se plier de rire hors du champ : idem. |
| Lunettes | Un reflet fort peut faire perdre le visage : la règle s'applique sans exception. |
| Barbe | Rien de particulier. |
| Deux visages | Images invalides (n° 67) : une personne qui passe derrière le joueur plus de 1,5 s déclenche une perte. Cela empêche aussi de se faire remplacer. |
| Caméra coupée | Coupure, permission retirée, appareil en veille ou analyse bloquée : plus aucune image, donc perte. Faute après 5 s au plus. Pas d'exception pour une cause technique. |

### 4.5 R5 — Horodatage et simultanéité

1. Avant chaque révélation, les deux appareils estiment le décalage de leurs horloges et l'erreur `e` de cette estimation, par 5 allers-retours ; seuls les échantillons au plus faible aller-retour sont retenus (n° 89). Ils mesurent aussi la cadence de chacun et fixent la cadence commune (5.8). Ils en déduisent la fenêtre effective `W = max(100 ms, 2 × e + i)`, identique sur les deux appareils (n° 66, n° 88, n° 95). Le détail des messages relève de [D4](D4-architecture-technique.md). **À confirmer (P1)**
2. Chaque faute est horodatée localement, en temps de manche (ms depuis t0 sur cet appareil, corrigé du décalage estimé).
3. La première faute d'un appareil, d'horodatage T, est annoncée à l'autre appareil.
4. Chaque appareil déclare ensuite son statut jusqu'à T + W :
   - soit sa propre première faute, avec son horodatage ;
   - soit « aucune faute commencée avant T + W ». Il ne peut le déclarer qu'une fois son horloge au-delà de T + W + 500 ms + un intervalle d'image, car une série commencée avant T + W peut encore être confirmée.
5. Décision, calculée à l'identique sur les deux appareils :
   - une seule faute, ou deux fautes séparées d'au moins `W` : perd le joueur dont la faute est la plus ancienne ;
   - deux fautes séparées de moins de `W` : manche nulle, rejouée (n° 23). Pertes et pics sont remis à zéro. `W` est recalculée avant la nouvelle révélation.
6. La règle vaut pour toute faute : sourire (R2) ou perte (R4).

| Cas | Comportement attendu |
|---|---|
| Parole | Rien de particulier. |
| Bâillement | Rien de particulier. |
| Rire sans sourire | Rien de particulier. |
| Lunettes | Rien de particulier. |
| Barbe | Rien de particulier. |
| Deux visages | Une faute par perte due à deux visages est une faute comme une autre, horodatée selon R4. |
| Caméra coupée | L'appareil du joueur privé de caméra peut encore déclarer son statut : sa perte est une faute horodatée. Si l'appareil lui-même ne répond plus, c'est une déconnexion : lot 4. |

### 4.6 R6 — Départage à 60 s

1. Si aucune faute n'a d'horodatage dans [t0 ; t0 + 60 s[, la manche se joue au départage.
2. La décision attend la fin de R5 : une série commencée avant 60 s peut encore être confirmée jusqu'à 60 s + 500 ms environ.
3. Chaque appareil envoie le pic de jauge de son joueur (R3).
4. Perd le joueur au pic le plus haut (n° 24, n° 49).
5. Si l'écart entre les pics est inférieur à 0,05 : manche nulle, rejouée (n° 68).

| Cas | Comportement attendu |
|---|---|
| Parole | Parler fait monter la jauge : un joueur bavard risque de perdre au départage. Voir 5.5. |
| Bâillement | Un bâillement peut fixer un pic élevé. Aucune correction. |
| Rire sans sourire | Pic bas : avantage. Limite connue de la v1 (n° 34). |
| Lunettes | Rien de particulier. |
| Barbe | Rien de particulier : la jauge est normalisée par le seuil propre au joueur. |
| Deux visages | Les images invalides ne changent pas le pic. |
| Caméra coupée | Pic figé pendant la perte. Au-delà de 5 s, c'est une faute, pas un départage. |

### 4.7 R7 — Arrêt sur image

1. Quand la manche est décidée par un sourire, les deux écrans affichent une image fixe du joueur qui a souri (n° 25).
2. L'image vient de la caméra de son appareil, pas du flux reçu, qui est retardé et compressé. C'est l'image de la série (R2) où `S` est le plus haut.
3. Pour cela, chaque appareil garde en mémoire vive les images de la série en cours, et rien d'autre. Cette mémoire est vidée quand la série s'arrête.
4. L'image est transmise à l'autre appareil par le canal chiffré. Le mode de transmission relève de [D4](D4-architecture-technique.md).
5. **Aucun enregistrement** (n° 26, n° 69) : aucun stockage persistant, nulle part. L'image de preuve reste en mémoire vive sur les deux appareils et disparaît à la fin du match. Elle n'est jamais écrite sur disque, ni dans le stockage du navigateur, ni sur un serveur. À reprendre dans [D7](D7-juridique-confidentialite.md).
6. Manche perdue par visage perdu : aucune image (il n'y a pas de visage). Message « Visage perdu ».
7. Départage à 60 s : aucune image. Affichage des deux pics de jauge.
8. Manche nulle : aucune image. Message « Égalité, manche rejouée ».
9. La durée d'affichage relève du lot 4.

| Cas | Comportement attendu |
|---|---|
| Parole | L'image peut montrer une bouche en pleine syllabe : c'est l'image au score le plus haut, sans retouche. |
| Bâillement | Idem : l'image montre ce que le détecteur a jugé. |
| Rire sans sourire | Pas de faute, donc pas d'image. |
| Lunettes | Rien de particulier. |
| Barbe | Rien de particulier. |
| Deux visages | Les images invalides ne sont jamais choisies : l'image affichée ne contient qu'un visage. |
| Caméra coupée | Pas de sourire possible, donc pas d'image. Voir point 6. |

## 5. Limites de mesure et décisions associées

### 5.1 Seuil propre à chaque joueur — décidé (n° 64)

- Un seuil fixe est injuste : l'amplitude d'un sourire mesuré varie selon le visage (barbe, bouche naturellement relevée).
- Décision : calibrage en deux temps, seuil `d = k × (v − n)`, `k` = 0,4 (n° 83). La jauge devient comparable d'un joueur à l'autre.

### 5.2 Exagérer le sourire volontaire — nouveau risque

- Avec un seuil proportionnel, un joueur qui exagère son sourire volontaire relève son propre seuil. Il pourra ensuite sourire franchement sans faute.
- Parade provisoire : plafond `d_max = 0,35`. Voir Q1.
- Prendre le maximum de `S` pour `v` (n° 91) rend l'exagération plus facile qu'avec une médiane : un pic bref suffit. Le plafond `d_max` devient la seule parade.
- Parades déjà en place contre un neutre truqué : plafond du neutre, écart-type maximal, amplitude minimale.

### 5.3 Perte prolongée — décidé (n° 65)

- Une perte continue de plus de 5 s est une faute. Un joueur ne peut plus échapper au jugement en sortant du champ.
- Limite acceptée : une perte d'origine technique (surchauffe, veille) est punie comme une perte volontaire. À revoir pour le mode inconnus.

### 5.4 Main devant la bouche — limite acceptée en v1 (n° 70)

- Face Landmarker estime une bouche même masquée : un sourire caché peut passer inaperçu.
- Limite acceptée en v1. Entre amis, l'adversaire voit la main.
- Dette technique : Hand Landmarker, à mesurer seulement si les tests P0 montrent que la triche par la main est fréquente.

### 5.5 Parole et départage — variante testée en P0 (n° 72)

- Certaines voyelles étirent les coins de la bouche : parler fait monter la jauge, donc le pic. Le joueur qui provoque le plus risque de perdre au départage.
- En P0, la variante `cheekSquint` est mesurée à côté de la formule de base, sans la remplacer. Le choix de la formule se fera sur les faux positifs en parlant.

### 5.6 Synchronisation des horloges — décidé (n° 66)

- La latence réseau (souvent 50 à 150 ms, asymétrique) est du même ordre que la fenêtre.
- Décision : 5 allers-retours avant chaque révélation, échantillons au plus faible aller-retour, `W = max(100 ms, 2 × e + i)` (n° 66, n° 88, n° 89, n° 95). **À confirmer (P1)**
- Chaque horodatage n'est connu qu'à un intervalle d'image près (67 ms à 15 images/s). L'intervalle `i` est donc ajouté à la fenêtre : on ne désigne pas de perdant sur un écart que la cadence ne permet pas de mesurer (n° 95).

### 5.7 Deux visages dans le champ — décidé (n° 67)

- MediaPipe ne reconnaît pas les personnes. Deux visages = image invalide : c'est plus simple et cela empêche de se faire remplacer.

### 5.8 Cadence d'analyse commune — décidé (n° 86, n° 94)

- Un appareil qui analyse plus d'images par seconde confirme une série plus tôt et la date plus finement : les cadences différentes biaisent « qui a souri en premier ».
- Décision : cadence plafonnée à 15 images/s, identique sur les deux appareils. Les images en surplus ne sont pas analysées.
- Avant chaque révélation, chaque appareil mesure sa cadence. Les deux s'alignent sur la plus basse, avec un plancher de 10 images/s (n° 94). Le cas d'un appareil sous 10 images/s reste ouvert (Q5).

### 5.9 Arbitre sévère — dette produit (n° 84)

- Passer le maintien de 400 à 500 ms supprime presque les faux positifs dus à la parole. Coût : la moitié des sourires réprimés de 250 ms ne sont plus détectés.
- Dette produit : option « arbitre sévère » à 400 ms. Non prévue en v1.

## 6. Déroulé du match

*Lot 4 — à rédiger.*

## 7. Questions ouvertes

Q1 à Q8 du premier brouillon ont été tranchées par Valentin le 2026-09-25 (n° 64 à 71). Q2 à Q4 des valeurs simulées l'ont été le même jour (n° 94 à 96).

| N° | Question | Proposition |
|---|---|---|
| Q1 | Le seuil proportionnel crée un nouveau risque : exagérer son sourire volontaire pour relever son seuil (5.2). Plafonner le seuil à `d_max` ? | Oui, `d_max = 0,35` **À confirmer (P0)** ; en P0, relever la fréquence des seuils plafonnés |
| Q5 | Que se passe-t-il si un appareil tombe sous 10 images/s : avant la révélation, puis pendant la manche ? | Avant : la manche ne démarre pas, message « Appareil trop lent ». Pendant : la manche continue ; la cadence est réévaluée à la révélation suivante **À confirmer (P0)** |
| Q6 | La simulation justifie 100 ms par « erreur de synchro + une image » (24 + 67 = 91 ms). La formule retenue double `e` : `W` vaut environ 115 ms à 15 images/s et 148 ms à 10 images/s, donc le plancher de 100 ms ne sert presque jamais. Garder le multiplicateur 2, ou passer à `W = max(100 ms, e + i)` ? | Passer le multiplicateur à 1, conforme à la simulation **À confirmer (P1)** |
