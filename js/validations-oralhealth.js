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
    const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/oralhealth/check-screening-id?screeningID=${screeningID}`);

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



// Add an event listener to the search button
document.getElementById('search-btn').addEventListener('click', async () => {
  // Get the search input value
  const searchInput = document.getElementById('search-input').value;

  // Make a GET request to the API to search for the screening ID
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/oralhealth/${searchInput}`);

  // Check if the response was successful
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    // Check if the screening ID exists
    if (data.exists) {
      // Populate the oral health form with the search results
      document.getElementById('screening-id').value = data.screeningId;
      document.getElementById('dentalcariesYes').checked = data.dentalcaries === 'yes';
      document.getElementById('dentalcariesNo').checked = data.dentalcaries === 'no';
      document.getElementById('dentalcariesSeverity').value = data.dentalcariesSeverity;
      document.getElementById('gumdiseaseYes').checked = data.gumdisease === 'yes';
      document.getElementById('gumdiseaseNo').checked = data.gumdisease === 'no';
      document.getElementById('gumdiseaseSeverity').value = data.gumdiseaseSeverity;
      document.getElementById('thrushYes').checked = data.thrush === 'yes';
      document.getElementById('thrushNo').checked = data.thrush === 'no';
      document.getElementById('thrushSeverity').value = data.thrushSeverity;
      document.getElementById('otherAbnormalityYes').checked = data.otherAbnormality === 'yes';
      document.getElementById('otherAbnormalityNo').checked = data.otherAbnormality === 'no';
      document.getElementById('otherAbnormalitySeverity').value = data.otherAbnormalitySeverity;
      document.getElementById('teethStainingYes').checked = data.teethStaining === 'yes';
      document.getElementById('teethStainingNo').checked = data.teethStaining === 'no';
      document.getElementById('teethStainingSeverity').value = data.teethStainingSeverity;
      document.getElementById('screeningresult').value = data.screeningResult;
      document.getElementById('exampleFormControlTextarea1').value = data.additionalComments;
    } else {
      alert('Screening ID not found');
    }
  } else {
    console.error('Error searching for screening ID');
  }
});


