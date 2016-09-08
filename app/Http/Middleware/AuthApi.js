'use strict';
const Token = use('App/Model/Niddar/Token');
const User = use('App/Model/Niddar/User');
class AuthApi {
  * handle(request, response, next) {
    const api = request.auth.authenticator('api');
    var input = request.all();

    if (!input.apiToken) {
      var result = {
        status: "failed",
        errors: [{message: "Api token is not provided"}]
      };
      response.json(result);
      return;
    }

    //check if token exist
    var token = yield Token.findBy("token", input.apiToken);
    if(!token)
    {
      var result = {
        status: "failed",
        errors: [{message: "Invalid api token"}]
      };
      response.json(result);
      return;
    }

    //check if user exist
    var user = yield token.user().first();
    if(!user)
    {
      var result = {
        status: "failed",
        errors: [{message: "User associated to provided api token does not exist"}]
      };
      response.json(result);
      return;
    }

    //check if user is enable
    if(!user.enable)
    {
      var result = {
        status: "failed",
        errors: [{message: "User associated to provided api token is inactive"}]
      };
      response.json(result);
      return;
    }

    //login via id
    yield request.auth.loginViaId(user.id);

    yield next
  }
}
module.exports = AuthApi
