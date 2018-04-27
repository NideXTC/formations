# Exercices 1 - Création d'un composant ([AIDE](https://reactjs.org/docs/components-and-props.html#functional-and-class-components))


La création d'un composant est assez simple, en effet il suffit de créer une classe qui étend la classe `React.Component`.
Elle ressemblerait donc à :

```
import React, {Component} from 'react';

class MonComposant extends Component {
  render() {
    return(<div> nouveau composant </div>);
  }
}
```

La syntaxe dans le return n'est pas du HTML, mais du [JSX](https://reactjs.org/docs/introducing-jsx.html), le JSX est une syntaxe qui nous simplifie l'écriture du code.
Il est important de toujours mettre une balise JSX qui englobe tous les éléments, imaginons que nous ayons :

```
import React, {Component} from 'react';

class MonComposant extends Component {
  render() {
    return(
      <div> Un </dv>
      <div> Deux </div>
      );
  }
}
```

**Ce code va retouner une erreur !**

Il faudrait dans notre cas avoir :

```
import React, {Component} from 'react';

class MonComposant extends Component {
  render() {
    return(
      <div>
        <div> Un </dv>
        <div> Deux </div>
      </div>
      );
  }
}
```

----

Si nous souhaitons désormais utiliser notre composant, il suffit de l'importer et d'utiliser la balise JSX. Par exemple :

```
import React, {Component} from 'react';
import MonComposant from './MonComposant';

class App extends Component {
  render() {
    return(
      <div>
        <MonComposant />
      </div>
      );
  }
}
```

## TODO :

Créer un deuxième `<Student>` qui affichera `Bonjour Toi !` et l'ajouter dans le composant `<App>` de base.
Pensez bien à faire l'import de ce nouveau composant dans votre fichier `App.js`



# Exercices 2 - Passer des propriétés ([AIDE](https://reactjs.org/tutorial/tutorial.html#passing-data-through-props))


Il est possible de créer des propriétés sur notre nouveau composant, de la même façon que la balise `<img />` a une propriété `src=""`, pour cela, au moment de l'appel, il sera possible d'avoir quelque chose comme :

```
import React, {Component} from 'react';
import MonComposant from './MonComposant';

class App extends Component {
  render() {
    return(
      <div>
        <MonComposant maprop="texte" />
      </div>
      );
  }
}
```

Il sera par la suite possible de récupérer le contenu de la propriété dans `this.props.[nom de la propriété]`, ce qui pourrait donner :

```
import React, {Component} from 'react';

class MonComposant extends Component {
  render() {
    return(
      <div>
        {this.props.maprop}
      </div>
      );
  }
}
```

## TODO :

En reprenant votre exercice précédent, vous allez désormais permettre d'ajouter un prénom dans l'appel du composant. Votre appel de composant sera donc sous la forme `<Student name="Alexis">`et devra afficher `Bonjour Alexis !`.

# Exercice 3 - Gérer les événements ([AIDE](https://reactjs.org/docs/handling-events.html))


Il est possible de récupérer des événements sur les composants, de la même façon qu'en javascript classique, par exemple avec `onChange`, `onSubmit`, `onClick` ...
Il sera cependant nécessaire de lier l'événement avec une fonction _via_ un `bind`, par exemple :

```
import React, {Component} from 'react';

class MonComposant extends Component {

  fonctionAuClic() {
    console.log('clic');
  }

  render() {
    return(
      <div onClick={this.fonctionAuClic.bind(this)}>
        {this.props.maprop}
      </div>
      );
  }
}
```

Il est aussi possible de faire autrement :

```
import React, {Component} from 'react';

class MonComposant extends Component {

  constructor() {
    super();
    this.fonctionAuClic = this.fonctionAuClic.bind(this);
  }

  fonctionAuClic() {
    console.log('clic');
  }

  render() {
    return(
      <div onClick={this.fonctionAuClic}>
        {this.props.maprop}
      </div>
      );
  }
}
```

## TODO :

En reprenant votre exercice précédent, vous allez désormais permettre d'afficher le prénom au clic sur le composant. Par exemple au clic sur le composant `<Student name="Alexis">` il devra y avoir une _alert_ avec `Alexis`.

