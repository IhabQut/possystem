
document.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const productName = card.id;

    // Check if already added
    const existingCard = document.querySelector(`.added-card[data-name="${productName}"]`);
    if (existingCard) {
        const input = existingCard.querySelector('.number-viewr');
        const currentQty = parseInt(input.value);
        const maxQty = parseInt(existingCard.dataset.available);
        if (currentQty < maxQty) {
            input.value = currentQty + 1;
            updateTotal(existingCard);

        }
        return;
    }

    fetch('php/index-get-toBill.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ cardName: productName })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }

            const addedCard = document.createElement('div');
            addedCard.className = 'added-card';
            addedCard.dataset.name = data.cardName;
            addedCard.dataset.price = data.cPrice;
            addedCard.dataset.available = data.cQuantity;

            addedCard.innerHTML = `
            <div class="input-area">
                <button class="add" type="button"><i class='bx bx-plus icon-button'></i></button>
                <input class="number-viewr" type="number" min="0" value="1">
                <button class="remove" type="button"><i class='bx bx-minus icon-button'></i></button>
            </div>
            <div class="label-area">
                <div class="lLabel">
                    <label class="maintxt">المجموع</label>
                    <label class="smalltxt" name="priceLabel">${data.cPrice} ₪</label>
                </div>
                <div class="rLabel">
                    <label class="maintxt">${data.cardName}</label>
                    <label class="smalltxt">سعر العينة : ₪${data.cPrice}</label>
                    <label class="smalltxt">الكمية المتوفرة : ${data.cQuantity}</label>
                </div>
            </div>
        `;

            document.querySelector('.screen-reader').appendChild(addedCard);
            updateTotal(addedCard);
            updateTotalResult();
        })
        .catch(err => console.error('Fetch error:', err));
});

//----------- this function is to reduce card quantity when added to bill 



// ----------- pres to add/remove hold to add/remove faster

let holdTimer;
function startHold(button, direction) {
    let interval = 400;
    const card = button.closest('.added-card');
    const input = card.querySelector('.number-viewr');
    const maxQty = parseInt(card.dataset.available);

    function step() {
        let value = parseInt(input.value) || 0;

        if (direction === 'up' && value < maxQty) {
            value++;
        } else if (direction === 'down') {
            value--;
        }

        input.value = value;

        if (value <= 0) {
            card.remove();
        }

        updateTotal(card);
        interval = Math.max(50, interval - 50); // Speed up
        holdTimer = setTimeout(step, interval);
    }

    step();
}

document.addEventListener('mousedown', (e) => {
    if (e.target.closest('.add')) {
        startHold(e.target.closest('.add'), 'up');
    }
    if (e.target.closest('.remove')) {
        startHold(e.target.closest('.remove'), 'down');
    }
});

document.addEventListener('mouseup', () => clearTimeout(holdTimer));
document.addEventListener('mouseleave', () => clearTimeout(holdTimer));

document.addEventListener('input', (e) => {
    const input = e.target.closest('.number-viewr');
    if (!input) return;

    const card = input.closest('.added-card');
    let val = parseInt(input.value) || 0;
    const max = parseInt(card.dataset.available);

    if (val > max) val = max;
    if (val <= 0) {
        card.remove();
        updateTotalResult();

        return;
    }

    input.value = val;
    updateTotal(card);

});

// -------------- update card's totla
function updateTotal(card) {
    const quantity = parseInt(card.querySelector('.number-viewr').value) || 0;
    const price = parseFloat(card.dataset.price);
    const totalPrice = price * quantity;
    card.querySelector('[name="priceLabel"]').textContent = `${totalPrice.toFixed(2)} ₪`;
    updateTotalResult();
}

// -------------- update total price label
function updateTotalResult() {
    const allCards = document.querySelectorAll('.added-card');
    let total = 0;

    allCards.forEach(card => {
        const price = parseFloat(card.dataset.price || 0);
        const quantityInput = card.querySelector('.number-viewr');
        const quantity = parseInt(quantityInput?.value || 0);
        total += (price * quantity);
    });

    const totalLabel = document.querySelector('.total-result');
    if (totalLabel) {
        totalLabel.textContent = `₪${total.toFixed(2)}`;
    }


}

