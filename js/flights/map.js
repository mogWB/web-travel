import { createSlider } from '../basic/slider.js'
import { createPaggination } from '../basic/paggination.js'
import { createSelect } from '../basic/select.js';
import { getFlights } from '../../server/api.js';
import { createModal } from '../basic/modal.js';

const tripDayLink = '../../assets/icons/tripDay.svg';
const variantItem = ['flights', 'days', 'price', 'people', 'departure'];

const dataChild = [];
let flag = null;

let flights = {};
let flightsChild = {};

let continent = null;
let last = null;

let sortOption = null;
let searchValue = null;

let currentCardData = {}

const selling = document.querySelector('.sell');
const sellingBox = selling.querySelector('.sell-box');
const headerSelling = selling.querySelector('.section-header');
const sellingContinent = selling.querySelector('#continentText');
const sellingError = selling.querySelector('#noContinent');
const sellingErrorText = sellingError.querySelector('p');

const variant = document.querySelector('.variant');
const headerVariantFlight = variant.querySelector('.section-header >p:nth-of-type(2)');
const boxVariant = variant.querySelector('.variant-box >div')

document.addEventListener('DOMContentLoaded', async function(){
    flights = await getFlights();
    
    addDisplayContent(false);
    addDisplayContentVariant(false);
    addDisplayError('Выберите континент');
});

function addDisplayContent(display){
    sellingBox.style.display = display ? 'flex': 'none';
    headerSelling.style.display = display ? 'flex': 'none';
}

function addDisplayError(text){
    text && addDisplayContent(false);

    sellingError.style.display = text ? 'flex' : 'none';
    sellingErrorText.textContent = text;
}

function addDisplayContentVariant(display){
    variant.style.display = display ? 'flex': 'none';
}

function setVariant(){
    headerVariantFlight.textContent = currentCardData.country;
    boxVariant.innerHTML = '';

    for(let i = 0; i < variantItem.length; i++){
        const div = document.createElement('div');
        div.classList.add('text-container');

        const up = document.createElement('p');
        up.textContent = variantItem[i];

        const down = document.createElement('p');
        const dValue = currentCardData[variantItem[i] == 'flights' ? 'country' : variantItem[i]]

        down.textContent = variantItem[i] != 'price' ? dValue : `$${dValue}k`

        div.appendChild(up);
        div.appendChild(down);

        boxVariant.appendChild(div);
    }
    
    addDisplayContentVariant(true);
}

function createCard(data){
    const card = document.createElement('div');
    card.className = 'selling-card shadow-5';

    const img = document.createElement('img');
    img.src = data.image;

    const div1 = document.createElement('div');

    const p11 = document.createElement('p');
    p11.classList.add('text-poppins-18m');
    p11.textContent = data.country;

    const p12 = document.createElement('p');
    p12.classList.add('text-poppins-18m');
    p12.textContent = `$${data.price}k`;

    const div2 = document.createElement('div');

    const img2 = document.createElement('img');
    img2.src = tripDayLink;
    img2.alt = 'day';

    const p21 = document.createElement('p');
    p21.classList.add('text-poppins-16-20m');
    p21.textContent = data.days + ' Days Trip';

    div1.appendChild(p11);
    div1.appendChild(p12);
    div2.appendChild(img2);
    div2.appendChild(p21);

    card.appendChild(img);
    card.appendChild(div1);
    card.appendChild(div2);

    card.addEventListener('click', function(){
        currentCardData = data;
        setVariant();
    })

    return card;
}

function createDataChild(data){
    flightsChild[continent] = data.map(item => createCard(item));
}

function searchFlights(data, searchText) {
    if (!searchText) return data;
    
    return data.filter(flight => 
        flight.country.toLowerCase().includes(searchText.toLowerCase()) ||
        flight.price.toString().includes(searchText) ||
        flight.days.toString().includes(searchText)
    );
}

function sortFlights(data, sortOption) {
    const sortedArray = [...data];
    
    switch(sortOption) {
        case 'price 1 - 9':
            return sortedArray.sort((a, b) => a.price - b.price);
        case 'price 9 - 1':
            return sortedArray.sort((a, b) => b.price - a.price);
        case 'A - Z':
            return sortedArray.sort((a, b) => a.country.localeCompare(b.country));
        case 'Z - A':
            return sortedArray.sort((a, b) => b.country.localeCompare(a.country));
        default:
            return sortedArray;
    }
}

function applyFilters() {
    if (!continent || !flightsChild[continent]) return;

    let filteredData = [...flights[continent]];
    
    if (searchValue) {
        filteredData = searchFlights(filteredData, searchValue);
    }
    
    if (sortOption) {
        filteredData = sortFlights(filteredData, sortOption);
    }
    
    flightsChild[continent] = filteredData;
    console.log(filteredData)
   
    createDataChild(filteredData);
    
    flag = null;
    checkScreenWidth();

    if(filteredData.length == 0) addDisplayError('Нету данных удовлетворяющих условию');
    else addDisplayContent(true);
}

function checkScreenWidth() {
    const screenWidth = window.innerWidth; 
   
    if(flag == null) flag = screenWidth > 589 ? false : true;
    
    if(flightsChild[continent]){
        console.log(flag, 'tytyt1234')
        if (screenWidth > 589) {
            if(!flag){
                createSlider(selling, sellingBox, '.selling-card', flightsChild[continent]);
                flag = true;
            }
        } else {
            if(flag){
                createPaggination(flightsChild[continent], selling, sellingBox, '.selling-card');
                flag = false;
            }
        }
    }
}

function initSearch() {
    const searchInput = selling.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchValue = e.target.value.trim();
            applyFilters();
        });
    }
}

function initSelect() {
    try {
        createSelect(
            ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'], 
            selling.querySelector('.sell-setting >div:nth-of-type(1)'),

            (selectedValue) => {
                sortOption = selectedValue;
                
                applyFilters();
            }
        );
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Модифицируем обработчик клика по континентам
const images = document.querySelectorAll('.continent-box img');
images.forEach(image => {
    image.addEventListener('click', () => {
        if(last) last.classList.remove('active');
        last = image;
        image.classList.add('active');

        const value = image.getAttribute('data-value');
        continent = value;

        addDisplayContent(true);
        addDisplayError();
        sellingContinent.textContent = value;

        // Сбрасываем поиск при смене континента
        const searchInput = selling.querySelector('#search');
        if (searchInput) {
            searchInput.value = '';
            searchValue = null;
        }

        if(!Object.keys(flightsChild).includes(continent)){
            createDataChild(flights[continent]);
        }

        applyFilters();
    });
});


// Инициализация
checkScreenWidth();
initSelect();
initSearch();
window.addEventListener('resize', checkScreenWidth);



createModal(
    'Внимание!', 
    'Понятно', 
    'Вы уверены, что хотите выполнить это действие?',
    true,
    'Some text',
    (input) => {
        console.log('Кнопка нажата!', input);
    }
);