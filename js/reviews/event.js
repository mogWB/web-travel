import { createPaggination } from "../basic/paggination.js";
import { createSlider } from "../basic/slider.js";

const box = document.querySelector('.event');
const cardBox = box.querySelector('.event-box');

const dataChild = [];
let flag = null;

const data = [
    {
        img: '../../assets/images/sl1.png',
        up: 'Local Events',
        down: 'Barton vanity itself do in it. Preferd to men it engrossed listening. '
    },
    {
        img: '../../assets/images/sl2.png',
        up: 'Local Events',
        down: 'Barton vanity itself do in it. Preferd to men it engrossed listening. '
    },
    {
        img: '../../assets/images/sl3.png',
        up: 'Local Events',
        down: 'Barton vanity itself do in it. Preferd to men it engrossed listening. '
    },
    {
        img: '../../assets/images/sl3.png',
        up: 'Local Events',
        down: 'Barton vanity itself do in it. Preferd to men it engrossed listening. '
    },
]

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
    for(let i = 0; i < data.length; i++){
        dataChild.push(createCard(data[i], i % 2));
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