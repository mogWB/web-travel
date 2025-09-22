const book = document.querySelector('.book');
const bookCardBox = book.querySelector('.book-card');

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

const data = [
    {
        img: './assets/icons/book1.svg',
        up: 'Choose Destination',
        down: 'Select your travel destination from various options.'
    },
    {
        img: './assets/icons/book2.svg',
        up: 'Make Payment',
        down: 'Complete your booking with a secure payment method for convenience.'
    },
    {
        img: './assets/icons/book3.svg',
        up: 'Reach Airport on Selected Date',
        down: 'Arrive at the airport on your selected date for a smooth check-in.'
    }
];

const dataRu = [
    {
        img: './assets/icons/book1.svg',
        up: 'Выберите направление',
        down: 'Выберите направление путешествия из различных вариантов.'
    },
    {
        img: './assets/icons/book2.svg',
        up: 'Сделайте оплату',
        down: 'Завершите бронирование с помощью безопасного способа оплаты для удобства.'
    },
    {
        img: './assets/icons/book3.svg',
        up: 'Прибудьте в аэропорт',
        down: 'Прибудьте в аэропорт в выбранную дату для плавной регистрации.'
    }
];

const dataChild = [];

function createCard(data){
    const card = document.createElement('div');
    card.classList.add('book-card-item');

    const boxImg = document.createElement('div');
    boxImg.classList.add('book-card-item-image');

    const img = document.createElement('img');
    img.src = data.img;

    const boxText = document.createElement('div');
    boxText.classList.add('book-card-item-text');

    const textUp = document.createElement('p');
    textUp.classList.add('text-gs-16b');
    textUp.textContent = data.up;

    const textDown = document.createElement('p');
    textDown.classList.add('text-gs-12-16n');
    textDown.textContent = data.down;   

    boxImg.appendChild(img);

    boxText.appendChild(textUp);
    boxText.appendChild(textDown);

    card.appendChild(boxImg);
    card.appendChild(boxText);

    return card;
}

function createDataChild(){
    const dataT = currentLanguage == 'en' ? data : dataRu;

    for(let i = 0; i < dataT.length; i++){
        dataChild.push(createCard(dataT[i]));
    }
}


function fillBookCard(){
    for(let i = 0; i < dataChild.length; i++){
        bookCardBox.appendChild(dataChild[i]);
    }
}

createDataChild();
fillBookCard();