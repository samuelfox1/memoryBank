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

  app.post("/api/user_data", function (req, res) {
    console.log(req.body, "+++++++++++++++++++++++++++++++++++++++++");
    db.user_data.create(req.body).then(function (data) {
      res.json(data);
    });
  });
};
