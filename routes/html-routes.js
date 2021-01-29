// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render("index")
  })
  app.get('/test', function (req, res) {
    res.render("test")
  })
};
