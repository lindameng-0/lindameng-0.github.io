if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    function(position) {
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

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, function(error) {
      console.error("Error getting user location:", error);
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const x = document.getElementById("coords");

  x.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
}

window.addEventListener("load", getLocation);
