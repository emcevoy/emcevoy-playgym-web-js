'use strict';

const accounts = require ('./accounts.js');
const userstore = require('../models/user-store');
const assessment = require ('./assessment.js');
const logger = require('../utils/logger');
const assessmentListStore = require('../models/assessmentList-store');
const uuid = require('uuid');

const gymUtility = {
  index(request, response) {
    logger.info('');
    const viewData = {
      //not used
    };
    logger.info('');
    response.render('dashboard', viewData);
  },
  
  //never managed to get this working
  currentBMI(request, response){
    logger.info('user:', loggedInUser.firstName + loggedInUser.lastName);
    const loggedInUser = accounts.getCurrentUser(request);
    
    const currentBMI = 0;
    
  },
  

  
};

module.exports = gymUtility;