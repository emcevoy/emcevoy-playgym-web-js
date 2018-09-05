//controller that deals with login, registration, authentication of users
//also has get current and get all user methods

'use strict';
const userstore = require('../models/user-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

//controller for dealing with user accounts
const accounts = {

  //method for initial view on start up of the app
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  //method for app login 
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  //method for logging out
  logout(request, response) {
    response.cookie('playgym', '');
    response.redirect('/');
  },

  //method for new members to sign up page
  signup(request, response) {
    const viewData = {
      title: 'Signup to the Service',
    };
    response.render('signup', viewData);
  },
  
  //method for dealing with member registration and adding new users
  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  //method for authenticating users on login using email adresses and assigning session cookies
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    //if user
    if (user) {
      response.cookie('playgym', user.email);
      logger.info(`logging in ${user.email}`);
      logger.info(`Welcome ${user.firstName}`);
      response.redirect('/dashboard');
    }
    //if trainer
    else if (trainer) {
      response.cookie('playgym', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      logger.info(`Welcome ${trainer.firstName}`);
      response.redirect('/trainer-dashboard');
    }
    //redirect to login form
    else {
      response.redirect('/login');
    }
  },

  //method to get the current user - checks session cookies
  getCurrentUser(request) {
    const userEmail = request.cookies.playgym;
    return userstore.getUserByEmail(userEmail);
  },
  
  //method to get all users
  getAllUsers(request) {
    return userstore.getAllUsers();
  },
  
};

//export the 'accounts' controller so it can be used by other controllersmodule.exports = accounts;
module.exports = accounts;