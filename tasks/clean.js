import del from 'del';

export function clean(cb) {
  del(['build/*', '!build/db']).then(() => {
    cb();
  });
}
