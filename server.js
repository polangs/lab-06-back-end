'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// API Routes
app.get('/location', (request,response) => {
  try {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
  }
  catch(error) {
    console.error(error);
    response.status(500).send('Status: 500. So sorry, something went wrong.');
  }
});

// Helper Functions
function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location (query, geoData);
  return location;
}

// Refactor the searchToLatLong function to replace the object literal with a call to this constructor function:
function Location(query, geoData) {
  this.search_query = query;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

// Weather Data
// API Routes
app.get('/weather', (request,response) => {
  try {
    const weatherData = searchWeather(request.query.data);
    response.send(weatherData);
  }
  catch(error) {
    console.error(error);
    response.status(500).send('Status: 500. So sorry, something went wrong.');
  }
});

// Helper Functions
function searchWeather(query) {
  const weatherData = require('./data/darksky.json');
  const weather = new Weather (query, weatherData);
  return weather;
}

function Weather(query, weatherData) {
  this.search_query = query;
  this.forcast = weatherData.currently.summary;
  this.time = weatherData.currently.time;
  // this.formatted_query = geoData.results[0].formatted_address;
  // this.latitude = geoData.results[0].geometry.location.lat;
  // this.longitude = geoData.results[0].geometry.location.lng;
}



// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`) );