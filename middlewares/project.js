const axios = require('axios');

async function getProjects(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/projects`);

  req.projects_data = JSON.stringify(json.data);
  req.projects_columns = JSON.stringify([
    {
      title: 'Id',
      data: 'id',
    },
    {
      title: 'Nom',
      data: 'name',
    },
    {
      title: 'Statut',
      data: 'status',
    },
    {
      title: 'Priorité',
      // data: 'priority',
      orderable: false,
      data: null,
      defaultContent: '<button class=\\"project_priority btn btn-primary dropdown-toggle\\" type=\\"button\\" id=\\"dropdownMenuButton\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">Change Priority</button><div class=\\"dropdown-menu\\" aria-labelledby=\\"dropdownMenuButton\\"><a class=\\"dropdown-item\\">Low</a><a class=\\"dropdown-item\\">Normal</a><a class=\\"dropdown-item\\">High</a></div>',
    },
    {
      title: 'Action',
      orderable: false,
      data: null,
      defaultContent: '<button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Affiche une vue détaillée sur le projet\\" class=\\"view_project btn btn-circle btn-success\\"><i class=\\"fas fa-search fa-1x\\" aria-hidden=\\"true\\"></i></button><button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Supprime le projet de la base\\" class=\\"del_project btn btn-circle btn-danger\\"><i class=\\"fas fa-trash fa-1x\\" aria-hidden=\\"true\\"></i></button>',
    },
  ]);

  const projects = json.data;

  req.projects = projects;
  next();
}

async function getProject(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/project/${req.params.id}`);

  const project = json.data[0];

  req.project = project;

  next();
}

async function getProjectStatus(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/projects/statusByJobs`);

  const projects = json.data;

  req.projectStatus = projects;
  next();
}

module.exports = {
  getProject,
  getProjects,
  getProjectStatus,
};
