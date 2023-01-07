const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
require("dotenv").config();
const { API_KEY7 } = process.env;

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
    `/complexSearch?apiKey=${API_KEY7}&addRecipeInformation=true&number=100`
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
      summary: el.summary,
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

const getApiById = async (id) => {
  const getApiRecipe = await recipesApi(
    `/${id}/information?apiKey=${API_KEY7}&addRecipeInformation=true&number=100`
  );
  const { data } = getApiRecipe;
  if (data) {
    const stepByStep =
      data.analyzedInstructions[0] && data.analyzedInstructions[0].steps
        ? data.analyzedInstructions[0].steps.map(
            (data) => "Step " + data.number.toString() + ": " + data.step
          )
        : [];

    const dietsConverts = data.diets.map((el) =>
      el
        .split(" ")
        .map((el) => nameConverter(el))
        .join(" ")
    );

    return {
      id: data.id,
      name: data.title,
      summary: removeTags(data.summary),
      healthScore: data.healthScore,
      stepByStep,
      image: data.image,
      diets: dietsConverts,
      types: data.dishTypes,
      score: data.spoonacularScore,
    };
  }

  return [];
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
  getApiById,
  nameConverter,
  removeTags,
};
