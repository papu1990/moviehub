document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');

    let invalidAttemptCount = 0; // Initialize a counter for invalid attempts
    const maxInvalidAttempts = 3; // Set the maximum number of attempts

    function showMessage(message, type, redirect = false) {
        messageText.textContent = message;
        messageBox.className = `message-box show ${type}`;
        setTimeout(() => {
            messageBox.classList.remove('show');
            if (redirect) {
                window.location.href = 'invalid.html';
            }
        }, 3000);
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validation for the username format
        const usernameRegex = /^\d{13}@subscription$/;

        if (username.trim() === '' || password.trim() === '') {
            showMessage('Please fill out all fields.', 'error');
            return;
        }

        // Check if the user has exceeded the invalid attempt limit
        if (invalidAttemptCount >= maxInvalidAttempts) {
            showMessage('Too many failed attempts. Please try again later.', 'error');
            // This prevents further attempts until the page is refreshed, 
            // or you could add a timer here.
            return;
        }

        if (!usernameRegex.test(username)) {
            // Invalid username, increment the counter
            invalidAttemptCount++;
            let remainingAttempts = maxInvalidAttempts - invalidAttemptCount;
            if (remainingAttempts > 0) {
                showMessage(`Invalid username. You have ${remainingAttempts} attempts remaining.`, 'error');
            } else {
                showMessage('Too many failed attempts. Please try again later.', 'error');
            }
        } else {
            // Valid username, reset the counter and show success message
            invalidAttemptCount = 0;
            showMessage('Verifying...', 'success', true);
        }
    });
});