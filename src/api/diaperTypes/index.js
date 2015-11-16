import { Router } from 'express';

import { getDiaperTypes } from './diaperTypesSqlite';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await getDiaperTypes());
  } catch (err) {
    next(err.message);
  }
});

export default router;
