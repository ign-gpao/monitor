const express = require('express');
const debug = require('debug');
const bodyParser = require('body-parser');

const pages = require('./routes/pages');
const controller = require('./routes/controller');

const app = express();

// URL publique de base
const BASE_URL = process.env.BASE_URL || '';

// Url du moniteur sur lequel fonctionne le moniteur
// par défaut http://localhost:8000
const URL_MONITOR = process.env.URL_MONITOR || 'localhost';
const MONITOR_PORT = process.env.MONITOR_PORT || 8000;

// Url de l'api qui est appelé par le monconst git = require('git-last-commit');iteur
// par défaut http://localhost:8080
const URL_API = process.env.URL_API || 'localhost';
const API_PORT = process.env.API_PORT || 8080;

// Dans le cas d'un déploiement de la stack via docker les variables d'environnement:
// BASE_URL, URL_MONITOR, MONITOR_PORT, URL_API, API_PORT
// sont surchargées dans le docker-compose.yml.

// Nom du serveur d'un point de vue client nécessaire pour les requêtes
// vers l'api executé côté client
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_URL = `http://${SERVER_HOSTNAME}:${API_PORT}`;

app.set('baseUrl', `${BASE_URL}`);
app.set('apiUrl', `http://${URL_API}:${API_PORT}`);
app.set('apiMonitor', `http://${URL_MONITOR}:${MONITOR_PORT}`);
app.set('server', SERVER_URL);
app.set('version', process.env.npm_package_version);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/vendor', express.static(`${__dirname}/resources/vendor`));
app.use('/css', express.static(`${__dirname}/resources/css`));
app.use('/js', express.static(`${__dirname}/resources/js`));
app.use('/chart.js', express.static(`${__dirname}/node_modules/chart.js`));
app.use('/images', express.static(`${__dirname}/resources/images`));

// use res.render to load up an ejs view file
app.use(bodyParser.json({ limit: '500mb', extended: true }));
app.use('/', pages);
app.use('/', controller);

debug.log(`URL de l'API : ${app.get('apiUrl')}`);

app.listen(MONITOR_PORT);
debug.log(`URL de base : ${app.get('baseUrl')}`);
debug.log(`URL du monitor : ${app.get('apiMonitor')}`);
debug.log(`Version du monitor : ${app.get('version')}`);
