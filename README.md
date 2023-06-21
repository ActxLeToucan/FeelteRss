# FeelteRss

## Développement
### Configuration de l'environnement
Dupliquer le fichier [`.env.dist`](.env.dist) en `.env`.\
Renseigner les variables d'environnement manquantes.

Dupliquer le fichier [`directus/docker-compose.yml.dist`](directus/docker-compose.yml.dist) en `directus/docker-compose.yml`.\
Renseigner les variables d'environnement manquantes.

### Installation du projet en local
Installer les dépendances du projet
```npm ci```

Lancer le serveur directus et s'assurer qu'il est bien accessible avant de continuer
```npm run directus```

Appliquer le schéma des collections directus
```npm run directus:snapshot```

Redémarrer le serveur directus.
```npm run directus:restart```

### Lancement du projet
Exécuter la commande ```npm run directus```.

Exécuter la commande ```npm run dev```.\
L'application va tourner en mode watch, et sera accessible à l'adresse `{HOST}:{PORT}` (cf. [.env](.env)).

## Déploiement
### Build simple
Exécuter la commande ```npm run build``` pour générer le build de l'application.\
Pour lancer le serveur, exécutez la commande ```npm run start```.

### Docker
Dupliquer le fichier [`docker-compose.yml.dist`](docker-compose.yml.dist), le renommer en `docker-compose.yml`.\
Le modifier si besoin pour obtenir la configuration souhaitée.

Même chose pour le fichier [`directus/docker-compose.yml.dist`](directus/docker-compose.yml.dist).

Exécuter la commande ```npm run prod``` pour construire et lancer l'image docker de l'application.

## Documentation
La documentation (OpenAPI) est disponible après le lancement du serveur.\
Une documentation existe pour chaque version de l'API à l'adresse `{HOST}:{PORT}/{version}/docs`.

Versions de l'API disponibles :
- v1
