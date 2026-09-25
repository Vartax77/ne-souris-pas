# D7 — Documents juridiques et confidentialité

| Champ | Valeur |
|---|---|
| Objet | Fournir, prêts à relire, les mentions légales, la politique de confidentialité, les conditions d'utilisation et le registre de traitement, et lister ce qu'un professionnel doit vérifier |
| Statut | Brouillon — à faire relire (section 8) |
| Date | 2026-09-25 |
| Dépend de | [D4](D4-architecture-technique.md) (données §3, services §8, journaux §9.3) ; [D2](D2-regles-jeu-arbitrage.md) R7 (image de preuve) ; [D3](D3-plan-de-tests.md) (journaux de test) ; [D5](D5-parcours-maquettes.md) E1 (texte d'accueil) ; [source de cadrage](../sources/cadrage-lots-1-2-3.md) §3.5, §4.1 ; [D8](D8-journal-decisions.md) n° 5, 26 à 31, 47, 69, 73, 78, 111 à 125, 132, 138, 148 à 158, 159, 173, 179, 180, 182, 204, 213 à 216 |
| Utilisé par | [D6](D6-lots-developpement.md) L2.6 (pages en ligne) |

**Avertissement.** Ce document n'est pas un avis juridique. Il rassemble les textes et positions officielles trouvés le 2026-09-25 et en tire des propositions. Les points incertains sont marqués et repris en section 8. Les informations personnelles restent en **[À COMPLÉTER]**.

## 1. Données traitées

Reprise de [D4](D4-architecture-technique.md) §3 et §9.3.

| Donnée | Où elle est traitée | Qui la voit | Conservée | Traitement de l'éditeur ? |
|---|---|---|---|---|
| Image et son de la caméra | Appareil du joueur ; transmis à l'adversaire, directement ou par le relais, chiffrés de bout en bout | Le joueur et son adversaire. Le relais ne peut pas les lire | Non | Non, vraisemblablement (2.1) |
| Mesures du visage (repères, scores de sourire, neutre, seuil) | Appareil du joueur seulement | Personne d'autre | Non (mémoire vive, fin du match) | Non (2.1) |
| Jauge et son pic ; événements de jeu (état du calibrage, pertes, fautes, horodatages, décisions) ; informations techniques (cadence d'analyse, type d'appareil) ([D4](D4-architecture-technique.md) §4.2) | Appareils des deux joueurs | Les deux joueurs | Non (fin du match) | Non (2.1) |
| Image de preuve (image fixe au moment du sourire) | Appareil du joueur qui a souri, puis celui de l'adversaire | Les deux joueurs | Non (mémoire vive, fin du match, n° 69) | Non (2.1) |
| Adresse IP | Hébergement de la PWA ; serveur de mise en relation ; relais | Les prestataires ; l'éditeur (serveur auto-hébergé) | Journaux des prestataires ; 7 jours sur le serveur auto-hébergé (n° 125) | **Oui** |
| Code du salon, descriptions de connexion (dont adresses IP locales) | Serveur de mise en relation | Le prestataire ou l'éditeur | Fin de la session de jeu, revanches comprises (n° 159) ; journaux 7 jours | **Oui** |
| Volume relayé | Relais | Le prestataire ou l'éditeur | Journaux | **Oui** |
| Journaux de test P0 et P2 (nombres, codes, sans nom ni image) | Ordinateur de l'éditeur, dans un dossier chiffré séparé (n° 216) | L'éditeur | Jusqu'à la clôture du prototype (n° 73, n° 78) | **Oui** (tests seulement) |

Aucun compte, aucun cookie, aucune mesure d'audience, aucune publicité ([D4](D4-architecture-technique.md) §1). Aucune donnée personnelle n'est stockée dans le navigateur. Seul le cache des fichiers de l'application (pages, modèle, WebAssembly, gardés par le service worker, [D4](D4-architecture-technique.md) §3) y est écrit : il est strictement nécessaire au fonctionnement et ne contient aucune donnée personnelle (n° 180).

Ordinateur de l'éditeur : disque chiffré par BitLocker, protection activée (n° 223). Les journaux de test sont en plus conservés dans un dossier chiffré séparé, hors du dépôt de code public (n° 216, n° 222).

La bibliothèque MediaPipe tente d'envoyer à Google des statistiques d'usage. La page bloque cet envoi : aucune donnée, pas même l'adresse IP, ne part vers Google par ce biais (n° 225).

Services utilisés ([D4](D4-architecture-technique.md) §8.4) :

| Phase | Hébergement de la PWA | Mise en relation | Relais |
|---|---|---|---|
| Prototypes | GitHub Pages (GitHub, États-Unis ; n° 204) | Serveur public PeerJS (localisation non publiée) | Metered Open Relay |
| Ouverture | Serveur de l'éditeur, OVHcloud, France **[À COMPLÉTER : site exact]** | Même serveur (PeerJS Server) | Même serveur (coturn) |

## 2. Analyse

Les sources sont numérotées en section 10.

### 2.1 Qui est responsable de quoi

- **Adresse IP : donnée personnelle** (CJUE, Breyer, C-582/14 [J1] ; CNIL [J2]). Le serveur de mise en relation, le relais et l'hébergement la traitent. Pour ces traitements, l'éditeur est **responsable de traitement**.
- **Analyse du visage sur l'appareil et flux pair à pair.** La CNIL (recommandation « applications mobiles », 2024, §3.3 [J3]) écarte le RGPD pour le fournisseur du logiciel quand deux conditions sont réunies : le traitement est initié par la personne, sous son contrôle et pour son seul compte ; il se fait dans un environnement cloisonné, sans intervention possible d'un tiers. Elle cite le partage « pair à pair » sans stockage ni transit par un serveur central. La détection locale du sourire remplit vraisemblablement ces conditions.
- **Incertain** : quand le flux passe par le relais, il transite par un serveur, même chiffré et illisible. La condition « sans transit » n'est pas remplie à la lettre (section 8, V2).
- Proposition prudente : traiter la politique de confidentialité comme si l'éditeur était responsable de tout, et y décrire aussi la partie locale.

### 2.2 Pas de biométrie, pas de reconnaissance d'émotion

- Une vidéo n'est une donnée biométrique que si elle est traitée pour identifier une personne de manière unique (CEPD, lignes directrices 3/2019, §74 à 80 [J4] ; RGPD, considérant 51). Le jeu détecte une expression, il n'identifie personne : pas de donnée sensible au sens de l'article 9.
- Le règlement européen sur l'intelligence artificielle exclut des systèmes de reconnaissance des émotions « la simple détection d'expressions faciles à observer », et cite le sourire en exemple (considérant 18 [J5]). À condition de ne pas s'en servir pour déduire une émotion.
- Conséquence : dans l'application et les textes, parler de « détection du sourire », jamais de « détection de la joie » ni « des émotions ».

### 2.3 Base légale, conservation, information

- **Base légale** des traitements d'adresses IP : exécution du service demandé (article 6.1.b du RGPD), car la mise en relation est impossible sans elles. Le consentement ne conviendrait pas : le service ne fonctionne pas sans. Les journaux de sécurité relèvent de l'intérêt légitime (article 6.1.f) [J6].
- **Conservation** : la CNIL recommande en général 6 mois à 1 an pour les journaux de sécurité [J7], sans durée propre à la mise en relation WebRTC. Retenu : 7 jours (n° 125, validé par Valentin, n° 200), par minimisation. À faire vérifier par un professionnel (V9).
- **Information** : l'article 13 impose l'identité du responsable, les finalités, les bases légales, les destinataires, les transferts, la durée, les droits, la réclamation à la CNIL et le caractère obligatoire des données [J8]. La politique de la section 4 les reprend.

### 2.4 Caméra, micro et stockage dans le navigateur

- L'accès à la caméra et au micro relève de l'article 82 de la loi Informatique et Libertés, mais il est exempté de consentement quand il est nécessaire au service expressément demandé [J3, J9]. Un duel vidéo l'exige : la demande du navigateur, précédée de l'écran d'explication ([D5](D5-parcours-maquettes.md) E1), suffit.
- Aucun cookie ni stockage de donnée personnelle dans le navigateur n'est prévu. Seul le cache des fichiers de l'application est écrit par le service worker ([D4](D4-architecture-technique.md) §3) : il est strictement nécessaire au service demandé et ne contient aucune donnée personnelle (n° 180). Il n'y a donc **aucun bandeau de consentement** à afficher. Si un autre stockage apparaît plus tard, il devra rester strictement nécessaire (préférence d'affichage, par exemple) [J9].

