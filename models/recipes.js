     const { DataTypes } = require('sequelize');
     const db = require('../db');
     
     const Recipe = db.define('recipe', {
      name: {
       type: DataTypes.STRING,
       allowNull: false
      },
      ingredients: {
      type: DataTypes.STRING,
      allowNull: false
     },
     notes: {
      type: DataTypes.STRING,
      allowNull: false
     },
     userId: {
          type: DataTypes.INTEGER
         },
    });
    
    module.exports = Recipe;