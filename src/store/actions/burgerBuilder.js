import actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: name
  }
}

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: name
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients
  }
}

export const setError = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json').then(
    response => {
      dispatch(setIngredients(response.data));
    }).catch(error => {
      dispatch(setError());
    });
  }
}