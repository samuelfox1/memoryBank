const saveAccountBtn = $("#saveAccountBtn");

$(".dropdown-trigger").dropdown();
console.log("hello");

function createAccount() {
  // event.preventDefault();
  let sign = $(".zodiacBtn").text().split(" ");

  $.post("/create", {
    first_name: $("#first_name").val().trim(),
    last_name: $("#last_name").val().trim(),
    email: $("#email").val().trim(),
    user_name: $("#username").val().trim(),
    password: $("#password").val().trim(),
    sign: sign[0].trim(),
  }).then(function (data) {
    console.log("signed up!");
    window.location.href = "/login";
  });
}

saveAccountBtn.on("click", function (event) {
  event.preventDefault();
  const userPw = $("#password").val().trim();
  const confirmPw = $("#confirmPassword").val().trim();
  if (userPw === confirmPw) {
    console.log("Passwords match!");
  } else {
    alert("Passwords dont match");
  }
  if (userPw.length < 8 || userPw.length > 16) {
    alert("Password must be between 8-16 characters");
  } else {
    createAccount();

    console.log("Valid password!");
  }
});

$(".zodiac").on("click", function (event) {
  console.log(event);
  const zodiacText = $(event.target).text();
  $(".zodiacBtn").text(zodiacText);
});
