const { DataTypes } = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipeId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
});

module.exports = Comment;