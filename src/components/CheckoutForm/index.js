import React, { Component } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import Axios from "axios";

export default class CheckoutForm extends Component {
  state = {
    name: "",
    address: ""
  };
  handleChangeInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleClick = () => {
    Axios.post("https://kmin-academy-shopping-cart-api.herokuapp.com/cart", {
      id: Date.now(),
      userName: this.state.name,
      address: this.state.address,
      products: this.props.products
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Box boxShadow={4} p={3} my={3}>
        <Box display="flex">
          <Typography variant="h5">Tổng sản phẩm: </Typography>
          {this.props.totalValue}
        </Box>
        <Box display="flex">
          <Typography variant="h5">Tổng tiền: </Typography>
          {this.props.totalPrice}
        </Box>
        <Box display="flex">
          <Typography variant="h5">Tên người nhận hàng: </Typography>
          <TextField
            name="name"
            value={this.state.name}
            onChange={this.handleChangeInput}
          />
        </Box>
        <Box display="flex">
          <Typography variant="h5">Địa chỉ nhận hàng: </Typography>
          <TextField
            name="address"
            value={this.state.address}
            onChange={this.handleChangeInput}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={this.handleClick}
        >
          Check out
        </Button>
      </Box>
    );
  }
}