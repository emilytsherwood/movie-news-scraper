// Requiring necessary NPM Packages
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");
var methodOverride = require("method-override");
// Requiring the scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Requiring the Comment and Article models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

var Promise = require("bluebird");

mongoose.promise = Promise;

// Setting up Express
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

var PORT = process.env.PORT || 3000;

// Using the static directory
app.use(express.static("public"));

// Telling the app what engine we are going to use
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Using that engine
app.set("view engine", "handlebars");

// Listening on port
app.listen(3000, function() {
    console.log("App listening on Port 3000");
})

// Database connection - Setting up the default mongoose connection
mongoose.connect('mongodb://localhost/movienews_db');
var db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongoose is connected!")
});

// Routes

// GET request to scrape the Screen Rant Website
app.get("/scrape", function(req, res) {
    // Grabbing the body of the html with this request
    request("http://screenrant.com/movie-news/", function(error, response, html) {
        // Loading that body into cheerio, $ is a shorthand selector
        var $ = cheerio.load(html);
        // Grabbing all the headlines from the website
        $("article h2").each(function(i, element) {
            // Empty result object saved
            var result = {};
            // Adding the text and href of every link, save them as properties of the result
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            // Using the Article model, creating a new entry
            // The result object will get passed to the entry (title and link since they are properties of result obj. as shown above)
            var entry = new Article(result);

            // Saving that new entry to the database
            entry.save(function(err, doc) {
                // errors
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(doc);
                }
            });
        });
    });

    // Tell browser that the scraping is complete
    res.send("Scrape Complete!");
});

// Grabbing the latest articles that were scraped from mongodb
app.get("/articles", function(req, res) {
    // Grabbing every doc in the Articles array
    Article.find{}
})





