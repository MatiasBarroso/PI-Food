const axios = require("axios");
const { Recipe, DietType } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`;

/!*    AXIOS INSTANCE (CORRIGE PROBLEMAS EN LA CONFIG DE AXIOS)    *!/;

const recipesApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  headers: {
    "accept-encoding": null,
  },
});

/!*      ASYNC FUNCTIONS      *!/;

const getApiRecipes = async () => {
  const resAxios = await recipesApi(
    `/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const { results } = resAxios.data;
  const dataMap = results.map((el) => {
    const stepByStep =
      el.analyzedInstructions[0] && el.analyzedInstructions[0].steps
        ? el.analyzedInstructions[0].steps.map(
            (el) => "step " + el.number.toString() + ": " + el.step
          )
        : [];

    return {
      id: el.id,
      name: el.title,
      summary: el.summary,
      healthScore: el.healthScore,
      stepByStep,
      image: el.image,
      diets: el.diets,
      types: el.dishTypes,
      score: el.spoonacularScore,
    };
  });
  return dataMap;
};

const getDbRecipes = async () => {
  const DbRecipes = await Recipe.findAll();
  return DbRecipes;
};

const getAllRecipes = async () => {
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbRecipes();
  return apiRecipes.concat(dbRecipes);
};

const postRecipe = async () => {};

const getDiets = async () => {
  const apiRecipes = await getApiRecipes();
  const dogsTemp = apiDogs.map((dog) => dog.temperament);
  const separatesTemps = dogsTemp.toString().split(",");
  separatesTemps.forEach((el) =>
    Temperaments.findOrCreate({
      where: { name: el.trim() },
    })
  );
  const allTemperaments = await Temperaments.findAll();
  return allTemperaments;
};

/!*    SECONDARY FUNCTIONS    *!/;

const nameConverter = (str) => {
  const arrName = str.split(" ");
  if (arrName.length > 1) {
    const arrMap = arrName.map(
      (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
    return arrMap.join(" ");
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

module.exports = {
  getApiRecipes,
  getDbRecipes,
  getAllRecipes,
  postRecipe,
  nameConverter,
};
