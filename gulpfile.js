"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var mqpacker = require("css-mqpacker");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var del = require("del");
var runSequence = require("run-sequence");
var csscomb = require("gulp-csscomb");

gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("csscomb", function() {
  return gulp.src("src/less/blocks/*.less")
    .pipe(csscomb(require("./.csscomb.json")))
    .pipe(gulp.dest("src/less/blocks"));
});

gulp.task("imagemin", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svgmin", function() {
  return gulp.src("build/img/**/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch("src/*.html", ["copyhtml"]);
  gulp.watch("build/*.html").on("change", server.reload);
});

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/*.html",
    "src/js/*.js",
    "src/img/*.*",
    "src/*.png"
  ], { base: "src"})
    .pipe(gulp.dest("build"));
});

gulp.task("copyhtml", function() {
  return gulp.src("src/*.html", { base: "src"})
    .pipe(gulp.dest("build"));
});

gulp.task("scripts", function() {
  return gulp.src("src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(rename("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  runSequence("clean", "copy", "style","imagemin","svgmin","symbols", "scripts", fn)
});
