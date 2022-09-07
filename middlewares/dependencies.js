const axios = require('axios');

async function getJobDependencies(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/job/${req.params.id}/dependencies`);

  req.dependencies_data = JSON.stringify(json.data);
  req.dependencies_columns = JSON.stringify([
    {
      title: 'Id',
      data: 'dep_id',
    },
    {
      title: 'Job en amont',
      data: 'dep_up',
    },
    {
      title: 'Nom du job',
      data: 'job_name',
    },
    {
      title: 'Statut',
      data: 'job_status',
    },
    {
      title: 'Active',
      data: 'dep_active',
    },
  ]);
  req.deps = json.data;
  next();
}

async function getProjectDependencies(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/project/${req.params.id}/dependencies`);

  req.dependencies_data = JSON.stringify(json.data);
  req.dependencies_columns = JSON.stringify([
    {
      title: 'Id',
      data: 'dep_id',
    },
    {
      title: 'Projet en amont',
      data: 'dep_up',
    },
    {
      title: 'Nom du projet',
      data: 'project_name',
    },
    {
      title: 'Statut',
      data: 'project_status',
    },
    {
      title: 'Priorité',
      data: 'project_priority',
    },
    {
      title: 'Active',
      data: 'dep_active',
    },
  ]);
  req.deps = json.data;
  next();
}

module.exports = {
  getJobDependencies,
  getProjectDependencies,
};
