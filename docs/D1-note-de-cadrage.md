# D1 — Note de cadrage

| Champ | Valeur |
|---|---|
| Objet | Dire en une page ce qu'on construit, pour qui, ce qu'on ne construit pas, et comment on saura que la v1 a réussi |
| Statut | Brouillon |
| Date | 2026-09-25 |
| Dépend de | [Source de cadrage](../sources/cadrage-lots-1-2-3.md) ; détail et raison de chaque décision : [D8](D8-journal-decisions.md) ; tests : [D3](D3-plan-de-tests.md) ; lots : [D6](D6-lots-developpement.md) |

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
| Vie privée | Aucun enregistrement ; aucun compte ; salon à code qui expire à la fin de la session, revanches comprises (n° 159) |
| Budget | Prototypes : 0 €, ou ≈ 4,57 € par mois si le serveur public de mise en relation échoue en P1 (n° 163). Ensuite : 10 € par mois maximum, tout compris : relais, mise en relation, hébergement, nom de domaine (n° 162) |

## 4. Ce qu'on ne construit pas

| Exclu de la v1 | Condition de retour |
|---|---|
| Jeu avec des inconnus | Jeu validé entre amis, puis signalement, bannissement, modération, arbitrage vérifié côté serveur |
| Comptes, classements, historique | Avec le mode inconnus |
| Clip partageable du fou rire | v2, si les testeurs le demandent, avec double consentement |
| Détection sonore du rire | v2, si les testeurs rient sans sourire visible |
| Provocations de l'application | Si le critère d'ennui ou de revanche est franchi (section 6) |
| Monétisation | Après les tests |
| Mode soirée sur grand écran | Abandonné |
| Travail sur la différenciation face aux filtres des réseaux sociaux, et sur l'acquisition de joueurs | Après les tests. Mesurés en P2 à titre d'information seulement (5.2) |

## 5. Hypothèses et risques

### 5.1 Hypothèses critiques

| # | Hypothèse | Solidité | Test ([D3](D3-plan-de-tests.md)) |
|---|---|---|---|
| H5 | L'application apporte plus qu'un appel vidéo | Critique | P2 : V1, indirectement ; question 16, information seulement |
| H2 | Voir l'autre lutter suffit à faire rire | Faible | P2 : E1 |
| H1 | La détection est assez fiable pour être acceptée | Moyenne | P0 : G1 à G6 ; P2 : A1 à A3 |
| H3 | Une partie courte donne envie de rejouer | Moyenne | P2 : V1 |
| H4 | Les joueurs acceptent d'être filmés et analysés | Bonne entre proches, fragile avec des inconnus | P2 : question 12, **information seulement**, sans seuil ni décision (n° 165) |
| H6 | Chaque joueur a un appareil récent avec caméra correcte | Bonne | P0 : G3 ; P1 : C5 |

### 5.2 Risques

Risques de la [source](../sources/cadrage-lots-1-2-3.md) §2.3 (n° 164).

| Risque | Hypothèse | Test ([D3](D3-plan-de-tests.md)) | Lot ([D6](D6-lots-developpement.md)) |
|---|---|---|---|
| Ennui : sans provocation, il ne se passe rien | H2 | P2 : E1 | L2.1b, L2.5 ; lot « Provocations » si échec |
| Arbitrage injuste (faux positifs) | H1 | P0 : G1, G2 ; P2 : A1 | L0.4, L0.7 |
| Différenciation face aux filtres des réseaux sociaux | H5 | **Hors v1.** P2 : questions 13 et 14, information seulement (n° 166) | Aucun |
| Faux positifs dus à la parole, à la barbe, à une bouche relevée | H1 | P0 : A2, A3, profils du panel, G1 | L0.4 |
| Éclairage et angles | H1 | P0 : B1 à B3, A7, G2 | L0.3 |
| Triche : main devant la bouche, tête tournée | H1 | P0 : A7 ; P2 : A3 | L0.5 ; lot « Main devant la bouche » si échec |
| Latence vidéo | — | P1 : retard vidéo, information seulement ; C3 | L1.4 |
| Échec de connexion sur certains réseaux | — | P1 : C1, C2 | L1.2 |
| Chauffe et batterie sur iOS | H6 | P0 : G3 ; P1 : C5 | L0.2, L1.5 |
| Mise en veille, blocage du son sur iOS | — | P1 : C4 (K3 à K5), C6 | L1.2, L1.3, L2.4 |
| Vie privée des flux vidéo | H4 | [D7](D7-juridique-confidentialite.md) ; P2 : question 12, information seulement | L2.6 |
| Acquisition : il faut convaincre deux personnes | — | **Hors v1.** P2 : questions 13 et 14, information seulement (n° 166) | Aucun |
| Monétisation faible | — | **Hors v1** (n° 2) | Aucun |

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
