const { Diet } = require("../db");
const { nameConverter } = require("./recipes.controllers");

const getDiets = async () => {
  const diets = await Diet.findAll();
  return diets;
};

module.exports = {
  getDiets,
};