// Add an event listener to the update button
document.getElementById('update-btn').addEventListener('click', async () => {
  // Get the oral health form data
  const screeningId = document.getElementById('screening-id').value;
  const dentalcaries = document.getElementById('dentalcariesYes').checked ? 'yes' : 'no';
  const dentalcariesSeverity = document.getElementById('dentalcariesSeverity').value;
  const gumdisease = document.getElementById('gumdiseaseYes').checked ? 'yes' : 'no';
  const gumdiseaseSeverity = document.getElementById('gumdiseaseSeverity').value;
  const thrush = document.getElementById('thrushYes').checked ? 'yes' : 'no';
  const thrushSeverity = document.getElementById('thrushSeverity').value;
  const otherAbnormality = document.getElementById('otherAbnormalityYes').checked ? 'yes' : 'no';
  const otherAbnormalitySeverity = document.getElementById('otherAbnormalitySeverity').value;
  const teethStaining = document.getElementById('teethStainingYes').checked ? 'yes' : 'no';
  const teethStainingSeverity = document.getElementById('teethStainingSeverity').value;
  const screeningResult = document.getElementById('screeningresult').value;
  const additionalComments = document.getElementById('exampleFormControlTextarea1').value;

  // Create a JSON payload
  const payload = {
    screeningId: screeningId,
    dentalcaries: dentalcaries,
    dentalcariesSeverity: dentalcariesSeverity,
    gumdisease: gumdisease,
    gumdiseaseSeverity: gumdiseaseSeverity,
    thrush: thrush,
    thrushSeverity: thrushSeverity,
    otherAbnormality: otherAbnormality,
    otherAbnormalitySeverity: otherAbnormalitySeverity,
    teethStaining: teethStaining,
    teethStainingSeverity: teethStainingSeverity,
    screeningResult: screeningResult,
    additionalComments: additionalComments,
  };

  // Make a PUT request to the API to update the oral health data
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/oralhealth/${screeningId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Check if the response was successful
  if (response.ok) {
    alert('Oral health data updated successfully!');
  } else {
  alert('Error updating oral health data. Please try again.')
  }
    console.error('Error updating oral health data');
  });

const oralHealthForm = document.getElementById('oral-health-form');
if (oralHealthForm) {
  oralHealthForm.addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Track if there are errors
    let hasErrors = false;

    // Function to validate checkbox groups
    function validateCheckboxGroup(groupName) {
      const yesCheckbox = document.getElementById(`${groupName}Yes`);
      const noCheckbox = document.getElementById(`${groupName}No`);
      const warningText = document.getElementById(`${groupName}-warning`);

      if (!yesCheckbox.checked && !noCheckbox.checked) {
        // If neither checkbox is checked, show the warning
        warningText.style.display = 'inline';
        hasErrors = true;
      } else {
        // If one checkbox is selected, hide the warning
        warningText.style.display = 'none';
      }
    }

    // Validate each checkbox group
    validateCheckboxGroup('dentalcaries');
    validateCheckboxGroup('gumdisease');
    validateCheckboxGroup('thrush');
    validateCheckboxGroup('otherAbnormality');
    validateCheckboxGroup('teethStaining');

    // If there are errors, prevent form submission
    if (hasErrors) {
      alert('Please fix the issues before submitting the form.');
      warningText.style.display = 'inline';
      return;
    }


    try {
      // Get the form data
      const screeningID = document.getElementById('screening-id').value;

      // Dental Caries
      const dentalCaries = document.getElementById('dentalcariesYes').checked; // Boolean (Yes/No)
      const dentalCariesSeverity = document.getElementById('dentalcariesSeverity')?.value || ''; // String
      const dentalCariesReferral = document.getElementById('dentalcariesReferral')?.value || ''; // String

      // Gum Disease
      const gumDisease = document.getElementById('gumdiseaseYes').checked; // Boolean (Yes/No)
      const gumDiseaseSeverity = document.getElementById('gumdiseaseSeverity')?.value || ''; // String
      const gumDiseaseReferral = document.getElementById('gumdiseaseReferral')?.value || ''; // String

      // Thrush or Sores
      const thrushSores = document.getElementById('thrushYes').checked; // Boolean (Yes/No)
      const thrushSoresSeverity = document.getElementById('thrushSeverity')?.value || ''; // String
      const thrushSoresReferral = document.getElementById('thrushReferral')?.value || ''; // String

      // Other Abnormalities
      const otherAbnormality = document.getElementById('otherAbnormalityYes').checked; // Boolean (Yes/No)
      const otherAbnormalitySeverity = document.getElementById('otherAbnormalitySeverity')?.value || ''; // String

      // Teeth Staining
      const teethStaining = document.getElementById('teethStainingYes').checked; // Boolean (Yes/No)
      const teethStainingSeverity = document.getElementById('teethStainingSeverity')?.value || 'N/A'; // String

      // Screening Results
      const screeningResults = document.getElementById('screeningresult')?.value || null;

      // Additional Comments
      const additionalComments = document.getElementById('exampleFormControlTextarea1')?.value || ''; // String

      // Get the user's ID from local storage
      const userID = localStorage.getItem('userID');

      // Create a JSON payload matching `OralHealthDto`
      const payload = {
        screeningID,                     // String
        dentalCaries,                   // Boolean
        dentalCariesSeverity,           // String
        dentalCariesReferral,           // String
        gumDisease,                     // Boolean
        gumDiseaseSeverity,             // String
        gumDiseaseReferral,             // String
        thrushSores,                    // Boolean
        thrushSoresSeverity,            // String
        thrushSoresReferral,            // String
        otherAbnormality,               // Boolean
        otherAbnormalitySeverity,       // String
        teethStaining,                  // Boolean
        teethStainingSeverity,          // String
        screeningResults,
        additionalComments,              // String
        userID
      };

      // Send a POST request to the Oral Health API endpoint
      const response = await fetch('https://bp-prod-app-a15e414be88d.herokuapp.com/api/oralhealth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the JSON payload
      });

      // Check if the response was successful
      if (!response.ok) {
        console.log(`Error submitting Oral Health form: ${response.statusText}`);
        alert('Failed to submit the Oral Health form. Please try again.');
        return;
      }

      // Display a success message
      alert('Oral Health Form submitted successfully! Please click OK to continue');

      location.reload();
    } catch (error) {
      // Log any errors
      console.error('Error occurred while submitting Oral Health form:', error);
      alert('An error occurred. Please try again.');

    }
  });
  // Add event listeners to hide warnings dynamically as the user selects Yes/No
  ['dentalcaries', 'gumdisease', 'thrush', 'otherAbnormality', 'teethStaining'].forEach((groupName) => {
    document.getElementById(`${groupName}Yes`).addEventListener('change', () => {
      document.getElementById(`${groupName}-warning`).style.display = 'none';
    });
    document.getElementById(`${groupName}No`).addEventListener('change', () => {
      document.getElementById(`${groupName}-warning`).style.display = 'none';
    });
  });
}


