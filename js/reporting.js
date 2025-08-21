// *** Generate Report Button Logic ***
const generateReportBtn = document.getElementById("generate-report-btn");
const appointmentOutcomeBtn = document.getElementById("appointment-outcome");
const userRole = localStorage.getItem('role');

if (userRole === 'admin') {
    appointmentOutcomeBtn.disabled = false;
} else {
    appointmentOutcomeBtn.style.display = "none";
    appointmentOutcomeBtn.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("You are not allowed to save the referral outcome form");
    });
}
if (appointmentOutcomeBtn) {
    appointmentOutcomeBtn.addEventListener("click", async function (e) {
        const screeningID = document.getElementById('screening-id').value;
        e.preventDefault();
        if (!screeningID) {
            alert('Please provide the Screening ID.');
            return;
        }
        const appointmentModalEl = document.getElementById("appointmentModal")

        try {
            const response = await fetch(`https://bp-prod-app-a15e414be88d.herokuapp.com/api/referral?screeningID=${screeningID}`);
            if (!response.ok) {
                alert(`Failed to fetch report for Screening ID: ${screeningID}`);
                return;
            }
            const appointmentModal = bootstrap.Modal.getOrCreateInstance(appointmentModalEl);
            appointmentModal.show();
        } catch (error) {
            console.error(`Error with screening ID ${screeningID} please try again`);
            appointmentModal.hide();
            alert(`Error with screening ID ${screeningID} please try again`);
        }
    });
}
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
          <tr><th>Dental Cavities:</th><td>${reportData.oralHealth[0]?.dentalCavities ? "Yes" : "No"}</td></tr>
          <tr><th>Dental Cavities Severity:</th><td>${reportData.oralHealth[0]?.dentalCavitiesSeverity || "N/A"}</td></tr>
          <tr><th>Malocclusion:</th><td>${reportData.oralHealth[0]?.malocclusion ? "Yes" : "No"}</td></tr>
          <tr><th>Malocclusion Severity:</th><td>${reportData.oralHealth[0]?.malocclusionSeverity ? "Yes" : "No"}</td></tr>
          <tr><th>hyperdontia:</th><td>${reportData.oralHealth[0]?.hyperdontia ? "Yes" : "No"}</td></tr>
          <tr><th>Hyperdontia Severity:</th><td>${reportData.oralHealth[0]?.hyperdontiaSeverity ? "Yes" : "No"}</td></tr>
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


