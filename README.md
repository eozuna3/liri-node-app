# liri-node-app (First node application)

### Overview
This application is a command line node app that takes in series of arguments and based on the first arguement passed decides what type of information to return.  The app uses the rest of the arguments passed to send requests to several node modules to retrieve the required information.  This application is my first use of node with command-line interface.

### How the application is organized
The first part of application involves requiring access to all of the previously installed modules for use in the application along with creating a global variable which is assigned the value of the first argument passed in command line.  

Next a series of 3 functions were created to use the node modules along with the remaining command line arguments to perform API calls and retrieve the required information.  The functions also renders the returned information to the terminal window.  The first function performs a Bands in Town API call, the second function performs an OMDB API call, and the final function performs a Spotify API call.

Next a switch statement is used to determine which function to call based on the first argument passed from the command line.  The last case of the switch statement involves using the node file system module to pull information from a text file and then use the information from the text file as arguments for a 2nd switch statement which will call one of the previous functions.

## Instructions for use of the application
### Before using the app
Before you can start to use the app you will need to install a few of the modules listed below.  To install each of the modules, type in the code below on the command line for each module replacing "module name" with the actual name of the module.

`$ npm install <Module Name>`
