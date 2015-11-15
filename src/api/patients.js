import { Router } from 'express';

import { PatientDB } from '../db';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const patients = await PatientDB.getPatients();
    res.json(patients);
  } catch (err) {
    next(err.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const patient = await PatientDB.createPatient(req.body);
    res.json(patient);
  } catch (err) {
    next(err.message);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const patient = await PatientDB.getPatient(req.params.id);

    if (!patient.length) {
      res.status(404).send('Patient not found.');
    } else {
      res.json(patient[0]);
    }
  } catch (err) {
    next(err.message);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const patient = await PatientDB.updatePatient(req.params.id, req.body);
    if (!patient) {
      res.status(404).send('No patient updated.');
    } else {
      res.json(patient);
    }
  } catch (err) {
    next(err.message);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const patient = await PatientDB.deletePatient(req.params.id);
    if (!patient) {
      res.status(404).send('No patient deleted.');
    } else {
      res.json(patient);
    }
  } catch (err) {
    next(err.message);
  }
});

export default router;
