"use strict";

var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/css/style.css")
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/js/*.js", gulp.series("copy", "refresh"));
  gulp.watch("source/css/*.css", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("copy", "refresh"));
});

gulp.task("copy", function () {
  return gulp.src([
      "source/*.html",
      "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series ("clean", "css", "copy"));
gulp.task("start", gulp.series("build", "server"));
