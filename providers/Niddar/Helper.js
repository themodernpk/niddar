'use strict'
var moment = require('moment');
class Helper {
  bodyClass(url, classes) {
    var urlSplit = url.split("/");
    var bodyClass = "";
    urlSplit.forEach(function (item) {
      if (item) {
        bodyClass += item + " ";
      }
    });
    bodyClass += classes;
    return bodyClass;
  }

  //---------------------------------------------------
  validationErrors(errors) {
    var list = {};
    var i = 0;
    errors.forEach(function (item) {
      list[i] = item.message;
      i++;
    })
    return list;
  }

  //---------------------------------------------------
  validationMessages(type, field) {
    var message;
    switch (type) {
      case 'required':
        message = field + " is required";
        break;
      case 'unique':
        message = field + " is already exist";
        break;
      case 'alpha_numeric':
        message = "Only alpha numeric characters are allow in "+field+" field";
        break;
      case 'integer':
        message = "Only number are allow in "+field+" field";
        break;
    }
    return message;
  }

  //---------------------------------------------------
  dateTime()
  {
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  }
  //---------------------------------------------------
}
module.exports = Helper;
