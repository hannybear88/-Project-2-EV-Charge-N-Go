var geocoder;
var map;


function addMarkers(event) {
    event.preventDefault();
    const address = document.querySelector('#addressInput').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
            return;
        }
    });
    // var marker = new google.maps.Marker({
    //     position: {lat: 32.8179, lng: -117.1556},
    //     map: map,
    //     icon: "http://maps.google.com/mapfiles/kml/paddle/J.png"
    // });

    // var infoWindow = new google.maps.InfoWindow({
    //     content: `
    //         <h4>Heidi\'s Tesla Charging Station</h4>
    //         <h6>Charger Type: Tesla</h6>
    //         <h6>Level Type: Level 2</h6>
    //         <h6>Address: 1234 Main St, San Diego, CA 92101</h6>
    //         <h6>Accumulated reservations: 88</h6>
    //         `
    // });

    // marker.addListener('click', function(){
    //     infoWindow.open(map, marker);
    // });
}

// call back funtion for Google Map API (which is invoked in homepage.handlebars)
function initMap() {
    // initialize geocoder
    geocoder = new google.maps.Geocoder();
    // default location for displying map
    var latlng = new google.maps.LatLng(32.7157, -117.1611);
    var mapOptions = {
      zoom: 11,
      center: latlng
    }
    // display map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

document
    .querySelector('#address-form')
    .addEventListener('submit', addMarkers);