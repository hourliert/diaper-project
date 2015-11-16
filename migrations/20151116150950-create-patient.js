'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
      uniqueKeys: [
        {fields: ['firstName', 'lastName']},
      ],
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Patients');
  },
};
