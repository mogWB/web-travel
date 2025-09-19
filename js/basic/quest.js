import { addQuestion } from "../../server/api.js";
import { createModal } from "./modal.js";

const email = document.querySelector('#email');
const quest = document.querySelector('#quest');

let user = null;

document.addEventListener('DOMContentLoaded', function(){
    user = JSON.parse(localStorage.getItem('user'));

    const type = email ? 'email' : 'quest';

    const box = type == 'email' ? email : quest;

    const input = box.querySelector('input');
    const button = box.querySelector('button');
    
    button.addEventListener('click', async function(){
        if(!user){
            createModal('Ooops', 'Well', 'Before asking questions or receiving newsletters, please log in to the website!', false, '', () => {
                window.location.href = '../../pages/authorization/authorization.html';
            })
        }else{
            if(type == 'email'){
                if(formattedEmailError(input.value)){
                    createModal('Thank you', 'Well', 'You\'ve been subscribed to receive the latest updates!');
                    input.value = '';
                }else{
                    createModal('Ooops', 'Well', 'Email must contain 2 to 30 characters and match ...@gmail.com')
                }
            }else{
                if(input.value.length >= 10 && input.value.length <= 300){
                    await addQuestion(input.value);
                    createModal('Thank you', 'Well', 'Your question has been added to the system. Please wait for a response from the administrator on the Hepl page!');
                    input.value = '';
                }else{
                    createModal('Ooops', 'Well', 'The question should be between 10 and 300 characters long')
                }
            }
        }
    })
})

function formattedEmailError(value) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [localPart] = value.split('@'); // Получаем часть до @

    if (localPart.length < 2 || localPart.length > 40) {
        return false; 
    }

    return regex.test(value);
}