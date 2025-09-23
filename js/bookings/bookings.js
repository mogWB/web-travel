import { completedCartService, deleteCartService, getAllCart, getCartUser } from "../../server/api.js";
import { createModal } from "../basic/modal.js";
import { createSelect } from "../basic/select.js";

const variantItemHotels = ['hotels', 'days', 'price', 'people', 'street'];
const variantItemFlights = ['flights', 'days', 'price', 'people', 'departure'];
const variantItemFlightsRu = ['Тур', 'Дней', 'цена', 'людей', 'выезд'];
const variantItemHotelsRu = ['Отель', 'дней', 'цена', 'людей', 'улица'];

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

let timeHotels = currentLanguage == 'en' ? 'future' : 'будущее';
let timeFlights = currentLanguage == 'en' ? 'future' : 'будущее';

let user = null;
let cart = null;
let cartTemp = null;

let cartTempHotels = {};
let cartTempFlights = {};

let searchHotels = null;
let searchFlights = null;
let sortHotels = null;
let sortFlights = null;

const orderHotels = document.querySelector('.order:nth-of-type(1)');
const timeButtonHotels = orderHotels.querySelector('#time');
const orderBoxHotels = orderHotels.querySelector('.order-box');
const noCardHotels = orderHotels.querySelector('#noCard');

const orderFlights = document.querySelector('.order:nth-of-type(2)');
const timeButtonFlights = orderFlights.querySelector('#time');
const orderBoxFlights = orderFlights.querySelector('.order-box');
const noCardFlights = orderFlights.querySelector('#noCard');

timeButtonHotels.addEventListener('click', function(){
    timeButtonHotels.textContent = currentLanguage == 'en' ? (timeButtonHotels.textContent == 'Future' ? 'Last' : 'Future')
    : (timeButtonHotels.textContent == 'Будущее' ? 'Прошлое' : 'Будущее');
    
    timeHotels = timeButtonHotels.textContent.toLowerCase();

    addData('hotels');
    dataError();
})

timeButtonFlights.addEventListener('click', function(){
    timeButtonFlights.textContent = currentLanguage == 'en' ? (timeButtonFlights.textContent == 'Future' ? 'Last' : 'Future')
    : (timeButtonFlights.textContent == 'Будущее' ? 'Прошлое' : 'Будущее');

    timeFlights = timeButtonFlights.textContent.toLowerCase();

    addData('flights');
    dataError();
})

document.addEventListener('DOMContentLoaded', async function(){
    user = JSON.parse(localStorage.getItem('user'));

    if(user?.role == 'user'){
        cart = await getCartUser(user.id);
        cartTemp = JSON.parse(JSON.stringify(cart));
    }else{
        if(user?.role == 'admin'){
            const temp = await getAllCart();
            console.log(temp);
            cart = temp.map(userItem => {
                const id = userItem.id;

                console.log(userItem)
                const flightsLast = userItem.last.flights.map(item => ({ ...item, userId: id }));
                const hotelsLast = userItem.last.hotels.map(item => ({ ...item, userId: id }));
                const flightsFuture = userItem.future.flights.map(item => ({ ...item, userId: id }));
                const hotelsFuture = userItem.future.hotels.map(item => ({ ...item, userId: id }));
                
                const lastT = {flights: flightsLast, hotels: hotelsLast};
                const futureT = {flights: flightsFuture, hotels: hotelsFuture}

                return {
                    last: lastT, 
                    future: futureT
                };
            });

            console.log(cart);
            const lf = {last: {hotels: [], flights: []}, future: {hotels: [], flights: []}};
            for(let i = 0; i < cart.length; i++){
                lf.last.hotels = [...lf.last.hotels, ...cart[i].last.hotels];
                lf.last.flights = [...lf.last.flights, ...cart[i].last.flights];

                lf.future.hotels = [...lf.future.hotels, ...cart[i].future.hotels];
                lf.future.flights = [...lf.future.flights, ...cart[i].future.flights];
            }

           
            cart = JSON.parse(JSON.stringify(lf));
            cartTemp = JSON.parse(JSON.stringify(lf));
            
            console.log(cart);
        }else{
            window.location.href = '../../pages/profile/profile.html';
        }
    }

    addDisplayError('hotels', false);
    addDisplayError('flights', false);

    startCreate();
    addData('flights');
    addData('hotels');
})

