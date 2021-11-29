let Express = require("express");
     let router = Express.Router();
     let validateJWT = require("../middleware/validate-jwt");
     // Import the Recipe Model
     const { RecipesModel } = require('../models');
    
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
        const newRecipe = await RecipesModel.create(recipeEntry);
        res.status(200).json(newRecipe);
      } catch (err) {
        res.status(500).json({ error: err });
      }  
    });

    /* 
    =======================
      Get all Recipes
    =======================
    */
    router.get("/", async (req, res) => {
          try {
            const entries = await RecipesModel.findAll();
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
        const userRecipes = await RecipesModel.findAll({
          where: {
            userId: id
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
    router.put("/update/:id", validateJWT, async (req, res) => {
      const { name, ingredients, notes } = req.body.recipe;
      const recipeId = req.params.id;
      const {id} = req.user;
      
      const query = {
        where: {
          id: recipeId,
          userId: id
        }
     };
   
     const updatedRecipe = {
       name: name,
       ingredients: ingredients,
       notes: notes
     };
   
     try {
       const update = await RecipesModel.update(updatedRecipe, query);
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
         const recipeId = req.params.id;
          const {id} = req.user;
          
          const query = {
            where: {
              id: recipeId,
              userId: id
            }
         };

   try {
       await RecipesModel.destroy(query);
       res.status(200).json({ message: "Recipe Removed" });
     } catch (err) {
       res.status(500).json({ error: err });
     }
   })
    
    module.exports = router;