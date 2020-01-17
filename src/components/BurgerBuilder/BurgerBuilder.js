import React, {Component, Fragment} from "react";
import Burger from "../Burger/Burger";

export default class BurgerBuilder extends Component {
  constructor() {
      super();
  }
    render() {
        return <Fragment>
            <Burger/>
            <div>Build Controls</div>
        </Fragment>
    }
}
