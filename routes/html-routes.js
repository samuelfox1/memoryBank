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
  });

  app.get("/home", function (req, res) {
    res.render("userHome");
  });

  app.get("/review", function (req, res) {
    res.render("userHome2");
  });
};
