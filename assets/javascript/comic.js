$( document ).ready(function() {
    $(document).on("click", "#heroSubmit", function(){
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
            console.log(refinedResults); // console log of comic result
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("-----------------------------------------------------------------------------------------------------------------------------");

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

            console.log("List of comics");
            console.log(comicResults); // console log of comic result
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("Descripion of comic");
            console.log(descriptionResults); // console log of description result
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("List of events");
            console.log(eventsResults); // console log of events result            
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("Name of comic");
            console.log(nameResults); // console log of name result
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("List of series");
            console.log(seriesResults); // console log of series result
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("List of stories");
            console.log(storiesResults); // console log of stories result
            console.log("-----------------------------------------------------------------------------------------------------------------------------");
            console.log("Thumbnail");
            console.log(thumbnailResults); // console log of thumbnail result

// -----------------------------------------------------------------------------------------------------------------------------------------------------
            
            var comicImage = $("<img>");
            comicImage.attr("src", thumbnailResults);
            comicImage.addClass("comicImage");
            $("#comicsView").append(comicImage);
            $("#comicsView").append("</br></br></br>");
            var jsonTextComics = JSON.stringify(comicResults);
            $("#comicsView").append(jsonTextComics);
            $("#comicsView").append("</br></br></br>");
            var jsonTextDescription = JSON.stringify(descriptionResults);
            $("#comicsView").append(jsonTextDescription);
            $("#comicsView").append("</br></br></br>");
            var jsonTextEvents = JSON.stringify(eventsResults);
            $("#comicsView").append(jsonTextEvents);
            $("#comicsView").append("</br></br></br>");
            var jsonTextName = JSON.stringify(nameResults);
            $("#comicsView").append(jsonTextName);
            $("#comicsView").append("</br></br></br>");
            var jsonTextSeries = JSON.stringify(seriesResults);
            $("#comicsView").append(jsonTextSeries);
            $("#comicsView").append("</br></br></br>");
            var jsonTextStories = JSON.stringify(storiesResults);
            $("#comicsView").append(jsonTextStories);
         });

        return false; // stop the page from refreshing when the submit button is hit
    });
});

