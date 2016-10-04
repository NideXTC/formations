				             _   _           _           _  _____       
				            | \ | |         | |         | |/ ____|      
				      ______|  \| | ___   __| | ___     | | (___ ______ 
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |      
				            |_| \_|\___/ \__,_|\___|\____/|_____/       
                                                    
                                                    
                                                    
# Exercices - 7

## Déploiement

Il existe plusieurs outils pour déployer un projet ([supervisor](https://github.com/petruisfan/node-supervisor), [forever](https://github.com/foreverjs/forever)), ici nous allons nous concentrer sur [PM2](https://github.com/Unitech/pm2).

### PM2

#### Installation 

Nous allons installer PM2 en global _via_ : 

```
npm install pm2 -g
```

#### Lancement 

Vous pouvez lancer votre application en faisant simplement : 

```
pm2 start bin/www 
```

ou bien la faire démarer sur cluster, ce qui vous permettra de rajouter des clusters à chaud, de recharger l'application instantanément et d'avoir du load balancing: 

```
pm2 start bin/www -i 0 #démarre avec le nombre max de processeurs sur l'ordinateur 

pm2 start bin/www -i 2 #démarre sur 2 processeurs
```

Vous pouvez aussi faire redémarrer le serveur à chaque modification et lui donner un nom en faisant : 

```
pm2 start bin/www --watch --name="site"
```

#### Monitoring 

Il est possible 

* de voir l'intégralité des logs _via_ : 

```
pm2 logs 
```

* Il est possible de voir les processus en cours _via_ : 

```
pm2 list
```

* Il est possible de voir l'utilisation en RAM _via_ : 

```
pm2 monit 
```

Il est aussi possible moniter son site directement _via_ une interface web grâce à [KeyMetrics.io](https://keymetrics.io/) en ajoutant sa clé PM2. 


![keymetrics](https://keymetrics.io/assets/images/application-demo.png)


### Hébergement & BDD  

* [Heroku](https://www.heroku.com/)
* [Openshift](https://www.openshift.com/)
* [Mongolab](https://mlab.com/) pour une base MongoDB
* Un hébergement permettant de monter un Docker

### Sécurité 

#### Helmet 

[Helmet](https://github.com/helmetjs/helmet) permet de sécuriser le site _via_ les headers. Il suffit de l'installer _via_ : 

```
npm install helmet --save
```

puis dans notre fichier `app.js` : 

```
const express = require('express');
const helmet = require('helmet');

var app = express();

app.use(helmet());
```

#### Csurf

[Csurf](https://github.com/expressjs/csurf) permet de gérer les failles CSRF, pour cela il faut l'installer _via_ : 

```
npm install csurf --save
```

puis dans notre fichier `app.js` : 

```
const csrf = require('csurf');

app.use(csrf());

app.use(function (req, res, next) {
    res.locals._csrf = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});
```

Il n'y aura par la suite qu'à rajouter un input:hidden avec la value contenue dans la variable `_csrf` dans les formulaires de nos fichiers de vues : 

```
 form(action="/toto" method="POST")
 	# La variable _csrf est automatiquement envoyée au fichier de vue
    input(name="_csrf" type="hidden" value="#{_csrf}")
    button(type="submit") envoyer
```

#### Nsp 

[NodeSecurity.io](https://nodesecurity.io/) est un projet visant à améliorer la sécurité sur les sites en node. Ils proposent des outils comme [nsp](https://nodesecurity.io/opensource) et [nsp Live](https://nodesecurity.io/services). 

Nous allons utiliser `nsp`, pour l'installer il est nécessaire de le faire en global _via_ : 
```
npm install -g nsp 
```

puis à l'intérieur de votre projet, faire : 
```
nsp check
```

Enjoy ;) 
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
