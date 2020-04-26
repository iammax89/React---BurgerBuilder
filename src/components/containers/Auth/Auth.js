import React from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classes from "./Auth.module.scss";
import { connect } from "react-redux";
import { auth } from "../../../+store/actions/index";

export class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignup: true
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        elementType: "input",
        elementConfig: this.state.controls[controlName].elementConfig,
        value: event.target.value,
        validation: this.state.controls[controlName].validation,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({
      controls: updatedControls
    });
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.length > 0;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }
    if (rules.isEmail) {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      isValid = emailPattern.test(value);
      console.log(isValid);
    }
    return isValid;
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onLogin(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthHandler = () => {
    this.setState(prevSate => {
      return {
        isSignup: !prevSate.isSignup
      };
    });
  };

  render() {
    const inputs = Object.keys(this.state.controls).map(control => (
      <Input
        inputtype={this.state.controls[control].elementType}
        key={control}
        {...this.state.controls[control].elementConfig}
        value={this.state.controls[control].value}
        changed={event => this.inputChangedHandler(event, control)}
        invalid={this.state.controls[control].valid ? null : "true"}
        touched={this.state.controls[control].touched ? "true" : null}
      />
    ));

    const submitButton = <Button btnType="Success">SUBMIT</Button>;
    const switchButton = (
      <Button btnType="Danger" clicked={this.switchAuthHandler}>
        Switch To {this.state.isSignup ? "SignUp" : "SignIn"}
      </Button>
    );

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {inputs}
          {submitButton}
        </form>
        {switchButton}
      </div>
    );
  }
}
const mapDispatchToProps = dispath => {
  return {
    onLogin: (email, password, isSignup) =>
      dispath(auth(email, password, isSignup))
  };
};
export default connect(null, mapDispatchToProps)(Auth);
