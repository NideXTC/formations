				             _   _           _           _  _____       
				            | \ | |         | |         | |/ ____|      
				      ______|  \| | ___   __| | ___     | | (___ ______ 
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |      
				            |_| \_|\___/ \__,_|\___|\____/|_____/       
                                                    
                                                    
                                                    
# Exercices - 1

Avant de commencer, faites un dossier _NodeJS_, tout votre travail se trouvera dedans. NodeJS n'a pas besoin d'être à un emplacement spécifique sur votre ordinateur, vous pouvez donc placer ce dossier ou vous le souhaitez.

Par convention lorsque vous verrez _$_ dans les exercices, la ligne est à jouer en ligne de commande.

## Mettre en place un serveur NodeJS

 Faites un dossier _test\_vanilla_ puis dans un fichier _app.js_ mettre le code suivant :

```
var http = require('http');
var server = http.createServer(function (request, response) {
response.writeHead(200, {"Content-Type": "text/plain"});
response.end("Hello World\n");
});
server.listen(80); // Le serveur va donc écouter sur le port 80
console.log("Server running at http://127.0.0.1:80/");
```

Rentrez dans votre dossier _test\_vanilla_ en ligne de commande, puis faites la commande  : 

```
$ node app.js
```

Pour voir si votre serveur fonctionne bien, accédez à l'url _127.0.0.1_ depuis votre navigateur. 
Vous voyez bien _Hello World_ ? 

....

Vous venez de créer votre premier serveur sur NodeJS ! \o/

## Express 

Nous allons désormais mettre en place le framework. Faites un dossier _test\_express_ puis rentrez dans ce dossier en ligne de commande, puis faites la commande : 

```
$ npm install express
```

Dans ce dossier faites un fichier _app.js_ avec comme code : 

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

Rentrez dans votre dossier _test\_express_ en ligne de commande, puis faites la commande  : 

```
$ node app.js
```

Pour voir si votre serveur fonctionne bien, accédez à l'url _127.0.0.1:3000_ depuis votre navigateur. 

## Express generator

Pour les commandes c'est [ici](http://expressjs.com/starter/generator.html).

Revenez dans votre dossier _NodeJS_, puis accédez à ce dossier en ligne de commande et faites : 

```
$ npm install express-generator -g
```
Vous avez maintenant accès à votre générateur de site en ligne de n'importe où sur votre ordinateur, en effet le _-g_ signifie _global_, donc utilisable partout.

Vous allez maintenant faire : 

```
$ express morpion 
```
Votre dossier s'est bien fait ? Prenez le temps de regarder un peu son contenu. Il est composé de la façon suivante : 

```
.
├── app.js // Importe vos paquets installés dans le code et initialise les variables
├── bin
│   └── www // Permet de lancer le serveur web
├── package.json // Liste les paquets à installer
├── public // Toutes vos ressources accessibles en web
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes // Permet de gérer les redirections en fonction de l'url
│   ├── index.js
│   └── users.js
└── views // Votre dossier "HTML"
    ├── error.jade
    ├── index.jade
    └── layout.jade
```


J'ai précisé "HTML" car le framework Express n'utilise pas directement du HTML, il passse par des fichiers _Jade_. 
Je vous laisse découvrir la syntax ici : [Jade](http://jade-lang.com/).

Pourquoi utiliser un moteur de template ? Car il va permettre de minifier le fichier, de créer des templates, d'améliorer la sécurité et d'ajouter dynamiquement des variables. Il faut savoir que la plupart des frameworks utilisent des moteurs de template, par exemple Symfony utilise [Twig](http://twig.sensiolabs.org/) et Laravel utilise [Blade](http://laravel.com/docs/5.1/blade). 


Vous voulez tester votre site ? Il va d'abord falloir installer les dépendances listés dans le package.json. Pour cela il faut aller dans le dossier _morpion_ et faire (ça peut être long):

```
$ npm install  
```

Désormais vous pouvez lancer votre site via : 

```
$ node bin/www 
```

Puis accédez au site via votre navigateur à l'url _127.0.0.1:3000_.


## Passons au MVC 

Qu'est ce qu'un MVC ? C'est un patron de conception, c'est à dire une façon d'organiser son code avec les meilleures pratiques. 

MVC est l'abréviation de Model/View/Controller, les _models_ vont gérer tout ce qui a à voir avec la base de données, les _views_ vont gérer tout l'aspect HTML et les _controllers_ vont faire la liaison entre les _models_ et les _views_. C'est sûrement très abstrait pour vous pour l'instant, mais ça deviendra naturel avec le temps. Si vous voulez en savoir plus dès maintenant je vous laisse voir mon bon ami [Wikipedia](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur).

Nous allons donc organiser notre code un peu différement. 

Créez un dossier _app/_ à la racine, puis créez le dossier _controllers_, _models_ et _resources_.
Déplacez le dossier _routes_ et _views_ dans le dossier _app/_. Vous devriez avoir désormais avoir cette architecture : 


```
.
├── app.js
├── app
| 	└── controllers
| 	└── models
| 	└── resources
| 	└── views 
|	|    ├── error.jade
|	|    ├── index.jade
|	|    └── layout.jade
|	└── routes 
│   	├── index.js
│   	└── users.js
├── bin
│   └── www 
├── package.json 
└── public 
   ├── images
   ├── javascripts
   └── stylesheets
       └── style.css
```

Notre architecture a changé, il faut donc remplacer des parties dans le fichier _app.js_ :

```
var routes = require('./app/routes/index');
var users = require('./app/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
```

#### Vous avez désormais un framework complet et fonctionnel. 

En arrivant ici votre code devrait ressembler à ça : [github](https://github.com/NideXTC/CoursYNov/tree/3cb9f6565a977f0e12f2f279fab10de25a9eabbf/NodeJS/morpion)

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

#### jQuery

* [CodeSchool](https://www.codeschool.com/courses/try-jquery)
* [Codecademy](https://www.codecademy.com/tracks/jquery)