function createCard(data, type, time){
    const att = type == 'hotels' ? variantItemHotels : variantItemFlights;
    const attRu = type == 'hotels' ? variantItemHotelsRu : variantItemFlightsRu;

    const div = document.createElement('div');
    div.className = 'order-box-item';

    const divMain = document.createElement('div');

    for(let i = 0; i < att.length; i++){
        const container = document.createElement('div');
        container.className = 'text-container';

        const up = document.createElement('p');
        up.textContent = currentLanguage == 'en' ? att[i] : attRu[i];

        const down = document.createElement('p');
        const vl = att[i];
        down.textContent = data[vl == 'hotels' || vl == 'flights' ? 'country' : vl];

        container.appendChild(up);
        container.appendChild(down);
        divMain.appendChild(container);
    }

    const button = document.createElement('button');
    button.className = 'button-small';

    const span = document.createElement('span');
    span.className = 'text-gs-14m';
    span.textContent = currentLanguage == 'en' ? (time == 'future' ? (user.role == 'user' ? 'Remove' : 'Complete') : 'More')
                                            : (time == 'future' ? (user.role == 'user' ? 'Удалить' : 'Завершить') : 'Больше') ;

    button.appendChild(span);
    button.addEventListener('click', function(){
        if(time != 'future'){
            currentLanguage == 'en' ? createModal('More infornation', 'Well',
                `Country: ${data.country}\n
                Price: ${data.price}\n
                Days: ${data.days}\n
                People: ${data.people}\n
                Reserve ${data.date}\n
                Complete ${data.dateDone}\n
                ${type == 'hotels' ? `Street: ${data.street}` : `Departure: ${data.departure}`}`)
            : createModal('Больше информации', 'Хорошо',
                `Страна: ${data.country}\n
                Цена: ${data.price}\n
                Дней: ${data.days}\n
                Людей: ${data.people}\n
                Дата бронирования ${data.date}\n
                Дата завершения ${data.dateDone}\n
                ${type == 'hotels' ? `Улица: ${data.street}` : `Выезд: ${data.departure}`}`)
        }else{
            if(user.role == 'user'){
                const textTemp = currentLanguage != 'en' ? ['Внимание', 'Удалить', 'Вы действительно хотите отменить свою бронь?'] : ['Attention', 'Remove', 'Do you really want to cancel your reservation?']
                createModal(...textTemp, false, '', async () => {
                    await deleteCartService(user.id, type, data.id);
                    console.log('1', cartTempHotels)
                    console.log('1', cartTempFlights)
                    const itemIndex = cart['future'][type].findIndex(item => item.id == data.id);
                    cart['future'][type].splice(itemIndex, 1);
                    cartTemp['future'][type].splice(itemIndex, 1);
                   
                    createDataChild(type, 'future');
                    addData(type);
                })
            }else{
                if(user.role == 'admin'){
                    const textTemp = currentLanguage != 'en' ? ['Внимание', 'Удалить', 'Вы действительно хотите завершить бронь?'] : ['Attention', 'Complete', 'Do you really want to complete your booking?']
                    createModal(...textTemp, false, '', async () => {
                        await completedCartService(user.id, type, data.id);
                        
                        const serviceDone = cart['future'][type].find(item => item.id == data.id);
                        serviceDone.complete = formatDate();

                        cart['last'][type].push(serviceDone);
                        cartTemp['last'][type].push(serviceDone);

                        const itemIndex = cart['future'][type].findIndex(item => item.id == data.id);
                        cart['future'][type].splice(itemIndex, 1);
                        cartTemp['future'][type].splice(itemIndex, 1);

                        createDataChild(type, 'future');
                        createDataChild(type, 'last');
                        addData(type);
                })
                }
            }
            
        }
    })

    div.appendChild(divMain);
    div.appendChild(button);

    return div;
}

function createDataChild(type, time){
    const cth = type == 'hotels' ? cartTempHotels : cartTempFlights;

    console.log(cartTemp[time][type].length)
    cth[time] = []
    
    for(let i = 0; i < cartTemp[time][type].length; i++){
        cth[time].push(createCard(cartTemp[time][type][i], type, time));
    }

    dataError();
}

