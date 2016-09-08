'use strict'
const Lucid = use('Lucid');
const Validator = use('Validator');
const Niddar = use('App/Niddar');
const Role = use('App/Model/Niddar/Role');
const Hash = use('Hash');
const table = "core_users";
class User extends Lucid {


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
  apiTokens () {
    return this.hasMany('App/Model/Niddar/Token')
  }
  //---------------------------------------------
  roles() {
    return this.belongsToMany('App/Model/Niddar/Role', 'core_user_role', 'core_user_id', 'core_role_id')
  }

  //---------------------------------------------
  permissions() {
    return this.hasManyThrough('App/Model/Niddar/Permission', 'App/Model/Niddar/Role')
  }

  //---------------------------------------------

  //---------------------------------------------
  static rules(input) {
    var validation = {
      first_name: 'required|alpha',
      email: 'required|email|unique:' + table + ',email',
      password: 'required|min:6|max:30',
    };
    var messages = {
      'first_name.required': Niddar.helper.validationMessages('required', 'Your first name'),
      'email.required': Niddar.helper.validationMessages('required', 'Your email'),
      'email.unique': Niddar.helper.validationMessages('unique', 'Email'),
      'password.required': Niddar.helper.validationMessages('required', 'Password'),
      'username.alpha_numeric': Niddar.helper.validationMessages('alpha_numeric', 'Username'),
      'username.unique': Niddar.helper.validationMessages('unique', 'Username'),
      'mobile.integer': Niddar.helper.validationMessages('integer', 'Mobile'),
      'gender.in': "Gender should be either Male, Female or Other",
    };
    var data = {
      validation: validation,
      messages: messages,
      sanitize: this.sanitizeRules()
    };
    return data;
  }

  //---------------------------------------------
  //---------------------------------------------
  static sanitizeRules() {
    return {
      email: 'normalize_email',
    }
  }

  //---------------------------------------------
  *createAdmin() {
  }

  //---------------------------------------------
  *createFirstAdmin(input) {

    //..............if users already exist
    const count = yield User.query().count();
    if (count[0]['count(*)']) {
      result = {
        status: "warning",
        messages: [{message: "Users already exist, hence you can't create admin from here"}]
      };
      return result;
    }

    //..............validation
    const rules = User.rules();
    const validation = yield Validator
      .validateAll(input, rules.validation, rules.messages);
    if (validation.fails()) {
      var result = {
        status: "failed",
        errors: validation.messages()
      };
      return result;
    }

    //..............if admin role already exist
    var role = yield Role.findBy("slug", "admin");
    if(!role)
    {
      var role = new Role();
      var roleInput = {
        name: "Admin"
      };
      var role = yield role.createItem(roleInput);
      if (role.status == "failed")
      {
        return role;
      }
    }



    //..............sensitization
    var input = Validator.sanitize(input, rules.sanitize);

    input.enable = 1;
    //..............create the record
    const user = new User();
    input.password = yield Hash.make(input.password);
    Object.keys(input).forEach(function (key) {
      user[key] = input[key];
    });
    yield user.save();
    yield user.roles().attach([role.data.id]);
    var result = {
      status: "success",
      data: user,
      messages: [
        {
          type: "success",
          message: "Admin account successfully created"
        }
      ]
    }
    return result;
  }

  //---------------------------------------------
  //---------------------------------------------
}
module.exports = User
