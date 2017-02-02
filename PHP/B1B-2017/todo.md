* Créer un formulaire de connexion (email / password)
* Récupérer les données en post ($_POST)
* Requête en BDD pour aller chercher l'utilisateur qui a ce password & email (SELECT en SQL)   
    -> Compter le nombre d'utilisateur dans le tableau ( [count()](http://php.net/manual/fr/function.count.php)  )   
* Créer une session ($_SESSION) qui contient une variable connected
    ($_SESSION['connected']) à vrai/faux


---------

* avoir une page d'admin  - connecté -> on lui affiche un message
                            - non connecté -> redirection vers la connexion