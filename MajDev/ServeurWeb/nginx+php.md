<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nginx_logo.svg/langfr-180px-Nginx_logo.svg.png" >
    <br>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/131px-PHP-logo.svg.png" >
</div>



# Nginx + PHP

## Installation

```
sudo su 

aptitude update -y

aptitude upgrade -y

aptitude install -y nginx vim php5-fpm mysql-server mysql-client php5 php5-cli php5-curl php5-dev php5-intl php5-mcrypt php5-mysql php5-sqlite

mysql_secure_installation
```


## Configuration

```
vim /etc/nginx/sites-available/default
```

Remplacer :

```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html;
    index index.html index.htm;

    server_name localhost;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Par :

```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    root /usr/share/nginx/html;
    index index.php index.html index.htm;

    server_name server_domain_name_or_IP;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

Puis :

```
sudo service nginx restart
```

## Sécurité supplémentaire

Une petit sécurité en plus car Nginx va essayer de charger par défaut le fichier avec le nom qui ressemble le plus :

```
vim /etc/php5/fpm/php.ini
```

Remplacer :

```
cgi.fix_pathinfo=1
```

Par :


```
cgi.fix_pathinfo=0
```

Puis :


```
sudo service php5-fpm restart
```


