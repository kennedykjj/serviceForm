var mongoose = require('mongoose');
var FormPartialModel = require('./formpartialModel');
var FormFinalModel = require('./formfinalModel');
var _ = require('lodash');
var logger = require('../../util/logger');
var business = require('../../middleware/businessMiddleware')

exports.postPartial = function(req, res, next) {
  logger.log('Initializing /partial process with sessionId: '+ req.body.sessionId);
  // verify if the sessionId already exist in DB, if exists, update it
  FormPartialModel.findOneAndUpdate(
      {sessionId: req.body.sessionId}, //find a doc with that filter
      req.body, //doc to insert if not exist in DB
      {upsert: true, new: true, runValidators: true}//aditional properties
      ) 
    .then(function(createdform) {
      logger.log('Finishing /partial process with sessionId: '+ req.body.sessionId + ' with success');
      logger.log(createdform)
      res.json(createdform);
    }, function(err) {
      res.status(500).send('Finishing /partial process with sessionId: '+ req.body.sessionId + ' with error');
    });
};

exports.postFinal = function(req, res, next) {
  logger.log('Initializing /final process with sessionId: '+ req.body.sessionId);
  //Valid if there isn't a doc with the same CPF with less than 90 days from date.now, if not
  //If not continue
  FormFinalModel.findOne({cpf: req.body.cpf}, function(err,doc) {
    if(!err){
      if(doc != null){
        var bol = business.validate90days(doc.body.insertiondate, Date.now());
        if(!bol){
          res.status(500).send("There's a insertion with this CPF with less than 90 days from now ("+Date.now()+")");
        }
      }
    }
    else{
      next(err);
    }
  });
  //Valid if the guy isn't younger than 18 and not older than 80
  var bol = business.validateAge(req.body.birthdate);
  if(!bol){
    res.status(500).send("User is younger than 18 or older than 80");
  }
  //delete from partialmodel collection the doc with the sessionId
  FormPartialModel.deleteOne({sessionId: req.body.sessionId})
  .then(function(deletedform){
    logger.log("Data from " + req.body.sessionId + " deleted from formpartial collection")
  });
  FormFinalModel.create(req.body)
    .then(function(createdform) {
      logger.log('Finishing /final process with sessionId: '+ req.body.sessionId + ' with success');
      logger.log(createdform);
      res.json(createdform);
    }, function(err) {
      res.status(500).send('Finishing /final process with sessionId: '+ req.body.sessionId + ' with error');
    });
};