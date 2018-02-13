// //GifTastic app.js
$(document).ready(function () {
    console.log("Hello World!");

    //Title gif attempt section
    // var titleLetters= ["G", "I", "F", "T","A","S","T", "I", "C","!"]
    // Console.log(titleLetters);



    //end title git attemp secition


    var topics = ["Nicolas Cage", "Star Wars", "Cats", "Dogs", "Funny", "Paper", "Flight", "Bees", "Pulp Fiction", "Taco Bell", "Jump", "Ren and Stimpy"];
    topics.sort();
    console.log(topics);
    var topic = "";

    // initial array of topics to create buttons


    function displayTopicInfo() {

        var x = $(this).data("search")
        console.log("button clicked")

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=BkZPD4KvbeRYTjCV6maqdgEVopUCD7yY&limit=10";

        //display gifs topic info
        console.log(queryURL);
        $.ajax({ url: queryURL, methd: "GET" })
            .done(function (response) {
                $("#topicsView").empty();
                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {
                        var gifViewDiv = $("<div class ='gifHere'>");
                        $(gifViewDiv).html("");
                        var p = $("<p>").text("Rating: " + response.data[i].rating)
                        var topicImage = $("<img>");
                        topicImage.addClass("gif");
                        topicImage.attr("src", response.data[i].images.fixed_height_still.url);
                        topicImage.attr("data-state", "still")
                        topicImage.attr("data-still", response.data[i].images.fixed_height_still.url);
                        topicImage.attr("data-animate", response.data[i].images.fixed_height.url);
                        gifViewDiv.append(p);
                        gifViewDiv.append(topicImage);
                        $("#topicsView").append(gifViewDiv);

                    }

                }
                console.log(response);

                // $("body").append("<p>Rating" + p + "</p>")
                // $("#topicsView").append("<img src=" ++ ">");

            });

    }
    //display Buttons 

    function renderButtons() {
        $("#buttons-view").empty();

        for (i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("topic-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }

    }
    $("#add-topic").on("click", function (event) {

        event.preventDefault();
        var topic = $("#topics-input").val().trim();
        $("#topics-input").val("");
        topics.push(topic);
        renderButtons();

    });

    $(document).on("click", ".topic-btn", displayTopicInfo);

    renderButtons();


    //make the image unfreeze when click, and freeze when click

    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state")

        console.log(state);
        if (state === "still") {

            // change the src attribure and the data attribut 
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }


    });
});