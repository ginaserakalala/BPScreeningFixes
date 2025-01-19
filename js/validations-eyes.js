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
      messageElement.textContent = 'Screening ID is available.';
      messageElement.style.color = 'green';
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
        additionalComments
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
