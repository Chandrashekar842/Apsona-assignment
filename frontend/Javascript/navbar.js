document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout')

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.removeItem('noteAuthToken');
        localStorage.removeItem('loggedInUser');

        window.location.href = 'login.html';
    })
})

const currentPage = window.location.href

const links = document.querySelectorAll('.nav-link')

links.forEach(link => {
    if(link.href === currentPage) {
        link.classList.add('active')
    }
})


