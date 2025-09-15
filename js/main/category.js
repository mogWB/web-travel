import {createPaggination} from '../basic/paggination.js'

const dataChild = [];
let flag = null;

const category = document.querySelector('.category');
const categoryBox = document.querySelector('.category-box');

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

function createCard(data){
    const item = document.createElement('div');
    item.className = 'category-box-item shadow-5';

    const img = document.createElement('img');
    img.src = data.img;

    const header = document.createElement('p');
    header.classList.add('text-gs-20b');
    header.textContent = data.header;

    const desc = document.createElement('p');
    desc.classList.add('text-poppins-16-26n');
    desc.textContent = data.desc;
    
    item.appendChild(img);
    item.appendChild(header);
    item.appendChild(desc);

    return item;
}

function createDataChild(){
    for(let i = 0; i < data.length; i++){
        dataChild.push(createCard(data[i]));
    }
}

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

// function checkScreenWidth() {
//     const screenWidth = window.innerWidth; 
    
//     flag == null && flag == screenWidth > 600 ? false : true;

//     if (screenWidth > 600) {
//         if(!flag){
//             fillBoxWithout();
//             flag = true;
//         }
//     } else {
//         if(flag){
//             createPagginationBox(category, categoryBox, dataChild);
//             flag = false;
//         }
//     }
// }

createDataChild();
// checkScreenWidth();

// window.addEventListener('resize', checkScreenWidth);

createPaggination(dataChild, category, categoryBox, '.category-box-item');