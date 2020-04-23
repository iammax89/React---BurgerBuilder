import React, { Component } from "react";
import classes from "./ContactData.module.scss";
import Button from "../../../UI/Button/Button";
import axios from "../../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../UI/Input/Input";
import { connect } from "react-redux";
import ErrorHandler from "../../../ErrorHandler/ErrorHandler";
import * as actions from "../../../../+store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Your ZipCode"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheepest", displayValue: "Cheepest" }
          ]
        },
        value: "fastest",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },

    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = { ...this.state.orderForm };

    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        const element = this.state.orderForm[key];
        formData[key] = element.value;
      }
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    };

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    console.log(updatedFormElement.valid);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let isFormValid = true;
    for (const key in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(key)) {
        const element = updatedOrderForm[key];
        isFormValid = element.valid && isFormValid;
      }
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: isFormValid
    });
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }
    return isValid;
  };
  render() {
    const spinner = <Spinner />;
    const inputs = Object.keys(this.state.orderForm).map(key => (
      <Input
        inputtype={this.state.orderForm[key].elementType}
        key={key}
        {...this.state.orderForm[key].elementConfig}
        value={this.state.orderForm[key].value}
        changed={event => this.inputChangedHandler(event, key)}
        invalid={this.state.orderForm[key].valid ? null : "true"}
        touched={this.state.orderForm[key].touched ? "true" : null}
      />
    ));
    const form = (
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data:</h4>
        {this.props.loading ? spinner : form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispathToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(ErrorHandler(withRouter(ContactData), axios));
