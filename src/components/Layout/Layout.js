import React, { Fragment } from "react";
import { Content } from "./Layout.module.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => (
  <Fragment>
    <Toolbar />
    <main className={Content}>{props.children}</main>
  </Fragment>
);

export default Layout;
