const express = require('express');
const debug = require('debug');
const bodyParser = require('body-parser');
// const bootstrap = require('bootstrap');

const pages = require('./routes/pages');
const controller = require('./routes/controller');

const app = express();

// URL publique de base du monitor (ex: http://gpao-bidule/gpao)
// par défaut http://localhost:8000
const MONITOR_BASE_URL = process.env.GPAO_MONITOR_BASE_URL || '';
const MONITOR_PORT = process.env.GPAO_MONITOR_PORT || 8000;

// Url de l'api
// par défaut http://localhost:8080
const API_URL = process.env.GPAO_API_URL || 'localhost'; // accès api via backend
const API_PROTOCOL = process.env.GPAO_API_PROTOCOL || 'http';
const API_PORT = process.env.GPAO_API_PORT || 8080;

// Dans le cas d'un déploiement de la stack via docker les variables d'environnement:
// BASE_URL, API, API_PORT, API_PROTOCOL
// sont surchargées dans le docker-compose.yml.

app.set('baseUrl', `${MONITOR_BASE_URL}`);
app.set('apiUrl', `${API_PROTOCOL}://${API_URL}:${API_PORT}`);
app.set('version', process.env.npm_package_version);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/vendor', express.static(`${__dirname}/resources/vendor`));
app.use('/css', express.static(`${__dirname}/resources/css`));
app.use('/js', express.static(`${__dirname}/resources/js`));
app.use('/chart.js', express.static(`${__dirname}/node_modules/chart.js`));
app.use('/leaflet', express.static(`${__dirname}/node_modules/leaflet`));
app.use('/leaflet-geoserver-request', express.static(`${__dirname}/node_modules/leaflet-geoserver-request`));
app.use('/images', express.static(`${__dirname}/resources/images`));

// use res.render to load up an ejs view file
app.use(bodyParser.json({ limit: '500mb', extended: true }));
app.use('/', pages);
app.use('/', controller);

debug.log(`URL de l'API : ${app.get('apiUrl')}/api`);

app.listen(MONITOR_PORT);
let monitorUrl = 'http://localhost:8080';
if (MONITOR_BASE_URL !== '') { monitorUrl = MONITOR_BASE_URL; }
debug.log(`URL du monitor : ${monitorUrl}`);
debug.log(`Version du monitor : ${app.get('version')}`);
