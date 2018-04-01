// Requiring our models
var db = require("../models");

var request = require("request");
var cheerio = require("cheerio");

// Routes
module.exports = function(app) {

  app.get("/", function(req, res) {
    // Make a request for the news section of ycombinator
    //request("https://news.ycombinator.com/", function(error, response, html) {
    request("http://www.xxlmag.com/", function(error, response, html) {
      

      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $(".title").each(function(i, element) {

        var result = {};

        result.title = $(element).text();
        result.link = $(element).attr("href");

        db.Headline.create(result)  // create
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
         // return 
        // res.json(err);
            console.log(err.message);

         /// console.log(err.ValidationError);
        });

      });

    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });

};

