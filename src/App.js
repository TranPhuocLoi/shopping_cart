import React from "react";
import "./App.css";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Details from "./components/Details";
import theme from "./commons/theme";
import Navigations from "./components/Navigations";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import noMatch from "./components/noMatch";


const initState = {
  cart: []
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const indexOfProduct = state.cart.findIndex(ele => {
        return ele.id === action.payload.id;
      });
      if (indexOfProduct >= 0) {
        const newCartState = [...state.cart];
        newCartState[indexOfProduct].quantity = Number(newCartState[indexOfProduct].quantity) + Number(action.payload.quantity);
        return {
          ...state,
          cart: newCartState
        };
      }
      else {
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }
    };
    case "DELETE_ITEM": {
      const newCartState = state.cart.filter(item => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        cart: newCartState
      };
    }
    case "UPDATE_CART_ITEM": {
      const newCartState = [...state.cart];
      const indexOfProduct = state.cart.findIndex(ele => {
        return ele.id === action.payload.id;
      });
      //copy mang state cart trong store
      newCartState[indexOfProduct].quantity = action.payload.quantity
      return {
        ...state,
        cart: newCartState
      };
    }
  }
  return state;
};

const store = createStore(
  rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Navigations></Navigations>
            <Switch>
              <Route exact path="/" component={Products}></Route>
              <Route exact path="/products" component={Products}></Route>
              <Route path="/cart" component={Cart}></Route>
              <Route path="/products/:masanpham" component={Details} />
              <Route render={() => <noMatch />} />
            </Switch>
          </div>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
