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