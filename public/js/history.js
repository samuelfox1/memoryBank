$(".dropdown-trigger").dropdown();

const expand = $(".viewMore");
const contract = $(".viewLess");
const deleteBtn = $("#delete-button");
const card = $(".card");
const cardRow = $(".card-row");

expand.on("click", function () {
  $(".card").removeClass("small");
  $(".card-title").addClass("top-right");
  expand.addClass("hide");
  contract.removeClass("hide");
});

contract.on("click", function () {
  $(".card").addClass("small");
  $(".card-title").removeClass("top-right");
  contract.addClass("hide");
  expand.removeClass("hide");
});

$(document).on("click", "#delete-button", function () {
  console.log($(this).data("id"));
  $.post("/api/deleteHistory", {
    id: $(this).data("id"),
  }).then((data) => {
    window.location.href = "/history";
  });
});
