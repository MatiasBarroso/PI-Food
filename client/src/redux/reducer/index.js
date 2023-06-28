import {
  GET_ALL_RECIPES,
  GET_RECIPE,
  GET_DIETS,
  CREATE_RECIPE,
  GET_RECIPE_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_BY_ORDER,
  FILTER_BY_SCORE,
  RESET_RECIPES,
  RECIPES_CREATED,
  CLEAN_STATE,
  LOADING,
  CHANGE_STATUS_FILTER,
} from "../actions";

const initialState = {
  filterStatus: "",
  loading: false,
  created: [],
  recipesCopy: [],
  recipes: [],
  recipe: {},
  recipeByName: {},
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        created: action.payload.filter((el) => el.createdInDb === true),
        recipesCopy: action.payload,
        recipes: action.payload,
      };
    case GET_RECIPE:
      const uuid = action.payload.split("-");
      if (uuid.length > 1) {
        return {
          ...state,
          recipe: state.created.find((el) => el.id === action.payload),
        };
      }

      return {
        ...state,
        recipe: state.recipesCopy.find(
          (el) => el.id === parseInt(action.payload)
        ),
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        created: state.created.concat(action.payload),
        recipesCopy: state.recipesCopy.concat(action.payload),
        recipes: state.recipes.concat(action.payload),
      };
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes:
          action.payload === ""
            ? state.recipesCopy
            : state.recipesCopy.filter((el) =>
                el.name.split(" ").some((el) => el.includes(action.payload))
              ),
      };
    case FILTER_BY_TYPE:
      if (action.payload === "reset") {
        return {
          ...state,
          recipes: state.recipesCopy,
        };
      }

      const filterRecipes = function (r) {
        const diets = r.diets;
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

      let filterState = state.recipesCopy
        .concat(state.created)
        .filter(filterRecipes);

      console.log(filterState);
      console.log(action.payload);

      if (filterState.length === 0) {
        return {
          ...state,
          filterStatus: "not found",
          recipes: [],
        };
      }

      return {
        ...state,
        filterStatus: "",
        recipes: filterState,
      };

    case FILTER_BY_ORDER:
      let sortedOrder;

      action.payload === "ASC"
        ? (sortedOrder = state.recipes.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }))
        : (sortedOrder = state.recipes.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          }));

      return {
        ...state,
        recipes: sortedOrder,
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

    case RESET_RECIPES:
      return {
        ...state,
        recipes: state.recipesCopy,
      };

    case RECIPES_CREATED:
      return {
        ...state,
        recipes: state.recipesCopy.filter((el) => el.createdInDb === true),
      };

    case CLEAN_STATE:
      return {
        ...state,
        recipe: {},
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CHANGE_STATUS_FILTER:
      return {
        ...state,
        filterStatus: "",
      };
    default:
      return state;
  }
};

export default rootReducer;
