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
    const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/eyes/check-screening-id?screeningID=${screeningID}`);

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
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/eyes/${searchInput}`);

  // Check if the response was successful
  if (response.ok) {
    const data = await response.json();



      // Populate the eyes form with the search results
      document.getElementById('screening-id').value = data.screeningID;

       // Discharge
              if (data.discharge === 'yes') {
                  document.getElementById('dischargeYes').checked = true;
              } else if (data.discharge === 'no') {
                  document.getElementById('dischargeNo').checked = true;
              }

              // Discharge Severity
              const dischargeSeveritySelect = document.getElementById('dischargeSeverity');
              for (let i = 0; i < dischargeSeveritySelect.options.length; i++) {
                  if (dischargeSeveritySelect.options[i].value === data.dischargeSeverity) {
                      dischargeSeveritySelect.options[i].selected = true;
                      break;
                  }
              }

              // Inflammation
              if (data.inflammation === 'yes') {
                  document.getElementById('inflammationYes').checked = true;
              } else if (data.inflammation === 'no') {
                  document.getElementById('inflammationNo').checked = true;
              }

              // Inflammation Severity
              const inflammationSeveritySelect = document.getElementById('inflammationSeverity');
              for (let i = 0; i < inflammationSeveritySelect.options.length; i++) {
                  if (inflammationSeveritySelect.options[i].value === data.inflammationSeverity) {
                      inflammationSeveritySelect.options[i].selected = true;
                      break;
                  }
              }

              // Squint
              if (data.squint === 'yes') {
                  document.getElementById('squintYes').checked = true;
              } else if (data.squint === 'no') {
                  document.getElementById('squintNo').checked = true;
              }

              // Squint Severity
              const squintSeveritySelect = document.getElementById('squintSeverity');
              for (let i = 0; i < squintSeveritySelect.options.length; i++) {
                  if (squintSeveritySelect.options[i].value === data.squintSeverity) {
                      squintSeveritySelect.options[i].selected = true;
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

              // Wears Glasses
              if (data.wearsGlasses === 'yes') {
                  document.getElementById('wearsGlassesYes').checked = true;
              } else if (data.wearsGlasses === 'no') {
                  document.getElementById('wearsGlassesNo').checked = true;
              }

              // Snellen Test
              const rightEyeSnellenSelect = document.getElementById('rightEyeSnellen');
              for (let i = 0; i < rightEyeSnellenSelect.options.length; i++) {
                  if (rightEyeSnellenSelect.options[i].value === data.rightEyeSnellen) {
                      rightEyeSnellenSelect.options[i].selected = true;
                      break;
                  }
              }

              const leftEyeSnellenSelect = document.getElementById('leftEyeSnellen');
              for (let i = 0; i < leftEyeSnellenSelect.options.length; i++) {
                  if (leftEyeSnellenSelect.options[i].value === data.leftEyeSnellen) {
                      leftEyeSnellenSelect.options[i].selected = true;
                      break;
                  }
              }
       if(data.eyeResultSnellen === 'yes'){
        document.getElementById('eyeResultSnellenYes').checked = true;
       }
       else if(data.eyeResultSnellen === 'no'){
        document.getElementById('eyeResultSnellenNo').checked  = true;
       }

       document.getElementById('od-sph').value =data.odSph;

                document.getElementById('od-cyl').value = data.odCyl;

               document.getElementById('od-axis').value = data.odAxis;

               document.getElementById('os-sph').value = data.osSph;

               document.getElementById('os-cyl').value = data.osCyl;

               document.getElementById('os-axis').value = data.osAxis;

                 document.getElementById('os-pd').value = data.osPd;

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
      alert('Error searching for screening id');
    console.error('Error searching for screening ID');
  }
});


