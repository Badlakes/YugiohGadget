//---------------------------- CARREGAR CARTAS

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

//---------------------------- PROCURAR CARTAS

const cardTable = document.createElement('table');
cardTable.className = 'table table-striped table-bordered';
cardTable.style.width = '100%';
cardTable.id = 'cardTable'; // Atribua um ID à tabela

function searchCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCards = allCards.filter(card => {
        return card.name.toLowerCase().includes(searchInput) || card.desc.toLowerCase().includes(searchInput);
    });
    const cardList = document.getElementById('cardList');
    cardTable.innerHTML = '';

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

/*
//---------------------------- IMAGEM CÂMERA
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureBtn');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error("Erro ao acessar a câmera: ", error);
    });

    captureButton.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('/image/png');
    window.open(imageDataUrl);
});
 */

//---------------------------- PESQUISAR CARTA ESPECÍFICA

var infoCarta = '';
function loadDarkMagician() {
    let searchURL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=mago%20negro&language=pt`;
  
    fetch(searchURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar cartas: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {

      const darkMagicianInfoDiv = document.getElementById('dark-magician-info');
  
      const darkMagicianImage = document.createElement('img');
      darkMagicianImage.src = data.data[0].card_images[0].image_url;

      const darkMagicianNameParagraph = document.createElement('p');
      infoCarta +=  darkMagicianNameParagraph.textContent = data.data[0].name;

      const darkMagicianTypeParagraph = document.createElement('p');
      infoCarta += darkMagicianTypeParagraph.textContent = data.data[0].type;

      const darkMagicianAttributeParagraph = document.createElement('p');
      infoCarta += darkMagicianAttributeParagraph.textContent = data.data[0].attribute;

      const darkMagicianLevelParagraph = document.createElement('p');
      infoCarta += darkMagicianLevelParagraph.textContent = `Nível: ${data.data[0].level}`;

      const darkMagicianAttackParagraph = document.createElement('p');
      infoCarta += darkMagicianAttackParagraph.textContent = `Ataque: ${data.data[0].atk}`;

      const darkMagicianDefenseParagraph = document.createElement('p');
      infoCarta += darkMagicianDefenseParagraph.textContent = `Defesa: ${data.data[0].def}`;

      const darkMagicianEffectParagraph = document.createElement('p');
      darkMagicianEffectParagraph.textContent = data.data[0].desc;

      infoCarta += darkMagicianEffectParagraph.textContent = darkMagicianEffectParagraph.textContent.replace(/\n/g, '<br />');

      darkMagicianInfoDiv.appendChild(darkMagicianImage);
      darkMagicianInfoDiv.appendChild(darkMagicianNameParagraph);
      darkMagicianInfoDiv.appendChild(darkMagicianTypeParagraph);
      darkMagicianInfoDiv.appendChild(darkMagicianAttributeParagraph);
      darkMagicianInfoDiv.appendChild(darkMagicianLevelParagraph);
      darkMagicianInfoDiv.appendChild(darkMagicianAttackParagraph);
      darkMagicianInfoDiv.appendChild(darkMagicianDefenseParagraph);
      darkMagicianInfoDiv.appendChild(darkMagicianEffectParagraph);
    })
    .catch(error => {
        console.log("Deu ruim chefe")
    })
}

//---------------------------- TTS CARTA ESPECÍFICA

var voiceList = document.querySelector('#voiceList');
var btnSpeak = document.querySelector('#btnSpeak');

var tts = window.speechSynthesis;
var voices = [];

document.addEventListener('DOMContentLoaded', (event) => {
    GetVoices();
});

if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = GetVoices;
}
if (btnSpeak !=null){
btnSpeak.addEventListener('click', ()=>{
    var toSpeak = new SpeechSynthesisUtterance(infoCarta);
    var selectedVoiceName = voiceList.options[voiceList.selectedIndex].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });

    tts.speak(toSpeak);
})
}


function GetVoices(){
    const speechSynthesis = window.speechSynthesis;

    const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    };

    const buttonGetVoice = document.querySelector('#btnSpeak');

    if (buttonGetVoice != null){
        buttonGetVoice.addEventListener('click', () => {
        const text = document.querySelector('p').value;
        speak(text);
        });
    }


    voices = tts.getVoices();
    if (voiceList != null){
        voiceList.innerHTML = '';
        voices.forEach((voice)=>{
            var listItem = document.createElement('option');
            listItem.textContent = voice.name;
            listItem.setAttribute('data-lang', voice.lang)
            listItem.setAttribute('data-name', voice.name)
            voiceList.appendChild(listItem);
        });

        voiceList.selectedIndex = 0;
    }
}