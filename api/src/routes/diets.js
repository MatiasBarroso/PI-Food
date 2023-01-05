const express = require("express");
const ctrl = require("../controllers/diets.controllers");
const { nameConverter } = require("../controllers/recipes.controllers");
const router = express.Router();

/*  GET DATABASE DIETS  */

router.get("/", async (req, res) => {
  try {
    const diets = await ctrl.getDiets();

    res.send(diets);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
