//set any environment variables with the dotenv package
require("dotenv").config();
// import the keys.js file 
var keys = require("./keys.js");
// accesses Spotify keys
var spotify = new Spotify(keys.spotify);
// constants for axios
const axios = require("axios"); 
// fs is a core Node package for reading and writing files
var fs = require("fs");

var selectedApp = process.argv[2];
//slice returns all indices from #3 to the end of the array
//join combines them with a space separator
var userInput = process.argv.slice(3).join(" ");

// switch statement instead of if method via #6 Calculator 
function liriChoice (selectedApp, userInput) {
    switch (selectedApp) {
        case "concert-this":
            searchConcert(userInput);
           break;
        case "spotify-this-song": 
            searchSong(userInput);
            break;
        case "movie-this": 
            searchMovie(userInput);
            break;
        case "do-what-it-says":
            searchRandom(userInput);
            break;
        default:
            console.log("Not a valid argument. Please try again:/n concert-this /n spotify-this-song /n movie-this /n do-what-it-says");
            
    };
};

// search concert choice via BandsInTown
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);
