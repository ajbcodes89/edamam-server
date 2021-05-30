const {DataTypes } = require('sequelize');
const database  = require('../db');

module.exports = database.define('favorites', {

user_id: {
  type: DataTypes.INTEGER,
  allowNull: true
},
recipeId: {
  type: DataTypes.STRING,
  allowNull: false
  
},
imageURL: {
  type: DataTypes.STRING,
  allowNull: true
},
title: {
  type: DataTypes.STRING,
  allowNull: true
},
note: {
  type: DataTypes.STRING,
  allowNull: true
}
});







// const {DataTypes} = require('sequelize');
// const database = require('../db');


//  module.exports = database.define('favorites', {