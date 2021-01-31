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
      // window.location.href = "/home";
      // $.get(`/api/aztro/${data.id}/${data.sign}`);
    })
    .then((data) => {
      console.log(data);
    })
    .fail((err) => {
      console.log("login failed");
      console.log(err);
      alert("login failed!");
    });
});
