import actionTypes from "./actionTypes";
import axios from '../../axios';

// Synchronous action creators
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

// Asynchronous action creator
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
      dispatch(purchaseBurgerStart());
      axios.post('/orders.json?auth=' + token, orderData).then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      }).catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
    }
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

// =====================================

export const fetchOrdersSuccess = (orders) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders };
}

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
}

export const fetchOrdersFail = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error };
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    // accessing protected resources through token
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get('/orders.json' + queryParams ).then(
      response => {

        const fetchedOrders = []
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const order = response.data[key];
            fetchedOrders.push({
              ...order,
              id: key
            });
          }
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));

      }
    ).catch(
      error => {
        dispatch(fetchOrdersFail(error));
      }
    );
  }
}
