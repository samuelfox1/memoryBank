$(document).on("click", "#follow", function () {
  $.post(`/api/follow/${$(this).data("id")}`)
    .then((data) => {
      // console.log(data);
      // console.log("followed");
    })
    .fail((err) => {
      // console.log(err);
    });
});



$(document).on("click", "#unfollow", function () {
  $.post(`/api/unfollow/${$(this).data("id")}`)
    .then((data) => {
      // console.log(data);
      // console.log("unfollowed");
    })
    .fail((err) => {
      // console.log(err);
    });
});



$(document).on("click", "#getfollowers", function () {
  $.get(`/api/followers/`)
    .then((data) => {
      // console.log(data);
      // console.log("unfollowed");
    })
    .fail((err) => {
      // console.log(err);
    });
});
