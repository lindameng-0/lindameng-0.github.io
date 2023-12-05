function geoFindMe() {
  const status = document.getElementById("status");
  const coords = document.getElementById("coords");

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "Location tracking started";
    coords.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    // Display the user's location on a map using the Maps JavaScript API
    // Create a map object and specify the DOM element for display
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    // Create a marker and set its position
    const marker = new google.maps.Marker({
      map: map,
      position: { lat: latitude, lng: longitude },
    });
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

window.onload = function () {
  let id = geoFindMe(); // store the watch ID in a variable
  document.querySelector("#stop-tracking").addEventListener("click", function () {
    navigator.geolocation.clearWatch(id); // clear the watch when the button is clicked
    status.textContent = "Location tracking stopped";
    coords.textContent = "";

    // Remove the map and the marker from the DOM
    document.getElementById("map").innerHTML = "";
  });
};
