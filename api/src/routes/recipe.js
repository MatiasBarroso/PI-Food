const express = require("express");
const ctrl = require("../controllers/recipes.controllers");
const { Recipe } = require("../db.js");
const router = express.Router();

/*  POST RECIPE  */
router.post("/", async (req, res) => {
  const { name, summary, healthScore } = req.body;
  const parsedHealthScore = parseInt(healthScore);
  if (!name || !summary)
    return res.status(400).send("name and summary are required");
  try {
    const nameConvert = ctrl.nameConverter(name);
    await Recipe.create({
      name: nameConvert,
      summary,
      healthScore: parsedHealthScore,
    });
    const recipeCreated = await Recipe.findOne({
      where: { name: nameConvert },
    });

    res.send(recipeCreated);
  } catch (error) {
    res.status(400).send(error.parent.detail);
  }
});

module.exports = router;
