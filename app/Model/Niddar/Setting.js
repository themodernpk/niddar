'use strict'
const Lucid = use('Lucid');
const Validator = use('Validator');
const Niddar = use('App/Niddar');
const table = "core_settings";
class Setting extends Lucid {


  //---------------------------------------------
  static get table() {
    return table;
  }

  //---------------------------------------------
  static get deleteTimestamp() {
    return null
  }

  //---------------------------------------------
  static get dateFormat() {
    return 'YYYY-MM-DD HH:mm:ss'
  }

  //---------------------------------------------
  static recordPerPage()
  {
    return 5;
  }

  //---------------------------------------------

  //---------------------------------------------
  //---------------------------------------------
  //---------------------------------------------
}
module.exports = Setting
