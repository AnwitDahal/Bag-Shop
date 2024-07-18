const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const productModels = require("../models/product-models");
const userModels = require("../models/user-models");
const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
  let products = await productModels.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedin, async (req, res) => {
  let user = await userModels
    .findOne({ email: req.user.email })
    .populate("cart");
   const bill= (user.cart[0].price)+20-Number( user.cart[0].discount)
    // console.log(user)
  res.render("cart", {  user,bill });
});
router.get("/addtocart/:productid", isLoggedin, async (req, res) => {
  let user = await userModels.findOne({ email: req.user.email });
  // console.log(user);
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/cart");
});


module.exports = router;
