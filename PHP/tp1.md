# Créer un espace d'administration 

L'administrateur du site doit pouvoir :    
* Créer un client dans son interface (INSERT)
* Mettre à jour le client grâce au formulaire (UPDATE)
* Créer un formulaire pour supprimer le client (DELETE)

Pour le client :   
* Créer un lien pour deconnecter l'utilisateur (session_destroy())

Ensuite vous allez devoir gérer les produits du site, pour cela, vous devrez :     
* Créer une table `products` avec (id - INT(11), name - VARCHAR(255), description - TEXT, image - VARCHAR(255), price INT(11))
* Créer une interface dans l'admin (l'utilisateur doit être connecté) pour créer/modifier/supprimer les produits
* Créer une page qui affiche tous les produits, il y doit y avoir un bouton pour rajouter au panier (ajouter le produit dans une session)
* Afficher tous les produits du panier
