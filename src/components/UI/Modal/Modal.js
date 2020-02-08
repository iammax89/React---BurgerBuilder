import classes from "./Modal.module.scss";

import React from "react";

const modal = props => {
  return <div className={classes.Modal}>{props.children}</div>;
};

export default modal;
