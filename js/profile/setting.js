// ----------------------- setting 

import { createModal } from "../basic/modal.js";
import { createSelect } from "../basic/select.js";

const theme = null;
const language = null;
const palette = null;

function initSelect() {
    try {
        createSelect(
            ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'], 
            document.querySelector('#theme'),

            (selectedValue) => {
                sortOption = selectedValue;
            }
        );

        createSelect(
            ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'], 
            document.querySelector('#language'),

            (selectedValue) => {
                sortOption = selectedValue;
            }
        );
        
        createSelect(
            ['price 1 - 9', 'price 9 - 1', 'A - Z', 'Z - A'], 
            document.querySelector('#palette'),

            (selectedValue) => {
                sortOption = selectedValue;
            }
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