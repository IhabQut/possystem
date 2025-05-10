document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();

            if (query === "" || cardText.includes(query)) {
                card.style.display = ""; 
            } else {
                card.style.display = "none";
            }
        });
    });
});
