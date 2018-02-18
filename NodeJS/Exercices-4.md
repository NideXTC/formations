				             _   _           _           _  _____
				            | \ | |         | |         | |/ ____|
				      ______|  \| | ___   __| | ___     | | (___ ______
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |
				            |_| \_|\___/ \__,_|\___|\____/|_____/



# Exercices - 4

## Socket.IO

[Socket.IO](http://socket.io/) est un framework NodeJS qui va nous permettre de faire du temps réel grâce aux websockets. Il faudra donc qu'il soit disponible côté serveur & côté client. Nous souhaitons pour commencer, afficher le nombre de personnes connectées au site.


Commençons par le front. Nous allons utiliser le CDN de Socket.IO en front et nous allons rajouter jQuery. Nous allons donc modifier le fichier `app/views/layout.jade` par :

```
doctype html
html
  head
    meta(charset="UTF-8")
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body

    span.connected
      = 'Il y a actuellement '
      span.connected-number 0
      = ' personnes connectés'

    block content
  script(src='https://cdn.socket.io/socket.io-1.3.7.js')
  script(src='https://code.jquery.com/jquery-1.11.3.min.js')
  script(src='/javascripts/app.js')
```

Puis nous allons créer un fichier `public/javascripts/app.js` avec :

```
var socket = io(); // On se connecte au socket du serveur pour avoir les informations en temps réel

// Si le socket nous informe qu'il y a une notification qui se nomme UserState, il executera le callback.
socket.on('UserState', function (data) {
	// nous insérons dans la span la valeur envoyée par le socket
    $('.connected-number').text(data);
});
```

Passons côté serveur. En ligne de commande faire (dans votre dossier _morpion_) :

```
$ npm install socket.io --save
```
Le paramètre _--save_ permet de rajouter ce paquet dans le package.json, la prochaine fois que vous ferez un `npm install` Socket.IO sera donc téléchargé et installé.
Pour gagner en lisibilité dans notre code nous allons faire un fichier pour gérer les sockets, nous allons donc créer un dossier `/sockets` et dans ce dossier vous allez créer un fichier _Base.js_ avec :

```
module.exports = function(io) {
    io.on('connection', function (socket) {
            // On envoie le nombre de personnes actuellement sur le socket à tout le monde (sauf la personne qui vient de se connecter)
            socket.broadcast.emit('UserState', io.engine.clientsCount);
            // On envoie le nombre de personnes actuellement sur le socket à la personne qui vient de se connecter
            socket.emit('UserState', io.engine.clientsCount);

             socket.on('disconnect', function () {
              // On prévient tout le monde qu'une personne s'est deconnectée
                socket.broadcast.emit('UserState', io.engine.clientsCount);
            });
    });
};
```

Nous allons désormais modifier notre fichier `bin/www` pour que notre fonction `set` soit appelé dès qu'un client se connecte au site, pour cela il faut ajouter ces lignes dans votre fichier sous `const server = http.createServer(app);` :

```
const io = require('socket.io')(server);

// Nous créons une accès au socket
require('../app/sockets/Base')(io);
```

Lancez votre serveur via :

```
$ node bin/www
```

Puis lancez plusieurs fenêtres Chrome sur `http://localhost:3000`. Vous voyez le nombre se modifier en temps réel ? Vous avez donc désormais votre première application en temps réel ! \o/

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
