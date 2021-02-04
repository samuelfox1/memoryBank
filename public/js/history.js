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



$(document).on("click", "#historyViewBtn", function () {
  let id = $(this).data("id");
  console.log($(this).text())

  if ($(this).text() === 'View More') {
    $("#card-" + id).removeClass("small")
    $(this).text('View Less')
  } else {
    $("#card-" + id).addClass("small");
    $(this).text('View More')
  }
});
