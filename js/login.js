// *** Login handler ***
document.getElementById('loginForm').addEventListener('submit',
    async function(event) {
        event.preventDefault();

        const identityNumber = document.getElementById("identityNumber").value.trim();
        const password = document.getElementById("password").value.trim();
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
                // const responseData = await response.text();
                const responseData = await response.json();
                console.log(responseData);
                console.log('userID from response:', responseData.userID);
                localStorage.setItem('role', responseData.role); //Store user's role in local storage
                localStorage.setItem('userID',responseData.userID); //Store user's id in local storage



                document.getElementById('loginError').textContent = responseData;
                window.location.href="/pages/dashboard.html";
            } else {
                if (response.status === 401) {
                    document.getElementById("loginError").style.display = "block";
                    document.getElementById('loginError').textContent = 'Invalid username or password';
                } else if (response.status === 500) {
                    console.error('Internal Server Error');
                    document.getElementById('loginError').textContent = 'An internal server error occurred. Please try again later.';
                } else {
                    try {
                        const errorData = await response.json();
                        document.getElementById('loginError').textContent = errorData.message || 'An error occurred. Please try again.';
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
