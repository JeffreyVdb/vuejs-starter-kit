"use strict";

var path        = require('path'),
    gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    webpack     = require('gulp-webpack-build');

var jsSrc           = './app/lib',
    jsDest          = './dist/js',
    webpackOptions  = {
      debug: true,
      devtool: '#source-map',
      watchDelay: 200
    },
    webpackConfig   = {
      useMemoryFs: true,
      progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('webpack', [], function () {
  return gulp.src(CONFIG_FILENAME)
    .pipe(webpack.init(webpackConfig))
    .pipe(webpack.props(webpackOptions))
    .pipe(webpack.run())
    .pipe(webpack.format({
      version: false,
      timings: true
    }))
    .pipe(webpack.failAfter({
      errors: true,
      warnings: true
    }))
    .pipe(gulp.dest(jsDest));
});

gulp.task('watch', function() {
  gulp.watch(path.join(jsSrc, '**/*.*')).on('change', function(event) {
    if (event.type === 'changed') {
      gulp.src(event.path, { base: path.resolve(jsSrc)})
        .pipe(webpack.closest(CONFIG_FILENAME))
        .pipe(webpack.init(webpackConfig))
        .pipe(webpack.props(webpackOptions))
        .pipe(webpack.watch(function(err, stats) {
          gulp.src(this.path, { base: this.base })
            .pipe(webpack.proxy(err, stats))
            .pipe(webpack.format({
              verbose: true,
              version: false
            }))
            .pipe(gulp.dest(jsDest));
        }));
    }
  });
});

gulp.task('serve', function () {
  browserSync({
    notify: false,
    logPrefix: 'vsk',
    server: ['dist', 'app'],
    baseDir: 'app'
  })
});
