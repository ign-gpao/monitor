const axios = require('axios');

async function cleanDatabase(req, res, next) {
  await axios.get(`${req.app.get('apiUrl')}/api/maintenance/cleanDatabase`);
  next();
}

module.exports = {
  cleanDatabase,
};
