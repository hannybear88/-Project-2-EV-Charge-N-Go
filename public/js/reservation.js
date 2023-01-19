const reservationFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the reservation form
    //const station_id = document.querySelector('#pickstation').value.trim();
    const station_id = document.querySelector('#info-store').dataset.stationid.trim();
    const reservation_date = document.querySelector('#date-reserve').value.trim();
    const reservation_time = document.querySelector('#length-reserve').value.trim();
    const user_id = document.querySelector('#info-store').dataset.userid.trim();
  console.log(station_id);
  console.log(reservation_date);
  console.log(reservation_time);
  console.log(user_id);
  

    if (station_id && reservation_date && reservation_time) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/reservations`, {
        method: 'POST',
        body: JSON.stringify({ reservation_date, reservation_time, station_id, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/'); // ****
      } else {
        alert('Failed to create reservation');
      }
    }
};

document
.querySelector('.reservation-form')
.addEventListener('submit', reservationFormHandler);
