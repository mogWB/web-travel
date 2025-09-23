// ----------------------- setting 

import { createModal } from "../basic/modal.js";
import { createSelect } from "../basic/select.js";
import { updatePalette } from "../basic/setting.js";
import translationModule from '../basic/i18n.js';

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

let theme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'light';
let language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : 'english';
let palette = localStorage.getItem('palette') ? JSON.parse(localStorage.getItem('palette')) : 'default';

//найти п и изменить

function initSelect() {
    try {
        createSelect(
            currentLanguage == 'en' ? ['dark', 'light'] : ['темная', 'светлая'], 
            document.querySelector('#theme'),

            (selectedValue) => {
                const temp = ['dark', 'темная'].includes(selectedValue) ? 'dark' : 'light';

                theme = temp;
                localStorage.setItem('theme', JSON.stringify(temp));
                document.documentElement.setAttribute('data-theme', temp);
                updatePalette(palette);
            },
            currentLanguage == 'en' ? (theme == 'dark' ? 'dark' : 'light') : (theme == 'dark' ? 'темная' : 'светлая')
            
        );

        createSelect(
            currentLanguage == 'en' ? ['russian', 'english'] : ['русский', 'английский'], 
            document.querySelector('#language'),

            (selectedValue) => {
                const temp = ['russian', 'русский'].includes(selectedValue) ? 'russian' : 'english';

                language = temp;
                localStorage.setItem('language', JSON.stringify(['russian', 'русский'].includes(language) ? 'ru' : 'en'));
                translationModule.setLanguage();
                setLanguageChange();
            },
            currentLanguage == 'en' ? (['en', 'english'].includes(language) ? 'english' : 'russian') : (['en', 'english'].includes(language) ? 'английский' : 'русский')
        );
        
        createSelect(
            currentLanguage == 'en' ? ['palette 1', 'palette 2', 'default'] : ['палитра 1', 'палитра 2', 'по умолчанию'], 
            document.querySelector('#palette'),

            (selectedValue) => {
                const temp = ['palette 1', 'палитра 1'].includes(selectedValue) ? 'palette 1' : 
                ['palette 2', 'палитра 2'].includes(selectedValue) ? 'palette 2' : 'default';

                palette = temp;

                localStorage.setItem('palette', JSON.stringify(temp));
                updatePalette(palette);
            },
            currentLanguage == 'en' ? (['palette 1', 'палитра 1'].includes(palette) ? 'palette 1' : ['palette 2', 'палитра 2'].includes(palette) ? 'palette 2' : 'default') :
            (['palette 1', 'палитра 1'].includes(palette) ? 'палитра 1' : ['palette 2', 'палитра 2'].includes(palette) ? 'палитра 2' : 'по умолчанию')
        );
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

initSelect();

function setLanguageChange(){
    const th = document.querySelector('#theme >p');
    const ln = document.querySelector('#language >p');
    const pl = document.querySelector('#palette >p');

    console.log(language == 'english' ? (theme == 'dark' ? 'dark' : 'light') : (theme == 'dark' ? 'темная' : 'светлая'))

    th.textContent = language == 'english' ? (theme == 'dark' ? 'dark' : 'light') : (theme == 'dark' ? 'темная' : 'светлая')
    ln.textContent = language == 'english' ? (['en', 'english'].includes(language) ? 'english' : 'russian') : (['en', 'english'].includes(language) ? 'английский' : 'русский')
    pl.textContent = language == 'english' ? (['palette 1', 'палитра 1'].includes(palette) ? 'palette 1' : ['palette 2', 'палитра 2'].includes(palette) ? 'palette 2' : 'default') :
    (['palette 1', 'палитра 1'].includes(palette) ? 'палитра 1' : ['palette 2', 'палитра 2'].includes(palette) ? 'палитра 2' : 'по умолчанию')
}

// ------------------- reset

const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function(){
    createModal(
        'Attention', 
        'Confirm', 
        'Are you sure you want to perform this action?',
        false, '',
        () => {
            localStorage.clear();
            window.location.reload();
        }
    );
})