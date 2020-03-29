require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var commands = process.argv[2].toLowerCase();

switch (commands) {
  //  "Concert-this" command section of the code
  case "concert-this":    
    var artist = "";
    for (let index = 3; index < process.argv.length; index++) {
      if (artist === "") {
        artist = process.argv[index];
      } else {
        artist = artist + " " + process.argv[index];
      };
    };
    console.log(artist);
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // The use of axios.get function in order to to grab data from the OMDB API and the Bands In Town API
    axios.get(concertURL).then(
      function (response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response.data);
        // console.log(response.data[0].venue.name);
        // console.log(response.data[0].venue.city);
        // console.log(response.data[0].venue.region);
        for (let index = 0; index < response.data.length; index++) {
          console.log(artist + " will be playing at " + response.data[index].venue.name + " which is located in " + response.data[index].venue.city + ", " + response.data[index].venue.region + ", " + response.data[index].venue.country + ".");
        };        
      },
      function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
    break;
    
    default:
      console.log("Please enter a correct command for the program to use.");
}