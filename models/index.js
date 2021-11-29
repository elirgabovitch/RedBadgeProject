const db = require('../db');

const UsersModel = require('./users');
const RecipesModel = require('./recipes');
const CommentsModel = require('./comments');

// Associations below here

UsersModel.hasMany(RecipesModel);
UsersModel.hasMany(CommentsModel);

RecipesModel.belongsTo(UsersModel);
RecipesModel.hasMany(CommentsModel);

CommentsModel.belongsTo(RecipesModel);

module.exports = {
    UsersModel,
    RecipesModel,
    CommentsModel
};

