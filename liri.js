//  Acquire access to all needed modules
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var commands = process.argv[2];

//  Create global variables hold default values to use in the switch statements
var artist = "Metallica";
var movieTitle = "Mr. Nobody";
var songName = "The Sign";

//  Functions for each of the selection choices

//  "Concert-this" function
function concertFunction(performer) {
  //  Create URL to call the bands in town API
  var concertURL = "https://rest.bandsintown.com/artists/" + performer + "/events?app_id=codingbootcamp"

  // The use of axios.get function in order to to grab data from the Bands In Town API
  axios.get(concertURL).then(
    function (response) {
      // If the axios was successful...
      if (response.data.length > 0) {
        for (let index = 0; index < response.data.length; index++) {
          var eventDate = moment(response.data[index].datetime);
          console.log("");
          console.log(performer + " will be playing at " + response.data[index].venue.name + ", which is located in " + response.data[index].venue.city + ", " + response.data[index].venue.region + ", " + response.data[index].venue.country + ".");
          console.log("The concert is scheduled for " + eventDate.format("MM/DD/YYYY") + ".");
          console.log("----------------------------------------------------------------------");
          console.log("");
        };
      } else {
        console.log("");
        console.log("There were no concert event dates found for this artist.  Please try again");
        console.log("----------------------------------------------------------------------");
        console.log("");
      };
    })
    .catch(function (error) {
      console.log("");
      console.log("The artist was not found in the database.  Please try again.");
      console.log("----------------------------------------------------------------------");
      console.log("");

      if (error.response) {
        console.log("");
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("");
        console.log(error.request);
      } else {
        console.log("");
        console.log("Error", error.message);
      }
      console.log("");
      console.log(error.config);
    }
  );
};

//  Movie-this function
function movieFunction(title) {
  // Create URL for Axios API call to OMDB API
  var movieURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy"

  // Run a request with axios to the OMDB API with the movie specified
  axios.get(movieURL).then(
    function (response) {
      if (response.data.Title !== undefined) {
        console.log("");
        console.log("Movie Title -- " + response.data.Title);
        console.log("Movie Release Year -- " + response.data.Year);
        console.log("Movie IMDB Rating -- " + response.data.Ratings[0].Value);
        console.log("Movie Rotten Tomatoes Rating -- " + response.data.Ratings[1].Value);
        console.log("Movie was produced in " + response.data.Country);
        console.log("Movie Language -- " + response.data.Language);
        console.log("Movie Plot -- " + response.data.Plot);
        console.log("Actors in the Movie -- " + response.data.Actors);
        console.log("----------------------------------------------------------------------");
        console.log("");
      } else {
        console.log("");
        console.log("No movie information was found in the database for the given title.  Please try again");
        console.log("----------------------------------------------------------------------");
        console.log("");
      }
    })
    .catch(function (error) {
      console.log("");
      console.log("No information was found in the database for the given movie title.  Please try again");
      console.log("----------------------------------------------------------------------");
      console.log("");

      if (error.response) {
        console.log("");
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("");
        console.log(error.request);
      } else {
        console.log("");
        console.log("Error", error.message);
      }
      console.log("");
      console.log(error.config);
    });
};

//  Spotify-this function
function spotifyFunction(song) {
  //  Node-spotify-api call using the node-spotify module
  spotify.search({ type: "track", query: song })
    .then(function (response) {
      if (response.tracks.items.length > 0) {
        var resultsArray = response.tracks.items;
        for (let index = 0; index < resultsArray.length; index++) {
          console.log("");
          console.log("The artists for the song are -- " + resultsArray[index].album.artists[0].name);
          console.log("The name of the song is -- " + resultsArray[index].name);
          console.log("The album title for the song -- " + resultsArray[index].album.name);
          if (resultsArray[index].preview_url !== null) {
            console.log("");
            console.log("Here is a link to a 30 second preview of the song -- " + resultsArray[index].preview_url);
            console.log("----------------------------------------------------------------------");
            console.log("");
          } else {
            console.log("");
            console.log("No preview link was found for this song.");
            console.log("----------------------------------------------------------------------");
            console.log("");
          };
        };
      } else {
        console.log("");
        console.log("No information was found for the provided song title.  Please try again.");
        console.log("----------------------------------------------------------------------");
        console.log("");
      }
    }).catch(function (err) {
      console.log("");
      console.log("No information was found in the database for the given song title.  Please try again");
      console.log("----------------------------------------------------------------------");
      console.log("");

      console.log("");
      console.log(err);
      console.log("----------------------------------------------------------------------");
      console.log("");
    });
};

switch (commands) {
  //  Concert-this command selection
  case "concert-this":
    if (process.argv[3] !== undefined) {
      artist = process.argv.slice(3).join(" ");
    };
    concertFunction(artist);
    break;

  //  "Movie-this" command selection
  case "movie-this":
    if (process.argv[3] !== undefined) {
      movieTitle = process.argv.slice(3).join(" ");
    };
    movieFunction(movieTitle);
    break;

  // Spotify-this-song command selection
  case "spotify-this-song":
    if (process.argv[3] !== undefined) {
      songName = process.argv.slice(3).join(" ");
    };
    spotifyFunction(songName);
    break;
  
  // Do-what-it-says command selection  
  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function (error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }

      //  Split the text in the random.txt file into an array for use and create a variable to hold the argument value
      var dataArr = data.split(",");
      var userSelection = "";

    if(dataArr[1] !== undefined){
      userSelection = dataArr[1].trim().replace(/"/g, "");
    }

      switch (dataArr[0]) {
        case "concert-this":
          if(userSelection === ""){
            concertFunction(artist);
          } else {
            concertFunction(userSelection);
          };
          break;

        case "movie-this":
          if(userSelection === ""){
            movieFunction(movieTitle);
          } else {
            movieFunction(userSelection);
          };
          break;

        case "spotify-this-song":
          if(userSelection === ""){
            spotifyFunction(songName);
          } else {
            spotifyFunction(userSelection);
          };
          break;

        default:
          console.log("Please enter a correct command for the program to use.");
      };
    });
    break;

  default:
    console.log("Please enter a correct command for the program to use.");
}