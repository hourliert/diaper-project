import { Router } from 'express';

import { DiaperType } from '../db/models';

const router = new Router();

function serializeDiaper(diaper) {
  const { id, value } = diaper;
  return {
    id,
    value,
  };
}

router.get('/', async (req, res, next) => {
  try {
    let diaperTypes = await DiaperType.findAll();

    diaperTypes = diaperTypes.map(d => {
      return serializeDiaper(d);
    });

    res.json(diaperTypes);
  } catch (err) {
    next(err.message);
  }
});

export default router;
