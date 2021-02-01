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

// back end recieves req(request) data from front end on a button click event.
router.post("/login", (req, res) => {
  // on request we search through the db at the table of user_data
  db.user_data
    //then findOne ROW in the db
    .findOne({
      // "where" the column user_name in that ROW is the same as the front end string data (req.body.user_name) from username input field
      where: {
        user_name: req.body.user_name,
      },
    })
    // we store the information from that ROW selected based on the targeted column into UserData
    .then((userData) => {
      // this will destroy the session if no information can be compared properally to the db table when searching for matching inputed username and contained db usernames.
      if (!userData) {
        req.session.destroy();
        res.status(404).send("no such user");
      } else {
        // if a username can be found matching then compare the front end password string (req.body.password) to the contained db password (userData.password) *still have all row data*
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          req.session.user = {
            id: userData.id,
            user_name: userData.user_name,
          };
          // if user_name and password strings from the front end match the strings in the data base then a response of userData. Now send a response containing the new ROW data for that user.
          res.json(userData);
        } else {
          // password no match
          req.session.destroy();
          res.status(401).send("wrong info");
        }
      }
    });
});

// image url data string being sent from the front end cloudinary call
router.post("/image", async function (req, res) {
  // the variable lastEntry refers to the createdAt column in our DB based upon the specific user ID wihhin the scope of our user session
  var lastEntry = await getLastEntry(req.session.user.id);
  // await fuction makes sure the lastEntry variable is populated with the function (data) from getLastEntry

  console.log(lastEntry.createdAt);
  // The DB is then probed for an update in the daily_history table at the column index of memomry_image, updating that column with the sent back data which is a url string (req.body.memory_image).
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
