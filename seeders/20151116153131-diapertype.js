/* eslint-disable */
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DiaperTypes', [
      {
        value: 'Couche 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 'Couche 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 'Couche 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DiaperTypes', null, {});
  },
};
