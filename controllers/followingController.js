const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

router.get("/session", (req, res) => {
  res.json(req.session.user.id);
});

const follower = [];

router.post("/api/following/:id", (req, res) => {
  console.log(req.session.user);
  db.user_data
    .findOne({
      where: {
        Id: req.session.user.id,
      },
    })
    .then((data) => {
      if (!data.following) {
        res.send("is not folowing anyone");
      } else {
        follower.length = 0;
        follower.push(data.following);
        db.user_data.update({
          where: {
            Id: req.session.user.id,
          },
        });
        res.json(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
