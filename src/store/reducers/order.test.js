import reducer from './order';
import actionTypes from '../actions/actionTypes';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      orders: [],
      isLoadingOrders: false,
      purchased: false
    });
  });

  it('should initialize purchase', () => {
    expect(reducer(undefined, { type: actionTypes.PURCHASE_INIT })).toEqual({
      orders: [],
      isLoadingOrders: false,
      purchased: false
    });
  });

  it('should start purchasing', () => {
    expect(reducer(undefined, { type: actionTypes.PURCHASE_BURGER_START })).toEqual({
      orders: [],
      isLoadingOrders: true,
      purchased: false
    });
  });

  it('should load a new order and set purchased to true upon a success order', () => {
    expect(reducer(undefined,
      {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: '123456',
        orderData: { ingredients: { salad: 0 } }
      })).toEqual({
      orders: [{
        id: '123456',
        ingredients: { salad: 0 }
      }],
      isLoadingOrders: false,
      purchased: true
    });
  });

  it('should stop loading if error', () => {
    expect(reducer({
      orders: [],
      isLoadingOrders: true,
      purchased: false
    }, {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: 'some error'
    })).toEqual({
      orders: [],
      isLoadingOrders: false,
      purchased: false
    });
  });

  it('should show loading when start fetching orders', () => {
    expect(reducer({
      orders: [],
      isLoadingOrders: false,
      purchased: false
    }, {
      type: actionTypes.FETCH_ORDERS_START,
    })).toEqual({
      orders: [],
      isLoadingOrders: true,
      purchased: false
    });
  });

  it('should stop loading when fetching orders and load orders', () => {
    expect(reducer({
      orders: [],
      isLoadingOrders: true,
      purchased: false
    }, {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: [
        { id: '1', ingredients: { salad: 1 }},
        { id: '2', ingredients: { salad: 2 }}
      ]
    })).toEqual({
      orders: [
        { id: '1', ingredients: { salad: 1 }},
        { id: '2', ingredients: { salad: 2 }}
      ],
      isLoadingOrders: false,
      purchased: false
    });
  });

  it('should stop loading when error', () => {
    expect(reducer({
      orders: [],
      isLoadingOrders: true,
      purchased: false
    }, {
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: 'some error'
    })).toEqual({
      orders: [],
      isLoadingOrders: false,
      purchased: false
    });
  });

});