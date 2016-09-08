'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('frontend/index')




/*
 |--------------------------------------------------------------------------
 | Backend - Setup
 |--------------------------------------------------------------------------
 */
Route.group('backend', function () {

    //application setup

    Route.any("/database/save", 'Niddar/SetupController.dbSave')
        .as("setupDbSave");

    Route.any("/database/connect", 'Niddar/SetupController.dbConnect')
        .as("setupDbConnect");


    Route.get("/migration/run", 'Niddar/SetupController.migrationRun')
        .as("setupMigrationRun").formats(['json']);

    Route.get("/migration/reset", 'Niddar/SetupController.migrationReset')
        .formats(['json']);

    Route.get("/migration/refresh", 'Niddar/SetupController.migrationRefresh')
        .formats(['json']);


    Route.any("/create/first/admin", 'Niddar/SetupController.createFirstAdmin')
        .as("setupCreateFirstAdmin");



}).prefix('/backend/setup');


/*
 |--------------------------------------------------------------------------
 | Backend - Public
 |--------------------------------------------------------------------------
 */
Route.group('bPublic', function () {

    Route.get("/", 'Niddar/BackendController.redirectToLogin')
        .as("bIndex");

    Route.get("/login", 'Niddar/BackendController.login')
        .as("bLogin");

    Route.get("/create/admin", 'Niddar/BackendController.createAdmin')
        .as("bCreateAdmin");

    Route.post("/create/admin", 'Niddar/BackendController.createAdminPost')
        .as("bCreateAdminPost");

    Route.any("/authenticate", 'Niddar/BackendAuthController.authenticate')
        .as("bAuthenticate");

}).prefix('/backend');

/*
 |--------------------------------------------------------------------------
 | Backend - Public
 |--------------------------------------------------------------------------
 */
Route.group('bProtected', function () {

    Route.get("/dashboard", 'Niddar/BackendController.dashboard')
        .as("bDashboard");

    Route.get("/logout", 'Niddar/BackendAuthController.logout')
        .as("bLogout");

    //---------------------Permissions

    Route.get("/admin/permission", 'Niddar/PermissionController.index')
        .as("bPindex");

    Route.any("/admin/permission/create", 'Niddar/PermissionController.create')
        .as("bPcreate");

    Route.any("/admin/permission/list", 'Niddar/PermissionController.list')
        .as("bPlist");


}).prefix('/backend').middleware('authBackend');