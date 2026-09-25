# D2 — Règles du jeu et d'arbitrage

| Champ | Valeur |
|---|---|
| Objet | Fixer les règles d'arbitrage et leurs réglages, assez précisément pour les coder sans interprétation |
| Statut | Brouillon — partie arbitrage seulement (Priorité 1) ; le déroulé du match viendra au lot 4 (Priorité 2) |
| Date | 2026-09-25 |
| Dépend de | [D1](D1-note-de-cadrage.md) ; [source de cadrage](../sources/cadrage-lots-1-2-3.md) §3.4 ; [D8](D8-journal-decisions.md) n° 18 à 25, 49, 55 à 63 |
| Utilisé par | [D3](D3-plan-de-tests.md) (réglage des valeurs en P0) ; [D4](D4-architecture-technique.md) (messages, horloges) ; [D5](D5-parcours-maquettes.md) (écrans) |

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
| Score brut `s` | Moyenne de `mouthSmileLeft` et `mouthSmileRight` (de 0 à 1). **À confirmer (P0)** |
| Score lissé `S` | Moyenne des scores bruts des images valides des 200 dernières ms |
| Neutre `n` | Médiane de `S` pendant le calibrage réussi (R1) |
| Seuil `d` | Écart au-dessus du neutre à partir duquel une image est « souriante » |
| Marge `m` | Écart au-dessus du neutre en dessous duquel le joueur est « neutre » |
| Image valide | Exactement un visage détecté, dont la largeur et les angles respectent les réglages (section 3) |
| Image souriante | Image valide avec `S ≥ n + d` |
| Image de doute | Image valide avec `n + m < S < n + d` |
| Jauge `J` | `J = min(1, max(0, (S − n − m) / (d − m)))`, affichée en pourcentage |
| t0 | Signal de révélation de la manche. Tous les temps de manche sont comptés depuis t0 |
| Faute | Sourire confirmé (R2) ou deuxième perte de visage (R4). La première faute fait perdre la manche |

Angles : lacet (tête tournée) et tangage (tête penchée), calculés depuis la matrice de transformation du visage.
Largeur du visage : écart horizontal entre les repères extrêmes, rapporté à la largeur de l'image.

## 3. Tableau des réglages

Toutes les valeurs sont modifiables après les tests. Les valeurs sans origine dans la source sont des hypothèses de départ, choisies pour être testées, pas des mesures.

| Nom | Valeur de départ | Unité | Rôle | Origine | Validé par |
|---|---|---|---|---|---|
| Durée du calibrage | 3 | s | Fenêtre de mesure du neutre | Source | **À confirmer (P0)** |
| Présence minimale au calibrage | 90 | % des images | Rejette un calibrage où le visage sort du champ | Hypothèse | **À confirmer (P0)** |
| Largeur minimale du visage | 20 | % de la largeur de l'image | Rejette un visage trop loin ; image invalide en manche | Hypothèse | **À confirmer (P0)** |
| Lacet maximal | 25 | degrés | Au-delà, image invalide (tête tournée) | Hypothèse | **À confirmer (P0)** |
| Tangage maximal | 20 | degrés | Au-delà, image invalide (tête penchée) | Hypothèse | **À confirmer (P0)** |
| Luminance minimale du visage | 60 | niveau sur 255 | Rejette un calibrage trop sombre | Hypothèse | **À confirmer (P0)** |
| Écart-type maximal au calibrage | 0,05 | score | Rejette un calibrage où le visage bouge ou sourit | Hypothèse | **À confirmer (P0)** |
| Plafond du neutre | 0,35 | score | Rejette un neutre trop haut (sourire pendant le calibrage) | Hypothèse | **À confirmer (P0)** |
| Fenêtre de lissage | 200 | ms | Calcul de `S` ; évite qu'une image bruitée compte | Hypothèse | **À confirmer (P0)** |
| Seuil `d` | 0,30 | score | Sourire au-dessus de `n + d` | Source (valeur à fixer par P0) | **À confirmer (P0)** |
| Marge `m` | 0,05 | score | Frontière neutre / zone de doute | Hypothèse | **À confirmer (P0)** |
| Durée de maintien | 400 | ms | Durée minimale d'un sourire confirmé | Source | **À confirmer (P0)** |
| Images minimales par sourire | 3 | images | Évite de confirmer sur deux images espacées | Hypothèse | **À confirmer (P0)** |
| Images tolérées dans une série | 1 | image | Une image non souriante isolée n'interrompt pas la série | Hypothèse | **À confirmer (P0)** |
| Délai de visage perdu | 1,5 | s | Au-delà, perte comptée | Source | **À confirmer (P0)** |
| Pertes avant manche perdue | 2 | pertes par manche | La deuxième perte est une faute | Source | **À confirmer (P0)** |
| Fenêtre de simultanéité | 200 | ms | Fautes plus proches : manche nulle | Source | **À confirmer (P2)** |
| Erreur d'horloge acceptée | 50 | ms | Précision attendue de la synchronisation | Hypothèse | **À confirmer (P1)** |
| Durée de la manche | 60 | s | Départage au-delà | Source | **À confirmer (P2)** |
| Écart de pics pour égalité | 0,05 | jauge (0 à 1) | Départage : pics plus proches = égalité | Hypothèse, voir Q5 | **À confirmer (P2)** |

