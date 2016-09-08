'use strict'

const Database = use('Database');
const Niddar = use("App/Niddar");
const User = use("App/Model/Niddar/User");
const Permission = use("App/Model/Niddar/Permission");
var Pagination = require('pagination-object');
var NiddarPagination = require("niddar-pagination-generator");
var Url = require('url');

const permission = new Permission();
var data = {};
var view = Niddar.settings.backendThemePath()+"/permission";
var result = {};

class PermissionController{
//---------------------------------------------------------

//---------------------------------------------------------
  *index(request, response)
  {
    data.input = request.all();
    data.params = request.params();
    data.title = Niddar.info.appName();
    data.bodyClass = "";
    return yield response.sendView(view+"/index", {data});
  }
  //---------------------------------------------------------
  *create(request, response)
  {
    data.input = request.except("_csrf", "submit");
    data.params = request.params();

    try {
      result = yield permission.createItem(data.input);
      if (result.status == "success") {
        result.html = yield response.view(view+"/partials/item", {item: result.data});
      }
      return response.json(result);
    } catch (e) {
      result = {
        status: "failed",
        errors: [{message: e.message}]
      };
      return response.json(result);
    }
  }

  //---------------------------------------------------------
  *list(request, response)
  {
    data.input = request.all();
    data.params = request.params();
    data.queryString = Url.parse(data.input.current_url, true);
    data.paginationUrl = data.queryString.pathname;

    var page = 1;
    if(data.queryString.query.page)
    {
      page = parseInt(data.queryString.query.page);
      delete data.queryString.search;
      delete data.queryString.query.page;
      data.paginationUrl = Url.format(data.queryString);
    }




    try {
      result = yield permission.listItems();
      if (result.status == "success"){
        result.data.pagination = new Pagination({
          currentPage  : page,
          totalItems   : result.data.total,
          itemsPerPage : result.data.perPage
        });

        var currentPage = 47;
        var config = {
          totalRecords: 500,
          recordsPerPage: 10,
          currentPage: currentPage,
          url: "http://localhost.com/page.php?page="+currentPage+"&search=5#time",
        };

        result.data.pagi = new NiddarPagination(config);
        //console.log("response", result.data.pagi.firstHalf);

        result.html = yield response.view(view+"/partials/list", {data: result.data, list: result.data.data});
      }
      return response.json(result);
    } catch (e) {
      result = {
        status: "failed",
        errors: [{message: e.message}]
      };
      return response.json(result);
    }
  }

  //---------------------------------------------------------

  //---------------------------------------------------------

  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------

} //end of class

module.exports = PermissionController;
