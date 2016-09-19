'use strict'
const Niddar = use("App/Niddar");
const User = use("App/Model/Niddar/User");
const Setting = use("App/Model/Niddar/Setting");
const Permission = use("App/Model/Niddar/Permission");
const Route = use('Route');

var view = Niddar.settings.backendThemePath() + "/permission";
var data = {};
var result = {};
var permission = new Permission();

class PermissionController {
//---------------------------------------------------------
//---------------------------------------------------------
    *index(request, response) {
        data.input = request.all();
        data.params = request.params();
        data.title = Niddar.info.appName();
        data.bodyClass = "";
        return yield response.sendView(view + "/index", {data});
    }

    //---------------------------------------------------------
    *create(request, response) {
        data.input = request.except("_csrf", "submit");
        data.params = request.params();
        try {
            result = yield permission.createItem(data.input);
            if (result.status == "success") {
                result.html = yield response.view(view + "/partials/item", {item: result.data});
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
    *list(request, response) {
        data.input = request.all();
        data.params = request.params();
        var page = 1;

        if (data.input.hasOwnProperty('page')) {
            page = data.input.page;
        }

        try {
            result = yield permission.listItems(page);
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
