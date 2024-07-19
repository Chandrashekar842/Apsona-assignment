document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    const clearErrors = () => {
        errorMsg.textContent = '';
    };

    const showError = (error) => {
        errorMsg.textContent = error
    };

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
        
            const result = await response.json()
            if(result.err) {
                clearErrors()
                showError(result.err)
            } else {
                clearErrors()
                const user = {
                    id: result.user._id,
                    name: result.user.name,
                }
                const saveUser = JSON.stringify(user)
                console.log(saveUser)
                localStorage.setItem('noteAuthToken', result.token)
                localStorage.setItem('loggedInUser', saveUser)
                alert("Login successful")
                window.location.href = 'home.html'
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
