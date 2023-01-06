# Signalements


## Description
Le projet représente une `application CRUD` Client-Server hébergé dans une solution Visual Studio 2022.

## Technologie utilisé :
La partie client est une application Angular 15 et la partie server est une application REST in C# ASP.Net Core 6.0

## Comment installer et exécuter le projet :
Une fois le répertoire cloné et l’application ouverte dans Visual Studio 2022 vous aurez la structure suivant :
Pour démarrer la partie server il suffit de cliquer le bouton suivant :

``` prova
Pour démarrer la partie client (après avoir installé l’environnement) :
•	Ouvrir une fenêtre terminal comme « **Invite de commandes** »
•	Se déplacer dans le répertoire « ClientApp » (cd C:\Signalements\Signalement.Web\ClientApp\)
•	Exécuter la commande « `npm install` »
•	Exécuter la commande « `ng serve` »
```

Vous pouvez démarrer votre navigateur et taper l’adresse : http://localhost:4200/
L’application est exécutée.

## Comment utiliser le projet
L’application client est une application responsive avec la liste des Signalements comme page d’accueil  :
Il est possible d’ajouter un nouveau Signalement avec un lay-out responsive :
Le même lay-out sera utilisé pour la mise à jour d’un Signalements :
Si on essaie d’ajouter un Signalement avec un adresse mail d’utilisateur déjà présente dans la base de données, un message d’erreur est affiché :
