"use strict";
const { Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
    class bookmany extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(db) {
            //define association here
            bookmany.hasMany(db.purchase, { foreignKey: "id" });
        }
    }
    bookmany.init(
        {
            name: DataTypes.STRING,
            author: DataTypes.STRING,
            imageurl: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            pages: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "bookmany",
        }
    );
    sequelizePaginate.paginate(bookmany);
    return bookmany;
};
