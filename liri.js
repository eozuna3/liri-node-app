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

    //  Create URL to call the bands in town API
    var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // The use of axios.get function in order to to grab data from the Bands In Town API
    axios.get(concertURL).then(
      function (response) {
        // If the axios was successful...
        if (response.data.length > 0) {
          for (let index = 0; index < response.data.length; index++) {
            var eventDate = moment(response.data[index].datetime);
            console.log(artist + " will be playing at " + response.data[index].venue.name + ", which is located in " + response.data[index].venue.city + ", " + response.data[index].venue.region + ", " + response.data[index].venue.country + ".");
            console.log("The concert is scheduled for " + eventDate.format("MM/DD/YYYY") + ".");
          };
        } else {
          console.log("There were no event dates found for this artist.")
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

  //  "Movie-this" command section of the code
  case "movie-this":
      var movieTitle = "Mr Nobody";
      var movieURL = "";

      console.log(process.argv[3]);
      break;

  default:
    console.log("Please enter a correct command for the program to use.");
}