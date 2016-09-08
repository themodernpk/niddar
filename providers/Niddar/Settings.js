'use strict'

class Settings{
    constructor (Config) {
        this.locale = Config.get('app.locale')
    }
    //---------------------------------------
    backendThemePath(){
        return "backend/themes/default";
    }
    //---------------------------------------

    setViewGlobals(){
        var result = {
            "backend_theme_directory": this.backendThemePath(),
            "backend_assets_directory": "/assets/backend",
            "vendor_directory": "/assets/vendor",
        }
        return result;
    }

    //---------------------------------------
    //---------------------------------------

}
module.exports = Settings