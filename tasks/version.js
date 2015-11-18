import gulp from 'gulp';
import bump from 'gulp-bump';
import git from 'gulp-git';
import tagVersion from 'gulp-tag-version';

export function inc(importance) {
  return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps package version for ' + importance + 'release.'))
    .pipe(tagVersion());
}
