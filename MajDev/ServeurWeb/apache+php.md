<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Apache_HTTP_server_logo_%282016%29.png/150px-Apache_HTTP_server_logo_%282016%29.png" >
    <br>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/131px-PHP-logo.svg.png" >
</div>

# Apache2 + PHP

## Installation
```
sudo su 

aptitude update -y

aptitude upgrade -y

aptitude install -y apache2 vim libapache2-mod-php5 mysql-server mysql-client php5 php5-cli php5-curl php5-dev php5-intl php5-mcrypt php5-mysql php5-sqlite

mysql_secure_installation
```

## VirtualHost

```
vim /etc/apache2/sites-available/default.conf
```

```
<VirtualHost *:80>
    DocumentRoot "/var/www/html/example1"
    ServerName example.com
    ServerAlias www.example.com
    Options -Indexes FollowSymLinks MultiViews
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Pour l'activer :

```
a2ensite default
```

## Rewriting

Pour activer l'url rewriting :

```
a2enmod rewrite

service apache2 restart
```

Il va aussi falloir autoriser l'utilisation du fichier .htaccess par apache en modifiant le fichier
 `/etc/apache2/apache2.conf` :

remplacer :

```
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
```

par :


```
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```