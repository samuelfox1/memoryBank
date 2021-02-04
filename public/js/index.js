const homeLoginBtn = $("#loginBtn");
const homeCreateBtn = $("#createBtn");


homeLoginBtn.on("click", function () {
  window.location.href = "/login";
});

homeCreateBtn.on("click", function () {
  window.location.href = "/create";
});


$(document).on("click", "#logout", function () {
  $.get("/logout")
    .then(data => {
      window.location.href = "/";
    })
    .fail(err => {
      console.log(err)
    })
});
