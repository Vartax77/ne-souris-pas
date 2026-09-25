# D1 — Note de cadrage

| Champ | Valeur |
|---|---|
| Objet | Dire en une page ce qu'on construit, pour qui, ce qu'on ne construit pas, et comment on saura que la v1 a réussi |
| Statut | Brouillon |
| Date | 2026-09-25 |
| Dépend de | [Source de cadrage](../sources/cadrage-lots-1-2-3.md) ; détail et raison de chaque décision : [D8](D8-journal-decisions.md) |

## 1. Ce qu'on construit

- Un duel « Ne souris pas » à distance, entre deux joueurs, chacun sur son appareil.
- Les deux visages s'affichent côte à côte. Le premier qui sourit perd la manche.
- L'application détecte le sourire et arbitre seule : c'est sa valeur face à un simple appel vidéo (H5).
- Vision à terme : rencontre avec des inconnus, proche de Chatroulette. Hors v1.
- Objectif : prototype fun et pièce de portfolio. Pas de monétisation avant les tests.

## 2. Pour qui

- Adultes : 18 ans minimum, dès la v1, déclaré par une case à cocher.
- En v1 : des amis, invités par lien.
- Un appareil par joueur, au choix : téléphone, tablette ou ordinateur avec caméra.

## 3. Périmètre de la v1

| Domaine | Contenu |
|---|---|
| Jeu | Duel 1 contre 1 symétrique ; parole autorisée ; aucune provocation de l'application |
| Déroulé | Calibrage, écran noir, 3-2-1, révélation simultanée ; manche de 60 s ; 2 manches gagnantes **À confirmer (P2)** |
| Arbitrage | Détection locale sur chaque appareil ; deux jauges visibles ; arrêt sur image comme preuve (règles : [D2](D2-regles-jeu-arbitrage.md)) |
| Technique | PWA ; WebRTC pair à pair ; serveur de mise en relation et relais TURN (détail : [D4](D4-architecture-technique.md)) |
| Vie privée | Aucun enregistrement ; aucun compte ; salon à code qui expire à la fin du match |
| Budget | 0 € pour le prototype, puis 10 € par mois maximum pour le relais |

## 4. Ce qu'on ne construit pas

| Exclu de la v1 | Condition de retour |
|---|---|
| Jeu avec des inconnus | Jeu validé entre amis, puis signalement, bannissement, modération, arbitrage vérifié côté serveur |
| Comptes, classements, historique | Avec le mode inconnus |
| Clip partageable du fou rire | v2, si les testeurs le demandent, avec double consentement |
| Détection sonore du rire | v2, si les testeurs rient sans sourire visible |
| Provocations de l'application | Si le critère d'ennui est franchi (section 6) |
| Monétisation | Après les tests |
| Mode soirée sur grand écran | Abandonné |

## 5. Hypothèses critiques

| # | Hypothèse | Solidité |
|---|---|---|
| H5 | L'application apporte plus qu'un appel vidéo | Critique |
| H2 | Voir l'autre lutter suffit à faire rire | Faible |
| H1 | La détection est assez fiable pour être acceptée | Moyenne |
| H3 | Une partie courte donne envie de rejouer | Moyenne |
| H4 | Les joueurs acceptent d'être filmés et analysés | Bonne entre proches, fragile avec des inconnus |
| H6 | Chaque joueur a un appareil récent avec caméra correcte | Bonne |

## 6. À quoi saura-t-on que la v1 a réussi

Protocoles détaillés : [D3](D3-plan-de-tests.md). Décisions : [D8](D8-journal-decisions.md), n° 36 à 42 et 50 à 54.

### 6.1 Critère de réussite

| Prototype | Critère | Si échec |
|---|---|---|
| P2 — duel complet, 10 matchs | Revanche spontanée dans au moins la moitié des matchs | Réintroduire des provocations |

### 6.2 Prérequis et garde-fous

Ils conditionnent le passage au prototype suivant, pas la réussite de la v1.

| Prototype | Critère | Si échec |
|---|---|---|
| P0 — détection seule | Aucun faux positif en conditions normales, sur 5 à 10 visages | Revoir le seuil |
| P0 — performance | Au moins 10 images analysées par seconde, sans chauffe excessive en 5 minutes, sur l'appareil le plus ancien | Réduire la fréquence d'analyse ou la résolution, puis retester |
| P1 — appel vidéo seul | 100 % des connexions aboutissent avec le relais | Changer de service de relais |
| P2 — ennui | Au plus la moitié des manches vont au bout des 60 s | Réintroduire des provocations |

### 6.3 Définitions provisoires

À préciser dans [D3](D3-plan-de-tests.md).

| Terme | Définition | Statut |
|---|---|---|
| Conditions normales | Intérieur éclairé, visage de face, à moins d'un mètre | **À confirmer (P0)** |
| Chauffe excessive | L'appareil ralentit visiblement, ou la détection passe sous 10 images par seconde avant 5 minutes | **À confirmer (P0)** |
| 100 % des connexions | Sur 10 essais par combinaison de réseaux | **À confirmer (P1)** |

## 7. Questions ouvertes

Aucune à ce jour.
