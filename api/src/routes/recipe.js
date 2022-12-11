const express = require("express");
const ctrl = require("../controllers/recipes.controllers");
const { Recipe, Diet } = require("../db.js");
const router = express.Router();

/*  POST RECIPE  */
router.post("/", async (req, res) => {
  const { name, summary, healthScore, diets } = req.body;
  const parsedHealthScore = parseInt(healthScore);
  if (!name || !summary || !diets || !healthScore)
    return res.status(400).send("All options are require");
  try {
    const nameConvert = ctrl.nameConverter(name);
    const newRecipe = await Recipe.create({
      name: nameConvert,
      summary,
      healthScore: parsedHealthScore,
    });

    const dietsTypes = await Diet.findAll({
      where: { name: diets },
    });

    const values = dietsTypes.map((diet) => diet.dataValues.id);
    await newRecipe.setDiets(values);
    const newRecipeDiets = await Recipe.findAll({
      include: [
        {
          model: Diet,
        },
      ],
    });
    res.send(newRecipeDiets);
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
