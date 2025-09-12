const burgerButton = document.querySelector('.burger-button');
const burgerMenu = document.querySelector('.burger-menu');


burgerButton.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
})


function closeMenu() {
    burgerMenu.classList.remove('active');
}

window.addEventListener('scroll', closeMenu);
window.addEventListener('resize', closeMenu);