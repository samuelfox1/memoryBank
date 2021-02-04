$(".dropdown-trigger").dropdown();

const expand = $(".viewMore");
const contract = $(".viewLess");
const deleteBtn = $("#delete-button");
const card = $(".card");
const cardRow = $(".card-row");

$(document).on("click", "#delete-button", function () {
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
});

$(document).on("click", ".viewLess", function () {
  let id = $(this).data("id");
  $("#card-" + id).addClass("small");
  contract.addClass("hide");
  expand.removeClass("hide");
});
