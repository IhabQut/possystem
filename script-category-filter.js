let selectedCat = null;

document.addEventListener('click', (event) => {
    const category = event.target.closest('.category-select');

    if (category) {
        document.querySelectorAll('.category-select').forEach(c => {
            c.style.background = '';
            c.style.color = '';
        });
        const hideShowCat = document.getElementById('showAll');
        selectedCat = category.getAttribute('value');
        category.style.background = 'var(--white-color)'; 
        category.style.color = 'var(--primary-color)';
        filterCards(selectedCat); 
        hideShowCat.style.background = ''; 
        hideShowCat.style.color = '';
    }
    
    const showAllBtn = event.target.closest('#showAll');
    if (showAllBtn) {
        showAllBtn.style.background = 'var(--white-color)'; 
        showAllBtn.style.color = 'var(--primary-color)';
        document.querySelectorAll('.category-select').forEach(c => {
            c.style.background = '';
            c.style.color = '';
        });
        selectedCat = 'all';
        filterCards('all');
    }
   
});

function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const pCategory = card.querySelector('.pCategory').textContent.trim();
        if (category === 'all' || category === pCategory) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}