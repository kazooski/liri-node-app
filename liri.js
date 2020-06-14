//set any environment variables with the dotenv package
require("dotenv").config();
// import the keys.js file 
var keys = require("./keys.js");
// 
var spotify = new Spotify(keys.spotify);
// constants for axios
const axios = require("axios"); 
