$( document ).ready(function() {

    // var getUrlParameter = function getUrlParameter(sParam) {
    // var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    //     sURLVariables = sPageURL.split('&'),
    //     sParameterName,
    //     i;
    // for (i = 0; i < sURLVariables.length; i++) {
    //     sParameterName = sURLVariables[i].split('=');
    //     if (sParameterName[0] === sParam) {
    //         return sParameterName[1] === undefined ? true : sParameterName[1];
    //         }
    //     }
    // };

    // var characterSearch;
    // $("#searchButton").click(function(){
    // characterSearch = $("#characterSearch").val();
    // $("#movieTitle").html(characterSearch);
    // $("#movieSynopsis").html("Forced out of his own company by former protégé Darren Cross, Dr. Hank Pym (Michael Douglas) recruits the talents of Scott Lang (Paul Rudd), a master thief just released from prison. Lang becomes Ant-Man, trained by Pym and armed with a suit that allows him to shrink in size, possess superhuman strength and control an army of ants. The miniature hero must use his new skills to prevent Cross, also known as Yellowjacket, from perfecting the same technology and using it as a weapon for evil.")
    // //alert(characterSearch);
    // })

    // var movieSearch = getUrlParameter('movie');
    // //alert(movieSearch)
    // //alert(characterSearch)

// make new element function
    function makeElem(type, data, elemToappendTo){
        var childElem = $(type).text(data);
        elemToappendTo.append(childElem);
    }

// display movie info function
    function displayMovieInfo(){
    // grabbing user input
        var movie = $('#heroSearch').val().trim();
    // url to pass through the ajax call
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            console.log(movie); // console log of movie name
            console.log(response); // console log of full data return
    // creating a div for the movie info to go in
            var movieDiv = $('<div class="movieDiv">');
            makeElem('<p>', 'Movie Info', movieDiv)
            makeElem('<p>', response.Title, movieDiv)
            makeElem('<p>', "Rating: " + response.Rated, movieDiv)
            makeElem('<p>', "Released: " + response.Released, movieDiv)
            makeElem('<p>', "Plot: " + response.Plot, movieDiv)
            // gets the image of the comic if there is one
            if (response.Poster != 'N/A'){
                var image = $('<img>').attr("src", response.Poster);
                movieDiv.append(image);
            }
    // injecting movie info to html doc
            $('#moviesView').prepend(movieDiv);
        }); 
    }

// display comic info function
    function displayComicInfo() {
    // grabbing user input
        var heroName = $('#heroSearch').val();
    // Variables needed for the hash
        var ts = new Date().getTime(); 
        var PRIV_KEY = "9ced83e38521d6850703a1c54a18fea775a60964"
        var API_KEY = "bdcf4ef10cbcac4120f014ab0e020243";
        var hash = CryptoJS.MD5(ts+PRIV_KEY + API_KEY);
    // apikey for the end of the url
        var apiKey = "bdcf4ef10cbcac4120f014ab0e020243";
    // url to pass through the ajax call
        var url = "https://gateway.marvel.com/v1/public/characters?name=" + heroName + "&ts=" + ts + "&hash=" + hash + "&apikey=" + apiKey;
        console.log(url); // console log of url
    // ajax call
        $.ajax({ url: url, method: "GET" }).done(function(data) {
        // console.log(data);  // console log of full data return
    // drilling down to the needed data and place in a variable
            var refinedResults = data.data.results[0];
            console.log(heroName); // console log of hero name
            console.log(refinedResults); // console log of comic result
    // Useful results from refinded results
            // 1. comics --  its an object, a resource list containing comics which feature this character.
            // 2. description -- description of the comic, a short bio or description of the character.             
            // 3. events --  its an object, a resource list of events in which this character appears.
            // 4. name -- name of the comic, the name of the character.,
            // 5. series --  its an object, a resource list of series in which this character appears.
            // 6. stories --  its an object, a resource list of stories in which this character appears.
            // 7. thumbnail  --  its an object, a representative image for this character.
    // store the refined results in variables
            var comicResults = data.data.results[0].comics.items; // comics object
            var descriptionResults = data.data.results[0].description; // description item
            var eventsResults = data.data.results[0].events.items; // events object
            var nameResults = data.data.results[0].name; // name item
            var seriesResults = data.data.results[0].series.items; // series object
            var storiesResults = data.data.results[0].stories.items; // stories object
            var thumbnailResultsPath = data.data.results[0].thumbnail.path; // thumbnail path item
            var thumbnailResultsExtension = data.data.results[0].thumbnail.extension; // thumbnail extension item
            var thumbnailResults = thumbnailResultsPath + "." +thumbnailResultsExtension; // thumbnail concatinated item

    // creating a div for the comic info to go in
            var comicDiv = $('<div class="comicDiv">');
            makeElem("<p>", "Comic Info", comicDiv);
            makeElem("<p>", nameResults, comicDiv);
            makeElem("<p>", "Comic Plot: " + descriptionResults, comicDiv);
            // gets the image of the comic if there is one
            if (thumbnailResults != "N/A"){
                var image = $("<img>").attr("src", thumbnailResults);
                comicDiv.append(image);
            }
    // injecting comic info to html doc
            $("#comicsView").prepend(comicDiv);
         });
    }
// -----------------------------------------------------------------------------------------------------------------------------------------------------           
    $('#heroSubmit').on('click', function(){
    // clear the previous infomation with each button click
        $('#moviesView').html("");
        $('#comicsView').html("");
    // display info if movic and comic areas
        displayMovieInfo();
        displayComicInfo();
    });
});