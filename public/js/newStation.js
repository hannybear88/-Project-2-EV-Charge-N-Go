// // // Function to call time.
// // let startTime = document.getElementById('startTime');
// // let endTime = document.getElementById('endtime');
const station_name = document.getElementById('Station_name').value;
const station_address = document.getElementById('station_address').value;
const station_city = document.getElementById('Station_city').value;
const station_state = document.getElementById('Station_state').value;
const station_zip = document.getElementById('Station_zip').value;
const station_type = document.getElementById('Station_type');
const plug_in_type = document.getElementById('plug_in_type');

 console.log(station_address);
function initMap() { 
    // initialize geocoder
    geocoder = new google.maps.Geocoder();
};


// Function for Submit
function registerNewStation(event){
    event.preventDefault();
   
    const address = station_address + ', ' + station_city + ', ' + station_state + ' ' + station_zip;
    console.log(address );
//   geocoder.geocode({ address: address }, function (results, status) {
//     if (status == "OK") {
//       map.setCenter(results[0].geometry.location);
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//       return;
//     }
//   });
}
// Eventlistener submit
document.querySelector(".newStation-form").addEventListener("submit", registerNewStation);