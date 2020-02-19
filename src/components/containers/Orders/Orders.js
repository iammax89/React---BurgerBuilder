import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";

export default class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    const orders = [];
    axios
      .get(`/orders.json`)
      .then(Response => {
        Object.keys(Response.data).forEach(key =>
          orders.push({ ...Response.data[key], key: key })
        );
        this.setState({
          orders: orders,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.orders.length ? (
          this.state.orders.map(order => {
            return (
              <Order
                key={order.key}
                ingredients={order.ingredients}
                price={+order.price}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}
