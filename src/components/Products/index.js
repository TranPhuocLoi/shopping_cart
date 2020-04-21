import React, { Component } from "react";
import {
  Grid,
  Box,
  LinearProgress,
  Button,
  Typography
} from "@material-ui/core";
import Product from "../Product/index";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import { connect } from "react-redux";

const styles = theme => ({
  products: {
    width: "100%"
  },
  progress: {
    width: "100%"
  },
  sideBar: {

    height: "100%",
    padding: "10px",
    ['@media (max-width:780px)']: {
      minHeight: "15vh",
    }
  }
});

class Products extends React.Component {
  state = {
    products: [],
    page: 1,
    page_size: 8,
    desc: 0
  };
  handleChange = value => {
    this.setState({ page: value });
  };
  handleChangeOrder = value => {
    this.setState({ desc: value });
  };

  componentDidMount() {
    axios
      .get("https://kmin-academy-shopping-cart-api.herokuapp.com/products")
      .then(res => {
        console.log(res);
        this.setState({ products: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;

    const pagination = [];
    for (
      let i = 0;
      i < Math.ceil(this.state.products.length / this.state.page_size);
      i++
    ) {
      pagination.push(
        <Button
          variant={this.state.page === i + 1 ? "contained" : "outlined"}
          color="secondary"
          onClick={() => this.handleChange(i + 1)}
        >
          {i + 1}
        </Button>
      );
    }
    return (
      <Grid container direction="row" wrap="nowrap ">
        <Grid item xs={12} sm={4} md={3} >
          <Box boxShadow={1} className={classes.sideBar}>
            <Typography>Sort by Price</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.handleChangeOrder(1)}
            >
              ASC
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleChangeOrder(-1)}
            >
              DESC
            </Button>
          </Box>
        </Grid>
        <Grid item sm={4} sm={8} md={9} xs>
          <Box display="flex" flexWrap="wrap" className={classes.products}>
            {this.state.products.length > 0 ? (
              [...this.state.products]
                .sort((a, b) => {
                  return this.state.desc * (a.price - b.price);
                })
                .splice(
                  (this.state.page - 1) * this.state.page_size,
                  this.state.page_size
                )
                .map(product => {
                  return (
                    <Product
                      name={product.name}
                      price={product.price}
                      id={product.id}
                      src={product.src}
                      size={product.size}
                      addToCart={this.props.addToCart}
                    ></Product>
                  );
                })
            ) : (
                <Box className={classes.progress}>
                  <LinearProgress color="secondary" />
                </Box>
              )}
          </Box>
          <Box display="flex" justifyContent="center" marginTop="20px">
            {pagination}
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch({
      type: "ADD_TO_CART", payload: product
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));