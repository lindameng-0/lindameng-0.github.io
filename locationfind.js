
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    function(position) {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log(`Latitude: ${lat}, longitude: ${lng}`);
    },
    function(error) {
      console.error("Error getting user location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}