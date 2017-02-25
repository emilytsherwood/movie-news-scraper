//Where all the button functionality will go

$.getJSON("/articles", function(data) {
    // For each one...with a for loop
    for (var i = 0; i < data.length; i++) {
        $(".articles").append("<p data-id='" + data[i]._id + "'>" + data[i].link + "</p>");
    }
});

