import { getAllCart, getCartUser } from "../../server/api.js";

const variantItemHotels = ['hotels', 'days', 'price', 'people', 'street'];
const variantItemFlights = ['flights', 'days', 'price', 'people', 'departure'];


let timeHotels = 'future';
let timeFlights = 'future';

let user = null;
let cart = null;

let cartTempHotels = {};
let cartTempFlights = {};

const orderHotels = document.querySelector('.order:nth-of-type(1)');
const timeButtonHotels = orderHotels.querySelector('#time');
const orderBoxHotels = orderHotels.querySelector('.order-box');

const orderFlights = document.querySelector('.order:nth-of-type(2)');
const timeButtonFlights = orderFlights.querySelector('#time');
const orderBoxFlights = orderFlights.querySelector('.order-box');

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
            cart = await getAllCart();
        }else{
            window.location.href = '../../pages/profile/profile.html';
        }
    }
    console.log(cart)
    startCreate();
    addData('flights');
    addData('hotels');
})

function createCard(data, type, time){
    const att = type == 'hotels' ? variantItemHotels : variantItemFlights;

    const div = document.createElement('div');
    div.className = 'order-box-item';

    const divMain = document.createElement('div');
    console.log(data);
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
    span.textContent = time == 'future' ? (user.role == 'user' ? 'Cancel' : 'Complete') : 'More';

    button.appendChild(span);
    button.addEventListener('click', function(){

    })

    div.appendChild(divMain);
    div.appendChild(button);

    return div;
}

function createDataChild(type, time){
    const cth = type == 'hotels' ? cartTempHotels : cartTempFlights;

    cth[time] = []
    for(let i = 0; i < cart[time][type].length; i++){
        cth[time].push(createCard(cart[time][type][i], type, time));
    }

    console.log(cth)
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

    console.log(box, cth, time)

    box.innerHTML = '';

    for(let i = 0; i < cth[time].length; i++){
        box.appendChild(cth[time][i]);
    }
}




// async function awaitBookings(){
//     await 
// }