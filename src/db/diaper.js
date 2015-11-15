import { DBDriver } from './DBDriver';

class DiaperDBDriver extends DBDriver {
  constructor() {
    super('diapers', 'id');
  }

  createDiaper(text) {
    return new Promise((resolve, reject) => {
      if (!text) {
        reject('Missing type.');
        return;
      }

      this.db.insert({
        text,
      }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  deleteDiaper(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({_id: id}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  getDiaper(id) {
    return new Promise((resolve, reject) => {
      this.db.find({_id: id}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  getDiapers() {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  updateDiaper(id, text) {
    return new Promise((resolve, reject) => {
      this.db.update({_id: id}, {
        text,
      }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
}

export default new DiaperDBDriver();
