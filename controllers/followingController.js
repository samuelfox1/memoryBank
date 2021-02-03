const express = require("express");
const router = express.Router();
const db = require("../models");




//route to check session user info
router.get("/session", (req, res) => {
  res.json(req.session);
});



router.post("/api/follow/:id", async function (req, res) {
  console.log(req.session);
  db.user_data
    .findOne({ where: { id: req.session.user.id } })
    .then((dbuser) => {
      dbuser.addChildren(req.params.id);
      res.json(dbuser);
    });
});



router.get("/api/follow/", async function (req, res) {
  console.log(req.session);
  db.user_data
    .findOne({
      where: {
        id: req.session.user.id,
      },
      include: [
        { model: db.user_data, as: "Children", include: [db.daily_history] },
      ],
    })
    .then((data) => {
      // let child = data.getChildren().then((children) => {
      //   console.log(children);
      // });
      // console.log(child);
      res.json(data);
    });
});



module.exports = router;
