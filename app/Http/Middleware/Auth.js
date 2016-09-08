'use strict'


class Auth {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller

    const user = yield request.auth.getUser()

    if (user) {
      response.ok(user)
      return
    }

    response.unauthorized('You must login to view your profile')

    yield next
  }

}

module.exports = Auth
