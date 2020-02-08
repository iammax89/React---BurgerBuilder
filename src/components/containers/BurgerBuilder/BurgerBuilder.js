import React, { Component, Fragment } from "react";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControlls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
export default class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false
    };
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({
      purchaseable: sum > 0
    });
  }

  addIngredientHandler = key => {
    const updateCount = ++{ ...this.state.ingredients }[key];
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[key] = updateCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[key];
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updateIngredients);
  };

  purchasedHandler = () => {
    this.setState({
      purchasing: !this.state.purchasing
    });
  };
  removeIngredientHandler = key => {
    if (!this.state.ingredients[key]) {
      return;
    }
    const updateCount = --{ ...this.state.ingredients }[key];
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[key] = updateCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[key];
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updateIngredients);
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchasedHandler}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
        />
      </Fragment>
    );
  }
}
