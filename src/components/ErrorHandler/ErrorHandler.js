import React, { Fragment } from "react";
import Modal from "../UI/Modal/Modal";

const ErrorHandler = (Component, axios) => {
  return class extends React.Component {
    state = {
      error: null
    };

    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use(req => req);
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
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
