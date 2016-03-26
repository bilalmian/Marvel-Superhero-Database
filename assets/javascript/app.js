 $(document).ready(function(){
    function makeElem(type, data, elemToappendTo){
        var childElem = $(type).text(data);
        elemToappendTo.append(childElem);
    }

    function displayMovieInfo(){
        var movie = $('#heroSearch').val().trim();
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(movie);
            console.log(response);
            var movieDiv = $('<div class="movieDiv">');
            makeElem('<p>', "<b>Movie Info</b>", movieDiv)
            makeElem('<p>', response.Title, movieDiv)

            makeElem('<p>', "Rating: " + response.Rated, movieDiv)
            makeElem('<p>', "Released: " + response.Released, movieDiv)
            makeElem('<p>', "Plot: " + response.Plot, movieDiv)
            if (response.Poster != 'N/A'){
                var image = $('<img>').attr("src", response.Poster);
                movieDiv.append(image);
            }
            $('#moviesView').prepend(movieDiv);
        }); 
    }

    $('#heroSubmit').on('click', function(){
        displayMovieInfo();
    });
});