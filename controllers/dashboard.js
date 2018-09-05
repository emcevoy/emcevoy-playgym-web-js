//controller to deal with assessment lists
//also has methods for adding and deleting assessment lists

'use strict';

const accounts = require ('./accounts.js');
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const assessmentListStore = require('../models/assessmentList-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Member Assessment Lists',
      assessmentLists: assessmentListStore.getUserAssessments(loggedInUser.id),
      user: userstore.getUserById(loggedInUser.id),
    };
    logger.info('Rendering Member Dashboard');
    logger.debug('Logged in Member Id: ', loggedInUser.id);
    response.render('dashboard', viewData);
  },
  
  deleteAssessmentList(request, response) {
    const assessmentListId = request.params.id;
    logger.debug(`Deleting Assessment List ${assessmentListId}`);
    assessmentListStore.removeAssessmentList(assessmentListId);
    response.redirect('/dashboard');
  },
  
   addAssessmentList(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessmentList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      memberAssessments: [],
    };
    logger.debug('Creating a new AssessmentList', newAssessmentList);
    assessmentListStore.addAssessmentList(newAssessmentList);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;
