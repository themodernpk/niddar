'use strict'

const Database = use('Database');
const Validator = use('Validator');
const Niddar = use('App/Niddar');
const User = use('App/Model/Niddar/User');
var data;
var result;


class BackendAuthController{

//---------------------------------------------------------

  //---------------------------------------------------------
  *authenticate(request, response)
  {
    var input = request.all();

    //..............validation
    var rules = {
      validation: {
        email: 'required|email',
        password: 'required'
      },
      messages: {
        'email.required': Niddar.helper.validationMessages('required', 'Email'),
        'password.required': Niddar.helper.validationMessages('password', 'Password'),
      },
      sanitize: {
        email: 'normalize_email'
      }
    };

    const validation = yield Validator
        .validateAll(input, rules.validation, rules.message);
    if (validation.fails()) {
      var result = {
        status: "failed",
        errors: validation.messages()
      };
      return response.json(result);
    }

    var input = Validator.sanitize(input, rules.sanitize);

    try
    {
      const login = yield request.auth.attempt(input.email, input.password);


      if (!login){
        result = {
          status: "failed",
          errors: [{message: "Invalid credentials"}]
        };
        return response.json(result);
      }

      //var currentUser = yield User.findBy("email", email);
      var currentUser = yield request.auth.getUser();

      //check is account is enabled
      if(!currentUser.enable)
      {
        result = {
          status: "failed",
          errors: [{message: "Account is disabled"}]
        }
        return response.json(result);
      }

      //TODO:: check if user has the permission for backend login

      currentUser.last_login = Niddar.helper.dateTime();
      currentUser.last_login_ip = request.ip();
      currentUser.save();

      if(!input.redirect_url)
      {
        input.redirect_url = "/backend/dashboard";
      }

      result = {
        status: "success",
        action: {
          redirect: true,
          url: input.redirect_url
        }
      }
      return response.json(result);

    } catch (e)
    {
      result = {
        status: "failed",
        errors: [{message: e.message}]
      };
      return response.json(result);
    }


  }
  //---------------------------------------------------------
  *logout(request, response)
  {
    yield request.auth.logout();
    return response.route("bLogin");
  }

  //---------------------------------------------------------

  //---------------------------------------------------------

} //end of class

module.exports = BackendAuthController;
