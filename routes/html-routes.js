// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });
  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/history", function (req, res) {
    res.render("history");
  });

  app.get("/create", function (req, res) {
    res.render("create");
<<<<<<< HEAD
  });

  app.get("/home", function (req, res) {
    res.render("userHome");
  });

  app.get("/review", function (req, res) {
    res.render("userHome2");
=======
>>>>>>> dev
  });

  app.post("/api/", function (req, res) {
    db.Author.create(req.body).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });
};
