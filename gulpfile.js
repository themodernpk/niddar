var gulp = require('gulp');
var browserify = require('gulp-browserify');
var minify = require('gulp-minifier');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var watch = require('gulp-watch');
//--------------------------------------------------
gulp.task('default', ['watch']);
//--------------------------------------------------
gulp.task('watch', function () {
    gulp.watch('assets/**/*.*', ['backendjs', 'backendcss']);
});
//--------------------------------------------------
gulp.task('build', ['backendjs', 'backendcss', 'bowerjs', 'bowercss', 'fonts', 'vendor']);
//--------------------------------------------------
gulp.task('backendjs', function() {
    gulp.src('assets/backend/pages/**/*.js')
        .pipe(minify({
            //minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            //minifyJS: true
        }))
        .pipe(gulp.dest('./public/assets/backend/pages'))
});
//--------------------------------------------------
gulp.task('backendcss', function() {
    gulp.src('assets/backend/pages/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/assets/backend/pages'))
});
//--------------------------------------------------
gulp.task('bowerjs', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles('**/*.js'))
        .pipe(uglify())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest('./public/assets/bower'));
});
//--------------------------------------------------
gulp.task('bowercss', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles('**/*.css'))
        .pipe(minifyCSS())
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('./public/assets/bower'));
});
//--------------------------------------------------
gulp.task('fonts', function() {
    return gulp.src('./bower_components/**/fonts/*')
        .pipe(flatten())
        .pipe(gulp.dest('./public/assets/fonts/'));
});
//--------------------------------------------------
// Basic usage
gulp.task('vendor', function() {
    gulp.src('assets/vendor/**/*')
        .pipe(gulp.dest('./public/assets/vendor'))
});
//--------------------------------------------------