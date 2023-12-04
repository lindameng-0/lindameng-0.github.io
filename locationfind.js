function geoFindMe() {
  const status = document.getElementById("status");
  const coords = document.getElementById("coords");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "Location tracking started";
    coords.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating...";
    // Add a parameter to specify the options for the geolocation request
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    return navigator.geolocation.watchPosition(success, error, options);
  }
}

window.onload = function() {
  let id = geoFindMe(); // store the watch ID in a variable
  document.querySelector("#stop-tracking").addEventListener("click", function() {
    navigator.geolocation.clearWatch(id); // clear the watch when the button is clicked
    status.textContent = "Location tracking stopped";
    coords.textContent = "";
  });
};
