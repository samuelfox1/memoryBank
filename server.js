// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

// Static directory
app.use(express.static("public"));

// =============================================================

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// =============================================================

// Routes
// =============================================================
const userRoutes = require("./controllers/userController");
app.use(userRoutes);
const frontEndRoutes = require("./controllers/frontEndController");
app.use(frontEndRoutes);

// Syncing our sequelize models and then starting our Express app
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
