import React, { Fragment } from "react";
import { Content } from "./Layout.module.scss";
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

export default class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToogleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  
  render() {
    return (
      <Fragment>
        <Toolbar closed={this.sideDrawerToogleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}
