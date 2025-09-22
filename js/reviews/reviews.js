import { createPaggination } from "../basic/paggination.js";

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

const data = [
    {
        text: '“The service was exceptional and the staff were very friendly. I had a great experience from start to finish, and I would highly recommend this agency to anyone looking to travel!”',
        name: 'Alice Johnson',
        place: 'New York, USA'
    },
    {
        text: '“A wonderful trip! Everything was well organized, and the guides were knowledgeable and passionate about the places we visited. I learned so much and had a fantastic time!”',
        name: 'David Smith',
        place: 'London, UK'
    },
    {
        text: '“I loved the cultural experiences offered during the trip. From local cuisine to traditional performances, it was truly unforgettable and enriched my understanding of the region!”',
        name: 'Emma Brown',
        place: 'Sydney, Australia'
    },
    {
        text: '“The food was amazing, and the accommodations were top-notch. Every detail was taken care of, making my stay incredibly comfortable. Recommend this travel agency!”',
        name: 'John Doe',
        place: 'Toronto, Canada'
    },
    {
        text: '“An incredible adventure! I can’t wait to book my next trip with them. The itinerary was perfect, and I felt like I experienced the best of what the destination had to offer!”',
        name: 'Sophia Lee',
        place: 'Seoul, South Korea'
    }
];

const dataRu = [
    {
        text: '“Обслуживание было исключительным, а персонал очень дружелюбным. У меня был отличный опыт от начала до конца, и я настоятельно рекомендую это агентство всем, кто хочет путешествовать!”',
        name: 'Алиса Джонсон',
        place: 'Нью-Йорк, США'
    },
    {
        text: '“Прекрасная поездка! Всё было хорошо организовано, а гиды были знающими и увлечёнными местами, которые мы посетили. Рекомендуем данное агенство! ”',
        name: 'Дэвид Смит',
        place: 'Лондон, Великобритания'
    },
    {
        text: '“Мне понравились культурные мероприятия, предложенные во время поездки. От местной кухни до традиционных представлений — это было незабываемо и обогатило моё понимание региона!”',
        name: 'Эмма Браун',
        place: 'Сидней, Австралия'
    },
    {
        text: '“Еда была потрясающей, а размещение на высшем уровне. Каждая деталь была учтена, что сделало моё пребывание невероятно комфортным. Настоятельно рекомендую это туристическое агентство!”',
        name: 'Джон Доу',
        place: 'Торонто, Канада'
    },
    {
        text: '“Невероятное приключение! Я не могу дождаться, чтобы забронировать свою следующую поездку с ними. Маршрут был идеальным, и я почувствовал этот момент.”',
        name: 'София Ли',
        place: 'Сеул, Южная Корея'
    }
];


const review = document.querySelector('.reviews');
const headerReview = review.querySelector('.header-box');
const reviewCard = review.querySelector('.reviews-card');
console.log(reviewCard)
const dataChild = [];

function createCard(data){
    const div = document.createElement('div');
    div.classList.add('review-card');

    const text = document.createElement('p');
    text.classList.add('text-poppins-16-26n');  
    text.textContent = data.text;

    const name = document.createElement('p');
    name.classList.add('text-poppins-18b');
    name.textContent = data.name;

    const place = document.createElement('p');
    place.classList.add('text-gs-14n');
    place.textContent = data.place;

    div.appendChild(text);
    div.appendChild(name);
    div.appendChild(place);

    return div;
}

function createDataChild(){
    const dataT = currentLanguage == 'en' ? data : dataRu;

    for(let i = 0; i < dataT.length; i++){
        dataChild.push(createCard(dataT[i]));
    }
}

createDataChild();

createPaggination(dataChild, review, reviewCard, '.review-card');
createPaggination(dataChild, headerReview, reviewCard, '.review-card');