## 4. Règles d'arbitrage

Colonnes des tableaux de cas limites : le cas, puis le comportement attendu de l'application. « Rien de particulier » signifie que la règle s'applique telle quelle.

### 4.1 R1 — Calibrage

1. Le calibrage a lieu une fois par match, avant la première manche (n° 18). Voir Q8.
2. Le joueur regarde la caméra, visage neutre, pendant 3 s. Toutes les images sont analysées.
3. Le calibrage est rejeté si une seule de ces conditions est vraie :
   - moins de 90 % d'images valides ;
   - largeur médiane du visage sous 20 % ;
   - lacet ou tangage médian au-delà des limites ;
   - luminance moyenne de la zone du visage sous 60/255 (calculée sur les pixels de l'image, pas par MediaPipe) ;
   - écart-type du score brut au-dessus de 0,05 ;
   - neutre `n` au-dessus de 0,35.
4. En cas de rejet, l'application affiche la **première** cause rencontrée, dans l'ordre ci-dessus, et propose de recommencer. Le nombre d'essais n'est pas limité.
5. En cas de succès, l'appareil garde `n`. La manche ne peut pas démarrer tant que les deux joueurs n'ont pas réussi leur calibrage.

| Cas | Comportement attendu |
|---|---|
| Parole | Le score varie, l'écart-type dépasse 0,05 : calibrage rejeté, message « Restez silencieux et immobile ». |
| Bâillement | Même effet que la parole : rejet, nouvel essai. |
| Rire sans sourire | Sans effet sur le score : rien de particulier. |
| Lunettes | Calibrer avec les lunettes portées pendant le jeu. Un reflet qui empêche la détection fait baisser la présence : rejet pour cause de présence. |
| Barbe | Le neutre est mesuré tel quel : rien de particulier. Risque d'injustice : voir 5.1. |
| Deux visages | Images invalides. Si elles dépassent 10 % : rejet, message « Un seul visage dans le champ ». |
| Caméra coupée | Aucune image : rejet pour cause de présence. |

### 4.2 R2 — Détection du sourire

1. Une série commence à la première image souriante dont l'horodatage est ≥ t0.
2. La série continue tant que les images sont souriantes. Une seule image non souriante (doute, neutre ou invalide) est tolérée par série, à condition que l'image suivante soit souriante. Sinon, la série s'arrête et rien n'est compté.
3. Le sourire est **confirmé** dès que la série couvre au moins 400 ms (entre sa première et sa dernière image souriante) et contient au moins 3 images souriantes.
4. L'horodatage du sourire est celui de la **première image** de la série, pas celui de la confirmation.
5. Un sourire confirmé est une faute. Il ne compte que si son horodatage est dans [t0 ; t0 + 60 s[ (voir R6).
6. L'analyse continue pendant l'écran noir et le compte à rebours, pour que `S` soit déjà calculé à t0. Les images antérieures à t0 ne comptent pas pour les fautes.

| Cas | Comportement attendu |
|---|---|
| Parole | Autorisée (n° 8). Les syllabes brèves ne tiennent pas 400 ms : pas de faute. Une voyelle tenue qui étire la bouche (« iii ») peut produire une faute : risque à mesurer en P0, voir 5.6. |
| Bâillement | Aucune exception. Si `S` dépasse le seuil 400 ms, c'est une faute. À mesurer en P0. |
| Rire sans sourire | Un rire sonore sans sourire visible n'est pas une faute (la détection sonore est reportée en v2, n° 34). Un rire bouche ouverte fait monter `mouthSmile` : faute normale. |
| Lunettes | Rien de particulier : le score ne dépend que de la bouche. |
| Barbe | Rien de particulier dans la règle. Risque de sous-détection : voir 5.1. |
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
| Parole | La jauge bouge pendant la parole. C'est voulu : l'adversaire voit l'effort. Le pic peut monter, ce qui pèse au départage (voir 5.6). |
| Bâillement | La jauge peut monter. Aucune pénalité. |
| Rire sans sourire | La jauge reste basse. |
| Lunettes | Rien de particulier. |
| Barbe | Amplitude plus faible, donc jauge plus basse : voir 5.1. |
| Deux visages | Images invalides : jauge figée. |
| Caméra coupée | Jauge figée à sa dernière valeur. |

### 4.4 R4 — Visage perdu

1. Une **perte** commence à la première image invalide ou, si aucune image n'arrive, à la dernière image reçue. Une image est invalide si aucun visage n'est détecté, si deux visages sont détectés, si le visage est trop petit ou si ses angles dépassent les limites.
2. La perte se termine à la première image valide.
3. Une perte est **comptée** quand elle dure plus de 1,5 s. À ce moment :
   - première perte comptée de la manche : avertissement affiché aux deux joueurs ;
   - deuxième perte comptée de la manche : faute. Son horodatage est le début de cette perte + 1,5 s, soit l'instant où la faute est constituée.
4. Une perte n'est comptée qu'une fois, même si elle dure longtemps. Voir 5.3.
5. Le compteur de pertes est remis à zéro à chaque manche.
6. Les pertes ne comptent qu'après t0. Une perte en cours à t0 commence à t0.

| Cas | Comportement attendu |
|---|---|
| Parole | Rien de particulier. |
| Bâillement | Une main devant la bouche ne fait souvent pas perdre le visage : MediaPipe continue d'estimer la bouche. Voir 5.4. Un bâillement tête en arrière dépasse le tangage : perte si plus de 1,5 s. |
| Rire sans sourire | Se cacher le visage pour rire : perte si plus de 1,5 s. Se plier de rire hors du champ : idem. |
| Lunettes | Un reflet fort peut faire perdre le visage : la règle s'applique sans exception. |
| Barbe | Rien de particulier. |
| Deux visages | Images invalides : une personne qui passe derrière le joueur plus de 1,5 s déclenche une perte. Voir 5.7 et Q4. |
| Caméra coupée | Coupure, permission retirée, appareil en veille ou analyse bloquée : plus aucune image, donc perte. Pas d'exception pour une cause technique. Voir 5.3. |

### 4.5 R5 — Horodatage et simultanéité

1. Chaque faute est horodatée localement, en temps de manche (ms depuis t0 sur cet appareil). La mise en correspondance des deux t0 relève de [D4](D4-architecture-technique.md) ; la précision visée est de 50 ms (**À confirmer (P1)**).
2. La première faute d'un appareil, d'horodatage T, est annoncée à l'autre appareil.
3. Chaque appareil déclare ensuite son statut jusqu'à T + 200 ms :
   - soit sa propre première faute, avec son horodatage ;
   - soit « aucune faute commencée avant T + 200 ms ». Il ne peut le déclarer qu'une fois son horloge au-delà de T + 200 ms + 400 ms + un intervalle d'image, car une série commencée avant T + 200 ms peut encore être confirmée.
4. Décision, calculée à l'identique sur les deux appareils :
   - une seule faute, ou deux fautes séparées de 200 ms ou plus : perd le joueur dont la faute est la plus ancienne ;
   - deux fautes séparées de moins de 200 ms : manche nulle, rejouée (n° 23). Pertes et pics sont remis à zéro.
5. La règle vaut pour toute faute : sourire (R2) ou deuxième perte (R4).

| Cas | Comportement attendu |
|---|---|
| Parole | Rien de particulier. |
| Bâillement | Rien de particulier. |
| Rire sans sourire | Rien de particulier. |
| Lunettes | Rien de particulier. |
| Barbe | Rien de particulier. |
| Deux visages | Une deuxième perte due à deux visages est une faute comme une autre, horodatée selon R4. |
| Caméra coupée | L'appareil du joueur privé de caméra peut encore déclarer son statut : sa perte est une faute horodatée. Si l'appareil lui-même ne répond plus, c'est une déconnexion : lot 4. |

### 4.6 R6 — Départage à 60 s

1. Si aucune faute n'a d'horodatage dans [t0 ; t0 + 60 s[, la manche se joue au départage.
2. La décision attend la fin de R5 : une série commencée avant 60 s peut encore être confirmée jusqu'à 60 s + 400 ms environ.
3. Chaque appareil envoie le pic de jauge de son joueur (R3).
4. Perd le joueur au pic le plus haut (n° 24, n° 49).
5. Si l'écart entre les pics est inférieur à 0,05 : égalité. Règle non décidée ; proposition : manche nulle, rejouée. Voir Q5.

| Cas | Comportement attendu |
|---|---|
| Parole | Parler fait monter la jauge : un joueur bavard risque de perdre au départage. Voir 5.6. |
| Bâillement | Un bâillement peut fixer un pic élevé. Aucune correction. |
| Rire sans sourire | Pic bas : avantage. Limite connue de la v1 (n° 34). |
| Lunettes | Rien de particulier. |
| Barbe | Pic plus bas à émotion égale : avantage. Voir 5.1. |
| Deux visages | Les images invalides ne changent pas le pic. |
| Caméra coupée | Pic figé pendant la perte. Si une deuxième perte a eu lieu, c'est une faute, pas un départage. |

### 4.7 R7 — Arrêt sur image

1. Quand la manche est décidée par un sourire, les deux écrans affichent une image fixe du joueur qui a souri (n° 25).
2. L'image vient de la caméra de son appareil, pas du flux reçu, qui est retardé et compressé. C'est l'image de la série (R2) où `S` est le plus haut.
3. Pour cela, chaque appareil garde en mémoire les images de la série en cours, et rien d'autre. Cette mémoire est vidée quand la série s'arrête.
4. L'image n'est jamais écrite sur disque. Elle est effacée de la mémoire des deux appareils à la révélation suivante ou à la fin du match. Son mode de transmission relève de [D4](D4-architecture-technique.md) ; voir Q6.
5. Manche perdue par visage perdu : aucune image (il n'y a pas de visage). Message « Visage perdu deux fois ».
6. Départage à 60 s : aucune image. Affichage des deux pics de jauge.
7. Manche nulle : aucune image. Message « Égalité, manche rejouée ».
8. La durée d'affichage relève du lot 4.

| Cas | Comportement attendu |
|---|---|
| Parole | L'image peut montrer une bouche en pleine syllabe : c'est l'image au score le plus haut, sans retouche. |
| Bâillement | Idem : l'image montre ce que le détecteur a jugé. |
| Rire sans sourire | Pas de faute, donc pas d'image. |
| Lunettes | Rien de particulier. |
| Barbe | Rien de particulier. |
| Deux visages | Les images invalides ne sont jamais choisies : l'image affichée ne contient qu'un visage. |
| Caméra coupée | Pas de sourire possible, donc pas d'image. Voir point 5. |

## 5. Limites de mesure et règles jugées injustes

Ces points ne modifient aucune décision. Ils demandent un arbitrage de Valentin (section 7) ou une mesure en P0.

### 5.1 Un seuil identique pour tous les visages est injuste

- Le seuil `d` est un écart fixe au-dessus du neutre. Or l'amplitude d'un sourire mesuré varie beaucoup d'un visage à l'autre.
- Une barbe cache les coins de la bouche : sourire sous-estimé, donc joueur avantagé. Une bouche expressive est pénalisée.
- **Proposition** : calibrage en deux temps. D'abord 3 s de neutre, puis 2 s de sourire volontaire. Seuil individuel = `n + k × (sourire − n)`, avec `k` de départ à 0,5 **À confirmer (P0)**. La jauge devient comparable d'un joueur à l'autre. Voir Q1.

### 5.2 Tricher au calibrage

- Sourire légèrement pendant le calibrage relève le neutre et rend le seuil plus difficile à atteindre.
- Parades déjà intégrées à R1 : plafond du neutre, écart-type maximal. Elles ne bloquent pas un sourire léger et stable sous 0,35. La proposition 5.1 les renforce : un « neutre » trop proche du sourire volontaire serait rejeté.

### 5.3 Une perte prolongée permet d'échapper au jugement

- La source compte les pertes, pas leur durée. Un joueur qui sort du champ après son avertissement n'est plus jugé jusqu'à 60 s. Il perd au départage seulement si son pic était le plus haut.
- **Proposition** : une perte continue de plus de 5 s compte comme deuxième perte, donc comme faute. **À confirmer (P0)**. Voir Q2.
- Autre injustice : une perte d'origine technique (surchauffe, veille) est punie comme une perte volontaire. C'est acceptable entre amis ; à revoir pour le mode inconnus.

### 5.4 Main devant la bouche : non mesurable

- Face Landmarker estime une bouche même masquée. Il ne signale pas l'occlusion de façon fiable : un sourire caché peut passer inaperçu.
- **Proposition A** : accepter la limite en v1. L'adversaire voit la main et peut réclamer la revanche.
- **Proposition B** : ajouter Hand Landmarker et invalider l'image si une main couvre la bouche. Coût : une deuxième analyse par image, à mesurer en P0 face au plancher de 10 images par seconde. Voir Q7.

### 5.5 Synchronisation : 200 ms, c'est serré

- Si t0 est un message réseau, l'appareil qui le reçoit démarre en retard du temps de trajet aller. Ce retard est souvent de 50 à 150 ms et n'est pas symétrique.
- L'erreur est donc du même ordre que la fenêtre de 200 ms : le « premier » désigné peut être faux.
- **Proposition** : estimer le décalage des horloges par plusieurs allers-retours avant chaque révélation (principe de NTP). Fenêtre effective = max(200 ms, 2 × erreur estimée). **À confirmer (P1)**. Voir Q3.

### 5.6 Parole et départage

- La parole est autorisée, mais certaines voyelles étirent les coins de la bouche. Parler fait monter la jauge, donc le pic.
- Au départage, le joueur qui a le plus provoqué risque de perdre. Cela contredit le duel symétrique (n° 16).
- **Proposition de mesure en P0** : comparer le score actuel avec une variante qui exige aussi `cheekSquintLeft/Right` (joues relevées, typique d'un vrai sourire et rare en parlant). Choisir la formule qui donne le moins de faux positifs en parlant. Aucune décision avant la mesure.

### 5.7 Deux visages dans le champ

- MediaPipe ne reconnaît pas les personnes. Avec un seul visage cherché, il peut suivre la mauvaise personne sans le signaler.
- Choix retenu dans ce brouillon : chercher deux visages et invalider l'image s'il y en a deux. C'est simple et sûr, mais une personne qui passe derrière le joueur peut lui coûter un avertissement.
- **Alternative** : suivre le visage le plus proche de la position calibrée et n'invalider qu'en cas d'ambiguïté. Plus tolérant, plus complexe à coder. Voir Q4.

## 6. Déroulé du match

*Lot 4 — à rédiger.*

## 7. Questions ouvertes

| N° | Question | Proposition |
|---|---|---|
| Q1 | Adopter un calibrage en deux temps (neutre puis sourire volontaire) et un seuil individuel ? Cela modifie n° 18 et n° 19. | Oui, à tester en P0 contre le seuil fixe (5.1) |
| Q2 | Une perte continue de plus de 5 s compte-t-elle comme deuxième perte ? Cela complète n° 21. | Oui (5.3) |
| Q3 | Estimer le décalage des horloges avant chaque manche et élargir la fenêtre de simultanéité si l'erreur est grande ? Cela touche n° 22 et n° 23. | Oui (5.5) |
| Q4 | Deux visages dans le champ : image invalide (choix du brouillon) ou suivi du visage calibré ? | Image invalide pour la v1 (5.7) |
| Q5 | Égalité des pics au départage (écart < 0,05) : manche nulle et rejouée, ou autre règle ? | Manche nulle, rejouée |
| Q6 | L'image de preuve est prise par l'appareil du joueur qui sourit, puis transmise à l'autre joueur (chiffrée, gardée en mémoire seulement). Est-ce acceptable au regard de « aucun enregistrement » (n° 26) ? Sinon, chaque écran fige le flux vidéo reçu, moins net et en retard. | Transmission acceptée, jamais écrite sur disque |
| Q7 | Main devant la bouche : accepter la limite en v1 ou ajouter Hand Landmarker ? | Accepter en v1, mesurer le coût en P0 |
| Q8 | Calibrage une fois par match (source) ou avant chaque manche (la lumière et la posture changent) ? | Une fois par match, recalibrage proposé après une manche perdue par visage perdu |
