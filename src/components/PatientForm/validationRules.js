export default (values) => {
  const errors = {};
  const { firstName, lastName, ...diapers } = values;
  const diapersKeys = Object.keys(diapers);

  if (!firstName) {
    errors.firstName = 'Requis';
  } else if (firstName.length < 2) {
    errors.firstName = 'Trop court';
  }

  if (!lastName) {
    errors.lastName = 'Requis';
  } else if (lastName.length < 2) {
    errors.lastName = 'Trop court';
  }

  diapersKeys.forEach((key) => {
    if (/amount/.test(key)) {
      if (!diapers[key]) {
        errors[key] = 'Requis';
      } else if (isNaN(parseInt(diapers[key], 10))) {
        errors[key] = 'Non entier';
      }
    }

    if (/type/.test(key) && (!diapers[key])) {
      errors[key] = 'Requis';
    }
  });

  return errors;
};
