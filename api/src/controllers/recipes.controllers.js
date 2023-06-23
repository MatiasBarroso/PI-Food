const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
require("dotenv").config();
const { API_KEY2 } = process.env;

/!*    AXIOS INSTANCE (CORRIGE PROBLEMAS EN LA CONFIG DE AXIOS)    *!/;

const recipesApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  headers: {
    "accept-encoding": null,
  },
});

/*      ASYNC FUNCTIONS      */

const getApiRecipes = async () => {
  const resAxios = await recipesApi(
    `/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );
  const { results } = resAxios.data;
  const dataMap = results.map((el) => {
    const stepByStep =
      el.analyzedInstructions[0] && el.analyzedInstructions[0].steps
        ? el.analyzedInstructions[0].steps.map(
            (el) => "Step " + el.number.toString() + ": " + el.step
          )
        : [];

    const dietsConverts = el.diets.map((el) =>
      el
        .split(" ")
        .map((el) => nameConverter(el))
        .join(" ")
    );

    return {
      id: el.id,
      name: el.title,
      summary: removeTags(el.summary),
      healthScore: el.healthScore,
      stepByStep,
      image: el.image,
      diets: dietsConverts,
      types: el.dishTypes,
      score: el.spoonacularScore,
    };
  });
  return dataMap;
};

const getDbRecipes = async () => {
  const DbRecipes = await Recipe.findAll({
    include: [
      {
        model: Diet,
      },
    ],
  });

  const dietsFilters = DbRecipes.map((recipe) => {
    return {
      ...recipe.dataValues,
      diets: recipe.dataValues.diets.map((diet) => diet.name),
    };
  });

  return DbRecipes.length > 0 ? dietsFilters : [];
};

const getAllRecipes = async () => {
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbRecipes();
  return apiRecipes.concat(dbRecipes);
};

/!*    SECONDARY FUNCTIONS    *!/;

const nameConverter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const removeTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
};

module.exports = {
  getApiRecipes,
  getDbRecipes,
  getAllRecipes,
  nameConverter,
  removeTags,
};
