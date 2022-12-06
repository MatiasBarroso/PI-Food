const express = require("express");
const { DietType } = require("../db.js");
const ctrl = require("../controllers/diets.controllers");
const router = express.Router();

/*  GET DATABASE DIETS  */

router.get("/diets", async (req, res) => {
  const dietTypes = await DietType.findAll();
  res.send(dietTypes);
});

module.exports = router;
