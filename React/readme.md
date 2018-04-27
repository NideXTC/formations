# React

## Installation de l'environnement

### IDE

Je vous conseille d'utiliser [Visual Studio Code](https://code.visualstudio.com/), il est parfaitement fait pour travailler avec React et NodeJS.

### NodeJS

Pour travailler avec React nous allons avoir besoin de NodeJS, pour l'installer, vous pouvez passer par :
* [l'installeur de base](https://nodejs.org/en/)
* [Homebrew](https://brew.sh/index_fr) sur Mac / [Chocolatey](https://chocolatey.org/) sur Windows / Aptitude sur Linux
* [NVM](https://github.com/creationix/nvm#install-script)


### Create-react-app / create-react-native-app

Nous allons désormais installer des outils pour nous permettre d'aller plus vite sur notre développement.

Pour cela, ouvrez un terminal et faites les commandes suivantes :

```
npm install -g create-react-app
npm install -g create-react-native-app
```

### Yarn

React Native ayant encore quelques soucis avec NPM (le gestionnaire de paquet sur NodeJS), nous allons passer par Yarn. C'est un équivalent à NPM. Pour l'installer c'est [ICI](https://yarnpkg.com/en/docs/install#mac-stable).


### Expo XDE

 _Expo_ nous permettra de tester notre application sans avoir besoin d'installer d'environnement spécifique à iOS ou Android.
Vous pouvez aussi installer _Expo_ sur votre téléphone, vous pourrez avoir un système en _hot_ _reloading_ qui permet de mettre à jour l'applicaiton sur votre ordinateur et votre téléphone en même temps.
Pour l'installer c'est [ICI](https://github.com/expo/xde/releases).

Vous pourrez même publier des applications sur le store d'Expo sans avoir à payer de licence Apple ou Google pour permettre aux testeurs de récupérer la dernière version pendant sa phase de développement.

## Initialisation du dossier

NodeJS n'a pas besoin d'un dossier particulier pour travailler, pour plus de simplicité, nous allons donc partir du principe que notre dossier principal se trouve sur le bureau.

* Sur votre bureau, faites un dossier `react-exercices`
* Ouvrez un terminal et accédez à votre dossier, par exemple sur Unix :
```
cd ~/react-exercices
```
* Désormais en terminal faites :
```
create-react-app firsttest

cd firsttest

yarn start
```

Vous devriez désormais voir une fenêtre de navigateur se lancer avec une page d'accueil pour React.

Tout cela opère grâce à un [webpack](https://webpack.js.org/) concocté aux petits oignons sous le capot. Tout ce dont vous avez besoin pour l'instant a été installé grâce à votre `create-react-app`.

Les fichiers importants ici sont :
* `public/index.html` : contient la `div` avec l'id _root_ dans laquelle sera injecté une partie de notre code.
* `src/index.js` : importe tous les modules nécessaires et injecte le premier module dans notre page HTML
* `src/App.js` : notre premier composant, celui ne fait qu'afficher du HTML.


**/!\\** Votre installation a eu un problème et pas de formateur ou d'aide à l'horizon ? Pas de soucis ! Vous pouvez toujours travailler sur React en version web sur [Codesandbox](https://codesandbox.io/s/new) **/!\\**



## Découverte de React

### React 101

Je vous invite à prendre un petit moment pour voir React d'un peu plus près avec [BuildWithReact](http://buildwithreact.com/tutorial). Il est par exemple important de comprendre que le JSX n'est pas du HTML, mais une version simplifié de l'écriture du JS.

### Tuto officiel

Désormais que vous comprenez un petit mieux tout ce petit monde, je vous invite à faire le tutoriel officiel de Facebook : https://reactjs.org/tutorial/tutorial.html


## Ressources 

* https://leanpub.com/redux-book
* https://egghead.io/courses/getting-started-with-redux
