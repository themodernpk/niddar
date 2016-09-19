'use strict';
const View = use('View')

class ViewUrl {
  * handle (request, response, next) {
    View.global('url', request.url());
    View.global('query_string', request.all());
    View.global('current_url', request.originalUrl());
    yield next;
  }
}
module.exports = ViewUrl;