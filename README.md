# Signalements


Le projet représente une application CRUD Client-Server hébergé dans une solution Visual Studio 2022.

La partie client est une application Angular 15 et la partie server est une application REST in C# ASP.Net Core 6.0

Une fois le répertoire Cloné et l’application ouverte dans Visual Studio 2022 vous aurez la structure suivant :


![Image1](https://user-images.githubusercontent.com/121311528/210892349-427c47ef-d4da-475a-bd30-15be303028ec.png)


Pour démarrer la partie server il suffit de cliquer le bouton suivant :

![Image2](https://user-images.githubusercontent.com/121311528/210892419-0ad8a96f-4eff-4b11-95c5-19e257355229.png)

Pour démarrer la partie client (après avoir installé l’environnement) :

•	Ouvrir une fenêtre terminal comme « Invite de commandes »

•	Se déplacer dans le répertoire « ClientApp » (ex: cd C:\Signalements\Signalement.Web\ClientApp\)

•	Exécuter la commande « npm install »

•	Exécuter la commande « ng serve »

![Image3](https://user-images.githubusercontent.com/121311528/210893084-e992969e-1a65-401d-9720-d7fac48d4da4.png)


Vous pouvez démarrer votre navigateur et taper l’adresse : http://localhost:4200/ , l’application est exécutée :


![Snapshot_00](https://user-images.githubusercontent.com/121311528/210893718-4c94bdec-ea22-428c-9e60-9d9516514b30.PNG)


L’application client est une application responsive avec la liste des Signalements comme page d’accueil  :
Il est possible d’ajouter un nouveau Signalement avec un lay-out responsive :

Le même lay-out sera utilisé pour la mise à jour d’un Signalements :

Si on essaie d’ajouter un Signalement avec un adresse mail d’utilisateur déjà présente dans la base de données, un message d’erreur est affiché :



Page d’accueil de l'application:

![Snapshot_01](https://user-images.githubusercontent.com/121311528/210662867-daee05f7-5186-409f-822a-39cf9120e880.PNG)
