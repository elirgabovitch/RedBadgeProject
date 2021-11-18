const UserModel = require('./user');
const RecipeModel = require('./recipe');
const CommentModel = require('./comment');

UserModel.hasMany(RecipeModel);
UserModel.hasMany(CommentModel);

RecipeModel.belongsTo(UserModel);
RecipeModel.hasMany(CommentModel);

CommentModel.belongsTo(RecipeModel, {
    as: "comments",
    foreignKey: "recipeId"
});

module.exports = {
    UserModel,
    RecipeModel,
    CommentModel
};

