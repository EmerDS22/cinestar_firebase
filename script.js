const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const forgotBox = document.querySelector('.forgot-box');
const changeBox = document.querySelector('.change-box');

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const forgotLink = document.querySelector('.forgot-link');
const changePassLink = document.querySelector('.change-pass-link');

const backToLoginLinks = document.querySelectorAll('.backtologin-link');

registerLink.addEventListener('click', (e) => {

    e.preventDefault(); 
    
    loginBox.style.display = 'none';
    registerBox.style.display = 'flex';
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    registerBox.style.display = 'none';
    loginBox.style.display = 'flex';
});

forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    loginBox.style.display = 'none';
    forgotBox.style.display = 'flex';
});

changePassLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    loginBox.style.display = 'none';
    changeBox.style.display = 'flex';
});

backToLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        forgotBox.style.display = 'none';
        changeBox.style.display = 'none';
        registerBox.style.display = 'none';
        
        loginBox.style.display = 'flex';
    });
});