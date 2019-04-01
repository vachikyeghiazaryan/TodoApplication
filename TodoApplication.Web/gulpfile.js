/// <binding AfterBuild='default' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');

var paths = {
    scripts: ['wwwroot/scripts/**/*.js'],
    vendor: [
        'node_modules/systemjs/dist/system.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/jquery-validation/dist/jquery.validate.js'
    ],
    css: ['node_modules/bootstrap/dist/css/bootstrap.css']
};

gulp.task('clean', function () {
    return del(['wwwroot/dist/**/*']);
});

gulp.task('default', function () {
    gulp.series('scripts');
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('wwwroot/dist'));
});

gulp.task('vendor', function () {
    return gulp.src(paths.vendor)
        //.pipe(minifyCSS())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('wwwroot/dist'));
});

gulp.task('css', function () {
    return gulp.src(paths.css)
        //.pipe(minifyCSS())
        .pipe(concat('site.css'))
        .pipe(gulp.dest('wwwroot/dist'));
});

gulp.task('watch', function () {
    return paths.scripts.forEach(script => gulp.watch(script, gulp.series('scripts')));
});
