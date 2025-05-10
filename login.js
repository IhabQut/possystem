//-------Switch Form Functions (login-register)-------//
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const wrapper = document.querySelector(".wrapper");
const loginTitle = document.querySelector(".title-login");
const registerTitle = document.querySelector(".title-register");
const signInBtn = document.querySelector("#SignInBtn");
const signUpBtn = document.querySelector("#SignUpBtn");

function loginFunction() {
    loginForm.style.display = "block "
    loginForm.style.left = "50%";
    loginForm.style.opacity = 1;
    registerForm.style.left = "150%";
    registerForm.style.opacity = 0;
    wrapper.style.height = "500px";
    loginTitle.style.top = "50%";
    loginTitle.style.opacity = 1;
    registerTitle.style.top = "50px";
    registerTitle.style.opacity = 0;
}

function registerFunction() {
    registerForm.style.display = "block";
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;
    wrapper.style.height = "580px";
    loginTitle.style.top = "-60px";
    loginTitle.style.opacity = 0;
    registerTitle.style.top = "50%";
    registerTitle.style.opacity = 1;
}

function forgotPassword() {
    loginForm.style.left = "-50%";
    loginForm.style.opacity = 0;
    registerForm.style.left = "50%";
    registerForm.style.opacity = 1;
    wrapper.style.height = "580px";
    loginTitle.style.top = "-60px";
    loginTitle.style.opacity = 0;
    registerTitle.style.top = "50%";
    registerTitle.style.opacity = 1;
}

//-----Text Field Toggle if Data in Text Field < 0 ----//
const inputBoxes = document.querySelectorAll(".input-box");

inputBoxes.forEach(inputBox => {
    const input = inputBox.querySelector('.input-field');
    const label = inputBox.querySelector('label');
    const icon = inputBox.querySelector('.icon');

    if (input && label) {
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                const sharedStyles = {
                    top: '0px',
                    fontSize: '14px',
                    background: 'white',
                    borderRadius: '50px',
                    color: '$primary-color',
                    padding: '0 10px'
                };
                Object.assign(label.style, sharedStyles);
            } else {
                ['top', 'fontSize', 'background', 'borderRadius', 'color', 'padding'].forEach(prop => {
                    label.style[prop] = '';
                    if (icon) icon.style[prop] = '';
                });
            }
        });
    }
});



//--- refresh once
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}



