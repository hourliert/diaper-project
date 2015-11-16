'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('DiaperConsumptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      DiaperTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DiaperTypes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('DiaperConsumptions');
  },
};
