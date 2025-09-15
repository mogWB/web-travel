import {createSlider} from '../basic/slider.js'
import {createPaggination} from '../basic/paggination.js'

const tripDayLink = './assets/icons/tripDay.svg';

const dataChild = [];
let flag = null;

const selling = document.querySelector('.selling');
const sellingBox = selling.querySelector('.selling-content');

const data = [
    {
        img: './assets/images/sl1.png',
        place: 'Rome, Italy',
        cost: 5.42,
        dayt: '10 Days Trip',
    },
    {
        img: './assets/images/sl2.png',
        place: 'London, UK',
        cost: 4.2,
        dayt: '12 Days Trip',
    },
    {
        img: './assets/images/sl3.png',
        place: 'Full Europe',
        cost: 15,
        dayt: '28 Days Trip',
    },
    {
        img: './assets/images/sl2.png',
        place: 'London, UK',
        cost: 4.2,
        dayt: '12 Days Trip',
    },
]

function createCard(data){
    const card = document.createElement('div');
    card.className = 'selling-card shadow-5';

    const img = document.createElement('img');
    img.src = data.img;

    const div1 = document.createElement('div');

    const p11 = document.createElement('p');
    p11.classList.add('text-poppins-18m');
    p11.textContent = data.place;

    const p12 = document.createElement('p');
    p12.classList.add('text-poppins-18m');
    p12.textContent = `$${data.cost}k`;

    const div2 = document.createElement('div');

    const img2 = document.createElement('img');
    img2.src = tripDayLink;
    img2.alt = 'day';

    const p21 = document.createElement('p');
    p21.classList.add('text-poppins-16-20m');
    p21.textContent = data.dayt;

    div1.appendChild(p11);
    div1.appendChild(p12);
    div2.appendChild(img2);
    div2.appendChild(p21);

    card.appendChild(img);
    card.appendChild(div1);
    card.appendChild(div2);

    return card;
}

function createDataChild(){
    for(let i = 0; i < data.length; i++){
        dataChild.push(createCard(data[i]));
    }
}

createDataChild();

function checkScreenWidth() {
    const screenWidth = window.innerWidth; 
    
    flag == null && flag == screenWidth > 589 ? false : true;

    if (screenWidth > 589) {
        if(!flag){
            createSlider(selling, sellingBox, '.selling-card', dataChild);
            flag = true;
        }
    } else {
        if(flag){
            createPaggination(dataChild, selling, sellingBox, '.selling-card');
            flag = false;
        }
    }
}

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);