import { createSlider } from '../basic/slider.js'
import { createPaggination } from '../basic/paggination.js'
import { createSelect } from '../basic/select.js';
import { addlService, getCartUser, getService, updateServicePrice } from '../../server/api.js';
import { createModal } from '../basic/modal.js';

const tripDayLink = '../../assets/icons/tripDay.svg';
const variantItem = ['flights', 'days', 'price', 'people', 'departure'];
const variantItemRu = ['Тур', 'Дней', 'цена', 'людей', 'выезд'];

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

let user = null;
let cart = null;

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
const boxVariant = variant.querySelector('.variant-box >div');

const reserve = variant.querySelector('#reserve');

document.addEventListener('DOMContentLoaded', async function(){
    flights = await getService('flights');

    addDisplayContent(false);
    addDisplayContentVariant(false);
    addDisplayError(currentLanguage == 'en' ? 'Select a continent' : 'Выберите континент');

    user = JSON.parse(localStorage.getItem('user'));

    if(user?.role == 'user'){
        cart = await getCartUser(user.id);
    }

    if(user?.role == 'admin')
    {
        const reserveText = document.createElement('span');
        reserveText.textContent = currentLanguage == 'en' ? 'Change' : 'Изменить';
        reserveText.className = 'text-gs-18m';

        reserve.innerHTML = '';
        
        reserve.appendChild(reserveText);
    }
});

function addDisplayContent(display){
    sellingBox.style.display = display ? 'flex': 'none';
    headerSelling.style.display = display ? 'flex': 'none';

    addDisplayError();
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
        up.textContent = currentLanguage == 'en' ? variantItem[i] : variantItemRu[i];

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
    console.log(data.price)
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
        currentCardData.continent = continent;

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
        case 'цена 1 - 9':
            return sortedArray.sort((a, b) => a.price - b.price);
        case 'price 9 - 1':
        case 'цена 9 - 1':
            return sortedArray.sort((a, b) => b.price - a.price);
        case 'A - Z':
        case 'A - Я':
            return sortedArray.sort((a, b) => a.country.localeCompare(b.country));
        case 'Z - A':
        case 'Я - A':
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

    if(filteredData.length == 0) addDisplayError(currentLanguage == 'en' ? 'No data satisfies the condition' : 'Нету данных удовлетворяющих условию');
    else addDisplayContent(true);
}

function checkScreenWidth() {
    const screenWidth = window.innerWidth; 
    
    if(flag == null) flag = screenWidth > 589 ? false : true;

    if(flightsChild[continent]){
        if (screenWidth > 589) {
            if(!flag){
                
                createSlider(selling, sellingBox, '.selling-card', flightsChild[continent]);
                flag = true;
            }
        } else {
            if(flag){
                console.log(flightsChild[continent])
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
            currentLanguage == 'en' ? ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'] : ['цена 1 - 9', 'цена 9 - 1', 'A - Я', 'Я - A'], 
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


//резерв
reserve.addEventListener('click', async function(){
    if(!user){
        currentLanguage == 'en' ? createModal('Ooops', 'Well', 'Please log in before placing an order :)') 
        : createModal('Ууупс', 'Хорошо', 'Пожалуйста, войдите в систему перед тем, как сделать заказ :)');
    }else{
        if(user.role == 'admin'){
            const tempText = currentLanguage == 'en' ? ['Change', 'Change', 'Please enter a new price..']
            : ['Изменить', 'Изменить', 'Пожалуйста введите новую цену..']

            createModal(...tempText, true, currentLanguage == 'en' ? 'Price' : 'Цена', async (input) => {
                try{
                    await updateServicePrice(currentCardData.id, 'flights', input);

                    window.location.reload();
                }catch(error){
                    setTimeout(() => {
                        currentLanguage == 'en' ? createModal('Ooops', 'Well', error) :
                        createModal('Ууупс', 'Хорошо', error)
                    }, 350)
                    
                }
            })
        }else{
            if(!cart.future.flights.some(item => item.id == currentCardData.id)){
                const tempText = currentLanguage == 'en' ? ['Reserve', 'Reserve', 'Do you really want to book a flight?']
                : ['Бронь', 'Бронь', 'Вы действительно хотите забронировать данный тур?']

                createModal(...tempText, false, '', async () => {
                    await addlService(user.id, 'flights', {...currentCardData, "reserve": formatDate()});
                    
                    cart = await getCartUser(user.id);
                })
            }else{
                currentLanguage == 'en' ? createModal('Ooops', 'Well', 'It looks like you already have this position in your booking. Once it\'s completed, it will become available again')
                : createModal('Упс', 'Хорошо', 'Похоже, что эта позиция уже есть в вашем бронировании. Как только оно будет завершено, она снова станет доступной.');
            }
        }
    }
})


// Инициализация
checkScreenWidth();
initSelect();
initSearch();
window.addEventListener('resize', checkScreenWidth);

function formatDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем 1, затем ведущий ноль
    const year = date.getFullYear(); // Получаем год
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}
