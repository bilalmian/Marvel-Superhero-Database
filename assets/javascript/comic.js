$( document ).ready(function() {
    $(document).on("click", "#heroSubmit", function(){
        var heroName = $('#heroSearch').val();

        // Variable needed for the hash
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

            var comicResults = data.data.results[0];
            console.log(comicResults);
            // console log of comic result

            var jsonText = JSON.stringify(comicResults);
            $("#comicsView").html(jsonText);
                         
         });

        return false; // cancels the input submit button, rather than it going to another page when we right false it does nothing
    });
});

