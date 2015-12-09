var gulp       = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source     = require('vinyl-source-stream');

var bundler = browserify({
  debug: true,
  entries: './dist/main.js'
});

gulp.task('browserify', function() {
  return bundler
    .transform(babelify.configure({
      presets: ['es2015'],
      plugins: ['add-module-exports']
    }))
    .bundle()
    .pipe(source('main.bundle.js'))
    .pipe(gulp.dest('./dist'));
});
