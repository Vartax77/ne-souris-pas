# D5 — Parcours utilisateur et maquettes d'écrans

| Champ | Valeur |
|---|---|
| Objet | Dire ce que voit et fait chaque joueur, du lien reçu à la revanche, et ce qu'il voit quand quelque chose échoue |
| Statut | Brouillon |
| Date | 2026-09-26 |
| Dépend de | [D2](D2-regles-jeu-arbitrage.md) (machine à états §6, règles affichées §6.8, messages de calibrage R1) ; [D4](D4-architecture-technique.md) (mise en page §10, risques §12) ; [source de cadrage](../sources/cadrage-lots-1-2-3.md) §3.5, §4.1 ; [D8](D8-journal-decisions.md) n° 9, 17, 28, 29, 97 à 110, 111 à 125, 126 à 133, 169 à 174, 206 à 209 |
| Utilisé par | [D6](D6-lots-developpement.md) (lots d'interface) ; [D7](D7-juridique-confidentialite.md) (texte d'explication, case d'âge) |

## 1. Conventions

- **Geste** : un appui ou un clic de l'utilisateur, y compris l'acceptation d'une demande du navigateur. Aucune saisie au clavier n'est nécessaire dans tout le parcours.
- Chaque écran porte un code (E1, E2…) et renvoie à l'état de [D2](D2-regles-jeu-arbitrage.md) §6.2 qu'il affiche.
- Les textes entre guillemets sont les **textes exacts** affichés. Les nombres qu'ils contiennent suivent les réglages de [D2](D2-regles-jeu-arbitrage.md) §3 et §6.7.
- Maquettes : téléphone en portrait (22 colonnes), ordinateur en paysage (47 colonnes). `[Texte]` = bouton ; `( )` = case à cocher ; `J` = jauge.
- Tutoiement ou vouvoiement : vouvoiement partout (n° 207).

## 2. Parcours

### 2.1 Parcours de l'hôte

```mermaid
flowchart TD
    H0([Ouvre l'application]) --> H1["E1 Accueil<br/>explication, règles, case 18 ans"]
    H1 -- "① coche la case<br/>② « Créer un duel »" --> H2["E2 Autorisation<br/>demande du navigateur"]
    H2 -- "③ Autoriser" --> H3["E3 Attente<br/>lien du salon"]
    H2 -. refus .-> X1["ER1 Caméra refusée"]
    H3 -- "④ « Partager le lien »<br/>⑤ ⑥ choix de l'application, envoi" --> H4["Attente de l'invité"]
    H4 -- "l'invité rejoint" --> H5["E4 Connexion"]
    H5 --> H6["E5 Calibrage"]
    H5 -. échec .-> X2["ER4 Connexion impossible"]
    H6 -- "⑦ « Commencer »" --> H7["E6 Écran noir, 3-2-1"]
    H7 --> H8["E7 Duel"]
    H8 --> H9["E8 Arrêt sur image"]
    H9 -- "manche suivante" --> H7
    H9 -- "2 manches gagnées" --> H10["E9 Fin de match"]
    H10 -- "⑧ « Revanche »" --> H6
    H10 -- "« Quitter »" --> H11([Fin de session])
```

### 2.2 Parcours de l'invité

```mermaid
flowchart TD
    I0([Reçoit le lien]) -- "① ouvre le lien" --> I1["E1 Accueil (invité)<br/>« X vous défie »"]
    I1 -- "② coche la case<br/>③ « Rejoindre le duel »" --> I2["E2 Autorisation"]
    I2 -- "④ Autoriser" --> I3["E4 Connexion"]
    I2 -. refus .-> X1["ER1 Caméra refusée"]
    I1 -. lien invalide .-> X3["ER6 Lien plus valable"]
    I3 --> I4["E5 Calibrage"]
    I3 -. échec .-> X2["ER4 Connexion impossible"]
    I4 -- "⑤ « Commencer »" --> I5["E6 Écran noir, 3-2-1"]
    I5 --> I6["E7 Duel"]
    I6 --> I7["E8 Arrêt sur image"]
    I7 -- "manche suivante" --> I5
    I7 -- "2 manches gagnées" --> I8["E9 Fin de match"]
    I8 -- "⑥ « Revanche »" --> I4
    I8 -- "« Quitter »" --> I9([Fin de session])
```

L'accueil de l'invité ne peut pas afficher le nom de l'hôte : aucun compte, aucune saisie. Texte retenu : « Vous êtes défié au jeu Ne souris pas ». Aucun champ prénom (n° 208).

### 2.3 Nombre de gestes

| Parcours | Du départ au premier duel | Pour une revanche |
|---|---|---|
| Hôte | 7 : case, « Créer un duel », Autoriser, « Partager le lien », choix de l'application, envoi, « Commencer » | 2 : « Revanche », « Commencer » |
| Invité (du lien reçu) | 5 : ouvrir le lien, case, « Rejoindre le duel », Autoriser, « Commencer » | 2 : « Revanche », « Commencer » |

- Sur certains navigateurs, caméra et micro font l'objet de deux demandes séparées : un geste de plus.
- « Commencer » au calibrage coûte un geste, mais garantit que le joueur est en place avant la mesure du neutre. Sans lui, le calibrage démarrerait pendant que le joueur pose encore son téléphone, et serait rejeté (n° 209).
- Rien n'est mémorisé d'une visite à l'autre (principe « rien n'est stocké », [D4](D4-architecture-technique.md) §1) : la case d'âge est à recocher à chaque salon.

