import React from "react";
import "./App.scss";
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
