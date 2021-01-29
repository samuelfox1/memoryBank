const db = require("../models");

module.exports = function (app) {
  app.post("/api/all_users", function (req, res) {
    console.log(req.body, "+++++++++++++++++++++++++++++++++++++++++");
    db.all_user.create(req.body).then(function (data) {
      res.json(data);
    });
  });
};
