				             _   _           _           _  _____       
				            | \ | |         | |         | |/ ____|      
				      ______|  \| | ___   __| | ___     | | (___ ______ 
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |      
				            |_| \_|\___/ \__,_|\___|\____/|_____/       
                                                    
                                                    
                                                    
# Exercices - 0

Faites un dossier _basics_ dans votre dossier _NodeJS_, dans ce dossier faites un fichier js pour chaque exercice. Pour le lancer, vous n'aurez qu'à faire par exemple `node exercice1.js`.

# BACK TO BASICS

## Variables 

#### Exercice 0.1

Comment modifier la déclaration des variables pour que le console.log retourne 3 ? 

```
myVar = 3; 

function tata(){
  myVar = 2; 
}

tata();

console.log(myVar);
``` 

#### Exercice 0.2

Comment faire pour que mon code passe dans le _else_ ? 

```
if(1 == true){
  console.log('OK');
} else {
  console.log('NOK');
}
``` 

## Fonctions 

#### Exercice  1.1

Faire une fonction _show_ qui affichera en console le texte passé en paramètre. Exemple : `show('coucou');` 

#### Exercice  1.2

Nous voulons stocker notre fonction faite dans l'exercice précédent dans une variable. Utilisez cette fonction et affichez le résultat en console. [aide](http://www.w3schools.com/js/js_function_definition.asp)

#### Exercice  1.3 ([aide](http://www.w3schools.com/jsref/met_win_setinterval.asp))

Écrire un script qui affiche _"coucou"_ en console  toutes les secondes (ctrl+c pour arrêter le script). 

#### Exercice  1.4 

Écrire un script qui affiche _"coucou"_ en console toutes les secondes et s'arrête après le 3e passage. 

#### Exercice  1.5 ([aide](http://www.w3schools.com/jsref/met_win_settimeout.asp)) 

Écrire un script qui affiche _"coucou"_ en console au bout de 2 secondes. 

## Tableaux

#### Exercice 2.1

Nous avons les valeurs 4,3,5,8 ; mettre ces valeurs dans un tableau et ressortir en console : 
* toutes les valeurs
* la première valeur
* la taille du tableau 

#### Exercice 2.2

En reprenant votre tableau de l'exercice précédent, trier ce tableau et le sortir en console.

#### Exercice 2.3 

Faire une boucle _for_ et, à chaque tour, afficher la valeur en console. 

#### Exercice 2.4

Faire une boucle [_foreach_](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach) et, à chaque tour, afficher la valeur en console. 

## Math

#### Exercice 3.1 

Nous avons les valeurs 9,11,55,22 ; comment trouver la valeur minimum et maximum ? Afficher votre résultat en console.

#### Exercice 3.2 

Afficher en console un numéro au hasard via une fonction javascript. 

#### Exercice 3.3 

Afficher en console la valeur de PI (via une constante javascript). 

#### Exercice 3.4

Afficher en console la valeur arrondie de PI à la valeur supérieure et inférieure. 

## Regexp ([aide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp))

#### Exercice 4.1

Écrire une regexp pour ressortir le chiffre dans la chaîne "Coucou 3".

#### Exercice 4.2

Écrire une regexp pour ressortir la lettre dans la chaîne "1231f156415".

#### Exercice 4.3

Écrire une regexp pour ressortir le mot "yolo" dans la chaîne "fjezoifjezyoloceuhfez".

#### Exercice 4.4

Écrire une regexp pour ressortir le mot "yolo" (le mot cherché est en minuscule) dans la chaîne "FOEIJFOEZIJFEYOLOFEZKUHFEI" .

#### Exercice 4.5

Écrire une regexp pour ressortir les chaînes de caractères dans la chaîne "fezf1548ffdsaf515154v54654" et sortir les valeurs en console.

## Entiers 

#### Exercice 5.1

Sans modifier les lignes actuelles, comment faire ressortir le typeof en "number" et non en "string" ? 

```
var test = "0123";

console.log(typeof test);
```

#### Exercice 5.2

Additionnez ces deux valeurs et affichez le résultat en console.

```
var uno = "01";
var dos = "02";
```

## chaînes

#### Exercice 6.1 

Sans modifier les lignes actuelles, comment faire ressortir le typeof en "string" et non en "number" ? 

```
var test = 0123;

console.log(typeof test);
```

#### Exercice 6.2

Ressortez la chaîne en console sous la forme "Hello World".

```
var hello = "Hello";
var world = "World";
```

## Dates ([aide](http://www.w3schools.com/jsref/jsref_obj_date.asp))

#### Exercice 7.1 

Ressortir l'heure en console.

#### Exercice 7.2 

Afficher en console la date sous la forme "23/10/2015".

#### Exercice 7.3 

Afficher en console la date sous la forme "23 octobre 2015" (en français).

## Objets ([aide](http://www.w3schools.com/json/json_syntax.asp) & [aide](http://www.w3schools.com/json/default.asp))

#### Exercice 8.1 

Créer un JSON avec 2 elèves : 
* prénom : Han / nom : Solo 
* prénom : Chew / nom : Bacca 

Afficher cet objet en console. 

#### Exercice 8.2 

Créer un JSON avec 2 tableaux de JSON à l'intérieur : 
* prof : 
  * prénom : Han / nom : Solo 
  * prénom : Chew / nom : Bacca   
* élève : 
  * prénom : Marty / nom : McFly 
  * prénom : Doc / nom : Brown 

Ressortir cet objet en console. 

#### Exercice 8.3 

Avec le JSON fait dans l'exercice précédent, affichez en console le nom de _Marty_.

#### Exercice 8.4 

Nous avons un JSON au format texte ; affichez en console la valeur du prénom.

```
var text = '{"name" : "Dupont", "first_name" : "Jean"}';
```

#### Exercice 8.5

Nous avons le JSON suivant : 

```
var number = {"random" : "1"};
```

Nous voulons qu'il nous ressorte un nombre aléatoire. Placez une fonction pour qu'en faisant `number.random();` elle affiche un nombre aléatoire en console.   

## Express 

Faites un dossier `exercice_express`.

### Exercice 9.1

Nous souhaitons installer Express et qu'en cas de suppression du dossier `node_modules` nous puissions tout télécharger simplement. Comment faire ? Quel fichier sera obligatoire ? 

### Exercice 9.2 [aide](http://expressjs.com/guide/routing.html)

Installez express dans votre dossier avec la commande `npm install express`. 
Nous souhaitons modifier notre code suivant pour qu'il affiche un message lorsque la personne arrive sur la page avec son navigateur _(http://localhost:3000)_, faire un fichier `app.js` avec :

```
var express = require('express');
var app = express();
var server = app.listen(3000,function(){
  console.log('Hello');
});

```

### Exercice 9.3 

_Pour cet exercice nous aurons besoin d'un petit 'logiciel' sur chrome qui s'appelle [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop), il nous permettra de tester nos URL._

Nous souhaitons desormais que lorsque l'utilisateur envoie une requête _PUT_ sur la home il lui renvoie un fichier HTML avec : 

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>COUCOU</title>
</head>
<body>
  bien ou bien ? 
</body>
</html>
```

### Exercice 9.4

_Pour cet exercice nous aurons besoin d'un petit 'logiciel' sur chrome qui s'appelle [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop), il nous permettra de tester nos URL._

Nous souhaitons desormais que lorsque l'utilisateur envoie une requête _DELETE_ sur la home il lui renvoie un JSON (parfaitement formatté) avec : 

```
{"bien" : "bien?"}
```

### Exercice 9.5

Installez mongoose dans votre dossier avec la commande `npm install mongoose`. 

En reprenant le code de l'exercice précédent, rajouter une connexion à une base qui se nomme `basics`. 

### Exercice 9.6 ([aide](http://mongoosejs.com/docs/2.7.x/docs/schematypes.html))

En reprenant le code de l'exercice précédent, créez un schéma mongoose `student` pour enregistrer un élève avec : 
* name (string)
* first_name (string)
* email (string)

Si l'utilisateur envoie une requête _POST_, créer un entrée en base avec : 
* name : "Bob"
* first_name : "Sponge"
* email : "sponge.bob@square.com"

### Exercice 9.7 ([aide](http://mongoosejs.com/docs/2.7.x/docs/finding-documents.html))

En reprenant le code de l'exercice précédent, lorsque l'utilisateur envoie une requête _GET_, lui renvoyer en JSON de toutes les entrées en BDD. 


### Exercice 9.8 ([aide](http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html))

En reprenant le code de l'exercice précédent, si l'utilisateur envoie une requête _PUT_, modifier toutes les entrées en base pour changer le nom en "Bobby". 

Vérifiez en faisant une requête _GET_.


### Exercice 9.9 ([aide](http://jade-lang.com/) && [aide](http://expressjs.com/guide/using-template-engines.html))

Renvoyez ce code si l'utilisateur accède à l'URL `/test-jade` et faire en sorte de voir le message `Good ;)`: 

```
doctype html
html(lang="en")
  head
    title Coucou
  body
      if itsABoolean
        p Good ;) 
      else
        p Nope !
