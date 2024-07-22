let currentFilterText = '';
let currentCardType = 'all';
let currentPage = 1;

function loadAndDisplayCards() {
    const modal = document.getElementById('cardsModal');

    if (!modal.querySelector('.modal-content')) {
        const modalHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>

                <div class="itens-filter-container">

                    <div class="itens-filter-container">
                        <input type="text" id="searchBox" placeholder="Buscar carta...">
                        <select id="cardTypeFilter">
                            <option value="all">Filtrar por tipo</option>
                            <option value="Monster Card">Monstros</option>
                            <option value="Spell Card">Magias</option>
                            <option value="Trap Card">Armadilhas</option>
                        </select>
                    </div>

                    <div id="paginationControls" class="pagination"></div>
                    
                </div>

                <div id="cardsContainer" class="cards-container"></div>
            </div>
        `;
        modal.innerHTML = modalHTML;

        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        const searchBox = modal.querySelector('#searchBox');
        searchBox.addEventListener('keyup', () => {
            updateCardsDisplay(searchBox.value, 1, cardTypeFilter.value);
        });    

        const cardTypeFilter = modal.querySelector('#cardTypeFilter');
        cardTypeFilter.addEventListener('change', () => {
            updateCardsDisplay(searchBox.value, 1, cardTypeFilter.value);
        });
    }

    modal.style.display = "block";
    updateCardsDisplay();
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modal = document.getElementById('cardsModal');
        if (modal.style.display === "block") {
            modal.style.display = "none";
        }
    }
});

function calculateItemsPerPage() {
    const cardWidthWithMargin = 140 ;
    const desiredLinesPerPage = 3; 
    const containerWidth = $('#cardsContainer').width(); 
    const cardsPerLine = Math.floor(containerWidth / cardWidthWithMargin);
    const itemsPerPage = cardsPerLine * desiredLinesPerPage;

    return itemsPerPage;
}

function updateCardsDisplay(filterText = '', page = 1, cardType = 'all') {
    currentFilterText = filterText; 
    currentPage = page; 
    currentCardType = cardType;

    const itemsPerPage = calculateItemsPerPage(); 

    $.getJSON('https://db.ygoprodeck.com/api/v7/cardinfo.php', function(data) {
        let filteredData = data.data.filter(card => card.name.toLowerCase().includes(filterText.toLowerCase()));
        
        if (cardType !== 'all') {
            if (cardType === 'Spell Card') {
                filteredData = filteredData.filter(card => card.frameType === "spell");
            } else if (cardType === 'Trap Card') {
                filteredData = filteredData.filter(card => card.frameType === "trap");
            } else if (cardType === 'Monster Card') {
                filteredData = filteredData.filter(card => card.frameType != "spell" && card.frameType != "trap");
            }
        }

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filteredData.slice(start, end);

        $('#cardsContainer').empty();

        let cardsHTML = '';
        paginatedItems.forEach(card => {
            cardsHTML += `<div class="card">
                <img src="${card.card_images[0].image_url}" alt="${card.name}" title="${card.name}">
            </div>`;
        });
        $('#cardsContainer').html(cardsHTML);

        updatePaginationControls(filteredData.length, page, itemsPerPage);
    });
}

$(window).resize(function() {
    updateCardsDisplay(currentFilterText, currentPage, currentCardType);
});

function updatePaginationControls(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = $('#paginationControls');
    paginationContainer.empty();

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (currentPage - startPage < 2) {
        endPage = Math.min(totalPages, endPage + (2 - (currentPage - startPage)));
    }

    if (endPage - currentPage < 2) {
        startPage = Math.max(1, startPage - (2 - (endPage - currentPage)));
    }

    if (currentPage > 1) {
        paginationContainer.append(`<button id="prevPage"><</button>`);
    }

    if (currentPage >= 4) {
        paginationContainer.append(`<button id="firstPage">1..</button>`);
        startPage += 1;
    }

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationContainer.append(`<button class="page-number current-page">${i}</button>`);
        } else {
            paginationContainer.append(`<button class="page-number">${i}</button>`);
        }
    }

    if (currentPage < totalPages - 3) {
        paginationContainer.append(`<button id="lastPage">..${totalPages}</button>`);
    }

    if (currentPage < totalPages) {
        paginationContainer.append(`<button id="nextPage">></button>`);
    }

$('.page-number').click(function() {
    const selectedPage = parseInt($(this).text());
    updateCardsDisplay($('#searchBox').val(), selectedPage, currentCardType); 
});
$('#firstPage').click(() => updateCardsDisplay($('#searchBox').val(), 1, currentCardType)); 
$('#lastPage').click(() => updateCardsDisplay($('#searchBox').val(), totalPages, currentCardType)); 
$('#prevPage').click(() => updateCardsDisplay($('#searchBox').val(), currentPage - 1, currentCardType)); 
$('#nextPage').click(() => updateCardsDisplay($('#searchBox').val(), currentPage + 1, currentCardType)); 
}

export { loadAndDisplayCards };