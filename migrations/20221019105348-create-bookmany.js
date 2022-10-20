'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn("bookmanies","quantity",Sequelize.INTEGER(20));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("bookmanies","quantity");
  }
}