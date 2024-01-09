navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});

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
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        showwatchPosition(position); // Call showPosition to update the coordinates on the screen
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

function showwatchPosition(position) {
    const x = document.getElementById("coordswatch");
  
    x.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
  
    // Loop over the locations array and calculate the distance to each one
    for (let location of locations) {
      // Get the fixed point coordinates
      const lat2 = location.lat;
      const lon2 = location.lon;
  
      // Calculate the distance using the haversine formula
      const distance = haversineDistance(position.coords.latitude, position.coords.longitude, lat2, lon2);
  
      // Convert the distance from km to m
      const distanceInMeters = distance * 1000;
  
      // Display the distance in a new element with the location name
      const y = document.getElementById(`distancewatch-${location.name}`);
      y.innerHTML += `Distance to ${location.name}: ${distanceInMeters.toFixed(2)} m<br>`; // Round the distance to 2 decimal places and add a line break
    }
  }

  window.addEventListener("load", WatchLocation);

  //v7