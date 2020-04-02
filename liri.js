require("dotenv").config();

//  Acquire access to all needed modules
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var commands = process.argv[2].toLowerCase();

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
          console.log(artist + " will be playing at " + response.data[index].venue.name + ", which is located in " + response.data[index].venue.city + ", " + response.data[index].venue.region + ", " + response.data[index].venue.country + ".");
          console.log("The concert is scheduled for " + eventDate.format("MM/DD/YYYY") + ".");
        };
      } else {
        console.log("There were no event dates found for this artist.")
      };
    },
    function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
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
      console.log("Movie Title -- " + response.data.Title);
      console.log("Movie Release Year -- " + response.data.Year);
      console.log("Movie IMDB Rating -- " + response.data.Ratings[0].Value);
      console.log("Movie Rotten Tomatoes Rating -- " + response.data.Ratings[1].Value);
      console.log("Movie was produced in " + response.data.Country);
      console.log("Movie Language -- " + response.data.Language);
      console.log("Movie Plot -- " + response.data.Plot);
      console.log("Actors in the Movie -- " + response.data.Actors);
    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

//  Spotify-this function
function spotifyFunction(song) {
  //  Node-spotify-api call
  spotify.search({ type: "track", query: song })
    .then(function (response) {
      resultsArray = response.tracks.items;
      for (let index = 0; index < resultsArray.length; index++) {
        console.log("The artists for the song are -- " + resultsArray[index].album.artists[0].name);
        console.log("The name of the song is -- " + resultsArray[index].name);
        console.log("The album title for the song -- " + resultsArray[index].album.name);
        if (resultsArray[index].preview_url !== null) {
          console.log("Here is a link to a 30 second preview of the song -- " + resultsArray[index].preview_url);
        } else {
          console.log("No preview was found for this song.")
        };
      };
    }).catch(function (err) {
      console.log(err);
    });
};

switch (commands) {
  case "concert-this":
    var artist = "";
    for (let index = 3; index < process.argv.length; index++) {
      if (artist === "") {
        artist = process.argv[index];
      } else {
        artist = artist + " " + process.argv[index];
      };
    };
    concertFunction(artist);
    break;

  //  "Movie-this" command section of the code
  case "movie-this":
    var movieTitle = "Mr. Nobody";

    if (process.argv[3] !== undefined) {
      movieTitle = "";
      for (let index = 3; index < process.argv.length; index++) {
        if (movieTitle === "") {
          movieTitle = process.argv[index];
        } else {
          movieTitle = movieTitle + "+" + process.argv[index];
        };
      };
    };
    movieFunction(movieTitle);
    break;

  // Spotify-this-song section of code
  case "spotify-this-song":
    var songName = "The Sign";

    if (process.argv[3] !== undefined) {
      songName = "";
      for (let index = 3; index < process.argv.length; index++) {
        if (songName === "") {
          songName = process.argv[index];
        } else {
          songName = songName + " " + process.argv[index];
        };
      };
    };
    spotifyFunction(songName);
    break;

  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function (error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }

      // We will then print the contents of data
      console.log(data);
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

      // We will then re-display the content as an array for later use.
      console.log(dataArr);
      switch (dataArr[0]){
        case "concert-this":
          concertFunction(dataArr[1]);
          break;
        
        case "movie-this":
          movieFunction(dataArr[1]);
          break;
        
        case "spotify-this-song":
          spotifyFunction(dataArr[1]);
          break;
      };
    });
    break;

  default:
    console.log("Please enter a correct command for the program to use.");
}