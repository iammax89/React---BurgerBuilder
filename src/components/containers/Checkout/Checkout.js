import React from "react";
import CheckoutSummary from "../../CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export default class Checkout extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  UNSAFE_componentWillMount() {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    [...query.entries()].forEach(param => {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    });
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace(`/checkout/contact-data`);
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}
