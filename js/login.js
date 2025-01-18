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
                const responseData = await response.text();
                console.log(responseData);
                document.getElementById('loginError').textContent = responseData;
                window.location.href="/pages/dashboard.html";
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
const modeSwitch = document.getElementById('modeSwitch');

modeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeSwitch.textContent = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
});
