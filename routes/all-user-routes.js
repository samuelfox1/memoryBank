const db = require("../models");

module.exports = function (app) {
  app.get("/api/all_user", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.all_user.findAll({}).then(function (data) {
      // We have access to the todos as an argument inside of the callback function
      res.json(data);
    });
  });

  app.post("/api/all_user", function (req, res) {
    console.log(req.body, "+++++++++++++++++++++++++++++++++++++++++");
    db.all_user.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.delete("/api/all_user/:id", function (req, res) {
    db.all_user
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(function (data) {
        res.json(data);
      });
  });
  app.put("/api/all_user/:id", function (req, res) {
    db.all_user
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(function (data) {
        res.json(data);
      });
  });
};
