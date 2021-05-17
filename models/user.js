const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    userName: {
        type: sequelize.STRING,
        allowNull: false
     },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;