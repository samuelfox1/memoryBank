console.log("hi");

const homeLoginBtn = $("#loginBtn");
const homeCreateBtn = $("#createBtn");

homeLoginBtn.on("click", function () {
  console.log("take me to login");
});

homeCreateBtn.on("click", function () {
  console.log("take me to create an account");
});
