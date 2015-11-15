import Datastore from 'nedb';
import { join } from 'path';

export class DBDriver {
  db = null;

  constructor(table, index) {
    this._initDB(table, index);
  }

  async _initDB(table, index) {
    this.db = new Datastore({
      filename: join(__dirname, 'db', table),
      autoload: true,
    });
    try {
      await this._setupDB(index);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }

  _setupDB(index) {
    return new Promise((resolve, reject) => {
      this.db.ensureIndex({ fieldName: index, unique: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
