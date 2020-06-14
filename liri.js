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
            searchRandom(userInput);
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
        console.log("\nSong name: "+ response.tracks.items[0].name);
        console.log("\nPreview link: "+ response.tracks.items[0].href);
        console.log("\nFrom the album: "+ response.tracks.items[0].album.name);
    })
    .catch(function(err) {
        console.log(err);
    });
};

// search movie

liriChoice(selectedApp, userInput);