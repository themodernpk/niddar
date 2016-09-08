'use strict'
var httpRequest = require("request");
const Ace = use('adonis-ace');
const Database = use('Database');
const Niddar = use("App/Niddar");
const fs = use('fs');
const Route = use('Route');
const Hash = use('Hash');
const Validator = use('Validator');
const User = use('App/Model/Niddar/User');
const Role = use('App/Model/Niddar/Role');
var data;
var result = {} ;
class SetupController {

  //---------------------------------------------------------

  //---------------------------------------------------------
  *dbSave(request, response) {
    const redirect = {
      back: "setupDatabase",
      forward: "setupMigration"
    };
    if (!request.ajax()) {
      yield request
        .withAll()
        .andWith({errors: [{message: "Please submit the form again."}]})
        .flash();
      return response.route(redirect.back);
    }
    var input = request.all();
    //try database connection
    try {
      yield Database.connection("mysql").table("core_users");
      data = {
        status: "success",
        messages: [
          {
            type: "success",
            message: "Application is connected with database"
          }
        ]
      };
      return response.json(data);
    } catch (errors) {
      //do nothing
    }
    var rules = {
      hostname: 'required',
      database: 'required',
      username: 'required',
    };
    var messages = {
      'hostname.required': Core.Helper.validationMessages('required', 'hostname')
    };
    const validation = yield Validator.validateAll(input, rules, messages);
    if (validation.fails()) {
      data = {
        status: 'failed',
        errors: validation.messages()
      };
      return response.json(data);
    }

    var data = {};
    fs.readFile('.env', 'utf8', function (err, data) {
      if (err) {
        data = {
          status: "failed",
          errors: err
        };
        return response.json(data);
      }
      var lines = data.split("\n");
      var update = "";
      lines.forEach(function (line) {
        var item = line.split("=");
        var key = item[0];
        var val = item[1];
        if (key == "") {
          return;
        }
        switch (key) {
          case 'DB_HOST':
            val = input.hostname;
            break;
          case 'DB_USER':
            val = input.username;
            break;
          case 'DB_PASSWORD':
            val = input.password;
            break;
          case 'DB_DATABASE':
            val = input.database;
            break;
          case 'DB_CONNECTION':
            val = "mysql";
            break;
        }
        update += key + "=" + val + "\n";
      });
      console.log("response", update);
      fs.writeFile('.env', update, function (err) {
        if (err) {
          data = {
            status: "failed",
            errors: err
          };
          return response.json(data);
        }
      });
    });

  }

  //---------------------------------------------------------
  *dbConnect(request, response) {
    //try database connection
    try {
      yield Database.connection("mysql").table("core_users");
      data = {
        status: "success",
        messages: [
          {
            type: "success",
            message: "Application is connected with database"
          }
        ]
      };
      return response.json(data);
    } catch (errors) {
      //if not able to connect with database
      data = {
        status: "failed",
        errors: [
          {
            message: "Unable to connect with database"
          }
        ]
      };
      return response.json(data);
    }
  }

  //---------------------------------------------------------


  //---------------------------------------------------------
  *migrationRun(request, response) {
    data.redirect = {
      back: Route.url("setupMigration"),
      forward: Route.url("setupCreateAdmin")
    };
    if (!request.ajax()) {
      yield request
        .withAll()
        .andWith({errors: [{message: "Please run the migrations again."}]})
        .flash();
      return response.redirect(data.redirect.back);
    }
    try {
      yield Ace.call('migration:run', {}, {help: true});
      data = {
        status: "success",
        redirect: data.redirect,
        messages: [
          {
            type: "success",
            message: "Migration was successful"
          }
        ]
      };
    } catch (errors) {
      data = {
        status: "failed",
        errors: errors
      };
    }
    return response.json(data);
  }

  //---------------------------------------------------------
  *migrationReset(request, response) {
    try {
      yield Ace.call('migration:reset', {}, {help: true});
      var data = {
        status: "success"
      };
      return response.json(data)
    } catch (errors) {
      var data = {
        status: "failed",
        errors: errors
      };
      return response.json(data)
    }
  }

  //---------------------------------------------------------
  *migrationRefresh(request, response) {
    try {
      yield Ace.call('migration:refresh', {}, {help: true});
      var data = {
        status: "success"
      };
      return response.json(data)
    } catch (errors) {
      var data = {
        status: "failed",
        errors: errors
      };
      return response.json(data)
    }
  }

  //---------------------------------------------------------


  //---------------------------------------------------------

  //---------------------------------------------------------


  //---------------------------------------------------------
  //---------------------------------------------------------
} //end of class
module.exports = SetupController;

