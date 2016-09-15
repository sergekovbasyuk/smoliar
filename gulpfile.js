var gulp = require('gulp'),

    jade = require('gulp-jade'),

    // CSS
    postcss = require('gulp-postcss'),
    atImport = require("postcss-import"),
    precss = require('precss'),
    cssnext = require('postcss-cssnext'),
    cssnano = require('cssnano'),
    rucksack = require('rucksack-css'),
    sugarss = require('sugarss'),
    sourcemaps = require('gulp-sourcemaps'),
    flexbugs = require('postcss-flexbugs-fixes'),

    browsersync = require('browser-sync'),
    reload = browsersync.reload,

    // Images
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    // JS
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),

    gulputil = require('gulp-util'),
    critical = require('critical').stream,
    ghPages = require('gulp-gh-pages'),
    rename  = require('gulp-rename');


// Deploy
gulp.task('deploy', function() {
  return gulp.src('./dest/**/*')
    .pipe(ghPages());
});


// JS
gulp.task('scripts', function(){
  gulp.src('./src/js/**/*.js')
    // Concatenation
    .pipe(concat('bundle.js'))
    // Minification
    .pipe(uglify().on('error', gulputil.log))
    // Move file to folder
    .pipe(gulp.dest('./dest/js'));
});


// Images
gulp.task('imagemin', function () {
    return gulp.src('./src/img/**/*.{gif,jpg,png}')
      // Compression
      .pipe(imagemin({
          progressive: true,
          interlaced: true,
          use: [pngquant()]
      }))
      // Move IMGs to folder
      .pipe(gulp.dest('./dest/img'));
});


// CSS
gulp.task('css', function () {

  var processors = [
    precss,
    cssnext,
    flexbugs,
    atImport,
    rucksack,
    cssnano
  ];

  return gulp.src('src/sss/*.sss')
    // .pipe( sourcemaps.init() )
    .pipe(postcss(processors, { parser: sugarss }))
    .on('error', gulputil.log)
    .pipe(rename({ extname: '.css' }))
    // .pipe( sourcemaps.write('.') )
    .pipe(gulp.dest('dest/css'))
    .pipe(reload({stream:true}));
});


// Critical CSS
gulp.task('critical', function () {
    return gulp.src('dest/*.html')
        .pipe(critical({
          base: 'dest/',
          inline: true,
          src: 'index.html',
          css: ['dest/css/main.css'],
          dest: 'dest/index-critical.html',
          minify: true,
          width: 1300,
          height: 900
        }))
        .pipe(gulp.dest('dest/'));
});


// Compile Jade
gulp.task('html', function() {
  gulp.src('./src/jade/*.jade')
    .pipe(jade().on('error', gulputil.log))
    .pipe(gulp.dest('./dest'))
    .pipe(reload({stream:true}));
});


// browser tasks
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: './dest'
        }
    });
});


// watch
gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js', ['scripts']),
    gulp.watch('./src/img/*.{gif,jpg,png}', ['imagemin']),
    gulp.watch('./src/sss/**/*.sss', ['css']),
    gulp.watch('./src/jade/**/*.jade', ['html']);
});


// default
gulp.task('default', ['scripts', 'imagemin', 'css', 'html', 'browsersync', 'watch']);
