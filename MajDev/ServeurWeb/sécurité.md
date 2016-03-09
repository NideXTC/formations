# Sécurité

## Création d'un utilisateur

```
adduser toto
```

Nous allons maintenant lui donner des droits supplémentaire :

```
gpasswd -a toto sudo
```

## Clé SSH



Nous allons créer une clé SSH pour les connexions :

```
ssh-keygen -t rsa
```

Nous avons désormais une clé publique/privée dans `~/.ssh/`.

Puis nous allons nous connecter sur le compte de notre nouvel utilisateur :
```
su - toto
```

Il est possible de rajouter la clé ssh de son ordinateur dans le fichier `~/.ssh/autorized_keys` pour le plus avoir à taper de mot de passe pour se connecter.
Pour cela :

```
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/autorized_keys
chmod 600 ~/.ssh/autorized_keys
vim ~/.ssh/autorized_keys
```

## Désactiver le root

Dans le fichier `/etc/ssh/sshd_config`, remplacer :

```
PermitRootLogin yes
```

Par :

```
PermitRootLogin no
```


## UFW

Installation :
```
aptitude -y install ufw
```

Configuration :
```
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow www
ufw allow 443
ufw enable
```


## Fail2Ban