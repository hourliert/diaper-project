import { Service } from 'node-windows';
import { join } from 'path';

const IS_WIN = /^win/.test(process.platform);

if (IS_WIN) {
  // Create a new service object
  const svc = new Service({
    name: 'Projet Couche',
    description: 'Serveur web pour le projet couche.',
    script: join(__dirname, '..', 'build', 'server.js'),
    env: {
      name: 'NODE_ENV',
      value: 'production',
    },
  });

  // Listen for the "install" event, which indicates the
  // process is available as a service.
  svc.on('install', () => {
    svc.start();
  });

  // Just in case this file is run twice.
  svc.on('alreadyinstalled', () => {
    console.log('This service is already installed.');
  });

  // Listen for the "start" event and let us know when the
  // process has actually started working.
  svc.on('start', () => {
    console.log(svc.name + ' started!');
  });

  // Install the script as a service.
  svc.install();
} else {
  console.log('Installation process only supports Windows.');
}
