# Exercice 1 

 Créer une fonction qui affiche 'coucou'.

# Exercice 2

 Créer une fonction qui affiche les données passées en paramètres.

# Exercice 3 

Une boucle qui fait 10 tours et qui doit ressortir une chaine identique à '0123456789'. 

# Exercice 4 

On a le tableau ['a', 'b', 'c'], afficher chaque élément avec un for & un foreach. 

# Exercice 5 

Recréer la fonction strtoupper(). Cette fonction doit prendre en paramètre le texte et retourner le texte en majuscule. 
On ne prendra pas les caractères accentués. 


# Exercice 6 

Créer une fonction récursive pour générer une suite de Fibonacci. Instaurer une limite pour qu'elle s'arrête au bout de 10 passages. 

1 - 1 - 2 - 3 - 5 - 8 - 13 - 21 - 34 - 55 ... 

1 + 1 = 2 
1 + 2 = 3 
2 + 3 = 5 
3 + 5 = 8 
.... 

// 
function fibonacci($start = 0, $next = 1, $limit = 10){

	fibonacci(1, 1, 9); 
}


.
.
. 

fibonacci(1, 2, 8);

# Exercice 7 ([isset](http://php.net/manual/fr/function.isset.php) & [empty](http://php.net/manual/fr/function.empty.php))

Créer un formulaire avec le nom, prénom, email et mot de passe. 
Vérifier si le mot de passe et l'email ne sont pas vides, le nom et le prénom peuvent être vides. 
Afficher ensuite les informations sous la forme : 

```
le nom est : 
le prénom est : 
le mot de passe est : 
l'email est : 
```

# Exercice 8 

Sécuriser l'affichage des informations avec [htmlentities](http://php.net/manual/fr/function.htmlentities.php).

# Exercice 9

Afficher un message si les champs sont vides. 


# Exercice 10

* Enregistrer les informations du POST en session 
* Créer une deuxième page php 
* Lorsque l'enregistrement est terminé, créer une [redirection](http://php.net/manual/fr/function.header.php) vers la deuxième page 
* Sur la deuxième page, faire un [var_dump](http://php.net/manual/fr/function.var-dump.php) de la session. 


# Exercice 11 ([aide](http://php.net/manual/fr/function.file-put-contents.php))

Enregistrer le contenu de la sessions dans un fichier `test.txt`.


# Exercice 12 ([aide](http://php.net/manual/fr/function.session-destroy.php))

Créer un lien pour déconnecter l'utilisateur, tout en restant sur la même page (par exemple : `<a href="page1.php?deco=true">Déconnexion</a>`).

# Exercice 13 ([aide](http://php.net/manual/fr/features.file-upload.post-method.php))

Créer un upload de fichiers sécurisé (vérifier le type MIME & l'extension du fichier). 
Pour vérifier le type MIME du fichier il faut passer par la fonction [finfo_file](http://php.net/manual/fr/function.finfo-file.php) ou [mime-content-type](http://php.net/manual/fr/function.mime-content-type.php).