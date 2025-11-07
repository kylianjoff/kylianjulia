---
title: "J'ai créé un site personnel"
date: "07/11/2025"
author: "Kylian JULIA"
tags: ["Angular"]
excerpt: "J'avais besoin d'un endroit qui m'appartient à 100% pour regrouper et montrer tout ce que je fais et ce que je sais faire..."
---

**Lien GitHub :** https://github.com/kylianjoff/kylianjulia

J'ai déjà développé quelques projets WEB, je ne cesse de m'améliorer dans ce domaine et j'apprécie beaucoup ce que je fais. Mais j'ai surtout réfléchi à faire un truc utile pour moi et c'est à ce moment que j'ai eu l'idée de faire mon propre site perso. Mais pour qui ? Pour mettre quoi ? Pourquoi ? Comment ?

## Pourquoi avoir fait ça ?

J'ai tellement de chose à montrer qu'il faut bien un endroit qui recense tout ce que je fais. Tout d'abord j'avais envie de partager mes aventures, plus précisément mes futurs stages ou mobilités internationales. Mais pas sur les réseaux, je voulais un endroit clean qui recense tout ce que je fais. Il fallait aussi que je montre ceux que je savais faire, mes compétences, mes expériences, mes formations, mes engagements ... mais il y a trop de chose que je ne peux pas tout mettre sur mon CV. J'ai donc carrément une grande page dédié à moi, mes expériences, mes compétences, ce que je fait, et bien plus.

## Comment j'ai fait ce site ?

J'ai développé uniquement un frontend pour ce site web, réalisé avec le Framework **Angular**, qui est un framework en TypeScript, un genre de JavaScript mais pour faire des applications web un minimum sécurisé, que j'avais déjà utilisé pour un précédent projet.

#### Le design

J'ai décidé d'adopter un design aux couleurs simples et j'ai essayé de faire de belles animations, sachant que le design est la partie où je suis le moins fort. A l'heure actuelle, le design n'est pas optimisé mais dans le futur je vais m'en occuper, car pour le moment ça me prend inutilement de la bande passante et de la mémoire ce qui fait ralentir le chargement du site (pas très bon).

#### Gestion du système de post sans backend

Tous mes posts sont rédigés en Markdown et importé dans mon dossier source en Markdown. J'ai un script d'intégration continue qui, dès qu'il y a une modification dans le dossier contenant mes posts sur la branche principale (main) de mon répertoire GitHub, celui ci rebuild le projet angular et qui le redéploie ce qui permet à un script JavaScript de chercher tous les fichiers en .md (Markdown) pour les convertir en html stocké dans des fichiers Json pour en même temps récupérer des données YAML concernant le titre, l'auteur, la date et les mots-clés de chaque post. Cette méthode permet de bien différencier les en-têtes et les contenus pour améliorer l'affichage sur l'interface web.