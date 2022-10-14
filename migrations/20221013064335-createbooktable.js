'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.createTable("books",{
        name:{
          type:Sequelize.STRING(11),
          allowNull:false
        },
        author:{
          type:Sequelize.STRING(35),
          allowNull:false
        },
        imageurl:{
          type:Sequelize.STRING(20),
          allowNull:false
        },
        price:{
          type:Sequelize.INTEGER(20)
        },
        pages:{
          type:Sequelize.INTEGER(20)
        },
        createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE
  })
])
},

async down (queryInterface, Sequelize) {
  await queryInterface.dropTable("books") 
}
};
