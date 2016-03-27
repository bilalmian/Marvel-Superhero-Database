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

        // var url = "http://gateway.marvel.com/v1/public/characters?name=spider-man&ts="+ts+"&hash="+hash+"&apikey="+apiKey;
        var url = "https://gateway.marvel.com/v1/public/characters?name="+heroName+"&ts="+ts+"&hash="+hash+"&apikey="+apiKey;
        console.log(url);

        $.ajax({url: url, method: "GET"}).done
            (function(data) {
        // console.log(data);  // console log of full data return

        // drilling down to the needed data and place in a variable
            var refinedResults = data.data.results[0];
            console.log(refinedResults); // console log of comic result

        // Useful results from refinded results
            // 1. comics --  its an object
            // 2. description -- description of the comic               
            // 3. events --  its an object
            // 4. name -- name of the comic
            // 5. series --  its an object
            // 6. stories --  its an object

        // store the refined results in variables
            // comics object
            var comicResults = data.data.results[0].comics;
            console.log(comicResults); // console log of comic result

            // description item
            var descriptionResults = data.data.results[0].description;
            console.log(descriptionResults); // console log of description result

            // events object
            var eventsResults = data.data.results[0].events;
            console.log(eventsResults); // console log of events result

            // name item
            var nameResults = data.data.results[0].name;
            console.log(nameResults); // console log of description result

            // series object
            var seriesResults = data.data.results[0].series;
            console.log(seriesResults); // console log of events result

            // stories object
            var storiesResults = data.data.results[0].stories;
            console.log(storiesResults); // console log of events result

            // var jsonText = JSON.stringify(comicResults);
            // $("#comicsView").html(jsonText);
                         
         });

        return false; // stop the page from refreshing when the submit button is hit
    });
});

