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
      title: 'Statut <a class=\\"far fa-question-circle collapse-item\\" data-toggle=\\"modal\\" data-target=\\"#projectStatusInfo\\"></a>',
      data: 'status',
    },
    {
      title: 'Priorité',
      // orderable: false,
      data: 'priority',
      // defaultContent: 'select class=\\"custom-select custom-select-sm project_priority\\"><option value=\\"low\\">Low</option><option value=\\"normal\\" selected>Normal</option><option value=\\"high\\">High</option></select>',
    },
    {
      title: 'Action',
      orderable: false,
      data: null,
      defaultContent: '<button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Supprime le projet de la base\\" class=\\"del_project btn btn-sm btn-circle btn-danger\\"><i class=\\"fas fa-trash fa-1x\\" aria-hidden=\\"true\\"></i></button>',
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

async function getJobsOfProject(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/project/${req.params.id}/jobs`);

  req.jobs_of_project_data = JSON.stringify(json.data);
  req.jobs_of_project_columns = JSON.stringify([
    {
      title: 'Id',
      data: 'job_id',
    },
    {
      title: 'Nom',
      data: 'job_name',
    },
    {
      title: 'Statut <a class=\\"far fa-question-circle collapse-item\\" data-toggle=\\"modal\\" data-target=\\"#jobStatusInfo\\"></a>',
      data: 'job_status',
    },
    {
      title: 'Code retour',
      data: 'job_return_code',
    },
    {
      title: 'Date début',
      data: 'date',
    },
    {
      title: 'Heure début (UTC)',
      data: 'hms',
    },
    {
      title: 'Durée (s)',
      data: 'duree',
    },
    {
      title: 'Action',
      orderable: false,
      data: null,
      defaultContent: '<button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Réinitialise le job\\" class=\\"reinit_job btn btn-sm btn-circle btn-warning\\"><i class=\\"fas fa-sync-alt fa-1x\\" aria-hidden=\\"true\\"></i></button>',
    },
  ]);

  next();
}

module.exports = {
  getProject,
  getProjects,
  getProjectStatus,
  getJobsOfProject,
};
