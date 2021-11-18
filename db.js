const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:060194@localhost:5432/liquorlab");

module.exports = sequelize;