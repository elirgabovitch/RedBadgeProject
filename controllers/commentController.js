let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
// Import the Comment Model
const { CommentsModel } = require('../models');

/* 
=======================
    Create Comment
=======================
*/
  router.post('/create/:recipeId', validateJWT, async (req, res) => {
          const { comment } = req.body.comment;
          const recipeId = req.params.recipeId;
          const userId = req.user.id;
          const commentEntry = {
            comment,
            recipeId: recipeId,
            userId: userId
          }
          try {
            const newComment = await CommentsModel.create(commentEntry);
            res.status(200).json(newComment);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });
        
        module.exports = router;

    /* 
    =======================
     Get Comments by User
    =======================
    */
    router.get("/mine", validateJWT, async (req, res) => {
          let { id } = req.user;
          try {
            const userComments = await CommentsModel.findAll({
              where: {
                userId: id
              }
            });
            res.status(200).json(userComments);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });

    /* 

    =======================
     Get Comments by RecipeID
    =======================
    */
    router.get('/:recipeId', validateJWT, async (req, res) => {
          let { recipeId } = req.params;
          try {
            const recipeComments = await CommentsModel.findAll({
              where: {
                recipeId: recipeId
              }
            });
            res.status(200).json(recipeComments);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });

    /* 
    =======================
      Update a Comment
    =======================
    */
    router.put("/update/:id", validateJWT, async (req, res) => {
          const { comment } = req.body.comment;
       
         try {
           const update = await CommentsModel.update({comment}, {where: {id: req.params.id, userId: req.user.id}});
           res.status(200).json({
        message: "success", update
    });
         } catch (err) {
           res.status(500).json({ error: err });
         }
       })

/* 
  =======================
     Delete a Comment
  =======================
*/
   router.delete("/delete/:id", validateJWT, async (req, res) => {
         const userId = req.user.id;
         const commentId = req.params.id;
       
         try {
           const query = {
             where: {
               id: commentId,
               userId: userId
             }
           };
       
           await CommentsModel.destroy(query);
           res.status(200).json({ message: "Comment Deleted" });
         } catch (err) {
           res.status(500).json({ error: err });
         }
       });

    module.exports = router;
