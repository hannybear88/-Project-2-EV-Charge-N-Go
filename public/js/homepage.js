// get the charging stations from the custom data attribute (in JSON format)
const stationsJS = document.querySelector("#map").dataset.stations;
const stations = JSON.parse(stationsJS);
var geocoder;
var map;
// icon images for different plug-in types
const marker_icons = [
  "/assets/icons/blu-blank.png", // blue
  "/assets/icons/ylw-blank.png", // yellow
  "/assets/icons/grn-blank.png", // green
  "/assets/icons/pink-blank.png", // pink
];
const plug_in_types = [
  "J1772",
  "Tesla",
  "CCS",
  "CHAdeMO",
];

// marker labels for different station types
const marker_labels = [
  "1",
  "2",
  "D",
];
const station_types = [
  "Level-1",
  "Level-2",
  "DC-FastCharging",
];

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
        icon: {
          url: marker_icons[plug_in_types.indexOf(stations[i].plug_in_type)],
          size: new google.maps.Size(44, 50),
          scaledSize: new google.maps.Size(44, 50),
          labelOrigin: new google.maps.Point(22, 15),
        },
        label: {
          text: marker_labels[station_types.indexOf(stations[i].station_type)], 
          fontSize:"20px",
        },
    });
    const address = stations[i].address + ", " + stations[i].city + ", " + stations[i].state + " " + stations[i].zip;

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <h4>${stations[i].name}</h4>
        <button class="btn btn-outline-light btn-sm mb-2" onclick="window.location.href='/newReservation/${stations[i].id}'">Reserve Station</button>
        <h6>Station Type: ${stations[i].station_type}</h6>
        <h6>Plug-in Type: ${stations[i].plug_in_type}</h6>
        <h6>Address: ${address}</h6>
        `,
    });
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
}

document.querySelector("#address-form").addEventListener("submit", moveMapCenter);
