$(".dropdown-trigger").dropdown();

$("#textarea1").val("New Text");
// M.textareaAutoResize($("#textarea1"));

$("#memory").on("click", function () {
    alert("Button works");
});

// const searchUsers = document.getElementById("search")
// searchUsers.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         document.getElementById("searchIcon").click()
//     }
// })

// $("#closeButton").on("click", function () {
//     $("#search").value = ''
// })

// function searchFunction() {
//     alert("HEHEHE")
//     console.log("HEHEHE")
// }

// $(document).on("submit", "#search", function () {
//     console.log("HEHEHE")
//     window.location.href = "/home/test"
// })

// $(".input-field").on("submit", function () {
//     alert("HEHEHE")
//     console.log("HEHEHE")
// })

// $("#search").on("submit", function () {
//     alert("HEHEH")
//     console.log("HEHEHE")
// })

$("#submit").on("click", function (event) {
    event.preventDefault();
    $.post("/api/journal", {
        // memory_image: $("#memory_image").val(),
        journal_entry: $("#journal_entry").val(),
    })
        .then((data) => {
            console.log("saved entry");
        })
        .fail((err) => {
            console.log("error");
        });
});

//widget button click on userhome handlebars
$("#upload_widget").on("click"),
    function (event) {
        event.preventDefault();
        // sending a post request to backend containg the
        $.post("");
    };

// TODO: Figure out if you have to rewrite the api/entries thing above to be something else

// const textInput = $('#textarea1').val();
// console.log(textInput)
// window.location.href = "/history"
// alert("Updated successfully!")

// $.post("/home", {
//     // memory_image: $("#memory_image").val(),
//     // The above code may have to be changed to get cloudinary to work
//     journal_entry: $("#journal_entry").val(),
// }).then(data => {
//     console.log('Saved entry')
//     window.location.href = "/history"
// }).fail(err => {
//     console.log("Submission failed")
//     console.log(err);
//     alert("Submission failed!")
// })

$("#edit").on("click", function (event) {
    event.preventDefault();
    const textInput = $("#textarea1").val();
    console.log(textInput);
    window.location.href = "/history";
    alert("Update successfully!");
});

$("#delete").on("click", function () {
    alert("Button works");
});

$("#textarea1").val("");

// TODO: Make it so that the submit button sends the entry to the history page as a clickable button. Also, populate with the "created on" field with the date that the entry was written
// TODO: Make it so that when you pres the edit button, it updates the content of the entry on the history page and also populates the "edited on" field with the date the entry was edited

// var backgroundImage = ["image 1", 'image 2', 'image 3']
// var uniqueBackground = ""
// if (sign = "aquarius") {
//     uniqueBackground = backgroundImage[0]
//     $("body").style.backgroundImage = uniqueBackground

// } else if () {

//

$("#mode").change(function () {
    if ($(this).is(":checked")) {
        {
            $(".nav-wrapper").removeClass("navLight").addClass("navDark");
            $(".container").removeClass("containerLight").addClass("containerDark");

            console.log("dark");
        }
    } else {
        $(".nav-wrapper").removeClass("navDark").addClass("navLight");
        $(".container").removeClass("containerDark").addClass("containerLight");
        console.log("light");
    }
});
