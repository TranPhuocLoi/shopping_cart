import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  product: {
    width: "25%",
    background: "#fff",
    borderRadius: "10px",
    "& img": {
      maxWidth: "100%",
      objectFit: "contain"
    },
    ['@media (max-width:780px)']: {
      width: '33.3%'
    },
    ['@media (max-width:780px)']: {
      width: '50%'
    }

  },
  wrapper: {
    boxShadow: "1px 1px 5px 1px rgba(6,6,6,0.3)",
    margin: "10px",
    padding: "10px",
  },
  wImg: {
    maxHeight: "300px",
    overflow: "hidden"
  },
  wTitle: {
    minHeight: "80px",
    fontWeight: '300',
    textAlign: "center"
  },
  removeUnderline: {
    textDecoration: "none",
    "& :hover": {
      color: "#2c3e50",
      transition: "all 0.5s"
    }
  }
});

export default function Product(props) {

  const handleAddProduct = () => {
    const { name, price, id, size, src } = props;
    const newProduct = {
      id, price, name, size, src, quantity: 1,
    };
    props.addToCart(newProduct);
  }

  const classes = useStyles();
  const { name, price, src, id, size } = props;
  return (
    <Box className={classes.product}>
      <Box className={classes.wrapper}>
        <Box className={classes.wImg}>
          <img src={src} />
        </Box>
        {/* to={`products/${id}`} */}
        <Link to={`products/${id}`} className={classes.removeUnderline}>
          <Typography className={classes.wTitle} variant="h6" color="secondary">
            {name}
          </Typography>
        </Link>
        <Typography variant="subtitle2">ID: {id}</Typography>
        <Typography variant="subtitle2">Price: {price}</Typography>
        <Typography variant="subtitle2">Size: {size}</Typography>
        <Button variant="contained" color="secondary" fullWidth
          onClick={handleAddProduct}
        >
          Add to card
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
          Detail
        </Button>
      </Box>
    </Box>
  );
}
