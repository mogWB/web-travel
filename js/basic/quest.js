import { addQuestion } from "../../server/api.js";
import { startUp } from "../help/help.js";
import { createModal } from "./modal.js";

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

const email = document.querySelector('#email');
const quest = document.querySelector('#quest');

let user = null;
let page = window.location.href;

document.addEventListener('DOMContentLoaded', function(){
    user = JSON.parse(localStorage.getItem('user'));

    const type = email ? 'email' : 'quest';

    const box = type == 'email' ? email : quest;

    if(box){
        const input = box.querySelector('input');
        const button = box.querySelector('button');
        
        button.addEventListener('click', async function(){
            if(!user){
                const textTemp = currentLanguage == 'en' ? ['Ooops', 'Well', 'Before asking questions or receiving newsletters, please log in to the website!'] :
                ['Ууупс', 'Хорошо', 'Прежде чем задавать вопросы или получать новостную рассылку, пожалуйста, войдите на сайт!']

                createModal(...textTemp, false, '', () => {
                    window.location.href = '../../pages/authorization/authorization.html';
                })
            }else{
                if(type == 'email'){
                    if(formattedEmailError(input.value)){
                        const textTemp = currentLanguage == 'en' ? ['Thank you', 'Well', 'You\'ve been subscribed to receive the latest updates!'] :
                        ["Спасибо", "Хорошо", "Вы подписаны на получение последних обновлений!"]

                        createModal(...textTemp);
                        input.value = '';
                    }else{
                        const textTemp = currentLanguage == 'en' ? ['Ooops', 'Well', 'Email must contain 2 to 30 characters and match ...@gmail.com'] :
                        ['Ууупс', 'Хорошо', 'Почта должна содержать 2 - 30 символов и совпадать ...@gmail.com']

                        createModal(...textTemp)
                    }
                }else{
                    if(input.value.length >= 10 && input.value.length <= 300){
                        await addQuestion(input.value);
                        
                        if(page.includes('help') && user.role == 'admin') await startUp();

                        const textTemp = currentLanguage == 'en' ? ['Thank you', 'Well', 'Your question has been added to the system. Please wait for a response from the administrator on the Hepl page!'] :
                        ["Спасибо", "Хорошо", 'Ваш вопрос был добавлен в систему. Пожалуйста, дождитесь ответа от администратора на странице Hepl!']

                        createModal(...textTemp);
                        input.value = '';
                    }else{
                        const textTemp = currentLanguage == 'en' ? ['Ooops', 'Well', 'The question should be between 10 and 300 characters long'] :
                        ['Ууупс', 'Хорошо', "Длина вопроса должна составлять от 10 до 300 символов"]
                        
                        createModal(...textTemp)
                    }
                }
            }
        })
    }
})

function formattedEmailError(value) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [localPart] = value.split('@'); // Получаем часть до @

    if (localPart.length < 2 || localPart.length > 40) {
        return false; 
    }

    return regex.test(value);
}