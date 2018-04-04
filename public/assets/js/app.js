$(document).on("click", "#home", function() {


  console.log('hello HOME');
  
});

$(document).on("click", "#scrape", function() {


  console.log('hello SCRAPE');

  $.get("/api/scrape").then(function(res){
    console.log(res);
    window.location.reload()
  })


});

$(document).on("click", "#saved", function() {


  console.log('hello SAVED');
  
});








 