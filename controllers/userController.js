const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

// router.get("/api/user_data", function (req, res) {
//   // findAll returns all entries for a table when used with no options
//   db.User_Data.findAll({}).then(function (data) {
//     // We have access to the todos as an argument inside of the callback function
//     res.json(data);
//   });
// });

// router.get("/api/user_data/:id", function (req, res) {
//   // findAll returns all entries for a table when used with no options
//   db.user_data
//     .findOne({
//       where: {
//         id: req.params.id,
//       },
//     })
//     .then(function (data) {
//       // We have access to the todos as an argument inside of the callback function
//       res.json(data);
//     });
// });

router.post("/signup", function (req, res) {
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

  router.get("/readsessions", (req, res) => {
    res.json(req.session);
  });

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
});

module.exports = router;