## 3. Écrans

Correspondance avec [D2](D2-regles-jeu-arbitrage.md) §6.2 :

| Écran | État de D2 | Transitions de D2 |
|---|---|---|
| E1 Accueil | Accueil | T1, T2 |
| E2 Autorisation | Autorisation | T2 à T6 |
| E3 Attente | Attente | T4, T7 |
| E4 Connexion | Connexion | T5, T8, T9 |
| E5 Calibrage | Calibrage | T8, T10, T11, T29 |
| E6 Écran noir et compte à rebours | Écran noir, Compte à rebours | T12 à T15, T22 |
| E7 Duel | Manche, Décision | T15 à T18 |
| E8 Arrêt sur image | Arrêt sur image | T19 à T23 |
| E9 Fin de match | Fin de match | T23, T24, T27 à T31 |
| E10 Interruption | Interrompu | T25 à T27 |
| E11 Règles | Superposé à tout état, sans l'interrompre | Aucune ([D2](D2-regles-jeu-arbitrage.md) §6.3 et §6.8) |
| ER1 à ER16 | États d'erreur, navigateur incompatible et fin de session | Section 4 |

### 3.1 E1 — Accueil : explication et âge

- **Objectif** : dire ce qui va se passer avec la caméra **avant** la demande du navigateur (n° 29) ; recueillir la déclaration d'âge ; présenter les règles.
- **Éléments** : nom du jeu ; phrase d'accroche ; les 5 règles ([D2](D2-regles-jeu-arbitrage.md) §6.8) ; bloc « Votre caméra » ; case d'âge ; lien « Conditions d'utilisation » sous la case ; bouton principal ; liens « Confidentialité » et « Mentions légales » en bas de page (n° 173).
- **Actions** : cocher la case ; bouton principal (désactivé tant que la case n'est pas cochée) ; ouvrir les pages de [D7](D7-juridique-confidentialite.md) : conditions d'utilisation, confidentialité, mentions légales.

Textes exacts :

| Élément | Texte |
|---|---|
| Titre | « Ne souris pas » |
| Accroche (hôte) | « Défiez un ami : le premier qui sourit perd. » |
| Accroche (invité) | « Vous êtes défié au jeu Ne souris pas. » |
| Règles | Les 5 phrases de [D2](D2-regles-jeu-arbitrage.md) §6.8 |
| Bloc caméra, titre | « Votre caméra et votre micro » |
| Bloc caméra, texte | « Votre adversaire vous voit et vous entend pendant la partie. Votre sourire est détecté sur votre appareil. Rien n'est enregistré, ni image, ni son. » |
| Case | « J'ai 18 ans ou plus » |
| Lien sous la case | « Conditions d'utilisation » |
| Bouton (hôte) | « Créer un duel » |
| Bouton (invité) | « Rejoindre le duel » |
| Liens en bas de page | « Confidentialité » · « Mentions légales » |

Téléphone, portrait :

```
+----------------------+
|   NE SOURIS PAS      |
| Défiez un ami : le   |
| premier qui sourit   |
| perd.                |
|----------------------|
| 1. Le premier qui…   |
| 2. Parlez, grimacez… |
| 3. Gardez votre…     |
| 4. Votre jauge…      |
| 5. Si personne…      |
|----------------------|
| Votre caméra et      |
| votre micro          |
| Votre adversaire vous|
| voit et vous entend… |
|----------------------|
| ( ) J'ai 18 ans ou + |
| Conditions d'utilis. |
| [  Créer un duel   ] |
|   Confidentialité    |
|   Mentions légales   |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|              NE SOURIS PAS                  |
|  Défiez un ami : le premier qui sourit perd.|
+----------------------+----------------------+
| Règles               | Votre caméra et      |
| 1. Le premier qui…   | votre micro          |
| 2. Parlez, grimacez… | Votre adversaire vous|
| 3. Gardez votre…     | voit et vous entend… |
| 4. Votre jauge…      |                      |
| 5. Si personne…      | ( ) J'ai 18 ans ou + |
|                      | Conditions d'utilis. |
|                      | [  Créer un duel   ] |
+----------------------+----------------------+
|     Confidentialité · Mentions légales      |
+---------------------------------------------+
```

### 3.2 E2 — Autorisation

- **Objectif** : obtenir l'accès caméra et micro, en expliquant la demande du navigateur qui s'affiche par-dessus.
- **Éléments** : fond sombre ; flèche vers la zone où le navigateur affiche sa demande ; texte d'aide.
- **Actions** : aucune dans l'application ; « Autoriser » ou « Refuser » dans la demande du navigateur.

| Élément | Texte |
|---|---|
| Titre | « Autorisez la caméra et le micro » |
| Aide | « Votre navigateur vous le demande. Sans caméra, pas de duel. » |

Téléphone, portrait :

```
+----------------------+
|        ↑             |
|  Autorisez la caméra |
|  et le micro         |
|                      |
|  Votre navigateur    |
|  vous le demande.    |
|  Sans caméra, pas    |
|  de duel.            |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|  ↖                                          |
|        Autorisez la caméra et le micro      |
|  Votre navigateur vous le demande.          |
|  Sans caméra, pas de duel.                  |
+---------------------------------------------+
```

### 3.3 E3 — Attente (hôte)

- **Objectif** : partager le lien et patienter ; vérifier son cadrage en attendant.
- **Éléments** : sa propre vidéo ; le lien ; bouton de partage ; bouton de copie ; mention de l'expiration.
- **Actions** : « Partager le lien » (feuille de partage du système, si disponible) ; « Copier » ; « Annuler ».

| Élément | Texte |
|---|---|
| Titre | « Envoyez ce lien à votre adversaire » |
| Bouton | « Partager le lien » |
| Bouton | « Copier » ; après appui : « Lien copié » |
| Attente | « En attente de votre adversaire… » |
| Expiration | « Le lien expire dans 15 minutes s'il n'est pas utilisé. » |
| Bouton | « Annuler » |

Téléphone, portrait :

```
+----------------------+
| Envoyez ce lien à    |
| votre adversaire     |
| nesouris.pas/#k3F…   |
| [Partager le lien]   |
| [Copier]             |
|----------------------|
|                      |
|    Votre vidéo       |
|                      |
|----------------------|
| En attente de votre  |
| adversaire…          |
| Le lien expire dans  |
| 15 minutes…          |
| [Annuler]            |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
| Envoyez ce lien à votre adversaire          |
| nesouris.pas/#k3F…  [Copier] [Partager]     |
+----------------------+----------------------+
|                      |                      |
|    Votre vidéo       |  En attente de votre |
|                      |  adversaire…         |
+----------------------+----------------------+
| Le lien expire dans 15 minutes…  [Annuler]  |
+---------------------------------------------+
```

L'adresse affichée est un exemple : le nom de domaine et le nom du jeu sont reportés (n° 46, n° 206). Pendant les prototypes, le lien est l'adresse fournie par GitHub Pages.

### 3.4 E4 — Connexion

- **Objectif** : faire patienter pendant l'établissement du canal (20 s au plus).
- **Éléments** : sa propre vidéo ; indicateur d'attente.
- **Actions** : « Annuler ».

| Élément | Texte |
|---|---|
| Hôte | « Votre adversaire arrive… » |
| Invité | « Connexion à votre adversaire… » |
| Après 10 s | « C'est plus long que prévu… » |

Téléphone, portrait :

```
+----------------------+
|  Connexion à votre   |
|  adversaire…    ◌    |
|----------------------|
|    Votre vidéo       |
|----------------------|
| [Annuler]            |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|        Connexion à votre adversaire… ◌      |
+----------------------+----------------------+
|    Votre vidéo       |        ◌             |
+----------------------+----------------------+
|                 [Annuler]                   |
+---------------------------------------------+
```

### 3.5 E5 — Calibrage

- **Objectif** : mesurer le neutre et le sourire volontaire ([D2](D2-regles-jeu-arbitrage.md) R1).
- **Éléments** : sa propre vidéo avec un cadre ovale de placement ; consigne ; barre de progression de la phase ; statut de l'adversaire ; vidéo de l'adversaire en petit.
- **Actions** : « Commencer » ; « Recommencer » après un rejet ; « Abandonner ».

| Moment | Texte |
|---|---|
| Avant | « Placez votre visage dans l'ovale, bien éclairé, puis appuyez sur Commencer. » ; bouton « Commencer » |
| Phase neutre (3 s) | « Visage neutre, sans parler… » |
| Phase sourire (2 s) | « Maintenant, souriez franchement ! » |
| Réussite, adversaire pas prêt | « C'est bon. En attente de votre adversaire… » |
| Statut adverse | « Votre adversaire se calibre… » / « Votre adversaire est prêt » / « Votre adversaire recommence son calibrage » |
| Rejet : présence | « Gardez votre visage dans l'ovale. » |
| Rejet : deux visages | « Un seul visage dans le champ. » |
| Rejet : largeur | « Rapprochez-vous de la caméra. » |
| Rejet : angles | « Regardez l'écran bien en face. » |
| Rejet : pièce sombre (caméra sous 12 images/s ou luminance sous 60/255) | Écran ER3 (section 4) |
| Rejet : écart-type | « Restez silencieux et immobile. » |
| Rejet : neutre trop haut | « Détendez votre visage, sans sourire. » |
| Rejet : amplitude | « Souriez franchement. » |
| Après un rejet | Bouton « Recommencer » |
| Ordre des causes | Celui de [D2](D2-regles-jeu-arbitrage.md) R1 point 4, révisé après L0.3 : deux visages, présence, largeur, angles, pièce sombre, neutre trop haut, écart-type, amplitude (n° 245 à 247) |

Téléphone, portrait :

```
+----------------------+
| Adversaire : prêt ✓  |
| +------+             |
| | adv. |             |
| +------+             |
|  .----------.        |
| (  votre    )        |
| (  visage   )        |
|  '----------'        |
| Visage neutre, sans  |
| parler…              |
| [=======-----] 3 s   |
| [Abandonner]         |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
| Calibrage                Adversaire : prêt ✓|
+----------------------+----------------------+
|   .----------.       |                      |
|  (  votre     )      |   Vidéo adversaire   |
|  (  visage    )      |                      |
|   '----------'       |                      |
+----------------------+----------------------+
| Visage neutre, sans parler…  [=====---] 3 s |
|                [Abandonner]                 |
+---------------------------------------------+
```

### 3.6 E6 — Écran noir, compte à rebours, révélation

- **Objectif** : créer le moment d'apparition (n° 17) ; laisser le temps à la synchronisation.
- **Éléments** : fond noir ; numéro de manche ; score ; chiffres 3, 2, 1 en grand. Aucune vidéo, aucune jauge. Le son reste ouvert (n° 109).
- **Actions** : « Abandonner » (discret).

| Moment | Texte |
|---|---|
| Écran noir | « Manche 2 » ; « 1 – 0 » (son score d'abord) |
| Appareil trop lent (T14) | Écran ER7 superposé ; ER16 si la caméra ralentit faute de lumière (n° 238) |
| Compte à rebours | « 3 », « 2 », « 1 » |
| Révélation | Aucun texte : les deux visages apparaissent ensemble |

Téléphone, portrait :

```
+----------------------+
|                      |
|      Manche 2        |
|       1 – 0          |
|                      |
|         3            |
|                      |
|                      |
|      [Abandonner]    |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|                                             |
|                 Manche 2                    |
|                  1 – 0                      |
|                    3                        |
|                                             |
|                [Abandonner]                 |
+---------------------------------------------+
```

### 3.7 E7 — Duel

- **Objectif** : jouer. Voir les deux visages et les deux jauges ([D2](D2-regles-jeu-arbitrage.md) §6.6).
- **Éléments** : deux vidéos de même taille ; deux jauges avec repère de pic ; chronomètre ; numéro de manche ; score ; avertissements.
- **Actions** : « Abandonner » (avec confirmation, la manche continue, [D2](D2-regles-jeu-arbitrage.md) §6.5.1) ; « Règles ».

| Élément | Texte |
|---|---|
| Chronomètre | Secondes restantes : « 60 » à « 0 » |
| Avertissement, soi (T16) | « Visage perdu : encore une fois et vous perdez la manche » |
| Avertissement, adversaire | « Visage perdu » sur sa vidéo |
| Jauge adverse sans valeur depuis 1 s | Jauge grisée, sans texte |
| Confirmation d'abandon | « Abandonner le match ? » ; boutons « Oui, abandonner » et « Continuer à jouer » |

Téléphone, portrait :

```
+----------------------+
| Manche 2  1 – 0   42 |
+----------------------+
|                    |=|
|   Vidéo adversaire |=|
|                    |-|
+----------------------+
|                    |=|
|    Votre vidéo     |-|
|                    |-|
+----------------------+
| [Abandonner]  [?]    |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|  Manche 2          1 – 0                42  |
+----------------------+----------------------+
|                      |                      |
|    Votre vidéo       |   Vidéo adversaire   |
|                      |                      |
+----------------------+----------------------+
| J ======|--          | J ===|------         |
+----------------------+----------------------+
|            [Abandonner]   [Règles]          |
+---------------------------------------------+
```

`|` dans une jauge : repère du pic de la manche.

### 3.8 E8 — Arrêt sur image

- **Objectif** : montrer la preuve et le résultat de la manche pendant 5 s ([D2](D2-regles-jeu-arbitrage.md) R7).
- **Éléments** : selon la cause, l'image fixe du joueur qui a souri, ou un message ; résultat ; nouveau score.
- **Actions** : aucune (passage automatique) ; « Abandonner ».

| Cause | Ce qui s'affiche | Texte pour le perdant | Texte pour le gagnant |
|---|---|---|---|
| Sourire | Image fixe du perdant, en grand | « Vous avez souri ! Manche perdue. » | « Votre adversaire a souri ! Manche gagnée. » |
| Visage perdu | Pas d'image | « Visage perdu. Manche perdue. » | « Votre adversaire a perdu son visage. Manche gagnée. » |
| Départage à 60 s | Les deux pics, en pourcentage | « Personne n'a craqué. Votre jauge est montée plus haut : manche perdue. » | « Personne n'a craqué. Votre jauge est restée plus basse : manche gagnée. » |
| Égalité | Pas d'image | « Égalité, manche rejouée. » (les deux) | Idem |
| Image non reçue | Pas d'image | « Vous avez souri ! Manche perdue. » | « Votre adversaire a souri ! Image indisponible. Manche gagnée. » |
| Coupure en manche, reconnexion (manche interrompue) | Pas d'image | « Manche interrompue, rejouée. » (les deux) | Idem |

Téléphone, portrait :

```
+----------------------+
| Votre adversaire a   |
| souri !              |
| +------------------+ |
| |                  | |
| |  image fixe du   | |
| |  sourire         | |
| |                  | |
| +------------------+ |
| Manche gagnée        |
|      2 – 0           |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|        Votre adversaire a souri !           |
|        +---------------------------+        |
|        |   image fixe du sourire   |        |
|        +---------------------------+        |
|          Manche gagnée — 2 – 0              |
+---------------------------------------------+
```

L'image fixe n'est ni téléchargeable ni partageable : aucun bouton, aucun menu (n° 69). Une capture d'écran par le joueur reste possible et ne peut pas être empêchée par une page web. Voir [D7](D7-juridique-confidentialite.md).

### 3.9 E9 — Fin de match et revanche

- **Objectif** : annoncer le vainqueur ; proposer la revanche en un geste.
- **Éléments** : résultat ; score final ; deux vidéos en direct (on se voit rire ou râler) ; boutons ; délai de revanche.
- **Actions** : « Revanche » ; « Quitter ».

| Moment | Texte |
|---|---|
| Victoire | « Vous avez gagné 2 – 1 ! » |
| Défaite | « Vous avez perdu 1 – 2. » |
| Victoire par abandon | « Votre adversaire a abandonné. Victoire. » |
| Abandon | « Vous avez abandonné. » |
| Victoire par forfait | « Votre adversaire n'est pas revenu. Victoire par forfait. » ; pas de bouton « Revanche » |
| Match annulé par abandon (aucune manche terminée) | Joueur qui abandonne : « Vous avez abandonné. Match annulé. » ; adversaire : « Votre adversaire a abandonné. Match annulé. » ; boutons « Revanche » et « Quitter » (revanche possible, [D2](D2-regles-jeu-arbitrage.md) §6.5.1) |
| Match annulé par coupure | Pas d'écran E9 : fin de session, écran ER15 ([D2](D2-regles-jeu-arbitrage.md) §6.4.3) |
| Boutons | « Revanche » ; « Quitter » |
| Après son appui sur Revanche | « En attente de votre adversaire… » |
| L'adversaire a demandé | « Votre adversaire veut une revanche ! » ; « Revanche » mis en avant |
| Délai | « Revanche possible encore 45 s » (décompte à partir de 60 s) |

Téléphone, portrait :

```
+----------------------+
| Vous avez gagné      |
| 2 – 1 !              |
|----------------------|
|   Vidéo adversaire   |
|----------------------|
|    Votre vidéo       |
|----------------------|
| Votre adversaire veut|
| une revanche !       |
| [    Revanche     ]  |
| [Quitter]            |
| Revanche possible    |
| encore 45 s          |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|             Vous avez gagné 2 – 1 !         |
+----------------------+----------------------+
|    Votre vidéo       |   Vidéo adversaire   |
+----------------------+----------------------+
|   Votre adversaire veut une revanche !      |
|        [   Revanche   ]   [Quitter]         |
|        Revanche possible encore 45 s        |
+---------------------------------------------+
```

### 3.10 E10 — Interruption

- **Objectif** : faire patienter pendant 30 s au plus quand l'adversaire est injoignable ([D2](D2-regles-jeu-arbitrage.md) §6.4).
- **Éléments** : dernière image de l'adversaire, grisée ; compte à rebours ; jauges figées.
- **Actions** : « Quitter » (vaut abandon si le match est en cours).

| Côté | Texte |
|---|---|
| Joueur resté connecté | « Votre adversaire a perdu la connexion. Attente… 30 s » |
| Joueur dont la connexion tombe | « Connexion perdue. Reconnexion… » |
| Reprise | « Reprise » (1 s) |

Téléphone, portrait :

```
+----------------------+
| Votre adversaire a   |
| perdu la connexion.  |
|  Attente… 24 s       |
|----------------------|
|  (image grisée)      |
|----------------------|
|    Votre vidéo       |
|----------------------|
| [Quitter]            |
+----------------------+
```

Ordinateur, paysage :

```
+---------------------------------------------+
|  Votre adversaire a perdu la connexion.     |
|               Attente… 24 s                 |
+----------------------+----------------------+
|    Votre vidéo       |   (image grisée)     |
+----------------------+----------------------+
|                 [Quitter]                   |
+---------------------------------------------+
```

### 3.11 E11 — Règles

- **Objectif** : relire les règles sans quitter la partie.
- **Éléments** : panneau par-dessus l'écran ; les 5 règles de [D2](D2-regles-jeu-arbitrage.md) §6.8.
- **Actions** : « Fermer ». La manche continue derrière le panneau : l'ouvrir ne met rien en pause ([D2](D2-regles-jeu-arbitrage.md) §6.8, n° 172).
- Sur téléphone, le panneau couvre au plus la moitié basse, pour que le joueur reste face à la caméra. **Hypothèse à valider**

## 4. Écrans d'erreur

Toute erreur affiche : ce qui s'est passé, ce que le joueur peut faire, un seul bouton principal.

| Code | Situation | État de D2 | Message exact | Action pour s'en sortir |
|---|---|---|---|---|
| ER1 | Caméra ou micro refusés | Erreur caméra (T3) | « Sans caméra ni micro, le duel est impossible. Autorisez-les dans les réglages de votre navigateur, puis réessayez. » | Bouton « Réessayer » ; lien « Comment faire ? » avec la marche à suivre pour Safari, Chrome et Firefox |
| ER2 | Aucune caméra détectée | Erreur caméra (T3) | « Aucune caméra trouvée sur cet appareil. Essayez avec un téléphone ou un ordinateur équipé d'une webcam. » | Bouton « Réessayer » |
| ER3 | Pièce sombre au calibrage : caméra sous 12 images/s ou luminance sous 60/255 (n° 247) | Calibrage (T11) | « Pas assez de lumière. Allumez une lampe face à vous ou tournez-vous vers une fenêtre. » | Bouton « Recommencer » |
| ER4 | Connexion impossible | Erreur connexion (T9) | « Impossible de joindre votre adversaire. Vérifiez votre connexion internet, puis réessayez. » | Bouton « Réessayer » ; après deux échecs, conseil : « Essayez de passer du Wi-Fi à la 4G, ou l'inverse. » |
| ER5 | Adversaire parti | Fin de session (T30) | « Votre adversaire est parti. » | Bouton « Créer un nouveau duel » |
| ER6 | Lien plus valable (salon introuvable, expiré ou complet) | Erreur salon (T6) | « Ce lien n'est plus valable. Demandez un nouveau lien à votre adversaire. » | Bouton « Créer mon propre duel » |
| ER7 | Appareil trop lent (caméra à 12 images/s ou plus, et luminance d'au moins 60/255) | Écran noir (T14) | « Appareil trop lent : fermez les autres applications. Nouvel essai dans 5 s… » | Attente automatique ; bouton « Abandonner » |
| ER8 | Navigateur incompatible | Navigateur incompatible (T32) | « Ce navigateur ne permet pas de jouer. Utilisez Chrome ou Safari. » (n° 174 ; Firefox ajouté seulement s'il passe P0 et P1) | Bouton « Copier le lien » pour l'ouvrir ailleurs |
| ER9 | Versions différentes des deux applications | Erreur version (T33, [D4](D4-architecture-technique.md) §4.2) | « Votre adversaire utilise une autre version du jeu. Rechargez tous les deux la page. » | Bouton « Recharger » |
| ER10 | Connexion perdue, aucun vainqueur | Fin de session (T27) | « Connexion perdue. Match interrompu. » | Bouton « Créer un nouveau duel » |
| ER11 | Salon expiré sans invité | Salon expiré (T7) | « Personne n'a rejoint. Le lien a expiré. » | Bouton « Créer un nouveau duel » |
| ER12 | Caméra déjà utilisée par une autre application | Erreur caméra (T3) | « Votre caméra est utilisée par une autre application. Fermez-la, puis réessayez. » | Bouton « Réessayer » |
| ER13 | Forfait du joueur revenu trop tard | Fin de session (T27) | « Match perdu par forfait. » | Bouton « Créer un nouveau duel » |
| ER14 | Fin de session après 60 s sans revanche | Fin de session (T31) | « Le salon a expiré. » | Bouton « Créer un nouveau duel » |
| ER15 | Match annulé par coupure, avant la fin de la première manche (les deux joueurs) | Fin de session (T27, [D2](D2-regles-jeu-arbitrage.md) §6.4.3) | « Le match n'a pas pu commencer : la connexion a été perdue. » | Bouton « Créer un nouveau duel » |
| ER16 | Trop sombre : la caméra fournit moins de 12 images/s ou la luminance du visage est sous 60/255 (n° 247) | Écran noir (T14, [D2](D2-regles-jeu-arbitrage.md) §5.8) | « Trop sombre : votre caméra ralentit. Allumez une lampe face à vous. Nouvel essai dans 5 s… » | Attente automatique ; bouton « Abandonner » |

Un seul libellé pour recommencer : « Créer un nouveau duel » (n° 170). Le mot « salon » n'apparaît que dans « Le salon a expiré. » (ER14).

Maquette commune (téléphone, portrait) :

```
+----------------------+
|         (!)          |
| Impossible de joindre|
| votre adversaire.    |
| Vérifiez votre       |
| connexion internet,  |
| puis réessayez.      |
|                      |
| [    Réessayer     ] |
+----------------------+
```

Maquette commune (ordinateur, paysage) :

```
+---------------------------------------------+
|                    (!)                      |
|      Impossible de joindre votre adversaire.|
|   Vérifiez votre connexion internet, puis   |
|                 réessayez.                  |
|              [  Réessayer  ]                |
+---------------------------------------------+
```

## 5. Vérification de cohérence

Vérification faite en lisant [D2](D2-regles-jeu-arbitrage.md) §6 et [D4](D4-architecture-technique.md), puis reprise après les arbitrages du 2026-09-25 (n° 169 à 174).

| Contrôle | Résultat |
|---|---|
| Chaque état de D2 a un écran | Oui. Décision est affichée par E7 (rien ne change à l'écran, moins d'une seconde) |
| Chaque écran correspond à un état de D2 | Oui. E11 est un panneau superposé, sans état, décrit en [D2](D2-regles-jeu-arbitrage.md) §6.8. ER8 : état Navigateur incompatible (T32). ER9 : état Erreur version (T33). ER12 : T3 (caméra occupée). ER15 : T27 |
| Messages de rejet du calibrage identiques à D2 R1 | Oui pour « Restez silencieux et immobile », « Souriez franchement », « Un seul visage dans le champ ». Les autres causes n'avaient pas de texte dans D2 : textes créés ici |
| Mise en page conforme à D4 §10 | Oui : portrait empilé, paysage côte à côte, jauges verticales en portrait |
| Contraintes D4 | Geste avant la lecture du son (RT8) : « Créer un duel », « Rejoindre le duel » et « Commencer » en tiennent lieu. Version du protocole : ER9. Wake Lock : aucun écran dédié (RT13) |
| Texte d'avertissement T16 | Identique à D2 |

## 6. Questions ouvertes

Q1 à Q7 ont été tranchées par Valentin le 2026-09-25 :

| N° | Réponse | Décision |
|---|---|---|
| Q1 | Vouvoiement | n° 207 |
| Q2 | Aucun champ prénom pour l'hôte | n° 208 |
| Q3 | Bouton « Commencer » avant le calibrage | n° 209 |
| Q4 | Ajouts faits dans [D2](D2-regles-jeu-arbitrage.md) : état Navigateur incompatible, erreur de version, caméra occupée, panneau des règles | n° 172 |
| Q5 | Vidéos empilées en portrait ([D4](D4-architecture-technique.md) Q5) | n° 201 |
| Q6 | Graphe à relancer par Valentin (`/graphify . --update`) | — |
| Q7 | Nom de domaine et nom du jeu reportés ; adresse GitHub Pages pendant les prototypes | n° 206 |

Question ouverte :

| N° | Question | Proposition |
|---|---|---|
| Q8 | Quand la page détecte un navigateur intégré de messagerie (Messenger, WhatsApp, Instagram…), faut-il proposer « Ouvrir dans Safari » (ou dans le navigateur habituel) ? La page fonctionne dans celui de Messenger (n° 228), mais WhatsApp, Instagram et l'appel vidéo n'y sont pas encore testés ([D3](D3-plan-de-tests.md) §2.3.7). ER8 ne s'applique pas à un navigateur intégré qui fonctionne | Attendre les tests P1 M1 à M3. Si les trois fonctionnent : laisser jouer, sans écran supplémentaire (un geste de moins). Si l'un échoue : ER8 pour celui-là seulement, avec le bouton « Copier le lien » et une explication propre à l'application |
