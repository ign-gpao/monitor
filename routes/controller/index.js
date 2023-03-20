const router = require('express').Router();

const jobs = require('../../middlewares/job');
const projects = require('../../middlewares/project');
const sessions = require('../../middlewares/session');
const sideBar = require('../../middlewares/sideBar');

// sendProject
router.put('/projects/sendProject',  projects.sendProject, (req, res) => {
    console.log(req.body)
    res.redirect('/')
});

// deleteProjects
router.delete('/projects/deleteProjects',  projects.deleteProjects, (req, res) => {
    console.log(req.body)
    res.redirect('/')
});

// setProjectPriority ok
router.post('/projects/setPriority',  projects.setPriority, (req, res) => {
    res.redirect('/')
});

// reinitJobs
router.post('/jobs/reinit',  jobs.reinitJobs, (req, res) => {
    console.log(req.body)
    res.redirect('/')
});

// setNbActiveSessions
router.post('/sessions/setNbActive', sessions.setNbActive, (req, res) => {
    console.log(req.body)
    res.redirect('/')
});

// cleanUnusedSessions ok
router.delete('/sessions/cleanUnused', sessions.cleanUnused, (req, res) => {
    res.redirect('/')
});

// cleanDatabase ok
router.get('/maintenance/cleanDatabase', sideBar.cleanDatabase, (req, res) => {
    res.redirect('/')
});

module.exports = router;

