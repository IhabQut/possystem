
//------- Create New Card
document.getElementById('btnCardSubmit').addEventListener('click', function () {
    const pName = document.getElementById('pName').value.trim();
    const pPrice = document.getElementById('pPrice').value.trim();
    const pQuantity = document.getElementById('pQuantity').value.trim();
    const pCategory = document.getElementById('Associated_cName').value.trim();

    if (!pName || !pPrice || !pQuantity) {
        alert('يرجى تعبئة جميع الحقول');
        return;
    }

    fetch('../POS-SYSTEM/php/index-add-card.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            cardName: pName,
            cPrice: pPrice,
            cQuantity: pQuantity,
            cName: pCategory
        })
    })
        .then(res => res.text())
        .then(response => {
            const trimmedResponse = response.trim();
            if (trimmedResponse === 'success') {
                createCardElement(pName, pPrice, pQuantity, pCategory);
                document.getElementById('pName').value = '';
                document.getElementById('pPrice').value = '';
                document.getElementById('pQuantity').value = '';
                document.getElementById('Associated_cName').value = '';
            } 
            else if (trimmedResponse === 'duplicate') {
                alert('اسم المنتج موجود مسبقاً');
            } else {
                alert('خطأ أثناء الإضافة: ' + trimmedResponse);
            }
        })

        .catch(err => console.error('Fetch error:', err));
});

function createCardElement(name, price, quantity, category) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.id = name;

    card.innerHTML = `
      <i class="pName">${name}</i>
      <i class="pQuantity">الكمية المتوفرة : ${quantity}</i>
      <i class="pPrice">سعر المنتج : ₪${price}</i>
      <i class="pCategory">${category}</i>
    `;

    document.querySelector('.card-area').appendChild(card);
}

//---load Card on Page
document.addEventListener('DOMContentLoaded', () => {
    fetch('../POS-SYSTEM/php/index-get-card.php')
        .then(res => res.json())
        .then(cards => {
            cards.forEach(card => {
                createCardElement(card.cardName, card.cPrice, card.cQuantity, card.cName);
            });
        })
        .catch(err => console.error('Error loading cards:', err));
});
