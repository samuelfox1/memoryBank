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

const horoscope = []

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/aztro/:id", async function (req, res) {

        // when the get request is made...
        // get todays date,
        var today = await getToday()
        //get the date of last entry in database
        var lastEntry = await getLastEntryDate()
        //if today does not equal last entry... 
        if (today != lastEntry) {
            //make the api request
            var aztro = await makeApiRequest()
            //clear contents of array
            horoscope.length = 0
            // push api results into array
            horoscope.push(aztro)
            //send the results back to client
            res.json(horoscope)
        } else {
            //send the stored results back to the client
            console.log('todays data already exists')
            res.send(horoscope)
        }
    });
};

function getToday() {
    return new Promise((resolve, reject) => {
        let x = new Date();
        let dd = String(x.getDate()).padStart(2, '0');
        let mm = String(x.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = x.getFullYear();

        x = mm + '/' + dd + '/' + yyyy;
        resolve(x);
    });
}
function getLastEntryDate() {
    return new Promise((resolve, reject) => {
        db.daily_history.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]

        }).then((data) => {
            if (data[0] === undefined) {
                resolve(0)
            } else {
                let x = data[0].createdAt
                let dd = String(x.getDate()).padStart(2, '0');
                let mm = String(x.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = x.getFullYear();

                x = mm + '/' + dd + '/' + yyyy;
                resolve(x);
            }
        })
    });
}

function makeApiRequest() {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let aztro = JSON.parse(body)

            db.daily_history.create(aztro).then((data) => {
                console.log('line 85')
                resolve(aztro)
            })
        })
    })
}
