import actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const burgerBuilderReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      }
    case actionTypes.REMOVE_INGREDIENT:
      const oldCount = state.ingredients[action.ingredientType];
      let updatedCount;

      if (oldCount) {
        updatedCount = oldCount - 1;
      } else {
        updatedCount = oldCount;
      }

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: updatedCount
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
      }
    case actionTypes.FETCH_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        }
      }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default burgerBuilderReducer;