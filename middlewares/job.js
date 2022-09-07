const axios = require('axios');

async function getJobs(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/jobs`);
  const jobs = json.data;

  req.jobs_data = JSON.stringify(jobs);
  req.jobs_columns = JSON.stringify([
    {
      title: 'Id',
      data: 'job_id',
    },
    {
      title: 'Nom',
      data: 'job_name',
    },
    {
      title: 'Statut',
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
      title: 'Id project',
      data: 'job_id_project',
    },
    {
      title: 'Nom du projet',
      data: 'project_name',
    },
    {
      title: 'Action',
      orderable: false,
      data: null,
      defaultContent: '<button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Affiche une vue détaillée sur le job\\" class=\\"view_job btn btn-circle btn-success\\"><i class=\\"fas fa-search fa-1x\\" aria-hidden=\\"true\\"></i></button><button type=\\"button\\" data-toggle=\\"tooltip\\" title=\\"Réinitialise le job\\" class=\\"reinit_job btn btn-circle btn-warning\\"><i class=\\"fas fa-sync-alt fa-1x\\" aria-hidden=\\"true\\"></i></button>',
    },
  ]);

  req.jobs = jobs;
  next();
}

async function getJob(req, res, next) {
  const json = await axios.get(`${req.app.get('apiUrl')}/api/job/${req.params.id}`);
  const job = json.data[0];

  req.job = job;

  next();
}

module.exports = {
  getJobs,
  getJob,
};
