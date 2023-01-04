import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIET";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";
export const RESET_RECIPES = "RESET_RECIPES";
export const RECIPES_CREATED = "RECIPES_CREATED";
export const CLEAN_STATE = "CLEAN_STATE";

export const getAllRecipes = () => (dispatch) => {
  return axios("http://localhost:3001/recipes").then((res) => {
    dispatch({ type: GET_ALL_RECIPES, payload: res.data });
  });
};

export const getRecipe = (id) => (dispatch) => {
  return axios(`http://localhost:3001/recipes/${id}`).then((res) => {
    dispatch({ type: GET_RECIPE, payload: res.data });
  });
};

export const getDiets = () => (dispatch) => {
  return axios(`http://localhost:3001/diets`).then((data) => {
    dispatch({ type: GET_DIETS, payload: data.data });
  });
};

export function createRecipe(payload) {
  return async function (dispatch) {
    await axios.post(`http://localhost:3001/recipe`, payload).then((res) => {
      return dispatch({ type: CREATE_RECIPE, payload: res.data });
    });
  };
}

export const getRecipesByName = (name) => (dispatch) => {
  return axios(`http://localhost:3001/recipes?name=${name}`).then((res) => {
    dispatch({ type: GET_RECIPE_BY_NAME, payload: res.data });
  });
};

export const resetRecipes = () => {
  return {
    type: RESET_RECIPES,
  };
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

export const createdRecipes = () => {
  return {
    type: RECIPES_CREATED,
    payload: true,
  };
};

export const cleanUpState = (state) => {
  return {
    type: CLEAN_STATE,
    payload: state,
  };
};