function dataError(){
    addDisplayError('hotels', cartTemp[timeHotels == 'будущее' ? 'future' : timeHotels == 'прошлое' ? 'last' : timeHotels]['hotels'].length == 0 ? true : false);
    addDisplayError('flights', cartTemp[timeFlights == 'будущее' ? 'future' : timeFlights == 'прошлое' ? 'last' : timeFlights]['flights'].length == 0 ? true : false);
}

function startCreate(){
    createDataChild('hotels', 'future');
    createDataChild('hotels', 'last');
    createDataChild('flights', 'future');
    createDataChild('flights', 'last');
}

function addData(type){
    const box = type == 'hotels' ? orderBoxHotels : orderBoxFlights;
    const cth = type == 'hotels' ? cartTempHotels : cartTempFlights;

    const time = type == 'hotels' 
    ? ((timeHotels == 'будущее') ? 'future' : (timeHotels == 'прошлое') ? 'last' : timeHotels) 
    : (timeFlights == 'будущее' ? 'future' : timeFlights == 'прошлое' ? 'last' : timeFlights);

    box.innerHTML = '';

    console.log('3', cartTempHotels)
    console.log('3', cartTempFlights)

    for(let i = 0; i < cth[time].length; i++){
        box.appendChild(cth[time][i]);
    }
}

function searchData(data, searchText) {
    if (!searchText) return data;
    
    return data.filter(flight => 
        flight.country.toLowerCase().includes(searchText.toLowerCase()) ||
        flight.price.toString().includes(searchText) ||
        flight.days.toString().includes(searchText)
    );
}

function sortData(data, sortOption) {
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

function addDisplayError(type, status){
    const box = type == 'hotels' ? orderBoxHotels : orderBoxFlights;
    const error = type == 'hotels' ? noCardHotels : noCardFlights;
    
    box.style.display = status ? 'none' : 'flex';
    error.style.display = status ? 'flex' : 'none';
}

function applyFilters(time, type) {
    // if (!continent || !flightsChild[continent]) return;
    console.log('основа', cart[time][type])
    let filteredData = [...cart[time][type]];
    
    console.log(filteredData)
    let searchValue = type == 'hotels' ? searchHotels : searchFlights;
    if (searchValue) {
        console.log('sdf')
        filteredData = searchData(filteredData, searchValue);
    }
    
    let sortOption = type == 'hotels' ? sortHotels : sortFlights;
    if (sortOption) {
        filteredData = sortData(filteredData, sortOption);
    }
    
    cartTemp[time][type] = filteredData;
    console.log(filteredData);
   
    createDataChild(type, time);

    addData(type);

    if(filteredData.length == 0) addDisplayError(type, true);
    else addDisplayError(type, false);
}

// aply
function initSearch() {
    const searchInputHotels = orderHotels.querySelector('#search');
    const searchInputFlights = orderFlights.querySelector('#search');

    if (searchInputHotels) {
        searchInputHotels.addEventListener('input', (e) => {
            searchHotels = e.target.value.trim();
            applyFilters(timeHotels,'hotels');
        });
    }

    if (searchInputFlights) {
        searchInputFlights.addEventListener('input', (e) => {
            searchFlights = e.target.value.trim();
            applyFilters(timeFlights, 'flights');
        });
    }
}

function initSelect() {
    try {
        createSelect(
            currentLanguage == 'en' ? ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'] : ['цена 1 - 9', 'цена 9 - 1', 'A - Я', 'Я - A'], 
            orderHotels.querySelector('.select'),

            (selectedValue) => {
                sortHotels = selectedValue;
                
                applyFilters(timeHotels,'hotels');
            }
        );

        createSelect(
            ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'], 
            orderFlights.querySelector('.select'),

            (selectedValue) => {
                sortFlights = selectedValue;
                
                applyFilters(timeFlights, 'flights');
            }
        );
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

initSearch();
initSelect();

//----------------
function formatDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем 1, затем ведущий ноль
    const year = date.getFullYear(); // Получаем год
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}

// async function awaitBookings(){
//     await 
// }