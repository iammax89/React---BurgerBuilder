import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "./Order/Order";
import Spinner from "../../UI/Spinner/Spinner";
import * as actions from "../../../+store/actions/index";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    return (
      <React.Fragment>
        {this.props.orders.length || !this.props.loading ? (
          this.props.orders.map(order => {
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

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispacthToProps = dispath => {
  return {
    onFetchOrders: () => dispath(actions.fetchOrders())
  };
};
export default connect(mapStateToProps, mapDispacthToProps)(Orders);
