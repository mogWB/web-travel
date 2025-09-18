// ----------------------- setting 



// ------------------- reset

const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function(){
    //модальное

    localStorage.clear();
    window.location.reload();
})