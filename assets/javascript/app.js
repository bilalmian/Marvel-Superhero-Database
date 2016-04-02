 $(document).ready(function(){

 	var marvel = {
		phaseOne: [{
				title: "Iron Man",
				imdb: "tt0371746",
				character: "Iron Man",
			},
			{	title: "The Incredible Hulk",
				imdb: "tt0800080",
				character: "Hulk"
			},
			{	title: "Iron Man 2",
				imdb: "tt1228705",
				character: "Iron Man",
			},
			{	title: "Thor",
				imdb: "tt0800369",
				character: "Thor",
			},
			{	title: "Captain America: The First Avenger",
				imdb: "tt0800369",
				character: "Captain America",
			},
			{	title: "The Avengers",
				imdb: "tt0848228",
				character: "Avengers",
			}],

		phaseTwo: [{
				title: "Iron Man 3",
				imdb: "tt1300854",
				character: "Iron Man",
			},
			{	title: "Thor: The Dark World",
				imdb: "tt1981115",
				character: "Thor",
			},
			{	title: "Captain America: The Winter Soldier",
				imdb: "tt1843866",
				character: "Captain America",
			},
			{	title: "Guardians of the Galaxy",
				imdb: "tt2015381",
				character: "Guardians of the Galaxy",
			},
			{	title: "Avengers: Age of Ultron",
				imdb: "tt2395427",
				character: "Ultron",
			},
			{	title: "Ant-Man",
				imdb: "tt0478970",
				character: "Hank Pym",
			}],

		phaseThree: [{
				title: "Captain America: Civil War",
				imdb: "tt3498820",
				character: "Captain America",
			},
			{	title: "Doctor Strange",
				imdb: "tt1211837",
				character: "Doctor Strange",
			},
			{	title: "Guardians of the Galaxy",
				imdb: "tt3896198",
				character: "Star Lord",
			},
			{	title: "Thor: Ragnarok",
				imdb: "tt3501632",
				character: "Thor",
			},
			{	title: "Black Panther",
				imdb: "tt1825683",
				character: "Black Panther",
			},
			{	title: "Avengers: Infinity War - Part One",
				imdb: "tt4154756",
				character: "Thanos",

			}],
	};

	$(".headline").on("click", function () {
		$('#moviesView').html("");
		var movie = $(this).attr('data-imdb');
   		var queryURL = "http://www.omdbapi.com/?i=" + movie + "&plot=full&r=json";
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
   })

	function displayPhase () {
		
		for (var i = 0; i < marvel.phaseOne.length; i++) {

			var marvelLi = $('<li class="pull">');
			makeElem('<a href="#">', marvel.phaseOne[i].title, marvelLi)
			marvelLi.attr("data-imdb", marvel.phaseOne[i].imdb)
			marvelLi.attr("data-character", marvel.phaseOne[i].character)
			$("#pOne").append(marvelLi);
		}

		for (var i = 0; i < marvel.phaseTwo.length; i++) {
			var marvelLi = $('<li class="pull">');
			makeElem('<a href="#">', marvel.phaseTwo[i].title, marvelLi)
			marvelLi.attr("data-imdb", marvel.phaseTwo[i].imdb)
			marvelLi.attr("data-character", marvel.phaseTwo[i].character)
			$("#pTwo").append(marvelLi);
		}

		for (var i = 0; i < marvel.phaseThree.length; i++) {
			var marvelLi = $('<li class="pull">');
			makeElem('<a href="#">', marvel.phaseThree[i].title, marvelLi)
			marvelLi.attr("data-imdb", marvel.phaseThree[i].imdb)
			marvelLi.attr("data-character", marvel.phaseThree[i].character)
			$("#pThree").append(marvelLi);
		}
	}

   $(document).on("click", ".pull", function (){
   		$('#moviesView').html("");
   		var movie = $(this).attr('data-imdb');
   		var queryURL = "http://www.omdbapi.com/?i=" + movie + "&plot=full&r=json";
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
   })

	// function wikia() {
	// 	var articleID = 7139;
	// 	var queryURL = "http://marvel.wikia.com/api/v1/Articles/AsSimpleJson?id=" + articleID;
	// 	// http://marvel.wikia.com/api/v1/Articles/AsSimpleJson?id=7139
	// 	console.log(queryURL);
	// 	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
	// 		console.log(response);
	// 		var wikiaDiv = $('<div class = "wikiaDiv">');
	// 		makeElem('<p>','<b>Character Info</b>', wikiaDiv)
	// 		makeElem('<p>',response.sections.title, wikiaDiv)

	// 	$('#wikiaView').prepend(wikiaDiv);
 //   		});
 //   	};
    

    function makeElem(type, data, elemToappendTo){
        var childElem = $(type).text(data);
        elemToappendTo.append(childElem);
    }

    function displayMovieInfo(){
        var movie = $('#characterSearch').val().trim();
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

    $('#characterSubmit').on('click', function(){
        $('#moviesView').html("");
        displayMovieInfo();
    });
    displayPhase ();
 
    
});