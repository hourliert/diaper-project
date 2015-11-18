import del from 'del';

export function clean(cb) {
  del(['build/*', '!build/database.sqlite']).then(() => {
    cb();
  });
}
