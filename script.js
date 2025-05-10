
//--- loading screen load function 
window.onload = function () {

    if (sessionStorage.getItem('firstLoadDone')) {

        const loadingCover = document.querySelector('.loading-cover');
        loadingCover.style.display = "none";
        return;
    } else {

        sessionStorage.setItem('firstLoadDone', 'true');

        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        const loadingCover = document.querySelector('.loading-cover');
        loadingCover.style.width = "100vw";
        loadingCover.style.height = "100%";
        loadingCover.style.opacity = "1";
        loadingCover.style.borderRadius = "0";
        loadingCover.style.transition = "0";

        setTimeout(() => {
            loadingCover.style.width = "1vw";
            loadingCover.style.height = "1vh";
            loadingCover.style.opacity = "0";
            loadingCover.style.borderRadius = "50px";
            loadingCover.style.transition = "0.3s";
        }, 800);

        setTimeout(() => {
            loadingCover.style.display = "none";
        }, 1500);

        return
    }
}
//---delete account
document.getElementById("delete-account-btn").addEventListener("click", function () {
    if (confirm("هل أنت متأكد أنك تريد حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.")) {
        fetch("php/delete_account.php", {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("تم حذف الحساب بنجاح.");
                window.location.href = "login_page.php";
            } else {
                alert("فشل حذف الحساب: " + (data.message || "خطأ غير معروف"));
            }
        })
        .catch(error => {
            alert("حدث خطأ في الاتصال بالخادم." + data.message);
            console.error(error);
        });
    }
});

//---darkmode button
function darkMode() {
    var element = document.body;
    element.classList.toggle("darkmode");
}

//--- logout button confirm button
document.querySelector('#logoutConfirm').addEventListener('click', () => {
    location.href = "php/logout.php";
});


//---- open/close custom menu
//-close when left click
const customMenu = document.querySelector('.custom-menu');
document.addEventListener('click', () => {
    customMenu.style.display = 'none';
});
//-open-for-cards

let selectedCard = null;
let selectedCategroy = null;

document.addEventListener('contextmenu', (event) => {
    const card = event.target.closest('.card');
    const category = event.target.closest('.category-select');
    if (card || category) {
        event.preventDefault();
        if (category) {
            selectedCategroy = category;
            selectedCard = null;
        } else {
            selectedCategroy = null;
            selectedCard = card;
        }

        customMenu.style.display = 'flex';
        customMenu.style.top = event.pageY + "px";
        customMenu.style.left = event.pageX + "px";
    } else {
        customMenu.style.display = 'none';
        selectedCard = null;
        selectedCategroy = null;
    }
});

//----- categor or card update option!!?
document.querySelector('.update').addEventListener('click', (e) => {
    const updateButton = e.currentTarget;

    if (selectedCard !== null) {
        updateButton.setAttribute('target-id', 'updateForm');
    } else if (selectedCategroy !== null) {
        updateButton.setAttribute('target-id', 'updateCatForm');
    } else {
        updateButton.removeAttribute('target-id');
    }
});



//----- delete for card
document.getElementById('deleteConfirm').addEventListener('click', () => {
    if (selectedCard || selectedCategroy) {
        const btnCover = document.querySelector(".btn-forms");
        const deleteForm = document.querySelector(".deleteForm");

        // If a product card is selected
        if (selectedCard !== null) {
            const cardName = selectedCard.id;

            fetch('../POS-SYSTEM/php/index-delete-card.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardName })
            }).then(res => res.json())
                .then(data => {
                    if (data.success) {
                        btnCover.style.display = "none";
                        deleteForm.style.display = "none";
                        selectedCard.remove();
                    } else {
                        alert('Failed to delete card.');
                    }
                });
        }

        // If a category is selected
        if (selectedCategroy !== null) {
            const categoryName = selectedCategroy.value;

            fetch('php/index-delete-category.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cName: categoryName })
            }).then(res => res.json())
                .then(data => {
                    if (data.success) {
                        btnCover.style.display = "none";
                        deleteForm.style.display = "none";
                        selectedCategroy.remove();
                    } else {
                        alert('Failed to delete category.');
                    }
                });
        }
        window.location.reload();
        selectedCard = null;
        selectedCategroy = null;
    }
});


