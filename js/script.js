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

// *** Login handler ***
  document.getElementById('loginForm').addEventListener('submit',
    async function(event) {
        event.preventDefault();

        const identityNumber = document.getElementById("identityNumber").value.trim();
        const password = document.getElementById("password").value.trim();
        // http://localhost:8081/api/auth/signin
        //https://bp-prod-app-a15e414be88d.herokuapp.com/api/auth/signin

        // Check credentials for the single allowed user
        // if (username === "HW001" && password === "HW1") {
        //     window.location.href = "/pages/dashboard.html"; // Redirect to dashboard
        // } else {
        //     document.getElementById("loginError").style.display = "block"; // Show error
        // }
        try {
            const response = await fetch('https://bp-prod-app-a15e414be88d.herokuapp.com/api/auth/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({identityNumber, password}),
                }
            );
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    try {
                        const data = await response.json();
                        console.log(data.message); //Handle successful login
                        window.location.href = "/pages/dashboard.html";
                    } catch (error) {
                        console.error('Error parsing response as JSON: ', error);
                        document.getElementById('loginError').textContent = 'An error occurred. Please try again.';
                    }
                } else {
                    document.getElementById("loginError").style.display = "block"; // Show error
                }
            } else {
                if (response.status === 500) {
                    console.error('Internal Server Error');
                    document.getElementById('loginError').textContent = 'An internal server error occurred. Please try again later.';
                } else {
                    try {
                        const errorData = await response.json();
                        document.getElementById('loginError').textContent = errorData.message || 'Invalid credentials';
                    } catch (error) {
                        console.error('Error parsing error response as JSON: ', error);
                        document.getElementById('loginError').textContent = 'An error occurred. Please try again.';
                    }
                }
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            document.getElementById('loginError').textContent = 'An error occurred. Please try again.';
        }
    });
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
                    }
                    noCheckbox.checked = false; // Uncheck "No" checkbox
                }
            });

            // Add event listener for "No" checkbox
            noCheckbox.addEventListener("change", () => {
                if (noCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "none"; // Hide severity dropdown
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
                    }
                    noCheckbox.checked = false; // Uncheck "No" checkbox
                }
            });

            // Add event listener for "No" checkbox
            noCheckbox.addEventListener("change", () => {
                if (noCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "none"; // Hide severity dropdown
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
            }
        });

        wearsGlassesNo.addEventListener("change", () => {
            if (wearsGlassesNo.checked) {
                wearsGlassesYes.checked = false; // Deselect "Yes"
                snellenTestResults.style.display = "block"; // Hide Snellen Test Results
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
        {name: "audiometerCheck"}
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
                    }
                    noCheckbox.checked = false; // Uncheck "No"
                }
            });

            // When 'No' checkbox is selected
            noCheckbox.addEventListener("change", () => {
                if (noCheckbox.checked) {
                    if (severityDropdown) {
                        severityDropdown.style.display = "none"; // Hide dropdown (if applicable)
                    }
                    yesCheckbox.checked = false; // Uncheck "Yes"
                }
            });
        } else {
            console.warn(`CheckBoxes for condition "${name}" are missing in the HTML.`);
        }
    });


