import React from "react";
import CheckoutSummary from "../../CheckoutSummary/CheckoutSummary";

export default class Checkout extends React.Component {
  state = {
    ingredients: []
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    [...query.entries()].forEach(param => (ingredients[param[0]] = +param[1]));
    this.setState({
      ingredients: ingredients
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
      </div>
    );
  }
}
