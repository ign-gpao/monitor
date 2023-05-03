# Monitor

IGN GPAO Monitor est l'interface web de la GPAO développée en [Node.js](https://nodejs.org/en) permettant le suivi et le pilotage des traitements opérés par les clients GPAO.

## Déploiement et exécution via Docker

Pour faciliter son déploiement, une image monitor-gpao est déjà construite et accessible depuis [DockerHub](https://hub.docker.com/r/gpao/monitor-gpao) via la commande :
``` shell
docker pull gpao/monitor-gpao
```
et peut être lancée avec :
``` shell
docker run -ti --rm -p 8000:8000 -e SERVER_HOSTNAME=`hostname` gpao/monitor-gpao
```

L'installation et l'execution d'une GPAO complète (database, api, monitor, etc...) via Docker est décrite [ici](https://github.com/ign-gpao/docker).

## Déploiement et exécution local

### Prérequis

1. Installer [nodejs](https://nodejs.org/en) et [npm](https://www.npmjs.com/) en suivant les procédures officielles propres à votre OS.
2. Le moniteur nécessite d'avoir un serveur postgres installé avec le modèle de données pour fonctionner, vous trouverez plus d'informations sur ce module [ici](https://github.com/ign-gpao/database).
3. Le moniteur nécessite d'avoir l'api GPAO installée et correctement configurée pour fonctionner, vous trouverez plus d'informations sur ce module [ici](https://github.com/ign-gpao/api).

### Installation

1. Cloner le dépôt ign-gpao/monitor ou récupérer les sources depuis la page des [releases](https://github.com/ign-gpao/monitor/releases).
2. Exécuter la commande  `npm install` depuis le répertoire des sources afin de récupérer les dépendances du projet.

### Exécution

1. Dans le répertoire du monitor, lancer le script : `start.sh` qui contient la commande de lancement et les paramètres de connexion à l'api (ceux-ci sont à adapter en fonction de l'installation de votre api).

Une fois lancé vous pouvez tester le bon fonctionnement depuis l'url : http://localhost:8000/

## Variables d'environnement

La configuration de variables d'environnement propres au Monitor est nécessaire pour son bon fonctionnement. Elles sont définies par défaut ou dans le script `start.sh` dans le cas d'un déploiement local mais sont à adapter en fonction de votre installation. En voici l'inventaire :

| Variable | Obligatoire | Valeur par défaut | Commentaire |
| --- | --- | --- | --- |
| SERVER_HOSTNAME | Non | localhost | Nom de la machine qui héberge le monitor |
| URL_MONITOR | Non | localhost | Url du monitor |
| MONITOR_PORT | Non | 8000 | Port du monitor |
| URL_API | Non | localhost | Nom de la machine qui héberge l'API |
| API_PORT | Non | 8080 | Port de l'API vu par le monitor |
| BASE_URL | Non | '' | Url de base du site (utile dans le cas où un alias a été créé pour le site et qu'il diffère du nom de machine), exemples : http://toto.truc:port/titi ou https://toto/tata/titi/ |

## Pour les développeurs

### Analyse du code

Le code doit être analysé avec [ESLint](https://eslint.org/) avant d'être mergé sur la branche main. Voici la commande à exécuter avant de pousser votre code depuis le répertoire des sources : `npm run lint`

## Licence

Ce projet est sous licence CECILL-B (voir [LICENSE.md](https://github.com/ign-gpao/.github/blob/main/LICENSE.md)).

[![IGN](https://github.com/ign-gpao/.github/blob/main/images/logo_ign.png)](https://www.ign.fr)