//---- update categroies 
document.querySelector('#updateCatConfirm').addEventListener('click', function () {
    const categoryInput = document.getElementById('cName_update');
    const newName = categoryInput.value;
    const originalName = selectedCategroy.value;

    if (!newName) {
        alert('الرجاء اختيار تصنيف');
        return;
    }

    if (!selectedCategroy) {
        alert('حصل خطاء في اختيار التصنيف - حاول مرة اخرى');
        return;
    }



    const updateBtn = this;
    updateBtn.disabled = true;
    updateBtn.textContent = 'Updating...';

    const params = new URLSearchParams();
    params.append('original', originalName);
    params.append('new', newName);
    params.append('bName', '<?php echo $_SESSION["bName"]; ?>');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/index-update-category.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        updateBtn.disabled = false;
        updateBtn.textContent = 'تاكيد';

        try {
            const response = JSON.parse(this.responseText);

            if (this.status >= 200 && this.status < 300) {
                if (response.success) {
                    selectedCategroy.textContent = newName;
                    selectedCategroy.value = newName;

                    document.querySelector('.updateCatForm').style.display = 'none';
                    document.querySelector('.btn-forms').style.display = 'none';

                    alert('تم التحديث بنجاح!');
                    window.location.reload();
                    selectedCategroy = null;
                } else {
                    alert('Error: ' + response.message);
                    if (response.duplicate) {
                        categoryInput.value = originalName;
                    }
                }
            } else {
                throw new Error(response.message || 'خطاء في الطلب');

            }
        } catch (e) {
            console.error('Error:', e);
            alert('خطاء خلال المعالجة');
        }


    };

    xhr.onerror = function () {
        updateBtn.disabled = false;
        updateBtn.textContent = 'تاكيد';
        alert('Request failed');
    };

    xhr.send(params.toString());
});

// Update Card Functionality
document.getElementById("updateConfrim").addEventListener("click", function () {
    const pNameInput = document.getElementById("pName_update");
    const pPriceInput = document.getElementById("pPrice_update");
    const pQuantityInput = document.getElementById("pQuantity_update");
    const pCategorySelect = document.getElementById("Associated_cName_update");

    const newName = pNameInput.value.trim();
    const newPrice = pPriceInput.value.trim();
    const newQuantity = pQuantityInput.value.trim();
    const newCategory = pCategorySelect.value;
    const originalName = selectedCard ? selectedCard.id : "";

    if (!originalName) {
        alert("لم يتم اختيار كرت يرجى المحاولة مرة اخرى");
        return;
    }
    if (!newName || !newPrice || !newQuantity) {
        alert("يرجى تعبئة جميع الحقول");
        return;
    }

    const updateBtn = this;
    updateBtn.disabled = true;
    updateBtn.textContent = "Updating...";

    const params = new URLSearchParams();
    params.append('original', originalName);
    params.append('newName', newName);
    params.append('price', newPrice);
    params.append('quantity', newQuantity);
    params.append('category', newCategory);
    params.append('bName', '<?php echo $_SESSION["bName"]; ?>');

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/index-update-card.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        updateBtn.disabled = false;
        updateBtn.textContent = "تاكيد";

        try {
            const response = JSON.parse(this.responseText);

            if (response.success) {
                if (selectedCard) {
                    selectedCard.querySelector(".card-name").textContent = newName;
                    selectedCard.querySelector(".card-price").textContent = newPrice;
                    selectedCard.querySelector(".card-quantity").textContent = newQuantity;
                    selectedCard.id = newName;
                }
                alert("Card updated successfully!");
            } else {
                alert("Error: " + response.message);
            }
        } catch (e) {
            console.error("Error:", e);
            window.location.reload();
            alert("تم تحديث البطاقة بنجاح");
        }
    };

    xhr.onerror = function () {
        updateBtn.disabled = false;
        updateBtn.textContent = "تاكيد";
        alert("Request failed");
    };

    xhr.send(params.toString());
});