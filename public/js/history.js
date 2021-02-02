$(".dropdown-trigger").dropdown();

const expand = $(".viewMore");
const contract = $(".viewLess");

expand.on("click", function () {
  console.log("expanded");
  $(".card").removeClass("small");
  expand.addClass("hide");
  contract.removeClass("hide");
});

contract.on("click", function () {
  console.log("contracted");
  $(".card").addClass("small");
  contract.addClass("hide");
  expand.removeClass("hide");
});
