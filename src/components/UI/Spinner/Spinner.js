import React from "react";
import { Spin, Icon } from "antd";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  const antIcon = <Icon type="loading" spin className={classes.Icon} />;
  return <Spin className={classes.Spinner} indicator={antIcon} />;
};

export default Spinner;
