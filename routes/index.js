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
        result.title = $(element).children("a").text();
        result.link = $(element).children("a").attr("href");

        result.title = $(element).text();
        result.link = $(element).attr("href");

        // make sure title and like are both present
// if (result.title && result.link) {

          db.Headline.create(result)
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

// } //if 
      });


    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });



// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request for the news section of ycombinator
//   request("https://news.ycombinator.com/", function(error, response, html) {
//     // Load the html body from request into cheerio
//     var $ = cheerio.load(html);
//     // For each element with a "title" class
//     $(".title").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.Headline.create({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });








};

