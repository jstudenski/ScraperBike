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
  // Save the id from the p tag
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
      // The title of the article
     // $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $('#savenote').hide();
      // If there's a note in the article
      if (data.note) {

        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
}); // click artic




$(document).on("keypress", "#titleinput, #bodyinput", function() {
 console.log($(this).closest('div').find('button').show());
 // $('#savenote').show();
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
  console.log($(this).hide())

}); // click savenote