import React, { Fragment } from "react";
import { Content } from "./Layout.module.scss";

const Layout = props => (
  <Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={Content}>{props.children}</main>
  </Fragment>
);

export default Layout;
