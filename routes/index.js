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
      
      var $ = cheerio.load(html);

//blogroll-inner

     // $(".title").each(function(i, element) {
      $('.blogroll-inner').children("article").each(function(i, element) {

       // article

        var result = {};

        result.title = $(element).text();
        result.link = $(element).children('figure').children('a').attr("href");     
        result.test = $(element).children('figure').children('a').attr("data-image");
  


        console.log("--------------------");
        console.log(result.title);
        console.log(result.link);
        console.log(result.test);
        console.log("--------------------");

        // db.Headline.create(result)  // create
        // .then(function(dbArticle) {
        //   // View the added result in the console
        //   console.log(dbArticle);
        // })
        // .catch(function(err) {
        //   // return res.json(err);
        //   console.log(err.message);
        // });

      });

    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });

};

