//set any environment variables with the dotenv package
require("dotenv").config();
// import the keys.js file 
var keys = require("./keys.js");
// for npm install
var Spotify = require('node-spotify-api');
// constants for axios
const axios = require("axios"); 
// fs is a core Node package for reading and writing files
const fs = require("fs");
// moment for date configurations
const moment = require("moment");

var selectedApp = process.argv[2];
//slice returns all indices from #3 to the end of the array
//join combines them with a space separator
var userInput = process.argv.slice(3).join(" ");

// switch statement instead of if method via #6 Calculator 
function liriChoice (selectedApp, userInput) {
    switch (selectedApp) {
        case "concert-this":
            searchConcert(userInput);
            console.log(userInput);
           break;
        case "spotify-this-song": 
            searchSong(userInput);
            break;
        case "movie-this": 
            searchMovie(userInput);
            break;
        case "do-what-it-says":
            searchRandom();
            break;
        default:
            console.log("Not a valid argument. Please try again:" + 
            "\n concert-this <artist/band name here>" +
            "\n spotify-this-song <song name here>" +
            "\n movie-this <movie name here>" +
            "\n do-what-it-says");
            
    };
};

// search concert choice via BandsInTown
function searchConcert(userInput) {
    // search the Bands in Town Artist Events API
    // console.log(userInput);
    let concertQueryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    // console.log(concertQueryURL);
    axios.get(concertQueryURL).then(
      function(response) {
        // console.log(response)
        console.log("\n𝄞 " + userInput + " 𝄞" +
        "\n will perform at " + response.data[0].venue.name +
        "\n in " + response.data[0].venue.city +
        // "\n on " + response.data[0].datetime (2020-09-19T13:00:00)
        "\n on " + response.data[0].datetime);
      }
    );
};

// search song choice via Spotify
function searchSong(userInput) {

    var spotify = new Spotify(keys.spotify);

    if (!userInput) {
        userInput = "The Sign";
    };
    // from https://www.npmjs.com/package/node-spotify-api
    //search is the EASIEST way to find an artist, album, or track.
    spotify
    .search({ type: 'track', query: userInput })
    .then(function(response) {
        // console.log(response);
        // console.log(userInput);
        console.log("\nArtist(s): " + response.tracks.items[0].album.artists[0].name);
        console.log("Song name: "+ response.tracks.items[0].name);
        console.log("Preview link: "+ response.tracks.items[0].href);
        console.log("From the album: "+ response.tracks.items[0].album.name);
    })
    .catch(function(err) {
        console.log(err);
    });
};

// search movie
function searchMovie(userInput) {

    if (!userInput) {
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }

    let movieQueryURL = "http://www.omdbapi.com/?t="+ userInput +"&apikey=trilogy";

    axios.get(movieQueryURL)
    .then(function(response) {
        //   console.log(response)
          console.log("\nMovie Title: " + response.data.Title);
          console.log("Year released: " + response.data.Year);
          console.log("IMBD rating: " + response.data.imbdRating);
        //   Ratings aren't available??
        //   console.log("Rotten Tomatoes rating: " + response.data.Ratings);
          console.log("Country produced: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
    })

    .catch(function(err) {
        console.log(err);
    });
};

// search Random by reading the random.txt file
function searchRandom() {
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        if (data) {
            // console.log(data)
            var dataArr = data.split(",");
            selectedApp = dataArr[0];
            userInput = dataArr[1];
            liriChoice(selectedApp, userInput)
        }

    })
};

liriChoice(selectedApp, userInput);