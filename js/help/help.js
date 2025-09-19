import { addAnswerQuestion, deleteQuestion, getQuestions } from "../../server/api.js";
import { createModal } from "../basic/modal.js";

const selIcon = '../../assets/icons/arroww.svg';

const faqBox = document.querySelector('.faq-box');
const paggination = document.querySelector('.paggination');
const noCard = document.querySelector('#noCard');

let faq = null;
let faqCard = null;

let user = null;

let lastBox = null;

let countItemPage = 5;
let currentPage = 1;
let active = null;
let page;

document.addEventListener('DOMContentLoaded', async function(){
    if(window.location.href.includes('help')) await startUp();
})

export async function startUp(){
    user = JSON.parse(localStorage.getItem('user'));

    faq = await getQuestions();
    console.log(faq, 'sdsdfsdf');   
    if(!user || user.role == 'user'){
        faq = faq.filter(item => item.answer != undefined)
    }

    createDataChild();
    dataBox();
}

function createCard(data){
    const div = document.createElement('div');
    div.className = 'faq-item'

    const divFirst = document.createElement('div');

    const divSecond = document.createElement('div');

    const question = document.createElement('p');
    question.className = 'text-gs-18-26m'
    question.textContent = data.question;

    const img = document.createElement('img');
    img.src = selIcon;

    const answer = document.createElement('p');
    answer.className = 'text-poppins-14-20n'
    answer.textContent = data.answer;

    const divSetting = document.createElement('div');
    divSetting.className = 'faq-setting'

    const buttonAnswer = document.createElement('button');
    buttonAnswer.className = 'button-small'

    const spanAnswer = document.createElement('span');
    spanAnswer.className = 'text-gs-14m'
    spanAnswer.textContent = 'Answer';

    const buttonReset = document.createElement('button');
    buttonReset.className = 'button-small'

    const spanReset = document.createElement('span');
    spanReset.className = 'text-gs-14m'
    spanReset.textContent = 'Delete';

    buttonAnswer.appendChild(spanAnswer);
    buttonReset.appendChild(spanReset);

    buttonAnswer.addEventListener('click', function(){
        createModal('Answer question', 'Answer', 'Enter the response that other users will see.', true, 'Answer', async (input) =>{
            await addAnswerQuestion(data.id, input);

            const faqItem = faq.find(item => item.id === data.id);
            if (faqItem) faqItem.answer = input; 

            createDataChild();
            dataBox();
        })
    })

    buttonReset.addEventListener('click', async function(){
        createModal('Delete question', 'Remove', 'Do you really want to delete the question?', false, '', async () =>{
            await deleteQuestion(data.id);

            faq = faq.filter(item => item.id != data.id);

            createDataChild();
            dataBox();
        })
    })

    divSetting.appendChild(answer);
    user?.role == 'admin' && divSetting.appendChild(buttonAnswer);
    user?.role == 'admin' && divSetting.appendChild(buttonReset);
    
    divSecond.appendChild(answer);
    divSecond.appendChild(divSetting);

    divFirst.appendChild(question);
    divFirst.appendChild(img);

    div.appendChild(divFirst);
    div.appendChild(divSecond);

    div.addEventListener('click', function(){
        div.classList.add('active');

        if(lastBox){
            lastBox.classList.remove('active');
            if(lastBox == div) lastBox = null
            else lastBox = div;
            
        }else{
            lastBox = div;
        }

    })

    return div;
}

function createDataChild(){
    faqCard = [];

    for(let i = 0; i < faq.length; i++){
        faqCard.push(createCard(faq[i]));
    }
}

function dataBox(){
    page = Math.ceil(faqCard.length / countItemPage);
    
    if(page > 1){
        paggination.innerHTML = '';
        paggination.style.display = 'flex';

        for (let i = 0; i < page; i++) {
            const item = document.createElement('div');
            item.classList.add('paggination-item');

            item.addEventListener('click', function() {
                if (active) {
                    active.classList.remove('active');
                }
                item.classList.add('active');
                active = item;
                currentPage = i + 1;
                console.log(countItemPage * i, countItemPage * (i + 1))
                fiilBox(faqCard.slice(countItemPage * i, countItemPage * (i + 1)));
            });

            paggination.appendChild(item);

            if (i == currentPage - 1) {
                item.classList.add('active');
                active = item;
                currentPage = i + 1;

                fiilBox(faqCard.slice(countItemPage * i, countItemPage * (i + 1)));
            }
        }
    }else{
        fiilBox(faqCard);
    }
}

function fiilBox(data){
    faqBox.innerHTML = '';

    if(data.length == 0){
        noCard.style.display = 'flex';
        faqBox.style.display = 'none'
    }else{
        for(let i = 0; i < data.length; i++){
            faqBox.appendChild(data[i]);
        }
    }
}

