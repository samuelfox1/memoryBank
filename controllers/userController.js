const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

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

router.post("/image", async function (req, res) {
  var lastEntry = await getLastEntry(req.session.user.id);
  console.log(lastEntry.createdAt);
  db.daily_history
    .update(
      {
        memory_image: req.body.memory_image,
      },
      {
        where: {
          createdAt: lastEntry.createdAt,
        },
      }
    )
    .then((data) => {
      console.log(data, "!!!!!!!!!!!!!!!!!!");
      res.send("updated");
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
