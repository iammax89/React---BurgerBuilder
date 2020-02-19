import React from "react";

import classes from "./Burger.module.scss";
import BurgerIngredient from "./Burgeringredient/Burgeringredient";

const Burger = props => {
  console.log(props);
  let transformIngredients = Object.keys(props.ingredients)
    .map((key, idx) =>
      [...Array(props.ingredients[key])].map((_, i) => (
        <BurgerIngredient key={`${key}${i}`} type={key} />
      ))
    )
    .reduce((prev, curr) => prev.concat(curr), []);
  console.log(transformIngredients);
  if (!transformIngredients.length) {
    transformIngredients = <div>Please start adding ingredients.</div>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
