//Where all the button functionality will go

$.getJSON("/articles", function(data) {
    // For each one...with a for loop
    for (var i = 0; i < data.length; i++) {
        $(".articles").append("<p data-id='" + data[i]._id + "'>" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    .done(function(data) {
        console.log(data);
            // Title of article
            $("#note").append("<h2>" + data.title + "</h2>");
            // An input to enter new title
            $("#note").append("<input id='titleinput' name='title' >");
            // Text area to add new note to body
            $("#note").append("<textarea id='bodyinput' name='body'></textarea>");
            // Button to submit new note, with ID of article saved to it
            $("#note").append("<button data=id'" + data._id + "' id='savenote'>Save Comment</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // PLace the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
    });

        $(document).on("click", "#savenote", function() {
            var thisId = $(this).attr("data-id");

            // Run a POST request to change the note...
            $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from the title input
                    title: $("#titleinput").val(),
                    body: $("bodyinput").val()
            }
         })
    .done(function(data) {
        console.log(data);
        $("#notes").empty();
    });

    // Removing the values entered
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
