// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    // GET route for getting all of the Tests
    app.get("/api/test", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.Test.findAll({}).then(function (dbTest) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbTest);
        });
    });
};