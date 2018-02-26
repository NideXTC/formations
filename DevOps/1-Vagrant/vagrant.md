<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vagrant.png/150px-Vagrant.png" >
</div>

# Vagrant

## Téléchargements

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)

Pensez à vérifier que vagrant est disponible dans votre path en faisant dans votre console :

```
vagrant -v
```

Pour simplifier la mise à jour des installations de VirtualBox, il est conseillé de faire : 

```
vagrant plugin install vagrant-vbguest
```

Vous devriez avoir quelque chose comme `Vagrant 2.0.1`.

## Initialisation

Dans le dossier où vous souhaitez placer votre serveur web, faites :

```
vagrant init debian/jessie64
```

Vous devriez avoir par la suite un fichier `vagrantfile` à la racine de votre dossier,
il faut désormais télécharger la box et lancer l'installation :


```
vagrant up
```

Vous pouvez dès à présent vous connecter sur votre machine avec :

```
vagrant ssh
```

Puis pour passer super administrateur :

```
sudo su
```

## Configuration de la VM

Nous allons maintenant configurer le fichier Vagrantfile pour modifier le comportement de notre VM.

### Forward de port

Pour commencer nous allons permettre un forward de port pour accéder à notre VM depuis l'exterieur.
À l'intérieur de notre boucle (`Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|`) nous allons placer :

```
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 8080, host: 8081
  config.vm.network :forwarded_port, guest: 443, host: 4430
```

Ainsi en passant par `http://localhost:8080` nous pourrons accéder au serveur web de la VM.

### Dossier synchronisé

Toujours à l'intérieur de notre boucle nous allons placer la synchronisation du dossier _via_ :

```
 config.vm.synced_folder ".", "/vagrant", id: "vagrant-root",
    owner: "vagrant",
    group: "www-data",
    type: "virtualbox",
    mount_options: ["dmode=775,fmode=664"]
```

### Final

Au final votre fichier devrait (sans les commentaires) ressembler à :


```
Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"

  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 8080, host: 8081
  config.vm.network :forwarded_port, guest: 443, host: 4430

  config.vm.synced_folder ".", "/vagrant", id: "vagrant-root",
    owner: "vagrant",
    group: "www-data",
    mount_options: ["dmode=775,fmode=664"]
end
```

Nous allons arrêter puis démarrer la VM pour qu'elle prenne bien en compte nos modifications :

```
vagrant halt
vagrant up
```

ou

```
vagrant reload
```


## Provisions

Il est possible d'installer des éléments de base avec un script de provision ou des outils comme Puppet (https://puphpet.com/), Salt, Chef ...
