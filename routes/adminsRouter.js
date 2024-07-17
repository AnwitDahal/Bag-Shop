const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin-models");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let admin = await adminModel.find();
    if (admin.length > 0)
      return res
        .send(504)
        .send("You dont have permission to create a new admin");
        let {fullname,email,password}=req.body 
       let createdAdmin= await adminModel.create({
            fullname,
            email,
            password,
        })
    res.status(201).send(createdAdmin);

  });
}

router.get("/", (req, res) => {
  res.send("hello admin");
});

module.exports = router;
