# D3 — Plan de tests et critères de décision

| Champ | Valeur |
|---|---|
| Objet | Dire, pour chaque prototype, quel résultat valide ou invalide chaque risque, et quelle décision en découle |
| Statut | Brouillon — complet : prototype 0 (lot 3), prototypes 1 et 2 (lot 7) |
| Date | 2026-09-26 |
| Dépend de | [D1](D1-note-de-cadrage.md) §5 et §6 ; [D2](D2-regles-jeu-arbitrage.md) ; [D4](D4-architecture-technique.md) ; [D6](D6-lots-developpement.md) ; [source de cadrage](../sources/cadrage-lots-1-2-3.md) §3.7 ; [D8](D8-journal-decisions.md) n° 35 à 42, 50 à 54, 64 à 96, 97 à 125, 134 à 147, 160, 161, 163, 165 à 168, 192 à 197, 216 |
| Utilisé par | [D2](D2-regles-jeu-arbitrage.md) et [D4](D4-architecture-technique.md) (valeurs validées) ; [D6](D6-lots-developpement.md) (test associé à chaque lot) |

## 1. Prototype 0 — détection seule, sans réseau

### 1.1 Objectif et risques testés

Objectif : prouver que l'arbitrage de [D2](D2-regles-jeu-arbitrage.md) est juste et assez rapide, **avant** d'écrire la moindre ligne de réseau (n° 35). Puis remplacer chaque valeur **À confirmer (P0)** de [D2](D2-regles-jeu-arbitrage.md) §3 par une valeur mesurée.

| Risque | Hypothèse | Critère de la source | Référence |
|---|---|---|---|
| Arbitrage injuste : faute sans sourire (faux positif) | H1 | Aucun faux positif en conditions normales | [D1](D1-note-de-cadrage.md) §6.2 ; n° 36 |
| Sourire franc non détecté (faux négatif) | H1 | Tous les sourires francs détectés en conditions normales (G5) | n° 79 |
| Performance insuffisante sur un appareil ancien | H6 | Au moins 10 images/s, sans chauffe excessive en 5 min | [D1](D1-note-de-cadrage.md) §6.2 ; n° 37 |
| Parole et voyelles tenues qui étirent la bouche | H1 | Comparer formule de base et variante `cheekSquint` | [D2](D2-regles-jeu-arbitrage.md) §5.5 ; n° 72 |
| Seuil gonflé en exagérant le sourire volontaire | H1 | Tester le plafond `d_max` | [D2](D2-regles-jeu-arbitrage.md) §5.2 ; n° 183 |
| Calibrage trop strict ou trop laxiste | H1 | Fixer les critères de rejet de R1 | [D2](D2-regles-jeu-arbitrage.md) R1 |
| Pertes de visage injustifiées | H1 | Aucune perte comptée en jeu normal | [D2](D2-regles-jeu-arbitrage.md) R4 |
| Sourire caché derrière la main | H1 | Constater s'il est détecté (pas sa fréquence : voir 3) | [D2](D2-regles-jeu-arbitrage.md) §5.4 ; n° 70 |

Hors du prototype 0 : réseau, horloges, simultanéité (P1) ; départage à 60 s, écart de pics, ennui, revanche (P2).

### 1.2 Panel

#### 1.2.1 Testeurs

- Visé : **8 testeurs**. Minimum : 5 (source : 5 à 10). Codés T01, T02… ; aucun nom dans les grilles.
- Profils à couvrir : au moins un testeur par ligne. Un testeur peut couvrir plusieurs lignes.

| Profil | Pourquoi |
|---|---|
| Barbe ou moustache fournie | Masque les coins de la bouche ; amplitude réduite |
| Lunettes portées pendant le jeu | Reflets ; perte du visage |
| Bouche naturellement relevée | Neutre haut ; risque de faux positif |
| Carnations variées (claire, mate, foncée) | Biais connus des détecteurs de visage, surtout en pénombre. Notée en catégorie grossière, sans nom associé (n° 78) |
| Tranches d'âge variées (18–30, 30–50, plus de 50) | Rides d'expression |
| Parleur très expressif | Pire cas pour la parole |
| Sourire discret, peu démonstratif | Pire cas pour les faux négatifs |

#### 1.2.2 Conditions

| Code | Condition | Définition |
|---|---|---|
| N | Conditions normales | Intérieur éclairé, visage de face, à moins d'un mètre (n° 51). Mesurable : calibrage réussi, luminance du visage ≥ 60/255, largeur du visage ≥ 20 %, angles dans les limites de [D2](D2-regles-jeu-arbitrage.md) §3. **À confirmer (P0)** |
| B1 | Pénombre | Seule la lumière de l'écran, ou une lampe éloignée |
| B2 | Contre-jour | Fenêtre ou lampe derrière le testeur |
| B3 | Éclairage latéral | Une seule source sur le côté ; une moitié du visage dans l'ombre |

Règle : **toute condition acceptée par le calibrage compte comme jouable**. Si le calibrage accepte B1 et qu'une faute sans sourire y survient, c'est un échec au même titre qu'en N : le calibrage doit alors rejeter B1.

#### 1.2.3 Appareils

Appareils disponibles (n° 192) :

| Rôle | Appareil | Navigateur | Utilisé pour |
|---|---|---|---|
| Le plus ancien, référence basse | iPhone XR (2018), iOS 18.7.9 | Safari | Performance (critère G3) ; une partie des sessions |
| iPhone récent | iPhone 15 Pro (2023), iOS 26.6.2 | Safari | Sessions ; performance sur Safari iOS |
| Ordinateur, référence haute | PC portable Windows 11, webcam intégrée ; Intel Core i7-13650HX, 32 Go de mémoire, carte graphique dédiée 8 Go | Chrome ou Edge ([D4](D4-architecture-technique.md) §7.2) | Sessions ; performance haute |

- L'appareil le plus ancien est un iPhone : G3 est donc jugé sur Safari iOS.
- Aucun appareil Android n'est disponible pour l'instant ; Valentin en cherche un à emprunter. Android reste une cible de [D4](D4-architecture-technique.md) §7.2, non mesurée en P0 si aucun Android n'est emprunté (n° 218).
- L'iPhone XR est bloqué à iOS 18 : iOS 18.7.9 est la dernière version disponible pour cet appareil (vérifié le 2026-09-25). Or des défauts du calcul graphique de MediaPipe sont signalés sur iOS 18 ([D4](D4-architecture-technique.md) §7.1). Noter la version d'iOS et le mode de calcul dans le journal.
- Les iPhone fournissent une image en portrait (480 × 640), le PC en paysage (640 × 480).

#### 1.2.4 Volume et durée

| Élément | Valeur |
|---|---|
| Sessions testeurs | 1 par testeur, environ 30 min |
| Session performance | 1 par appareil, Valentin seul, 25 min |
| Exposition cible | Au moins **60 min cumulées** de non-sourire en conditions N (séquences A1 à A4) |
| Groupe de réglage | Les 2/3 premiers testeurs (5 sur 8 ; 3 sur 5) |
| Groupe de validation | Le tiers restant, jamais utilisé pendant le réglage |

Pourquoi 60 min : avec zéro faute sur 60 min, on peut seulement dire, à 95 %, que le taux est inférieur à 3 pour 60 min, soit une faute pour 20 min (règle de trois). Un match dure environ 6 min de jeu par joueur. Moins d'exposition ne prouve presque rien. A1 à A4 durent 7 min 30 par testeur : 8 testeurs donnent 60 min. Avec moins de testeurs, allonger A2 d'autant.

### 1.3 Protocole pas à pas

Réalisable par Valentin seul, avec un testeur à la fois. Le prototype affiche la consigne de chaque séquence et son chronomètre.

#### 1.3.1 Ce que le prototype 0 doit offrir pour ce protocole

- Les règles R1 à R4 et R7 de [D2](D2-regles-jeu-arbitrage.md), avec les valeurs de départ de §3.
- Les deux jauges, dont celle du testeur, comme en jeu.
- Des séquences minutées, avec leur code (A1, A2…) inscrit dans le journal.
- Une touche « sourire vu » pour l'opérateur.
- Un journal numérique exportable en CSV (1.4.1). Aucune image, aucun son.
- En fin de séquence : le pic soutenu `P` (1.5.1), avec la formule de base et la variante.

#### 1.3.2 Préparation (5 min, avant l'arrivée du testeur)

1. Charger l'appareil à plus de 80 %. Fermer les autres applications.
2. Installer l'appareil sur un support, à hauteur du visage, à 50–80 cm.
3. Vérifier l'éclairage N : lumière allumée, pas de fenêtre derrière le testeur.
4. Préparer la fiche testeur (1.4.2).
5. **Aucune capture d'écran pendant une séquence** : une capture peut suspendre l'analyse et fausser la séquence. Attendre la fin, ou « Interrompre » (n° 275).

#### 1.3.3 Accueil (3 min)

1. Expliquer : on teste un détecteur de sourire ; aucune image ni aucun son n'est enregistré ; seuls des nombres sont gardés, puis supprimés à la fin du prototype 0.
2. Recueillir l'accord oral du testeur et le noter dans la fiche (n° 78). Sans accord, pas de session.
3. Consigne : se comporter naturellement, ne pas chercher à piéger le détecteur, sauf en séquence C.
4. Remplir la fiche testeur.

#### 1.3.4 Séquences en conditions normales (environ 15 min)

