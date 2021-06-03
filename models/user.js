const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false
     },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;