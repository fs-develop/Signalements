# Signalements


## Description
Le projet représente une application Client-Server, où les éléments peuvent être lu, ajouté ou modifié.

Il s'agit d'une application capable d'afficher une liste de Signalements, d'événements inattendus ou de problèmes, peuplée par des utilisateurs. A chaque événement, des Observations peuvent être associées. Ils est possible de choisir ces Observations dans une liste pré-saisie.

![Snapshot_10](https://user-images.githubusercontent.com/121311528/211168041-93705fdf-2d7f-4cd1-9b23-5e824c8da972.PNG)

Le système prévoit que les emails des auteurs des Signalements soient uniques dans le data base et qu'un seul Signalement puisse être associé au même auteur (règle du niveau « business logique » mise en place dans ce projet).

Seules les informations « email » et « description » sont nécessaires pour ajouter ou modifier un Signalement et le système affiche un message d'erreur si un auteur saisit un Signalement avec un mail déjà présent dans la base de données.

## Technologie utilisé
La partie Front-End (client) est une application « Angular 15 » avec TypeScript et la partie Back-End (server) est une application REST en « C# ASP.Net Core 6.0 » hébergées dans une solution Visual Studio 2022.

Pour la part Front-End j'ai aussi utilisé: « Material Design components for Angular » pour les composants et « Bootstrap 5 » pour avoir le site responsive.

[Angular](https://angular.io) | [Typescript](https://www.typescriptlang.org) | [Material Design components for Angular](https://material.angular.io) | [Bootstrap](https://getbootstrap.com) | [Visual Studio](https://visualstudio.microsoft.com/fr/vs)

## Comment installer et exécuter le projet
Une fois le répertoire cloné (par exemple in « *cd C:\Dev\Signalements* ») et l'application ouverte dans Visual Studio 2022 vous aurez la structure suivant :

![VS_Solution](https://user-images.githubusercontent.com/121311528/211168125-138e5b38-363f-41d1-93da-8d167543c282.png)

Pour démarrer la partie server il suffit de cliquer sur le bouton suivant de la barre principale de Visual Studio 2022:

![VS_ToolBar](https://user-images.githubusercontent.com/121311528/211168166-a4212074-5d1e-4a0e-96ed-10dcfdae8dfd.png)

Pour démarrer la partie client (après avoir installé « Node.js » et « angular/cli ») :

-	Ouvrir une fenêtre terminal comme « Invite de commandes »
-	Se déplacer dans le répertoire « ClientApp » du projet (ex : *cd C:\Dev\Signalements\Signalement.Web\ClientApp*)
-	Exécuter la commande `npm install`
-	Exécuter la commande `ng serve` (ou `ng serve --o` qui démarre automatiquement le navigateur)

Maintenant vous pouvez démarrer votre navigateur (s'il n'a pas déjà démarré) et taper l'adresse : http://localhost:4200/ , l'application est exécutée et la liste des Signalements est affiché.

### Ressources
- Vous pouvez télécharger « Node.js » à partir d'[ici](https://nodejs.org/)
- Pour installer « angular/cli », vous pouvez saisir la commande suivante dans une fenêtre terminal comme « Invite de commandes » : `npm install -g @angular/cli`


## Comment utiliser le projet
L'application Front-End est une application « responsive » avec la liste des Signalements comme page d'accueil, vous pouvez ajouter un nouveau rapport en cliquant sur le bouton/option « Ajouter un Signalement ».

Un formulaire de saisie apparaît ; une fois les informations du Signalement saisies, vous pouvez les enregistrer en cliquant sur le bouton « Ajouter ».
Vous pouvez également modifier un Signalement en cliquant sur le bouton/option "Modifier" du Signalement dans la liste.

Le même formulaire de saisie sera utilisé pour mettre à jour un Signalement. Une fois le Signalement modifié, vous pouvez le sauvegarder en cliquant sur le bouton « Mettre à jour ».

Si vous essayez d'ajouter ou de modifier un Signalement  avec l'adresse mail d'un utilisateur déjà dans la base de données, le message d'erreur « *This value already exists* » s'affiche.

