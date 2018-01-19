'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var rimraf      = require('rimraf');
var rename      = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var cssmin      = require('gulp-cssmin');

// ---------------browserSync-----------------------
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});

// ------------------Pug----------------------------
gulp.task('pug', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(pug({
    pretty: true 
  }))
  .pipe(gulp.dest('build'))
});

//---------------Sass--------------------------------
gulp.task('sass', function () {
  return gulp.src('source/style/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('build/css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'));
});
 

//---------------Sprite-----------------------------
gulp.task('sprite', function () {
  var spriteData = gulp.src('sourse/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass'
  }));
  return spriteData.pipe(gulp.dest('build/img'));
});

//----------------Delete-------------------------
gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('source/template/**/*.pug', gulp.series('pug'));
  gulp.watch('source/style/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('pug', 'sass', 'sprite'),
  gulp.parallel('watch', 'server')
  )
);