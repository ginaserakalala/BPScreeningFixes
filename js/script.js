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

//    // Check the user's role and conditionally render the search and update buttons
//    const role= localStorage.getItem('role');
//    if(role === 'admin'){
//        // Render the search and update buttons
//        document.getElementById('search-container').style.display='block';
//        document.getElementById('update-btn').style.display = 'block';
//    }
//    else{
//        // Hide the search and update buttons
//        document.getElementById('search-container').style.display='none';
//        document.getElementById('update-btn').style.display = 'none';
//    }



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


});
