//controler to render the 'About' page of the app

'use strict';

const logger = require('../utils/logger');
const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      //title of the 'About' page
      title: 'About PlayGym JS',
    };
    //render the 'About' page passing in the title contained in the viewData object
    response.render('about', viewData);
  },
};

//export the 'about' controller so it can be used by other controllers
module.exports = about;
