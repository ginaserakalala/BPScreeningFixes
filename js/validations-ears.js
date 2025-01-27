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
    const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/ears/check-screening-id?screeningID=${screeningID}`);

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
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/ears/${searchInput}`);

  // Check if the response was successful
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    // Check if the screening ID exists
    if (data.exists) {
      // Populate the ears form with the search results
      document.getElementById('screening-id').value = data.screeningId;
      document.getElementById('dischargeLeftYes').checked = data.dischargeLeft === 'yes';
      document.getElementById('dischargeLeftNo').checked = data.dischargeLeft === 'no';
      document.getElementById('dischargeRightYes').checked = data.dischargeRight === 'yes';
      document.getElementById('dischargeRightNo').checked = data.dischargeRight === 'no';
      document.getElementById('dischargeLeftSeverity').value = data.dischargeLeftSeverity;
      document.getElementById('dischargeRightSeverity').value = data.dischargeRightSeverity;
      document.getElementById('inflammationLeftYes').checked = data.inflammationLeft === 'yes';
      document.getElementById('inflammationLeftNo').checked = data.inflammationLeft === 'no';
      document.getElementById('inflammationRightYes').checked = data.inflammationRight === 'yes';
      document.getElementById('inflammationRightNo').checked = data.inflammationRight === 'no';
      document.getElementById('inflammationLeftSeverity').value = data.inflammationLeftSeverity;
      document.getElementById('inflammationRightSeverity').value = data.inflammationRightSeverity;
      document.getElementById('inflamedLeftYes').checked = data.inflamedLeft === 'yes';
      document.getElementById('inflamedLeftNo').checked = data.inflamedLeft === 'no';
      document.getElementById('inflamedRightYes').checked = data.inflamedRight === 'yes';
      document.getElementById('inflamedRightNo').checked = data.inflamedRight === 'no';
      document.getElementById('inflamedLeftSeverity').value = data.inflamedLeftSeverity;
      document.getElementById('inflamedRightSeverity').value = data.inflamedRightSeverity;
      document.getElementById('otherAbnormalityLeftYes').checked = data.otherAbnormalityLeft === 'yes';
      document.getElementById('otherAbnormalityLeftNo').checked = data.otherAbnormalityLeft === 'no';
      document.getElementById('otherAbnormalityRightYes').checked = data.otherAbnormalityRight === 'yes';
      document.getElementById('otherAbnormalityRightNo').checked = data.otherAbnormalityRight === 'no';
      document.getElementById('otherAbnormalityLeftSeverity').value = data.otherAbnormalityLeftSeverity;
      document.getElementById('otherAbnormalityRightSeverity').value = data.otherAbnormalityRightSeverity;
      document.getElementById('wearsHearingAidYes').checked = data.wearsHearingAid === 'yes';
      document.getElementById('wearsHearingAidNo').checked = data.wearsHearingAid === 'no';
      document.getElementById('oaeresultleft').value = data.oaeResultLeft;
      document.getElementById('oaeresultright').value = data.oaeResultRight;
      document.getElementById('refer-textbox-left-input').value = data.referCommentLeft;
      document.getElementById('refer-textbox-right-input').value = data.referCommentRight;
      document.getElementById('audiometerCheckYes').checked = data.audiometerCheck === 'yes';
      document.getElementById('audiometerCheckNo').checked = data.audiometerCheck === 'no';
      document.getElementById('audiometerCheckTypes').value = data.audiometerCheckType;
      document.getElementById('management').value = data.management;
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
  // Get the ears form data
  const screeningId = document.getElementById('screening-id').value;
  const dischargeLeft = document.getElementById('dischargeLeftYes').checked ? 'yes' : 'no';
  const dischargeRight = document.getElementById('dischargeRightYes').checked ? 'yes' : 'no';
  const dischargeLeftSeverity = document.getElementById('dischargeLeftSeverity').value;
  const dischargeRightSeverity = document.getElementById('dischargeRightSeverity').value;
  const inflammationLeft = document.getElementById('inflammationLeftYes').checked ? 'yes' : 'no';
  const inflammationRight = document.getElementById('inflammationRightYes').checked ? 'yes' : 'no';
  const inflammationLeftSeverity = document.getElementById('inflammationLeftSeverity').value;
  const inflammationRightSeverity = document.getElementById('inflammationRightSeverity').value;
  const inflamedLeft = document.getElementById('inflamedLeftYes').checked ? 'yes' : 'no';
  const inflamedRight = document.getElementById('inflamedRightYes').checked ? 'yes' : 'no';
  const inflamedLeftSeverity = document.getElementById('inflamedLeftSeverity').value;
  const inflamedRightSeverity = document.getElementById('inflamedRightSeverity').value;
  const otherAbnormalityLeft = document.getElementById('otherAbnormalityLeftYes').checked ? 'yes' : 'no';
  const otherAbnormalityRight = document.getElementById('otherAbnormalityRightYes').checked ? 'yes' : 'no';
  const otherAbnormalityLeftSeverity = document.getElementById('otherAbnormalityLeftSeverity').value;
  const otherAbnormalityRightSeverity = document.getElementById('otherAbnormalityRightSeverity').value;
  const wearsHearingAid = document.getElementById('wearsHearingAidYes').checked ? 'yes' : 'no';
  const oaeResultLeft = document.getElementById('oaeresultleft').value;
  const oaeResultRight = document.getElementById('oaeresultright').value;
  const referCommentLeft = document.getElementById('refer-textbox-left-input').value;
  const referCommentRight = document.getElementById('refer-textbox-right-input').value;
  const audiometerCheck = document.getElementById('audiometerCheckYes').checked ? 'yes' : 'no';
  const audiometerCheckType = document.getElementById('audiometerCheckTypes').value;
  const management = document.getElementById('management').value;
  const screeningResult = document.getElementById('screeningresult').value;
  const additionalComments = document.getElementById('exampleFormControlTextarea1').value;

  // Create a JSON payload
  const payload = {
    screeningId: screeningId,
    dischargeLeft: dischargeLeft,
    dischargeRight: dischargeRight,
    dischargeLeftSeverity: dischargeLeftSeverity,
    dischargeRightSeverity: dischargeRightSeverity,
    inflammationLeft: inflammationLeft,
    inflammationRight: inflammationRight,
    inflammationLeftSeverity: inflammationLeftSeverity,
    inflammationRightSeverity: inflammationRightSeverity,
    inflamedLeft: inflamedLeft,
    inflamedRight: inflamedRight,
    inflamedLeftSeverity: inflamedLeftSeverity,
    inflamedRightSeverity: inflamedRightSeverity,
    otherAbnormalityLeft: otherAbnormalityLeft,
    otherAbnormalityRight: otherAbnormalityRight,
    otherAbnormalityLeftSeverity: otherAbnormalityLeftSeverity,
    otherAbnormalityRightSeverity: otherAbnormalityRightSeverity,
    wearsHearingAid: wearsHearingAid,
    oaeResultLeft: oaeResultLeft,
    oaeResultRight: oaeResultRight,
    referCommentLeft: referCommentLeft,
    referCommentRight: referCommentRight,
    audiometerCheck: audiometerCheck,
    audiometerCheckType: audiometerCheckType,
    management: management,
    screeningResult: screeningResult,
    additionalComments: additionalComments,
  };

  // Make a PUT request to the API to update the ears data
  const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/ears/${screeningId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Check if the response was successful
  if (response.ok) {
    alert('Ears data updated successfully!');
  } else {
  alert("Error updating ears data. Please try again.")
  }
    console.error('Error updating ears data');
  });

