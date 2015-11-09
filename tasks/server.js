/**
 * This task launches the node.js server.
 * This node.js server serves the application.
 * Even if the server rendering is disabled, the server serves the
 * static website.
 */

import gulp from 'gulp';
import { join } from 'path';
import { spawn } from 'child_process';

const WATCH = process.argv.includes('serve');

/**
 * Launches Node.js/Express web server in a separate (forked) process.
 */
export function launchServer(cb) {
  let numberOfLaunch = 0;

  function start() {
    const server = spawn(
      'node',
      [join(__dirname, '../build/server.js')],
      {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false,
      }
    );

    server.stdout.on('data', data => {
      let time = new Date().toTimeString();
      time = time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      process.stdout.write(`[${time}] `);
      process.stdout.write(data);
      if (data.toString('utf8').includes('The server is running')) {
        numberOfLaunch++;

        if (numberOfLaunch === 1) {
          cb();
        }
      }
    });
    server.stderr.on('data', data => process.stderr.write(data));

    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  }

  let server = start();

  // In WATCH mode, we track the server files changes and reload the server on change.
  if (WATCH) {
    gulp.watch('./build/server.js', () => {
      server.kill('SIGTERM');
      server = start();
    });
  }
}
