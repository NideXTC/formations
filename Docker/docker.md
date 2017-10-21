# Docker 

### docker 101  

* Tester le whalesay `docker run docker/whalesay cowsay boo`

### Dockerfile 

* Créer un container avec un serveur web nginx _from scratch_ 
* Copier un fichier html depuis votre ordinateur vers le container distant  [aide](https://docs.docker.com/engine/reference/commandline/cp/)
* Ajouter un volume à ce container (ce volume doit être stocké dans le `/var/www/html`)
* Visualiser les modifications _via_ un diff [aide](https://docs.docker.com/engine/reference/commandline/diff/)
* Faire un commit de vos modifications [aide](https://docs.docker.com/engine/reference/commandline/commit/)
* Exporter ce container [aide](https://docs.docker.com/engine/reference/commandline/export/)

### Docker Hub 

* Créer un blog Ghost en utilisant le repo du hub [Ghost](https://hub.docker.com/_/ghost/)
* Créer un compte sur docker.com 
* Uploader son image _via_ `docker push`  [aide](https://docs.docker.com/engine/reference/commandline/push/) 


### Docker compose

* Mise en place d'un lamp à partir de 3 conteneurs: php, Mysql, nginx

### Docker API 

_Via_ un CURL : 
* Récupérer la liste des containers [aide](https://docs.docker.com/engine/api/get-started/#list-and-manage-containers)
* Récupérer la liste des images [aide](https://docs.docker.com/engine/api/get-started/#list-all-images)
* Démarrer le premier container [aide](https://docs.docker.com/engine/api/get-started/#run-a-container)

* Ensuite faites le avec le language de votre choix. 


### Docker network [aide](https://docs.docker.com/engine/userguide/networking/work-with-networks/#basic-container-networking-example)


* Créer un container 
* Créer un réseau en pont avec un sous-réseau en 172.0.0.1/16
* Ajouter le container au réseau 
* Inspectez le réseau de votre container 


### Docker Swarm 


###### Mac

```
docker-machine create --engine-env 'DOCKER_OPTS="-H unix:///var/run/docker.sock"' --driver virtualbox leader1 

docker-machine create --engine-env 'DOCKER_OPTS="-H unix:///var/run/docker.sock"' --driver virtualbox worker1

docker-machine create --engine-env 'DOCKER_OPTS="-H unix:///var/run/docker.sock"' --driver virtualbox worker2
```

* Créer un service avec Wordpress / MariaDB & PHPMyADmin déployé sur toutes les nodes  Windows 

[Pour Windows](https://docs.docker.com/machine/drivers/hyper-v/#2-set-up-a-new-external-network-switch-optional)


```
docker-machine create --engine-env 'DOCKER_OPTS="-H unix:///var/run/docker.sock"' --driver virtualbox leader1 

docker-machine create --engine-env 'DOCKER_OPTS="-H unix:///var/run/docker.sock"' --driver virtualbox worker1

docker-machine create --engine-env 'DOCKER_OPTS="-H unix:///var/run/docker.sock"' --driver virtualbox worker2
```


```
docker-machine ip leader1
docker-machine ssh leader1 
```

```
swarm init --advertise-addr [ip leader1]
```	

---- 


```
docker-machine ip worker1
docker-machine ssh worker1 
docker swarm join --token [token] [ip leader1]:2377
```

```
docker-machine ip worker2
docker-machine ssh worker2 
docker swarm join --token [token] [ip leader1]:2377
```


----


```
docker-machine ssh leader1 
docker node ls 

vi docker-compose.yml 
docker stack deploy --compose-file docker-compose.yml test

# Pour utiliser le swarm cloud 
docker run -ti --rm -v /var/run/docker.sock:/var/run/docker.sock dockercloud/registration
```


* Connexion depuis kitematic pour voir le fonctionnement des containers 

* Créer un service avec Wordpress / MariaDB & PHPMyADmin déployé sur toutes les nodes 

