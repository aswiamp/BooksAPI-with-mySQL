'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      totalprice: {
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
            }
          },
          bookId:{
            type:Sequelize.INTEGER,
            references:{
                model: "bookmanies",
                key: "id"
            }
            },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};