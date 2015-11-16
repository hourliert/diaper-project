import { Router } from 'express';

import { Patient, DiaperConsumption } from '../db/models';

const router = new Router();

function serializePatient(patient) {
  const { id, firstName, lastName } = patient;
  return {
    id,
    firstName,
    lastName,
    diapers: patient.DiaperConsumptions.map(d => {
      return {
        amount: d.amount,
        type: d.DiaperTypeId,
      };
    }),
  };
}

router.get('/', async (req, res, next) => {
  try {
    let patients = await Patient.findAll({
      include: [DiaperConsumption],
    });

    patients = patients.map(p => {
      return serializePatient(p);
    });

    res.json(patients);
  } catch (err) {
    next(err.message);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id, {
      include: [DiaperConsumption],
    });

    if (!patient) {
      res.status(404).send('Patient not found.');
    } else {
      res.json(serializePatient(patient));
    }
  } catch (err) {
    next(err.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    patient.DiaperConsumptions = await DiaperConsumption.bulkCreate(
      req.body.diapers.map((diaper) => {
        return {
          PatientId: patient.id,
          amount: diaper.amount,
          DiaperTypeId: diaper.type,
        };
      })
    );

    res.json(serializePatient(patient));
  } catch (err) {
    next(err.message);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const patient = await Patient.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) {
      res.status(404).send('No patient deleted.');
    } else {
      res.json(patient);
    }
  } catch (err) {
    next(err.message);
  }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//     const patient = await PatientDB.updatePatient(req.params.id, req.body);
//     if (!patient) {
//       res.status(404).send('No patient updated.');
//     } else {
//       res.json(patient);
//     }
//   } catch (err) {
//     next(err.message);
//   }
// });

export default router;
