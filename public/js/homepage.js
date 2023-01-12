function initMap() {
    // Map options
    let options = {
        center: {lat: 32.7157, lng: -117.1611},
        zoom: 8
    };
    // New map
    let map = new google.maps.Map(document.getElementById('map'), options);

    
    var marker = new google.maps.Marker({
        position: {lat: 32.8179, lng: -117.1556},
        map: map,
        icon: "http://maps.google.com/mapfiles/kml/paddle/J.png"
    });

    var infoWindow = new google.maps.InfoWindow({
        content: `
            <h4>Heidi\'s Tesla Charging Station</h4>
            <h6>Charger Type: Tesla</h6>
            <h6>Level Type: Level 2</h6>
            <h6>Address: 1234 Main St, San Diego, CA 92101</h6>
            <h6>Accumulated reservations: 88</h6>
            `
    });

    marker.addListener('click', function(){
        infoWindow.open(map, marker);
    });
    // var marker = new google.maps.Marker({
    //     position: {lat: 32.918476, lng: -117.138237},
    //     map: map,
    //     icon: "http://maps.google.com/mapfiles/kml/paddle/T.png"
    // });
}