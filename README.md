# Monitor

IGN GPAO Monitor est l'interface web de la GPAO développée en [Node.js](https://nodejs.org/en) permettant le suivi et le pilotage des traitements opérés par les clients GPAO.

## Installation via Docker

Pour faciliter son déploiement, une image monitor-gpao est déjà construite et accessible depuis [DockerHub](https://hub.docker.com/r/gpao/monitor-gpao) via la commande :
``` shell
docker pull gpao/monitor-gpao
```
et peut être lancée avec :
``` shell
docker run -ti --rm -p 8000:8000 -e SERVER_HOSTNAME=`hostname` gpao/monitor-gpao
```

L'installation d'une GPAO complète (database, api, monitor) via Docker est décrite [ici](https://github.com/ign-gpao/docker).

## Développement

Pour contribuer au développement du monitor :

1. Cloner le dépôt ign-gpao/monitor
2. Installer une GPAO locale via Docker en suivant la procédure  [ici](https://github.com/ign-gpao/docker)
3. Tuer le conteneur du monitor créé par Docker avec : `docker rm -f monitor-gpao`
4. Dans le répertoire du monitor, lancer la commande : `npm run dev`


## Licence

Ce projet est sous licence CECILL-B (voir [LICENSE.md](https://github.com/ign-gpao/.github/blob/main/LICENSE.md)).

[![IGN](https://github.com/ign-gpao/.github/blob/main/images/logo_ign.png)](https://www.ign.fr)
