const express = require("express");
const router = express.Router();
const db = require("../models");
// Require 'request npm package'
const request = require("request");
require("dotenv").config();


// Settings snippet for the aztro api call
var userSign = "";



// Big picture of what this call is trying to do is create ONE DAY INSTANCE of data retreval from the api for each individual user based on there unique id and passing thier sign as the query term for the API.

//Recieving a get request on front end containg a route string (/api/aztro/3/Leo)
// when the get request is made...
// get todays date,
//get the date of last entry in database
//if today does not equal last entry...
//make the api request5
//send the results back to client
//send the stored results back to the frontend
router.get("/api/aztro/:id/:sign", async function (req, res) {

  userSign = req.params.sign;
  var today = getToday();
  var lastEntry = await getLastEntryDate(req.params.id);

  if (today != lastEntry) {
    var aztro = await makeApiRequest(req.params.id);
    res.json(aztro);

  } else {
    console.log("todays data is up to date");
    res.json(req.session.user);
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
        }
        else {
          let x = data[0].createdAt;
          let dd = String(x.getDate()).padStart(2, "0");
          let mm = String(x.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = x.getFullYear();
          x = mm + "/" + dd + "/" + yyyy;
          resolve(x);
        }
      }).catch(err => {
        reject(err)
      })
  });
}


// make the API call and save the returned data in the database for each user.
// set the options required for the API call
//make the API call & save the data for the session user
function makeApiRequest(data) {
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
      console.log(aztro);
      db.daily_history
        //creating a whole new row with column fields to hoold the api data also set the userDatumId of the user
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
          memory_image:
            "https://www.astrologybythebay.com/articles_photos/article-placeholder.jpg",
          DateTime: new Date()
        })
        .then((data) => {
          console.log(data)
          resolve(aztro);
        }).catch(err => {
          reject(err)
        })
    });
  });
}



module.exports = router;
