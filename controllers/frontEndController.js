//dependencies
const express = require("express");
const router = express.Router();
const db = require("../models");

// home route
router.get("/", function (req, res) {
  res.render("index");
});

// login route
router.get("/login", function (req, res) {
  res.render("login");
});

// history route
router.get("/history", function (req, res) {
  res.render("history");
});

// create route
router.get("/create", (req, res) => {
  res.render("create", {
    user: req.session.user,
  });
});

// user home page route
router.get("/home", function (req, res) {
  res.render("userHome");
});

module.exports = router;
