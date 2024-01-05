/*if (navigator.geolocation) {
    var location_timeout = setTimeout("geolocFail()", 10000);

    // Use watchPosition instead of getCurrentPosition
    var watchID = navigator.geolocation.watchPosition(function(position) {
        clearTimeout(location_timeout);

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        // Display the coordinates in the html element with id "coords"
        var coords = document.getElementById("coords");
        coords.innerHTML = "Latitude: " + lat + ", Longitude: " + lng;

        geocodeLatLng(lat, lng);
    }, function(error) {
        clearTimeout(location_timeout);
        geolocFail();
    });
} else {
    // Fallback for no geolocation
    geolocFail();
}

// Add a function to stop watching the position
function stopWatch() {
    if (watchID) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}
*/
