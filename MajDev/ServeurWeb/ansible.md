<div align="center">
    <img src="http://img.stackshare.io/service/663/ElOjna20.png" >
</div>


# Ansible

## Installation

Pour plus de facilité, nous allons faire cette installation sur notre machine Vagrant.

Il faut ensuite l'installer _via_ :

```
aptitude install software-properties-common python-software-properties
apt-add-repository ppa:ansible/ansible
aptitude update
aptitude install ansible
```

Il va ensuite vous falloir une clé SSH :

```
ssh-keygen -t rsa
```

Nous allons ensuite transmettre cette clé sur notre serveur cible :

```
ssh-copy-id -i ~/.ssh/id_rsa.pub root@[ip du serveur]
```

Nous allons désormais placer l'ip de cette machine dans le fichier `/etc/ansible/host` :

```
mkdir /etc/ansible/
vim /etc/ansible/hosts
```

avec :

```
[test]
ip de notre serveur cible (ex: 210.158.154.156)
```

Nous pouvons désormais tester notre connexion _via_ :

```
ansible all -m ping -u root
```

## Playbook 