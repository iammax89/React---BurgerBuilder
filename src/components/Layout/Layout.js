import React, { Fragment } from "react";
import { Content } from "./Layout.module.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = props => (
  <Fragment>
    <Toolbar />
    <SideDrawer />
    <main className={Content}>{props.children}</main>
  </Fragment>
);

export default Layout;
