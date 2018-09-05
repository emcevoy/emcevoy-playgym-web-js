//controller that deals with assessment lists and assessments
//displays current logged in users assessment lists
//also has methods for adding and deleting assessments

'use strict';
//import utils logger, assessmentList-store model & uuid ID generator
const accounts = require ('./accounts.js');
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const assessmentListStore = require('../models/assessmentList-store');
const uuid = require('uuid');

const assessment = {
  
  //index method to display current logged in user assessment lists
  index(request, response) {
    
    //variable created to store ID of assessment list
    const assessmentListId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('AssessmentList id: ', assessmentListId);
    
    //object created to hold the assessment lists for logged in user from the assessment list store
    const viewData = {
      title: 'Member Assessments',
      //get an assessment list from the assessmentList Store - based on its ID
      assessmentList: assessmentListStore.getAssessmentLists(assessmentListId),
      user: userstore.getUserById(loggedInUser.id),
      firstName: loggedInUser.firstName,
    };
    logger.info('Rendering logged in user\'s assessments');
    logger.debug('Logged in Member Name: ', loggedInUser.firstName);
    //pass it to the 'assessmentlist' view
    response.render('assessmentlist', viewData);
  },
  
  //method for deleting an assessment
   deleteAssessment(request, response) {
     
    //variable created to store ID of assessment list
    const assessmentListId = request.params.id;
     
    //variable created to store ID of assessment
    const assessmentId = request.params.assessmentid;
     
    //message to show that the assessment is being deleted from the assessment list
    logger.debug(`Deleting Assessment ${assessmentId} from Assessment List ${assessmentListId}`);
     
    //calling the removeAssessment method from the assesmentListStore model
    assessmentListStore.removeAssessment(assessmentListId, assessmentId);
     
    //display the assessment view with the assessmentlist
    response.redirect('/assessment/' + assessmentListId);
  },

  //method for adding a new assessment
  addAssessment(request, response) {
    
    //variable created to store ID of assessment list - it is passed as a parameter into the request below
    const assessmentListId = request.params.id;
    
    //variable uses to store the returned assessment list from the assessment list store
    const assessmentList = assessmentListStore.getAssessmentLists(assessmentListId);
    
    // variable used to store the current date - used to timestamp an assessment
    const date =  new Date(); 
    
    // object created to store a new assessment
    const newAssessment = {
      id: uuid(),
      date: date.toUTCString().slice(0, 22),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    
    //message displayed when a new assessment is created - displays the assessment id as well
    logger.debug('New Assessment = ', newAssessment);
    
    //addAssessment method called in the assessmentListStore model
    assessmentListStore.addAssessment(assessmentListId, newAssessment);
    
    //display the assessment view with the assessmentlist
    response.redirect('/assessment/' + assessmentListId);
  },

};
//export the 'assessment' controller so it can be used by other controllers
module.exports = assessment;