'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const trainer = require('./controllers/trainer-dashboard.js');
const accounts = require('./controllers/accounts.js');
const assessment = require('./controllers/assessment.js');

// outes for accounts
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

//routes for dashboard - viewing, adding and deleting assessment lists
router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteassessmentlist/:id', dashboard.deleteAssessmentList);
router.post('/dashboard/addassessmentlist', dashboard.addAssessmentList);

//routes for abou page 
router.get('/about', about.index);

// routes for viewing, adding or deleting an assessment
router.get('/assessment/:id', assessment.index);
router.get('/assessment/:id/deleteassessment/:assessmentid', assessment.deleteAssessment);
router.post('/assessment/:id/addassessment', assessment.addAssessment);

//routes for displaying assessment lists and member lists to a trainer
router.get('/trainer-dashboard', trainer.index);
router.get('/trainer-memberList', trainer.viewMembers);

//routes for displaying assessments to a trainer 
router.get('/trainer-assessment/viewAssessments/:assessmentid', trainer.viewAssessments);

//route for adding a comment to an assessment - I didn't get this to work
router.post('/trainer-assessment/viewAssessments/:assessmentid', trainer.addComment);

module.exports = router;
