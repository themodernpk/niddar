'use strict';
const Route = use('Route');

class ClassLoader {
  * handle (request, response, next) {

    console.log("response", Route.url("bPlist"));

    yield next;
  }
}
module.exports = ClassLoader;