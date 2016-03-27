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

            // Usefull results from refindedResults
                // comics : Object
                // description : "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people."
                // events : Object
                // name : "Spider-Man"
                // series : Object
                // stories : Object

            // drilling down to the needed data and place in a variable
            var comicResults = data.data.results[0].comics;
            console.log(comicResults); // console log of comic result

            var jsonText = JSON.stringify(comicResults);
            $("#comicsView").html(jsonText);
                         

         });

        return false; // cancels the input submit button, rather than it going to another page when we right false it does nothing
    });
});

