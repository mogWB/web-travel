import { createPaggination } from "../basic/paggination.js";

const data = [
    {
        text: '“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”',
        name: 'Mike taylor',
        place: 'Lahore, Pakistan'
    },
    {
        text: '“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”',
        name: 'Chris Thomas',
        place: 'CEO of Red Button'
    },
    {
        text: '“1On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”',
        name: '1Mike taylor',
        place: '1Lahore, Pakistan'
    },
]

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
    for(let i = 0; i < data.length; i++){
        dataChild.push(createCard(data[i]));
    }
}

createDataChild();

createPaggination(dataChild, review, reviewCard, '.review-card');
createPaggination(dataChild, headerReview, reviewCard, '.review-card');