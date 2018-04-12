## Geocode application

## Purpose

* To determine the distance (in miles) & driving time between 2 addresses inputted by a user

## Instructions to run the application

  * Clone this repository to your local machine by clicking the green "Clone or download" button from my GitHub repository
  * Copy the path to clone with HTTPS
  * From the CLI, type ``` git clone {paste path here} ``` and hit ```enter``` from the folder in which you'd like to save this project
  * ```cd``` into the ```geocode-app/``` folder and type ```npm install``` to install all dependencies
  * Once that installation is complete, type ```npm start``` to boot up the application from ```http://localhost:3000/```
  * You MUST download the following Google Chrome extension/plugin before entering an address, or the query will not run:
    * https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
  * Once the app is running and the Google extension has been downloaded, you may type in an address into the form and submit to see the following information render:
    * The approximate distance between the two addresses entered by the user, as determined by the haversine formula
    * The approximate time it will take to drive from the origin address to the desintation address, as determined by the Google Directions API

  ## Additional notes

  * This application was created using ```npx create-react-app```

  * Google Geocode API:
    * https://developers.google.com/maps/documentation/geocoding/start

  * Google Directions API:
    * https://developers.google.com/maps/documentation/directions/

  * This project was bootstrapped with [Create React App]
    * (https://github.com/facebookincubator/create-react-app).

  * Use the haversine formula to determine distance between 2 given latitude, longitude coordinates (output given in meters, must then be coverted to miles) 
    * https://npm.runkit.com/haversine-distance

  * Allow-Control-Allow-Origin Google Chrome extension
    *  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

