import gulp from 'gulp';
import shell from 'gulp-shell';

export function cssLint() {
  return gulp.src('.csscomb.json', {read: false})
    .pipe(shell([
      'csscomb src --lint --verbose',
    ]));
}

export function cssFix() {
  return gulp.src('.csscomb.json', {read: false})
    .pipe(shell([
      'csscomb src --verbose',
    ]));
}
