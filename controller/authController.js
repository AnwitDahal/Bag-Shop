const bcrypt = require("bcrypt");
const userModel = require("../models/user-models");
const { generateToken } = require("../utils/generate-token");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      res.status(401).send("Email already registered");
      res.redirect("/");
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/shop");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
