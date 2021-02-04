("hi");

const homeLoginBtn = $("#loginBtn");
const homeCreateBtn = $("#createBtn");


homeLoginBtn.on("click", function () {
  window.location.href = "/login";
});

homeCreateBtn.on("click", function () {
  window.location.href = "/create";
});


$(document).on("click", "#logout", function () {
  console.log("logout clicked")
  $.get("/logout")
    .then(data => {
      console.log(data, "!!!!!!!!!!!!!!!!!!!")
      window.location.href = "/";
    })
    .fail(err => {
      console.log(err)
    })
});
