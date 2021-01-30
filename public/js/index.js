console.log("hi");

const homeLoginBtn = $("#loginBtn");
const homeCreateBtn = $("#createBtn");

homeLoginBtn.on("click", function () {
  window.location.href = "/login";
});

homeCreateBtn.on("click", function () {
  window.location.href = "/create";
});
