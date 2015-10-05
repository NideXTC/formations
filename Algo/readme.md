# Le pseudo-code 

Le pseudo-code s'écrit en français, la structure est: 

```
ALGO [Nom de l'algo]

CONSTANTES 
[Déclaration des constantes]

VARIABLES 
[Déclaration des variables]

DEBUT 
    [Corps de l'algorithme]
FIN
```


Un exemple : 

```
ALGO MonAlgo

CONSTANTES
var1 <- 20 : entier
var2 <- "Coucou" : chaîne 

VARIABLES
i : entier 

DEBUT
    FONCTION useless(a) : chaîne
    DEBUT
        RETOURNER "Numéro : ", a
    FIN
    
    POUR i allant de 1 à 10
        AFFICHER(useless(i))
    FIN POUR
    
    PROCEDURE coucou() : chaîne
    var3 <- 20 : entier 
    var4 : entier
    DEBUT 
        var4 <- var1 + var3
        AFFICHER(var2, var4)
    FIN
    
    coucou()
FIN
```

## Affectation 

Pour affecter une valeur à une variable on passe par le signe <- 
```
var2 <- "TOTO" : chaîne
```

## Les boucles 

### Tant que

```
TANT_QUE <expression booléenne> 

       <instruction>

       ...

FIN_TANT_QUE
```

### Répéter - jusqu'à

```
REPETER

       <instruction>

       ...

JUSQU'A <expression booléenne>
```

### Pour 

```
POUR <ident_var> ALLANT_DE <valeur_debut> A <valeur_fin> {PAR_PAS_DE <increment>}

       <instruction>

       ...

FIN_POUR
```

## L'alternative 

### SI - SINON

```
SI <expression booleenne> ALORS
       <instruction>

       ...
SINON
       <instruction>

       ... 
FIN_SI
```


### SI - SINON SI

```
SI <expression booleenne> ALORS
       <instruction>

       ...
SINON SI
       <instruction>

       ... 
SINON 
       <instruction>

       ... 
FIN_SI
```


##  Afficher 

Pour afficher une valeur on utilise Afficher
```
AFFICHER("Nombre de voitures : ", x)

```


##  Lire 

Pour récuperer une valeur on utilise Lire 
```
LIRE(x)
```
