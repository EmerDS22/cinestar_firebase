import { 
    auth, 
    googleProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    updatePassword,
    onAuthStateChanged 
} from './firebase-auth.js'; 

const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const forgotBox = document.querySelector('.forgot-box');
const changeBox = document.querySelector('.change-box');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotForm = document.getElementById('forgot-form');
const changeForm = document.getElementById('change-form');

const googleLoginButton = document.getElementById('btn-google-login');

const registerLink = document.querySelector('.register-link a');
const loginLink = document.querySelector('.login-link a'); 
const forgotLink = document.querySelector('.forgot-link');
const changePassLink = document.querySelector('.change-pass-link');
const backToLoginLinks = document.querySelectorAll('.backtologin-link a');

const REDIRECT_PAGE = 'peliculas.html?id=cartelera';

const navigateToBox = (currentBox, nextBox) => {
    if (currentBox) currentBox.style.display = 'none';
    if (nextBox) nextBox.style.display = 'flex';
};

if (registerLink) registerLink.addEventListener('click', (e) => { e.preventDefault(); navigateToBox(loginBox, registerBox); });
if (forgotLink) forgotLink.addEventListener('click', (e) => { e.preventDefault(); navigateToBox(loginBox, forgotBox); });
if (changePassLink) changePassLink.addEventListener('click', (e) => { e.preventDefault(); navigateToBox(loginBox, changeBox); });

if (backToLoginLinks) {
    backToLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => { 
            e.preventDefault(); 
            if(registerBox) registerBox.style.display = 'none';
            if(forgotBox) forgotBox.style.display = 'none';
            if(changeBox) changeBox.style.display = 'none';
            navigateToBox(null, loginBox);
        });
    });
}

const checkAuthState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = REDIRECT_PAGE;
        } else {
            navigateToBox(null, loginBox);
        }
    });
};

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert(`Error de Login: ${error.message}`);
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("¡Registro exitoso! Ya puedes iniciar sesión.");
            navigateToBox(registerBox, loginBox);
        } catch (error) {
            alert(`Error de Registro: ${error.message}`);
        }
    });
}

if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = forgotForm.querySelector('input[type="email"]').value;

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.");
            navigateToBox(forgotBox, loginBox);
        } catch (error) {
            alert(`Error al enviar el correo: ${error.message}`);
        }
    });
}

if (changeForm) {
    changeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = changeForm.querySelector('input[type="password"]').value;
        const user = auth.currentUser;

        if (!user) {
             alert("Debes iniciar sesión para cambiar la contraseña.");
             return;
        }

        try {
            await updatePassword(user, newPassword);
            alert("Contraseña cambiada exitosamente.");
            window.location.href = REDIRECT_PAGE;
        } catch (error) {
            alert(`Error al cambiar contraseña: ${error.message}. Por favor, vuelve a iniciar sesión y prueba de nuevo.`);
            navigateToBox(changeBox, loginBox);
        }
    });
}

if (googleLoginButton) {
    googleLoginButton.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error.message);
            alert("Ocurrió un error al iniciar sesión con Google. Inténtalo de nuevo.");
        }
    });
}

checkAuthState();