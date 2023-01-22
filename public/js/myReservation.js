const cancelReservationHandler = async (event) => {
  // do nothing if the user clicks on anything other than the cancel button
  if (!event.target.matches("#btn-cancel-reservation")) {
    return;
  }
  // Get the reservation ID from the button's data attribute
  const reservation_id = event.target.dataset.reservationId.trim();

  // Confirm with the user that they want to cancel the reservation
  const user_confirm = window.confirm(
    "Are you sure you want to cancel this reservation?"
  );
  if (!user_confirm) {
    return;
  }

  // Send a DELETE request to the API endpoint
  const response = await fetch(`/api/reservations/${reservation_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // If the response is OK, redirect the user to the myReservations page  
  if (response.ok) {
    document.location.replace("/myReservations");
  } else {
    alert("Failed to cancel reservation");
  }
};

document
  .querySelector("#reservations-container")
  .addEventListener("click", cancelReservationHandler);