// Add an event listener to the update button
document.getElementById('update-btn').addEventListener('click', async () => {
  // Get the eyes form data

  const discharge = document.getElementById('dischargeYes').checked ? 'yes' : 'no';
  const dischargeSeverity = document.getElementById('dischargeSeverity').value;
  const inflammation = document.getElementById('inflammationYes').checked ? 'yes' : 'no';
  const inflammationSeverity = document.getElementById('inflammationSeverity').value;
  const squint = document.getElementById('squintYes').checked ? 'yes' : 'no';
  const squintSeverity = document.getElementById('squintSeverity').value;
  const otherAbnormality = document.getElementById('otherAbnormalityYes').checked ? 'yes' : 'no';
  const otherAbnormalitySeverity = document.getElementById('otherAbnormalitySeverity').value;
  const wearsGlasses = document.getElementById('wearsGlassesYes').checked ? 'yes' : 'no';
  const rightEyeSnellen = document.getElementById('rightEyeSnellen').value;
  const leftEyeSnellen = document.getElementById('leftEyeSnellen').value;
  const eyeResultSnellen = document.getElementById('eyeResultSnellenYes').checked ? 'yes' : 'no';
  const odSph = document.getElementById('od-sph').value;
  const odCyl = document.getElementById('od-cyl').value;
  const odAxis = document.getElementById('od-axis').value;
  const osSph = document.getElementById('os-sph').value;
  const osCyl = document.getElementById('os-cyl').value;
  const osAxis = document.getElementById('os-axis').value;
  const osPd = document.getElementById('os-pd').value;
  const screeningResult = document.getElementById('screeningresult').value;
  const additionalComments = document.getElementById('exampleFormControlTextarea1').value;
    const screeningID = document.getElementById('screening-id').value;
  // Create a JSON payload
  const payload = {

    discharge: discharge,
    dischargeSeverity: dischargeSeverity,
    inflammation: inflammation,
    inflammationSeverity: inflammationSeverity,
    squint: squint,
    squintSeverity: squintSeverity,
    otherAbnormality: otherAbnormality,
    otherAbnormalitySeverity: otherAbnormalitySeverity,
    wearsGlasses: wearsGlasses,
    rightEyeSnellen: rightEyeSnellen,
    leftEyeSnellen: leftEyeSnellen,
    eyeResultSnellen: eyeResultSnellen,
    odSph: odSph,
    odCyl: odCyl,
    odAxis: odAxis,
    osSph: osSph,
    osCyl: osCyl,
    osAxis: osAxis,
    osPd: osPd,
    screeningResult: screeningResult,
    additionalComments: additionalComments,
  };

  // Make a PUT request to the API to update the eyes data
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/eyes/${screeningID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Check if the response was successful
  if (response.ok) {
    alert('Eyes data updated successfully!');
  }
   else {
      console.error('Error updating eyes data');
   }


  });

// Select the form
const eyesForm = document.getElementById('eyes-form');

if (eyesForm) {
  // On form submit, perform validation
  eyesForm.addEventListener('submit', async (event) => {
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
    validateCheckboxGroup('discharge');
    validateCheckboxGroup('inflammation');
    validateCheckboxGroup('squint');
    validateCheckboxGroup('otherAbnormality');
    validateCheckboxGroup('wearsGlasses');
    validateCheckboxGroup('eyeResultSnellen');

    // If there are errors, prevent form submission
    if (hasErrors) {
      alert('Please fix the issues before submitting the form.');
      warningText.style.display = 'inline';
      return;
    }

    // If no errors, proceed with form submission logic
    try {
      const screeningID = document.getElementById('screening-id').value;

      const discharge = document.getElementById('dischargeYes').checked;
      const dischargeSeverity = document.getElementById('dischargeSeverity').value || 'null';


      const inflammation = document.getElementById('inflammationYes').checked;
      const inflammationSeverity = document.getElementById('inflammationSeverity').value || 'null';

      const squint = document.getElementById('squintYes').checked;
      const squintSeverity = document.getElementById('squintSeverity').value || 'null';

      const otherAbnormality = document.getElementById('otherAbnormalityYes').checked;
      const otherAbnormalitySeverity = document.getElementById('otherAbnormalitySeverity').value || 'null';

      const rightEyeODSPH = document.getElementById('od-sph').value || null;
      const rightEyeODCYL = document.getElementById('od-cyl').value || null;
      const rightEyeODAXIS = document.getElementById('od-axis').value || null;

      const leftEyeOSSPH = document.getElementById('os-sph').value || null;
      const leftEyeOSCYL = document.getElementById('os-cyl').value || null;
      const leftEyeOSAXIS = document.getElementById('os-axis').value || null;

      const bothEyesPD = document.getElementById('os-pd').value || null;

      const wearsGlasses = document.getElementById('wearsGlassesYes').checked;
      let wearsGlassesRightSnellenTest = null;
      let wearsGlassesLeftSnellenTest = null;

      let wearsNoGlassesRightSnellenTest = null;
      let wearsNoGlassesLeftSnellenTest = null;

      if (wearsGlasses) {
        wearsGlassesRightSnellenTest = document.getElementById('rightEyeSnellen').value || null;
        wearsGlassesLeftSnellenTest = document.getElementById('leftEyeSnellen').value || null;
      } else {
        wearsNoGlassesRightSnellenTest = document.getElementById('rightEyeSnellen').value || null;
        wearsNoGlassesLeftSnellenTest = document.getElementById('leftEyeSnellen').value || null;
      }

      const screeningResults = document.getElementById('screeningresult')?.value || null;
      const additionalComments = document.getElementById('exampleFormControlTextarea1')?.value || null;

      // Get the user's ID from local storage
      const userID = localStorage.getItem('userID');


      const payload = {
        screeningID,
        discharge,
        dischargeSeverity,
        inflammation,
        inflammationSeverity,
        squint,
        squintSeverity,
        otherAbnormality,
        otherAbnormalitySeverity,
        rightEyeODSPH,
        rightEyeODCYL,
        rightEyeODAXIS,
        leftEyeOSSPH,
        leftEyeOSCYL,
        leftEyeOSAXIS,
        bothEyesPD,
        wearsGlasses,
        wearsGlassesRightSnellenTest,
        wearsGlassesLeftSnellenTest,
        wearsNoGlassesRightSnellenTest,
        wearsNoGlassesLeftSnellenTest,
        screeningResults,
        additionalComments,
        userID
      };

      const response = await fetch('https://bp-prod-app-a15e414be88d.herokuapp.com/api/eyes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Error submitting form: ${response.statusText}`);
        alert('An error occurred. Please try again.');
        return;
      }

      alert('Eyes Form submitted successfully. Please press OK to continue!');
      location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  });

  // Add event listeners to hide warnings dynamically as the user selects Yes/No
  ['discharge', 'inflammation', 'squint', 'otherAbnormality', 'wearsGlasses','eyeResultSnellen'].forEach((groupName) => {
    document.getElementById(`${groupName}Yes`).addEventListener('change', () => {
      document.getElementById(`${groupName}-warning`).style.display = 'none';
    });
    document.getElementById(`${groupName}No`).addEventListener('change', () => {
      document.getElementById(`${groupName}-warning`).style.display = 'none';
    });
  });
}

const eyeResultSnellenYes = document.getElementById('eyeResultSnellenYes');
const eyeResultSnellenNo = document.getElementById('eyeResultSnellenNo');
const eyeTestFailedFields = document.getElementById('eye-test-failed-fields');

eyeResultSnellenYes.addEventListener('change', () => {
  if (eyeResultSnellenYes.checked) {
    eyeResultSnellenNo.checked = false;
    eyeTestFailedFields.style.display = 'block';

    // Add required attribute to textboxes
    const textboxes = eyeTestFailedFields.querySelectorAll('input[type="text"], input[type="number"]');
    textboxes.forEach(textbox => textbox.required = true);
  } else {
    eyeTestFailedFields.style.display = 'none';

    // Remove required attribute from textboxes
    const textboxes = eyeTestFailedFields.querySelectorAll('input[type="text"], input[type="number"]');
    textboxes.forEach(textbox => textbox.required = false);
  }
});

eyeResultSnellenNo.addEventListener('change', () => {
  if (eyeResultSnellenNo.checked) {
    eyeResultSnellenYes.checked = false;
    eyeTestFailedFields.style.display = 'none';

    // Remove required attribute from textboxes
    const textboxes = eyeTestFailedFields.querySelectorAll('input[type="text"], input[type="number"]');
    textboxes.forEach(textbox => textbox.required = false);
  } else {
    eyeTestFailedFields.style.display = 'none';
  }
});
