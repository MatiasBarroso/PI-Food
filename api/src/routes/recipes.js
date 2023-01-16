const express = require("express");
const ctrl = require("../controllers/recipes.controllers");
const { Recipe } = require("../db.js");
const router = express.Router();

/*  ALL RECIPES  */

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const allRecipes = await ctrl.getAllRecipes();
    if (name) {
      const nameConvert = ctrl.nameConverter(name);
      const findFood = allRecipes.filter((el) => el.name.includes(nameConvert));
      return findFood
        ? res.send(findFood)
        : res.status(404).send("Food doesn't exist");
    }
    res.send(allRecipes);
  } catch (error) {
    res.status(404).send(error);
  }
});

/*  GET RECIPE BY ID  */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const uuid = id.split("-");

    if (uuid.length > 1) {
      const findFood = await Recipe.findByPk(id);

      // console.log(findFood);
      return findFood
        ? res.send(findFood)
        : res.status(404).send("Food doesn't exist");
    }

    const recipeById = await ctrl.getApiById(id);
    res.send(recipeById);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
