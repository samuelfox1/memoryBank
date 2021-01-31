const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/login", function (req, res) {
  res.render("login", {
    user: req.session.user,
  });
});

router.get("/history", function (req, res) {
  res.render("history");
});

router.get("/create", (req, res) => {
  res.render("create", {
    user: req.session.user,
  });
});

router.get("/home", function (req, res) {
  db.user_data
    .findOne({
      where: {
        id: req.session.user.id,
      },
      include: [db.daily_history],
    })
    .then((data) => {
      console.log(data, "00000000000000000000");
      const jsonData = data.map((obj) => {
        const jsonObj = obj.toJSON();

        return jsonObj;
      });

      console.log(data.first_name);
      var object = {
        horoscope: jsonData,
      };
      res.render("userHome", object);
    });
});

router.get("/review", function (req, res) {
  res.render("userHome2");
});

module.exports = router;
