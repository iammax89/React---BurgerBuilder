import React, { Fragment } from "react";
const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue checkout ?</p>
    </Fragment>
  );
};

export default OrderSummary;
