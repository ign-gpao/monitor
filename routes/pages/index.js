const router = require('express').Router();
const jobs = require('../../middlewares/job');
const projects = require('../../middlewares/project');
const sessions = require('../../middlewares/session');
const hosts = require('../../middlewares/host');
const dependencies = require('../../middlewares/dependencies');
const topBar = require('../../middlewares/topBar');

// dashboard page
router.get('/', topBar.getInfo, projects.getProjectStatus, (req, res) => {
  res.render('pages/index', {
    topBar: req.topBar,
    jobStatus: req.topBar.jobStatus,
    projects: req.projectStatus,
    data: '{}',
    columns: '{}',
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// job page with id
router.get('/job/:id', topBar.getInfo, jobs.getJob, dependencies.getJobDependencies, (req, res) => {
  res.render('pages/job', {
    topBar: req.topBar,
    id: req.params.id,
    job: req.job,
    deps: req.deps,
    data: req.dependencies_data,
    columns: req.dependencies_columns,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// project page with id
router.get('/project/:id', async (req, res, next) => {
  try {
    const wrap = (fn) => new Promise(
      (resolve, reject) => fn(req, res, (err) => (err ? reject(err) : resolve())),
    );
    await Promise.all([
      wrap(topBar.getInfo),
      wrap(projects.getProject),
      wrap(projects.getJobsOfProject),
      wrap(dependencies.getProjectDependencies),
    ]);
    next();
  } catch (error) {
    next(error);
  }
}, (req, res) => {
  res.render('pages/project', {
    topBar: req.topBar,
    id: req.params.id,
    project: req.project,
    deps: req.deps,
    data: req.dependencies_data,
    columns: req.dependencies_columns,
    jobs_data: req.jobs_of_project_data,
    jobs_columns: req.jobs_of_project_columns,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// jobs page with id of a project
router.get('/jobs/:id', topBar.getInfo, projects.getProjects, projects.getJobsOfProject, (req, res) => {
  res.render('pages/jobs', {
    id: req.params.id,
    topBar: req.topBar,
    filter: req.params.id,
    projects: req.projects,
    data: req.jobs_of_project_data,
    columns: req.jobs_of_project_columns,
    jobs: req.jobs,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// jobs page
router.get('/jobs', topBar.getInfo, projects.getProjects, (req, res) => {
  res.render('pages/jobs', {
    id: null,
    topBar: req.topBar,
    filter: null,
    projects: req.projects,
    data: '[]',
    columns: JSON.stringify([
      { title: 'Id', data: 'job_id' },
      { title: 'Nom', data: 'job_name' },
      { title: 'Statut', data: 'job_status' },
      { title: 'Code retour', data: 'job_return_code' },
      { title: 'Date début', data: 'date' },
      { title: 'Heure début (UTC)', data: 'hms' },
      { title: 'Durée (s)', data: 'duree' },
    ]),
    jobs: [],
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// projects page
router.get('/projects', topBar.getInfo, projects.getProjects, (req, res) => {
  res.render('pages/projects', {
    topBar: req.topBar,
    projects: req.projects,
    data: req.projects_data,
    columns: req.projects_columns,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// sessions page
router.get('/sessions', topBar.getInfo, sessions.getSessions, hosts.getHosts, (req, res) => {
  res.render('pages/sessions', {
    topBar: req.topBar,
    filter: req.query.filter,
    sessions: req.sessions,
    hosts: req.hosts,
    data: req.sessions_data,
    columns: req.sessions_columns,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

// hosts page
router.get('/hosts', topBar.getInfo, hosts.getHosts, (req, res) => {
  res.render('pages/hosts', {
    topBar: req.topBar,
    hosts: req.hosts,
    data: req.hosts_data,
    columns: req.hosts_columns,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    version: req.app.get('version'),
  });
});

module.exports = router;
