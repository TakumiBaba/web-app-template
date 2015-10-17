import gulp from 'gulp';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import mocha from 'gulp-mocha';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

gulp.task('js:eslint', ()=> {
  return gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('js:test', ()=> {
  return gulp.src('tests/**/*.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));

});

gulp.task('js:build', ()=> {
  return gulp.src('./src/index.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat("core.js"))
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("./"));
});

gulp.task('watch', ()=> {
  gulp.watch('./src/**/*.js', ['js:eslint', 'js:test', 'js:build'])
});


gulp.task('default', ['js:eslint', 'js:test', 'js:build']);
