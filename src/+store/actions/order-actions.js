import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCAHSE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCAHSE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return dispath => {
    dispath(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then(Response => {
        dispath(purchaseBurgerSuccess(Response.data.name, orderData));
      })
      .catch(error => {
        dispath(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT
  };
};

export const fetchOrders = () => {
  return dispath => {
    dispath(fetchOrdersInit());
    axios
      .get(`/orders.json`)
      .then(Response => {
        const orders = [];
        Object.keys(Response.data).forEach(key =>
          orders.push({ ...Response.data[key], key: key })
        );
        dispath(fetchOrdersSuccess(orders));
      })
      .catch(error => dispath(fetchOrdersFail(error)));
  };
};
