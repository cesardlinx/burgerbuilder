import actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isLoadingOrders: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoadingOrders: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        isLoadingOrders: false,
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        isLoadingOrders: false
      };
    // ============
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isLoadingOrders: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        isLoadingOrders: false
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        isLoadingOrders: false
      }
    default:
      return state;
  }
};

export default orderReducer;
