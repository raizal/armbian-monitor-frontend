const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const replace = require('gulp-replace');

const dist = '../backend/client'

gulp.task('icons', function() {
  return gulp.src([
    'build/*',
    'build/*/*/*'
  ])
    .pipe(gulp.dest(dist));
});

gulp.task('default', () => {
  return gulp
    .src('./build/*.html')
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ['png'],
      })
    )
    .pipe(gulp.dest(dist));
});
