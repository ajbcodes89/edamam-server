const {DataTypes} = require('sequelize');
const database = require('../db');


 module.exports = database.define('favorites', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  });
  

