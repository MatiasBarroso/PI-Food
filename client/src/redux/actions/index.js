import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIET";

export const getAllRecipes = () => (dispatch) => {
  return axios("http://localhost:3001/recipes").then((data) => {
    dispatch({ type: GET_ALL_RECIPES, payload: data });
  });
};

export const getRecipe = (id) => (dispatch) => {
  return axios(`http://localhost:3001/recipes/${id}`).then((data) => {
    dispatch({ type: GET_RECIPE, payload: data });
  });
};

export const getDiets = () => (dispatch) => {
  return axios(`http://localhost:3001/diets`).then((data) => {
    dispatch({ type: GET_DIETS, payload: data });
  });
};

export const createRecipe = (data) => {
  return {
    type: CREATE_RECIPE,
    payload: data,
  };
};
