import React, { Component } from "react";
import classes from "./ContactData.module.scss";
import Button from "../../../UI/Button/Button";
import axios from "../../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../UI/Input/Input";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Maksym Malyshko",
        address: {
          street: "54B Nauky ave.",
          zipCode: "03083",
          country: "Ukraine"
        },
        email: "iammax89@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.history.push(`/`);
      })
      .catch(Error => console.error(Error));
  };
  render() {
    const spinner = <Spinner />;
    const form = (
      <form>
        <Input
          inputtype="inout"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="inout"
          type="email"
          name="email"
          placeholder="Your email"
        />
        <Input
          inputtype="inout"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputtype="inout"
          type="text"
          name="postal"
          placeholder="PostalCode"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data:</h4>
        {this.state.loading ? spinner : form}
      </div>
    );
  }
}

export default withRouter(ContactData);
