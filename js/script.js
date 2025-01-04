// Helper function to trigger sinking effect
function addSinkingEffect(element) {
    element.classList.add('sinking');
    // After the sinking effect, add 'sunk' to make it stay sunk
    setTimeout(() => {
        element.classList.add('sunk');
    }, 300); // Wait for the sinking transition to complete before adding 'sunk'
}

document.addEventListener('DOMContentLoaded',() => {

// *** Login handler ***
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // Check credentials for the single allowed user
      if (username === "HW001" && password === "HW1") {
        window.location.href = "/pages/dashboard.html"; // Redirect to dashboard
      } else {
        document.getElementById("loginError").style.display = "block"; // Show error
      }
    });
  }

  // Check if elements exist before adding event listeners
  const modalOkButton = document.getElementById('modal-ok-btn');
  const modalCancelButton = document.getElementById('modal-cancel-btn');
  const consentModal = document.getElementById('consent-modal');

  if (modalOkButton) {
    modalOkButton.addEventListener('click', function() {
      addSinkingEffect(modalOkButton); // Trigger sinking effect on OK button click
      if (consentModal) {
        consentModal.style.display = 'none';
      }
      window.location.href = "/pages/demographics.html";
    });
  } else {
    console.error("Modal OK button not found");
  }

  if (modalCancelButton) {
    modalCancelButton.addEventListener('click', function() {
      addSinkingEffect(modalCancelButton); // Trigger sinking effect on Cancel button click
      if (consentModal) {
        consentModal.style.display = 'none';
      }
      window.location.href = "/pages/dashboard.html";
    });
  } else {
    console.error("Modal Cancel button not found");
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


  // Demographics form submission

  const demographicsForm = document.getElementById("demographics-form");
  if (demographicsForm) {
    demographicsForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      demographicsForm.style.display = "none"; // Hide form
      document.getElementById("success-message").style.display = "block"; // Show success
    });
  }

// Check if elements exist before adding event listeners
//   const demographicsBtn = document.querySelector('#demographicsBtn');
//   const consentModal = document.getElementById('consent-modal');
//   const modalOkButton = document.getElementById('modal-ok-btn');
//   const modalCancelButton = document.getElementById('modal-cancel-btn');


    const demographicsBtn = document.getElementById("demographicsBtn");

  if (demographicsBtn) {
    demographicsBtn.addEventListener('click', function() {
      if (consentModal) {
        consentModal.style.display = 'flex';
      } else {
        console.error("Consent modal not found");
      }
    });
  } else {
    console.error("Demographics button not found");
  }

  if (modalOkButton) {
    modalOkButton.addEventListener('click', function() {
      if (consentModal) {
        consentModal.style.display = 'none';
      }
      window.location.href = "/pages/demographics.html";
    });
  } else {
    console.error("Modal OK button not found");
  }

  if (modalCancelButton) {
    modalCancelButton.addEventListener('click', function() {
      if (consentModal) {
        consentModal.style.display = 'none';
      }
      // Corrected window.location.href
      window.location.href = "/pages/dashboard.html";
    });
  } else {
    console.error("Modal Cancel button not found");
  }


    if (demographicsBtn) {
        demographicsBtn.addEventListener("click", function () {
            // Show the consent modal
            document.getElementById('consent-modal').style.display = 'flex';

            //Show the demographics form only after the consent modal has been accepted or dismissed

            document.getElementById('consent-modal').addEventListener('click', function (event) {
                if (event.target === document.getElementById('consent-modal')) {
                    document.getElementById('consent-modal').style.display = 'none';
                    document.getElementById("demographics-form").style.display = "block";
                }
            });
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

  // *** Updated Code for Severity Dropdown ***
  const conditions = ["discharge", "inflammation", "squint", "otherAbnormality"]; // Added 'npc'

  conditions.forEach((condition) => {
    const yesCheckbox = document.getElementById(`${condition}Yes`);
    const noCheckbox = document.getElementById(`${condition}No`);
    const severityDropdown = document.getElementById(`${condition}-severity`);

    if (yesCheckbox && noCheckbox && severityDropdown) {
      // When 'Yes' is checked, show the severity dropdown and uncheck 'No'
      yesCheckbox.addEventListener("change", () => {
        if (yesCheckbox.checked) {
          severityDropdown.style.display = "block";
          noCheckbox.checked = false; // Uncheck 'No' when 'Yes' is selected
        }
      });

      // When 'No' is checked, hide the severity dropdown and uncheck 'Yes'
      noCheckbox.addEventListener("change", () => {
        if (noCheckbox.checked) {
          severityDropdown.style.display = "none";
          yesCheckbox.checked = false; // Uncheck 'Yes' when 'No' is selected
        }
      });
    } else {
      console.warn(`Elements for condition ${condition} are missing in the HTML.`);
    }
  });

  // Show/hide Snellen test results based on user response
  document.addEventListener("change", function() {
    let wearsGlasses = document.querySelector('input[name="wearsGlasses"]:checked').value;
    if (wearsGlasses === "yes" || wearsGlasses === "no") {
      document.getElementById("snellenTestResults").style.display = "block";
    } else {
      document.getElementById("snellenTestResults").style.display = "none";
    }
  });

  // *** Generate Report Button Logic ***
  const generateReportBtn = document.getElementById("generate-report-btn");

  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", function () {
      // Get value of the Screening ID from the form
      const screeningId = document.getElementById("screening-id").value;

      // Validate if the Screening ID is filled
      if (!screeningId) {
        alert("Please provide the Screening ID.");
        return;
      }

      // Create the report content dynamically
      const reportContent = `
      <h4>Screening Report</h4>
      <p><strong>Screening ID:</strong> ${screeningId}</p>
    `;

      // Show the Report Preview
      const reportPreview = document.getElementById("report-preview");
      if (reportPreview) {
        // Set the generated content inside the preview section
        document.getElementById("report-content").innerHTML = reportContent;

        // Make the preview section visible
        reportPreview.style.display = "block";
      } else {
        console.error("Report preview section not found!");
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

  // *** Send Button Logic (basic simulation) ***
  const sendBtn = document.getElementById("send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      const reportContent = document.getElementById("report-content").innerHTML;

      // Simple simulation of sending the report (e.g., via email)
      // You can replace this with actual server-side logic
      alert(`Report content sent:\n\n${reportContent}`);

      // Reset preview after sending
      document.getElementById("report-preview").style.display = "none";
    });
  }

  // *** Form Submission Success Message ***
  const specialSubmitBtn = document.getElementById("specialSubmit");
  if (specialSubmitBtn) {
    specialSubmitBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the form from submitting

      // Show the message
      const messageDiv = document.getElementById("message");
      messageDiv.textContent = "Form Submitted";
      messageDiv.style.display = "block";

      // Hide the message after 3000ms (3 seconds)
      setTimeout(function () {
        messageDiv.style.display = "none";
      }, 3000);
    });
  }
});

// document.getElementById('toggleDarkMode').addEventListener('click', function(){
//   document.body.classList.toggle('dark-mode');
// });


