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
    const findFood = await Recipe.findByPk(id);
    return findFood ? res.send(findFood) : res.status(404).send("Food doesn't exist");
  }
  const parseId = parseInt(id);
  const findFood = allRecipes.find((el) => el.id === parseId);
  return findFood ? res.send(findFood) : res.status(404).send("Food doesn't exist");
});

/*  POST RECIPE  */
router.post("/recipe", async (req, res) => {
  const { name, summary, healthScore } = req.body;
  const nameConvert = ctrl.nameConverter(name)
  const parsedHealthScore = parseInt(healthScore)
  if (!name || !summary)
    return res.status(400).send("name and summary are required");
  const newRecipe = await Recipe.create({
    name: nameConvert,
    summary,
    healthScore: parsedHealthScore,
  });
  const recipeCreated = await Recipe.findOne({
    where: { name: nameConvert },
  });

  res.send(recipeCreated);
});

/*  GET DATABASE DIETS  */
router.get("/diets", async (req, res) => {
  const dietTypes = await DietType.findAll()
  res.send(dietTypes)
})


module.exports = router;
