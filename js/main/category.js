import {createPagginationBox} from './paggination.js'

const data = [
    {
        img: './assets/icons/calculate.svg',
        header: 'Calculated Weather ',
        desc: 'Built Wicket longer admire do barton vanity itself do in it.',
    },
    {
        img: './assets/icons/bestfly.svg',
        header: 'Best Flights',
        desc: 'Engrossed listening. Park gate sell they west hard for the.',
    },
    {
        img: './assets/icons/localeve.svg',
        header: 'Local Events',
        desc: 'Barton vanity itself do in it. Preferd to men it engrossed listening. ',
    },
    {
        img: './assets/icons/customize.svg',
        header: 'Customization',
        desc: 'We deliver outsourced aviation services for military customers',
    },
]

const dataChild = [];

function createDataChild(data){
    for(let i = 0; i < data.length; i++){
        const item = document.createElement('div');
        item.className = 'category-box-item shadow-5';

        const img = document.createElement('img');
        img.src = data[i].img;

        const header = document.createElement('p');
        header.classList.add('text-gs-20b');
        header.textContent = data[i].header;

        const desc = document.createElement('p');
        desc.classList.add('text-poppins-16-26n');
        desc.textContent = data[i].desc;
        
        item.appendChild(img);
        item.appendChild(header);
        item.appendChild(desc);

        dataChild.push(item);
    }
}

const category = document.querySelector('.category');
const categoryBox = document.querySelector('.category-box');

let flag = null;

function fillBoxWithout(){
    categoryBox.innerHTML = '';

    const pagginationBox = category.querySelector('.paggination');
    if(pagginationBox){
        pagginationBox.remove();
    }

    for(let i = 0; i < dataChild.length; i++){
        categoryBox.appendChild(dataChild[i]);
    }
}


function checkScreenWidth() {
    const screenWidth = window.innerWidth; 
    
    flag == null && flag == screenWidth > 600 ? false : true;

    if (screenWidth > 600) {
        if(!flag){
            fillBoxWithout();
            flag = true;
        }
    } else {
        if(flag){
            createPagginationBox(category, categoryBox, dataChild);
            flag = false;
        }
    }
}

createDataChild(data);
checkScreenWidth();

window.addEventListener('resize', checkScreenWidth);