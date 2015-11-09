import gulp from 'gulp';
import { copyPackage } from './tasks/copy';
import { bundle } from './tasks/bundle';
import { serve } from './tasks/serve';
import { launchServer } from './tasks/server';
import { clean } from './tasks/clean';
import { lintWithEslint, lintWithJscs } from './tasks/lint';
import { test, coverage } from './tasks/test';
import { cssLint, cssFix } from './tasks/css';

gulp.task('clean', clean);

gulp.task('copypackage', ['clean'], copyPackage);

gulp.task('bundle', ['clean'], bundle);
gulp.task('server', ['bundle', 'copypackage'], launchServer);
gulp.task('serve', ['server'], serve);

gulp.task('eslint', lintWithEslint);
gulp.task('jscs', lintWithJscs);

gulp.task('lint', ['eslint', 'jscs']);

gulp.task('test', test);
gulp.task('coverage', coverage);

gulp.task('csslint', cssLint);
gulp.task('cssfix', cssFix);
