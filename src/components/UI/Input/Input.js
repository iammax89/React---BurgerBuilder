import React from "react";
import classes from "./Input.module.scss";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      const options = props.options.map(option => (
        <option key={option.displayValue} value={option.value}>
          {option.displayValue}
        </option>
      ));
      inputElement = (
        <select
          className={classes.InputElement}
          {...props}
          onChange={props.changed}
        >
          {options}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
