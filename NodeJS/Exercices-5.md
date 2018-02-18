				             _   _           _           _  _____
				            | \ | |         | |         | |/ ____|
				      ______|  \| | ___   __| | ___     | | (___ ______
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |
				            |_| \_|\___/ \__,_|\___|\____/|_____/



# Exercices - 5

## Sequelize

### Installation

[Sequelize](http://sequelizejs.com) est ORM pour NodeJS, il gère parfaitement les migrations et les seeds, il est compatible avec un grand nombre de BDD et est optimisé pour ExpressJS.


Pour commencer, il est préférable de passer par l'outil en ligne de commande pour gérer notre installation, pour cela il est nécessaire d'installer `sequelize-cli`, de plus nous allons travailler avec SQLite, il faudra donc installer le connecteur natif.

En ligne de commande à l'intérieur de votre projet :

```
npm install --save sequelize@3 sqlite3
npm install sequelize-cli -g
```

puis faire :

```
sequelize init
```

vous avez désormais de nouveau dossiers, il y a `models`, `seeders`, `migrations` ; de plus nous avons aussi un fichier `index.js` à l'intérieur du dosssier `models`. Ce fichier nous servira de lien avec tous nos modèles, mais nous verrons ça par la suite.



### Création d'un model

Nous allons désormais utiliser les commandes de [Sequelize-cli](https://github.com/sequelize/cli) pour générer notre modèle, tant que nous n'avons pas lancé de migration, aucune BDD ne sera créée.

Nous allons créer une voiture, pour cela en ligne de commande faire :

```
sequelize model:create --name Car --attributes "brand:string, km:integer"
```

Votre modèle est disponible dans `/models/car.js` et devrait ressembler à ça :

```
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define('Car', {
    brand: DataTypes.STRING,
    km: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Car;
};
```

### Gestion de la configuration

Nous avons actuellement dans le fichier `/config/config.json` trois configurations différentes, par défaut lors du lancement de l'application, l'environnement par défaut est `development`. Votre fichier est pour l'instant comme cela :

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Nous allons le modifier pour avoir une base SQLite en local pour nos différents tests, pour cela nous allons modifier la configuration de `development` ainsi :

```
{
  "development": {
	"dialect": "sqlite",
	"storage": "./db/database.sqlite"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

__\/!\  Pensez à créer le dossier `db`  /!\\__

### Migration

Maintenant que vous avez créé votre modèle et géré votre configuration, il est temps de lancer la migration, pour cela, il suffit de faire :

```
sequelize db:migrate
```

Vous devriez avoir un fichier `database.sqlite` dans votre dossier `db`.


### Utilisation

Pour utiliser sequelize il est obligatoire de lancer là synchronisation à la BDD avant le lancer le serveur web, pour cela dans votre fichier `bin/www`, il est nécessaire de remplacer

```
server.listen(port);
```

par

```
const models = require("../models");
models.sequelize.sync().then(function () {
  server.listen(port);
});
```

Par la suite dans votre controlleur vous pourrez avoir par exemple :

```
'use strict';

const models  = require('../models');

const Cars = {
    index: function (req, res) {
         models
            .Car
            .findAll()
            .then(function(cars) {
                res.render('index', {
                  cars: cars
                });
          });

    }
};

module.exports = Cars;

```

Vous pourrez ensuite travailler avec votre instance de modèle, pour cela vous avez accès à un grand nombre de fonctions, par exemple :

* [chercher](http://docs.sequelizejs.com/en/latest/docs/querying/)
* [enregistrer](http://docs.sequelizejs.com/en/latest/docs/instances/#creating-persistent-instances)
* [modifier](http://docs.sequelizejs.com/en/latest/docs/instances/#updating-saving-persisting-an-instance)
* [supprimer](http://docs.sequelizejs.com/en/latest/docs/instances/#destroying-deleting-persistent-instances)

### Associations

Si vous souhaitez gérer les associations un exemple est disponible [ici](http://docs.sequelizejs.com/en/1.7.0/articles/express/#modelsuserjs) et la doc est disponible [ici](http://docs.sequelizejs.com/en/latest/docs/associations/).

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
