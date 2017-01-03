http://sql.sh 

1 - Afficher tous les utilisateurs de table user 

```
SELECT * FROM user;
```

2 - Afficher seulement le premier utilisateur de la table user (utiliser la clause WHERE) 

```
SELECT * FROM user WHERE id = 1;
```

3 - Insérer un utilisateur avec le nom 'Toto', mot de passe 'Tata', email 'a@a.fr'(INSERT INTO)

```
INSERT INTO user(name, email, password) VALUES ('Toto', 'a@a.fr', 'Titi');


INSERT INTO user VALUES (NULL, 'Toto', 'Titi', 'a@a.fr');
```

4 - Modifier l'utilisateur Toto et lui changer son mail en 'b@b.fr' (UPDATE + WHERE)

5 - Supprimer l'utilisateur Toto (DELETE + WHERE)