### 2.5 Registre et analyse d'impact

- **Registre** : les structures de moins de 250 salariés en sont dispensées, sauf pour un traitement non occasionnel, à risque ou portant sur des données sensibles [J10]. La mise en relation est continue, donc non occasionnelle. Proposition : tenir le registre simplifié de la section 6, sur le modèle de la CNIL [J11]. Son application à un particulier sans activité économique est incertaine (V3).
- **Analyse d'impact (AIPD)** : la détection locale ne figure pas sur la liste de la CNIL [J12] et n'identifie personne. Pas d'AIPD en v1 entre amis. Elle sera très probablement nécessaire pour le mode inconnus (section 8.2).

### 2.6 Mentions légales

- Depuis la loi SREN du 21 mai 2024, les obligations de l'ancien article 6 III de la LCEN sont à l'article 1-1 de la loi 2004-575 [J13]. Un éditeur non professionnel peut rester anonyme vis-à-vis du public s'il a donné son identité à son hébergeur ; il publie alors le nom, l'adresse et le téléphone de l'hébergeur [J13, J14]. Sanction : 1 an d'emprisonnement et 75 000 € d'amende (article 1-2).
- **Tension** : le RGPD impose de donner l'identité et les coordonnées du responsable de traitement [J8]. Option retenue, la plus prudente : **publier l'identité de l'éditeur** dans les mentions légales et la politique (validé par Valentin, n° 215). À faire vérifier par un professionnel (V1).
- Un hébergeur gratuit (GitHub Pages et équivalents) ne recueille pas forcément l'identité de l'éditeur au sens de la LCEN : raison de plus pour publier son identité.

