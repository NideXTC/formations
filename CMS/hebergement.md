# Hébergement 

* [Pack éducation Github](https://education.github.com/pack)

* [hostinger](https://www.hostinger.fr/)

* **Pour du test seulement** : [dotTK](http://dot.tk)




## Création de compte chez Hostinger 




-> Choix du sous-domaine gratuit 
-> Choix de l'hebergement gratuit 


### FTP 


* Télécharger [FileZilla](https://filezilla-project.org/download.php?type=client)

* Sur Hostinger -> Hébergement -> [votre site] -> Fichiers -> Accès FTP

* Pour récupérer les identifiants, puis sur filezilla, rentrez les informations pour vous connecter. 

* Une fois connecté sur votre serveur, transférer tous les fichiers de votre wordpress sur le serveur distant. 


### BDD 

#### En local 

Allez sur PHPMyAdmin, sélectionnez votre base de données et faites `exporter`. 

Ouvrez un éditeur de texte et remplacez l'URL locale par l'URL distante, par exemple : `http://localhost/wordpress` par `http://monsite.fr`. 


#### Sur Hostinger

* Allez dans Sur Hostinger -> Hébergement -> [votre site] -> Bases de données  -> Bases de données MySQL 

* Remplissez les différents champs. 

* Allez ensuite dans PHPMyAdmin et faites `importer` et choisissez votre fichier. 

* Éditez votre fichier `wp-config.php` qui est à la racine de votre serveur (accessible par filezilla)



