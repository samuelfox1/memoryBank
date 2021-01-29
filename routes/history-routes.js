const db = require("../models");

module.exports = function (app) {
  app.get("/api/daily_history", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.daily_history.findAll({}).then(function (data) {
      // We have access to the todos as an argument inside of the callback function
      res.json(data);
    });
  });
  app.post("/api/daily_history", function (req, res) {
    console.log(req.body, "+++++++++++++++++++++++++++++++++++++++++");
    db.daily_history.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.delete("/api/daily_history/:id", function (req, res) {
    db.daily_history
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(function (data) {
        res.json(data);
      });
  });
  app.put("/api/:daily_history/:id", function (req, res) {
    db.daily_history
      .update(req.body, {
        where: {
          id: req.body.id,
        },
      })
      .then(function (data) {
        res.json(data);
      });
  });
};
