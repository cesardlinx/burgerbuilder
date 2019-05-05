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

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
  };
};

const removeIngredient = (state, action) => {
  const oldCount = state.ingredients[action.ingredientType];
  let updatedCount, totalPrice;

  if (oldCount) {
    updatedCount = oldCount - 1;
    totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
  } else {
    updatedCount = oldCount;
    totalPrice = 4;
  }

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: updatedCount
    },
    totalPrice
  };
};

const fetchIngredients = (state, action) => {
  return {
    ...state,
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4
  };
};

const setError = (state) => {
  return {
    ...state,
    error: true
  };
}

const burgerBuilderReducer = (state=initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS:
      return fetchIngredients(state, action);

    case actionTypes.SET_ERROR:
      return setError(state);

    default:
      return state;
  }
}

export default burgerBuilderReducer;