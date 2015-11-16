import Sequelize from 'sequelize';
import sequelize from '../db';

export const DiaperType = sequelize.define('DiaperType', {
  value: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isAlphanumeric: true,
    },
  },
}, {
  classMethods: {
    associate: () => {

    },
  },
});