# Exercice 4 - Gestion de l'état ([AIDE](https://reactjs.org/docs/state-and-lifecycle.html) +  [AIDE](https://reactjs.org/tutorial/tutorial.html#an-interactive-component))



Dans React, il est possible de jouer avec un état (_state_), celui se mettra ensuite à jour automatiquement partout où il est appelé.

Pour l'initialiser il sera nécessaire d'appeler la fonction `super()` dans le constructeur de la classe.
Le constructeur est la fonction qui sera appelée dès la création du composant, la fonction `super()` s'occupe d'aller chercher les différents éléments de la classe `Component`.

À chaque utilisation du `state`, il sera obligatoire d'appeler `super()` dans le `constructor()`.

```
import React, {Component} from 'react';

class MonComposant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maVariable : 'bob'
    };
  }

  render() {
    return(
      <div>
        {this.state.maVariable}
      </div>
      );
  }
}
```


----


Pour mettre à jour l'état, il ne nous sera pas possible d'écrire `this.state.maVariable = 'mon nouveau texte'`, il faudra obligatoirement passer par la fonction `this.setState({})`, qui va prendre en paramètre le nouveau JSON, par exemple :

```
import React, {Component} from 'react';

class MonComposant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maVariable : 'bob'
    };
  }

  handleClick() {
    this.setState({
      maVariable : 'nouveau texte'
    });
  }

  render() {
    return(
      <div onClick={this.handleClick.bind(this)}>
        {this.state.maVariable}
      </div>
      );
  }
}
```

Après avoir cliqué sur le texte, l'état de la variable `maVariable` va changer et mettra automatiquement à jour le texte dans toutes les zones où elle est appellée.

## TODO :

En reprenant votre exercice précédent, ajouter un bouton dans le composant. Au clic sur ce bouton, le prénom affiché passera automatiquement à `Toto`. 


# Exercice 5 - Gestion d'un formulaire ([AIDE](https://reactjs.org/docs/forms.html))

Il est possible d'afficher dans votre composant un formulaire, il faudra donc pouvoir écouter plusieurs événement tel que l'envoi du formulaire ou le changement d'informations au sein d'un champ _input_.

Imaginons que nous souhaitions écouter le changement sur un champ _input_, le code serait :

```
import React, {Component} from 'react';

class MonComposant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nouveauTexte : ''
    };
  }

  handleChange(e) {
    this.setState({
      nouveauTexte : e.target.value
    });
  }

  render() {
    return(
      <div>
        {this.state.nouveauTexte}
        <input onChange={this.handleChange.bind(this)} />
      </div>
      );
  }
}
```

Ici le `e` de la fonction `handleChange` correspond à l'événement, ici c'est un événement `change` qui sera récupéré.
Il est par la suite possible de récupérer le contenu du champs _via_ `e.target.value`.

Il serait donc possible de passer un `preventDefault()` pour bloquer le comportement par défaut de l'élément.

## TODO :

Créer un formulaire avec deux champs (nom & prénom).
Prévenir l'utilisateur si les champs sont vides au moment de l'envoi du formulaire.

# Exercice 6 - Cycle de vie ([AIDE](https://reactjs.org/docs/react-component.html#the-component-lifecycle))

Tout au long de sa durée de vie, une application enverra des événements pour prévenir de certaines actions sur le composant. Il possible d'avoir un intéraction avec eux pour gérer au mieux.


```
import React, { Component } from 'react';

class MonComposant extends Component {

    componentWillMount() {
        console.log('La création du composant va avoir lieu');
    }

    componentDidMount() {
        console.log('La création du composant a eu lieu');
    }

    componentWillUnmount() {
        console.log('Le composant va être retiré');
    }

    render() {
        return (
            <div>
                <img src="https://www.sciencesetavenir.fr/assets/img/2017/03/29/cover-r4x3w1000-58dbbd655242b-capture-d-e-cran-2017-03-29-a-15-55-40.png" alt="chat" />
            </div>
        );
    }
}

```

## TODO :

En reprenant l'exercice précédent, afficher une _alert_ lorsque le composant se met à jour.