### 2.7 Âge minimum

- Aucune obligation de vérification d'âge renforcée n'a été trouvée pour ce type de service entre adultes. Le référentiel de l'Arcom ne vise que les contenus pornographiques [J15]. La majorité numérique à 15 ans (loi 2023-566) vise les réseaux sociaux et n'est pas appliquée faute de décret [J16]. Selon la recherche, l'article 1er de la loi de 2026 sur les réseaux sociaux avant 15 ans a été censuré (décision n° 2026-911 DC [J17]).
- La case « J'ai 18 ans ou plus » (n° 29) reste une mesure faible, mais proportionnée entre amis. À revoir pour le mode inconnus.

### 2.8 Règlement sur les services numériques (DSA)

- Un service qui ne stocke rien et met en relation deux personnes choisies relève de la communication interpersonnelle : ni hébergement ni plateforme en ligne (considérants 14 et 29 [J18]). Au plus, le relais est un service de « simple transport ».
- Un service gratuit édité par un particulier pourrait même sortir du champ du DSA (V4).
- Proposition prudente : publier quand même une adresse de contact unique, qui servirait de point de contact au sens des articles 11 et 12 si le DSA s'appliquait.

### 2.9 Transferts hors de l'Union européenne

- Pendant les prototypes, des prestataires hors UE ou non localisés peuvent voir les adresses IP : serveur public PeerJS (localisation non publiée), Metered (société canadienne, réseau mondial), hébergement statique américain. **À vérifier** (V7).
- Vers les États-Unis, le transfert repose sur la décision d'adéquation du 10 juillet 2023 (Data Privacy Framework), pour un destinataire certifié [J19]. Le Tribunal de l'UE a rejeté le recours Latombe le 3 septembre 2025 ; un pourvoi (C-703/25 P) est pendant [J20]. Une annulation ferait tomber ces transferts.
- Après les prototypes, tout est hébergé en France (n° 120) : **aucun transfert**.

