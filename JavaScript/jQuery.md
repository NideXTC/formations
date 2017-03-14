# jQuery 

#### Exercice 1 ([aide](https://api.jquery.com/keyup/) & [aide](https://api.jquery.com/val/))

Nous avons le formulaire suivant : 
```html
<form> 
	<input type="text" name="name">
	<button type="submit">Valider</button>
</form>
```

Nous souhaitons afficher en console la valeur du input à chaque nouvelle lettre.


#### Exercice 2 ([aide](https://api.jquery.com/submit/))


Nous avons le formulaire suivant : 

```html
<form> 
	<input type="text" name="name">
	<button type="submit">Valider</button>
</form>
```

Afficher une alerte si le formulaire est vide au moment de l'envoi du formulaire.



#### Exercice 3 ([aide](http://api.jquery.com/css/)) 


Nous avons le formulaire suivant : 

```html
<form> 
	<input type="text" name="name">
	<button type="submit">Valider</button>
</form>
```

Passer la bordure du input en rouge si le formulaire est vide au moment de l'envoi.


#### Exercice 4 ([aide](http://api.jquery.com/toggleClass/) ) 

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


#### Exercice 5 ([aide](http://api.jquery.com/html/) & [aide](http://api.jquery.com/append/)) 

Nous avons le code suivant : 

```html
<span class="normal"></span>
<span class="append"></span>
<button>Add</button>
```

Au clique sur bouton, le JS doit ajouter "coucou" à l'intérieur des span, cependant dans la span.append, le texte doit se rajouter à la suite du précédent.   

#### Exercice 6 ([aide](http://api.jquery.com/jQuery.ajax/) & [aide](http://api.jquery.com/jQuery.get/)) 

En utilisant l'API de http://jsonplaceholder.typicode.com, récupérer la liste des articles (GET).

#### Exercice 7 ([aide](http://api.jquery.com/jQuery.ajax/) & [aide](http://api.jquery.com/jQuery.post/)) 

En utilisant l'API de http://jsonplaceholder.typicode.com, ajouter un article (POST).


#### Exercice 8 ([aide](http://api.jquery.com/slideToggle/))


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

Au premier clique sur le bouton, le carré doit se plier vers le haut, au second clique, le carré doit se déplier .  

#### Exercice 9 ([aide](http://api.jquery.com/fadeToggle/))


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

Au premier clique sur le bouton, le carré doit disparaitre progressivement, au second clique, le carré doit réapparaitre progressivement.  
