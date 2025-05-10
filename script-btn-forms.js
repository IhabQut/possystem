const showHideFormsBtn = document.querySelectorAll('.SHFbtn');
const closeBtn = document.querySelectorAll('.close');

let activeDiv = null;

//show/hide button for each button
showHideFormsBtn.forEach(button => {
    button.addEventListener('click', function (e) {
        const targetDivId = this.getAttribute('target-id');
        activeDiv = document.getElementById(targetDivId);
        const form = document.querySelector('.btn-forms');

        form.style.display = "flex";
        activeDiv.style.display = "flex";
    });
});

//close-function
closeBtn.forEach(button => {
    button.addEventListener('click', function close() {
        const form = document.querySelector('.btn-forms');
        const divForm = document.querySelectorAll('.hForm');
        form.style.display = 'none';

        divForm.forEach(element => {
            element.style.display = 'none';
        });
    })
});