//   // *** Generate Report Button Logic ***
//   const generateReportBtn = document.getElementById("generate-report-btn");
//
//   if (generateReportBtn) {
//     generateReportBtn.addEventListener("click", function () {
//       // Get value of the Screening ID from the form
//       const screeningId = document.getElementById("screening-id").value;
//
//       // Validate if the Screening ID is filled
//       if (!screeningId) {
//         alert("Please provide the Screening ID.");
//         return;
//       }
//
//       // Create the report content dynamically
//       const reportContent = `
//       <h4>Screening Report</h4>
//       <p><strong>Screening ID:</strong> ${screeningId}</p>
//       <h1>Demographics and Screening Report</h1>
// <h2>Demographics</h2>
// <table>
// <tr>
// <th>Screening ID:</th>
// <td>00001</td>
// </tr>
// <tr>
// <th>Select School:</th>
// <td>Maelebe Primary School</td>
// </tr>
// <tr>
// <th>First Name:</th>
// <td>Thato</td>
// </tr>
// <tr>
// <th>Last Name:</th>
// <td>Ledwaba</td>
// </tr>
// <tr>
// <th>Date of Birth:</th>
// <td>2015/06/06</td>
// </tr>
// <tr>
// <th>Age:</th>
// <td>10</td>
// </tr>
// <tr>
// <th>Sex:</th>
// <td>Male</td>
// </tr>
// <tr>
// <th>Grade:</th>
// <td>4</td>
// </tr>
// </table>
// <h2>Eyes Form</h2>
// <table>
// <tr>
// <th>Screening ID:</th>
// <td>00001</td>
// </tr>
// <tr>
// <th>Discharge:</th>
// <td>Yes (Mild)</td>
// </tr>
// <tr>
// <th>Squint:</th>
// <td>Yes (Mild)</td>
// </tr>
// <tr>
// <th>Inflammation:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Other abnormality:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Right Eye (OD):</th>
// <td>SPH: 1.25, CYL: 0.0, AXIS: 0</td>
// </tr>
// <tr>
// <th>Left Eye (OS):</th>
// <td>SPH: 2.0, CYL: 0.0, AXIS: 0</td>
// </tr>
// <tr>
// <th>PD:</th>
// <td>65</td>
// </tr>
// <tr>
// <th>Wears Glasses:</th>
// <td>Yes</td>
// </tr>
// <tr>
// <th>Right Eye Snellen:</th>
// <td>5/6</td>
// </tr>
// <tr>
// <th>Left Eye Snellen:</th>
// <td>4/6</td>
// </tr>
// <tr>
// <th>Screening results:</th>
// <td>Refer</td>
// </tr>
// </table>
// <h2>Ears Form</h2>
// <table>
// <tr>
// <th>Screening ID:</th>
// <td>00001</td>
// </tr>
// <tr>
// <th>Discharge Left:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Discharge Right:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Wax impaction Left:</th>
// <td>Yes (Severe)</td>
// </tr>
// <tr>
// <th>Wax Impaction Right:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Inflamed Eardrum Left:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Inflamed Eardrum Right:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Other abnormality Left:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Other abnormality Right:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Wears hearing aid:</th>
// <td>Yes</td>
// </tr>
// <tr>
// <th>Additional comments:</th>
// <td>NULL</td>
// </tr>
// </table>
// <h2>Oral Health</h2>
// <table>
// <tr>
// <th>Screening ID:</th>
// <td>00001</td>
// </tr>
// <tr>
// <th>Dental Caries:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Gum disease:</th>
// <td>No</td>
// </tr>
// <tr>
// <th>Thrush sores:</th>
// <td
//
//     `;
//
//       // Show the Report Preview
//       const reportPreview = document.getElementById("report-preview");
//       if (reportPreview) {
//         // Set the generated content inside the preview section
//         document.getElementById("report-content").innerHTML = reportContent;
//
//         // Make the preview section visible
//         reportPreview.style.display = "block";
//       } else {
//         console.error("Report preview section not found!");
//       }
//     });
//   }
//
//   // *** Print Button Logic ***
//   const printBtn = document.getElementById("print-report-btn");
//   if (printBtn) {
//     printBtn.addEventListener("click", function () {
//       const reportContent = document.getElementById("report-content").innerHTML;
//
//       // Check if content is available
//       if (!reportContent) {
//         alert("No content to print.");
//         return;
//       }
//
//       const printWindow = window.open("", "_blank", "width=800,height=600");
//
//       printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Report</title>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             h4 { color: #333; }
//             p { color: #555; }
//           </style>
//         </head>
//         <body>
//           ${reportContent}
//         </body>
//       </html>
//     `);
//
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//     });
//   }
//
//   // *** Send Button Logic (basic simulation) ***
//   const sendBtn = document.getElementById("send-btn");
//   if (sendBtn) {
//     sendBtn.addEventListener("click", function () {
//       const reportContent = document.getElementById("report-content").innerHTML;
//
//       // Simple simulation of sending the report (e.g., via email)
//       // You can replace this with actual server-side logic
//       alert(`Report content sent:\n\n${reportContent}`);
//
//       // Reset preview after sending
//       document.getElementById("report-preview").style.display = "none";
//     });
//   }
// });
// // document.getElementById('toggleDarkMode').addEventListener('click', function(){
// //   document.body.classList.toggle('dark-mode');
// // });
//
//


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
                    throw new Error(`Failed to fetch report for Screening ID: ${screeningId}`);
                }

                // Parse the JSON data
                const reportData = await response.json();
                console.log(`Report data is -----> ${JSON.stringify(reportData.demographics[0])}`);

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
          <tr><th>Squint:</th><td>${reportData.eyes[0]?.squint ? "Yes" : "No"} (${reportData.eyes[0]?.squintSeverity || "N/A"})</td></tr>
          <tr><th>Inflammation:</th><td>${reportData.eyes[0]?.inflammation ? "Yes" : "No"}</td></tr>
          <tr><th>Right Eye (OD):</th><td>SPH: ${reportData.eyes[0]?.rightEyeODSPH || "N/A"}, CYL: ${reportData.eyes[0]?.rightEyeODCYL || "N/A"}, AXIS: ${reportData.eyes[0]?.rightEyeODAXIS || "N/A"}</td></tr>
          
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
          <tr><th>Gum Disease:</th><td>${reportData.oralHealth[0]?.gumDisease ? "Yes" : "No"}</td></tr>
          <tr><th>Thrush/Sores:</th><td>${reportData.oralHealth[0]?.thrushSores ? "Yes" : "No"}</td></tr>
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
    const modeSwitch = document.getElementById('modeSwitch');

    modeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        modeSwitch.textContent = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
    });

});
