import { GPSKalmanFilter } from 'kalman_gps.js';

const kalman = new GPSKalmanFilter();

function WatchLocation() {
  if (navigator.geolocation) {
    // Call watchPosition once to start tracking the user location
    const watchID = navigator.geolocation.watchPosition(
      function(position) {
        // Get the raw GPS data
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const acc = position.coords.accuracy;
        const timems = position.timestamp;

        // Apply the Kalman filter to the GPS data
        let kalmanXY = kalman.filter(lat, lng, acc, timems);

        // Get the smoothed coordinates from the filter output
        const smoothLat = kalmanXY[0];
        const smoothLng = kalmanXY[1];

        console.log(`Smoothed latitude: ${smoothLat}, smoothed longitude: ${smoothLng}`);
        showwatchPosition(smoothLat, smoothLng); // Call showPosition to update the coordinates on the screen using the smoothed values
      },
      function(error) {
        console.error("Error getting user location:", error);
      },
      {
        enableHighAccuracy:true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  } else {
    const x = document.getElementById("coordswatch");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showwatchPosition(smoothLat, smoothLng) {
    const x = document.getElementById("coordswatch");
  
    x.innerHTML = `Smoothed latitude: ${smoothLat}, smoothed longitude: ${smoothLng}`;
  
    // Loop over the locations array and calculate the distance to each one
    for (let location of locations) {
      // Get the fixed point coordinates
      const lat2 = location.lat;
      const lon2 = location.lon;
  
      // Calculate the distance using the haversine formula
      const distance = haversineDistance(smoothLat, smoothLng, lat2, lon2);
  
      // Convert the distance from km to m
      const distanceInMeters = distance * 1000;
  
      // Display the distance in a new element with the location name
      const y = document.getElementById(`distancewatch-${location.name}`);
      y.innerHTML = `<h2>${location.name}</h2><p>Distance: ${distanceInMeters.toFixed(2)} m</p>`; // Round the distance to 2 decimal places and use tags
    }
  }

  window.addEventListener("load", WatchLocation);
