const axios = require('axios');

async function getHosts(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/nodes`);
  req.hosts_data = JSON.stringify(json.data);
  req.hosts_columns = JSON.stringify([
    {
      title: 'Host',
      data: 'host',
    },
    {
      title: 'Fermé',
      data: 'closed',
    },
    {
      title: 'Active',
      data: 'active',
    },
    {
      title: 'En veille',
      data: 'idle',
    },
    {
      title: 'Utilisé',
      data: 'running',
    },
    {
      title: 'Action',
      orderable: false,
      data: null,
      defaultContent: '<button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Modifie le nombre de thread actif sur la machine\\" class=\\"view_host btn btn-circle btn-info\\"><i class=\\"fas fa-cogs fa-1x\\" aria-hidden=\\"true\\"></i></button>',
    },
  ]);

  const hosts = json.data;

  req.hosts = hosts;

  next();
}

module.exports = {
  getHosts,
};