// Restrict input to max 3 digits and between 0–100
document.getElementById('saleValue').addEventListener('input', function () {
    let val = parseInt(this.value || '0');
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    this.value = val.toString().slice(0, 3); // keep only first 3 digits
});

// Apply percentage discount
document.getElementById('saleConfirm').addEventListener('click', () => {
    const totalText = document.querySelector('.total-result').textContent || '0';
    const saleText = document.getElementById('saleValue').value || '0';

    const total = parseFloat(totalText.replace(/[^\d.]/g, ''));
    const sale = parseFloat(saleText);

    if (!isNaN(total) && !isNaN(sale)) {
        document.querySelector('.btn-forms').style.display = "none";
        document.querySelector('.saleForm').style.display = "none";

        const discount = total * (sale / 100); // percent of total
        const newTotal = total - discount;

        document.querySelector('.total-result').textContent = `₪${newTotal.toFixed(2)}`;
        document.getElementById('saleValue').value = '';
    }
});


//------------------------------------------------bil functions


document.querySelector('.save-bill').addEventListener('click', function () {
    const addedCards = document.querySelectorAll('.added-card');
    const totalResult = parseFloat(document.querySelector('.total-result')?.textContent?.replace(/[^\d.]/g, '') || 0);
    const note = document.querySelector('.note-text').value.trim();

    if (totalResult === 0 || addedCards.length === 0) {
        alert("لا يوجد عناصر في الفاتورة!");
        return;
    }

    // Prepare quantities data
    const quantityUpdates = [];
    addedCards.forEach(card => {
        quantityUpdates.push({
            name: card.dataset.name,
            quantity: parseInt(card.querySelector('.number-viewr').value || 0)
        });
    });

    // Disable button during processing
    const saveBtn = this;
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';

    fetch('php/index-save-bill.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            total_sale: totalResult,
            note: note || 'null'
        })
    })
        .then(res => res.text())
        .then(response => {
            if (response.trim() === 'success') {

                window.location.reload();
                return fetch('php/update-card-quantities.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updates: quantityUpdates }),
                });
            } else {
                throw new Error('Failed to save bill');
            }
        })
        .then(res => res.json())
        .then(quantityResponse => {
            if (!quantityResponse.success) {
                throw new Error('Failed to update quantities: ' + quantityResponse.message);
            }

            // Clear bill area and note
            document.querySelector('.screen-reader').innerHTML = '';
            document.querySelector('.note-text').value = '';
            document.querySelector('.total-result').textContent = '0₪';

            // Reload bills
            loadBills();
            alert('تم حفظ الفاتورة وتحديث الكميات بنجاح!');
        })
        .catch(err => {
            console.error('Error:', err);
            alert('حدث خطأ: ' + err.message);
        })
        .finally(() => {
            saveBtn.disabled = false;
            saveBtn.textContent = 'حفظ الفاتورة';
        });
});


function loadBills() {
    fetch('php/index-load-bill.php')
        .then(res => res.json())
        .then(bills => {
            const container = document.getElementById('bill-content');
            container.innerHTML = '';
            bills.forEach(bill => {
                const div = document.createElement('div');
                div.className = 'bill';
                div.type = 'button';
                div.innerHTML = `
                    <div class="label-area">
                        <label for="bill">رقم الفاتورة
                            <i>${bill.billnum}</i>
                        </label>
                        <label for="bill">المجموع
                            <i>${bill.total_sale}₪</i>
                        </label>
                    </div>
                    <textarea readonly for="bill" class="note">${bill.note || ''}</textarea>
                `;
                container.appendChild(div);
            });
        });
}



// Load bills on page load
document.addEventListener('DOMContentLoaded', loadBills);
