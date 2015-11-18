import gulp from 'gulp';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';

gulp.task('js:eslint', ()=> {
  return gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('js:test', ()=> {
  return gulp.src('tests/**/*.js', {read: false})
  .pipe(plumber())
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', ()=> {
  gulp.watch('./src/**/*.js', ['js:eslint', 'js:test', 'js:build'])
  gulp.watch('./tests/**/*.js', ['js:test'])
});


gulp.task('default', ['js:eslint', 'js:test', 'js:build']);
