// top links

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

// Clicking an item

$(document).on("click", "article", function() {

  // add class for css styling
  $(this).addClass('active').siblings().removeClass('active')

  $("#notes").empty();

  var thisId = $(this).attr("data-id");
  console.log(thisId);

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      $("#notes").show();

      $("#notes").append("<input id='titleinput' name='title' >");

      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $('#savenote').hide();
      // If there's a note in the article
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
      
    });
}); // click artic


$(document).on("keypress", "#titleinput, #bodyinput", function() {
  $(this).closest('div').find('button').show();
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
  // hide save button  
  $(this).hide();

}); // click savenote