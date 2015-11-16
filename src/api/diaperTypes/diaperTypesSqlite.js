import { DiaperType } from '../../db/models';

function serializeDiaper(diaper) {
  const { id, value } = diaper;
  return {
    id,
    value,
  };
}

export async function getDiaperTypes() {
  let diaperTypes = await DiaperType.findAll();

  diaperTypes = diaperTypes.map(d => {
    return serializeDiaper(d);
  });

  return diaperTypes;
}
