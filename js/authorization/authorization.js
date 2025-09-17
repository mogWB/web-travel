// import { getUsers } from "../../server/api.js";

let users = [
    {
        login: 'sss',
        password: '123'
    }
];

// document.addEventListener('DOMContentLoaded', async () => {
//     await loadUsers();
// });

// async function loadUsers() {
//     users = await getUsers();
// }

const authorizationButton = document.querySelector('#authorization');

const loginBox = document.querySelector(`#login`);
const passwordBox = document.querySelector(`#password`);

const loginInput = loginBox.querySelector('input');
const passwordInput = passwordBox.querySelector('input');

loginInput.addEventListener('input', function(){
    loginBox.classList.remove('error');
})

passwordInput.addEventListener('input', function(){
    passwordBox.classList.remove('error');
})

authorizationButton.addEventListener('click', function(){
    console.log(users)
    const foundUser = users.find(user => user.login == loginInput.value);

    if(!foundUser){
        loginBox.classList.add('error');
    }else{
        if(foundUser.password != passwordInput.value){
            passwordBox.classList.add('error');
        }else{
            localStorage.setItem('user', JSON.stringify(foundUser));
            window.location.href = '../../pages/profile/profile.html'
        }
    }

    a();
})

function a(){
    const storedUser = localStorage.getItem('user');
    console.log(JSON.parse(storedUser))
}