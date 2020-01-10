const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Product = require("../../models/Products.js");
const Cart = require("../../models/Cart.js");

router.post("/newProduct", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  newProduct.save().then(product => res.json(product));
});

router.get("/allProducts", (req, res) => {
  Product.find({})
    .then(product => {
      // console.log(product);

      res.json(product);
    })
    .catch(err => console.log(err));
});

router.post("/addToCart", (req, res) => {
  const newCartProduct = new Cart({
    user: req.body.id,
    ProductId: req.body.productid
  });
  newCartProduct
    .save()
    .then(product => res.json(product))
    .catch(err => console.log(err));
});

router.post("/allCartProducts", (req, res) => {
  Cart.find({ user: req.body.id })
    .populate("ProductId")
    .then(products => {
      // console.log(products);

      res.json(products);
    });
});

module.exports = router;
