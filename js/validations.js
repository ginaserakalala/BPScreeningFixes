document.getElementById('screening-id').addEventListener('input', async function (event) {
  const screeningID = event.target.value; // Get the current value of the input field
  const messageElement = document.getElementById('screening-id-message'); // Element to show the message

  // Clear the message element if the field is empty or invalid
  if (!screeningID || screeningID.length !== 5) {
    messageElement.textContent = ''; // Clear the message
    messageElement.style.color = ''; // Reset styling
    return; // Exit early
  }

  try {
    // Make the GET request to the backend
    const response = await fetch(`/api/demographics/check-screening-id?screeningID=${screeningID}`);

    if (response.ok) {
      // Screening ID is available
      messageElement.textContent = 'Screening ID is available.';
      messageElement.style.color = 'green'; // Message in green
    } else if (response.status === 400) {
      // Screening ID already exists
      messageElement.textContent = 'Screening ID already exists.';
      messageElement.style.color = 'red'; // Message in red
    } else {
      // Handle other errors
      messageElement.textContent = 'Error checking Screening ID.';
      messageElement.style.color = 'orange'; // Message in orange
    }
  } catch (error) {
    // Handle network errors
    console.error('Error checking Screening ID:', error);
    messageElement.textContent = 'Error while connecting to the server.';
    messageElement.style.color = 'orange';
  }
});