const express = require("express");
const router = express.Router();
const db = require("../models");




// route to check session user info
router.get("/session", (req, res) => {
  res.json(req.session);
});


// route for the session user to follow another user
// find the user that belongs to the session id
// for teh session user, add the req.params.id to the child column of the 'following' table (created from association in user_data model)
router.post("/api/follow/:id", async function (req, res) {
  db.user_data
    .findOne({ where: { id: req.session.user.id } })
    .then((dbUser) => {
      dbUser.addChildren(req.params.id);
      res.json(dbUser);
    });
});


// route for the session user to get data about all followers
// find the user that belongs to the session id
// include the followers of teh user, then include the daily_history entries for each user
router.get("/api/follow/", async function (req, res) {
  db.user_data
    .findOne({
      where: { id: req.session.user.id },
      include: [{ model: db.user_data, as: "Children", include: [db.daily_history] }],
    })
    .then((data) => { res.json(data) });
});



module.exports = router;
