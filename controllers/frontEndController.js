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

router.get("/create", function (req, res) {
  res.render("create");
});

module.exports = router;
