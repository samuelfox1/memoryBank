const saveAccountBtn = $("#saveAccountBtn");

$(".dropdown-trigger").dropdown();
console.log("hello");

saveAccountBtn.on("click", function (event) {
  event.preventDefault();
  const userPw = $("#password").val();
  const confirmPw = $("#confirmPassword").val();
  if (userPw === confirmPw) {
    console.log("Passwords match!");
  } else {
    alert("Passwords dont match");
  }
  if (userPw.length < 8 || userPw.length > 16) {
    alert("Password must be between 8-16 characters");
  } else {
    console.log("Valid password!");
  }
});

// function createAccount(accountData) {
//   $.post("/api/createaccount", accountData);
// }
