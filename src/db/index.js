import db from './db';
import * as models from './models';

for (const key in models) {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
}

export default db;
