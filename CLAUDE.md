# Projet « Ne souris pas » — conception documentaire

## 1. Contexte

Jeu de duel à distance entre deux joueurs, chacun sur son propre appareil (téléphone, tablette ou ordinateur avec webcam). Les deux visages s'affichent côte à côte ; le premier qui sourit perd la manche. L'application détecte le sourire et arbitre automatiquement.

Source de vérité : `sources/cadrage-lots-1-2-3.md`. Elle contient toutes les décisions validées pendant le cadrage. Tout document produit doit s'y conformer.

## 2. Mission actuelle

Produire les documents de conception D1 à D8 dans `docs/`, un lot à la fois, sur demande.
**Aucune ligne de code applicatif** tant que je ne le demande pas explicitement.

| N° | Fichier | Contenu |
|---|---|---|
| D1 | `docs/D1-note-de-cadrage.md` | Note de cadrage |
| D2 | `docs/D2-regles-jeu-arbitrage.md` | Règles du jeu et d'arbitrage |
| D3 | `docs/D3-plan-de-tests.md` | Plan de tests et critères de décision |
| D4 | `docs/D4-architecture-technique.md` | Architecture technique |
| D5 | `docs/D5-parcours-maquettes.md` | Parcours utilisateur et maquettes d'écrans |
| D6 | `docs/D6-lots-developpement.md` | Découpage en lots de développement |
| D7 | `docs/D7-juridique-confidentialite.md` | Documents juridiques et confidentialité |
| D8 | `docs/D8-journal-decisions.md` | Journal des décisions |

## 3. Règles de travail

1. Tout en français. Montants uniquement en euros.
2. Pour chaque document : rédige une première version, critique-la toi-même (manques, biais, approximations, contradictions avec la source), puis réécris-la. Seule la version révisée est écrite dans le fichier.
3. Remets en question plutôt que conforter : si une décision de la source te paraît fragile, signale-le explicitement dans ta réponse et propose une alternative, mais ne modifie pas la décision sans mon accord.
4. Ne suppose jamais une information qui m'incombe : ajoute-la à la section « Questions ouvertes » du document et pose-la-moi en fin de réponse.
5. Toute valeur non encore validée par un test est marquée **À confirmer (P0)**, **À confirmer (P1)** ou **À confirmer (P2)** selon le prototype qui la validera.
6. Ne rédige que le document (ou la partie) demandé par le lot en cours. N'anticipe pas les autres.
7. Format : titres numérotés, phrases courtes, tableaux quand ils clarifient.
8. Chaque document commence par un en-tête : objet, statut (Brouillon / Validé), date, documents dont il dépend.
9. Relie les documents entre eux par des liens Markdown relatifs, par exemple `[D2](D2-regles-jeu-arbitrage.md)` : le graphe graphify s'en sert pour tracer les dépendances.
10. Toute décision nouvelle ou modifiée donne lieu à une ligne dans `docs/D8-journal-decisions.md` (date, décision, raison, alternatives écartées, source).

## 4. Utilisation du graphe (graphify)

- Avant de rédiger, interroge le graphe pour retrouver les décisions et les dépendances utiles (`graphify query "..."`, `graphify explain "..."`, `graphify path "A" "B"`) plutôt que de relire tous les fichiers.
- Vue d'ensemble : `graphify-out/GRAPH_REPORT.md`.
- Si le graphe semble ne pas contenir un document récent, dis-le-moi : je relancerai `/graphify . --update`.

## 5. Fin de chaque lot

1. Mets à jour `docs/README.md` : liste des documents, statut, date de dernière modification.
2. Fais un commit git avec un message de la forme `docs: lot N — <résumé>`.
3. Termine ta réponse par : fichiers créés ou modifiés, principales corrections issues de ton autocritique, décisions ajoutées au D8, questions ouvertes.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
