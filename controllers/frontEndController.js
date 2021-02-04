const express = require("express");
// const { HSTORE } = require("sequelize");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const request = require("request");
// / route to the welcome page
router.get("/", async function (req, res) {
  if (req.session.user) {
    var lastEntry = await getLastEntry(req.session.user.id);
    db.daily_history
      .findOne({
        where: { createdAt: lastEntry.createdAt },
        include: [db.user_data],
      })
      .then((data) => {
        data.dataValues.createdAt = convertDate(data.dataValues.createdAt);
        const hbsObj = {
          histories: data.dataValues,
          users: data.dataValues.user_datum.dataValues,
        };
        res.render("userHome", hbsObj);
      });
  } else {
    res.render("index");
  }
});

// /login route to go to login page
router.get("/login", function (req, res) {
  res.render("login", { user: req.session.user });
});

// /create route from welcome page to create user page
router.get("/create", (req, res) => {
  res.render("create", { user: req.session.user });
});

//route to destroy active session cookie
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// /home route for after login user goes to their home page
// users home page will always display the most recent data for that day
router.get("/home", async function (req, res) {
  if (req.session.user) {
    var today = getToday();
    var lastEntry = await getLastEntryDate(req.session.user.id);

    if (today != lastEntry) {
      var aztro = await makeApiRequest(
        req.session.user.id,
        req.session.user.sign
      );
    }


    var lastEntry = await getLastEntry(req.session.user.id);
    db.daily_history
      .findOne({
        where: { createdAt: lastEntry.createdAt },
        include: [db.user_data],
      })
      .then((data) => {
        data.dataValues.createdAt = convertDate(data.dataValues.createdAt);
        const hbsObj = {
          histories: data.dataValues,
          users: data.dataValues.user_datum.dataValues,
        };
        res.render("userHome", hbsObj);
      });
  } else {
    res.redirect("/");
  }
});

// /history route that the user can visit once logged in from the burger bar in the top right to view past entries order by most recent day
router.get("/history", function (req, res) {
  if (req.session.user) {
    db.daily_history
      .findAll({
        where: { userDatumId: req.session.user.id },
        include: [db.user_data],
        order: [["createdAt", "DESC"]],
      })
      .then((data) => {
        // data[0].createdAt = convertDate(data[0].createdAt);

        const jsonData = data.map((obj) => {
          const jsonObj = obj.toJSON();
          return jsonObj;
        });
        const hbsObj = {
          histories: jsonData,
        };

        res.render("history", hbsObj);
      });
  } else {
    res.redirect("/");
  }
});

router.get("/:term", (req, res) => {
  if (req.session.user) {
    db.user_data
      .findAll({
        where: {
          [Op.or]: [
            { user_name: req.params.term },
            { first_name: req.params.term },
            { last_name: req.params.term },
            { sign: req.params.term },
            { email: req.params.term },
          ],
        },
      })
      .then((data) => {
        const jsonData = data.map((obj) => {
          const jsonObj = obj.toJSON();
          return jsonObj;
        });
        const hbsObj = {
          data: jsonData,
        };
        res.render("testsearch", hbsObj);
      });
  } else {
    res.redirect("/");
  }
});

// get todays date formatted as mm/dd/yyyy
function getToday() {
  let x = new Date();
  let dd = String(x.getDate()).padStart(2, "0");
  let mm = String(x.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = x.getFullYear();
  x = mm + "/" + dd + "/" + yyyy;
  return x;
}

// this will reutrn the most recent row entry for the user with id passed in
function getLastEntryDate(data) {
  // returning a new promise
  // finding the most recent ROW in daily_history WHERE the data userDatumId
  //if the data is undefined then an entry doesn't existence
  // reformat the createdAt date structure to match todays date format
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
        if (data[0] === undefined) {
          resolve("user has no entries");
        } else {
          let x = data[0].createdAt;
          let dd = String(x.getDate()).padStart(2, "0");
          let mm = String(x.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = x.getFullYear();
          x = mm + "/" + dd + "/" + yyyy;
          resolve(x);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//returns the most recent entry for the logged in user
function getLastEntry(data) {
  return new Promise((resolve, reject) => {
    db.daily_history
      .findAll(
        { where: { userDatumId: data } },
        { limit: 1, order: [["createdAt", "DESC"]] }
      )
      .then((data) => {
        resolve(data[0]);
      });
  });
}

// get todays date formatted as mm/dd/yyyy
function convertDate(x) {
  let dd = String(x.getDate()).padStart(2, "0");
  let mm = String(x.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = x.getFullYear();
  x = mm + "/" + dd + "/" + yyyy;
  return x;
}

// make the API call and save the returned data in the database for each user.
// set the options required for the API call
//make the API call & save the data for the session user
function makeApiRequest(id, userSign) {
  var options = {
    method: "POST",
    url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
    qs: { sign: userSign, day: "today" },
    headers: {
      "x-rapidapi-key": process.env.APIKEY,
      "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
      useQueryString: true,
    },
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let aztro = JSON.parse(body);
      db.daily_history
        //creating a whole new row with column fields to hoold the api id also set the userDatumId of the user
        .create({
          color: aztro.color,
          compatibility: aztro.compatibility,
          current_date: aztro.current_date,
          date_range: aztro.date_range,
          description: aztro.description,
          lucky_number: aztro.lucky_number,
          lucky_time: aztro.lucky_time,
          mood: aztro.mood,
          userDatumId: id,
          memory_image:
            "https://www.astrologybythebay.com/articles_photos/article-placeholder.jpg",
          DateTime: new Date(),
        })
        .then((data) => {
          resolve(aztro);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
module.exports = router;
