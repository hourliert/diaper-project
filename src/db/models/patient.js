import Sequelize from 'sequelize';
import sequelize from '../db';

export const Patient = sequelize.define('Patient', {
  firstName: {
    type: Sequelize.STRING,
    unique: 'fullName',
    validate: {
      isAlphanumeric: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    unique: 'fullName',
    validate: {
      isAlphanumeric: true,
    },
  },
}, {
  classMethods: {
    associate: (models) => {
      Patient.hasMany(models.DiaperConsumption, {
        onDelete: 'CASCADE',
      });
    },
  },
});
