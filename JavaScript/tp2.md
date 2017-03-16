# TP 2 

## Création d'un chat 

#### Interface de chat 

L'interface est dans le fichier `chat.html`.

#### Connexion 

* Connectez vous en `POST` en envoyant le `login` sur `login.php` 
* Conservez bien le `token`, vous devrez l'envoyer systématiquement par la suite 
* Une fois connecté, supprimez la div `.disabled`

#### Messages

Pour envoyer un message :
* Pensez bien à envoyer le `token` à chaque échange
* Pensez bien à envoyer le message dans une variable `message` en POST sur `messages.php`

Pour récupérer les messages : 
* Pensez bien à envoyer le `token` à chaque échange
* Faites un appel GET sur `messages.php`