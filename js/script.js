// Mock login system
const demoUser = {
  username: "HW001",
  password: "bp123",
};

// Login handler
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === demoUser.username && password === demoUser.password) {
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("loginError").style.display = "block";
      }
    });
  }

  // Handle the "Proceed to Demographics" button click (shows consent modal)
  document.getElementById("open-consent-btn").addEventListener("click", function () {
    // Show the consent modal
    const consentModal = new bootstrap.Modal(document.getElementById("consentModal"));
    consentModal.show();
  });

  // Handle consent acceptance
  document.getElementById("accept-consent-btn").addEventListener("click", function () {
    // Close the modal and show demographics form
    const consentModal = bootstrap.Modal.getInstance(
      document.getElementById("consentModal")
    );
    consentModal.hide();
    document.getElementById("demographics-form").style.display = "block";

    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000); // Adjust the timeout duration as needed });
  });

  // Age Calculation Based on Date of Birth
  document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    document.getElementById("age").value = age;
  });

  // Handle form submission
  document
    .getElementById("demographics-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission (page reload)

      // Hide the form
      document.getElementById("demographics-form").style.display = "none";

      // Show success message
      document.getElementById("success-message").style.display = "block";
    });

  // Home button click (redirect to dashboard)
  document.getElementById("home-btn").addEventListener("click", function () {
    window.location.href = "/pages/dashboard.html"; // Redirect to dashboard
  });

  // Success message Home button
  document.querySelector(".home-btn-success").addEventListener("click", function () {
    window.location.href = "/pages/dashboard.html"; // Redirect to dashboard
  });
});

// IN CASE THEY WANT CONSENT BEFORE DEMOGRAPHIC THEN CAN UNCOMMENT THIS CODE THEN COMMENT THE ONE ABOVE

/* document.addEventListener("DOMContentLoaded", () => {
    // Show consent modal when page loads
    const consentModal = new bootstrap.Modal(document.getElementById("consentModal"));
    consentModal.show();
  
    // Handle consent acceptance
    document.getElementById("accept-consent-btn").addEventListener("click", () => {
      // Close consent modal
      consentModal.hide();
  
      // Show demographics form
      document.getElementById("demographics-form").style.display = "block";
    });
  
    // Handle form submission
    document.getElementById("demographics-form").addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form from reloading the page
  
      // Hide the demographics form
      document.getElementById("demographics-form").style.display = "none";
  
      // Show success message
      document.getElementById("success-message").style.display = "block";
    });
  });        */
