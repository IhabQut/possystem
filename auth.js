const signInForm = document.querySelector(".login-form");
const signUpForm = document.querySelector(".register-form");
const registerBtn = document.querySelector("#SignUpBtn");
const loginBtn = document.querySelector("#SignInBtn");
const errorText = document.querySelector(".error-message");
const checkbox = document.getElementById("checkbox_policy");

// ------------------ SignIn Form

signInForm.onsubmit = (e) => {
    e.preventDefault();
};

loginBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php", true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if (data === "login-success") {
                    loginLoading()
                    setTimeout(() => {
                        location.href = "index.php";
                    }, 3000);

                } else {
                    errorText.classList.add("show");
                    errorText.textContent = data;

                    setTimeout(() => {
                        errorText.classList.remove("show");
                    }, 2000)
                }
            }
        }
    }
    let formData = new FormData(signInForm);
    xhr.send(formData);
}

function loginLoading() {
    const loadingCover = document.querySelector(".loading-cover");
    loadingCover.style.display = "flex";

    setTimeout(() => {
        loadingCover.style.width = "100vw";
        loadingCover.style.height = "100vh";
        loadingCover.style.opacity = "1";
        loadingCover.style.borderRadius = "0";
    }, 500);
    return;
}

// --------------- SignUP Form 

signUpForm.onsubmit = (e) => {
    e.preventDefault();
};

registerBtn.onclick = () => {
    if (checkbox.checked === false) {
        errorText.classList.add("show");
        errorText.textContent = "يرجى قبول شروط الاستخدام";

        setTimeout(() => {
            errorText.classList.remove("show");
        }, 2000)
        return;
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "php/register.php", true);
        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let data = xhr.response;
                    if (data === "registered-successfully") {
                        errorText.style.color = "green";
                        errorText.classList.add("show");
                        errorText.textContent = "تم التسجيل بنجاح";
                        setTimeout(() => {
                            errorText.classList.remove("show");
                            loginFunction();
                            errorText.style.color = "";
                        }, 2000)
                    } else {
                        errorText.classList.add("show");
                        errorText.textContent = data;

                        setTimeout(() => {
                            errorText.classList.remove("show");
                        }, 5000)
                    }
                }
            }
        }
        let formData = new FormData(signUpForm);
        xhr.send(formData);
    }
}

