const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin-models");

// if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try{
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
      
    }
    catch(err){
      console.log(err)
    }
    
  });
// }

router.get("/admin", (req, res) => {
 let success= req.flash('success')
  res.render("createproducts",{success});
});

router.get("/shop", (req, res) => {
  res.render("admin")
});

router.get("/login", (req, res) => {
  res.render("owner-login")
});



module.exports = router;
