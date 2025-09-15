const book = document.querySelector('.book');
const bookCardBox = book.querySelector('.book-card');

const data = [
    {
        img: './assets/icons/book1.svg',
        up: 'Choose Destination',
        down: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. '
    },
    {
        img: './assets/icons/book2.svg',
        up: 'Make Payment',
        down: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. '
    },
    {
        img: './assets/icons/book3.svg',
        up: 'Reach Airport on Selected Date',
        down: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. '
    }
]

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
    for(let i = 0; i < data.length; i++){
        dataChild.push(createCard(data[i]));
    }
}


function fillBookCard(){
    for(let i = 0; i < dataChild.length; i++){
        bookCardBox.appendChild(dataChild[i]);
    }
}

createDataChild();
fillBookCard();