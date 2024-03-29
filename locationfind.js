import { GPSKalmanFilter } from 'kalman_gps.js';

const kalman = new GPSKalmanFilter();

class GPSKalmanFilter {
  // Decay in m/s - 3 is a good number for walking pace, 
  // ideally change decay to 11 m/s for travel at 40kmh
  // or change to 25 m/s for travel at 100kmh
    constructor (decay = 3) {
      this.decay = decay
      this.variance = -1
      this.minAccuracy = 1
    }
    
    // Kalman filter processing for latitude and longitude
    //
    // lat = new measurement of latitude
    // lon = new measurement of longitude
    // accuracy = measurement of 1 standard deviation error in metres
    // timestampInMs = time of measurement from geolocation service
    // 
    // This returns a new filtered X Y geolocation
    //
    filter(lat, lon, accuracy, timestampInMs) {
      if (accuracy < this.minAccuracy) accuracy = this.minAccuracy
      //console.log('accuracy is',accuracy)
      
      // if variance < 0, object is unitialised, so initialise with current values
      if (this.variance < 0) {
        //console.log('initialised values')
        this.timestampInMs = timestampInMs
        this.lat = lat
        this.lon = lon
        this.variance = accuracy * accuracy
      } 

      // else apply Kalman filter methodology
      else {
        //console.log('applying kalman filtering now')
        const timeIncMs = timestampInMs - this.timestampInMs
        
        // time has moved on, so the uncertainty in the current position increases
        if (timeIncMs > 0) {
          this.variance += (timeIncMs * this.decay * this.decay) / 1000
          this.timestampInMs = timestampInMs
        }
        // TODO: USE VELOCITY INFORMATION HERE TO GET A BETTER ESTIMATE OF CURRENT POSITION ?

        
        // Kalman gain matrix K = Covarariance * Inverse(Covariance + MeasurementVariance)
        // NB: because K is dimensionless, it doesn't matter that variance has different units to lat and lon
        const _k = this.variance / (this.variance + (accuracy * accuracy))
        this.lat += _k * (lat - this.lat)
        this.lon += _k * (lon - this.lon)
      }
    }
  }
        // new Covarariance  m

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
