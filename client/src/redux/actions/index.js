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
export const LOADING = "LOADING";
export const CHANGE_STATUS_FILTER = "CHANGE_STATUS_FILTER";

export const getAllRecipes = () => (dispatch) => {
  return axios("/recipes").then((res) => {
    dispatch({ type: GET_ALL_RECIPES, payload: res.data });
  });
};

export const getRecipe = (id) => (dispatch) => {
  dispatch({ type: GET_RECIPE, payload: id });
};

export const getDiets = () => (dispatch) => {
  return axios(`/diets`).then((data) => {
    dispatch({ type: GET_DIETS, payload: data.data });
  });
};

export function createRecipe(payload) {
  return async function (dispatch) {
    await axios.post(`/recipe`, payload).then((res) => {
      return dispatch({ type: CREATE_RECIPE, payload: res.data });
    });
  };
}

export const getRecipesByName = (name) => (dispatch) => {
  dispatch({ type: GET_RECIPE_BY_NAME, payload: name });
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

export const filterByType = (diet, status) => {
  return {
    type: FILTER_BY_TYPE,
    payload: { filter: diet, status: status },
  };
};

export const createdRecipes = () => {
  return {
    type: RECIPES_CREATED,
    payload: true,
  };
};

export const cleanUpState = (id) => {
  return {
    type: CLEAN_STATE,
    payload: { id: id, state: "recipes" },
  };
};

export const loading = (loading) => {
  return {
    type: LOADING,
    payload: loading,
  };
};

export const changeStatusFilter = (payload) => {
  return {
    type: CHANGE_STATUS_FILTER,
    payload: payload,
  };
};
