# NodeJS -- Exercices 

    
## Exercice 1 ([aide - console](https://nodejs.org/api/console.html))

Créer un code qui affiche `bonjour` en console.


## Exercice 2 ([aide - fs](https://nodejs.org/api/fs.html))

Grâce à la fonction `writeFile`, écrire `bonjour` dans un fichier s'appelant `test.html`.


## Exercice 3 ([aide - fs](https://nodejs.org/api/fs.html))

Grâce à la fonction `readFile`, lire le fichier `test.html` et afficher son résultat en console.


## Exercice 4 ([aide - fs](https://nodejs.org/api/fs.html))

Écrire sous forme de fonction (anonyme et nommée) le travail fait dans les exercices précédents. 


## Exercice 5 ([aide - http](https://nodejs.org/api/http.html))

Recopier ce code et le lancer en console. Que se passe-t-il ? 

```
var http = require('http');
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
server.listen(80);
console.log("Server running at http://127.0.0.1:80/");
```

## Exercice 6 

Installer le module [Request](https://github.com/request/request) et récupérer le code html de `google.com`.
 