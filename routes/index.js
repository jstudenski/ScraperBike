// Requiring our models
const db = require("../models");
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


    db.Headline.find({

    }).sort( { articleDate: -1 } )
    .then(function(dbArticle) {
      console.log(dbArticle)
      const object = { Article: dbArticle };
      res.render("home", object);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
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

