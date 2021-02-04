$(".dropdown-trigger").dropdown();

const expand = $(".viewMore");
const contract = $(".viewLess");
const deleteBtn = $("#delete-button");
const card = $(".card");
const cardRow = $(".card-row");

// expand.on("click", function () {
//   $(this).removeClass("small");
//   expand.addClass("hide");
//   contract.removeClass("hide");
// });

// contract.on("click", function () {
//   $(this).addClass("small");
//   contract.addClass("hide");
//   expand.removeClass("hide");
// });

$(document).on("click", "#delete-button", function () {
  console.log($(this).data("id"));
  $.post("/api/deleteHistory", {
    id: $(this).data("id"),
  }).then((data) => {
    window.location.href = "/history";
  });
});

$(document).on("click", ".viewMore", function () {
  let id = $(this).data("id");
  $("#card-" + id).removeClass("small");
  contract.removeClass("hide");
  expand.addClass("hide");
  console.log($(this).data("id"));
});

$(document).on("click", ".viewLess", function () {
  let id = $(this).data("id");
  $("#card-" + id).addClass("small");
  contract.addClass("hide");
  expand.removeClass("hide");
});
