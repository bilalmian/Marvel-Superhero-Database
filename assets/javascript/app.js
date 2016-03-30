 $(document).ready(function(){

    
    var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var characterSearch;
    $("#searchButton").click(function(){
    characterSearch = $("#characterSearch").val();
    $("#movieTitle").html(characterSearch);
    $("#movieSynopsis").html("Forced out of his own company by former protégé Darren Cross, Dr. Hank Pym (Michael Douglas) recruits the talents of Scott Lang (Paul Rudd), a master thief just released from prison. Lang becomes Ant-Man, trained by Pym and armed with a suit that allows him to shrink in size, possess superhuman strength and control an army of ants. The miniature hero must use his new skills to prevent Cross, also known as Yellowjacket, from perfecting the same technology and using it as a weapon for evil.")
    //alert(characterSearch);
    })

    var movieSearch = getUrlParameter('movie');
    //alert(movieSearch)
    //alert(characterSearch)


    function makeElem(type, data, elemToappendTo){
        var childElem = $(type).text(data);
        elemToappendTo.append(childElem);
    }

    function displayMovieInfo(){
        var movie = $('#heroSearch').val().trim();
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(movie);
            console.log(response);
            var movieDiv = $('<div class="movieDiv">');
            makeElem('<p>', '<b>Movie Info</b>', movieDiv)
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
        $('#moviesView').html("");
        displayMovieInfo();
    });
});