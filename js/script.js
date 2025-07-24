// Helper function to trigger sinking effect
function addSinkingEffect(element) {
    element.classList.add('sinking');
    // After the sinking effect, add 'sunk' to make it stay sunk
    setTimeout(() => {
        element.classList.add('sunk');
    }, 300); // Wait for the sinking transition to complete before adding 'sunk'
}

function showSuccessAlert() {
    alert("Data captured successfully. Click OK to finish.");
}

// Function for mutually exclusive Yes/No checkboxes
const setupMutuallyExclusiveCheckboxes = (yesCheckboxId, noCheckboxId) => {
    const yesCheckbox = document.getElementById(yesCheckboxId);
    const noCheckbox = document.getElementById(noCheckboxId);

    if (yesCheckbox && noCheckbox) {
        yesCheckbox.addEventListener("change", () => {
            if (yesCheckbox.checked) {
                noCheckbox.checked = false; // Uncheck "No"
            }
        });

        noCheckbox.addEventListener("change", () => {
            if (noCheckbox.checked) {
                yesCheckbox.checked = false; // Uncheck "Yes"
            }
        });
    } else {
        console.error(`Missing elements for IDs: ${yesCheckboxId} or ${noCheckboxId}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // Check if elements exist before adding event listeners
    const modalOkButton = document.getElementById('modal-ok-btn');
    const modalCancelButton = document.getElementById('modal-cancel-btn');
    const consentModal = document.getElementById('consent-modal');
    const consentCheckbox = document.getElementById('consent-confirmation');
    const demographicsBtn = document.getElementById('demographicsBtn');

    // Ensure the demographics button opens the consent modal
    if (demographicsBtn) {
        demographicsBtn.addEventListener('click', function () {
            if (consentModal) {
                consentModal.style.display = 'flex'; // Display the modal
            } else {
                console.error("Consent modal not found!");
            }
        });
    }

    // Disable the "OK" button initially until the checkbox is checked
    if (modalOkButton) {
        modalOkButton.disabled = true; // Disable OK button initially
        modalOkButton.classList.add('disabled'); // Apply CSS class to show disabled state

        // Add an event listener to the checkbox to enable the "OK" button
        if (consentCheckbox) {
            consentCheckbox.addEventListener('change', function () {
                if (this.checked) {
                    modalOkButton.disabled = false; // Enable OK button
                    modalOkButton.classList.remove('disabled'); // Remove disabled class
                } else {
                    modalOkButton.disabled = true; // Disable OK button again
                    modalOkButton.classList.add('disabled'); // Add disabled class back
                }
            });
        } else {
            console.error("Consent checkbox not found!");
        }
    } else {
        console.error("Modal OK button not found!");
    }

    // Handle "OK" button click in the modal
    if (modalOkButton) {
        modalOkButton.addEventListener('click', function (event) {
            // Check if the user confirmed consent
            event.preventDefault();
            if (consentCheckbox && consentCheckbox.checked) {
                // Add sinking effect for better feedback
                addSinkingEffect(modalOkButton);

                setTimeout(() => {
                    // Hide modal after action
                    if (consentModal) {
                        consentModal.style.display = 'none';
                    }
                    // Redirect to demographics page after a brief delay
                    window.location.href = '/pages/demographics.html';
                }, 300); // Delay for the sinking effect
            } else {
                alert("Please confirm the consent form before proceeding.");
            }
        });
    }

    // Handle "Cancel" button click in the modal
    if (modalCancelButton) {
        modalCancelButton.addEventListener('click', function () {
            addSinkingEffect(modalCancelButton); // Apply sinking effect for consistency

            setTimeout(() => {
                if (consentModal) {
                    consentModal.style.display = 'none'; // Hide the modal
                }
                console.log("User canceled the consent process.");
            }, 300); // Delay for the sinking effect
        });
    } else {
        console.error("Modal Cancel button not found!");
    }


    // *** Age calculation ***
    const dobInput = document.getElementById("dob");
    if (dobInput) {
        dobInput.addEventListener("change", function () {
            const dob = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const month = today.getMonth() - dob.getMonth();

            if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            document.getElementById("age").value = age;
        });
    }
// List of form IDs
//   const formIds = [
//     "demographics-form",
//     "ears-form",
//     "eyes-form",
//     "oral-health-form"
//   ];
//
//   // Generic form handler using `showSuccessAlert`
//   const setupFormSubmission = (formId) => {
//     const form = document.getElementById(formId);
//     if (form) {
//       form.addEventListener("submit", function (event) {
//         event.preventDefault(); // Prevent default form submission
//         showSuccessAlert(); // Call reusable success alert function
//         location.reload(); // Reload the page
//       });
//     } else {
//       console.warn(`Form with ID "${formId}" not found!`);
//     }
//   };
//
//   formIds.forEach(setupFormSubmission);



//    // Add an event listener to the search button
//    document.getElementById('search-btn').addEventListener('click', async () => {
//        // Get the search input value
//        const searchInput = document.getElementById('search-input').value;
//
//        // Make a GET request to the API to search for the screening ID
//        const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/demographics/${searchInput}`);
//
//        // Check if the response was successful
//        if (response.ok) {
//            const data = await response.json();
//            console.log(data);
//
//            // Populate the demographics form with the search results
//            document.getElementById('screening-id').value = data.screeningID;
//            document.getElementById('first-name').value = data.firstName;
//            document.getElementById('last-name').value = data.lastName;
//            document.getElementById('dob').value = data.dateOfBirth;
//            document.getElementById('grade').value = data.grade;
//            document.getElementById('sex').value = data.sex;
//            document.getElementById('age').value = data.age;
//            document.getElementById('school-name').value = data.schoolName;
//        } else {
//            console.error('Error searching for screening ID');
//        }
//    });
//
//    // Add an event listener to the update button
//    document.getElementById('update-btn').addEventListener('click', async () => {
//        // Get the demographics form data
//        const screeningID = document.getElementById('screening-id').value;
//        const firstName = document.getElementById('first-name').value;
//        const lastName = document.getElementById('last-name').value;
//        const dateOfBirth = document.getElementById('dob').value;
//        const grade = document.getElementById('grade').value;
//        const sex = document.getElementById('sex').value;
//        const age = document.getElementById('age').value;
//        const schoolName = document.getElementById('school-name').value;
//
//        // Create a JSON payload
//        const payload = {
//            screeningID: screeningID,
//            firstName: firstName,
//            lastName: lastName,
//            grade: grade,
//            age: age,
//            sex: sex,
//            dateOfBirth: dateOfBirth,
//            schoolName: schoolName
//        };
//
//        // Make a PUT request to the API to update the demographics data
//        const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/demographics/${screeningID}`, {
//            method: 'PUT',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(payload),
//        });
//
//        // Check if the response was successful
//        if (response.ok) {
//            alert('Demographics data updated successfully!');
//        } else {
//            console.error('Error updating demographics data');
//        }
//    });






    // *** Home button click handler ***
    const homeBtn = document.getElementById("home-btn");
    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "/pages/dashboard.html";
        });
    }


    const successHomeBtn = document.querySelector(".home-btn-success");
    if (successHomeBtn) {
        successHomeBtn.addEventListener("click", function () {
            window.location.href = "/pages/dashboard.html";
        });
    }

    // Define all conditions with associated severity dropdown IDs
    const oralHealthConditions = [
        {name: "dentalcaries", severityId: "dentalcaries-severity"},
        {name: "gumdisease", severityId: "gumdisease-severity"},
        {name: "thrush", severityId: "thrush-severity"},
        {name: "otherAbnormality", severityId: "otherAbnormality-severity"},
        {name: "teethStaining", severityId: "teeth-staining"}
    ];

