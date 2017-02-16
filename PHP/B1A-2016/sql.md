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

```
UPDATE user SET email = 'b@b.fr' WHERE name = 'Toto'; 
```

5 - Supprimer l'utilisateur Toto (DELETE + WHERE)

```
DELETE FROM user WHERE id = 4
```

6 - Ressortir tous les champs avec une LIMIT de 2 

```
SELECT * FROM user LIMIT 2; 
```

7 - Ressortir tous les champs triés par nom (ORDER BY)

```
SELECT * FROM user ORDER BY name DESC; // Décroissant
SELECT * FROM user ORDER BY name ASC; // Croissant
```


8 - Ressortir tous les champs qui ont le nom 'Toto' et le mot de passe 'Titi' (AND)

```
SELECT * FROM user WHERE name = 'Toto' AND password = 'Titi'; 
```






