# Serveur web


https://github.com/NideXTC/CoursYNov/

#### WINDOWS ([EasyPHP](https://bitbucket.org/easyphp/easyphp-devserver/downloads/EasyPHP-Devserver-17.0-setup.exe))

E (avec le carré rouge) en bas en droite -> Open dashboard 

Server http (Apache) :  Click start -> Apache -> Start

Server database (MySQL) : Click start -> MySQL -> start 



PUIS : 

Aller modifier le fichier php.ini qui est dans le dossier C:\Program Files (x86)\EasyPHP-Devserver-16.1\eds-binaries\php\php56...

Ensuite aux alentours de la ligne 905, il faut supprimer le **;** devant **extension=php_curl.dll**.
Il faut ensuite arrêter et relancer le serveur http, ainsi le changement de langue et le chargement d'extension fonctionnent.

Il faut ensuite copier le fichier `C:\Program Files (x86)\EasyPHP-Devserver-16.1\eds-binaries\php\php56...\libssh2.dll` dans `C:\Program Files (x86)\EasyPHP-Devserver-16.1\eds-binaries\httpserver\apache2.4...\`. 

#### MAC 

Lancer MAMP (pas le pro) -> Démarrer les serveurs 



# WORDPRESS 

Télécharger WP : https://fr.wordpress.org/ 




#### MAC 
	-> Copier le dossier dezipé dans /Application/MAMP/htdocs/ 

#### WINDOWS 
	-> Copier le dossier dezipé dans C:\program files(x86)\EasyPHP-devserver....\eds-www 


# PHPMYADMIN

#### MAC 
	-> MAMP -> Open WebStart page -> Click sur le lien PhpMyAdmin 
#### Windows 
	-> Clic droit sur le E -> Open Dashboard -> sur la page d'accueil -> Module -> PhpMyAdmin -> Open 



Volet de gauche -> Clik sur "Nouvelle base de données" -> Vous lui donnez un nom (Sans espace) -> Créer 


#### MAC : 
	http://localhost:8888 ou http://127.0.0.1:8888
#### WINDOWS :
	 http://localhost ou http://127.0.0.1 


#### Windows : 

Nom de la base de données : [ce que vous avez rentré dans PhpMyAdmin]    
Utilisateur : root     
mot de passe : [vide]    
Adresse de la base : localhost     
prefix : wp_    


#### Mac : 

Nom de la base de données : [ce que vous avez rentré dans PhpMyAdmin]    
Utilisateur : root     
mot de passe : root    
Adresse de la base : localhost     
prefix : wp_    


## Page d'admin : 

#### WINDOWS 
	-> http://localhost/[nom du dossier]/wp-admin
#### MAC 
	-> http://localhost:8888/[nom du dossier]/wp-admin



_____________________ 

# Exercices

1/ Créer un utilisateur qui ne peut QUE écrire des articles [utilisateur : toto , 
mot de passe : titi,
mail :  tutu@yopmail.com
]

2/ Créer un nouvel article (avec l'utilisateur toto) // Passez par un autre navigatuer ou en navigation privée 

3/ Modifier les URL pour que la date ne s'affiche pas dedans (permalinks / Liens permanents) -> Passer en "nom de l'article"

4/ Gérer les paramètres des commentaires pour que l'administrateur puisse modérer les comms 


5/ Créer un article protégé par un mot de passe 

6/ Ajouter une image dans la bibliothèque d'images et l'ajouter dans l'article protégé 

7/ Changer de le thème du site et passer la police en rouge 

8/ Charger le plugin WP Super Cache

9/ Charger le plugin Yoast 

10/ Charger le plugin WooCommerce 

11/ Changer le thème pour un thème compatible avec WooCommerce 

12/ Modifier le menu pour afficher spécialement l'article protégé 


































