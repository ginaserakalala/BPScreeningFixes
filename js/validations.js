document.getElementById('screening-id').addEventListener('input', async function (event) {
  const screeningID = event.target.value; // Get the current value of the input field
  const messageElement = document.getElementById('screening-id-message'); // Element to show the message
  const submitButton = document.querySelector('form button[type="submit"]'); // Get the form submit button

  // Clear the message element if the field is empty or invalid
  if (!screeningID || screeningID.length !== 5) {
    messageElement.textContent = ''; // Clear the message
    messageElement.style.color = ''; // Reset styling
    if (submitButton) submitButton.disabled = true; // Disable submit button
    return; // Exit early
  }

  try {
    // Make the GET request to the backend
    const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/demographics/check-screening-id?screeningID=${screeningID}`);

    if (response.ok) {
      // Screening ID is available

      // messageElement.textContent = 'Screening ID is available.';
      // messageElement.style.color = 'green';
      if (submitButton) submitButton.disabled = false; // Enable submit button
    } else if (response.status === 400) {
      // Screening ID already exists
      messageElement.textContent = 'Screening ID already exists.';
      messageElement.style.color = 'red';
      if (submitButton) submitButton.disabled = true; // Disable submit button
    } else {
      // Handle other errors
      messageElement.textContent = 'Error checking Screening ID.';
      messageElement.style.color = 'orange';
      if (submitButton) submitButton.disabled = true; // Disable submit button
    }
  } catch (error) {
    // Handle network errors
    console.error('Error checking Screening ID:', error);
    messageElement.textContent = 'Error while connecting to the server.';
    messageElement.style.color = 'orange';
    if (submitButton) submitButton.disabled = true; // Disable submit button
  }
});


// Add an event listener to the search button
    document.getElementById('search-btn').addEventListener('click', async () => {
        // Get the search input value
        const searchInput = document.getElementById('search-input').value;

        // Make a GET request to the API to search for the screening ID
        const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/demographics/${searchInput}`);

        // Check if the response was successful
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            // Populate the demographics form with the search results
            document.getElementById('screening-id').value = data.screeningID;
            document.getElementById('first-name').value = data.firstName;
            document.getElementById('last-name').value = data.lastName;
            document.getElementById('dob').value = data.dateOfBirth;
            document.getElementById('grade').value = data.grade;
            document.getElementById('sex').value = data.sex;
            document.getElementById('age').value = data.age;
            document.getElementById('school-name').value = data.schoolName;
        } else {
            console.error('Error searching for screening ID');
        }
    });

    // Add an event listener to the update button
    document.getElementById('update-btn').addEventListener('click', async () => {
        // Get the demographics form data
        const screeningID = document.getElementById('screening-id').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const dateOfBirth = document.getElementById('dob').value;
        const grade = document.getElementById('grade').value;
        const sex = document.getElementById('sex').value;
        const age = document.getElementById('age').value;
        const schoolName = document.getElementById('school-name').value;

        // Create a JSON payload
        const payload = {
            screeningID: screeningID,
            firstName: firstName,
            lastName: lastName,
            grade: grade,
            age: age,
            sex: sex,
            dateOfBirth: dateOfBirth,
            schoolName: schoolName
        };

        // Make a PUT request to the API to update the demographics data
        const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/demographics/${screeningID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check if the response was successful
        if (response.ok) {
            alert('Demographics data updated successfully!');
        } else {
            console.error('Error updating demographics data');
        }
    });

// Check the user's role and conditionally render the search and update buttons
    const role= localStorage.getItem('role');
    if(role === 'admin'){
        // Render the search and update buttons
        document.getElementById('search-container').style.display='block';
        document.getElementById('update-btn').style.display = 'block';
    }
    else{
        // Hide the search and update buttons
        document.getElementById('search-container').style.display='none';
        document.getElementById('update-btn').style.display = 'none';
    }


     const demographicsForm = document.getElementById('demographics-form');

        if (demographicsForm) {
            demographicsForm.addEventListener('submit', async (event) => {
                // Prevent the default form submission behavior
                event.preventDefault();

                try {
                    // Get the form data
                    const screeningID = document.getElementById('screening-id').value;
                    const firstName = document.getElementById('first-name').value;
                    const lastName = document.getElementById('last-name').value;
                    const dateOfBirth = document.getElementById('dob').value;
                    const grade = document.getElementById('grade').value;
                    const sex = document.getElementById('sex').value;
                    const age = document.getElementById('age').value;
                    const schoolName = document.getElementById('school-name').value;

                    // Get the user's ID from local storage
                    const userID = localStorage.getItem('userID');

                    // Create a JSON payload
                    const payload = {
                        screeningID: screeningID,
                        firstName: firstName,
                        lastName: lastName,
                        grade: grade,
                        age: age,
                        sex: sex,
                        dateOfBirth: dateOfBirth,
                        schoolName: schoolName,
                        userID: userID
                    };
                    // Send a POST request to the demographics API endpoint
                    const response = await fetch('https://bp-prod-app-a15e414be88d.herokuapp.com/api/demographics', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    // Check if the response was successful
                    if (!response.ok) {
                        console.log(`Error submitting demographics form: ${response.statusText}`);
                    }

                    // Display a success message
                    alert('Demographics Form submitted! Please click OK to continue');

                    location.reload();
                } catch (error) {
                    // Log any errors
                    console.error(error);
                }
            });
        }





