				             _   _           _           _  _____       
				            | \ | |         | |         | |/ ____|      
				      ______|  \| | ___   __| | ___     | | (___ ______ 
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |      
				            |_| \_|\___/ \__,_|\___|\____/|_____/       
                                                    
                                                    
                                                    
# Exercices - 3

## MongoDB

Nous allons maintenant installer la base de données NoSQL MongoDB. 

Pour cela, sur : 
* Windows -> [ici](https://www.mongodb.org/downloads?_ga=1.106157894.453929076.1445029065#production)
* Mac -> via homebrew `brew install mongodb` / [manuellement](http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/?_ga=1.38942950.453929076.1445029065#install-mongodb-manually)
* Linux -> [ici](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb)

Pour lancer le serveur MongoDB, il faut faire sur : 
* Mac : `$ mongod`
* Linux : `$ service mongod start`
* Windows : Lancer le fichier mongod.exe

Attention, sur windows, si MongoDB vous prévient qu'il n'y a pas de dossier `/data/db` il faut jouer la commande `mongod --dbpath "c://data/db"` dans le dossier MongoDB. 

## Mongoose

Nous allons désormais passer aux modèles, pour cela nous allons nous servir de Mongoose. Il faut donc l'installer via : 

```
$ npm install mongoose --save
```

Nous allons ensuite créer notre modèle dans `app/models/User.js` avec : 

```
var mongoose = require('mongoose'), // Nous appelons le module mongoose
    Schema = mongoose.Schema; // Nous créons un schéma mongoose


var schema = new Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

// Nous exportons notre modèle avec comme nom "User", 'users' sera le nom de notre "table"
exports.model = mongoose.model('User', schema, 'users'); 
```

Ce schéma nous donne accès à une liste de [fonctions](http://mongoosejs.com/docs/api.html) pour accéder aux informations contenues dans la base de données. 

Nous devons, pour commencer, mettre en place la connection à notre base dans le fichier `app.js`, en fin de fichier il faut donc rajouter : 

```
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/morpion', function(err) {
  if (err) { throw err; }
}); 

module.exports = app;
``` 

**/!\ Pensez bien à démarrer votre serveur MongoDB avant de lancer NodeJS sinon il renverra une erreur /!\**

Nous allons désormais pouvoir nous servir de ces fonctions dans notre controlleur _Users.js_.

```
require('../models/User');

var mongoose = require('mongoose'),
    User = mongoose.model('User');


var Users = {
    index: function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;

            // object of all the users
            console.log(users);
        });

        res.render('users/index', {
            title: 'home',
            active: 'account'
        });
    },
    create: function (req, res) {

        var u = new User({
            name: req.body.name,
            firstName: req.body.firstname,
            email: req.body.email
        });

        u.save(function (err) {
            if (err) {
                console.log('User inserted');
            }
        });

        res.end();
    },
    update: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // change the users location
            user.name = 'Josay';

            // save the user
            user.save(function (err) {
                if (err) throw err;

                console.log('User successfully updated!');
            });

        });

        res.end();
    },
    delete: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // delete him
            user.remove(function (err) {
                if (err) throw err;

                console.log('User successfully deleted!');
            });
        });

        res.end();
    }
};

module.exports = Users;
```

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