// *** Home button click handler ***
const homeBtn = document.getElementById("home-btn");
if (homeBtn) {
    homeBtn.addEventListener("click", function () {
        window.location.href = "/pages/dashboard.html";
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
      <html lang="en">
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

// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const appointmentBtn = document.getElementById("appointment-outcome");
    const referralTo = document.getElementById("referral_to");
    const referralSite = document.getElementById("referral_site");
    const serviceType = document.getElementById("service_type");
    const appointmentModalEl = document.getElementById("appointmentModal");
    const appointmentHonored = document.getElementById("appointment_honored");
    const appointmentRebookedWrap = document.getElementById("wrap_appointment_rebooked");
    const appointmentDateWrap = document.getElementById("wrap_appointment_date");

    const appointmentRebookedDate = document.getElementById("wrap_appointment_rebooked_date");
    const appointmentDate = document.getElementById("appointment_date");
    const secondAppointmentHonoredWrap = document.getElementById("wrap_second_appointment_honored");
    const reasonNotHonoredWrap = document.getElementById("wrap_reason_not_honored");
    const reasonOtherWrap = document.getElementById("wrap_reason_other");
    const reasonNotHonoredSelect = document.getElementById("reason_not_honored");
    const finalTracingOutcomeComment = document.getElementById("final_tracing_comments");
    const serviceReceivedAfterReferral = document.getElementById("service_received_after_referral");

    // Bootstrap modal instance
    // let appointmentModal = new bootstrap.Modal(appointmentModalEl);
    //
    // // Open modal on button click
    // appointmentBtn.addEventListener("click", function () {
    //
    //     appointmentModal.show();
    // });

    // Show/hide appointment rebooked section
    appointmentHonored.addEventListener("change", function () {
        if (this.value === "NO") {
            appointmentRebookedWrap.classList.remove("d-none");
            appointmentRebookedDate.classList.remove("d-none");
            reasonNotHonoredWrap.classList.remove("d-none");

            document.getElementById("wrap_appointment_rebooked").setAttribute("required", "true");
            document.getElementById("wrap_appointment_rebooked_date").setAttribute("required", "true");
            document.getElementById("wrap_reason_not_honored").setAttribute("required", "true");
        } else {
            appointmentRebookedDate.classList.add("d-none");
            appointmentRebookedWrap.classList.add("d-none");
            appointmentDateWrap.classList.add("d-none");
            secondAppointmentHonoredWrap.classList.add("d-none");
            reasonNotHonoredWrap.classList.add("d-none");
            reasonOtherWrap.classList.add("d-none");

            document.getElementById("wrap_appointment_rebooked").removeAttribute("required");
            document.getElementById("wrap_appointment_rebooked_date").removeAttribute("required");
            document.getElementById("wrap_reason_not_honored").removeAttribute("required");
        }
    });

    const appointmentForm = document.getElementById("appointment-form");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            event.stopPropagation();

            if(!appointmentForm.checkValidity()){
                appointmentForm.classList.add("was-validated");
                return;
            }
            try {
                const referralTo = document.getElementById("referral_to").value || N/A;
                const referralSite = document.getElementById("referral_site").value || N/A;
                const appointmentDate = document.getElementById("appointment_date").value || N/A;
                const appointmentHonored = document.getElementById("appointment_honored").value || N/A;
                const appointmentRebooked = document.getElementById("wrap_appointment_rebooked").value || N/A;
                const appointmentRebookedDate = document.getElementById("wrap_appointment_rebooked_date").value || N/A;
                const secondAppointmentHonored = document.getElementById("wrap_second_appointment_honored").value || N/A;
                const reasonsNotHonoringAppointment = document.getElementById("wrap_reason_not_honored").value || N/A;
                const serviceType = document.getElementById("service_type").value || N/A;
                const transportFairReceived = document.getElementById("transport_fare_received").value || N/A;
                const serviceReceivedAfterReferral = document.getElementById("service_received_after_referral").value || N/A;
                const finalTracingOutcomeComment = document.getElementById("final_tracing_comments").value || N/A;
                const screeningID = document.getElementById('screening-id').value || N/A;


                const payload = {
                    referralTo,
                    referralSite,
                    appointmentDate,
                    appointmentHonored,
                    appointmentRebooked,
                    appointmentRebookedDate,
                    secondAppointmentHonored,
                    reasonsNotHonoringAppointment,
                    serviceType,
                    transportFairReceived,
                    serviceReceivedAfterReferral,
                    finalTracingOutcomeComment,
                    screeningID
                };
                const response = await fetch('https://bp-prod-app-a15e414be88d.herokuapp.com/api/referral', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                if(!response.ok){
                    console.error(`Error submitting form: ${response.statusText}`);
                    alert(`Something went wrong while submitting form. Please try again`);
                    return;
                }

                const appointmentModalEl = document.getElementById("appointmentModal");
                const appointmentModal = bootstrap.Modal.getOrCreateInstance(appointmentModalEl);
                appointmentModal.hide();

                // Show success toast
                const toastEl = document.getElementById("saveToast");
                const toast = new bootstrap.Toast(toastEl);
                toast.show();

                // Reset form
                appointmentForm.reset();
                appointmentForm.classList.remove("was-validated");

                // Hide conditional fields
                appointmentRebookedWrap.classList.add("d-none");
                appointmentDateWrap.classList.add("d-none");
                secondAppointmentHonoredWrap.classList.add("d-none");
                reasonNotHonoredWrap.classList.add("d-none");
                reasonOtherWrap.classList.add("d-none");

                alert('Referral outcome saved successfully.');
                location.reload();
            } catch (error) {
                console.error(error);
                alert('Error saving referral outcome form.Please try again');
            }
        });
    }

    // Show/hide appointment date + second appointment honored if rebooked is YES
    document.getElementById("appointment_rebooked").addEventListener("change", function () {
        if (this.value === "YES") {
            secondAppointmentHonoredWrap.classList.remove("d-none");
            document.getElementById("wrap_second_appointment_honored").setAttribute("required", "true");

        } else {
            appointmentDateWrap.classList.add("d-none");
            secondAppointmentHonoredWrap.classList.add("d-none");

            document.getElementById("wrap_appointment_date").removeAttribute("required");
            document.getElementById("wrap_second_appointment_honored").removeAttribute("required");
        }
    });

    // Show "Other" text input if "Other" reason is chosen
    // reasonNotHonoredSelect.addEventListener("change", function () {
    //     if (this.value === "Other") {
    //         reasonOtherWrap.classList.remove("d-none");
    //
    //     } else {
    //         reasonOtherWrap.classList.add("d-none");
    //     }
    // });
});
