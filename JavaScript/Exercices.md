#### Exercice 1 ([aide](https://developer.mozilla.org/en-US/docs/Web/Events) & [aide](https://developer.mozilla.org/en-US/docs/Web/Events/keyup))

Nous avons le formulaire suivant : 
```html
<form> 
	<input type="text" name="name">
	<button type="submit">Valider</button>
</form>
```

Nous souhaitons afficher en console la valeur du input à chaque nouvelle lettre.


#### Exercice 2 ([aide](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert))


Nous avons le formulaire suivant : 

```html
<form> 
	<input type="text" name="name">
	<button type="submit">Valider</button>
</form>
```

Afficher une alerte si le formulaire est vide au moment de l'envoi du formulaire.

#### Exercice 3 

Nous avons le bouton suivant : 

```html
<button>Redirect</button>
```

Nous souhaitons rediriger l'utilisateur sur une autre page quand il clique sur ce bouton. 


#### Exercice 4  ([aide](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector))

Nous avons les boutons suivants : 

```html
<button class="not-redirect">Not redirect</button>
<button class="redirect">Redirect</button>
```

Nous souhaitons rediriger l'utilisateur sur une autre page, seulement lorsqu'il clique sur le bouton avec la classe `redirect`. 

#### Exercice 5 ([aide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map))


Nous avons l'objet suivant : 
```js
var json = [
	{
		nb : 2, 
		value : 10
	},
	{
		nb : 5, 
		value : 20
	}
];
```

Nous souhaitons, sans modifier l'objet d'origine et sans créer de nouvelle variable, resortir un tableau avec `nb x value`. 
Votre valeur doit être `[20, 100]` à la fin. 

#### Exercice 6 ([aide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter))


Nous avons l'objet suivant : 
```js
var json = [
	{
		nb : 2, 
		value : 10
	},
	{
		nb : 5, 
		value : 20
	}
];
```

Nous souhaitons, sans modifier l'objet d'origine et sans créer de nouvelle variable, ne faire ressortir dans un tableau, que les éléments avec une `value` supérieure à 15. 



#### Exercice 7 ([aide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce)) 


Nous avons le tableau suivant : 
```js

var students = [{
	name : "Bob", 
	exam : 4	
},{
	name : "Martin", 
	exam : 10	
},{
	name : "Jean", 
	exam : 8	
}];
```

Nous souhaitons, sans modifier l'objet d'origine, sans créer de nouvelle variable et sans utiliser de boucle, afficher la somme de toutes les notes.

__/!\\__ Vous devez faire un `map` avant votre `reduce` pour récupérer un tableau de valeurs __/!\\__



#### Exercice 8 ([aide](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/style)) 


Nous avons le formulaire suivant : 

```html
<form> 
	<input type="text" name="name">
	<button type="submit">Valider</button>
</form>
```

Passer la bordure du input en rouge si le formulaire est vide au moment de l'envoi.


#### Exercice 9 ([aide](https://developer.mozilla.org/fr/docs/Web/API/Element/classList) ) 

Nous avons le code suivant : 

```html
<style type="text/css">
	.un {
		height: 100px;
		width: 100px;
		background: red; 
	}
</style>
<div class="un"></div>
<button>Change</button>
```

Au premier clique sur le bouton, le JS doit retirer la classe `un` de la div et au clique suivant, la classe doit revenir.  


#### Exercice 10 ([aide](https://developer.mozilla.org/fr/docs/Web/API/Element/innertHTML) ) 

Nous avons le code suivant : 

```html
<span class="normal"></span>
<span class="append"></span>
<button>Add</button>
```

Au clique sur bouton, le JS doit écrire "coucou" à l'intérieur des span, cependant dans la span.append, le texte doit se rajouter à la suite du précédent. Par exemple après trois cliques, vous auriez : 

```html
<span class="normal">coucou</span>
<span class="append">coucoucoucoucoucou</span>
<button>Add</button>
```

#### Exercice 11 ([aide](https://developer.mozilla.org/fr/docs/AJAX/Premiers_pas) & [aide](https://openclassrooms.com/courses/ajax-et-l-echange-de-donnees-en-javascript/l-objet-xmlhttprequest-1)) 

En utilisant l'API de http://jsonplaceholder.typicode.com, récupérer la liste des articles (GET).

#### Exercice 12 ([aide](https://developer.mozilla.org/fr/docs/AJAX/Premiers_pas) & [aide](https://openclassrooms.com/courses/ajax-et-l-echange-de-donnees-en-javascript/l-objet-xmlhttprequest-1)) 

En utilisant l'API de http://jsonplaceholder.typicode.com, ajouter un article (POST).

#### Exercice 13 ([aide](https://developer.mozilla.org/fr/docs/Using_geolocation))

Afficher dans la page la longitude et latitude de l'utilisateur. 

#### Exercice 14 ([aide](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial))


Nous avons le code suivant : 

```html
<canvas width="300" height="300"></canvas>
```

Dessiner un rectangle dans ce canvas. 

#### Exercice 15 ([aide](https://developer.mozilla.org/fr/docs/Utilisation_des_web_workers))

Créer une boucle sans fin qui affiche à chaque tour un message _via_ un Worker. 

#### Exercice 16 ([aide](https://developer.mozilla.org/fr/docs/WebSockets) & [aide](https://developer.mozilla.org/fr/docs/Web/API/notification))

Implémenter un websocket sur l'adresse 'wss://echo.websocket.org/' puis : 

* Envoyer un message via le WS 
* Afficher _via_ une notification le résultat de la réponse 


#### Exercice 17 ([aide](https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file))


Nous avons le code suivant : 

```html
<form>
	<input type="file" name="file">
</form>

```

Grâce au input type file, afficher la taille du fichier et son type. 



