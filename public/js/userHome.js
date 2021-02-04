var public = false;

$(".dropdown-trigger").dropdown();

$("#textarea1").val("New Text");

$("#memory").on("click", function () {
  alert("Button works");
});

$("#public_status").change(function () {
  if ($(this).is(":checked")) {
    {
      public = true;
    }
  } else {
    public = false;
  }
});

$("#submit").on("click", function (event) {
  event.preventDefault();
  $.post("/api/journal", {
    journal_entry: $("#journal_entry").val(),
    public_status: public,
  })
    .then((data) => {
      public = false;
      window.location.href = "/home";
    })
    .fail((err) => {
      public = false;
    });
});

$("#resubmit").on("click", function (event) {
  event.preventDefault();
  $.post("/api/journal", {
    journal_entry: $("#journal_entry").val(),
    public_status: public,
  })
    .then((data) => {
      public = false;
      window.location.href = "/home";
    })
    .fail((err) => {
      public = false;
    });
});

$("#deleteEntry").on("click", function (event) {
  event.preventDefault;

  if ($("#journal_entry").val() != "") {
    document.getElementById("journal_entry").value = "";
  } else {
  }
  // might want there to be an "are you sure" confirmation before they can delete
});

$("#deletePhoto").on("click", function (event) {
  event.preventDefault;

  if (document.getElementById("cloudinaryUpload").src != "") {
    document.getElementById("cloudinaryUpload").src = "";
  } else {
  }
  $.post("/api/image", {
    memory_image:
      "https://www.astrologybythebay.com/articles_photos/article-placeholder.jpg",
  })

    .then((data) => {
      location.reload();
    })
    .fail((err) => {});

  // might want there to be an "are you sure" confirmation before they can delete
});

$("#searchIcon").on("click", function (event) {
  event.preventDefault();
  if ($("#search").val().trim()) {
    window.location.href = `/${$("#search").val().trim()}`;
  }
});

//widget button click on userhome handlebars
$("#upload_widget").on("click"),
  function (event) {
    event.preventDefault();
    // sending a post request to backend containg the
    $.post("");
  };

$("#edit").on("click", function (event) {
  event.preventDefault();
  const textInput = $("#textarea1").val();
  window.location.href = "/history";
  alert("Update successfully!");
});

$("#textarea1").val("");

$("#mode").change(function () {
  if ($(this).is(":checked")) {
    {
      $(".nav-wrapper").removeClass("navLight").addClass("navDark");
      $(".container").removeClass("containerLight").addClass("containerDark");
      $("#title").css("color", "white");
      $(".drowdown-trigger").css("color", "white");
      $(".material-icons").css("color", "white");
      $("#journal_entry").css("color", "white");
    }
  } else {
    $(".nav-wrapper").removeClass("navDark").addClass("navLight");
    $(".container").removeClass("containerDark").addClass("containerLight");
    $("#title").css("color", "black");
    $(".drowdown-trigger").css("color", "black");
    $(".material-icons").css("color", "black");
    $("#journal_entry").css("color", "black");
  }
});

$("#public_status").change(function () {
  if ($(this).is(":checked")) {
    {
      public = true;
    }
  } else {
    public = false;
  }
});
