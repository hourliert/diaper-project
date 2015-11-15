import { DBDriver } from './DBDriver';

class PatientDBDriver extends DBDriver {
  constructor() {
    super('patient', 'fullName');
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

export default new PatientDBDriver();
