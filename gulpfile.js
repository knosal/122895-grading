import gulp from 'gulp';                  // Gulp для автоматизации
import plumber from 'gulp-plumber';       // перехват ошибок, и после устранения ошибки сборка восстановит работоспособность
import gulpIf from 'gulp-if';             // определять, находится ли проект в разработке и в зависимости от этого подключать или отключать команду
import dartSass from "sass";              // для использования препроцессора SASS
import gulpSass from "gulp-sass";         // для использования препроцессора SASS
import postcss from 'gulp-postcss';       // библиотека для работы других плагинов
import postUrl from 'postcss-url';        // перебазирования, встроенного или копирования в url().
import autoprefixer from 'autoprefixer';  // автопрефиксы
import csso from 'postcss-csso';          // минификация CSS
import htmlmin from 'gulp-htmlmin';       // минимизатор HTML
import terser from 'gulp-terser';         // минификация и оптимизация javascript
import rename from 'gulp-rename';         // переименование файлов
import squoosh from 'gulp-libsquoosh';    // минификация изображения
import svgo from 'gulp-svgmin';           // минификация файлов SVG
import { stacksvg } from "gulp-stacksvg"; // для объединения svg-файлов в sprite
import { deleteAsync } from 'del';        // для чистки сборки
import browser from 'browser-sync';       // обновляет браузер при сохранении
import bemlinter from 'gulp-html-bemlinter';  // линтер бэм
import fileInclude from "gulp-file-include" // Сборка файлов через @include
import { htmlValidator } from "gulp-w3c-html-validator";  // проверка на валидаторе

const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup() {
  return gulp.src('source/*.html')
    .pipe(fileInclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

export function lintBem() {
  return gulp.src('source/*.html')
    .pipe(bemlinter());
}

export function validateMarkup() {
  return gulp.src('build/index.html')
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter({ throwErrors: true }));
}

export function processStyles() {
  return gulp.src('source/sass/*.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts() {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

export function optimizeImages() {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulpIf(!isDevelopment, squoosh()))
    .pipe(gulp.dest('build/img'))
}

export function createWebp() {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

export function optimizeVector() {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/**/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

export function createStack() {
  return gulp.src('source/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(gulp.dest('build/img/icons'));
}

export function copyAssets() {
  return gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
    'source/leaflet/**',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

export function startServer(done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer(done) {
  browser.reload();
  done();
}

function watchFiles() {
  gulp.watch('source/sass/**/*.scss', gulp.series(processStyles));
  gulp.watch('source/js/script.js', gulp.series(processScripts));
  gulp.watch('source/*.html', gulp.series(processMarkup, reloadServer));
}

function compileProject(done) {
  gulp.parallel(
    processMarkup,
    processStyles,
    processScripts,
    optimizeVector,
    createStack,
    copyAssets,
    optimizeImages,
    createWebp,
  )(done);
}

function deleteBuild() {
  return deleteAsync('build');
}

export function buildProd(done) {
  isDevelopment = false;
  gulp.series(
    deleteBuild,
    compileProject
  )(done);
}

export function runDev(done) {
  gulp.series(
    deleteBuild,
    compileProject,
    startServer,
    watchFiles
  )(done);
}
