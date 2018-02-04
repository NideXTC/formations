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

```
    ---
    - hosts: webservers
      vars:
        http_port: 80
        max_clients: 200
      remote_user: root
      tasks:
      - name: ensure apache is at the latest version
        yum: name=httpd state=latest
      - name: write the apache config file
        template: src=/srv/httpd.j2 dest=/etc/httpd.conf
        notify:
        - restart apache
      - name: ensure apache is running (and enable it at boot)
        service: name=httpd state=started enabled=yes
      handlers:
        - name: restart apache
          service: name=httpd state=restarted
```