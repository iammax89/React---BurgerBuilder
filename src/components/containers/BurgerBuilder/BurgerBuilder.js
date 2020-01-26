import React, {Component, Fragment} from "react";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControlls/BuildControls";

export const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
export default class BurgerBuilder extends Component {


    constructor(props) {
        super(props)
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4
        }
    }

    addIngredientHandler = key => {
        const updateCount = ++this.state.ingredients[key];
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[key] = updateCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[key];
        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = key => {
        if (!this.state.ingredients[key]) {
            return
        }
        const updateCount = --this.state.ingredients[key];
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[key] = updateCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[key];
        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        return <Fragment>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientAdded={this.addIngredientHandler}
                           ingredientRemoved={this.removeIngredientHandler}
                           disabled={disableInfo}
            />
        </Fragment>
    }
}