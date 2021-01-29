// Requiring our models
const db = require("../models");

const request = require('request');

const options = {
    method: 'POST',
    url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
    qs: { sign: 'aquarius', day: 'yesterday' },
    headers: {
        'x-rapidapi-key': '82cb3c1e32msh94a6b13ac37ceb8p1426fejsn8c0fc9e6f89a',
        'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
        useQueryString: true
    }
};

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/aztro", function (req, res) {

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);

            res.render("index");
        });

    });
};