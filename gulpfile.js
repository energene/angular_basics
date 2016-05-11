const gulp = require('gulp');
const exec = require('child_process').exec;
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const protractor = require('gulp-protractor').protractor;

gulp.task('backend:lint', () => {
  gulp.src('./**/*.js')
    .pipe(eslint());
});

gulp.task('client:lint', () => {
  gulp.src('./**/*.html')
    .pipe(eslint());
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('protractor', () => {
  gulp.src(["./src/tests/*.js"])
    .pipe(protractor({
        configFile: "test/protractor.config.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e })
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['backend:lint', 'client:lint', 'build:dev', 'start', 'protractor']);
