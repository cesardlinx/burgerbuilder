import { actions } from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 4,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const burgerReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      }
    case actions.REMOVE_INGREDIENT:
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

    default:
      return state;
  }
}

export default burgerReducer;