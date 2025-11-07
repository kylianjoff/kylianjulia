---
title: "J'ai créé un TooGoodToGo entièrement gratuit pour les étudiants"
date: "08/11/2025"
author: "Kylian JULIA"
tags: ["Angular", "ASP.NET"]
excerpt: Et si les étudiants pouvaient récupérer gratuitement les invendus du BDE ou du resto U ? C’est la question que je me suis posée avant de créer une plateforme inspirée de TooGoodToGo — mais 100 % gratuite pour les étudiants.
thumbnail: "/assets/projects/toogoodtogo-des-etudiants/logo.png"
---
Un TooGoodToGo pour les étudiants ? Mais pourquoi ?

Il faut que je vous raconte toute l'histoire qui m'a mené à ce projet.

![Page d'accueil de la plateforme - capture d'écran](/assets/projects/toogoodtogo-des-etudiants/accueil.png)
_Capture d'écran du haut de la page d'accueil de la plateforme._

## La connaissance d'un problème

En mars 2025 et avec 5 autres personnes, nous avons fondé **Shared**, le club caritatif de l'ISIMA. Dès les débuts du club, nous avons eu connaissance de quelques problèmes de gaspillage alimentaire. Etonnant ? Non, ces problèmes sont partout. Mais dès le début de notre mandat, nous avons eu des echos du BDE (Bureau Des Etudiants) expliquant qu'ils avait un trop gros stock de crêpe industriel car les consommateurs habituels étaient partis en stage et ils avaient également un gros stock de jus de fruit presque périmé datant du week-end d'intégration. Ils n'arrivaient pas à les vendre et périmaient petit à petit. Il y a également des responsables du restaurant universitaire du campus qui nous ont faire par d'un problème de gaspillage, ils avaient beaucoup de nourriture encore consommable mais qu'ils étaient obligés de jeter car ils ne peuvent servir les plats qu'un certain nombre de fois, alors qu'ils sont encore bon.
Après avoir écouté tous ces problèmes, j'ai pensé à un système, ou plutôt à une plateforme, pour permettre aux BDE et aux autres donateurs comme le restaurant universitaire de donner gratuitement les aliments encore consommable uniquement aux étudiants.

## Une organisation au top

### Organisation des utilisateurs

L'objectif était de faire un service exclusivement pour les étudiants et les BDE (Bureau Des Etudiants), il ne fallait donc pas que la plateforme soit entièrement ouverte à tous et contrôler les inscriptions.

![Moyens de s'inscrire — capture d'écran](/assets/projects/toogoodtogo-des-etudiants/inscription.png)
_Capture d'écran des différentes options d'inscription proposées aux utilisateurs (compte étudiant, compte donateur)._ 

Pour contrôler que les personnes soient bien des étudiants, nous avons au départ pensé à utilisé le CAS (Centre d'Authentification Sécurisé) de l'UCA (Université Clermont Auvergne) sur lequel tous les étudiants de Clermont-Ferrand ont un compte. Ceci nous permettait d'être sûr que chaque personne qui se connectait sur la plateforme étaient étudiant durant l'année en cours. Mais l'UCA a refusé que nous utilisons leur CAS. Il a donc fallu faire un système d'authentification propre à notre plateforme.
Nous devons tout de même toujours contrôler que chaque personne inscrit soit étudiant.

### Organisation des dons et des réservations

La partie intéressante pour les étudiants et de savoir comment obtenir les dons. Sur cette plateforme, le donateur a juste à mettre les informations sur le don (nom, description, date de péremption et quantité). Pour les BDE ils doivent également dire si il faut don uniquement aux étudiant de leur école ou à tous les étudiants inscrit sur la plateforme. Ensuite l'étudiant qui voit le don il peut le réserver, mais pas pendant un temps infini, le don est réservé pendant 30 minutes. Pour éviter qu'une personne un peu malin embête tout le monde, un étudiant ne peut réserver qu'un don à la fois. Ensuite l'étudiant à donc 30 minutes pour aller le retirer au lieu où se trouve le donateur.

![Les étapes - capture d'écran](/assets/projects/toogoodtogo-des-etudiants/etapes.png)
_Capture d'éran des étapes de la mise en ligne d'un don jusqu'à la récupération du don par un étudiant._

## Les technologies utilisées

AU moment de commencer ce projet ça faisait un moment que je n'avais pas fait de page web. Toutes les pages web que j'avais fait il y a une époque n'étaient que personnelles et n'ont jamais été publique. Les autres développeurs vont haluciner mais pour mon excuse je n'avais pas beaucoup de connaissance que je faisais mes pages web en PHP... Certaines personnes le save : le PHP est une passoire en terme de sécurité mais par on ne sait quel miracle, ce langage de programmation est toujours en vie (Les cours de pentest et de sécurité web m'ont bien montré toutes les failles que précente ce langage). C'est à ce moment là que j'ai appris les Framework TypeScript pour développer des applications web. Bon j'arrête de trop raconter ma vie et je vais aller trois au but de cette section : j'ai utilisé le framework **Angular** (framework de Google) pour le frontend et j'ai utiliser le service **ASP.NET** (service WEB dotnet de Microsoft) pour le backend qui lui utilise du C#, un langage que je n'avais jamais utilisé même si il est connu.

## Où en est le projet aujourd'hui ?

Depuis fin août 2025 nous avons une version prête mais le déployement n'est toujours pas à l'ordre du jour. Donc vous vous demandez sûrement pourquoi j'ai fait tout ça ? Parce que ce projet aurait dû voir le jour à la rentrée de septembre 2025 et de notre côté on avait un moyen de déployer tout prêt.
Shared a les financements nécessaire pour payer le serveur sur lequel sera hébergé la plateforme et pour payer le nom de domaine mais le club n'a pas de carte bleu (mais le club a un compte BDE sur lequel est stocké l'argent). Notre idée était de passer par le compte OVH (hébergeur) du BDE de l'ISIMA (qui eux ont une carte bleu déjà enregistré et qui finance le projet) et on aurait juste a déduire le montant de la plateforme du compte BDE du club. Mais depuis fin août le BDE ne donne pas de réponse à notre requête suite à plusieurs relance (il faut juste dire oui ou non).

## Ce que j'ai appris de ce projet

Ce projet a été le plus gros que j'ai réalisé à ce jour. Même si je l'ai développé seul, je remercie toutes les personnes qui m'ont soutenu et conseillé, plus particulièrement au mandat 2025 du club Shared qui m'ont tous soutenu dès que je leur ai soumis l'idée de cette plateforme. Ce projet m'a appris d'un côté technique le langage C# mais également à utilisé différentes techniques pour différentes parties de la plateforme et également l'API qui relie le frontend et le backend.
J'espère très fortement que je vais pouvoir déployer cette plateforme un jour ne serait-ce pour ne pas avoir gaspillé du temps mais surtout pour apporter une solution gratuite pour tous les donateurs et étudiants permettant de limiter le gaspillage alimentaire en aidant les étudiants.
Si le BDE de l'ISIMA continu a ne rien faire pour ce projet, je chercherai un autre moyen et un autre financement pour le déployer. J'ai également énormément de piste d'amélioration pour cette plateforme mais je m'y concentrerai uniquement quand je serai sûr que cette plateforme verra le jour.