// Loop through each condition and attach event listeners for checkboxes
    oralHealthConditions.forEach(({name, severityId}) => {
        // Get the checkboxes and severity dropdown (if applicable)
        const yesCheckbox = document.getElementById(`${name}Yes`);
        const noCheckbox = document.getElementById(`${name}No`);
        const severityDropdown = severityId ? document.getElementById(severityId) : null;

        // Ensure elements exist on the page
        if (yesCheckbox && noCheckbox) {
            // Add event listener for "Yes" checkbox
            yesCheckbox.addEventListener("change", () => {
                if (yesCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "block"; // Show severity dropdown
                        severityDropdown.required = true; // Make the dropdown required
                    }
                    noCheckbox.checked = false; // Uncheck "No" checkbox
                }
            });

            // Add event listener for "No" checkbox
            noCheckbox.addEventListener("change", () => {
                if (noCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "none"; // Hide severity dropdown
                        severityDropdown.required = false;
                    }
                    yesCheckbox.checked = false; // Uncheck "Yes" checkbox
                }
            });
        } else {
            console.error(`Could not find checkboxes for condition: ${name}`);
        }
    });

    // Get the checkboxes and the severity dropdown container
    // const teethStainingYes = document.getElementById('teethStainingYes');
    // const teethStainingNo = document.getElementById('teethStainingNo');
    // const teethStainingAbnormalityContainer = document.getElementById('teeth-staining');
    //
    // // Check if elements exist before adding event listeners
    // if (teethStainingYes && teethStainingNo && teethStainingAbnormalityContainer) {
    //   // Add event listener for "Yes" checkbox
    //   teethStainingYes.addEventListener('change', () => {
    //     if (teethStainingYes.checked) {
    //       teethStainingAbnormalityContainer.style.display = 'block'; // Show severity dropdown
    //       teethStainingNo.checked = false; // Uncheck "No" checkbox
    //     }
    //   });
    //
    //   // Add event listener for "No" checkbox
    //   teethStainingNo.addEventListener('change', () => {
    //     if (teethStainingNo.checked) {
    //       teethStainingAbnormalityContainer.style.display = 'none'; // Hide severity dropdown
    //       teethStainingYes.checked = false; // Uncheck "Yes" checkbox
    //     }
    //   });
    // } else {
    //   console.error("Could not find one or more elements: 'teethStainingYes', 'teethStainingNo', or 'teeth-staining'. Please check the HTML structure.");
    // }

    const eyesConditions = [
        {name: "discharge", severityId: "discharge-severity"},
        {name: "squint", severityId: "squint-severity"},
        {name: "inflammation", severityId: "inflammation-severity"},
        {name: "otherAbnormality", severityId: "otherAbnormality-severity"},
        {name: "eyeResultSnellen"}
    ];

    // Loop through each condition and attach event listeners for checkboxes
    eyesConditions.forEach(({name, severityId}) => {
        // Get the checkboxes and severity dropdown (if applicable)
        const yesCheckbox = document.getElementById(`${name}Yes`);
        const noCheckbox = document.getElementById(`${name}No`);
        const severityDropdown = severityId ? document.getElementById(severityId) : null;

        // Ensure elements exist on the page
        if (yesCheckbox && noCheckbox) {
            // Add event listener for "Yes" checkbox
            yesCheckbox.addEventListener("change", () => {
                if (yesCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "block"; // Show severity dropdown
                        severityDropdown.required = true; // Make the dropdown required
                    }
                    noCheckbox.checked = false; // Uncheck "No" checkbox
                }
            });

            // Add event listener for "No" checkbox
            noCheckbox.addEventListener("change", () => {
                if (noCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "none"; // Hide severity dropdown
                        severityDropdown.required = false;
                    }
                    yesCheckbox.checked = false; // Uncheck "Yes" checkbox
                }
            });
        } else {
            console.error(`Could not find checkboxes for condition: ${name}`);
        }
    });

    // Get references to DOM elements
    const wearsGlassesYes = document.getElementById("wearsGlassesYes");
    const wearsGlassesNo = document.getElementById("wearsGlassesNo");
    const snellenTestResults = document.getElementById("snellenTestResults");

    // Check if all necessary elements exist
    if (wearsGlassesYes && wearsGlassesNo && snellenTestResults) {
        // Hide Snellen Test Results by default
        snellenTestResults.style.display = "none";

        // Add event listeners for "Yes" and "No" checkboxes
        wearsGlassesYes.addEventListener("change", () => {
            if (wearsGlassesYes.checked) {
                wearsGlassesNo.checked = false; // Deselect "No"
                snellenTestResults.style.display = "block"; // Show Snellen Test Results
                severityDropdown.required = true; // Make the dropdown required
            }
        });

        wearsGlassesNo.addEventListener("change", () => {
            if (wearsGlassesNo.checked) {
                wearsGlassesYes.checked = false; // Deselect "Yes"
                snellenTestResults.style.display = "block"; // Hide Snellen Test Results
                severityDropdown.required = false; // Make the dropdown required
            }
        });
    } else {
        // Log an error message if any elements are missing
        console.log("Error: Missing required DOM elements for 'Wears Glasses' or 'Snellen Test' functionality.");
    }

    // // *** Updated Code for Severity Dropdown ***
    // const conditions = ["discharge", "inflammation", "squint", "otherAbnormality"]; // Added 'npc'
    //
    // conditions.forEach((condition) => {
    //   const yesCheckbox = document.getElementById(`${condition}Yes`);
    //   const noCheckbox = document.getElementById(`${condition}No`);
    //   const severityDropdown = document.getElementById(`${condition}-severity`);
    //
    //   if (yesCheckbox && noCheckbox && severityDropdown) {
    //     // When 'Yes' is checked, show the severity dropdown and uncheck 'No'
    //     yesCheckbox.addEventListener("change", () => {
    //       if (yesCheckbox.checked) {
    //         severityDropdown.style.display = "block";
    //         noCheckbox.checked = false; // Uncheck 'No' when 'Yes' is selected
    //       }
    //     });
    //
    //     // When 'No' is checked, hide the severity dropdown and uncheck 'Yes'
    //     noCheckbox.addEventListener("change", () => {
    //       if (noCheckbox.checked) {
    //         severityDropdown.style.display = "none";
    //         yesCheckbox.checked = false; // Uncheck 'Yes' when 'No' is selected
    //       }
    //     });
    //   } else {
    //     console.warn(`Elements for condition ${condition} are missing in the HTML.`);
    //   }
    // });

    // Define all conditions with left/right variations
    const conditions = [
        {name: "dischargeLeft", severityId: "dischargeLeft-severity"},
        {name: "dischargeRight", severityId: "dischargeRight-severity"},
        {name: "inflammationLeft", severityId: "inflammationLeft-severity"},
        {name: "inflammationRight", severityId: "inflammationRight-severity"},
        {name: "inflamedLeft", severityId: "inflamedLeft-severity"},
        {name: "inflamedRight", severityId: "inflamedRight-severity"},
        {name: "otherAbnormalityLeft", severityId: "otherAbnormalityLeft-severity"},
        {name: "otherAbnormalityRight", severityId: "otherAbnormalityRight-severity"},
        {name: "wearsHearingAid"},
        {name: "audiometerCheck", severityId: "audiometerLossCheckTypes"}
    ];

