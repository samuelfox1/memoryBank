const express = require("express");
const { HSTORE } = require("sequelize");
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

// router.get("/history", function (req, res) {
//   res.render("history");
// });

router.get("/create", (req, res) => {
  res.render("create", {
    user: req.session.user,
  });
});

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
      console.log(
        data.dataValues.user_datum.dataValues.first_name,
        "!!!!!!!!!!!!!!!!!!"
      );
      const hbsObj = {
        histories: data.dataValues,
        users: data.dataValues.user_datum.dataValues,
      };

      res.render("userHome", hbsObj);
    });
});

router.get("/history", function (req, res) {
  console.log(req.session.user.id);
  db.daily_history
    .findAll({
      where: {
        userDatumId: req.session.user.id,
      },
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

//returns createdAt clou
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
