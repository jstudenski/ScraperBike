const request = require("request");
const cheerio = require("cheerio");


const scrape = function(){

    // other pages
    // http://www.xxlmag.com/page/2/

   return request("http://www.xxlmag.com/", function(error, response, html) {
      
      var $ = cheerio.load(html);
      var articles = [];

      $('.main-content .blogroll-inner').children("article").each(function(i, element) {

        var result = {};

        result.title = $(element).children('.content').children('a').text();
        result.excerpt = $(element).children('.content').children('div.excerpt').text();
        result.articleDate = $(element).children('.content').children('time').attr('datetime');
        result.link = $(element).children('figure').children('a').attr("href");     
        result.imageURL = $(element).children('figure').children('a').attr("data-image");

        articles.push(result);


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

      return articles;

    });


};

module.exports = scrape;


// //hit nyt scrape data
// var scrape = function(){
//     return request("http://www.nytimes.com", function (error, response, body) {
    
//     var articles = [];

//     const $ = cheerio.load(body)
//     $(".theme-summary").each(function (i, article){
//       console.log($(this).children(".story-heading").children("a").attr("href"))
//       var summary = $(this).children(".summary").text().trim();
//       var headline = $(this).children(".story-heading").children("a").text().trim();
//       var url = $(this).children(".story-heading").children("a").attr("href");

//       var data = {
//         summary: summary,
//         headline: headline,
//         url: url
//       };
      
//       articles.push(data);
//     });
//     return articles;
//   });
// };


// module.exports = scrape;
// // load it into cheerio
// // take all data push it into and array
// //return that array from this file so we can store it into our db