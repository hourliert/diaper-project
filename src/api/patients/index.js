import { Router } from 'express';

import { getPatients, getPatient, createPatient, deletePatient, updatePatient } from './patientsSqlite';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await getPatients());
  } catch (err) {
    next(err.message);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await getPatient(req.params.id));
  } catch (err) {
    if (err.message.includes('Not found')) {
      res.status(404).send(err.message);
      return;
    }

    next(err.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await createPatient(req.body));
  } catch (err) {
    next(err.message);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    res.json(await deletePatient(req.params.id));
  } catch (err) {
    if (err.message.includes('Nothing deleted')) {
      res.status(404).send(err.message);
      return;
    }

    next(err.message);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await updatePatient(req.params.id, req.body));
  } catch (err) {
    next(err.message);
  }
});

export default router;
