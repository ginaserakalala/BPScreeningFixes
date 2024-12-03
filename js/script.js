// Mock login system
const demoUsers = [
  { username: "HW001", password: "HW1", redirectPage: "demographics.html" },
  { username: "HW002", password: "HW2", redirectPage: "eyes.html" },
  { username: "HW003", password: "HW3", redirectPage: "ears.html" },
  { username: "HW004", password: "HW4", redirectPage: "oral-health.html" },
  { username: "HW005", password: "HW5", redirectPage: "Referral.html" },
];

// Login handler
document.addEventListener("DOMContentLoaded", () => {
  // Login form handling
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Check credentials
      const matchedUser = demoUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (matchedUser) {
        window.location.href = matchedUser.redirectPage; // Redirect on success
      } else {
        document.getElementById("loginError").style.display = "block"; // Show error
      }
    });
  }

  // Consent modal handling
  const openConsentBtn = document.getElementById("open-consent-btn");
  if (openConsentBtn) {
    openConsentBtn.addEventListener("click", function () {
      const consentModal = new bootstrap.Modal(document.getElementById("consentModal"));
      consentModal.show();
    });
  }

  const acceptConsentBtn = document.getElementById("accept-consent-btn");
  if (acceptConsentBtn) {
    acceptConsentBtn.addEventListener("click", function () {
      const consentModal = bootstrap.Modal.getInstance(
        document.getElementById("consentModal")
      );
      consentModal.hide();
      document.getElementById("demographics-form").style.display = "block";

      const successMessage = document.getElementById("success-message");
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    });
  }

  // Age calculation
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

  // Home button click handler
  const homeBtn = document.getElementById("home-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", function () {
      window.location.href = "/pages/login.html";
    });
  }

  const successHomeBtn = document.querySelector(".home-btn-success");
  if (successHomeBtn) {
    successHomeBtn.addEventListener("click", function () {
      window.location.href = "/pages/dashboard.html";
    });
  }

  // *** Updated Code for Severity Dropdown ***
  const conditions = ["discharge", "inflammation", "squint", "otherAbnormality"];

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
});
document.addEventListener("DOMContentLoaded", () => {
  // Existing code ...

  // Generate Report Button Logic
  const generateReportBtn = document.getElementById("generate-report-btn");
  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", function () {
      // Get values from the form
      const screeningId = document.getElementById("screening-id").value;
      const additionalComments = document.getElementById(
        "exampleFormControlTextarea1"
      ).value;

      // Validate if the fields are filled
      if (!screeningId || !additionalComments) {
        alert("Please provide both Screening ID and Additional Comments.");
        return;
      }

      // Create the report content dynamically
      const reportContent = `
        <h4>Screening Report</h4>
        <p><strong>Screening ID:</strong> ${screeningId}</p>
        <p><strong>Additional Comments:</strong> ${additionalComments}</p>
      `;

      // Show the Report Preview
      document.getElementById("report-content").innerHTML = reportContent;
      document.getElementById("report-preview").style.display = "block";
    });
  }

  // Print Report Logic
  const printReportBtn = document.getElementById("print-report-btn");
  if (printReportBtn) {
    printReportBtn.addEventListener("click", function () {
      const printContent = document.getElementById("report-content").innerHTML;
      const printWindow = window.open("", "", "height=600,width=800");
      printWindow.document.write("<html><head><title>Report</title></head><body>");
      printWindow.document.write(printContent);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    });
  }
});
