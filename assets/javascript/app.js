var topics = ["Batman", "Ironman", "Spiderman", "Deadpool", "Wolverine", "Antman"];

function displayGifs() {
  $("#characters").empty();

  var character = $(this).attr("char-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=CB46iVTGG009grx74us972tJ7cUalnZ7&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
        	console.log(response);

        	var characters = response.data;

        	for(var i = 0; i < characters.length; i++){
        		var div = $("<div>");
        		div.attr("id", "gifDiv");

            // create image and add still url
        		var gif = $("<img>");
        		var still_image = characters[i].images.fixed_height_still.url;
        		gif.attr("still_url", still_image);
        		gif.attr("src", still_image);
        		gif.attr("id", "gif");
        		gif.attr("state", "still");
        		div.append(gif);

            // get animated gif and add to image
        		var moving_image = characters[i].images.fixed_height.url;
        		gif.attr("moving_url", moving_image);

            // add rating add to div
        		var rating = characters[i].rating;
        		var p = $("<p>");
        		p.text("Rating: " + rating);
        		div.append(p);

            // add everything to html
        		$("#characters").append(div);
        }
    });
};

// on click pauses and plays gifs
$(document).on("click", "#gif", function() {
	if ($(this).attr("state") == "still") {
		$(this).attr("src", $(this).attr("moving_url"));
		$(this).attr("state", "moving");
	}
	else{
		$(this).attr("src", $(this).attr("still_url"));
		$(this).attr("state", "still");
	}

});

//Display the gif buttons
function renderButtons() {

	$("#heroButtons").empty()

	for(var i = 0; i < topics.length; i++){
		var button = $("<button>");

		button.addClass("character");

		button.addClass("btn-success");

		button.attr("char-name", topics[i]);

		button.text(topics[i]);

		$("#heroButtons").append(button).append(" ");

	}
};

// Take user input and make a new button
$("#submitChar").on("click", function() {
	event.preventDefault();

	var character = $("#char-input").val().trim();

	topics.push(character);

	renderButtons();

	$("#char-input").val("");
});

//Allow dynamic buttons to be clicked
$(document).on("click", ".character", displayGifs);


renderButtons();
