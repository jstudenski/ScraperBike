// Requiring our models
var db = require("../models");



var request = require("request");
var cheerio = require("cheerio");


// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];


// Routes
module.exports = function(app) {


// A GET route for scraping the echojs website
// app.get("/", function(req, res) {
//   // First, we grab the body of the html with request
//   axios.get("http://www.echojs.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           return res.json(err);
//         });
//     });

//     // If we were able to successfully scrape and save an Article, send a message to the client
//     res.send("Scrape Complete");
//   });
// });

  app.get("/", function(req, res) {
    // Make a request for the news section of ycombinator
    request("https://news.ycombinator.com/", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $(".title").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        // var title = $(element).children("a").text();
        // var link = $(element).children("a").attr("href");

        var result = {};

        result.title = $(element).children("a").text();
        result.link = $(element).children("a").attr("href");

        // // If this found element had both a title and a link
        // if (title && link) {
        //   // Insert the data in the scrapedData db
        //   db.scrapedData.insert({
        //     title: title,
        //     link: link
        //   },
        //   function(err, inserted) {
        //     if (err) {
        //       // Log the error if one is encountered during the query
        //       console.log(err);
        //     }
        //     else {
        //       // Otherwise, log the inserted data
        //       console.log(inserted);
        //     }
        //   });
        // }

        db.Headline.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });




      });
    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });



};

