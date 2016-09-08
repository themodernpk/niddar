'use strict'
class AuthBackend {
  * handle(request, response, next) {
    const user = yield request.auth.getUser();
    if (user) {
      yield next
    } else {
      yield request
        .with({errors: [{message: "Please login to access the page"}]})
        .flash();
      var currentURL = request.url();
      if (currentURL != "/backend/logout") {
        yield request.session.put({redirectAfterLogin: request.url()});
      }
      return response.route('bLogin');
    }
  }
}
module.exports = AuthBackend
