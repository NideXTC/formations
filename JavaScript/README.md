               ___                       _____              _         _
              |_  |                     /  ___|            (_)       | |
     ______     | |  __ _ __   __  __ _ \ `--.   ___  _ __  _  _ __  | |_  ______
    |______|    | | / _` |\ \ / / / _` | `--. \ / __|| '__|| || '_ \ | __||______|
            /\__/ /| (_| | \ V / | (_| |/\__/ /| (__ | |   | || |_) || |_
            \____/  \__,_|  \_/   \__,_|\____/  \___||_|   |_|| .__/  \__|
                                                              | |
                                                              |_|


# Exercices - 0


Téléchargez le dossier [boilerplate](https://github.com/NideXTC/CoursYNov/blob/master/JavaScript/Boilerplate.zip?raw=true) pour la suite des exercices.

## Variables

#### Exercice 0.1

Comment modifier la déclaration des variables pour que le console.log retourne 4 ?

```
myVar = 4;

function titi(){
  myVar = 5;
}

titi();

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

Écrire un script qui affiche _"coucou"_ en console  toutes les secondes .

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

#### Exercice 4.5 ([aide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/match))

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

__________
__________

## Liens utiles

#### Javascript

* [OpenClassroom - 1](https://openclassrooms.com/courses/tout-sur-le-javascript)
* [OpenClassroom - 2](https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript)
* [Developpez.com](http://javascript.developpez.com/cours/)
* [Codecademy](https://www.codecademy.com/tracks/javascript)
