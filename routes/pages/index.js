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
router.get('/project/:id', topBar.getInfo, projects.getProject, projects.getJobsOfProject, dependencies.getProjectDependencies, (req, res) => {
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

// jobs page
router.get('/jobs', topBar.getInfo, jobs.getJobs, projects.getProjects, (req, res) => {
  res.render('pages/jobs', {
    topBar: req.topBar,
    filter: req.query.filter,
    projects: req.projects,
    data: req.jobs_data,
    columns: req.jobs_columns,
    jobs: req.jobs,
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

// map page
router.get('/map', projects.getProjects, (req, res) => {
  res.render('pages/map', {
    projects: req.projects,
    filter: req.query.filter,
    base: req.app.get('baseUrl'),
    api: req.app.get('apiUrl'),
    server: req.app.get('server'),
    version: req.app.get('version'),
  });
});

module.exports = router;
