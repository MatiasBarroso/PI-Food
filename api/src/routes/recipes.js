const express = require("express");
const ctrl = require("../controllers/recipes.controllers");
const { Recipe, DietType } = require("../db.js");
const router = express.Router();

/*  ALL RECIPES  */
router.get("/recipes", async (req, res) => {
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
router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const uuid = id.split("-");
  const allRecipes = await ctrl.getAllRecipes();

  if (uuid.length > 1) {
    const findFood = allRecipes.find((el) => el.id === id);
    findFood ? res.send(findFood) : res.status(404).send("Food doesn't exist");
    return;
  }
  const parseId = parseInt(id);
  const findFood = allRecipes.find((el) => el.id === parseId);
  findFood ? res.send(findFood) : res.status(404).send("Food doesn't exist");
});

/*  POST RECIPE  */
router.post("/recipe", async (req, res) => {
  const { name, summary, healthScore } = req.body;
  if (!name || !summary)
    return res.status(400).send("name and summary are required");
  Recipe.create({
    name,
    summary,
    healthScore,
  });
  const recipeCreated = await Recipe.findOne({
    where: { name: name },
  });

  res.send(recipeCreated);
});

module.exports = router;
