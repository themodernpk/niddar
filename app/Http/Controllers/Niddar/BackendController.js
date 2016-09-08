'use strict'

const Database = use('Database');
const Niddar = use("App/Niddar");
const User = use("App/Model/Niddar/User");
const user = new User();
var data = {};
var result = {};

class BackendController{
//---------------------------------------------------------

//---------------------------------------------------------
  *redirectToLogin(request, response)
  {
    return yield response.route("bLogin");
  }
//---------------------------------------------------------
  *login(request, response)
  {
    data.input = request.all();
    data.params = request.params();
    data.title = Niddar.info.appName();
    data.bodyClass = "";
    return yield response.sendView(Niddar.settings.backendThemePath()+"/login", {data});
  }
  //---------------------------------------------------------
  *createAdmin(request, response)
  {
    data.input = request.except("_csrf");
    data.params = request.params();
    data.title = "Create first admin";
    data.bodyClass = "";
    return yield response.sendView(Niddar.settings.backendThemePath()+"/createAdmin", {data});
  }
  //---------------------------------------------------------
  *createAdminPost(request, response)
  {
    data.input = request.except("_csrf");
    data.params = request.params();
    try{
      result = yield user.createFirstAdmin(data.input);
      if(result.status == "success" || result.status=="warning")
      {
        yield request
            .with({flash: result.messages})
            .flash();

        result.action ={
          redirect: true,
          url: "/backend"
        };
      }
    } catch (e)
    {
      result = {
        status: "failed",
        errors: [{message: e.message}]
      }
    }

    return response.json(result);
  }
  //---------------------------------------------------------
  *dashboard(request, response)
  {
    data.input = request.all();
    data.params = request.params();
    data.url = request.url();
    data.title = "Dashboard";
    data.bodyClass = "";
    return yield response.sendView(Niddar.settings.backendThemePath()+ "/dashboard", {data});
  }
  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------

} //end of class

module.exports = BackendController;
