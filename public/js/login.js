const loginAccountBtn = $("#loginToAccountBtn");

loginAccountBtn.on("click", (event) => {
  event.preventDefault();
  // post request is sent from front end string data from username and password fields to back end on /login route
  $.post("/login", {
    user_name: $("#username").val(),
    password: $("#password").val(),
  })
    // backend has completed the steps to verify username and password againt data base and is returning json data containg the ROW data from the user
    .then((data) => {
      console.log("logged in!");
      console.log(data, "++++++++++++++++++++++++++++++");
      // taking the data returned(all row data for the user) we will now make a API request to Aztro (on route/api/aztro/:id/:sign) with the information of the ID and SIGN of the user contained in the "this"data.id and "this"data.sign
      $.get(`/api/aztro/${data.id}/${data.sign}`);
      //ex of route being sent /api/aztro/3/Leo
    })
    // returned data from the backend api call to aztro containing the horoscope data and all previous user ROW data from database at daily_histories
    .then((data) => {
      console.log(data);
      window.location.href = "/home";
    })
    .then((data) => {
      console.log(data, "plplplplpllplplplplplplplp");
    })
    .fail((err) => {
      console.log("login failed");
      console.log(err);
      alert("login failed!");
    });
});
