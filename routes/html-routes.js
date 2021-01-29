// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });
  app.get("/test", function (req, res) {
    res.render("test");
  });

  app.post("/api/", function (req, res) {
    db.Author.create(req.body).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });
};
