var logger = require('../util/logger');
var moment = require('moment');

 function validateAge(birthdate)
 {
   //get the diff between birthdate and now.date
    var age = moment().diff(moment(birthdate, 'YYYY-MM-DDTHH:MM:SS'), 'years');
    logger.log(age);
    if(age > 18 && age < 80){
      return true;
    }
    else{
      return false;
    }
  }; 

  function validate90days(insertiondate, now)
  {
    //TODO nowdate + 90 for maior que a insertiondate retornar true
    var insertiondateDate = new Date(insertiondate);
    var nowDate = new Date(now);
    logger.log(nowDate.toString()); 
    nowDate.setDate(nowDate.getDate - 90);
     logger.log(insertiondateDate.toString()); 
     if(now <= insertiondateDate){
       return true;
     }
     else{
       return false;
     }
   }; 

module.exports = { validateAge, validate90days }