import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIET";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";

export const getAllRecipes = () => (dispatch) => {
  return axios("http://localhost:3001/recipes").then((data) => {
    dispatch({ type: GET_ALL_RECIPES, payload: data.data });
  });
};

export const getRecipe = (id) => (dispatch) => {
  return axios(`http://localhost:3001/recipes/${id}`).then((data) => {
    dispatch({ type: GET_RECIPE, payload: data });
  });
};

export const getDiets = () => (dispatch) => {
  return axios(`http://localhost:3001/diets`).then((data) => {
    dispatch({ type: GET_DIETS, payload: data.data });
  });
};

export const createRecipe = (data) => {
  return {
    type: CREATE_RECIPE,
    payload: data,
  };
};

export const getRecipesByName = (name) => (dispatch) => {
  return axios(`http://localhost:3001/recipes?name=${name}`).then((data) => {
    dispatch({ type: GET_RECIPE_BY_NAME, payload: data.data });
  });
};

export const filterByOrder = (order) => {
  return {
    type: FILTER_BY_ORDER,
    payload: order,
  };
};

export const filterByScore = (scoreOrder) => {
  return {
    type: FILTER_BY_SCORE,
    payload: scoreOrder,
  };
};

export const filterByType = (diet) => {
  return {
    type: FILTER_BY_TYPE,
    payload: diet,
  };
};
