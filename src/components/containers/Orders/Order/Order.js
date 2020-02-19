import React from "react";
import classes from "./Order.module.scss";
const Order = props => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }

  const ingredientOutput = ingredients.map((ing, idx) => {
    return (
      <span key={idx}>
        <strong>{ing.name}</strong> ({ing.amount})&nbsp;
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
