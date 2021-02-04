const saveAccountBtn = $("#saveAccountBtn");

$(".dropdown-trigger").dropdown();

const first = $("#first_name")
const last = $("#last_name")
const email = $("#email")
const username = $("#username")
const sign = $(".zodiacBtn")
const password = $("#password")



saveAccountBtn.on("click", function (event) {
  event.preventDefault();

  if (first.val() && last.val() && email.val() && username.val()) {

    const userPw = $("#password").val().trim();
    const confirmPw = $("#confirmPassword").val().trim();
    let approved = true

    if (userPw.length < 8 || userPw.length > 16) { $(".password-length").removeClass("hide"), approved = false }
    if (userPw !== confirmPw) { $(".match-passwords").removeClass("hide"), approved = false }
    if (sign.text() === 'Here') { $(".confirm-sign").removeClass("hide"), approved = false }
    if (approved) { createAccount() }
  }
});



$(".zodiac").on("click", function (event) {
  const zodiacText = $(event.target).text();
  $(".zodiacBtn").text(zodiacText);
});



function createAccount() {
  let choice = sign.text().split(" ");


  $.post("/create", {
    first_name: first.val().trim(),
    last_name: last.val().trim(),
    email: email.val().trim(),
    user_name: username.val().trim(),
    password: password.val().trim(),
    sign: choice[0].trim(),
  }).then(function (data) {
    window.location.href = "/login";
  });
}