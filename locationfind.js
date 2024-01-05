// Import the KalmanJS library
import KalmanFilter from 'kalmanjs';

// Create a new instance of the KalmanFilter class
// Adjust the R and Q parameters as needed
const kf = new KalmanFilter({R: 0.01, Q: 3});

function haversineDistance(lat1, lon1, lat2, lon2) {
  // Convert degrees to radians
  lat1 = lat1 * Math.PI / 180;
  lon1 = lon1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;

  // Calculate the differences between the coordinates
  let dLat = lat2 - lat1;
  let dLon = lon2 - lon1;

  // Apply the haversine formula
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371; // Radius of the Earth in km
  let d = r * c; // Distance in km
  return d;
}

function WatchLocation() {
  if (navigator.geolocation) {
    // Call watchPosition once to start tracking the user location
    const watchID = navigator.geolocation.watchPosition(
      function(position) {
        // Get the raw latitude and longitude values
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Apply the Kalman filter to get the smoothed values
        const filteredLat = kf.filter(lat);
        const filteredLng = kf.filter(lng);

        console.log(`Latitude: ${filteredLat}, longitude: ${filteredLng}`);
        showwatchPosition(filteredLat, filteredLng); // Call showPosition to update the coordinates on the screen
      },
      function(error) {
        console.error("Error getting user location:", error);
      },
      {
        enableHighAccuracy:true,
        timeout: 5000,      // 5 seconds timeout
        maximumAge: 0
      }
    );
  } else {
    const x = document.getElementById("coordswatch");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showwatchPosition(lat, lng) {
  const x = document.getElementById("coordswatch");

  x.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;

  // Get the fixed point coordinates
  const lat2 = 34.123754;
  const lon2 = -117.7378068;

  // Calculate the distance using the haversine formula
  const distance = haversineDistance(lat, lng, lat2, lon2);

  // Convert the distance from km to m
  const distanceInMeters = distance * 1000;

  // Display the distance in a new element
  const y = document.getElementById("distancewatch");
  y.innerHTML = `Distance: ${distanceInMeters.toFixed(2)} m`; // Round the distance to 2 decimal places
}

// Use window.onload to ensure the DOM is loaded before running the code
window.onload = function() {
  // Call WatchLocation to start tracking the user location
  WatchLocation();

  // Create a new element for the distance and append it to the outer div
  const outer = document.getElementById("outer");
  const distancewatch = document.createElement("p");
  distancewatch.id = "distancewatch";
  outer.appendChild(distancewatch);
}
