"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();


var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var replace = require('gulp-replace');
var uglify = require("gulp-uglify");
var babel = require('gulp-babel');
var concat = require("gulp-concat");

gulp.task("csscomb", function() {
  return gulp.src("src/less/blocks/*.less")
    .pipe(csscomb(require("./.csscomb.json")))
    .pipe(gulp.dest("src/less/blocks"));
});

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("src/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
})

gulp.task("sprite", function () {
  return gulp.src("src/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
})

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(replace('<!-- <include src="build/img/sprite.svg"></include> -->', '<include src = "build/img/sprite.svg"></include>'))
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
})

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**"
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"));
})

gulp.task("clean", function () {
  return del("build");
});

gulp.task("scripts", function() {
  return gulp.src("src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(rename("script.min.js"))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("src/img/icon-*.svg", gulp.series("sprite", "html"));
  gulp.watch("src/*.html"), gulp.series("html");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "images",
  "webp",
  "html",
  "scripts"
));

gulp.task("start", gulp.series("build", "server"));
