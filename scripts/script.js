let allCards = [];

function initialize() {
    fetch('data/cardinfo.json')
        .then(response => response.json())
        .then(data => {
            allCards = data;
        })
        .catch(error => {
            console.error('Erro ao carregar cartas:', error);
        });
}

function searchCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = '';

    if (searchInput.length >= 3) {
        const filteredCards = allCards.filter(card => {
            return card.name.toLowerCase().includes(searchInput) || (card.desc && card.desc.toLowerCase().includes(searchInput));
        });

        filteredCards.forEach(card => {
            const cardItem = document.createElement('li');
            cardItem.className = 'card-item';

            const cardImage = document.createElement('img');
            cardImage.src = card.card_images[0].image_url_small;
            cardImage.alt = card.name;
            cardImage.className = 'card-image';

            const cardName = document.createElement('h3');
            cardName.textContent = card.name;
            cardName.className = 'card-name';

            cardItem.appendChild(cardImage);
            cardItem.appendChild(cardName);
            cardList.appendChild(cardItem);
        });
    }
}
