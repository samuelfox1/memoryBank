//depndencies
const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
// route for creating a user profile
router.post("/create", function (req, res) {
  console.log(req.body.sign, "+++++++++++++++++++");

  db.user_data
    .create({
      user_name: req.body.user_name,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      sign: req.body.sign,
      email: req.body.email,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//route for login taking user_name and password a match conditionals
router.post("/login", (req, res) => {
  db.user_data
    .findOne({
      where: {
        user_name: req.body.user_name,
      },
    })
    .then((userData) => {
      if (!userData) {
        req.session.destroy();
        res.status(404).send("no such user");
      } else {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          req.session.user = {
            id: userData.id,
            user_name: userData.user_name,
          };
          res.json(userData);
        } else {
          req.session.destroy();
          res.status(401).send("wrong info");
        }
      }
    });
});

// router.get("/readsessions", (req, res) => {
//   res.json(req.session);
// });

//   router.get("/secretclub",(req,res)=>{
//     if(req.session.user){
//         res.send(`welcome to memoryBank, ${req.session.user.user_name}!`)
//     } else {
//         res.status(401).send("login first please")
//     }
// })

//   router.get('/logout',(req,res)=>{
//     req.session.destroy();
//     res.redirect('/')

module.exports = router;
