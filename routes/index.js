// Requiring our models
var db = require("../models");

var request = require("request");
var cheerio = require("cheerio");

// Routes
module.exports = function(app) {

  app.get("/", function(req, res) {


    // other pages
    // http://www.xxlmag.com/page/2/


    request("http://www.xxlmag.com/", function(error, response, html) {
      
      var $ = cheerio.load(html);

      $('.main-content .blogroll-inner').children("article").each(function(i, element) {

       // article

        var result = {};

        result.title = $(element).children('.content').children('a').text();
        result.excerpt = $(element).children('.content').children('div.excerpt').text();
        result.dateAdded = $(element).children('.content').children('time').attr('datetime'); // .attr("data-image");

        result.link = $(element).children('figure').children('a').attr("href");     
        result.test = $(element).children('figure').children('a').attr("data-image");


      //  datetime


        console.log("--------------------");
        console.log(result.title);
        console.log(result.excerpt);
        console.log(result.link);
        console.log(result.test);
        console.log(result.dateAdded);
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