### 2.10 Enregistrement par l'adversaire

- L'application n'enregistre rien. Mais un joueur peut filmer son écran ou faire une capture ; une page web ne peut pas l'empêcher ([D5](D5-parcours-maquettes.md) §3.8).
- Les conditions d'utilisation l'interdisent sans l'accord de l'autre joueur. La politique de confidentialité le dit clairement.

## 3. Mentions légales

Texte prêt à relire.

> **Mentions légales**
>
> **Éditeur**
> Le jeu « Ne souris pas » est édité à titre non professionnel par :
> [À COMPLÉTER : prénom et nom]
> [À COMPLÉTER : adresse postale]
> Contact : [À COMPLÉTER : adresse électronique]
>
> **Directeur de la publication**
> [À COMPLÉTER : prénom et nom]
>
> **Hébergement**
> [À COMPLÉTER : nom ou raison sociale de l'hébergeur]
> [À COMPLÉTER : adresse de l'hébergeur]
> [À COMPLÉTER : téléphone de l'hébergeur]
>
> **Services techniques**
> Mise en relation des joueurs : [À COMPLÉTER : service et pays].
> Relais des connexions : [À COMPLÉTER : service et pays].
>
> **Signaler un contenu illicite**
> Écrivez à [À COMPLÉTER : adresse électronique]. Pour un contenu manifestement illicite, vous pouvez aussi utiliser la plateforme officielle Pharos : https://www.internet-signalement.gouv.fr.
>
> **Données personnelles**
> Voir la page « Confidentialité ».

## 4. Politique de confidentialité

Texte prêt à relire. Il sert aussi de « courte page de confidentialité » prévue par la source (n° 30) : le premier paragraphe en est le résumé.

> **Confidentialité**
>
> **En bref.** Votre adversaire vous voit et vous entend pendant la partie. Votre sourire est détecté sur votre propre appareil. Rien n'est enregistré : ni vidéo, ni son, ni image. Pas de compte, pas de cookie, pas de publicité. Nos serveurs ne voient que votre adresse IP et des informations de connexion, le temps de vous mettre en relation ; si la vidéo passe par notre relais, elle reste chiffrée et illisible.
>
> **1. Qui est responsable ?**
> [À COMPLÉTER : prénom et nom], [À COMPLÉTER : adresse postale], [À COMPLÉTER : adresse électronique].
>
> **2. Votre caméra et votre micro**
> - Le jeu a besoin de votre caméra et de votre micro : sans eux, pas de duel. Votre navigateur vous demande l'autorisation.
> - L'image et le son vont directement de votre appareil à celui de votre adversaire. Quand une connexion directe est impossible, ils passent par un serveur relais. Ils sont chiffrés de bout en bout : le relais ne peut ni les voir, ni les entendre, ni les enregistrer.
> - Rien n'est enregistré, ni par nous, ni par le jeu sur votre appareil.
>
> **3. La détection du sourire**
> - Votre appareil analyse l'image de votre caméra pour repérer un sourire. Cette analyse se fait sur votre appareil. Elle ne vous identifie pas et ne cherche pas à connaître vos émotions : elle mesure seulement la forme de votre bouche.
> - Les mesures de votre visage ne quittent jamais votre appareil. Votre appareil envoie seulement à celui de votre adversaire : la jauge (un pourcentage) et son maximum, les événements de jeu (calibrage réussi ou non, visage perdu, sourire, résultat de la manche) et des informations techniques (vitesse d'analyse, type d'appareil).
> - Quand vous souriez, une image fixe de ce moment est montrée à vous et à votre adversaire, comme preuve. Elle reste dans la mémoire des deux appareils et disparaît à la fin du match. Elle n'est ni enregistrée ni envoyée ailleurs.
>
> **4. Ce que votre adversaire peut faire**
> Le jeu ne permet pas d'enregistrer la partie. Mais votre adversaire pourrait filmer ou capturer son écran : nous ne pouvons pas l'en empêcher. Nos conditions d'utilisation l'interdisent sans votre accord. Ne jouez qu'avec des personnes en qui vous avez confiance.
>
> **5. Les données que nous traitons**
>
> | Donnée | Pourquoi | Base légale | Durée |
> |---|---|---|---|
> | Adresse IP, code du salon, informations de connexion | Vous mettre en relation avec votre adversaire | Exécution du service que vous demandez | Jusqu'à la fin de votre session de jeu (revanches comprises) ; puis 7 jours dans les journaux techniques [À COMPLÉTER si un prestataire garde plus longtemps] |
> | Adresse IP, volume relayé | Faire fonctionner le relais quand la connexion directe échoue | Exécution du service que vous demandez | Idem |
> | Adresse IP, pages demandées | Afficher le jeu ; sécurité du site | Intérêt légitime : faire fonctionner et protéger le site | Selon l'hébergeur [À COMPLÉTER] |
>
> Ces données sont nécessaires : sans adresse IP, aucune connexion n'est possible.
>
> **6. Qui reçoit ces données ?**
> Uniquement nos prestataires techniques : [À COMPLÉTER : hébergeur, service de mise en relation, service de relais, avec leur pays]. Aucune donnée n'est vendue, ni utilisée pour de la publicité.
>
> **7. Hors de l'Union européenne**
> [À COMPLÉTER selon les prestataires. Si tous sont en France : « Vos données restent en France. » Sinon : pays et garanties, par exemple la décision d'adéquation de la Commission européenne pour les États-Unis (Data Privacy Framework).]
>
> **8. Cookies**
> Le jeu n'utilise ni cookie, ni traceur. Votre navigateur garde seulement une copie des fichiers du jeu, pour l'ouvrir plus vite. Cette copie ne contient aucune donnée vous concernant.
>
> **9. Vos droits**
> Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation de leur traitement, ou vous y opposer. Écrivez à [À COMPLÉTER : adresse électronique]. Comme nous ne gardons que des adresses IP pendant 7 jours, sans compte, nous vous demanderons la date et l'heure de votre partie pour retrouver les journaux.
> Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL : https://www.cnil.fr.
>
> **10. Âge**
> Le jeu est réservé aux personnes de 18 ans ou plus.
>
> **11. Mise à jour**
> Dernière mise à jour : [À COMPLÉTER : date].

## 5. Conditions d'utilisation

Texte prêt à relire.

> **Conditions d'utilisation**
>
> **1. Le jeu**
> « Ne souris pas » est un jeu gratuit de duel vidéo entre deux personnes. Le premier qui sourit perd la manche. Le sourire est détecté automatiquement par l'application.
>
> **2. Qui peut jouer**
> - Vous devez avoir **18 ans ou plus**. En cochant la case « J'ai 18 ans ou plus », vous le déclarez.
> - Invitez seulement des personnes que vous connaissez.
>
> **3. Ce qui est interdit**
> Pendant une partie, il est interdit :
> - de montrer de la nudité ou un contenu à caractère sexuel ;
> - d'inviter ou de jouer avec une personne de moins de 18 ans ;
> - de harceler, menacer, insulter ou humilier votre adversaire ;
> - de tenir des propos haineux ou discriminatoires ;
> - de montrer des actes violents, dangereux ou illégaux ;
> - de filmer, capturer ou diffuser l'image ou la voix de votre adversaire sans son accord ;
> - de vous faire passer pour quelqu'un d'autre ;
> - de modifier l'application ou de perturber son fonctionnement ;
> - d'utiliser le jeu à des fins commerciales ou publicitaires.
>
> **4. Votre responsabilité**
> Vous êtes responsable de ce que vous montrez et dites pendant une partie. Filmer ou diffuser quelqu'un sans son accord peut constituer une atteinte à sa vie privée, punie par la loi.
>
> **5. L'arbitrage**
> L'arbitrage est automatique. Il peut se tromper. Les résultats n'ont aucune valeur en dehors du jeu.
>
> **6. Disponibilité**
> Le jeu est fourni gratuitement, tel quel, sans garantie de fonctionnement ni de disponibilité. Il peut être modifié ou arrêté à tout moment.
>
> **7. En cas de problème**
> Quittez la partie à tout moment avec « Abandonner » ou « Quitter ». Pour signaler un comportement ou un contenu illicite : [À COMPLÉTER : adresse électronique], ou la plateforme officielle Pharos : https://www.internet-signalement.gouv.fr.
>
> **8. Données personnelles**
> Voir la page « Confidentialité ».
>
> **9. Droit applicable**
> Ces conditions sont soumises au droit français.
>
> Dernière mise à jour : [À COMPLÉTER : date].

Où les afficher : lien depuis l'accueil ([D5](D5-parcours-maquettes.md) E1), à côté de « Confidentialité ». La case d'âge renvoie aux conditions : « J'ai 18 ans ou plus » reste le seul texte de la case (n° 29) ; le lien « Conditions d'utilisation » est ajouté sous la case ; « Confidentialité » et « Mentions légales » sont en bas de l'accueil (validé par Valentin, n° 173).

## 6. Registre de traitement simplifié

Sur le modèle de la CNIL [J11]. Une fiche par traitement.

| Rubrique | T1 — Mise en relation et relais | T2 — Hébergement du site | T3 — Tests des prototypes |
|---|---|---|---|
| Responsable | [À COMPLÉTER : prénom, nom, adresse, contact] | Idem | Idem |
| Finalité | Mettre deux joueurs en relation ; relayer leur connexion chiffrée quand le direct échoue | Afficher l'application ; sécurité | Régler et valider l'arbitrage (P0) ; mesurer l'intérêt du jeu (P2) |
| Base légale | Exécution du service (6.1.b) | Intérêt légitime (6.1.f) | Accord oral des testeurs, noté (n° 78, n° 211) ; à faire vérifier (V10) |
| Personnes concernées | Joueurs | Visiteurs | Testeurs (proches) |
| Données | Adresse IP, code de salon, descriptions de connexion, dates, volume relayé | Adresse IP, pages demandées, date, navigateur | Codes testeurs ; mesures numériques image par image ; tranche d'âge ; carnation en catégorie grossière ; réponses au questionnaire. Ni nom, ni image, ni son |
| Données sensibles | Aucune | Aucune | Aucune au sens de l'article 9 ; carnation notée pour mesurer un biais, effacée à la clôture de P0 (n° 78) |
| Destinataires | Prestataire de mise en relation, prestataire de relais (prototypes) ; aucun ensuite | Hébergeur | L'éditeur seul |
| Transferts hors UE | Prototypes : possibles, à vérifier (V7). Ensuite : aucun | Prototypes : selon l'hébergeur. Ensuite : aucun | Aucun |
| Durée | Fin de session ; journaux 7 jours | Selon l'hébergeur ; 7 jours sur le serveur de l'éditeur | Jusqu'à la clôture du prototype concerné |
| Sécurité | Connexions chiffrées (TLS, DTLS-SRTP) ; codes de salon aléatoires de 16 caractères au moins ; aucune donnée de jeu sur le serveur | HTTPS ; aucun script tiers | Fichiers sur l'ordinateur de l'éditeur, dans un dossier chiffré séparé, hors du dépôt public ; disque protégé par BitLocker (n° 216, n° 222, n° 223) |

Hors registre (traitements de l'éditeur non retenus, 2.1) : analyse du visage, flux vidéo et audio, image de preuve, jauges.

## 7. Mise en ligne

1. Remplir les champs [À COMPLÉTER].
2. Faire vérifier les points de la section 8.1.
3. Publier les trois pages ([D6](D6-lots-developpement.md) L2.6), liées depuis l'accueil.
4. Tenir le registre à jour à chaque changement de prestataire.

## 8. Points à faire vérifier par un professionnel

### 8.1 Avant l'ouverture au public

| N° | Point | Pourquoi |
|---|---|---|
| V1 | Publier l'identité de l'éditeur ou user de l'anonymat permis par la LCEN | Tension non tranchée entre l'article 1-1 de la LCEN et l'article 13 du RGPD (2.6) |
| V2 | Rôle de l'éditeur quand le flux vidéo passe par le relais | La CNIL écarte le RGPD pour le pair à pair « sans transit par un serveur » (2.1) |
| V3 | Obligation de tenir un registre pour un particulier sans activité économique | L'exemption vise « une entreprise ou une organisation » (2.5) |
| V4 | Application du DSA à un service gratuit d'un particulier ; points de contact | Définition des services de la société de l'information (2.8) |
| V5 | Obligation de conserver les données de connexion (décret 2021-1362) pour un service de mise en relation | Non vérifiée par la recherche |
| V6 | Qualification non biométrique de la détection du sourire, et hors « reconnaissance des émotions » | Analyse fondée sur le CEPD et un considérant de l'AI Act (2.2) |
| V7 | Transferts hors UE pendant les prototypes : localisation du serveur public PeerJS, de Metered, de l'hébergeur ; certification DPF | Localisation non publiée (2.9) |
| V8 | Suffisance d'une case déclarative pour l'âge | Aucune obligation plus stricte trouvée (2.7) |
| V9 | Durée de conservation des journaux (7 jours) | Recommandation générale de la CNIL : 6 mois à 1 an (2.3) |
| V10 | Base légale et information des testeurs (accord oral) | Journaux de test pseudonymes (6, T3) |
| V11 | Rédaction des conditions d'utilisation : comportements interdits, limitation de responsabilité | Texte rédigé sans relecture juridique |

### 8.2 Avant le mode inconnus

| N° | Point | Pourquoi |
|---|---|---|
| I1 | Analyse d'impact (AIPD) | Nouvelles technologies, rencontres entre inconnus, personnes possiblement vulnérables (2.5) |
| I2 | Fin de l'exemption domestique entre inconnus | L'exemption vise un cercle familial ou amical (2.1) |
| I3 | Qualification au regard du DSA : mise en relation aléatoire, signalement, modération, obligations des articles 16 à 18 | Toute fonction de salon public ou de contenu stocké peut faire basculer vers l'hébergement ou la plateforme (2.8) |
| I4 | Vérification d'âge et protection des mineurs ; risques pénaux (exhibition, propositions à des mineurs) | Exposition forte, cadre légal flou (2.7) |
| I5 | Modération ou arbitrage vérifié côté serveur : données envoyées au serveur ([D4](D4-architecture-technique.md) §11) | L'éditeur deviendrait responsable d'un traitement de vidéo ou de mesures du visage |
| I6 | Signalement, bannissement, conservation d'éléments de preuve, coopération avec les autorités (Pharos) | Contradiction possible avec « aucun enregistrement » (n° 26) |
| I7 | Comptes et historique (n° 33) : nouvelles données, nouvelles durées | Nouveau traitement |
| I8 | Statut de l'éditeur si une monétisation est envisagée | L'édition non professionnelle ne couvrirait plus l'activité |

Le n° 47 (D7 relu avant le mode inconnus) est étendu : une relecture a lieu **dès l'ouverture au public** (8.1), par un avocat ou un juriste spécialisé en données personnelles (n° 213).

## 9. Questions ouvertes

Aucune. Q1 à Q5 ont été tranchées par Valentin le 2026-09-25 :

| N° | Réponse | Décision |
|---|---|---|
| Q1 | Relecture dès l'ouverture au-delà des proches, par un avocat ou un juriste spécialisé en données personnelles | n° 213 |
| Q2 | Les champs [À COMPLÉTER] restent tels quels ; Valentin les remplit avant la mise en ligne (§7, étape 1) | n° 214 |
| Q3 | Lien « Conditions d'utilisation » sous la case d'âge ; « Mentions légales » sur l'accueil | n° 173 |
| Q4 | Identité de l'éditeur publiée | n° 215 |
| Q5 | Disque non protégé (BitLocker sans protecteur de clés) : journaux dans un dossier chiffré séparé ; protection BitLocker activée avant le premier test P0 | n° 216 |

## 10. Sources

Consultées le 2026-09-25. Sources officielles en priorité ; les autres sont signalées.

| Réf. | Source |
|---|---|
| J1 | CJUE, 19 octobre 2016, Breyer, C-582/14 : https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A62014CJ0582 |
| J2 | CNIL, « L'adresse IP est une donnée à caractère personnel » : https://www.cnil.fr/fr/ladresse-ip-est-une-donnee-caractere-personnel-pour-lensemble-des-cnil-europeennes |
| J3 | CNIL, recommandation « applications mobiles », 24 septembre 2024, §3.1, §3.3, §5.5 : https://www.cnil.fr/sites/cnil/files/2024-09/recommandation-applications-mobiles.pdf |
| J4 | CEPD, lignes directrices 3/2019 sur les dispositifs vidéo, §74 à 80 : https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201903_video_devices_en_0.pdf |
| J5 | Règlement (UE) 2024/1689 (AI Act), considérant 18 : https://ai-act-service-desk.ec.europa.eu/en/ai-act/recital-18 |
| J6 | CNIL, les bases légales : https://www.cnil.fr/fr/les-bases-legales ; https://cnil.fr/fr/les-bases-legales/contrat |
| J7 | CNIL, recommandation sur la journalisation (délibération 2021-122) : https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation |
| J8 | CNIL, information des personnes : https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence ; RGPD chapitre III : https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3 |
| J9 | CNIL, cookies et traceurs, « Que dit la loi ? » : https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi |
| J10 | CNIL, registre des activités de traitement : https://www.cnil.fr/fr/RGPD-le-registre-des-activites-de-traitement |
| J11 | CNIL, modèle de registre simplifié : https://www.cnil.fr/sites/default/files/atoms/files/registre_rgpd_basique.pdf |
| J12 | CNIL, liste des traitements soumis à AIPD : https://www.cnil.fr/sites/default/files/atoms/files/liste-traitements-avec-aipd-requise-v2.pdf |
| J13 | Loi 2004-575 (LCEN), version consolidée, articles 1-1 et 1-2 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164 (article lu via des sources secondaires, voir J14) |
| J14 | Service-public.fr, mentions obligatoires d'un site : https://entreprendre.service-public.gouv.fr/vosdroits/F31228 ; source privée : https://www.simonnetavocat.fr/mentions-legales-dun-site-internet-obligations-sanctions-et-modele/ |
| J15 | Arcom, référentiel de vérification de l'âge : https://www.arcom.fr/se-documenter/espace-juridique/textes-juridiques/referentiel-technique-sur-la-verification-de-lage-pour-la-protection-des-mineurs-contre-la-pornographie-en-ligne |
| J16 | Loi 2023-566 du 7 juillet 2023 : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047799533 ; DAJ : https://www.economie.gouv.fr/daj/lettre-de-la-daj-la-loi-ndeg2023-566-du-7-juillet-2023-cree-une-majorite-numerique-fixee-15-ans |
| J17 | Conseil constitutionnel, décision n° 2026-911 DC du 14 août 2026 : https://www.conseil-constitutionnel.fr/decision/2026/2026911DC.htm |
| J18 | Règlement (UE) 2022/2065 (DSA) : https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32022R2065 (considérants lus sur un site miroir non officiel : https://www.eu-digital-services-act.com/) |
| J19 | Décision d'exécution (UE) 2023/1795 : https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj |
| J20 | Tribunal de l'UE, T-553/23, Latombe : https://infocuria.curia.europa.eu/tabs/redirect/juris/liste.jsf?num=T-553%2F23 ; pourvoi C-703/25 P : https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng |
| J21 | Pharos : https://www.internet-signalement.gouv.fr |

Limites de la recherche : EUR-Lex et l'article 1-1 de la LCEN sur Légifrance n'ont pas pu être lus directement ; les considérants du DSA viennent d'un site miroir ; la décision n° 2026-911 DC est citée d'après la recherche, sans lecture intégrale.
