import React from "react";
import classes from "./ToogleButton.module.scss";

const ToogleButton = props => {
  return (
    <button onClick={props.toogle} className={classes.ToogleButton}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

export default ToogleButton;
