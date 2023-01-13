// get the charging stations from the custom data attribute (in JSON format)
const stationsJS = document.querySelector("#map").dataset.stations;
const stations = JSON.parse(stationsJS);
var geocoder;
var map;

function moveMapCenter(event) {
  event.preventDefault();

  // set the map center to the address input
  const address = document.querySelector("#addressInput").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
      return;
    }
  });

  
}

// call back funtion for Google Map API (which is invoked in homepage.handlebars)
function initMap() {
  
    // initialize geocoder
  geocoder = new google.maps.Geocoder();
  
  // default location for displying map
  var latlng = new google.maps.LatLng(32.7157, -117.1611); // San Diego
  
  // display map
  var mapOptions = {
    zoom: 11,
    center: latlng,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // add markers for each charging station
  for (i = 0; i < stations.length; i++) {
    const marker = new google.maps.Marker({
        map: map,
        position: { 
            lat: parseFloat(stations[i].latitude), 
            lng: parseFloat(stations[i].longitude) 
        },
        icon: "http://maps.google.com/mapfiles/kml/paddle/J.png",
    });
    const address = stations[i].address + ", " + stations[i].city + ", " + stations[i].state + " " + stations[i].zip;
    const infoWindow = new google.maps.InfoWindow({
      content: `
                    <h4>${stations[i].name}</h4>
                    <h6>Charger Type: ${stations[i].charger_type}</h6>
                    <h6>Level Type: ${stations[i].level_type}</h6>
                    <h6>Address: ${address}</h6>
                    <h6>Accumulated reservations: ${stations[i].reservation_counts}</h6>
                    `,
    });
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
}

document.querySelector("#address-form").addEventListener("submit", moveMapCenter);
