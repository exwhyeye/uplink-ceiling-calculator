const { src, dest, series, watch, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');

function buildJS() {
  return src('src/js/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

function buildSass() {
  return src('src/scss/**/*.scss')
    .pipe(sass({ includePaths: ["./node_modules"] }).on("error", sass.logError))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function buildHtml() {
  return src('src/**/*.html').pipe(dest('dist')).pipe(browserSync.stream())
}

function copyAssets() {
  return src(['src/assets/**/*'], { encoding: false }).pipe(dest('dist/assets'));
}

function cleanDist() {
  return src('dist', { allowEmpty: true }).pipe(clean());
}

function createDevServer() {
  browserSync.init({
    server: 'dist',
    notify: false
  })
}

function serve() {
  watch('src/scss/**/*.scss', buildSass);
  watch('src/**/*.html', buildHtml);
  watch(['src/js/**/*.js'], buildJS);
}

exports.build = series(cleanDist, buildSass, copyAssets, buildJS, buildHtml);
exports.default = series(series(buildSass, buildJS), parallel(createDevServer, serve));