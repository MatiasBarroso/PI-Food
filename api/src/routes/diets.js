const express = require("express");
const ctrl = require("../controllers/diets.controllers");
const { nameConverter } = require("../controllers/recipes.controllers");
const router = express.Router();

/*  GET DATABASE DIETS  */

router.get("/", async (req, res) => {
  try {
    const diets = await ctrl.getDiets();
    const modifyDiets = diets.map((el) => {
      return {
        id: el.id,
        name: nameConverter(el.name),
      };
    });
    res.send(modifyDiets);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
