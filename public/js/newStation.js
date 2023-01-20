// // // Function to call time.
// // let startTime = document.getElementById('startTime');
// // let endTime = document.getElementById('endtime');
 function initMap() { 
    // initialize geocoder
    geocoder = new google.maps.Geocoder();
};


// Function for Submit
function registerNewStation(event){
    event.preventDefault();
   const station_name = document.getElementById('Station_name').value;
const station_address = document.querySelector("#station_address").value;
const station_city = document.querySelector("#station_city").value;
const station_state = document.querySelector("#station_state").value;
const station_zip = document.querySelector("#station_zip").value;
const station_type = document.getElementById("station_type");
const plug_in_type = document.getElementById('plug_in_type');
    const address = station_address + ', ' + station_city + ', ' + station_state + ' ' + station_zip;
    console.log(address );
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      console.log(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
      return;
    }
  });
}
// Eventlistener submit
document.querySelector(".newStation-form").addEventListener("submit", registerNewStation);