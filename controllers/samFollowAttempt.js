const express = require("express");
const router = express.Router();
const db = require("../models");

//route to check session user info
router.get("/session", (req, res) => {
    res.json(req.session);
});

// const followers = [];

router.post("/api/follow/:id", async function (req, res) {
    console.log(req.session);

    // search user_data to get list of user id's that i follow
    let pplIfollow = await getPeopleIFollow(req.session.user.id);
    console.log(pplIfollow, ".5 FROM DB =====================================");

    //if pplIfollow is null, i havent followed anyone yet
    if (!pplIfollow) {
        //turn pplIfollow into an array and add the id from rew.params.id
        pplIfollow = [];
        pplIfollow.push(req.params.id);
        console.log(
            pplIfollow,
            "1. started from params.id ====================================="
        );

        //if there is data returned from the 'follow' column, parse it into an array and push req.params.id to the array.
    } else {
        pplIfollow = JSON.parse(pplIfollow);
        console.log(
            pplIfollow,
            "1. JSON PARSE ====================================="
        );

        pplIfollow.push(req.params.id);
        console.log(
            pplIfollow,
            "2. added params ====================================="
        );
    }
    //stringify the array and save in the 'user_data' table's 'following' column for the active session user
    db.user_data
        .update(
            {
                following: JSON.stringify(pplIfollow),
            },
            {
                where: {
                    Id: req.session.user.id,
                },
            }
        )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post("/api/unfollow/:id", async function (req, res) {
    console.log(req.session);

    // search user_data to get list of user id's that i follow
    let pplIfollow = await getPeopleIFollow(req.session.user.id);
    console.log(pplIfollow, ".5 FROM DB =====================================");
    //parse the data from the database
    pplIfollow = JSON.parse(pplIfollow);
    console.log(
        pplIfollow,
        "1. JSON PARSE ====================================="
    );

    //search the array to find the index of the 'id' to unfollow.
    let unfollowIndex;
    for (let i = 0; i < pplIfollow.length; i++) {
        if (pplIfollow[i] === req.params.id) {
            unfollowIndex = i;
        }
    }

    //remove the 'id' from the array by targeting the index position
    pplIfollow.splice(unfollowIndex, 1);
    console.log(
        pplIfollow,
        "2. updated params ====================================="
    );

    //stringify the array and save in the 'user_data' table's 'following' column for the active session user
    db.user_data
        .update(
            {
                following: JSON.stringify(pplIfollow),
            },
            {
                where: {
                    Id: req.session.user.id,
                },
            }
        )
        .then((data) => {
            res.json(data);
        });
});

//get the id's of all the people the active session user follows.

function getPeopleIFollow(x) {
    return new Promise((resolve, reject) => {
        db.user_data
            .findOne({
                where: {
                    Id: x,
                },
            })
            .then((data) => {
                resolve(data.following);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    });
}

module.exports = router;