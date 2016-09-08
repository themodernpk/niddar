'use strict'

const Lucid = use('Lucid')
const table = "core_tokens";

class Token extends Lucid {


  //--------------------------------------------------
  static get table() {
    return table
  }
  //--------------------------------------------------
  user () {
    return this.belongsTo('App/Model/Niddar/User')
  }
  //--------------------------------------------------
  //--------------------------------------------------
  //--------------------------------------------------

}

module.exports = Token;