// Loop through each condition and attach event listeners
    // Loop through each condition and attach event listeners
    conditions.forEach(({name, severityId}) => {
        const yesCheckbox = document.getElementById(`${name}Yes`);
        const noCheckbox = document.getElementById(`${name}No`);
        const severityDropdown = severityId ? document.getElementById(severityId) : null;

        // Ensure the "Yes" and "No" checkboxes exist
        if (yesCheckbox && noCheckbox) {
            // When 'Yes' checkbox is selected
            yesCheckbox.addEventListener("change", () => {
                if (yesCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "block"; // Show dropdown (if applicable)
                        severityDropdown.required = true; // Make the dropdown required
                    }
                    noCheckbox.checked = false; // Uncheck "No"
                }
            });

            // When 'No' checkbox is selected
            noCheckbox.addEventListener("change", () => {
                if (noCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "none"; // Hide dropdown (if applicable)
                        severityDropdown.required = false;
                    }
                    yesCheckbox.checked = false; // Uncheck "Yes"
                }
            });
        } else {
            console.warn(`CheckBoxes for condition "${name}" are missing in the HTML.`);
        }
    });

// *** Generate Report Button Logic ***
    const generateReportBtn = document.getElementById("generate-report-btn");

    if (generateReportBtn) {
        generateReportBtn.addEventListener("click", async function () {
            // Get the Screening ID from the form
            const screeningId = document.getElementById("screening-id").value;

            // Validate if the Screening ID is provided
            if (!screeningId) {
                alert("Please provide the Screening ID.");
                return;
            }

            try {
                // Fetch the data from the backend API using the screening ID
                const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/referral?screeningID=${screeningId}`);

                // Check if the response is valid
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Response error text from API: ${errorText}`);
                    throw new Error(`Failed to fetch report for Screening ID: ${screeningId}`);
                }

                // Parse the JSON data
                const reportData = await response.json();

                // Dynamically generate the report content
                const reportContent = `
        <h4 style="color: black;">Screening Report</h4>
        <p><strong>Screening ID:</strong> ${reportData.ScreeningID}</p>
        <h2 style="color: black;>Demographics and Screening Report</h2>

        <h2 style="color: black;">Demographics</h2>
        <table>
          <tr><th>First Name:</th><td>${reportData.demographics[0]?.firstName || "N/A"}</td></tr>
          <tr><th>Last Name:</th><td>${reportData.demographics[0]?.lastName || "N/A"}</td></tr>
          <tr><th>School Name:</th><td>${reportData.demographics[0]?.schoolName || "N/A"}</td></tr>

          <tr><th>Age:</th><td>${reportData.demographics[0]?.age || "N/A"}</td></tr>
          <tr><th>Sex:</th><td>${reportData.demographics[0]?.dateOfBirth || "N/A"}</td></tr>
          <tr><th>Grade:</th><td>${reportData.demographics[0]?.grade || "N/A"}</td></tr>
          <tr><th>Date of birth:</th><td>${reportData.demographics[0]?.sex || "N/A"}</td></tr>
        </table>

        <h2 style="color: black;">Eyes Form</h2>
        <table>
          <tr><th>Discharge:</th><td>${reportData.eyes[0]?.discharge ? "Yes" : "No"} (${reportData.eyes[0]?.dischargeSeverity || "N/A"})</td></tr>
          <tr><th>Discharge Severity:</th><td> ${reportData.eyes[0]?.dischargeSeverity || "N/A"}</td></tr>
          <tr><th>Squint:</th><td>${reportData.eyes[0]?.squint ? "Yes" : "No"} (${reportData.eyes[0]?.squintSeverity || "N/A"})</td></tr>
          <tr><th>Squint Severity:</th><td> ${reportData.eyes[0]?.squintSeverity || "N/A"}</td></tr>
          <tr><th>Inflammation:</th><td>${reportData.eyes[0]?.inflammation ? "Yes" : "No"}</td></tr>
          <tr><th>Inflammation Severity:</th><td> ${reportData.eyes[0]?.inflammationSeverity || "N/A"}</td></tr>
          <tr><th>Right Eye (OD):</th><td>SPH: ${reportData.eyes[0]?.rightEyeODSPH || "N/A"}, CYL: ${reportData.eyes[0]?.rightEyeODCYL || "N/A"}, AXIS: ${reportData.eyes[0]?.rightEyeODAXIS || "N/A"}</td></tr>
          <tr><th>Left Eye (OS):</th><td>SPH: ${reportData.eyes[0]?.leftEyeOSSPH || "N/A"}, CYL: ${reportData.eyes[0]?.leftEyeOSCYL || "N/A"}, AXIS: ${reportData.eyes[0]?.leftEyeOSAXIS || "N/A"}</td></tr>
          <tr><th>Eyes (PD):</th><td>PD: ${reportData.eyes[0]?.bothEyesPD || "N/A"}</td></tr>

          <tr><th>Wears Glasses Left Eye Snellel Result:</th><td>${reportData.eyes[0]?.wearsGlassesLeftSnellenTest || "N/A"}</td></tr>
          <tr><th>Wears Glasses Right Eye Snellel Result:</th><td>${reportData.eyes[0]?.wearsGlassesRightSnellenTest || "N/A"}</td></tr>

          <tr><th>Wears No Glasses Left Eye Snellel Result:</th><td>${reportData.eyes[0]?.wearsNoGlassesLeftSnellenTest || "N/A"}</td></tr>
          <tr><th>Wears No Glasses Right Eye Snellel Result:</th><td>${reportData.eyes[0]?.wearsNoGlassesRightSnellenTest || "N/A"}</td></tr>

          <tr><th>Referral Results:</th><td> ${reportData.eyes[0]?.screeningResults || "N/A"}</td></tr>
          <tr><th>Additional Comments:</th><td> ${reportData.eyes[0]?.additionalComments || "N/A"}</td></tr>
        </table>

        <h2 style="color: black;">Ears Form</h2>
        <table>
          <tr><th>Discharge Left:</th><td>${reportData.ears[0]?.dischargeLeft ? "Yes" : "No"}</td></tr>
          <tr><th>Inflamed Eardrum Left:</th><td>${reportData.ears[0]?.inflamedEardrumLeft ? "Yes" : "No"}</td></tr>
          <tr><th>Inflamed Eardrum Right:</th><td>${reportData.ears[0]?.inflamedEardrumRight ? "Yes" : "No"}</td></tr>
          <tr><th>Wears Hearing Aid:</th><td>${reportData.ears[0]?.wearsHearingAid ? "Yes" : "No"}</td></tr>
            
          <tr><th>Audio Meter Check Yes Results:</th><td>${reportData.ears[0]?.audioMeterCheckYes ? "Yes" : "No"}</td></tr>
          <tr><th>Audio Meter Check No Results:</th><td>${reportData.ears[0]?.audioMeterCheckNo ? "Yes" : "No"}</td></tr>

          <tr><th>Wax Impaction Left:</th><td>${reportData.ears[0]?.waxImpactionLeft ? "Yes" : "No"} (${reportData.ears[0]?.waxSeverityLeft || "N/A"})</td></tr>
          <tr><th>Referral Results:</th><td> ${reportData.ears[0]?.screeningResults || "N/A"} </td></tr>
          <tr><th>Additional Comments:</th><td> ${reportData.ears[0]?.additionalComments || "N/A"}</td></tr>
          <tr><th>Management:</th><td> ${reportData.ears[0]?.management || "N/A"}</td></tr>
          <tr><th>Audio Meter Check Type:</th><td> ${reportData.ears[0]?.audioMeterCheckType || "N/A"}</td></tr>
          <tr><th>OAE Result Left:</th><td> ${reportData.ears[0]?.oaeresultLeft || "N/A"}</td></tr>
          <tr><th>OAE Result Right:</th><td> ${reportData.ears[0]?.oaeresultRight || "N/A"}</td></tr>
          <tr><th>OAE Refer Result Right:</th><td> ${reportData.ears[0]?.oaeresultReferTextRight || "N/A"}</td></tr>
          <tr><th>OAE Refer Result Left:</th><td> ${reportData.ears[0]?.oaeresultReferTextLeft || "N/A"}</td></tr>
        </table>

        <h2 style="color: black;">Oral Health</h2>
        <table>
          <tr><th>Dental Caries:</th><td>${reportData.oralHealth[0]?.dentalCaries ? "Yes" : "No"}</td></tr>
          <tr><th>Dental Caries Severity:</th><td>${reportData.oralHealth[0]?.dentalCariesSeverity || "N/A"}</td></tr>
          <tr><th>Dental Cavities:</th><td>${reportData.oralHealth[0]?.dentalCavities? "Yes" : "No" }</td></tr>
          <tr><th>Dental Cavities Severity:</th><td>${reportData.oralHealth[0]?.dentalCavitiesSeverity || "N/A"}</td></tr>
          <tr><th>Malocclusion:</th><td>${reportData.oralHealth[0]?.malocclusion? "Yes" : "No" }</td></tr>
          <tr><th>Malocclusion Severity:</th><td>${reportData.oralHealth[0]?.malocclusionSeverity? "Yes" : "No" }</td></tr>
          <tr><th>hyperdontia:</th><td>${reportData.oralHealth[0]?.hyperdontia? "Yes" : "No" }</td></tr>
          <tr><th>Hyperdontia Severity:</th><td>${reportData.oralHealth[0]?.hyperdontiaSeverity? "Yes" : "No" }</td></tr>
          <tr><th>Gum Disease:</th><td>${reportData.oralHealth[0]?.gumDisease ? "Yes" : "No"}</td></tr>
          <tr><th>Gum Disease Severity:</th><td>${reportData.oralHealth[0]?.gumDiseaseSeverity || "N/A"}</td></tr>
          <tr><th>Thrush/Sores:</th><td>${reportData.oralHealth[0]?.thrushSores ? "Yes" : "No"}</td></tr>
          <tr><th>Thrush/Sores Severity:</th><td>${reportData.oralHealth[0]?.thrushSoresSeverity || "N/A"}</td></tr>
          <tr><th>Teeth Staining:</th><td>${reportData.oralHealth[0]?.teethStaining ? "Yes" : "No"}</td></tr>
          <tr><th>Teeth Staining Severity:</th><td>${reportData.oralHealth[0]?.teethStainingSeverity || "N/A"}</td></tr>

          <tr><th>Referral Results:</th><td> ${reportData.oralHealth[0]?.screeningResults || "N/A"}</td></tr>
          <tr><th>Additional Comments:</th><td> ${reportData.oralHealth[0]?.additionalComments || "N/A"}</td></tr>
        </table>
      `;

                // Show the Report Preview
                const reportPreview = document.getElementById("report-preview");
                if (reportPreview) {
                    // Set the dynamically generated content inside the preview section
                    document.getElementById("report-content").innerHTML = reportContent;

                    // Make the preview section visible
                    reportPreview.style.display = "block";
                } else {
                    console.error("Report preview section not found!");
                }
            } catch (error) {
                // Handle errors (e.g., network issues, invalid screening ID)
                console.error(error.message);
                alert("Error generating report: " + error.message);
            }
        });
    }

    // *** Print Button Logic ***
    const printBtn = document.getElementById("print-report-btn");
    if (printBtn) {
        printBtn.addEventListener("click", function () {
            const reportContent = document.getElementById("report-content").innerHTML;

            // Check if content is available
            if (!reportContent) {
                alert("No content to print.");
                return;
            }

            const printWindow = window.open("", "_blank", "width=800,height=600");

            printWindow.document.write(`
      <html>
        <head>
          <title>Print Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h4 { color: #333; }
            p { color: #555; }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        });
    }
});
