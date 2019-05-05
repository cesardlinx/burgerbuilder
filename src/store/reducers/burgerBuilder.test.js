import reducer from './burgerBuilder';
import actionTypes from '../actions/actionTypes';

describe('burgerBuilder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      ingredients: null,
      totalPrice: 4,
      error: false
    });
  });

  it('should fetch ingredients', () => {
    expect(reducer({
      ingredients: { salad: 0 },
      totalPrice: 4,
      error: false
    }, {
      type: actionTypes.FETCH_INGREDIENTS,
      ingredients: {
        salad: 1,
        meat:1,
        cheese: 1,
        bacon: 1
      },
    })).toEqual({
      ingredients: {
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
      },
      totalPrice: 4,
      error: false
    });
  });

  it('should add ingredient', () => {
    expect(reducer({
      ingredients: { salad: 0 },
      totalPrice: 4,
      error: false
    }, {
      type: actionTypes.ADD_INGREDIENT,
      ingredientType: 'salad'
    })).toEqual({
      ingredients: { salad: 1 },
      totalPrice: 4.5,
      error: false
    });
  });

  it('should remove ingredient if ingredient is > 0', () => {
    expect(reducer({
      ingredients: { salad: 2 },
      totalPrice: 5,
      error: false
    }, {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientType: 'salad'
    })).toEqual({
      ingredients: { salad: 1 },
      totalPrice: 4.5,
      error: false
    });
  });

  it('should not remove ingredient if ingredient is = 0', () => {
    expect(reducer({
      ingredients: { salad: 0 },
      totalPrice: 4,
      error: false
    }, {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientType: 'salad'
    })).toEqual({
      ingredients: { salad: 0 },
      totalPrice: 4,
      error: false
    });
  });

  it('should set the error', () => {
    expect(reducer({
      ingredients: null,
      totalPrice: 4,
      error: false
    }, {
      type: actionTypes.SET_ERROR
    })).toEqual({
      ingredients: null,
      totalPrice: 4,
      error: true
    });
  });

});