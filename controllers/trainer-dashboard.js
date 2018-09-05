//controller that deals with the trainer methods
//displays the trainer dashboard
//contains method to deal with viewing assessments, adding comments and viewing members

'use strict';

const accounts = require ('./accounts.js');
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const assessmentListStore = require('../models/assessmentList-store');
const uuid = require('uuid');

const trainerDashboard = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const viewData = {
      title: 'All Member Assessment Lists',
      memberAssessmentLists: assessmentListStore.getAllAssessmentLists(request),
    };
    logger.info('Rendering user\'s assessments');
    response.render('trainer-dashboard', viewData);
  },
  
  //method for viewing member assessments
  viewAssessments(request, response) {
    logger.info('trainer-assessment view rendering'); 
    //variable created to store ID of assessment list
    const assessmentListId = request.params.id;
    //variable created to store ID of assessment
    const assessmentId = request.params.assessmentid; 
    
    logger.debug(`Viewing Assessment ${assessmentId} from Assessment List ${assessmentListId}`);

    const viewData = {
      title: 'Assessment',
      assessment: assessmentListStore.getAssessment(assessmentId),
    };
    
    response.render('trainer-assessment', viewData);
  },
  
  //didnt manage to get this working
  addComment(request, response){
    
  //variable created to store ID of assessment list - it is passed as a parameter into the request below
  const assessmentListId = request.params.id;
  const assessmentId = request.params.assessmentid;
    
  //variable uses to store the returned assessment list from the assessment list store
  const assessmentList = assessmentListStore.getAssessmentLists(assessmentListId);
   
  logger.debug('Comment for Assessment id:', assessmentId);

  //object created to store a new comment
  const newComment = request.body.comment;

  assessmentListStore.addComment(assessmentId, newComment);
  response.redirect('/assessment/' + assessmentListId);
  },
  
  //method for viewing members
  viewMembers(request, response){
    logger.info('trainer-memberList view rendering');
    const viewData = {
      title: 'Gym Members',
      members: userstore.getAllUsers(request),
    }
    response.render('trainer-memberList', viewData);  
  },
  
};

//export the 'trainer dashboard' controller so it can be used by other controllers
module.exports = trainerDashboard;