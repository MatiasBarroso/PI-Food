const express = require("express");
const ctrl = require("../controllers/recipes.controllers");
const { Recipe, Diet } = require("../db.js");
const router = express.Router();

/*  POST RECIPE  */
router.post("/", async (req, res) => {
  const { name, summary, healthScore, diets } = req.body;

  if (!name || !summary || !diets || !healthScore)
    return res.status(400).send("All options are require");

  try {
    const nameConvert = ctrl.nameConverter(name);
    const newRecipe = await Recipe.create({
      name: nameConvert,
      summary,
      healthScore,
    });

    const dietsTypes = await Diet.findAll({
      where: { name: diets },
    });

    const values = dietsTypes.map((diet) => diet.dataValues.id);
    await newRecipe.setDiets(values);
    const newRecipeDiets = await Recipe.findAll({
      where: {
        name: nameConvert,
      },
      include: [
        {
          model: Diet,
        },
      ],
    });

    const dietsFilters = newRecipeDiets[0].dataValues.diets.map(
      (diet) => diet.name
    );
    const recipeCreated = {
      ...newRecipeDiets[0].dataValues,
      diets: dietsFilters,
    };
    res.send(recipeCreated);
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
