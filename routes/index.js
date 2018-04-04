// Requiring our models
var db = require("../models");

// var scrape = require('../scripts/scrape.js');


var request = require("request");
var cheerio = require("cheerio");

// Routes
module.exports = function(app) {


//  app.get("/api/scrape", scrapeCtrl.getNYT)

  app.get("/", function(req, res) {

    // console.log(scrape());

    //   models.Post.findAll({
    //     //include: [models.Category]
    //   })
    // .then(function(data){
    //   var object = { Post: data };
    //   res.render("index", object);
    // })


    // other pages
    // http://www.xxlmag.com/page/2/

    request("http://www.xxlmag.com/", function(error, response, html) {
      
      var $ = cheerio.load(html);

      $('.main-content .blogroll-inner').children("article").each(function(i, element) {

        var result = {};

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
      var object = { Article: dbArticle };
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

};

