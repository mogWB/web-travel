// ----------------------- setting 

import { createModal } from "../basic/modal.js";
import { createSelect } from "../basic/select.js";

let theme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'light';
let language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : 'english';
let palette = localStorage.getItem('palette') ? JSON.parse(localStorage.getItem('palette')) : 'default';

function initSelect() {
    try {
        createSelect(
            ['dark', 'light'], 
            document.querySelector('#theme'),

            (selectedValue) => {
                theme = selectedValue;
                localStorage.setItem('theme', JSON.stringify(theme));
            },
            theme
        );

        createSelect(
            ['russian', 'english'], 
            document.querySelector('#language'),

            (selectedValue) => {
                language = selectedValue;
                localStorage.setItem('language', JSON.stringify(language));
            },
            language
        );
        
        createSelect(
            ['palette 1', 'palette 2', 'default'], 
            document.querySelector('#palette'),

            (selectedValue) => {
                palette = selectedValue;
                localStorage.setItem('palette', JSON.stringify(palette));
            },
            palette
        );
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

initSelect();

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