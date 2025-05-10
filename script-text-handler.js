//toggle Hiding Lable on Text Field  -> HEADER
const inputBoxes = document.querySelectorAll(".input-box");

inputBoxes.forEach(inputBox => {
    const input = inputBox.querySelector('.input-field');
    const label = inputBox.querySelector('label');
    if (input && label) {
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                label.style.opacity = "0"
            } else {
                label.style.opacity = '1';
            } 
        });
    }
});

//same function but for the rest

const inputArea = document.querySelectorAll(".input-area");

inputArea.forEach(inputBox => {
    const input = inputBox.querySelector('.input-field');
    const label = inputBox.querySelector('.placeHolder');
    if (input && label) {
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                label.style.opacity = "0"
            } else {
                label.style.opacity = '1';
            } 
        });
    }
});

//
const selectField = document.querySelector('#Associated_cName');
const label = document.querySelector('.placeHolder');

function selectHide() {
    if (selectField && label) {
        if (selectField.value.length > 0) {
            label.style.opacity = "0";
        } else {
            label.style.opacity = '1';
        } 
    };
}


// Function to check the screen width and update button text
function updateButtonText() {
    const button = document.querySelector('.btn-receipt');
    const icon = button.querySelector('i');
    
    if (window.innerWidth < 545) {
        button.textContent = '';
        button.appendChild(icon);
    } else {
        button.textContent = 'فواتير'; 
        button.prepend(icon); 
    }
}

updateButtonText();

window.addEventListener('resize', updateButtonText);
