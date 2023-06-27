const axios = require('axios');

async function getSessions(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/sessions`);
  req.sessions_data = JSON.stringify(json.data);
  req.sessions_columns = JSON.stringify([
    {
      title: 'Id',
      data: 'sessions_id',
    },
    {
      title: 'Host',
      data: 'sessions_host',
    },
    {
      title: 'Tags',
      data: 'sessions_tags',
    },
    {
      title: 'Statut',
      data: 'sessions_status',
    },
    {
      title: 'Date début',
      data: 'date_debut',
    },
    {
      title: 'Heure début (UTC)',
      data: 'hms_debut',
    },
    {
      title: 'Date fin',
      data: 'date_fin',
    },
    {
      title: 'Heure fin (UTC)',
      data: 'hms_fin',
    },
    {
      title: 'Heure dernière activité (UTC)',
      data: 'hms_last_activity',
    },
  ]);

  req.sessions = json.data;
  next();
}

async function setNbActive(req, res, next) {
  await axios.post(`${req.app.get('apiUrl')}/api/node/setNbActive?value=${req.query.value}`, req.body);
  next();
}

async function cleanUnused(req, res, next) {
  await axios.delete(`${req.app.get('apiUrl')}/api/session/cleanUnused`);
  next();
}

module.exports = {
  getSessions,
  setNbActive,
  cleanUnused,
};
