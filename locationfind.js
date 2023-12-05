// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.watchPosition(
    // Success callback function
    function(position) {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Update the map with the user's new location
      console.log(`Latitude: ${lat}, longitude: ${lng}`);
    },
    // Error callback function
    function(error) {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}

// Define a function to show the position
function showPosition(position) {
  // Get the element where the coordinates will be displayed
  const x = document.getElementById("coords");

  // Update the element's innerHTML with the latitude and longitude
  x.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
}

// Define a function to get the location
function getLocation() {
  if (navigator.geolocation) {
    // Call the watchPosition method with the showPosition function as the success callback
    navigator.geolocation.watchPosition(showPosition, (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    });
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }
}

// Call the getLocation function when the window loads
window.onload = getLocation;
