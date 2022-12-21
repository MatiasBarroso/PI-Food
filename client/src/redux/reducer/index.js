import {
  GET_ALL_RECIPES,
  GET_RECIPE,
  GET_DIETS,
  CREATE_RECIPE,
  GET_RECIPE_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_BY_ORDER,
  FILTER_BY_SCORE,
} from "../actions";

const initialState = {
  recipesCopy: [],
  recipes: [],
  recipe: {},
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesCopy: action.payload,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
      };
    case FILTER_BY_TYPE:
      const filterRecipes = function (recipe) {
        const diets = recipe.diets;
        let items = [];

        action.payload.forEach(function (diet) {
          if (diets.includes(diet)) {
            items.push(diet);
          }
        });

        if (items.length === action.payload.length) {
          return true;
        }
      };

      const filterState = state.recipesCopy.filter(filterRecipes);

      return {
        ...state,
        recipes: filterState,
      };

    case FILTER_BY_ORDER:
      const recipesOrder =
        action.payload === "up"
          ? state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              else return -1;
            })
          : state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              else return -1;
            });
      return {
        ...state,
        recipes: recipesOrder,
      };

    case FILTER_BY_SCORE:
      const recipesOrderScore =
        action.payload === "up"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              else return -1;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1;
              else return -1;
            });
      return {
        ...state,
        recipes: recipesOrderScore,
      };

    default:
      return state;
  }
};

export default rootReducer;
