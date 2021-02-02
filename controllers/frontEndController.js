const express = require("express");
// const { HSTORE } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

// / route to the welcome page
router.get("/", function (req, res) {
  res.render("index");
});

// /login route to go to login page
router.get("/login", function (req, res) {
  res.render("login", {
    user: req.session.user,
  });
});

// /create route from welcome page to create user page
router.get("/create", (req, res) => {
  res.render("create", {
    user: req.session.user,
  });
});

// /home route for after login user goes to their home page
// users home page will always display the most recent data for that day
router.get("/home", async function (req, res) {
  var lastEntry = await getLastEntry(req.session.user.id);
  db.daily_history
    .findOne({
      where: {
        createdAt: lastEntry.createdAt,
      },
      include: [db.user_data],
    })
    .then((data) => {
      const hbsObj = {
        histories: data.dataValues,
        users: data.dataValues.user_datum.dataValues,
      };

      res.render("userHome", hbsObj);
    });
});

// /history route that the user can visit once logged in from the burger bar in the top right to view past entries order by most recent day
router.get("/history", function (req, res) {
  req.session.user.id;
  db.daily_history
    .findAll({
      where: {
        userDatumId: req.session.user.id,
      },
      include: [db.user_data],
    })
    .then((data) => {
      const jsonData = data.map((obj) => {
        const jsonObj = obj.toJSON();

        return jsonObj;
      });

      const hbsObj = {
        histories: jsonData,
      };

      res.render("history", hbsObj);
    });
});

router.post("/api/find_user", (req, res) => {
  // Article.findAll({
  //   where: {
  //     $or: [
  //      title: { like: '%' + searchQuery + '%' },
  //      description: { like: '%' + searchQuery2 + '%' }
  //     ]
  //   }
  // });

  // Model.findAll({
  //   attributes: ["foo", "bar"],
  // });

  // Post.findAll({
  //   where: {
  //     [Op.or]: [{ authorId: 12 }, { authorId: 13 }],
  //   },
  // });

  db.user_data
    .findAll({
      where: {
        [Op.or]: [
          { user_name: req.body.find_user },
          { first_name: req.body.find_user },
          { last_name: req.body.find_user },
          { sign: req.body.find_user },
          { email: req.body.find_user },
        ],
      },
    })
    .then((data) => {
      res.json(data);
    });
});

//returns the most recent entry for the logged in user
function getLastEntry(data) {
  return new Promise((resolve, reject) => {
    db.daily_history
      .findAll(
        {
          where: {
            userDatumId: data,
          },
        },
        {
          limit: 1,
          order: [["createdAt", "DESC"]],
        }
      )
      .then((data) => {
        resolve(data[0]);
      });
  });
}

module.exports = router;
