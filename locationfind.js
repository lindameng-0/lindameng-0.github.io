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
      // Use getCurrentPosition instead of watchPosition
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  // Call the geoFindMe function when the page loads
  window.onload = function() {
    let id = setInterval(geoFindMe, 1000); // call the function every 5 seconds
    document.querySelector("#stop-tracking").addEventListener("click", function() {
      clearInterval(id); // clear the interval when the button is clicked
      status.textContent = "Location tracking stopped";
      coords.textContent = "";
    });
  };
  
  