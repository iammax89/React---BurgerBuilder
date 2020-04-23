import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredients = () => {
  return dispatch => {
    axios
      .get("ingredients.json")
      .then(Response => {
        console.log(Response.data);
        dispatch(setIngredients(Response.data));
      })
      .catch(() => {
        dispatch(fetchErrorHandle);
      });
  };
};

export const fetchErrorHandle = () => {
  return {
    type: actionTypes.FETCH_ERROR_HANDLE
  };
};
