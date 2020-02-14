import React from "react";
import classes from "./Toolbar.module.scss";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationIteams";
import ToogleButton from "../SideDrawer/ToogleButton/ToogleButton";
import PropTypes from "prop-types";

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <ToogleButton toogle={props.closed} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};
Toolbar.propTypes = {
  type: PropTypes.bool
};
export default Toolbar;
