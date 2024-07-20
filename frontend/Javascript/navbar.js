document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout')

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.removeItem('noteAuthToken');
        localStorage.removeItem('loggedInUser');

        window.location.href = 'login.html';
    })
})

const displayBox = document.querySelector('.name')
const user_name = JSON.parse(localStorage.getItem('loggedInUser'))

displayBox.textContent = `Hello, ${user_name.name}`


const currentPage = window.location.href

const links = document.querySelectorAll('.nav-link')

links.forEach(link => {
    if(link.href === currentPage) {
        link.classList.add('active')
    }
})


