'use strict'
const ServiceProvider = require('adonis-fold').ServiceProvider;

class NiddarProvider extends ServiceProvider {
    *register() {
        this.app.bind('App/Niddar', function (app) {
            const Config = app.use('Config');
            var result = {};

            const Info = require('./Info');
            result.info = new Info(Config);
            const Settings = require('./Settings');
            result.settings = new Settings(Config);
            const Helper = require('./Helper');
            result.helper = new Helper(Config);

            return result;
        })
    }
}

module.exports = NiddarProvider;