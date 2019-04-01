// array of topics that will be the buttons that start on the page 
var topics = ["rat", "bat", "turtle", "deer", "cat", "dog", "panda bear", "moose", "possum", "elephant"];


// function that takes each item in the array and makes a button for it
var createButton = function () {

    // Delete the topics before adding new topics 
    $("#buttons").empty()

    // loop through the array and make buttons for them
    for (var i = 0; i < topics.length; i++) {

        // create the button div
        var butt = $("<button>");
        // add a class of topics-button to the buttons
        butt.addClass("topics-button");
        // add a data attibute to the buttons
        butt.attr("data-name", topics[i]);
        // create the text for the buttons
        butt.text(topics[i]);
        // put the buttons into the html in the buttons div
        $("#buttons").append(butt);

    }
}

// on click of the submit button, take the html form input and push it to the 'topics' array
$(document.body).on("click", "#add-topics", function () {
    event.preventDefault();
    // Grab the input from the textbox 
    var newTopics = $("#topics-input").val().trim();
    // adding the topics input from the textbox to our "topics" array
    topics.push(newTopics);
    // call the createButton function to process the new item that has been put into the topics array
    createButton();
    // clear text box
    $("#topics-input").val("");
    // console.log the new topics
    console.log(newTopics)

});

// on click of an topics button: 
$(document.body).on("click", "button", function () {
    var topicsClicked = $(this).attr("data-name");
    // create the query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicsClicked + "&api_key=XR8dX9UItEA5wGkOqcsNDTbWhVuqIn2H&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        // empty the div with the previous gifs before the new gifs are loaded 
        $("#gifContainer").empty();

        // for loop to go through each item in response.data
        for (i = 0; i < results.length; i++) {
            //DISPLAY THE RATING AND GIF
            // create a div for the gif and its information
            var gifDiv = $("<div>")
            // create an img div for the gif to go to
            var animalGif = $("<img>");

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.downsized_still.url;

            animalGif.attr("src", still);
            animalGif.attr("data-still", still);
            animalGif.attr("data-animated", animated);
            animalGif.attr("data-state", 'still');
            animalGif.addClass("imageGif");
            animalGif.attr("height", '275');
            animalGif.attr("width", '375');


            // get the rating for each gif and set it to var rating
            var rating = results[i].rating;
            // put the rating in a p tag
            var pRating = $("<p>").text(`Rated: ${rating}`);
            // put the image div, the p div into the "gifDiv" div
            gifDiv.prepend(pRating);
            gifDiv.prepend(animalGif);
            // put the gifDiv div into the "#gifContainer" div in your html
            $("#gifContainer").prepend(gifDiv);

        }
    })

})

$(document.body).on("click", ".imageGif", function () {
    var state = $(this).attr("data-state")
    var animatedGifURL = $(this).attr("data-animated")
    var stillGifURL = $(this).attr("data-still")
    var gifSrc = $(this).attr("src")

    if (state === 'still') {
        state = $(this).attr("src", animatedGifURL);
        $(this).attr("data-state", 'animated')
    } else if (state === 'animated') {
        state = $(this).attr("src", stillGifURL);
        $(this).attr("data-state", 'still')
    }
})


createButton();
