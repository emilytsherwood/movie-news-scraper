// Requiring necessary NPM Packages
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var request = require("request");
var cheerio = require("cheerio");

// Database connection - Setting up the default mongoose connection
mongoose.connect('mongodb://localhost/movienews_db');
var db = mongoose.connection;
// Bind connection to error event
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongoose is connected!")
});

// Setting up the schema
var movieSchema = mongoose.Schema ({
    title: String,
    link: String
});

// Compiling Schema into a Model
var News = mongoose.model('News', movieSchema);

var app = express();
var PORT = process.env.PORT || 3000;
// Using the static directory
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use('/', routes);

// Telling the app what engine we are going to use
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Using that engine
app.set("view engine", "handlebars");

// Listening on port
app.listen(3000, function() {
    console.log("App listening on Port 3000");
})
