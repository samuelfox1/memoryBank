// var myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: "dl5nddb9b",
//     uploadPreset: "awfcnrld",
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info.secure_url);

//       Cloudinary sends a post request to the /image route to the backend containg a string of data containg the image url to cloudinary
//       $.post("/image", {
//         memory_image: result.info.secure_url,
//       })

//         .then((data) => {
//           console.log(data, "saved image");
//         })
//         .fail((err) => {
//           console.log(err);
//         });
//     }
//   }
// );

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
// $(document).on(
//   "click",
//   "#upload_widget",
//   function () {
//     myWidget.open();
//     console.log("!!!!!!!!!!!!!!!!!!!!");
//   },
//   false
// );

// $(document).on("click", ".bg-action", function (event) {
//   event.preventDefault();
//   console.log("this worked");
// });
