const loginAccountBtn = $("#loginToAccountBtn");

loginAccountBtn.on("click", (event) => {
  event.preventDefault();
  $.post("/login", {
    user_name: $("#username").val(),
    password: $("#password").val(),
  })
    .then((data) => {
      console.log("logged in!");
      console.log(data, "++++++++++++++++++++++++++++++");
      $.get(`/api/aztro/${data.id}/${data.sign}`);

      //api first before below

      // $.get(`/api/aztro/${data.id}/${data.sign}`);
    })
    .then((data) => {
      console.log(data);
      // $.get("/home")
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
