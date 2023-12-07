function getLocation() {
  if (navigator.geolocation) {
    // Call getCurrentPosition once to get the initial location
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        showPosition(position); // Call showPosition to update the coordinates on the screen
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

    // Set a timer to call getCurrentPosition every 1 sec
    setInterval(function() {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log(`Latitude: ${lat}, longitude: ${lng}`);
          showPosition(position); // Call showPosition to update the coordinates on the screen
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
    }, 1000); // 1 sec interval
  } else {
    const x = document.getElementById("coords");
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const x = document.getElementById("coords");

  x.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
}

window.addEventListener("load", getLocation);


function getLocation() {
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
}

window.addEventListener("load", getLocation);

