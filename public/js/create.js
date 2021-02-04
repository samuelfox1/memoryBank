const saveAccountBtn = $("#saveAccountBtn");

$(".dropdown-trigger").dropdown();

function createAccount() {
  let sign = $(".zodiacBtn").text().split(" ");

  $.post("/create", {
    first_name: $("#first_name").val().trim(),
    last_name: $("#last_name").val().trim(),
    email: $("#email").val().trim(),
    user_name: $("#username").val().trim(),
    password: $("#password").val().trim(),
    sign: sign[0].trim(),
  }).then(function (data) {
    window.location.href = "/login";
  });
}

saveAccountBtn.on("click", function (event) {
  event.preventDefault();
  const userPw = $("#password").val().trim();
  const confirmPw = $("#confirmPassword").val().trim();
  if (userPw === confirmPw) {
    createAccount();
  } else {
    $(".match-passwords").removeClass("hide");
  }
  if (userPw.length < 8 || userPw.length > 16) {
    $(".password-length").removeClass("hide");
  }
});

$(".zodiac").on("click", function (event) {
  const zodiacText = $(event.target).text();
  $(".zodiacBtn").text(zodiacText);
});
