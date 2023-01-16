const reservationFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the reservation form
    const dateReserve = document.querySelector('#date-reserve').value.trim();
    const dateLength = document.querySelector('#length-reserve').value.trim();
  
    if (dateReserve && dateLength) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/userRoutes/reservation', {
        method: 'POST',
        body: JSON.stringify({ dateReserve, dateLength }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/reservation');
      } else {
        alert('Failed to create project');
      }
    }
};

document
.querySelector('.reservation-form')
.addEventListener('submit', reservationFormHandler);
