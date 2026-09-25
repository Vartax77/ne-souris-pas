# D3 — Plan de tests et critères de décision

| Champ | Valeur |
|---|---|
| Objet | Dire, pour chaque prototype, quel résultat valide ou invalide chaque risque, et quelle décision en découle |
| Statut | Brouillon — partie prototype 0 seulement (Priorité 1) ; prototypes 1 et 2 au lot 7 (Priorité 2) |
| Date | 2026-09-25 |
| Dépend de | [D1](D1-note-de-cadrage.md) §5 et §6 ; [D2](D2-regles-jeu-arbitrage.md) ; [source de cadrage](../sources/cadrage-lots-1-2-3.md) §3.7 ; [D8](D8-journal-decisions.md) n° 35 à 37, 51, 52, 64 à 96 |
| Utilisé par | [D2](D2-regles-jeu-arbitrage.md) (valeurs validées) ; [D6](D6-lots-developpement.md) (lot du prototype 0) |

## 1. Prototype 0 — détection seule, sans réseau

### 1.1 Objectif et risques testés

Objectif : prouver que l'arbitrage de [D2](D2-regles-jeu-arbitrage.md) est juste et assez rapide, **avant** d'écrire la moindre ligne de réseau (n° 35). Puis remplacer chaque valeur **À confirmer (P0)** de [D2](D2-regles-jeu-arbitrage.md) §3 par une valeur mesurée.

| Risque | Hypothèse | Critère de la source | Référence |
|---|---|---|---|
| Arbitrage injuste : faute sans sourire (faux positif) | H1 | Aucun faux positif en conditions normales | [D1](D1-note-de-cadrage.md) §6.2 ; n° 36 |
| Sourire franc non détecté (faux négatif) | H1 | Tous les sourires francs détectés en conditions normales (G5) | n° 79 |
| Performance insuffisante sur un appareil ancien | H6 | Au moins 10 images/s, sans chauffe excessive en 5 min | [D1](D1-note-de-cadrage.md) §6.2 ; n° 37 |
| Parole et voyelles tenues qui étirent la bouche | H1 | Comparer formule de base et variante `cheekSquint` | [D2](D2-regles-jeu-arbitrage.md) §5.5 ; n° 72 |
| Seuil gonflé en exagérant le sourire volontaire | H1 | Tester le plafond `d_max` | [D2](D2-regles-jeu-arbitrage.md) §5.2, Q1 |
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

| Rôle | Appareil | Utilisé pour |
|---|---|---|
| Le plus ancien disponible | À préciser (Q1) | Performance ; une partie des sessions |
| iPhone récent, Safari | À préciser (Q1) | Sessions ; performance sur Safari iOS |
| Ordinateur avec webcam | À préciser (Q1) | Sessions |

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

#### 1.3.3 Accueil (3 min)

1. Expliquer : on teste un détecteur de sourire ; aucune image ni aucun son n'est enregistré ; seuls des nombres sont gardés, puis supprimés à la fin du prototype 0.
2. Recueillir l'accord oral du testeur et le noter dans la fiche (n° 78). Sans accord, pas de session.
3. Consigne : se comporter naturellement, ne pas chercher à piéger le détecteur, sauf en séquence C.
4. Remplir la fiche testeur.

#### 1.3.4 Séquences en conditions normales (environ 15 min)

| Code | Séquence | Durée | Consigne au testeur | Ce qu'on cherche |
|---|---|---|---|---|
| A0 | Calibrage | 5 s par essai | Selon [D2](D2-regles-jeu-arbitrage.md) R1 : 3 s neutre, puis 2 s de sourire franc | Essais, causes de rejet, `n`, `v`, `d` |
| A1 | Neutre silencieux | 60 s | Regarder l'écran, visage détendu, sans parler | Bruit de fond ; réglage de `m` |
| A2 | Parole libre | 4 min 30 | Raconter sa journée, sans chercher à rire | Faux positifs dus à la parole |
| A3 | Voyelles tenues | 60 s | Lire une liste : « iii », « ouistiti », « cheese », « pipi », « merci », chacun tenu 1 s | Pire cas de la parole |
| A4 | Gestes parasites | 60 s | Bâiller deux fois, tousser, pincer les lèvres, mordre sa lèvre, déglutir, humecter ses lèvres | Faux positifs hors parole |
| A5 | Provocation | 2 × 60 s | Tenir sans sourire pendant que Valentin fait des grimaces et des blagues | Situation réelle : faux positifs et faux négatifs |
| A6 | Sourires commandés | 90 s | Sur signal, 5 s chacun, 5 s de neutre entre : 3 sourires légers, 3 sourires francs, 2 rires | Faux négatifs |
| A7 | Mouvements | 2 min | Tourner lentement la tête à gauche puis à droite ; la pencher en avant puis en arrière ; reculer jusqu'à 1,5 m ; sortir du champ 2 s, puis 6 s ; sourire derrière sa main ; laisser passer une deuxième personne derrière soi | Limites d'angle et de largeur ; R4 ; main devant la bouche |

Après chaque sourire confirmé par le prototype (séquences A1 à A5), faire une **revue** :

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
4. Noter si ses sourires sont détectés. S'ils ne le sont pas, le plafond ne protège pas assez ([D2](D2-regles-jeu-arbitrage.md) Q1).

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
| `lum` | Luminance moyenne du visage, sur 255 |
| `S`, `J` | Score lissé, jauge |
| `etat` | neutre, doute, souriant, invalide |
| `faute` | Vide, sourire ou perte |
| `op` | 1 si la touche « sourire vu » est pressée |

Les journaux restent sur l'ordinateur de Valentin. Ils sont supprimés à la clôture du prototype 0, une fois les valeurs de [D2](D2-regles-jeu-arbitrage.md) validées, avec la colonne « Carnation » des fiches (n° 73, n° 78).

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
| 1 | Formule du score (base ou `cheekSquint`) | A2, A3, A6 | Celle dont l'intervalle de `k` est le plus large. À égalité : la formule de base, plus simple |
| 2 | Coefficient `k` | A1 à A4, A6 | Milieu de l'intervalle (1.5.2) |
| 3 | Seuil maximal `d_max` | A0, C | Au-dessus de tous les `d` honnêtes ; sous les `d` exagérés. Si impossible : le signaler (Q1 de D2 reste ouverte) |
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
| **Go** | G1 à G6 respectés | Coder le prototype 1 | §3 : valeurs mesurées, colonne « Validé par » passée à « Validé (P0) » ; §2 : formule du score retenue, variante retirée ou adoptée ; §5.2 et Q1 : `d_max` fixé ; R2 point 7 supprimé (la variante ne sert plus qu'en P0) ; une ligne D8 par valeur changée |
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

## 2. Prototype 1 — appel vidéo seul

*Lot 7 — à rédiger.*

## 3. Prototype 2 — duel complet

*Lot 7 — à rédiger.*

Note pour le lot 7 : la fréquence de la triche par la main (n° 70) ne peut s'observer qu'en jeu réel. Le prototype 0 montre seulement si un sourire caché est détecté.

## 4. Questions ouvertes

Q2 à Q6 ont été tranchées par Valentin le 2026-09-25 (n° 78 à 82).

| N° | Question | Proposition |
|---|---|---|
| Q1 | Quels appareils sont disponibles : le plus ancien (modèle, année), un iPhone (modèle), un ordinateur avec webcam (modèle ou type) ? La réponse du 2026-09-25 contenait encore les champs à remplir, sans les modèles. | — |
