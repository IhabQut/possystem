

//-----------SHOW/HIDE menu

const listBtn = document.querySelector("#list-btn");
const listMenu = document.querySelector(".list-menu");
const rightArea = document.querySelector(".right-area");
const leftArea = document.querySelector(".left-area");

let clickHandler = null;

const mediaQuery = window.matchMedia('(max-width: 545px)');

function handleMediaChange(e) {
    if (e.matches) {
        listMenu.style.display = "none";
        HIDE(rightArea);
        HIDE(leftArea);
        
        if (!clickHandler) {
            clickHandler = () => {
                if (listMenu.style.display === 'none') {
                    listMenu.style.display = "flex";
                    SHOW(rightArea);
                    SHOW(leftArea);
                } else {
                    listMenu.style.display = "none";
                    HIDE(rightArea);
                    HIDE(leftArea);
                }
            };
            listBtn.addEventListener("click", clickHandler);
        }
    } else {
        if (clickHandler) {
            listBtn.removeEventListener("click", clickHandler);
            clickHandler = null;
        }

        listMenu.style.display = "none";
        DEFAULT(rightArea);
        DEFAULT(leftArea);
    }
} 
handleMediaChange(mediaQuery);
mediaQuery.addListener(handleMediaChange);

function SHOW(element) {
    element.style.display = "flex";
    element.style.opacity = "1";
    if (element === leftArea) {
        element.style.transform = "translate(0px,280px)"
    } else {
        element.style.transform = "translate(0px,130px)"
    }
}

function HIDE(element) {
    element.style.display = "none";
    element.style.opacity = "0";
    if (element === leftArea) {
        element.style.transform = "translate(-20px,280px)"
    } else {
        element.style.transform = "translate(-20px,130px)"
    }
}

function DEFAULT(element) {
    element.style.display = "flex";
    element.style.opacity = "1";
    element.style.transform = "translate(0,0)"
}