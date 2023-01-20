const station_type_El = document.getElementById('station-type');
const plug_in_type_El = document.getElementById('plug-in-type');
const user_id = document.getElementById('user-info').dataset.userId;

function initMap() { 
    // initialize geocoder
    geocoder = new google.maps.Geocoder();
};


// Function for Submit
function registerNewStation(event){
    event.preventDefault();
    // get inputs from form
    const station_name = document.getElementById('station-name').value;
    const station_address = document.getElementById('station-address').value;
    const station_city = document.getElementById('station-city').value;
    const station_state = document.getElementById('station-state').value;
    const station_zip = document.getElementById('station-zip').value;
    const station_type = station_type_El.options[station_type_El.selectedIndex].value;
    const plug_in_type = plug_in_type_El.options[plug_in_type_El.selectedIndex].value;
    // construct full address
    const address = station_address + ', ' + station_city + ', ' + station_state + ' ' + station_zip;
    // get lat and lng from address
    geocoder.geocode({ address: address }, async function (results, status) {
        if (status == "OK") {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();

            // Send a POST request to the API endpoint
            const response = await fetch(`/api/stations`, {
                method: 'POST',
                body: JSON.stringify({ 
                    name: station_name,
                    plug_in_type: plug_in_type,
                    station_type: station_type,
                    address: station_address,
                    city: station_city,
                    state: station_state,
                    zip: station_zip,
                    latitude: lat,
                    longitude: lng,
                    owner_id: user_id,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
                document.location.replace('/myStations');
            } else {
                alert('Failed to create reservation');
                return;
            }
        } else {
            alert("Geocode was not successful for the following reason: " + status);
            return;
        }
    });
}
// Eventlistener submit
document.querySelector(".newStation-form").addEventListener("submit", registerNewStation);