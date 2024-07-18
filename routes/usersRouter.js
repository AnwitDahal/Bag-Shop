const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controller/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello user");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;
