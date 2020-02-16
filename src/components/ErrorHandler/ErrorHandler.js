import React, { Fragment } from "react";
import Modal from "../UI/Modal/Modal";

const ErrorHandler = (Component, axios) => {
  return class extends React.Component {
    state = {
      error: null
    };
    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    errorComfirdHandler = () => {
      this.setState({
        error: null
      });
    };
    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Component {...this.props} />
        </Fragment>
      );
    }
  };
};
export default ErrorHandler;
