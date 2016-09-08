'use strict'

class Info{
    constructor (Config) {
        this.locale = Config.get('app.locale')
    }
    //---------------------------------------
    stage()
    {
        return "alpha"
    }
    //---------------------------------------
    versionNumber(){
        return 1.0;
    }
    //---------------------------------------
    version()
    {
        return this.stage()+" v"+this.versionNumber();
    }
    //---------------------------------------
    appName()
    {
        return "Niddar - Application Framework"
    }
    //---------------------------------------

}
module.exports = Info