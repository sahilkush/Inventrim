document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Hardcoded credentials
    const hardcodedUsername = "admin";
    const hardcodedPassword = "password123";

    // Get the values from the form
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    // Check if the entered credentials match the hardcoded ones
    if (enteredUsername === hardcodedUsername && enteredPassword === hardcodedPassword) {
        // Redirect to homepage.html
        window.location.href = "homepage/homepage.html";
    } else {
        // Show an error message
        alert("Invalid username or password. Please try again.");
    }
});