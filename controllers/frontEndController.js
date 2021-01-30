const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/history", function (req, res) {
  res.render("history");
});

router.get("/create", (req, res) => {
  res.render("create", {
    user: req.session.user,
  });
});

router.get("/home", function (req, res) {
  res.render("userHome");
});

router.get("/review", function (req, res) {
  res.render("userHome2");
});

module.exports = router;
