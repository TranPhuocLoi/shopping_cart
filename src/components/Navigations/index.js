import React, { Component } from "react";
import logo from './logo.png';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


export class index extends Component {


  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <Icon>menu</Icon>
            </IconButton> */}
            <img src={logo} alt="Logo" style={{ width: "90px" }} />
            <Box ml="auto">
              <Button color="inherit">
                <Link to="/" className="App-link">
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/products" className="App-link">
                  Products
                </Link>
              </Button>
              <Button color="inherit">
                <Badge badgeContent={this.props.cartTotal} color="secondary">
                  <Link to="/cart" className="App-link">
                    Cart
                  </Link>
                </Badge>
              </Button>
              {/* <Button color="inherit">
                <Link to="/products/1" className="App-link">
                  Details
                </Link>
              </Button> */}
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartTotal: state.cart.reduce(function (total, item) {
      return (total = total + Number(item.quantity));
    }, 0)
  };
};
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(index);