```

### Exercice 9.10 ([aide](http://jade-lang.com/reference/code/))

Renvoyez ce code si l'utilisateur accède à l'URL `/test-jade2` en passant la variable `paramHTML` avec comme valeur `coucou <strong>TOI</strong>`  et faire en sorte que le message ne soit pas échappé : 

```
doctype html
html(lang="en")
  head
    title Coucou
  body
      p= paramHTML
```


### Exercice 9.11 ([aide](http://jade-lang.com/reference/iteration/))

Nous souhaitons désormais voir la liste des personnes en BDD au format HTML quand on accède à la home. 

### Exercice 9.12 ([aide](https://github.com/expressjs/session))

/!\ Nous allons utiliser les sessions sans stockage de session, pour plus de stabilité il est obligatoire d'utiliser un [système de stockage](https://github.com/expressjs/session#compatible-session-stores) 
Nous souhaitons garder en mémoire les informations du client. Quand l'utilisateur appelle la page "/setname" en GET on enregistre en session son nom (Josay) et si l'utilisateur appelle la page "/getname", on affiche son nom.  

### Exercice 9.13 

Grâce au [MethodOverride](https://github.com/expressjs/method-override) mettre en place un formulaire qui envoie une requête en PUT. 

### Exercice 9.14 

Créer un formulaire avec deux champs input:text pour saisir le nom et le prénom et l'envoyer sur la route _/showPost_.
Afficher en console le résultat du POST. 

### Exercice 9.15 

Créer un formulaire avec deux champs input:text pour saisir le nom et le prénom et l'envoyer sur la route _/showGet_.
Afficher en console le résultat du GET. 

### Exercice 9.16 

Créer une route du type `/number/1` où le nombre sera une variable `:id` et sera affiché sur la page. exemple :  
Sur la route `/number/1337` nous verrons sur la page : 

```
Le nombre est 1337
```

### Exercice 9.17 ([aide](https://github.com/Unitech/pm2))

Installer le package [`pm2`](https://github.com/Unitech/pm2) en global et mettre en place un serveur web avec votre site actuel puis afficher la liste des serveurs. 


### Exercice 9.18

Mettre en place un serveur en mode cluster sur 1 cluster puis y ajouter 2 clusters. 

### Exercice 9.19

Mettre en place un serveur qui se relance automatiquement lors de la modification de fichiers. 

### Exercice 9.20

Afficher l'ensemble des logs de votre serveur puis afficher l'utilisation en RAM/CPU de votre application. 


__________
__________

## Liens utiles 

#### Javascript

* [OpenClassroom - 1](https://openclassrooms.com/courses/tout-sur-le-javascript)
* [OpenClassroom - 2](https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript)
* [Developpez.com](http://javascript.developpez.com/cours/)
* [Codecademy](https://www.codecademy.com/tracks/javascript)

#### NodeJS

* [OpenClassroom](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js)
* [Developpez.com](http://nodejs.developpez.com/tutoriels/javascript/node-js-livre-debutant/)
* [Grafikart](http://www.grafikart.fr/tutoriels/nodejs/nodejs-socketio-tchat-366)
