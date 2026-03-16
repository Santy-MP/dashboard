import { matriz } from './Data.js';
import { setCookie } from './storageUtils.js';

const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    const userFound = matriz.find(user => user[1].toLowerCase() === usernameInput.toLowerCase());

    if (userFound) {
        const expectedPass = userFound[5];

        if (passwordInput === expectedPass) {
            const role = userFound[9].toLowerCase();
            setCookie('userRole', role);
            setCookie('isLoggedIn', 'true');
            window.location.href = 'inicio.html';
            return;
        }
    }

    errorMsg.style.display = 'block';
    loginForm.classList.add('shake');
    setTimeout(() => loginForm.classList.remove('shake'), 400);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        50% { transform: translateX(8px); }
        75% { transform: translateX(-8px); }
    }
    .shake { animation: shake 0.4s ease-in-out; }
`;
document.head.appendChild(style);
