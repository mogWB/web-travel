// ----------------------- setting 

import { createModal } from "../basic/modal.js";



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