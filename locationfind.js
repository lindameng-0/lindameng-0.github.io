// locationfind.js
function geoFindMe() {
    const status = document.querySelector("#status");
    const coords = document.querySelector("#coords");
  
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
      return navigator.geolocation.watchPosition(success, error);
    }
  }
  
  document.querySelector("#find-me").addEventListener("click", function() {
    let id = geoFindMe(); // store the watch ID in a variable
    document.querySelector("#stop-tracking").addEventListener("click", function() {
      navigator.geolocation.clearWatch(id); // clear the watch when the button is clicked
      status.textContent = "Location tracking stopped";
      coords.textContent = "";
    });
  });
