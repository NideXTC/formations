				             _   _           _           _  _____       
				            | \ | |         | |         | |/ ____|      
				      ______|  \| | ___   __| | ___     | | (___ ______ 
				     |______| . ` |/ _ \ / _` |/ _ \_   | |\___ \______|
				            | |\  | (_) | (_| |  __/ |__| |____) |      
				            |_| \_|\___/ \__,_|\___|\____/|_____/       
                                                    
                                                    
                                                    
# Exercices - 6

## Tests unitaires

Les tests unitaires nous permettent de vérifier que chaque partie du programme fonctionne et ainsi éviter une régression. 


### Mocha 

Mocha est un framework de tests, nous allons l'installer en global pour nous permettre de voir facilement nos règles dans le terminal, _via_ : 

```
npm install -g mocha 
```

### Chai 

Pour notre projet nous allons tester les fonctions mais aussi l'accès à l'API, pour cela nous allons passer par une bibliothèque d'assertions. Nous allons installer en _devDependencies_ chai et chai-http _via_ : 

```
npm install chai chai-http --save-dev 
```


### Tests 

Nous allons faire un dossier `test` à la racine de notre site et faire un fichier `user.js` à l'intérieur.

Nous allons commencer par décrire ce que nous voulons tester : 

```
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', _ => {
    it('should list all users on /users GET');
});
```

Nous allons devoir faire une petite modification sur notre fichier `bin/www` en rajoutant à la fin du fichier un exports _via_ : 

```
module.exports = app;
```


#### GET 

Puis nous allons commencer à écrire ce que nous attendons de notre API : 

```
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('GET /users', _ => {
    it('should list all users on /users GET', done => {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
```

Vous devriez avoir un résultat ressemblant à : 

```
  GET /users
GET /users 200 369.424 ms - 903
    ✓ should list all users on /users GET (397ms)


  1 passing (422ms)
```

#### POST 

```
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('GET /users ', _ => {
    it('should list all users on /users GET', done => {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('POST /users ', _ => {

    it('it should NOT POST a user', done => {
        const user = {};

        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                /*res.body.should.be.a('object');
                 res.body.user.should.have.property('name');
                 res.body.user.should.have.property('firstname');
                 res.body.user.should.have.property('email');
                 res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });

    it('it should POST a user', done => {
        const user = {
            name: "Bob",
            firstname: "Josh",
            email: "bob.josh@aol.fr"
        };

        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                /*res.body.should.be.a('object');
                res.body.user.should.have.property('name');
                res.body.user.should.have.property('firstname');
                res.body.user.should.have.property('email');
                res.body.should.have.property('message').eql('User successfully added!');*/
                done();
            });
    });
});
```

La partie en commentaire montre qu'il est possible de récupérer le corps du texte renvoyé (ici un json). 


### Npm test

pour simplifier nos tests nous allons rajouter une ligne pour les tests dans notre package.json : 

```
 "scripts": {
    "start": "node ./bin/www",
    "test": "mocha test/"
  };
```

nous pouvons désormais lancer nos tests en faisant  

```
npm test
```

__Si vous souhaitez pousser le test d'API plus loin, vous pouvez regarder du côté de [Frisby](http://frisbyjs.com/). Si vous souhaitez tester les différents éléments dans votre navigateur, regardez du côté de [CasperJS](http://casperjs.org/)__

Pour plus de détails sur les tests avec Mocha/Chai je vous conseille l'artiche de [Scotch.io](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai).


### Intégration continue 

Il est possible d'avoir des tests à chaque push sur Git grâce à l'intégration continue, plusieurs sites et programmes proposent ces solutions : 

* [Jenkins](https://jenkins.io/)
* [GitlabCI](https://about.gitlab.com/gitlab-ci/)

* [Travis](https://travis-ci.org/)
* [CircleCI](https://circleci.com/)
* [SemaphoreCI](https://semaphoreci.com/)
* [Bitbucket Pipelins](https://bitbucket.org/product/features/pipelines)

### TDD (Test Driven Development) 

Le TDD est une technique de travail ou l'écriture des tests se fait avec l'écriture du code ; pour plus d'informations, je vous invite à lire ceci : [Les tests unitaires](https://openclassrooms.com/courses/programmez-en-oriente-objet-avec-c/les-tests-unitaires-5).

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
