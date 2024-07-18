const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const productModels = require("../models/product-models");
const router = express.Router();

router.get("/", (req, res) => {
  let error=req.flash('error')
  res.render("index",{error});
});

router.get("/shop", isLoggedin,async (req, res) => {
  let products= await productModels.find();
  res.render('shop',{products})
});



module.exports = router;
