// Requiring our models
const db = require("../models");

// Routes

module.exports = function (app) {
  // GET route for getting all of the Tests

  app.get("/api/user_data", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.User_Data.findAll({}).then(function (data) {
      // We have access to the todos as an argument inside of the callback function
      res.json(data);
    });
  });

  app.get("/api/user_data/:id", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.user_data
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then(function (data) {
        // We have access to the todos as an argument inside of the callback function
        res.json(data);
      });
  });

  app.post("/api/:user_name/", function (req, res) {
    console.log(req.body, "+++++++++++++++++++++++++++++++++++++++++");
    let userId;
    db.all_user
      .findOne({
        where: {
          user_name: req.params.user_name,
        },
        userId,
      })
      .then((data) => {
        db.user_data
          .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            sign: req.body.sign,
            email: req.body.email,
            allUserId: data.id,
          })
          .then(function (data) {
            res.json(data);
          });
        console.log(data.id, "================================");
      });
  });
};
