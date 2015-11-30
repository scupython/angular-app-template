'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    server = require('gulp-server-livereload');

var filePath = {
    vendorCSS: {
        src: [
            "./bower_components/angular-material/angular-material.min.css",
            "./bower_components/font-awesome/css/font-awesome.min.css"
        ],
        dest: './app/css'
    },
    vendorJS: {
        src: [
            "./bower_components/angular/angular.min.js",
            "./bower_components/angular-animate/angular-animate.min.js",
            "./bower_components/angular-aria/angular-aria.min.js",
            "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "./bower_components/angular-messages/angular-messages.min.js",
            "./bower_components/angular-material/angular-material.min.js"
        ],
        dest: "./app/js"
    },
    fonts: {
        src: ["./bower_components/font-awesome/fonts/*.*"],
        dest: "./app/fonts"
    }
}

gulp.task('dev', ['vendor']);

gulp.task('js', function () {
  gulp.src(['app/js/src/module.js', 'app/js/src/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      //.pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('app/js/'))
})

gulp.task('vendor', function() {
    gulp.src(filePath.vendorCSS.src).pipe(gulp.dest(filePath.vendorCSS.dest));
    gulp.src(filePath.vendorJS.src).pipe(gulp.dest(filePath.vendorJS.dest));
    gulp.src(filePath.fonts.src).pipe(gulp.dest(filePath.fonts.dest));
});

gulp.task('watch', function() {
	gulp.watch('app/js/src/**/*.js', ['js']);
    gulp.src('src')
        .pipe(server({
            host: process.env.IP,
			port: process.env.PORT,
            livereload: true,
            open: true
        }));
});