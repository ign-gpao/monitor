const axios = require('axios');

async function getHosts(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/nodes`);
  const arr = json.data;
  arr.filter((obj) => {
    const host = obj;
    host.used = +host.running + +host.idle_requested;
    return null;
  });

  req.hosts_data = JSON.stringify(arr);
  req.hosts_columns = JSON.stringify([
    {
      title: 'Host',
      data: 'host',
    },
    {
      title: 'Fermée',
      data: 'closed',
    },
    {
      title: 'En veille',
      data: 'idle',
    },
    {
      title: 'Active',
      data: 'active',
    },
    {
      title: 'Utilisée',
      data: 'used',
    },
    {
      title: 'Action',
      orderable: false,
      data: null,
      defaultContent: '<button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Modifie le nombre de thread actif sur la machine\\" class=\\"view_host btn btn-sm btn-circle btn-info\\"><i class=\\"fas fa-cogs fa-1x\\" aria-hidden=\\"true\\"></i></button>',
    },
  ]);

  const hosts = json.data;

  req.hosts = hosts;

  next();
}

module.exports = {
  getHosts,
};
