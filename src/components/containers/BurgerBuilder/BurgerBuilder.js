import React, { Component, Fragment } from "react";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControlls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";

export const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }
  componentDidMount() {
    console.log(this.props);
    axios
      .get("ingredients.json")
      .then(Response => {
        this.setState({
          ingredients: Response.data
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
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

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };
  purchaseContinueHandler = () => {
    const queryParams = [];
    Object.keys(this.state.ingredients).forEach(i => {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    });
    this.props.history.push({
      pathname: `/checkout`,
      search: `?${queryParams.join("&")}`
    });

    // this.setState({
    //   loading: true
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Maksym Malyshko",
    //     address: {
    //       street: "54B Nauky ave.",
    //       zipCode: "03083",
    //       country: "Ukraine"
    //     },
    //     email: "iammax89@gmail.com"
    //   },
    //   deliveryMethod: "fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(Response => {
    //     console.log(Response);
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(Error => console.error(Error));
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
    let burger = (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchaseHandler}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
        />
      </Fragment>
    );
    let orderSummary = (
      <OrderSummary
        price={this.state.totalPrice.toFixed(2)}
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );
    if (!this.state.ingredients) {
      burger = this.state.error ? (
        <p>Ingredients can't be loaded</p>
      ) : (
        <Spinner />
      );
      orderSummary = <Spinner />;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.state.loading ? <Spinner /> : orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}
export default ErrorHandler(BurgerBuilder, axios);
