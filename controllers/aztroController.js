const express = require("express");
const router = express.Router();
const db = require("../models");
// Require 'request npm package'
const request = require("request");
require("dotenv").config();
// Settings snippet for the aztro api call
var userSign = "";

const horoscope = [];

// Routes
// =============================================================

router.get("/api/aztro/:id/:sign", async function (req, res) {
  console.log(req.params.sign, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  userSign = req.params.sign;
  // when the get request is made...
  // get todays date,
  var today = await getToday();
  //get the date of last entry in database
  var lastEntry = await getLastEntryDate(req.params.id);
  //if today does not equal last entry...
  if (today != lastEntry) {
    //make the api request5
    var aztro = await makeApiRequest(req.params.id);
    //clear contents of array
    horoscope.length = 0;
    // push api results into array
    horoscope.push(aztro);
    //send the results back to client
    res.json(horoscope);
  } else {
    //send the stored results back to the client
    console.log("todays data already exists");
    res.send(horoscope);
  }
});

function getToday() {
  return new Promise((resolve, reject) => {
    let x = new Date();
    let dd = String(x.getDate()).padStart(2, "0");
    let mm = String(x.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = x.getFullYear();

    x = mm + "/" + dd + "/" + yyyy;
    resolve(x);
  });
}

function getLastEntryDate(data) {
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
          resolve(0);
        } else {
          let x = data[0].createdAt;
          let dd = String(x.getDate()).padStart(2, "0");
          let mm = String(x.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = x.getFullYear();

          x = mm + "/" + dd + "/" + yyyy;
          resolve(x);
        }
      });
  });
}

function makeApiRequest(data) {
  console.log(data, "++++++++++++++++++++++++++++++++");
  console.log(userSign, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
        .create({
          color: aztro.color,
          compatibility: aztro.compatibility,
          current_date: aztro.current_date,
          date_range: aztro.date_range,
          description: aztro.description,
          lucky_number: aztro.lucky_number,
          lucky_time: aztro.lucky_time,
          mood: aztro.mood,
          userDatumId: data,
        })
        .then((data) => {
          console.log("line 85");
          resolve(aztro);
        });
    });
  });
}
module.exports = router;
