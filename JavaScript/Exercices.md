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
```json
[
	{
		nb : 2, 
		value : 10
	},
	{
		nb : 5, 
		value : 20
	}
]
```

Nous souhaitons, sans modifier l'objet d'origine et sans créer de nouvelle variable, resortir un tableau avec `nb x value`. 
Votre valeur doit être `[20, 100]` à la fin. 

#### Exercice 6 ([aide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter))


Nous avons l'objet suivant : 
```json
[
	{
		nb : 2, 
		value : 10
	},
	{
		nb : 5, 
		value : 20
	}
]
```

Nous souhaitons, sans modifier l'objet d'origine et sans créer de nouvelle variable, ne faire ressortir dans un tableau, que les éléments avec une `value` supérieure à 15. 


