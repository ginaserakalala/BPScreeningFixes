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


      // Populate the oral health form with the search results
      document.getElementById('screening-id').value = data.screeningID;

       // Dental Caries
               if (data.dentalCaries === 'yes') {
                   document.getElementById('dentalcariesYes').checked = true;
               } else if (data.dentalCaries === 'no') {
                   document.getElementById('dentalcariesNo').checked = true;
               }

               // Dental Caries Severity
               const dentalCariesSeveritySelect = document.getElementById('dentalcariesSeverity');
               for (let i = 0; i < dentalCariesSeveritySelect.options.length; i++) {
                   if (dentalCariesSeveritySelect.options[i].value === data.dentalCariesSeverity) {
                       dentalCariesSeveritySelect.options[i].selected = true;
                       break;
                   }
               }

               // Gum Disease
               if (data.gumDisease === 'yes') {
                   document.getElementById('gumdiseaseYes').checked = true;
               } else if (data.gumDisease === 'no') {
                   document.getElementById('gumdiseaseNo').checked = true;
               }

               // Gum Disease Severity
               const gumDiseaseSeveritySelect = document.getElementById('gumdiseaseSeverity');
               for (let i = 0; i < gumDiseaseSeveritySelect.options.length; i++) {
                   if (gumDiseaseSeveritySelect.options[i].value === data.gumDiseaseSeverity) {
                       gumDiseaseSeveritySelect.options[i].selected = true;
                       break;
                   }
               }

               // Thrush Sores
               if (data.thrushSores === 'yes') {
                   document.getElementById('thrushYes').checked = true;
               } else if (data.thrushSores === 'no') {
                   document.getElementById('thrushNo').checked = true;
               }

               // Thrush Sores Severity
               const thrushSoresSeveritySelect = document.getElementById('thrushSeverity');
               for (let i = 0; i < thrushSoresSeveritySelect.options.length; i++) {
                   if (thrushSoresSeveritySelect.options[i].value === data.thrushSoresSeverity) {
                       thrushSoresSeveritySelect.options[i].selected = true;
                       break;
                   }
               }

               // Other Abnormality
               if (data.otherAbnormality === 'yes') {
                   document.getElementById('otherAbnormalityYes').checked = true;
               } else if (data.otherAbnormality === 'no') {
                   document.getElementById('otherAbnormalityNo').checked = true;
               }

               // Other Abnormality Severity
               const otherAbnormalitySeveritySelect = document.getElementById('otherAbnormalitySeverity');
               for (let i = 0; i < otherAbnormalitySeveritySelect.options.length; i++) {
                   if (otherAbnormalitySeveritySelect.options[i].value === data.otherAbnormalitySeverity) {
                       otherAbnormalitySeveritySelect.options[i].selected = true;
                       break;
                   }
               }

               // Teeth Staining
               if (data.teethStaining === 'yes') {
                   document.getElementById('teethStainingYes').checked = true;
               } else if (data.teethStaining === 'no') {
                   document.getElementById('teethStainingNo').checked = true;
               }

               // Teeth Staining Severity
               const teethStainingSeveritySelect = document.getElementById('teethStainingSeverity');
               for (let i = 0; i < teethStainingSeveritySelect.options.length; i++) {
                   if (teethStainingSeveritySelect.options[i].value === data.teethStainingSeverity) {
                       teethStainingSeveritySelect.options[i].selected = true;
                       break;
                   }
               }

               // Screening Results
               const screeningResultSelect = document.getElementById('screeningresult');
               for (let i = 0; i < screeningResultSelect.options.length; i++) {
                   if (screeningResultSelect.options[i].value === data.screeningResult) {
                       screeningResultSelect.options[i].selected = true;
                       break;
                   }
               }
      document.getElementById('exampleFormControlTextarea1').value = data.additionalComments;
    }
  if(!response.ok) {
      alert("Error searching for screening ID");
    console.error('Error searching for screening ID');
  }
});


// Add an event listener to the update button
document.getElementById('update-btn').addEventListener('click', async () => {
  // Get the oral health form data

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
    const screeningID = document.getElementById('screening-id').value;
  // Create a JSON payload
  const payload = {

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
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/oralhealth/${screeningID}`, {
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
      console.error('Error updating oral health data');
  }

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


