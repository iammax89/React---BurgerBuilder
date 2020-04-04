import React, { Component, Fragment } from "react";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControlls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../../+store/actions";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    return sum > 0;
  }

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
    this.props.history.push(`/checkout`);
  };

  render() {
    const disableInfo = {
      ...this.props.ings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let burger = (
      <Fragment>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ordered={this.purchaseHandler}
          ingredientAdded={this.props.onIngredientsAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disableInfo}
          price={this.props.price}
          purchaseable={this.updatePurchaseState(this.props.ings)}
        />
      </Fragment>
    );
    let orderSummary = (
      <OrderSummary
        price={this.props.price.toFixed(2)}
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );
    if (!this.props.ings) {
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
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    purchaseable: state.purchaseable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
      }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
      })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
