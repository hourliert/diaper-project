import Datastore from 'nedb';
import { join } from 'path';

class DBDriver {
  constructor() {
    this.initDB();
  }

  async initDB() {
    this.db = new Datastore({
      filename: join(__dirname, 'datafile'),
      autoload: true,
    });
    try {
      await this.setupDB();
    } catch (e) {
      console.log(e);
    }
  }

  setupDB() {
    return new Promise((resolve, reject) => {
      this.db.ensureIndex({ fieldName: 'fullName', unique: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  createPatient(patient) {
    return new Promise((resolve, reject) => {
      if (!patient.firstName || !patient.lastName) {
        reject('Missing names.');
        return;
      }

      this.db.insert({
        ...patient,
        fullName: `${patient.firstName}_${patient.lastName}`,
      }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  deletePatient(id) {
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

  getPatient(id) {
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

  getPatients() {
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

  updatePatient(id, patient) {
    return new Promise((resolve, reject) => {
      this.db.update({_id: id}, {
        ...patient,
        fullName: `${patient.firstName}_${patient.lastName}`,
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

export default new DBDriver();
