import gulp from 'gulp';
import shell from 'gulp-shell';

export function test() {
  return gulp.src('jest.preprocessor.js', {read: false})
    .pipe(shell([
      'jest',
    ]));
}

export function coverage() {
  return gulp.src('jest.preprocessor.js', {read: false})
    .pipe(shell([
      'jest --coverage',
    ]));
}
