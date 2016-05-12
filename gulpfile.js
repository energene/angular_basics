const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

gulp.task('lint:backend', () => {
  gulp.src('./**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:client', () => {
  gulp.src('./app/index.html')
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('./app/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css' }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('./app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('lint', ['lint:backend', 'lint:client']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['lint', 'build:dev']);
