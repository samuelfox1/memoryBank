// const cloudinary = require("cloudinary");
// const express = require("express");
// const router = express.Router();
// const db = require("../models");
// require("dotenv").config();

// router.get("addimage",  function(req, res){
//     db.daily_history.findOne({
//         where:{
//             id: req.params.id
//         }
//     }).then(data => {
//         console.log('plant data: ', data);
//         res.render("addimage", data);
//     })

// })

// router.post("/api/image",async function (req, res) ){
// console.log("sent post ++++++++++++++++++++++++++");

// try{
// const file = req.body.data

// cloudinary.config({
//     cloud_name: "dl5nddb9b",
//     api_key: process.env.CLOUDINARY_API,
//     api_secret: process.env.CLOUDINARY_SECRET
// });

// await cloudinary.uploader.upload(file);
// console.log(file, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

// return res.json();

// }
// catch(err){
//     console.log(err);
//     return res.status(500).json(err)
// }

// }

// async function addImage(id, url) {
//     console.log(`addPhoto(${id}, ${url}) fires`);
//     const data = await db.daily_history.put({
//         id: id,
//         memory_image: url
//     })

//     return data;
// }

// module.exports = router;
