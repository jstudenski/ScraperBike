// Requiring our models
const db = require("../models");

// var scrape = require('../scripts/scrape.js');

const request = require("request");
const cheerio = require("cheerio");

// Routes
module.exports = function(app) {

  app.get("/", function(req, res) {

    // other pages
    // http://www.xxlmag.com/page/2/

    request("http://www.xxlmag.com/", function(error, response, html) {
      
      const $ = cheerio.load(html);

      $('.main-content .blogroll-inner').children("article").each(function(i, element) {

        let result = {};

        result.title = $(element).children('.content').children('a').text();
        result.excerpt = $(element).children('.content').children('div.excerpt').text();
        result.articleDate = $(element).children('.content').children('time').attr('datetime');
        result.link = $(element).children('figure').children('a').attr("href");     
        result.imageURL = $(element).children('figure').children('a').attr("data-image");

        db.Headline.create(result)  // create
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // return res.json(err);
          console.log(err.message);
        });

      });

    });


    db.Headline.find({})
    .then(function(dbArticle) {
      console.log(dbArticle)
      const object = { Article: dbArticle };
      res.render("home", object);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });


    // Send a "Scrape Complete" message to the browser
    // res.send("Scrape Complete");

    // render homepage with current articles
    //  res.render("home");


  });


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Headline.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});






}; // exports

