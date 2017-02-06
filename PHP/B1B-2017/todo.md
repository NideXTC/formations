1 - Créer un formulaire de connexion (email / password)
2 - Récupérer les données en post ($_POST)
3 - Requête en BDD pour aller chercher l'utilisateur
    qui a ce password & email (SELECT en SQL)
    -> Compter le nombre d'utilisateur dans le tableau ( count() ou siezof() )
4 - Créer une session ($_SESSION) qui contient une variable connected
    ($_SESSION['connected']) à vrai/faux


---------

5 - avoir une page d'admin  - connecté -> on lui affiche un message
                            - non connecté -> redirection vers la connexion

6 - Sur la page admin.php, via le formulaire, mettre à jour l'utilisateur
        - Récupérer le post 
        - Modifier les informations de l'utilisateur en SQL (UPDATE) 
        en utilisant l'id stocké en session ($_SESSION)
        
7 - Créer une page `delete.php`, sur cette page, il faudra lister les utilisateurs (voir [pdo.php](https://github.com/NideXTC/CoursYNov/blob/master/PHP/B1B-2017/pdo.php))et sur chaque utilisateur ajouter un lien pour supprimer l'utilisateur. 
     
| Name  	| Action    	|
|-------	|-----------	|
| Nom 1 	| Supprimer 	|
| Nom 2 	| Supprimer 	|

Ce lien sera par exemple `<a href="delete.php?action=del&id=1">Supprimer</a>`. 
Il suffira ensuite de détecter la présence de `$_GET['action']` et `$_GET['id']` pour supprimer l'utilisateur. 
  
8 - Comme pour le client, créer une interface pour ajouter/modifier/supprimer un produit. Pour cela, il est nécessaire de créer une nouvelle table products avec id - INT(11), name - VARCHAR(255), price - INT(11), picure - TEXT.

9 - Créer une page `product.php` qui appellera un produit par son `id`, pour cela il faudra appeler la page _via_ 
par exemple `product.php?id=1` pour récupérer le premier produit en BDD.   