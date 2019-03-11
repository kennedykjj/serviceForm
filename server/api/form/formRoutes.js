var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./formController');

router.route('/partial')
  .post(controller.postPartial)
  logger.log('/partial Working!')

router.route('/final')
 .post(controller.postFinal)
  logger.log('/final Working!')

module.exports = router;