| Code | Séquence | Durée | Consigne au testeur | Ce qu'on cherche |
|---|---|---|---|---|
| A0 | Calibrage | 5 s par essai | Selon [D2](D2-regles-jeu-arbitrage.md) R1 : 3 s neutre, puis 2 s de sourire franc. **Trois calibrages réussis consécutifs**, dont un volontairement timide ; après le timide, refaire A2 abrégée (60 s) et A3, et noter fautes, P et r (n° 258) | Essais, causes de rejet, `n`, `v`, `d` ; dispersion de `v` par testeur ; effet d'un `v` bas sur les faux positifs |
| A1 | Neutre silencieux | 60 s | Regarder l'écran, visage détendu, sans parler | Bruit de fond ; réglage de `m` |
| A2 | Parole libre | 4 min 30 | Raconter sa journée, sans chercher à rire | Faux positifs dus à la parole |
| A3 | Voyelles tenues | 60 s | Lire une liste : « iii », « ouistiti », « cheese », « pipi », « merci », chacun tenu 1 s ; puis répéter « pi-pi-pi-pi » sans pause pendant 5 s (syllabes enchaînées, pauses d'une image : n° 256) | Pire cas de la parole : fautes, P, r |
| A4 | Gestes parasites | 60 s | Bâiller deux fois, tousser, pincer les lèvres, mordre sa lèvre, déglutir, humecter ses lèvres | Faux positifs hors parole |
| A5 | Provocation | 2 × 60 s | Tenir sans sourire pendant que Valentin fait des grimaces et des blagues | Situation réelle : faux positifs et faux négatifs |
| A6 | Sourires commandés | 90 s | Sur signal, 5 s chacun, 5 s de neutre entre : 3 sourires légers, 3 sourires francs, 2 rires | Faux négatifs |
| A7 | Mouvements | 2 min | Tourner lentement la tête à gauche puis à droite ; la pencher en avant puis en arrière ; reculer jusqu'à 1,5 m ; sortir du champ 2 s, puis 6 s ; sourire derrière sa main ; laisser passer une deuxième personne derrière soi | Limites d'angle et de largeur ; R4 ; main devant la bouche |

À la **fin** de chaque séquence A1 à A5 et B1 à B3, l'outil présente une **revue** de chaque sourire confirmé. Elle se fait en fin de séquence, et non après chaque sourire, pour ne pas interrompre des séquences minutées (n° 272) :

1. Le prototype affiche l'image de preuve ([D2](D2-regles-jeu-arbitrage.md) R7, en mémoire vive seulement).
2. Demander au testeur : « Est-ce un sourire ? »
3. Classer la détection :

| Classement | Testeur | Opérateur (touche « sourire vu ») |
|---|---|---|
| Confirmée | Oui | Peu importe |
| Faux positif | Non | Non |
| Litigieuse | Non | Oui |

Une détection litigieuse compte comme faux positif (n° 80). En jeu, ce serait une contestation.

#### 1.3.5 Conditions dégradées (environ 8 min)

Pour B1, B2 et B3, dans cet ordre :

1. Changer l'éclairage.
2. Calibrer (A0). Noter l'acceptation ou le rejet, et la cause.
3. Si le calibrage est **accepté** : neutre 30 s, parole 30 s, 2 sourires francs. Revue comme en 1.3.4.
4. Si le calibrage est **rejeté** : noter la cause et passer à la condition suivante.

Revenir en N à la fin.

#### 1.3.6 Exagération (environ 3 min)

1. Recalibrer en forçant le sourire volontaire au maximum.
2. Noter `d` et si le plafond `d_max` s'applique.
3. Rejouer A5 pendant 60 s : le testeur est autorisé à sourire franchement.
4. Noter si ses sourires sont détectés. S'ils ne le sont pas, le plafond ne protège pas assez ([D2](D2-regles-jeu-arbitrage.md) §5.2).

#### 1.3.7 Fin de session (3 min)

1. Demander : « Une détection vous a-t-elle paru injuste ? Un sourire vous a-t-il échappé sans être vu ? »
2. Exporter le journal. Le nommer par le code du testeur et la date.
3. Reporter les résultats dans la grille (1.4).

#### 1.3.8 Session performance (Valentin seul, par appareil)

1. Appareil chargé à 100 %, luminosité fixe, hors charge secteur.
2. Lancer l'analyse continue, visage dans le champ, 10 min. Noter la batterie au début et à la fin.
3. Recommencer 10 min avec une **charge vidéo simulée** : un appel WebRTC en boucle sur le même appareil, sans réseau, pour reproduire le coût de l'encodage vidéo du vrai jeu.
4. Toucher le dos de l'appareil à 5 min et à 10 min : tiède, chaud ou brûlant.
5. Relever les images/s par fenêtre de 10 s (journal).

Chauffe excessive (précise n° 51) : une fenêtre de 10 s sous 10 images/s pendant les 5 premières minutes, ou un ralentissement visible de l'affichage, ou un appareil brûlant au toucher. **À confirmer (P0)**

La mesure sans charge est optimiste : elle ignore l'appel vidéo. Le critère s'applique aux deux mesures, sans charge et avec charge (n° 81).

### 1.4 Mesures et grille de résultats

#### 1.4.1 Journal numérique

Une ligne par image analysée. Uniquement des nombres et des codes : ni image, ni son, ni nom.

| Colonne | Contenu |
|---|---|
| `t` | Horodatage local, ms |
| `seq` | Code de séquence (A0 à A7, B1 à B3, C, PERF) |
| `faces` | Nombre de visages détectés |
| `largeur` | Largeur du visage, % de l'image |
| `lacet`, `tangage` | Degrés |
| `smileG`, `smileD` | `mouthSmileLeft`, `mouthSmileRight` |
| `cheekG`, `cheekD` | `cheekSquintLeft`, `cheekSquintRight` |
| `bs_<nom>` | Les 52 blendshapes de MediaPipe, une colonne par nom (`bs_jawOpen`, `bs_mouthStretchLeft`…). Permettent de tester au rejeu (L0.7) une parade à la parole fondée sur d'autres blendshapes ([D2](D2-regles-jeu-arbitrage.md) Q17, n° 263) |
| `lum` | Luminance moyenne du visage, sur 255 |
| `S`, `J` | Score lissé, jauge |
| `etat` | neutre, doute, souriant, invalide |
| `faute` | Vide, sourire ou perte |
| `op` | 1 si la touche « sourire vu » est pressée (barre d'espace ou bouton). « L'opérateur a vu » un sourire si la touche est pressée entre 0,5 s avant le début de la série et 2 s après sa confirmation **À confirmer (P0)** (n° 272) |
| `pause` | Trou d'images avant cette ligne, en ms, s'il dépasse 1,5 s dans la même séquence : la séquence est à refaire (n° 274) |
| `evenement` | Résultat d'un calibrage (`calibrage ok n=… v=… d=…` ou `calibrage rejet <cause>`), `avertissement`, `sourire debut=…`, fin de séquence, classement de la revue (n° 274) |

Les journaux restent sur l'ordinateur de Valentin, dans un dossier chiffré séparé ; le disque est protégé par BitLocker et les journaux restent hors du dépôt public (n° 222, n° 223). Ils sont supprimés à la clôture du prototype 0, une fois les valeurs de [D2](D2-regles-jeu-arbitrage.md) validées, avec la colonne « Carnation » des fiches (n° 73, n° 78).

#### 1.4.2 Fiche testeur

| Code | Accord oral | Groupe (réglage / validation) | Tranche d'âge | Barbe | Lunettes | Bouche relevée | Carnation (claire / mate / foncée) | Appareil | Date |
|---|---|---|---|---|---|---|---|---|---|
| T01 | | | | | | | | | |
| T02 | | | | | | | | | |
| T03 | | | | | | | | | |
| T04 | | | | | | | | | |
| T05 | | | | | | | | | |
| T06 | | | | | | | | | |
| T07 | | | | | | | | | |
| T08 | | | | | | | | | |

La colonne « Carnation » est effacée à la clôture du prototype 0, en même temps que les journaux (n° 78). La fiche ne porte jamais de nom : seul le code relie un testeur à ses mesures.

#### 1.4.3 Calibrage

| Code | Condition | Essais | Causes de rejet | `n` | `v` | `v − n` | `d` | Plafonné par `d_max` |
|---|---|---|---|---|---|---|---|---|
| T01 | N | | | | | | | |
| T01 | B1 | | | | | | | |
| T01 | B2 | | | | | | | |
| T01 | B3 | | | | | | | |
| T01 | C (exagéré) | | | | | | | |

Une série de cinq lignes par testeur.

#### 1.4.4 Séquences en conditions normales

`P` : pic soutenu (1.5.1). `r = P / d` : une faute survient dès que `r ≥ 1`. Deux valeurs : formule de base / variante `cheekSquint`.

| Code | Séquence | `P` base | `P` variante | `r` base | Fautes | Confirmées | Faux positifs | Litigieuses | Pertes comptées |
|---|---|---|---|---|---|---|---|---|---|
| T01 | A1 | | | | | | | | |
| T01 | A2 | | | | | | | | |
| T01 | A3 | | | | | | | | |
| T01 | A4 | | | | | | | | |
| T01 | A5 | | | | | | | | |

#### 1.4.5 Sourires commandés (A6)

| Code | Légers détectés / 3 | Francs détectés / 3 | Rires détectés / 2 | `P` minimal des francs |
|---|---|---|---|---|
| T01 | | | | |

#### 1.4.6 Mouvements (A7)

| Code | Lacet où `S` décroche (°) | Tangage où `S` décroche (°) | Largeur au décrochage (%) | Sortie 2 s : avertissement | Sortie 6 s : faute | Sourire derrière la main détecté | Deuxième visage : perte |
|---|---|---|---|---|---|---|---|
| T01 | | | | | | | |

« Décroche » : `S` monte de plus de `m` sans changement d'expression, ou le visage n'est plus détecté.

#### 1.4.7 Conditions dégradées

| Code | Condition | Calibrage accepté | Cause de rejet | Faux positifs | Litigieuses | Francs détectés / 2 |
|---|---|---|---|---|---|---|
| T01 | B1 | | | | | |
| T01 | B2 | | | | | |
| T01 | B3 | | | | | |

#### 1.4.8 Performance

| Appareil | Navigateur | Charge vidéo | Images/s médiane | Fenêtre de 10 s la plus basse | Batterie consommée en 10 min | Toucher à 5 min | Toucher à 10 min | Ralentissement visible |
|---|---|---|---|---|---|---|---|---|
| | | Sans | | | | | | |
| | | Avec | | | | | | |

#### 1.4.9 Synthèse

| Indicateur | Réglage | Validation | Critère |
|---|---|---|---|
| Exposition N cumulée (min) | | | ≥ 60 |
| Faux positifs + litigieuses en N | | | 0 |
| Faux positifs + litigieuses en condition dégradée acceptée | | | 0 |
| Sourires francs détectés en N | | | Tous |
| Testeurs calibrés en N | | | Tous |
| `r` maximal en non-sourire (N) | | | < 1 |
| Calibrages honnêtes plafonnés par `d_max` | | | 0 |
| Calibrages exagérés plafonnés | | | Tous |
| Images/s, fenêtre la plus basse, appareil le plus ancien, avec charge | | | ≥ 10 |

### 1.5 Méthode de réglage du seuil

Réalisable dans un tableur, à partir des grilles 1.4.3 à 1.4.5. Le groupe de réglage seul sert aux étapes 1 à 8.

#### 1.5.1 Pic soutenu

- `P` = la plus haute valeur de `S − n` que le testeur **garde pendant au moins 500 ms** dans une séquence (durée de maintien, n° 84).
- Comme le seuil est `d = k × (v − n)`, une faute survient quand `P ≥ k × (v − n)`.
- Le calcul ignore l'image tolérée et le minimum de 3 images de R2 : c'est une approximation. L'étape 10 la vérifie.

#### 1.5.2 Intervalle de `k`

Pour chaque testeur du groupe de réglage :

- `k_min` = `P` maximal de ses séquences de non-sourire (A1 à A4) ÷ `(v − n)`. Sous cette valeur, il commet une faute sans sourire.
- `k_max` = `P` minimal de ses sourires francs (A6) ÷ `(v − n)`. Au-dessus, un de ses sourires francs passe inaperçu.

Intervalle valable pour tous : de `max(k_min)` à `min(k_max)`. On retient **le milieu** de l'intervalle, jamais un bord : un bord ne laisse aucune marge au testeur suivant.

Exemple : `max(k_min)` = 0,30 et `min(k_max)` = 0,70 donnent `k` = 0,50.

#### 1.5.3 Ordre des réglages

| Étape | Réglage ([D2](D2-regles-jeu-arbitrage.md) §3) | Données | Règle de choix |
|---|---|---|---|
| 1 | Formule du score (base ou `cheekSquint`) | A2, A3, A6 | Celle dont l'intervalle de `k` est le plus large. À égalité : la formule de base, plus simple. Si `cheekSquint` reste à 0 chez tous les testeurs, la variante est abandonnée (n° 237) |
| 2 | Coefficient `k` | A1 à A4, A6 | Milieu de l'intervalle (1.5.2) |
| 3 | Seuil maximal `d_max` | A0, C | Au-dessus de tous les `d` honnêtes ; sous les `d` exagérés. Si impossible : le signaler à Valentin (n° 183) |
| 4 | Marge `m` | A1 | 95e centile de `S − n` en A1, tous testeurs confondus, arrondi au centième supérieur |
| 5 | Écart-type maximal, plafond du neutre, amplitude minimale | A0 | Accepter tous les calibrages honnêtes en N, avec une marge d'au moins 20 % sur la valeur observée la plus proche |
| 6 | Luminance minimale | B1 à B3 | La plus basse luminance où les conditions restent sans faux positif et où les francs sont détectés |
| 7 | Lacet, tangage, largeur minimale | A7 | Juste sous le point de décrochage le plus bas observé |
| 8 | Délai de visage perdu, perte continue maximale | A1 à A6 | Aucune perte comptée en jeu normal. Sinon, allonger le délai |
| 9 | Durée de maintien, fenêtre de lissage | Journal | Seulement si l'intervalle de `k` est vide : rejouer le journal avec 400 et 600 ms de maintien, et avec 2 et 4 images de lissage, puis recalculer 1.5.2 |
| 10 | Vérification | Journal du groupe de validation | Rejouer R1 à R4 **en entier** avec les valeurs retenues, sans les retoucher. Remplir la colonne « Validation » de 1.4.9 |

Les pourcentages et marges de ce tableau sont des règles de méthode, pas des réglages du jeu : ils ne passent pas dans [D2](D2-regles-jeu-arbitrage.md).

### 1.6 Critères de décision

#### 1.6.1 Critères

| Code | Critère | Mesure (1.4.9) |
|---|---|---|
| G1 | Aucun faux positif ni litigieuse en conditions N, sur le groupe de validation | Rejeu de l'étape 10 |
| G2 | Aucun faux positif ni litigieuse dans une condition dégradée acceptée par le calibrage | 1.4.7 |
| G3 | Au moins 10 images/s sur chaque fenêtre de 10 s pendant 5 min, sans chauffe excessive, sur l'appareil le plus ancien, sans charge et avec charge vidéo (n° 81) | 1.4.8 |
| G4 | Calibrage réussi en N pour tous les testeurs | 1.4.3 |
| G5 | Tous les sourires francs détectés en N (n° 79) | 1.4.5 |
| G6 | Exposition N cumulée d'au moins 60 min | 1.4.9 |

#### 1.6.2 Décisions et effet sur D2

| Décision | Condition | Actions | Effet sur [D2](D2-regles-jeu-arbitrage.md) |
|---|---|---|---|
| **Go** | G1 à G6 respectés | Coder le prototype 1 | §3 : valeurs mesurées, colonne « Validé par » passée à « Validé (P0) » ; §2 : formule du score retenue, variante retirée ou adoptée ; §5.2 : `d_max` fixé ; R2 point 7 supprimé (la variante ne sert plus qu'en P0) ; une ligne D8 par valeur changée |
| **Ajustement** — faux positifs en N | Intervalle de `k` non vide après étape 1 ou 9 | Nouvelles valeurs ; nouvelle validation sur 2 testeurs neufs (séquences A0 à A6) | §3 et, si la formule change, §2 et §5.5 |
| **Ajustement** — faux positifs en dégradé | G2 échoue, G1 tient | Relever la luminance minimale ou resserrer les angles pour que le calibrage rejette cette condition | §3 ; R1 (messages de rejet) |
| **Ajustement** — calibrage trop strict | G4 échoue | Assouplir le critère qui rejette (étape 5), puis revérifier G1 | §3 ; R1 |
| **Ajustement** — performance | G3 échoue | Réduire la fréquence d'analyse ou la résolution (n° 52), puis refaire 1.3.8 | §3 : « Images minimales par sourire » à revoir si la cadence baisse |
| **Ajustement** — faux négatifs | G5 échoue, G1 tient | Baisser `k` dans l'intervalle ; si impossible, rapporter le cas à Valentin | §3 |
| **Abandon de l'arbitrage tel que défini** | Après 2 cycles d'ajustement (n° 82) : intervalle de `k` toujours vide pour au moins un profil, ou G3 impossible même en réduisant | Arrêt ; décision de Valentin parmi les options ci-dessous | À réécrire selon l'option choisie |

Options en cas d'abandon, **non décidées** :

| Option | Ce qu'elle change |
|---|---|
| Arbitrage contestable : le joueur accusé peut contester, la manche est rejouée | [D2](D2-regles-jeu-arbitrage.md) R2 et R7 ; affaiblit H5 (arbitre impartial) |
| Ne compter que le sourire franc, en acceptant de rater les sourires légers | [D2](D2-regles-jeu-arbitrage.md) §3 (`k` élevé) ; change la promesse du jeu |
| Restreindre les appareils compatibles | [D1](D1-note-de-cadrage.md) §2 et H6 |
| Arrêter le projet | [D1](D1-note-de-cadrage.md) |

### 1.7 Relevés des lots de développement

#### 1.7.1 Lot L0.1 — socle (2026-09-25)

Relevés de Valentin sur la page publiée ([D6](D6-lots-developpement.md) L0.1, n° 227). « MediaPipe prêt » : temps entre le lancement du script de la page et la création du détecteur ; il ne compte pas l'affichage de la page.

| Appareil | Système | Navigateur, réseau | Image caméra | MediaPipe prêt | Chargements externes |
|---|---|---|---|---|---|
| PC portable, i7-13650HX | Windows 11 | Chrome et Edge | 640 × 480 | 0,2 à 0,3 s, avec SIMD | 8 requêtes, toutes vers `vartax77.github.io` ; 1 bloqué après une minute : `odml.pa.googleapis.com/v1/log` |
| iPhone 15 Pro | iOS 26.6.2 | Safari, 5G, cache vide | 480 × 640 | 2,6 s, avec SIMD | 1 bloqué après une minute : `odml.pa.googleapis.com` |
| iPhone 15 Pro | iOS 26.6.2 | Navigateur intégré de Messenger, Wi-Fi | Fonctionne | 0,4 s | Script `connect.facebook.net/en_US/pcm.js` injecté par Messenger, bloqué |
| iPhone XR | iOS 18.7.9 | Safari, 4G | 480 × 640 | 2,1 s, avec SIMD | Non relevé |
| iPhone XR | iOS 18.7.9 | Navigateur intégré de Messenger, Wi-Fi | Fonctionne | 0,7 s | Non relevé |

Conclusions :

- **L0.1 terminé** sur les trois appareils.
- La politique de sécurité fonctionne sur Chrome, Edge, Safari iOS 18 et iOS 26, et dans le navigateur intégré de Messenger (n° 221). Elle y bloque aussi le script injecté par Messenger (n° 228).
- Le chargement complet reste sous la cible de 15 s en 4G ([D4](D4-architecture-technique.md) §7.4, information seulement).
- La détection ne tourne pas encore : que MediaPipe fonctionne normalement avec ses statistiques bloquées (n° 225) reste **à confirmer** en L0.2.

#### 1.7.2 Lot L0.2 — détection (2026-09-26)

Relevés de Valentin ([D6](D6-lots-developpement.md) L0.2, n° 236). Carte graphique par défaut ; « Processeur » : même appareil avec `?calcul=cpu`. Temps d'analyse : moyen / max / première image.

| Appareil | Mode | Caméra (im/s) | Analysée sur 10 s (fenêtres) | Temps d'analyse (ms) |
|---|---|---|---|---|
| PC, Chrome | Carte graphique | 30 | 14,5 (14,0 à 14,6) | 21 / 46 / 266 |
| PC, Chrome | Processeur | 30 | 14,4 | 30 / 40 / 88 |
| iPhone 15 Pro, iOS 26.6.2, Safari | Carte graphique | 30 | 15,0 (14,4 à 15,0) | 31-32 / 39 (54 avec deux visages) / 300 |
| iPhone 15 Pro | Processeur | 30 | 15,0 | 20 / 31 / 109 |
| iPhone XR, iOS 18.7.9, Safari | Carte graphique, sans repli | 26 à 27 | 14,5 (13,4 à 14,7) | 39-40 / 59 à 77 / 834 |
| iPhone XR | Processeur | 26 à 27 | 14,8 (14,0 à 14,9) | 34 / 45 / 286 |

Angles, identiques sur les trois appareils (n° 235) :

| Mouvement | PC | iPhone 15 Pro | iPhone XR |
|---|---|---|---|
| Tête tournée vers la gauche du joueur : lacet | +27° | +28° | +34° |
| Menton vers le bas : tangage | +29° | +30° | +29° |
| Profil complet | Visage perdu (0 visage) | Idem | Idem |

Mesures du visage :

| Mesure | Relevé |
|---|---|
| Score `s`, visage neutre | 0,00 à 0,04 sur les trois appareils |
| Score `s`, sourire léger | 0,23 (PC) |
| Score `s`, sourire franc | 0,79 (PC), 0,56 (iPhone 15 Pro) ; iPhone XR non lisible sur la capture |
| `cheekSquint` | 0,00 partout, sourires francs compris (n° 237) |
| Largeur | 26 % de face ; 13 à 17 % à un mètre ([D2](D2-regles-jeu-arbitrage.md) Q15) |
| Luminance | 123 à 137 en journée ; 74 à 96 le soir, lampe allumée |
| Main devant le visage | 0 visage |
| Deux personnes | 2 visages, mesures à « — » |
| Statistiques de MediaPipe | Seule tentative bloquée après une minute ; détection maintenue sur les trois appareils (confirme n° 225) |

Découverte : en pièce sombre, la webcam du PC descend d'elle-même de 30 à 10 images/s, et la cadence analysée suit à 10,0, exactement au plancher (n° 238). En condition B1 (pénombre), relever aussi la cadence caméra.

Conclusions :

- **L0.2 terminé** sur les trois appareils. Le plafond de 15 est respecté partout, et le coût du plafond strict reste faible (14,0 à 15,0, n° 231).
- **Critère G3** : l'iPhone XR analyse 14,5 images/s sur carte graphique, loin au-dessus du plancher de 10. La mesure formelle (10 min, avec charge vidéo) reste celle du protocole PERF (§1.3.8).
- **Mode de calcul** : sur les deux iPhone, le processeur est plus rapide que la carte graphique, et démarre plus vite (286 contre 834 ms sur le XR). Le choix « carte graphique d'abord » est à revoir ([D4](D4-architecture-technique.md) Q11).
- **Score `s`** : progressif, et cohérent avec les valeurs simulées (neutre 0,03 à 0,35, sourire volontaire 0,55 à 0,95).
- **Variante `cheekSquint`** : ne remonte rien avec ce modèle ; probablement à abandonner (n° 237).

#### 1.7.3 Lot L0.3 — calibrage (2026-09-26)

Relevés de Valentin sur le PC (Chrome, carte graphique) ([D6](D6-lots-developpement.md) L0.3, n° 244).

Calibrage réel réussi (septième essai) :

| Résultat | Détail |
|---|---|
| n 0,00 · v 0,63 · v − n 0,63 · d 0,25, non plafonné | Présence 100 % / 100 % · deux visages 0 % · largeur 30 % · lacet 4° · tangage 5° · luminance 134 · écart-type 0,002 · 43 + 25 images · cadence pendant le calibrage 13,6 im/s |

Mesures en direct après le calibrage :

| Situation | Relevé |
|---|---|
| Neutre | s 0,00 · largeur 30 % · lacet 2° · tangage 9° · luminance 116 |
| Sourire franc | s 0,69 (G 0,66 · D 0,72) · `cheekSquint` 0,00 |
| Hors champ | 0 visage |
| Personne debout au fond de la pièce | 0 visage : visage trop petit pour MediaPipe, il ne rend donc pas l'image invalide |
| À un mètre | Largeur 13 % · s 0,00 |
| Tête tournée vers la gauche | Lacet 29° · s 0,01 : aucun faux positif |
| Cadence caméra | 14,8 à 29,1 im/s à luminance égale (114 à 119) ; 14,8 à 15,2 im/s le soir à 21 h, lampe allumée (luminance 114) |
| Fenêtre de 10 s minimale | 8,4 im/s, probablement au démarrage : la page affiche désormais le moment du minimum pour le vérifier |

Simulation de R1 par Valentin, avec ces valeurs : trois défauts, corrigés (n° 245 à 247).

| Défaut | Constat dans le code | Correction |
|---|---|---|
| Deux visages masqué par la présence | Présent dans le texte de D2 et dans un cas limite du code (8 % à deux visages, 5 % sans visage) | « Deux visages » testé en premier ; en cas d'échec de présence, le message suit la cause dominante (n° 245) |
| Seuil de 60/255 jamais atteint | Présent : une pièce presque noire mesure 76 à 86, car l'exposition automatique compense | Pièce sombre = caméra sous 12 im/s **ou** luminance sous 60/255 (n° 247). Marge faible : 14,8 le soir avec une lampe |
| Sourire tenu signalé comme de la parole | Présent : l'écart-type était testé avant le neutre trop haut | Neutre trop haut testé avant l'écart-type (n° 246) |

Inconnue : la parole ne dépasse l'écart-type de 0,05 que si elle fait monter s d'environ 0,15. Une parole discrète passe le calibrage sans fausser `n` (n° 248). Le geste réel « parler » la mesurera.

Vérification automatique (`tests/calibrage.test.mjs`) : une séquence par cause de rejet, construite avec ces relevés, y compris les trois défauts et le plafond `d_max` (v − n de 0,80 et de 0,90). Avec l'ancien code, elle échoue exactement sur les trois défauts ; avec le nouveau, tout passe.

Suite (n° 249) : L0.3 se termine par trois gestes réels sur le PC (parler, deux visages proches, lampe éteinte). Les essais de calibrage sur iPhone passent au protocole P0 (séquence A0).

Gestes réels sur la version corrigée (PC, Chrome, carte graphique, 2026-09-26, n° 250) :

| Essai | Message | Détail |
|---|---|---|
| Calibrage normal | Réussi : n 0,00 · v 0,45 · v − n 0,45 · d 0,18, non plafonné | Présence 100 % / 100 % · deux visages 0 % · largeur 27 % · lacet 5° · tangage 5° · luminance 128 · écart-type 0,003 · 40 + 24 images · analysée 12,8 im/s · caméra 14,8 im/s |
| Parler (« ouistiti, merci, cheese, pipi, iii ») | « Restez silencieux et immobile. » | Écart-type 0,227 · n 0,25 · v 0,81 · v − n 0,56 · présence 100 % · 43 + 27 images · caméra 15,2 im/s. Score en direct pendant la lecture : jusqu'à 0,11 (G 0,07 · D 0,14) |
| Deux visages, joue contre joue | « Un seul visage dans le champ. » | Présence 0 % / 0 % · deux visages 100 % · 42 + 27 images · caméra 15,0 im/s |
| Lampe éteinte | « Pas assez de lumière… » (ER3) | Luminance 86 · caméra 10,2 im/s · analysée 10,2 · écart-type 0,000 · n 0,00 · v 0,70 · 31 + 20 images. La cadence caméra déclenche seule le rejet : n° 247 confirmé sur le PC |

Autres constats :

| Constat | Relevé | Portée |
|---|---|---|
| `v` varie pour le même visage | 0,45, 0,63, 0,81 selon l'essai, soit `d` de 0,18 à 0,32 | Le seuil dépend de l'intensité du sourire volontaire. Avec `v` bas, le seuil baisse (0,18) : un sourire léger (0,23 en L0.2) deviendrait une faute. À mesurer en P0 (n° 251) |
| Coût du plafond strict avec une caméra à 15 im/s | Caméra 14,8, analysée 12,8 (−2 im/s) ; dans le noir, caméra 10,2, analysée 10,2, exactement au plancher | Perte plus forte que dans la simulation (1 im/s au plus, n° 231). À revoir si la cadence commune en souffre en P0 (n° 252) |
| Première fenêtre de 10 s | 13,5 dans une session, 11,6 dans une autre (à 10 s) ; dans le noir, 11,4 puis 10,0 | Le minimum de 8,4 relevé plus tôt n'est pas retrouvé ; le démarrage pèse peu |
| « Fenêtres de 10 s : min 0,1 (à 41 s) », session lampe éteinte | Une seule image dans la fenêtre de 10 s | Analyse suspendue au moins 10 s : page masquée ou fenêtre recouverte (n° 253) |

**L0.3 terminé** sur le PC : critère n° 249 rempli.

#### 1.7.4 Lot L0.4 — sourire et jauge (2026-09-26)

Relevés de Valentin ([D6](D6-lots-developpement.md) L0.4, n° 259), avec la nouvelle consigne de la phase sourire (n° 257).

Calibrages :

| Appareil | `v` (`d`) | Autres |
|---|---|---|
| PC, Chrome, carte graphique | 0,82 (0,33) · 0,62 (0,25) · 0,52 (0,21) | Tous non plafonnés ; n 0,00 ; écart-type 0,000 à 0,001 |
| iPhone 15 Pro, Safari, processeur | 0,68 (0,27) · 0,47 (0,19) | n 0,01 puis 0,00 ; largeur 36 % ; luminance 108 ; écart-type 0,003 à 0,004 ; 45 + 28 et 45 + 30 images ; caméra 30,2 im/s |

Manche d'essai :

| Appareil | Geste | Résultat |
|---|---|---|
| PC (`d` 0,21) | Grand sourire | 1 sourire confirmé, daté à 0,7 s (confirmation vers 1,4 s) ; durée 1,6 s ; 24 images ; S max 0,71 ; P 0,67 ; r 3,27. Jauge à 100 %, pic resté à 100 % au retour au neutre |
| PC | Neutre | Jauge 0 % |
| PC | Sourire très léger (s 0,07) | Aucun sourire ajouté |
| iPhone 15 Pro (`d` 0,27) | Sourire bref | Aucun sourire confirmé, alors que la jauge a touché 100 % (pic 100 % ; P 0,09 ; r 0,35) : jauge à 100 % ne veut pas dire faute (D2 §6.6, règle 2) |
| iPhone 15 Pro (`d` 0,19) | Sourire franc | 1 sourire confirmé à 0,8 s ; durée 0,9 s ; 14 images ; S max 0,76 ; P 0,62 ; r 3,29 ; analyse stable à 15,0 im/s |

A3 sur le PC (`d` 0,33, le seuil le plus haut de la soirée), manche de 15,1 s : mots tenus 1 s « iii, ouistiti, cheese, pipi, merci », puis « pi-pi-pi-pi » pendant 5 s.

| Faute | Début | Durée | Images | S max |
|---|---|---|---|---|
| 1 | 2,4 s | 2,1 s | 29 | 0,50 |
| 2 | 5,2 s | 0,7 s | 9 | 0,52 |
| 3 | 6,1 s | 1,6 s | 23 | 0,81 |

P 0,71 ; r 2,17 ; variante `cheekSquint` : 0 sourire. Aucune faute après 7,7 s, donc probablement aucune pendant « pi-pi-pi-pi ».

Autres constats :

- **Analyse suspendue** : fenêtres de 10 s à 8,8, 1,9 et 0,1 sur le PC (captures d'écran). Sur l'iPhone, un sourire franc fait pendant une pause d'analyse (capture ou sortie de Safari : cadence 6,1 im/s sur 10 s, fenêtre à 0,1 à 42 s) **n'a pas été vu**. Même cause que n° 253, confirmée sur iPhone (n° 262).
- **Étiquette « forcé par ?calcul= » sur l'iPhone** : exacte. Elle ne s'affiche que si l'adresse contient le paramètre, probablement resté dans l'onglet Safari depuis le test L0.2.

Conclusions :

- **L0.4 terminé** sur le PC et l'iPhone 15 Pro : sourire franc confirmé, sourire bref non compté, jauge conforme.
- **Parole** : les mots qui étirent les lèvres montent à 0,50-0,81, au niveau d'un vrai sourire, et font une faute même avec `d` 0,33. La simulation supposait 0,25. `cheekSquint` ne remonte rien et ne peut pas servir de parade (n° 260, [D2](D2-regles-jeu-arbitrage.md) Q17).
- **Dispersion de `v`** : 0,45 à 0,82 pour un même visage sur les deux appareils, malgré la nouvelle consigne. La consigne seule ne suffit pas (n° 261).

#### 1.7.5 Lot L0.5 — pertes et preuve (2026-09-26)

Relevés de Valentin ([D6](D6-lots-developpement.md) L0.5, n° 268).

| Appareil | Calibrage | Manche d'essai |
|---|---|---|
| PC, Chrome, carte graphique | n 0,00 · v 0,71 · d 0,29 | 32,9 s. Faute 1 à 10,7 s, « Visage perdu » (sortie de 6 s). Avertissement à 18,4 s. Faute 2 à 21,9 s, « Visage perdu — pendant une pause d'analyse de 5,4 s » (Chrome réduit : début vers 16,9 s, avertissement à + 1,5 s, faute à + 5 s, conforme). Faute 3 à 26,9 s, sourire de 1,6 s, 23 images, S max 0,74, image de preuve affichée (« S le plus haut : 0,74 »). P 0,71 ; r 2,48. Panneau : 1 pause, 7,6 s |
| iPhone 15 Pro, Safari, processeur par défaut | n 0,00 · v 0,64 · d 0,25 · largeur 38 % · caméra 30,2 im/s | 30,7 s. Faute 1 à 7,6 s, « Visage perdu » (sorties de 2 s puis de 6 s). Avertissement à 17,1 s. Faute 2 à 20,6 s, « Visage perdu » (passage à l'écran d'accueil ; début vers 15,6 s, faute à + 5 s). Fautes 3 et 4 : sourires à 24,4 s (1,4 s, S max 0,81) et 27,7 s (3,0 s, S max 0,72), image de preuve affichée (S 0,72). P 0,79 ; r 3,10. Panneau : 3 pauses, 23,6 s au total, la plus longue 9,4 s |

Autres constats :

- **Stockage du navigateur (PC)** : stockage local, de session, IndexedDB et cache vides.
- **iPhone** : la vidéo a repris seule au retour dans Safari, et les sourires suivants ont été détectés. Observation pour P1 (K3 à K5). L'étiquette du mode de calcul (« par défaut sur iOS ») est juste.
- **Deux défauts d'affichage des pauses**, expliqués par le code et corrigés (n° 270) :
  - la faute 2 de l'iPhone n'avait pas la mention « pause », parce que des images invalides avaient ouvert la perte juste avant le passage à l'accueil ;
  - la faute 2 du PC indiquait la pause vue jusqu'à la faute (5,4 s), et non sa durée totale (7,6 s).
  - Le compteur du panneau couvre toute la session, pas la manche.

Parade 3 : blendshapes candidats sur le PC (valeurs gauche / droite) :

| Geste | `mouthSmile` | `jawOpen` | `mouthStretch` | `mouthUpperUp` | `mouthDimple` |
|---|---|---|---|---|---|
| Neutre | 0,00 / 0,00 | 0,01 | 0,00 / 0,00 | 0,00 / 0,00 | 0,01 / 0,02 |
| Vrai sourire, bouche fermée | 0,45 / 0,59 | 0,00 | 0,01 / 0,01 | 0,00 / 0,00 | 0,00 / 0,04 |
| « iii » tenu | 0,59 / 0,77 | 0,03 | 0,01 / 0,01 | 0,10 / 0,27 | 0,00 / 0,02 |
| « cheese » tenu | 0,51 / 0,74 | 0,05 | 0,01 / 0,01 | 0,10 / 0,29 | 0,00 / 0,04 |
| Rire bouche ouverte | 0,78 / 0,82 | 0,04 | 0,01 / 0,04 | 0,50 / 0,59 | 0,00 / 0,01 |

Conclusions :

- **L0.5 terminé** sur le PC et l'iPhone 15 Pro.
- **Parade 3 écartée comme veto** (n° 269). `jawOpen` (0,04 bouche grande ouverte), `mouthStretch` et `mouthDimple` ne bougent pas avec ce modèle. `mouthUpperUp` bouge, mais le rire (0,50-0,59) monte plus haut que les mots (0,10-0,29) : un veto sur lui laisserait passer les rires. `mouthUpperUp` reste observé dans le journal P0 des 52 blendshapes.

## 2. Prototype 1 — appel vidéo seul

### 2.1 Objectif et risques testés

Objectif : prouver que deux appareils sur des réseaux différents se connectent **toujours**, relais compris (n° 38), puis mesurer ce dont l'arbitrage dépend : horloges, coupures, charge réelle. Lots testés : L1.1 à L1.5 de [D6](D6-lots-developpement.md).

| Risque | Critère | Référence |
|---|---|---|
| Connexion impossible sur certains réseaux | C1 : 100 % des connexions aboutissent avec le relais | n° 38, n° 51 ; [D4](D4-architecture-technique.md) RT3 |
| Connexion trop lente | C2 : établissement en 20 s au plus | [D2](D2-regles-jeu-arbitrage.md) §6.7 |
| Horloges mal synchronisées | C3 : erreur réelle couverte par la borne `e = a_min / 2` | n° 89, n° 114, n° 160, n° 161 ; [D2](D2-regles-jeu-arbitrage.md) §5.6 ; [D4](D4-architecture-technique.md) §5.1 |
| Coupure mal gérée | C4 : reconnexion, présence et forfait conformes à [D2](D2-regles-jeu-arbitrage.md) §6.4 | n° 99 à 102 |
| Performance avec un vrai appel | C5 : critère G3 (§1.6.1) tenu avec un appel réel | n° 81 ; [D4](D4-architecture-technique.md) RT2 |
| Vidéo ou son muets sur iOS | C6 : image et son des deux côtés dans tous les essais | [D4](D4-architecture-technique.md) RT8 |

Valeurs **À confirmer (P1)** relevées par ce prototype : multiplicateur de l'erreur d'horloge et allers-retours ([D2](D2-regles-jeu-arbitrage.md) §3) ; délai de connexion, silence de 3 s, reconnexion de 30 s, écran noir de 2 s, grisé de la jauge ([D2](D2-regles-jeu-arbitrage.md) §6.7) ; calcul de `e`, chargement, retard vidéo, résolution et codec ([D4](D4-architecture-technique.md) §5.1, §7.4).

### 2.2 Réseaux, appareils, volume

#### 2.2.1 Combinaisons de réseaux

| Code | Appareil A | Appareil B | Lieu | Personnes |
|---|---|---|---|---|
| R1 | Wi-Fi, box de l'opérateur X | Wi-Fi, box d'un autre opérateur | Deux domiciles | Valentin + un proche (disponible, n° 197) |
| R2 | Wi-Fi | 4G ou 5G | Même lieu, ou deux lieux avec le proche | Valentin seul, ou avec le proche (n° 197) |
| R3 | 4G | 4G, même opérateur | Même lieu | Valentin seul |
| R4 | 4G | 4G, autre opérateur | Même lieu | Valentin + un proche (deuxième carte SIM ; disponible, n° 197) |
| R5 | Wi-Fi restrictif (public, entreprise ou invité) | 4G | Selon disponibilité | Valentin seul |
| R6 | Wi-Fi | Même Wi-Fi | Même lieu | Valentin seul (témoin) |
| RF | Relais forcé : tout passe par le relais, quelle que soit la combinaison | — | Même lieu | Valentin seul |

- R5 n'est testé que si un tel réseau est disponible. Sinon, RF en tient lieu : RF prouve que le relais fonctionne, y compris en TLS sur le port 443 (n° 193).
- Dans chaque combinaison, au moins 3 essais sur 10 avec un iPhone sous Safari, et au moins 3 avec un ordinateur.

#### 2.2.2 Volume

| Élément | Valeur |
|---|---|
| Essais de connexion | 10 par combinaison (n° 51) : 70 essais avec R5 |
| Mesure des horloges | 20 flashs par combinaison, sur R2, R3 et R6 |
| Coupures | 5 répétitions par scénario, sur un iPhone et sur un Android ; sans Android emprunté, sur iPhone et ordinateur (n° 218) |
| Charge réelle | 10 min par appareil, sur l'iPhone XR (le plus ancien) et sur l'iPhone 15 Pro |
| Chargement | 5 premiers chargements en 4G, cache vidé |
| Durée totale estimée | Deux séances de 3 heures |

### 2.3 Protocole

#### 2.3.1 Essais de connexion

1. L'hôte crée un salon et envoie le lien par messagerie.
2. L'invité ouvre le lien, coche la case, rejoint, autorise.
3. Chronomètre : de l'appui sur « Rejoindre le duel » jusqu'à l'image et au son de l'adversaire affichés **des deux côtés**.
4. Réussite si l'appel est établi en 20 s au plus, avec image et son des deux côtés. Sinon, échec : noter le message affiché.
5. Garder l'appel 60 s ; noter les gels d'image.
6. Quitter des deux côtés. Essai suivant : nouveau salon.

#### 2.3.2 Relais forcé (RF)

Comme 2.3.1, avec l'option « relais forcé » de L1.2. Sur 10 essais : 4 avec le relais en UDP, 3 en TCP, 3 en TLS sur le port 443.

#### 2.3.3 Mesure des horloges par flash commun

Principe : les deux appareils filment le même événement ; l'écart entre leurs horodatages, une fois convertis dans l'horloge de l'hôte, mesure l'erreur réelle de synchronisation.

1. Placer les deux appareils côte à côte, caméras tournées vers un troisième écran.
2. Le troisième écran alterne noir et blanc toutes les 2 s (page de test de L1.4).
3. Chaque appareil repère l'image où la luminance moyenne saute, et note son horodatage.
4. L'hôte convertit l'horodatage de l'invité avec le décalage θ, et calcule l'écart pour chaque flash.
5. À chaque flash, noter aussi `e` et `W` de la dernière synchronisation.
6. 20 flashs par combinaison. Resynchroniser (5 allers-retours) tous les 5 flashs, comme avant chaque manche.

L'écart mesuré contient l'erreur de synchronisation et au plus un intervalle d'image par appareil. On le compare donc à `e + i`, avec `e = a_min / 2` ([D2](D2-regles-jeu-arbitrage.md) §5.6). Le test dit si la borne garantie couvre bien l'erreur réelle, et de combien elle la dépasse : une borne très au-dessus de l'erreur réelle produit des manches nulles inutiles.

Même montage pour le **retard vidéo** : l'appareil B compare l'instant où il voit le flash par sa propre caméra et l'instant où il le voit dans la vidéo reçue de A. Les deux instants sont sur l'horloge de B.

#### 2.3.4 Coupures

| Scénario | Action | Attendu ([D2](D2-regles-jeu-arbitrage.md) §6.4) |
|---|---|---|
| K1 | Couper le Wi-Fi de A pendant 10 s, puis le rétablir | B affiche « Votre adversaire a perdu la connexion » après environ 3 s ; reprise |
| K2 | Couper le Wi-Fi de A pendant 40 s | Après 30 s, le serveur désigne A absent ; B voit la victoire par forfait |
| K3 | A passe dans une autre application 5 s, puis revient | La caméra de A est coupée ; l'appel reprend |
| K4 | A passe dans une autre application 40 s | Selon l'état du canal : reprise ou forfait. Noter lequel |
| K5 | A verrouille son écran 10 s | Idem K3. Noter si la caméra revient seule |
| K6 | A ferme l'onglet | B voit « adversaire injoignable », puis le forfait |
| K7 | A et B coupent leur réseau en même temps pendant 40 s | Aucun vainqueur : « Connexion perdue. Match interrompu. » |

Mesures : délai de détection, reconnexion réussie ou non, réponse du serveur de présence, message affiché.

#### 2.3.5 Charge réelle

1. Appel établi, détection active sur les deux appareils (L1.5), visage dans le champ.
2. 10 min. Cadence relevée par fenêtre de 10 s ; batterie au début et à la fin ; toucher à 5 et 10 min.
3. Mêmes règles que la session performance de P0 (§1.3.8).

#### 2.3.6 Chargement

Cache du navigateur vidé, 4G, lien ouvert : chronométrer l'accueil affiché, puis le modèle prêt (bouton « Commencer » actif au calibrage). 5 essais.

#### 2.3.7 Navigateurs intégrés des messageries

En pratique, les invitations sont ouvertes depuis une messagerie : la page s'exécute alors dans le navigateur intégré de l'application, pas dans Safari ni dans Chrome (n° 228, n° 229).

| Code | Navigateur | Appareils |
|---|---|---|
| M1 | Messenger | iPhone XR, iPhone 15 Pro |
| M2 | WhatsApp | iPhone XR, iPhone 15 Pro |
| M3 | Instagram | iPhone XR, iPhone 15 Pro |

Pour chacun :

1. Envoyer le lien d'invitation depuis l'application, puis l'ouvrir d'un appui.
2. Noter le navigateur réellement utilisé : intégré à l'application, ou Safari.
3. Vérifier : caméra, MediaPipe prêt, appel établi avec image et son des deux côtés (comme 2.3.1).
4. Noter les chargements bloqués par la politique de sécurité : domaine et nature (script injecté par l'application, statistiques…).
5. Passer dans une autre application 5 s, puis revenir : l'appel reprend-il (comme K3) ?

Résultat : il informe [D5](D5-parcours-maquettes.md) Q8 (proposer « Ouvrir dans Safari ») et la ligne « navigateurs intégrés » de [D4](D4-architecture-technique.md) §7.2.

### 2.4 Journal P1

Une ligne par essai de connexion. Aucune image, aucun son.

| Colonne | Contenu |
|---|---|
| `essai` | Numéro |
| `combi` | R1 à R6, RF |
| `app_a`, `app_b` | Appareil et navigateur |
| `reussi` | 1 ou 0 ; message si échec |
| `t_etab` | Temps d'établissement, s |
| `candidat` | Direct local, direct public, relais |
| `relais_proto` | UDP, TCP, TLS |
| `rtt` | Aller-retour médian, ms |
| `debit` | Débit vidéo reçu, kbit/s |
| `pertes` | Paquets perdus, % |
| `gels` | Nombre de gels d'image en 60 s |
| `son_img` | Image et son présents des deux côtés : 1 ou 0 |

Journal des flashs : combinaison, numéro, écart mesuré (ms), `e`, `i`, `W`, aller-retour minimal.

### 2.5 Grille de résultats

| Combinaison | Réussites / 10 | `t_etab` maximal (s) | Part relayée | Rtt médian (ms) | Échecs : message |
|---|---|---|---|---|---|
| R1 | | | | | |
| R2 | | | | | |
| R3 | | | | | |
| R4 | | | | | |
| R5 | | | | | |
| R6 | | | | | |
| RF | | | 100 % | | |

| Horloges | R2 | R3 | R6 |
|---|---|---|---|
| Flashs avec écart ≤ `e + i` / 20 | | | |
| Écart réel, 95e centile (ms) | | | |
| `e` médian (ms) | | | |
| `W` médian (ms) | | | |
| Retard vidéo médian (ms) | | | |

| Coupure | Répétitions conformes / 5 (iPhone) | Répétitions conformes / 5 (Android) | Délai de détection médian (s) |
|---|---|---|---|
| K1 à K7 | | | |

| Charge réelle | iPhone XR (le plus ancien) | iPhone 15 Pro |
|---|---|---|
| Fenêtre de 10 s la plus basse (images/s) | | |
| Chauffe excessive (§1.3.8) | | |

| Chargement (4G, cache vide) | Médiane | Maximum |
|---|---|---|
| Accueil affiché (s) | | |
| Modèle prêt (s) | | |

### 2.6 Critères de décision

| Code | Critère | Mesure |
|---|---|---|
| C1 | 10 réussites sur 10 dans chaque combinaison testée, RF compris | 2.5 |
| C2 | Toutes les réussites établies en 20 s au plus | 2.5 |
| C3 | Au moins 19 flashs sur 20 avec un écart ≤ `e + i`, dans chaque combinaison | 2.5 |
| C4 | Tous les scénarios K1 à K7 conformes, sur iPhone et Android | 2.5 |
| C5 | Critère G3 (§1.6.1) tenu pendant l'appel réel, sur les deux appareils | 2.5 |
| C6 | Image et son des deux côtés dans tous les essais iOS | Journal, `son_img` |

Seuil de C3 (19 sur 20) : validé par Valentin (n° 194).

Valeurs relevées **à titre d'information**, sans critère ni effet sur la décision « Go » (n° 168) : retard vidéo (cible 300 ms), premier chargement (3 s), modèle prêt (15 s) ([D4](D4-architecture-technique.md) §7.4), durée de l'écran noir (2 s, [D2](D2-regles-jeu-arbitrage.md) §6.7). Elles ajustent ces cibles dans [D4](D4-architecture-technique.md) et [D2](D2-regles-jeu-arbitrage.md).

| Décision | Condition | Actions | Effet sur les documents |
|---|---|---|---|
| **Go** | C1 à C6 respectés | Coder le prototype 2 ([D6](D6-lots-developpement.md) L2.1a) | [D2](D2-regles-jeu-arbitrage.md) §3 et §6.7 : valeurs P1 passées à « Validé (P1) » ; [D4](D4-architecture-technique.md) §7.4 : cibles mesurées |
| **Changer de relais** | C1 échoue | Changer de service (n° 53), puis refaire 10 essais dans la combinaison en échec et en RF | [D4](D4-architecture-technique.md) §8.4 |
| **Changer de mise en relation** | Échecs dus au serveur public PeerJS (lenteur, indisponibilité) | Passer au serveur auto-hébergé plus tôt que prévu, à ≈ 4,57 € par mois, accepté par Valentin (n° 163) | [D4](D4-architecture-technique.md) §8.4 |
| **Revoir les délais** | C2 ou C4 échoue | Allonger le délai concerné, puis refaire le scénario | [D2](D2-regles-jeu-arbitrage.md) §6.7 |
| **Revoir `e`** | C3 échoue | Revenir au multiplicateur 2 (`W = max(100 ms, 2 × e + i)`) ou élargir la borne ; refaire 2.3.3 | [D2](D2-regles-jeu-arbitrage.md) R5, §5.6 ; [D4](D4-architecture-technique.md) §5.1 |
| **Alléger la charge** | C5 échoue | Baisser la résolution envoyée, puis la cadence commune vers 10 (n° 52) | [D4](D4-architecture-technique.md) §7.4 |
| **Corriger iOS** | C6 échoue | Corriger la lecture (geste, `playsinline`) ; refaire les essais iOS | [D4](D4-architecture-technique.md) RT8 |

Enseignement pour P2 : si `W` dépasse souvent 200 ms (réseaux lents), s'attendre à plus de manches nulles et le vérifier par le critère A2 (§3.7).

## 3. Prototype 2 — duel complet

### 3.1 Objectif et risques testés

Objectif : savoir si le jeu donne envie de rejouer (critère de réussite de la v1, n° 50), et si l'arbitrage tient en situation réelle. Lots testés : L2.1a à L2.6 de [D6](D6-lots-developpement.md).

| Risque | Hypothèse | Critère | Référence |
|---|---|---|---|
| Le jeu ne donne pas envie de rejouer | H3, H5 | V1 : revanche spontanée dans au moins la moitié des matchs | n° 40, n° 50 |
| Ennui : personne ne craque | H2 | E1 : au plus la moitié des manches vont au bout des 60 s | n° 42 |
| Arbitrage contesté en jeu | H1 | A1 : aucune contestation fondée | n° 36, n° 80 |
| Trop de manches nulles ou divergentes | H1 | A2 | n° 95, n° 108 |
| Triche par la main devant la bouche | H1 | A3 | n° 70 |
| Défaillance technique en match | — | T1 | [D4](D4-architecture-technique.md) RT7, RT10, RT11 |
| Demande pour le mode inconnus | — | Aucun seuil : la réponse oriente ce chantier | n° 41 |
| Gêne d'être filmé et analysé | H4 | Aucun seuil : information seulement, pour [D7](D7-juridique-confidentialite.md) (question 12) | Source §2.1 ; n° 165 |
| L'application n'apporte rien de plus qu'un appel vidéo | H5 | Aucun seuil : information seulement (question 16) | Source §2.1 ; n° 167 |
| Différenciation face aux filtres ; acquisition | H5 | Hors v1 ([D1](D1-note-de-cadrage.md) §5.2). Aucun seuil : information seulement (questions 13 et 14) | Source §2.3 ; n° 166 |

Valeurs **À confirmer (P2)** relevées par ce prototype : durée de la manche, 2 manches gagnantes, fenêtre de simultanéité minimale, écart de pics ([D2](D2-regles-jeu-arbitrage.md) §3) ; durée de vie du salon, manches interrompues tolérées, arrêt sur image, délai de revanche ([D2](D2-regles-jeu-arbitrage.md) §6.7) ; image de preuve ([D4](D4-architecture-technique.md) §4.3).

### 3.2 Panel et organisation

| Élément | Règle |
|---|---|
| Matchs comptés | **10 matchs** (n° 39) : le **premier match** de 10 sessions distinctes. Les revanches sont jouées et journalisées, mais ne comptent pas parmi les 10 (n° 195) |
| Joueurs | Des proches, 18 ans ou plus. Chaque joueur participe à 2 matchs comptés au plus |
| Valentin | Ne joue dans aucun match compté : il voudrait la revanche et fausserait V1 (n° 195) |
| Appareils | Au moins 3 matchs avec un iPhone, au moins 3 avec un ordinateur, au moins 3 entre deux téléphones |
| Distance | Chaque joueur chez lui (n° 1) ; au moins 3 matchs sur des réseaux différents |
| Observation | Valentin assiste en silence à 5 matchs sur 10, à côté d'un des joueurs. Les 5 autres se jouent sans lui (n° 195) |
| Préalable | Accord oral des deux joueurs, noté (n° 78, n° 211) ; pages de [D7](D7-juridique-confidentialite.md) en ligne ([D6](D6-lots-developpement.md) L2.6, n° 212) |

### 3.3 Déroulé des 10 matchs

Pour chaque session :

1. **Invitation.** Valentin envoie au futur hôte un seul message : « Voici le jeu Ne souris pas. Défie [prénom] quand vous êtes libres tous les deux : [lien]. » Aucune autre consigne ; en particulier, rien sur la revanche.
2. **Accord.** Avant de jouer, chaque joueur donne son accord oral à Valentin (message ou appel) pour le journal et le questionnaire.
3. **Match.** L'hôte crée le duel et envoie le lien ; les joueurs jouent. Personne n'intervient.
4. **Revanche.** Pendant les 60 s qui suivent la fin du match, personne d'autre que les joueurs ne parle de revanche. Les joueurs peuvent se lancer le défi entre eux : cela reste spontané.
5. **Suite.** Les joueurs enchaînent autant de revanches qu'ils veulent.
6. **Fin.** Quand la session se termine, l'hôte exporte le journal (L2.5) et l'envoie à Valentin.
7. **Questionnaire.** Chaque joueur répond au questionnaire (3.5), le jour même, séparément.
8. **Matchs observés.** Valentin note en plus, pendant le jeu : réactions à l'arrêt sur image, contestations orales, main devant la bouche, incidents.

Définitions :

| Terme | Définition |
|---|---|
| Revanche spontanée | Les deux joueurs appuient sur « Revanche » dans les 60 s, sans que personne d'autre qu'eux ne l'ait suggéré |
| Manche au bout des 60 s | Manche décidée par le départage (R6), ou manche nulle au départage |
| Contestation | Un joueur dit, pendant le jeu ou dans le questionnaire, qu'une manche perdue par sourire ne l'était pas |
| Contestation fondée | Contestation pour laquelle les deux joueurs disent, dans le questionnaire, que l'image de preuve ne montrait pas de sourire |
| Triche par la main | Un joueur cache sa bouche avec la main pour masquer un sourire, vu par Valentin (matchs observés) ou avoué dans le questionnaire |

### 3.4 Métriques

Journal P2 (L2.5), une ligne par manche. Aucune image, aucun son.

| Colonne | Contenu |
|---|---|
| `session`, `match`, `manche` | Numéros ; match compté ou revanche |
| `app_hote`, `app_invite` | Appareil et navigateur |
| `duree` | Durée de la manche, s |
| `cause` | Sourire, perte, départage, nulle (simultanéité), nulle (pics), interrompue |
| `perdant` | Hôte, invité, aucun |
| `ecart_fautes` | Écart entre les deux fautes, ms, s'il y en a deux |
| `pics` | Pics de jauge des deux joueurs |
| `e`, `w`, `cadence` | Synchronisation et cadence commune de la manche |
| `divergence` | 1 si T21 |
| `preuve` | Image reçue : délai en s, ou « non reçue » |
| `coupures` | Nombre et durée |
| `revanche` | Pour la dernière manche d'un match : oui ou non, délai en s |
| `t_lien_duel` | Pour le premier match : temps entre l'ouverture du lien par l'invité et la révélation, s |

Indicateurs calculés sur les 10 matchs comptés :

| Indicateur | Calcul |
|---|---|
| Taux de revanche | Matchs comptés suivis d'une revanche spontanée / 10 |
| Taux de manches au bout des 60 s | Manches au bout des 60 s / manches jouées dans les matchs comptés |
| Taux de manches nulles | Manches nulles / manches jouées |
| Divergences | Nombre total |
| Contestations, contestations fondées | Nombre total |
| Durée médiane d'une manche | s |
| Nombre moyen de revanches par session | Toutes sessions |

### 3.5 Questionnaire aux testeurs

Rempli par chaque joueur, séparément, le jour même. Environ 5 minutes. Sans nom : code de session et rôle (hôte ou invité).

| N° | Question | Réponse |
|---|---|---|
| 1 | Vous êtes-vous amusé ? | 1 (pas du tout) à 5 (beaucoup) |
| 2 | Qu'est-ce qui vous a fait rire, ou pas ? | Texte libre |
| 3 | L'arbitrage vous a-t-il paru juste ? | 1 à 5 |
| 4 | Une manche vous a-t-elle paru mal jugée ? Laquelle, et l'image montrait-elle un sourire ? | Oui / non ; texte |
| 5 | Avez-vous souri sans que le jeu le voie ? | Oui / non / je ne sais pas |
| 6 | Avez-vous caché votre bouche avec la main ? | Oui / non |
| 7 | Avez-vous ri sans sourire (rire sonore, bouche fermée) ? | Oui / non |
| 8 | Les manches de 60 s étaient-elles… | Trop courtes / bien / trop longues |
| 9 | Le match en 2 manches gagnantes était-il… | Trop court / bien / trop long |
| 10 | Auriez-vous aimé que le jeu vous aide à faire rire l'autre (défis, images, sons) ? | Oui / non / peut-être |
| 11 | Auriez-vous voulu garder ou partager l'image du moment où l'un a craqué ? | Oui / non |
| 12 | Être filmé et analysé vous a-t-il gêné ? | 1 (pas du tout) à 5 (beaucoup) ; texte |
| 13 | Rejoueriez-vous avec un autre ami ? | Oui / non / peut-être |
| 14 | Joueriez-vous avec un inconnu ? | Oui / non / peut-être ; pourquoi |
| 15 | Qu'avez-vous trouvé difficile ou confus dans l'application ? | Texte libre |
| 16 | Auriez-vous joué pareil en simple appel vidéo, sans l'application ? Qu'apporte l'arbitre ? | Oui / non / je ne sais pas ; texte |

Correspondances : question 7 → détection sonore du rire (n° 34) ; 10 → provocations (n° 3) ; 11 → clip partageable (n° 32) ; 12 → H4 ; 13 et 14 → acquisition et différenciation, hors v1 (n° 166) ; 14 → mode inconnus (n° 41) ; 16 → H5 (n° 167). Les questions 12, 13, 14 et 16 sont des informations : elles n'ont ni seuil ni effet sur la décision.

### 3.6 Grille de résultats

| Session | Appareils | Réseaux | Observé | Manches | Causes | Au bout des 60 s | Nulles | Revanche spontanée | Revanches jouées | Contestations (fondées) | Main | Incidents |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S01 | | | | | | | | | | | | |
| S02 | | | | | | | | | | | | |
| S03 | | | | | | | | | | | | |
| S04 | | | | | | | | | | | | |
| S05 | | | | | | | | | | | | |
| S06 | | | | | | | | | | | | |
| S07 | | | | | | | | | | | | |
| S08 | | | | | | | | | | | | |
| S09 | | | | | | | | | | | | |
| S10 | | | | | | | | | | | | |

Synthèse :

| Indicateur | Valeur | Critère |
|---|---|---|
| Matchs suivis d'une revanche spontanée | | ≥ 5 / 10 |
| Manches au bout des 60 s | | ≤ 50 % |
| Contestations fondées | | 0 |
| Manches nulles | | ≤ 10 % |
| Divergences | | 0 |
| Matchs avec triche par la main | | ≤ 2 / 10 |
| Images de preuve reçues en 2 s au plus | | 100 % |
| Question 14 : « oui » | | Information |
| Question 13 : « oui » | | Information |
| Question 12 : moyenne | | Information |
| Question 16 : part des « non » (l'application apporte plus qu'un appel vidéo) | | Information |
| Questions 8 et 9 : majorité | | Ajuste 60 s et 2 manches |

### 3.7 Critères de décision

| Code | Critère | Si échec |
|---|---|---|
| V1 | Revanche spontanée dans au moins 5 matchs comptés sur 10 (n° 40) | Réintroduire des provocations (n° 54) : nouveau lot, [D6](D6-lots-developpement.md) §4 |
| E1 | Au plus 50 % des manches vont au bout des 60 s (n° 42) | Réintroduire des provocations (n° 42) |
| A1 | Aucune contestation fondée | Retour au réglage du prototype 0 : rejeu des journaux P0 avec les cas contestés en tête (L0.7) |
| A2 | Au plus 10 % de manches nulles, et aucune divergence | Nulles : revoir `W` ([D2](D2-regles-jeu-arbitrage.md) §5.6, [D4](D4-architecture-technique.md) §5.1). Divergence : corriger L2.2 |
| A3 | Triche par la main dans 2 matchs comptés sur 10 au plus | Mesurer Hand Landmarker (n° 70) : nouveau lot |
| T1 | 100 % des images de preuve reçues en 2 s au plus ; aucun plantage | Corriger L2.3 ([D4](D4-architecture-technique.md) RT10, RT11) |

Seuils de A2 (10 %) et A3 (2 matchs) : validés par Valentin (n° 196).

| Décision | Condition | Suite |
|---|---|---|
| **v1 réussie** | V1 respecté, et garde-fous E1, A1, A2, A3 et T1 respectés | Préparer l'ouverture au-delà des proches ([D7](D7-juridique-confidentialite.md) §7) ; décider du mode inconnus selon la question 14 |
| **Jeu à retravailler** | V1 ou E1 échoue | Provocations, puis nouvelle série de 10 matchs |
| **Arbitrage à retravailler** | A1, A2 ou A3 échoue, V1 tient | Corrections ciblées, puis 5 matchs de contrôle |
| **Technique à corriger** | T1 échoue | Correction, puis 3 matchs de contrôle |

Rappel : seule V1 est un critère de réussite de la v1 (n° 50). Les autres sont des garde-fous.

## 4. Questions ouvertes

Q2 à Q6 du lot 3 ont été tranchées par Valentin le 2026-09-25 (n° 78 à 82). Q1 à Q9 du lot 7 l'ont été le même jour : appareils (n° 192), réseau restrictif ou relais forcé (n° 193), C3 (n° 194), budget de 4,57 € par mois (n° 163), organisation des 10 matchs (n° 195), seuils A2 et A3 (n° 196), proche disponible (n° 197). Q10 (appareil Android) l'a été aussi : Valentin cherche un Android à emprunter ; sans Android avant le prototype 0, K1 à K7 se font sur iPhone et sur l'ordinateur, C4 est jugé sans Android, et Android Chrome reste « à tester » jusqu'au premier joueur Android de P2 (n° 218).

Aucune question ouverte.
