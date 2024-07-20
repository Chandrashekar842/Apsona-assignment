document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const emailError = document.getElementById('emailError');
    const nameError = document.getElementById('nameError');
    const passwordError = document.getElementById('passwordError');

    const clearErrors = (fields) => {
        if (fields.includes('email')) emailError.textContent = '';
        if (fields.includes('name')) nameError.textContent = '';
        if (fields.includes('password')) passwordError.textContent = '';
    };

    const showError = (error) => {
        switch (error.path) {
            case 'email':
                emailError.textContent = error.msg;
                break;
            case 'name':
                nameError.textContent = error.msg;
                break;
            case 'password':
                passwordError.textContent = error.msg;
                break;
        }
    };

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://notes-application-l14a.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, name, password })
            });
        
            const result = await response.json();

            if (result.err && Array.isArray(result.err)) {
                // Clear only the fields that were valid
                const validFields = [];
                if (!result.err.some(error => error.path === 'email')) validFields.push('email');
                if (!result.err.some(error => error.path === 'name')) validFields.push('name');
                if (!result.err.some(error => error.path === 'password')) validFields.push('password');
                clearErrors(validFields);
                // Display errors
                result.err.forEach(error => showError(error));
            } else {
                alert('Registration successful!');
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