# Exercice 7 - récupération de données ([AIDE](https://github.com/axios/axios) + [AIDE](https://alligator.io/react/axios-react/))

Pour récupérer des données, nous allons passer par de l'AJAX, de plus, nous allons simplifier cette opération en utilisant Axios. Par exemple :


```
import React, { Component } from 'react';
import axios from 'axios';

class MonComposant extends Component {

  constructor(){
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => console.log(response.data));
  }

  render() {
      return (
          <div></div>
      );
  }
}
```

## TODO :

Récupérer la liste des posts sur `https://jsonplaceholder.typicode.com/posts` et les afficher dans une liste (`<ul><li></li></ul>`). Pour cela il faut passer par la méthode [map()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map);


# Exercice 8 - Routing simple ([AIDE](https://reacttraining.com/react-router/web/api/Router))

Après avoir installé `react-router-dom`, qui est le routing React pour le web, il est possible de charger un routing utilisant l'`historique` du navigateur pour permettre à l'utilisateur de pouvoir naviguer en faisant _suivant_ ou _précédent_ sur son navigateur _via_ le composant `BrowserRouter`. 

```
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/contactez-nous" component={Contact} />
              </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
```

Le `Switch` permet de ne prendre qu'une seule route et non pas toutes les routes dont l'URL correspond. 

Le paramètre `exact` permet de préciser qu'elle ne contient que le texte du `path`, si le `exact` n'était pas précisé ici, le composant `Home` serait tout le temps chargé à la place des autres car toutes les URL commencent par `/`. 

## TODO : 

Créer deux composants (`Students` & `Results`) avec leurs URL associées. En changeant l'URL dans le navigateur, le bon composant se charge. 

# Exercice 9 - Routing dynamique ([AIDE](https://reacttraining.com/react-router/web/example/url-params))

Il est possible de mettre des variables dans les URL pour répondre à plusieurs cas à la fois.  

```
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Product from './Product'; 

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/page-de-contact" component={Contact} />
                <Route path="/produit-:productNumber(\d+)" component={Product} />
              </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
```

Ici il sera par exemple possible de récupérer la variable `productNumber` et celle-ci ne pourra être qu'un numéro grâce à la regex.

Elle pourra être récupéré dans le composant grâce à `this.props.match.params.productNumber`, par exemple : 

```
import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div> 
              {this.props.match.params.productNumber}
            </div>
        );
    }
}

export default Product;
```

## TODO : 

En reprenant l'exercice précédent, rajouter un composant `Greeting` qui permet de voir `Bonjour Alexis` en allant sur l'URL `/student-Alexis`. 

# Exercice 10 - Liens ([AIDE](https://reacttraining.com/react-router/web/api/NavLink) + [AIDE](https://reacttraining.com/react-router/web/api/Link) )


Le routing étant opérationnel, il faut désormais pouvoir créer des liens vers nos composant, pour cela il est possible d'utiliser le composant `Link` et `NavLink`.    
Leur utilisation est presque identique, la principale différence est que le composant `NavLink` prendra une classe CSS supplémentaire lorque que l'URL sera identique à celle du lien. 

```
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <NavLink to="/"> Accueil </NavLink>
              <NavLink to="/page-de-contact"> Contact </NavLink>

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/page-de-contact" component={Contact} />
              </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
```

Ici lorsque l'utilisateur sera sur la page `/page-de-contact`, le lien aura la classe CSS `active` en plus, ce qui permetttra de designer la page au mieux pour suivre la navigation de l'utilisateur. 

Il possible de choisir la classe CSS qui sera appliquée grâce au paramètre `activeClassName`, par exemple le lien pourrait être `<NavLink to="/page-de-contact" activeClassName="selected"> Contact </NavLink>`

Il est aussi possible de créer des liens dans d'autres composants, par exemple : 

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
    render() {
        return (
            <div> 
              <Link to="/"> Retour à l'accueil </Link>
              {this.props.match.params.productNumber}
            </div>
        );
    }
}

export default Product;
```

## TODO : 

Créer une barre de navigation pour se déplacer entre les différents composants de l'exercice précédent. 


