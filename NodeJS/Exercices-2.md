				             _   _           _           _  _____       
				            | \ | |         | |         | |/ ____|      
				      ______|  \| | ___   __| | ___     | | (___ ______ 
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |      
				            |_| \_|\___/ \__,_|\___|\____/|_____/       
                                                    
                                                    
                                                    
# Exercices - 2

## Views

Par convention nous utiliserons le nom du controlleurs en minuscule pour le nom du dossier. 
Notre prochain controlleur s'appelle _Users.js_, nous allons donc créer le dossier _users_ dans `app/views`. Je rappelle que la syntaxe pour les fichiers est en [Jade](http://jade-lang.com/). 

Créer ensuite un fichier _index.jade_ dans `app/views/users` avec : 

```
// Nous allons chercher le layout dans le dossier parent
extends ../layout
// nous déclarons le block qui sera inséré dans le layout
block content 
	// Nous affichons une variable title, le = nous permet d'échapper le caractère
	h1=title 
```

## Controllers 

 La création d'un objet est simplement un JSON, un simple {} est donc un objet. Nous allons maintenant créer un objet pour gérer nos utilisateurs. 

 Par convention un controlleur est toujours avec une majuscule et au pluriel. 

 Dans le dossier `app/controllers`, faire un fichier _Users.js_ avec : 

```
var Users = {
	/**
	  * @param req La requête entrante
	  * @param res Ce qui est renvoyé au navigateur
	  */
    index: function(req, res){
      res.render('users/index', {"title":"Coucou"}); 
      // Nous allons donc appeler le fichier qui est dans app/views/users/index avec un tableau de valeurs
    },
    create: function (req, res) { 

    },
    update: function (req, res) { 

    },
    delete: function (req, res) { 

    }
};

module.exports = Users; // L'exportation permet de rendre disponible ce fichier ailleurs grâce au require()
```

## Routing 

NodeJS nous permet de gérer plusieurs verbes HTTP, en effet, HTTP ne contient pas seulement GET & POST. 

Nous utiliserons donc : 
* le _GET_ pour récuperer une information 
* le _POST_ pour créer une information 
* le _PUT_ pour modifier une information 
* le _DELETE_ pour supprimer une information 

Souvenez-vous dans le fichier `app.js` à la racine nous avions : 

```
app.use('/', routes);
app.use('/users', users);
```

Notre routeur _users_ sera donc appelé quand notre URL sera `monsite.com/users` 

Nous allons désormais modifier notre fichier `app/routes/users.js` avec : 

```
var express = require('express');
var router = express.Router();

var users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement

/* GET la liste des utilisateurs */
router.get('/', users.index);

/* POST la création d'un nouvel utilisateur */
router.post('/', users.create);

/* GET la liste des utilisateurs */
router.put('/:id(\\d+)', users.update); 

/* GET la liste des utilisateurs */
router.delete('/:id(\\d+)', users.delete);

module.exports = router;
```

Ici le `:id(\\d+)` permettra de récupérer la valeur passé en url dans une variable _id_, le `(\\d+)` est une expression régulière pour dire qu'on ne veut que des chiffres. Si vous ne savez pas ce qu'est une expression régulière je vous invite à regarder ce memento : [ici](https://openclassrooms.com/courses/concevez-votre-site-web-avec-php-et-mysql/memento-des-expressions-regulieres).

#### Vous avez votre première architecture MVC.

__________
__________

## Liens utiles 

#### NodeJS

* [OpenClassroom](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js)
* [Developpez.com](http://nodejs.developpez.com/tutoriels/javascript/node-js-livre-debutant/)
* [Grafikart](http://www.grafikart.fr/tutoriels/nodejs/nodejs-socketio-tchat-366)

#### Javascript

* [Codecademy](https://www.codecademy.com/tracks/javascript)
* [OpenClassroom - 1](https://openclassrooms.com/courses/tout-sur-le-javascript)
* [OpenClassroom - 2](https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript)
* [Developpez.com](http://javascript.developpez.com/cours/)
* [Developpez.com](http://javascript.developpez.com/cours/)

#### jQuery

* [CodeSchool](https://www.codeschool.com/courses/try-jquery)
* [Codecademy](https://www.codecademy.com/tracks/jquery)
