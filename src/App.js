import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import Layout from "./components/containers/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/containers/Checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route path="/burger-builder" exact component={BurgerBuilder} />
            <Route path="/checkout" exact component={Checkout} />
            <Redirect from="/" to="burger-builder" exact/>
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
