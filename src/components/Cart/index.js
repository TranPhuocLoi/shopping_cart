import React, { Component } from 'react';
import Details from "../Details/index";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import CheckoutForm from "../CheckoutForm";


function Cart(props) {
  return (
    <div>
      <Grid container>
        <Grid md={8}>
          {
            props.cart.map(product => {
              return (
                <Details
                  type="cart"
                  key={product.id}
                  product={product}
                  quantity={product.quantity}
                  size={product.size}
                ></Details>
              );
            })
          }
        </Grid>
        <Grid md={4}>
          <CheckoutForm
            totalPrice={props.cart.reduce((total, item) => {
              return (total = total + item.price * item.quantity);
            }, 0)}
            totalValue={props.cart.reduce((total, item) => {
              return (total = total + item.quantity);
            }, 0)}
            products={props.cart}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
