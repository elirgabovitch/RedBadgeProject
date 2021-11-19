let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
// Import the Comment Model
const { CommentModel } = require('../models');

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
            const newComment = await CommentModel.create(commentEntry);
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
            const userComments = await CommentModel.findAll({
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
      Update a Comment
    =======================
    */
    router.put("/update/:id", validateJWT, async (req, res) => {
          const { comment } = req.body;
       
         const updatedComment = {
           comment: comment
         };
       
         try {
           const update = await CommentModel.update({comment}, {where: {id: req.params.id, userId: req.user.id}});
           res.status(200).json(update);
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
       
           await CommentModel.destroy(query);
           res.status(200).json({ message: "Comment Deleted" });
         } catch (err) {
           res.status(500).json({ error: err });
         }
       });

    module.exports = router;
