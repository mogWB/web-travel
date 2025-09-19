import { completedCartService, deleteCartService, getAllCart, getCartUser } from "../../server/api.js";
import { createModal } from "../basic/modal.js";
import { createSelect } from "../basic/select.js";

const variantItemHotels = ['hotels', 'days', 'price', 'people', 'street'];
const variantItemFlights = ['flights', 'days', 'price', 'people', 'departure'];


let timeHotels = 'future';
let timeFlights = 'future';

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
    timeButtonHotels.textContent = (timeButtonHotels.textContent == 'Future' ? 'Last' : 'Future');

    timeHotels = timeButtonHotels.textContent.toLowerCase();

    addData('hotels');
})

timeButtonFlights.addEventListener('click', function(){
    timeButtonFlights.textContent = (timeButtonFlights.textContent == 'Future' ? 'Last' : 'Future');

    timeFlights = timeButtonFlights.textContent.toLowerCase();

    addData('flights');
})

document.addEventListener('DOMContentLoaded', async function(){
    user = JSON.parse(localStorage.getItem('user'));

    if(user?.role == 'user'){
        cart = await getCartUser(user.id);
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

    const div = document.createElement('div');
    div.className = 'order-box-item';

    const divMain = document.createElement('div');

    for(let i = 0; i < att.length; i++){
        const container = document.createElement('div');
        container.className = 'text-container';

        const up = document.createElement('p');
        up.textContent = att[i];

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
    span.textContent = time == 'future' ? (user.role == 'user' ? 'Remove' : 'Complete') : 'More';

    button.appendChild(span);
    button.addEventListener('click', function(){
        if(time != 'future'){
            createModal('More infornation', 'Well', `${data.country}${data.price}${data.days}${data.people}${data.date}`)
        }else{
            if(user.role == 'user'){
                createModal('Attention', 'Remove', 'Do you really want to cancel your reservation?', false, '', async () => {
                    await deleteCartService(user.id, type, data.id);
                    
                    const itemIndex = cart['future'][type].findIndex(item => item.id == data.id);
                    cart['future'][type].splice(itemIndex, 1);

                    createDataChild(type, 'future');
                    addData(type);
                })
            }else{
                if(user.role == 'admin'){
                    createModal('Attention', 'Complete', 'Do you really want to complete your booking?', false, '', async () => {
                        await completedCartService(user.id, type, data.id);
                        
                        const serviceDone = cart['future'][type].find(item => item.id == data.id);
                        serviceDone.dateDone = formatDate();

                        cart['last'][type].push(serviceDone);

                        const itemIndex = cart['future'][type].findIndex(item => item.id == data.id);
                        cart['future'][type].splice(itemIndex, 1);

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

    cth[time] = []
    for(let i = 0; i < cartTemp[time][type].length; i++){
        cth[time].push(createCard(cartTemp[time][type][i], type, time));
    }
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
    const time = type == 'hotels' ? timeHotels : timeFlights;

    box.innerHTML = '';

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
            ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'], 
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