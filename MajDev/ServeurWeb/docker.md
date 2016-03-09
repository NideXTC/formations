<div align="center">
    <img src="https://camo.githubusercontent.com/14b97ba4a1327c0db2200f3892788fd873a1ce20/687474703a2f2f626c6f672e70687573696f6e2e6e6c2f77702d636f6e74656e742f75706c6f6164732f323031332f31312f646f636b65722e706e67" >
</div>


# Docker

## Installation

Il va falloir tout d'abord installer [Docker Toolbox](https://www.docker.com/toolbox) puis lancer le terminal quickstart.



## Mise en place d'un environnement Node

Nous allons partir d'un script NodeJS simple :

```
var app = require('express')();

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(3000);
```

avec le package.json :

```
{
  "name": "dockerNodejs",
  "private": true,
  "version": "0.0.1",
  "dependencies": {
    "express": "latest"
  }
}
```


###  Dockerfile from scratch

Dans un fichier `Dockerfile` :


```
FROM debian:jessie
RUN apt-get update -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
COPY package.json /src/package.json
RUN cd /src
RUN npm install --production
COPY . /src
EXPOSE 3000
CMD ["node", "/src/index.js"]
```

###  Dockerfile depuis le hub

Dans un fichier `Dockerfile` :


```
FROM node:5-onbuild
COPY package.json /src/package.json
RUN cd /src
RUN npm install --production
COPY . /src
EXPOSE 3000
CMD ["node", "/src/index.js"]
```



# Construction du container

Pour construire le container :

```
 docker build -t test/node .
```

Puis pour le lancer :

```
docker run -p 80:3000 -d test/node
```

La commande `-d` va permettre de faire tourner le container en background et la commande `-p` permet le forward de port.


### Lister les containers


```
docker ps
```

### Arrêter le container

Pour arrêter le container il suffira de faire :

```
docker stop [id du container]
```

Si cela ne fonctionne pas, on peut envoyer un SIGKILL avec :

```
docker kill [id du container]
```


### Se connecter sur le container

Pour se connecter en ssh sur le container

```
docker exec -i -t [id du container] bash
```

### Pour garder les modifications sur le container

```
docker commit [id du container] [nouveau nom]
```

Pour voir les images dispo :

```
docker images 
```