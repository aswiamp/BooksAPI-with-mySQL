'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  purchase.init({
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    userId: {
       type: DataTypes.INTEGER,
      references:{
        model:"users",
        key:"id"}

      },
            
    bookId : {
      type: DataTypes.INTEGER,
      references:{
        model:"bookmanies",
        key:"id"}
    }
  }, {
    sequelize,
    modelName: 'purchase',
  });
  return purchase;
};