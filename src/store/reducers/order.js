import actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isLoadingOrders: false,
  purchased: false
};

const purchaseInit = (state) => {
  return {
    ...state,
    purchased: false
  };
};

const purchaseBurgerStart = (state) => {
  return {
    ...state,
    isLoadingOrders: true
  }
};

const purchaseBurgerSuccess = (state, action) => {
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
};

const purchaseBurgerFail = (state) => {
  return {
    ...state,
    isLoadingOrders: false
  };
};

// ============

const fetchOrdersStart = (state) => {
   return {
     ...state,
     isLoadingOrders: true
   };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    isLoadingOrders: false
  };
};

const fetchOrdersFail = (state) => {
  return {
    ...state,
    isLoadingOrders: false
  }
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);

    // ============
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);

    default:
      return state;
  }
};

export default orderReducer;
