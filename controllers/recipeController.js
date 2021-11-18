let Express = require("express");
     let router = Express.Router();
     let validateJWT = require("../middleware/validate-jwt");
     // Import the Recipe Model
     const { RecipeModel } = require('../models');
    
    /* 
    =======================
      Recipe Create
    =======================
    */
    router.post('/create', validateJWT, async (req, res) => {
      const { name, ingredients, notes } = req.body.recipe;
      const { id } = req.user;
      const recipeEntry = {
        name,
        ingredients,
        notes,
        userId: id
      }
      try {
        const newRecipe = await RecipeModel.create(recipeEntry);
        res.status(200).json(newRecipe);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      RecipeModel.create(RecipeEntry)
        
    });

    /* 
    =======================
      Get all Recipes
    =======================
    */
    router.get("/", async (req, res) => {
          try {
            const entries = await RecipeModel.findAll();
            res.status(200).json(entries);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });

     /* 
    =======================
     Get Recipes by User
    =======================
    */
    router.get("/mine", validateJWT, async (req, res) => {
      let { id } = req.user;
      try {
        const userRecipes = await RecipeModel.findAll({
          where: {
            owner: id
          }
        });
        res.status(200).json(userRecipes);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });

    /* 
    =======================
      Update a Recipe
    =======================
    */
    router.put("/update/:entryId", validateJWT, async (req, res) => {
      const { name, ingredients, notes } = req.body.recipe;
      const recipeId = req.params.entryId;
      const userId = req.user.id;
      
      const query = {
        where: {
          recipeId: recipeId,
          userId: userId
        }
     };
   
     const updatedRecipe = {
       name: name,
       ingredients: ingredients,
       notes: notes
     };
   
     try {
       const update = await RecipeModel.update(updatedRecipe, query);
       res.status(200).json(update);
     } catch (err) {
       res.status(500).json({ error: err });
     }
   })

 /* 
  =======================
     Delete a Recipe
  =======================
 */
   router.delete("/delete/:id", validateJWT, async (req, res) => {
     const ownerId = req.user.id;
     const recipeId = req.params.id;
   
     try {
       const query = {
         where: {
           id: recipeId,
           owner: ownerId
         }
       };
   
       await RecipeModel.destroy(query);
       res.status(200).json({ message: "Recipe Entry Removed" });
     } catch (err) {
       res.status(500).json({ error: err });
     }
   })
    
    module.exports = router;