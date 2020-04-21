import React, { Component } from 'react';
import {
  Grid,
  Box,
  LinearProgress,
  Typography,
  Button,
  Checkbox,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";

export class index extends Component {

  state = {
    products: {},
    loading: true,
    size: "",
    quantity: 0
  };
  handleClickAddToCart = () => {
    if (this.props.type !== "cart") {
      this.props.addToCart({
        id: this.state.products.id,
        name: this.state.products.name,
        price: this.state.products.price,
        size: this.state.size,
        quantity: this.state.quantity,
        src: this.state.products.src
      });
    }
    else {
      alert(this.state.products.id)
      this.props.deleteFromCart(this.state.products.id);
    }
  };
  handleSelectSize = event => {
    this.setState({ size: event.target.value });
  };
  handleChangeQuantity = event => {
    if (this.props.type === "cart") {
      if (Number(event.target.value) === 0) {
        return this.props.deleteFromCart(this.state.products.id);
      }
      this.props.updateCartItem(this.state.product.id, event.target.value);
    }
    this.setState({ quantity: event.target.value });
  };

  componentDidMount = () => {
    if (this.props.type !== "cart") {
      axios
        .get(`https://kmin-academy-shopping-cart-api.herokuapp.com/products/${this.props.match.params.masanpham}`)
        .then(res => {
          console.log(res);
          this.setState({ products: res.data, loading: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      this.setState({
        products: this.props.product,
        size: this.props.size,
        quantity: this.props.quantity,
        loading: false
      })
    }

  };

  render() {
    const { src, name, size, price } = this.state.products;
    return (
      // background: "#ecf0f1"
      <Box style={{ width: "100%", margin: "0px auto", height: "100vh" }}>
        {this.state.loading ? (<Box style={{ width: "100%", }} >
          <LinearProgress color="secondary" />
        </Box>) : <Box style={{ width: "80%", margin: "0px auto", paddingTop: "20px" }}>
            <Grid container>
              <Grid item md={5}>
                <Box
                  width="500px"
                  height="500px"
                  overflow="hidden"
                  boxShadow={3}>
                  <img src={src} style={{ maxWidth: '100%', objectFit: 'fill' }} />
                </Box>  {/* end box */}
              </Grid>
              <Grid item md={7}>
                <Box display="flex" alignItems="center" width="100%" height="100%">
                  <Box margin="15px" width="100%">
                    <Typography color="secondary"><h1>{name}</h1></Typography>
                    <Typography><h3>Price: {price}$</h3></Typography>
                    <Box display="flex">
                      {this.props.type !== "cart" ? size.map(s => {
                        return (
                          <label>
                            <input
                              type="radio"
                              name="sizes"
                              style={{
                                height: "30px",
                                width: "30px",
                                borderRadius: "15px",
                                boxShadow: "0 0 25px rbga(0,0,0,0.16)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "10px"
                              }}
                              value={s}
                              onChange={this.handleSelectSize}
                            />
                            {s}
                          </label>
                        );
                      }) : size}
                    </Box>
                    <Box width="300px" my={3}>
                      <TextField
                        type="number"
                        defaultValue={this.props.quantity || 1}
                        onChange={this.handleChangeQuantity}
                      >
                      </TextField>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth="true"
                      style={{ marginBottom: "15px" }}
                      size="medium"
                      onClick={this.handleClickAddToCart}
                    >  {this.props.type === "cart" ? "Delete items" : "Add to cart"}
                    </Button>
                    <Button
                      href="/cart"
                      variant="contained"
                      color="secondary"
                      fullWidth="true"
                      size="medium">  View cart
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        }
      </Box>
    );
  }
}
const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch({
      type: "ADD_TO_CART", payload: product
    }),
    deleteFromCart: id => dispatch({
      type: "DELETE_ITEM", payload: id
    }),
    updateCartItem: (id, quantity) => dispatch({
      type: "UPDATE_CART_ITEM", payload: { id, quantity }
    }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
