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
        oaeresultReferTextLeft
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