const earsForm = document.getElementById('ears-form');
if (earsForm) {
  earsForm.addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
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
    validateCheckboxGroup('dischargeLeft');
    validateCheckboxGroup('dischargeRight');
    validateCheckboxGroup('inflammationLeft');
    validateCheckboxGroup('inflammationRight');
    validateCheckboxGroup('inflamedLeft');
    validateCheckboxGroup('inflamedRight');
    validateCheckboxGroup('otherAbnormalityLeft');
    validateCheckboxGroup('otherAbnormalityRight');
    validateCheckboxGroup('wearsHearingAid');
    validateCheckboxGroup('audiometerCheck');


    // If there are errors, prevent form submission
    if (hasErrors) {
      alert('Please fix the issues before submitting the form.');
      warningText.style.display = 'inline';
      return;
    }


    try {
      // Get the screening ID
      const screeningID = document.getElementById('screening-id').value;

      // Discharge Left
      const dischargeLeft = document.getElementById('dischargeLeftYes').checked;
      // Discharge Right
      const dischargeRight = document.getElementById('dischargeRightYes').checked;

      // // Discharge Severity
      // const dischargeSeverity = document.getElementById('dischargeLeftSeverity')?.value ||
      //     document.getElementById('dischargeRightSeverity')?.value || "";


      const dischargeRightSeverity = document.getElementById('dischargeRightSeverity').value || 'null';
      const dischargeLeftSeverity = document.getElementById('dischargeLeftSeverity').value || 'null';
      const management = document.getElementById('management').value || 'null';

      const audioMeterCheckType= document.getElementById('audiometerCheckTypes').value || 'null';

      const oaeresultRight = document.getElementById('oaeresultright').value || 'null';
      const oaeresultReferTextRight = document.getElementById('refer-textbox-right-input').value || 'null';
      const oaeresultLeft= document.getElementById('oaeresultleft').value || 'null';
      const oaeresultReferTextLeft = document.getElementById('refer-textbox-left-input').value || 'null';

      // Other abnormality
      const otherAbnormalityLeftYes = document.getElementById('otherAbnormalityLeftYes').checked;

      // Other abnormality
      const otherAbnormalityLeftNo = document.getElementById('otherAbnormalityLeftNo').checked;
      // Other abnormality
      const otherAbnormalityLeftSeverity = document.getElementById('otherAbnormalityLeftSeverity').value;
      const otherAbnormalityRightSeverity = document.getElementById('otherAbnormalityRightSeverity').value;

      // Wax Impaction Left
      const waxImpactionLeft = document.getElementById('inflammationLeftYes').checked;
      // Wax Impaction Right
      const waxImpactionRight = document.getElementById('inflammationRightYes').checked;

      const inflammationLeftSeverity = document.getElementById('inflammationLeftSeverity').value || 'null';
      const inflammationRightSeverity = document.getElementById('inflammationRightSeverity').value || 'null';

      // Wax Impaction Severity
      // const waxImpactionSeverity = document.getElementById('inflammationLeftSeverity')?.value ||
      //     document.getElementById('inflammationRightSeverity')?.value || "";

      // Inflamed Eardrum Left
      const inflamedEarDrumLeft = document.getElementById('inflamedLeftYes').checked;
      // Inflamed Eardrum Right
      const inflamedEarDrumRight = document.getElementById('inflamedRightYes').checked;

      const audioMeterCheckYes = document.getElementById('audiometerCheckYes').checked;
      const audioMeterCheckNo= document.getElementById('audiometerCheckNo').checked;
      // Inflamed Eardrum Severity
      // const inflamedEarDrumSeverity = document.getElementById('inflamedLeftSeverity')?.value ||
      //     document.getElementById('inflamedRightSeverity')?.value || "";

      const inflamedLeftSeverity = document.getElementById('inflamedLeftSeverity').value || 'null';
      const inflamedRightSeverity = document.getElementById('inflamedRightSeverity').value || 'null';
      // Wears Hearing Aid
      const wearsHearingAid = document.getElementById('wearsHearingAidYes').checked;

      // Screening Results
      const screeningResults = document.getElementById('screeningresult')?.value || null;

      // Additional Comments
      const additionalComments = document.getElementById('exampleFormControlTextarea1')?.value || "";

      // Get the user's ID from local storage
      const userID = localStorage.getItem('userID');

      // Create a JSON payload matching the EarsDto structure
      const payload = {
        screeningID,
        dischargeLeft,             // Boolean: true if "Yes" is selected, otherwise false
        dischargeRight,            // Boolean: true if "Yes" is selected, otherwise false
        dischargeLeftSeverity,         // String: combined severity for discharge
        dischargeRightSeverity,         // String: combined severity for discharge
        waxImpactionLeft,          // Boolean: true if "Yes" is selected
        waxImpactionRight,         // Boolean: true if "Yes" is selected
        inflammationLeftSeverity,      // String: combined severity for wax impaction
        inflammationRightSeverity,      // String: combined severity for wax impaction
        inflamedEarDrumLeft,       // Boolean: true if "Yes" is selected
        inflamedEarDrumRight,      // Boolean: true if "Yes" is selected
        inflamedLeftSeverity,   // String: combined severity for inflamed eardrum
        inflamedRightSeverity,
        otherAbnormalityLeftYes,
        otherAbnormalityLeftNo,
        otherAbnormalityRightSeverity,
        otherAbnormalityLeftSeverity,// String: combined severity for inflamed eardrum
        wearsHearingAid,           // Boolean: true if "Yes" is selected
        additionalComments,        // String: text input for additional comments
        screeningResults,
        management,
        audioMeterCheckYes,
        audioMeterCheckNo,
        audioMeterCheckType,
        oaeresultRight,
        oaeresultReferTextRight,
        oaeresultLeft,
        oaeresultReferTextLeft,
        userID
      };

      // Send POST request
      const response = await fetch('https://bp-prod-app-a15e414be88d.herokuapp.com/api/ears', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Stringify the JSON payload
      });

      // Handle response
      if (!response.ok) {
        console.error(`Error submitting ears screening form: ${response.statusText}`);
        alert('Failed to submit the form. Please try again.');
        return;
      }

      // Success alert and reload
      alert('Ears Screening Form submitted successfully! Please press OK to continue.');
      location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  });
  // Add event listeners to hide warnings dynamically as the user selects Yes/No
  ['dischargeLeft', 'dischargeRight', 'inflammationLeft', 'inflammationRight', 'inflamedLeft',
    'inflamedRight', 'otherAbnormalityLeft', 'otherAbnormalityRight',
    'wearsHearingAid','audiometerCheck'].forEach((groupName) => {
    document.getElementById(`${groupName}Yes`).addEventListener('change', () => {
      document.getElementById(`${groupName}-warning`).style.display = 'none';
      if(groupName === 'audiometerCheck'){
        if(this.checked){
          document.getElementById('audiometerLossCheckTypes').style.display = 'block';
        }
        else{
          document.getElementById('audiometerLossCheckTypes').style.display = 'none';
        }
      }
    });
    document.getElementById(`${groupName}No`).addEventListener('change', () => {
      document.getElementById(`${groupName}-warning`).style.display = 'none';
    });
  });
}

document.getElementById('oaeresultright').addEventListener('change', function() {
  if (this.value === 'Refer') {
    document.getElementById('refer-textbox-right').style.display = 'block';
  } else {
    document.getElementById('refer-textbox-right').style.display = 'none';
  }
});

document.getElementById('oaeresultleft').addEventListener('change', function() {
  if (this.value === 'Refer') {
    document.getElementById('refer-textbox-left').style.display = 'block';
  } else {
    document.getElementById('refer-textbox-left').style.display = 'none';
  }
});
