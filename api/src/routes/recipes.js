const express = require("express");
const ctrl = require("../controllers/recipes.controllers");
const { Recipe, DietType } = require("../db.js");
const router = express.Router();

/*  ALL RECIPES  */

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allRecipes = await ctrl.getAllRecipes();

  if (name) {
    const nameConvert = ctrl.nameConverter(name);
    const findFood = allRecipes.find((el) => el.name === nameConvert);
    findFood ? res.send(findFood) : res.status(404).send("Food doesn't exist");
    return;
  }

  res.send(allRecipes);
});

/*  GET RECIPE BY ID  */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const uuid = id.split("-");
  const allRecipes = await ctrl.getAllRecipes();
  try {
    if (uuid.length > 1) {
      const findFood = await Recipe.findByPk(id);
      return findFood
        ? res.send(findFood)
        : res.status(404).send("Food doesn't exist");
    }
    const parseId = parseInt(id);
    const findFood = allRecipes.find((el) => el.id === parseId);
    return findFood
      ? res.send(findFood)
      : res.status(404).send("Food doesn't exist");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
