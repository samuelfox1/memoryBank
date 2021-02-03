var public = false

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

$("#public_status").change(function () {
    if ($(this).is(":checked")) {
        {
            public = true
        }
    } else {
        public = false
    }
    console.log(public)
});


$("#submit").on("click", function (event) {
    event.preventDefault();
    $.post("/api/journal", {
        // memory_image: $("#memory_image").val(),
        journal_entry: $("#journal_entry").val(),
        public_status: public
    })
        .then((data) => {
            console.log("saved entry");
            public = false
            window.location.href = "/home"
        })
        .fail((err) => {
            console.log("error");
            public = false
        });

});

$("#resubmit").on("click", function (event) {
    // if ($("#journal_entry").val() != "") {
    //     document.getElementById("deleteEntry").style.display = "none"
    // } else {
    //     console.log("nothing to resubmit")
    // }

    event.preventDefault();
    $.post("/api/journal", {
        // memory_image: $("#memory_image").val(),
        journal_entry: $("#journal_entry").val(),
        public_status: public
    })
        .then((data) => {
            console.log("saved entry");
            public = false
            window.location.href = "/home"
        })
        .fail((err) => {
            console.log("error");
            public = false
        });

});

// if ($("#journal_entry").val() != "") {
//     document.getElementById("deleteEntry").style.display = "block"
//     // $("#deleteEntry").hidden = false
// } else {
//     document.getElementById("deleteEntry").style.display = "none"
//     document.getElementById("deleteEntry").hidden = true
// }

$("#deleteEntry").on("click", function (event) {
    event.preventDefault
    // document.getElementById("deleteEntry").style.display = "none"

    if ($("#journal_entry").val() != "") {
        console.log("Something was written here")
        document.getElementById("journal_entry").value = ''
        // document.getElementById("deleteEntry").style.display = "none"


    } else {
        console.log("nothing written here")


    }
    // might want there to be an "are you sure" confirmation before they can delete
})

$("#deletePhoto").on("click", function (event) {
    event.preventDefault
    // document.getElementById("deletePhoto").style.display = "none"
    if (document.getElementById("cloudinaryUpload").src != "") {
        console.log("A photo was here")
        document.getElementById("cloudinaryUpload").src = ''


    } else {
        console.log("No photo here")

    }
    $.post("/api/image", {
        memory_image: "https://www.astrologybythebay.com/articles_photos/article-placeholder.jpg"
    })


        .then((data) => {
            console.log(data, "deleted image")
            location.reload()
        })
        .fail((err) => {
            console.log(err)
        })

    // might want there to be an "are you sure" confirmation before they can delete
})

// function clearEntry() {
//     console.log($("#journal_entry").val())
//     $("#journal_entry").val() === ''
//     document.getElementById("journal_entry").value = ''
// }


// TODO: If statement where if there is text in the daily entry field, hide the submit button and show the other three

// console.log($("#journal_entry").val())




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
            // $("#title").removeClass("titleLight").addClass("titleDark")
            $("#title").css('color', 'white')
            $(".drowdown-trigger").css('color', 'white')
            $(".material-icons").css('color', 'white')
            $("#journal_entry").css('color', 'white')


            console.log("dark");
        }
    } else {
        $(".nav-wrapper").removeClass("navDark").addClass("navLight");
        $(".container").removeClass("containerDark").addClass("containerLight");
        // $("#title").removeClass("titleDark").addClass("titleLight")
        $("#title").css('color', 'black')
        $(".drowdown-trigger").css('color', 'black')
        $(".material-icons").css('color', 'black')
        $("#journal_entry").css('color', 'black')

        console.log("light");
    }
});

$("#public_status").change(function () {
    if ($(this).is(":checked")) {
        {
            public = true
        }
    } else {
        public = false
    }
    console.log(public)
});







