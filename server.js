var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
const path = require("path");


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

// var PORT = process.env.PORT || 8080;
var PORT = 3000;

// Initialize Express
var app = express();
require("./routes/apiRoutes")(app);

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(path.join(__dirname, '/public')));


// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongoScraper", { useNewUrlParser: true });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper"
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});