import { createPaggination } from "../basic/paggination.js";
import { createSlider } from "../basic/slider.js";

const box = document.querySelector('.event');
const cardBox = box.querySelector('.event-box');

const dataChild = [];
let flag = null;

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

const data = [
    {
        img: '../../assets/images/event1.jpg',
        up: 'Cultural Festival',
        down: 'Experience the vibrant culture with local music and art'
    },
    {
        img: '../../assets/images/event2.jpg',
        up: 'Food and Wine Tour',
        down: 'Taste local delicacies and fine wines from the best vineyards'
    },
    {
        img: '../../assets/images/event3.jpg',
        up: 'Adventure Sports Day',
        down: 'Join us for thrilling activities'
    },
    {
        img: '../../assets/images/event4.jpg',
        up: 'Historical City Tour',
        down: 'Explore the city’s rich history with guided tours'
    },
    {
        img: '../../assets/images/event5.jpg',
        up: 'Nature Retreat',
        down: 'Reconnect with nature through hiking and meditation'
    },
    {
        img: '../../assets/images/event6.jpeg', 
        up: 'Wildlife Safari',
        down: 'Experience the thrill of seeing wildlife in their natural habitat'
    }
];

const dataRu = [
    {
        img: '../../assets/images/event1.jpg',
        up: 'Культурный фестиваль',
        down: 'Погрузитесь в яркую культуру с местной музыкой и искусством'
    },
    {
        img: '../../assets/images/event2.jpg',
        up: 'Гастрономический тур с вином',
        down: 'Попробуйте местные деликатесы и лучшие вина из виноделен'
    },
    {
        img: '../../assets/images/event3.jpg',
        up: 'День приключенческих видов спорта',
        down: 'Присоединяйтесь к захватывающим активностям'
    },
    {
        img: '../../assets/images/event4.jpg',
        up: 'Исторический городской тур',
        down: 'Исследуйте богатую историю города с экскурсиями'
    },
    {
        img: '../../assets/images/event5.jpg',
        up: 'Природный ретрит',
        down: 'Восстановите связь с природой через пешие прогулки и медитацию'
    },
    {
        img: '../../assets/images/event6.jpeg', // Новое изображение
        up: 'Сафари на дикой природе',
        down: 'Испытайте волнение от встречи с дикой природой'
    }
];



function createCard(data, reverse){
    const div = document.createElement('div');
    div.classList.add('event-card');

    const img = document.createElement('img');
    img.src = data.img;

    const up = document.createElement('p');
    up.classList.add('text-gs-20b');
    up.textContent = data.up;

    const down = document.createElement('p');
    down.classList.add('text-poppins-16-26n');
    down.textContent = data.down;

    if(reverse){
        img.classList.add('event-card-margin');

        div.appendChild(img);
        div.appendChild(up);
        div.appendChild(down);
    }else{
        down.classList.add('event-card-margin');

        div.appendChild(up);
        div.appendChild(down);
        div.appendChild(img);
    }

    return div;
}

function createDataChild(){
    const dataT = currentLanguage == 'en' ? data : dataRu;

    for(let i = 0; i < dataT.length; i++){
        dataChild.push(createCard(dataT[i], i % 2));
    }
}

createDataChild();

function checkScreenWidth() {
    const screenWidth = window.innerWidth; 
    console.log()
    if(flag == null) flag = screenWidth > 410 ? false : true;
    
    if (screenWidth > 410) {
        if(!flag){
            createSlider(box, cardBox, '.event-card', dataChild);
            flag = true;
        }
    } else {
        if(flag){
            console.log('12345')
            createPaggination(dataChild, box, cardBox, '.event-card');
            flag = false;
        }
    }
}

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);