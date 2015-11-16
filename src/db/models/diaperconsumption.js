import Sequelize from 'sequelize';
import sequelize from '../db';

export const DiaperConsumption = sequelize.define('DiaperConsumption', {
  amount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
}, {
  classMethods: {
    associate: (models) => {
      DiaperConsumption.belongsTo(models.Patient, {
        onDelete: 'CASCADE',
      });
      DiaperConsumption.belongsTo(models.DiaperType, {
        onDelete: 'CASCADE',
      });
    },
  },
});
