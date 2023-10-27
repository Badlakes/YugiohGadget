let allCards = [];

function loadAllCards() {
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;

    // Fazer solicitação para a API do YGOPRODECK com o parâmetro de idioma
    let searchURL = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
    if (selectedLanguage !== 'en') {
        searchURL += `?&language=${selectedLanguage}`;
    }

    fetch(searchURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar cartas: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            allCards = data.data; // Armazenar todas as cartas
        })
        .catch(error => {
            console.error('Erro ao carregar cartas:', error);
        });
}

function searchCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCards = allCards.filter(card => {
        return card.name.toLowerCase().includes(searchInput) || card.desc.toLowerCase().includes(searchInput);
    });


    const cardList = document.getElementById('cardList');
    cardList.innerHTML = ''; // Limpar a lista antes de exibir novos resultados

    // Exibir cartas filtradas
    // Criar uma tabela para exibir as cartas em grade
    const cardTable = document.createElement('table');
    cardTable.id = 'cardTable';
    cardTable.className = 'table table-striped table-bordered';
    cardTable.style.width = '100%';

    // Criar uma linha para cada carta encontrada
    filteredCards.forEach(card => {
        const cardRow = document.createElement('tr');

        // Criar uma célula para a imagem da carta
        const cardImageCell = document.createElement('td');
        const cardImage = document.createElement('img');
        cardImage.src = card.card_images[0].image_url_small;
        cardImage.width = 120;
        cardImage.height = 170;
        cardImageCell.appendChild(cardImage);
        cardRow.appendChild(cardImageCell);

        // Adicionar a linha da carta à tabela
        cardTable.appendChild(cardRow);
    });

    // Adicionar a tabela ao documento
    document.body.appendChild(cardTable);
}