<div align="center">
    <img src="http://img.stackshare.io/service/663/ElOjna20.png" >
</div>


# Ansible

## Installation


Pour plus de facilité, nous allons faire cette installation sur notre machine Vagrant.

# Possibilité 1

Il faut ensuite l'installer _via_ :

```
aptitude install ansible
```

# Possibilité 2


Il faut ensuite l'installer _via_ :

```
aptitude update
aptitude install python-pip
```


Puis nous allons installer Ansible :

```
pip install ansible
```

# Configuration

Il va ensuite vous falloir une clé SSH :

```
ssh-keygen -t rsa
```

Nous allons ensuite transmettre cette clé sur notre serveur cible :

```
ssh-copy-id -i ~/.ssh/id_rsa.pub root@[ip du serveur]
```


Nous allons désormais placer l'ip de cette machine dans le fichier `host` :

```
touch host
vim hosts
```

avec :

```
[test]
ip de notre serveur cible (ex: 210.158.154.156)
```

Nous pouvons désormais tester notre connexion _via_ :

```
ansible-playbook -i hosts playbook.yml
```

## Playbook

```
---
- hosts: default
  vars:
    http_port: 80
    max_clients: 200
  remote_user: root
  tasks:
  - name: ensure apache is at the latest version
    apt: name=apache2 state=latest
  - name: ensure apache is running (and enable it at boot)
    service: name=apache2 state=started enabled=yes

```