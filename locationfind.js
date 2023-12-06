function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        showPosition(position); // Call showPosition to update the coordinates on each change
      },
      function(error) {
        console.error("Error getting user location:", error);
      },
      {
        timeout: 5000,      // 5 seconds timeout
        maximumAge: 0   // 1 minute maximum age for cached position
      }
    );
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

/*
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
        timeout: 5000,      // 5 seconds timeout
        maximumAge: 0   // 1 minute maximum age for cached position
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
          timeout: 5000,      // 5 seconds timeout
          maximumAge: 0   // 1 minute maximum age for cached position
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
*/
