// Requiring our models
const db = require("../models");

// Require 'request npm package'
const request = require('request');

// Settings snippet for the aztro api call 
const options = {
    method: 'POST',
    url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
    qs: { sign: 'aquarius', day: 'today' },
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
            let aztro = JSON.parse(body)
            let date = new Date(aztro.current_date)
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDay()
            console.log(date)
            console.log(year)
            console.log(month)
            console.log(day)

            db.daily_history.findOne()
            db.daily_history.create(aztro).then((data) => {

                res.json(aztro)
            })

        });
    });
};