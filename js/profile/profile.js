import { updatePassword } from "../../server/api.js";
import { createModal } from "../basic/modal.js";

const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';

const commonPasswords = [
    "Tes1_0000",
    "password",
    "123456",
    "123456789",
    "guest",
    "QWERTY",
    "12345678",
    "111111",
    "12345",
    "col123456",
    "123123",
    "1234567",
    "1234",
    "1234567890",
    "000000",
    "555555",
    "666666",
    "123321",
    "654321",
    "7777777",
    "123",
    "d1lakiss",
    "777777",
    "110110jp",
    "1111",
    "987654321",
    "121212",
    "gizli",
    "abc123",
    "112233",
    "azerty",
    "159753",
    "1q2w3e4r",
    "54321",
    "[email protected]",
    "222222",
    "qwertyuiop",
    "qwerty123",
    "qazwsx",
    "vip",
    "asdasd",
    "123qwe",
    "123654",
    "iloveyou",
    "a1b2c3",
    "999999",
    "Groupd2013",
    "1q2w3e",
    "usr",
    "Liman1000",
    "1111111",
    "333333",
    "123123123",
    "9136668099",
    "11111111",
    "1qaz2wsx",
    "password1",
    "mar20lt",
    "987654321",
    "gfhjkm",
    "159357",
    "abcd1234",
    "131313",
    "789456",
    "luzit2000",
    "aaaaaa",
    "zxcvbnm",
    "asdfghjkl",
    "1234qwer",
    "88888888",
    "dragon",
    "987654",
    "888888",
    "qwe123",
    "soccer",
    "3601",
    "asdfgh",
    "master",
    "samsung",
    "12345678910",
    "killer",
    "1237895",
    "1234561",
    "12344321",
    "daniel",
    "00000",
    "444444",
    "101010",
    "f–you",
    "qazwsxedc",
    "789456123",
    "super123",
    "qwer1234",
    "123456789a",
    "823477aA",
    "147258369",
    "unknown",
    "98765",
    "q1w2e3r4",
    "232323"
];

let textError = '';
const attribute = ['name', 'email', 'surname', 'telephone', 'patronymic', 'birthday']

const infoBox = document.querySelector('.auth');
const infoNonBox = document.querySelector('.non-auth');

const user = JSON.parse(localStorage.getItem('user'));

// ------------- info

if (user) { 
    const infoBoxMain = infoBox.querySelector('.info-box');

    for (let i = 0; i < attribute.length; i++) {
        const div = document.createElement('div');
        div.classList.add('text-container');

        const up = document.createElement('p');
        up.textContent = attribute[i];

        let downText = user[attribute[i]];

        // Обработка телефона
        if (attribute[i] == 'telephone') {
            downText = downText.replace(/^\+\d{3}\s*/, ''); // Удаляем код страны и оператора
        }

        if (attribute[i] == 'email') {
            downText = downText.split('@')[0]; // Оставляем только часть до '@'
        }
        
        const down = document.createElement('p');
        down.textContent = downText;

        div.appendChild(up);
        div.appendChild(down);

        infoBoxMain.appendChild(div);
    }
}




// ---------------- change password

if(!user){
    infoNonBox.style.display = 'flex';
    infoBox.style.display = 'none';

    const login = document.querySelector('#login');
    const reg = document.querySelector('#signup');

    login.addEventListener('click', function(){
        window.location.href = '../../pages/authorization/authorization.html';
    });

    reg.addEventListener('click', function(){
        window.location.href = '../../pages/registration/registration.html';
    });
}else{
    const passwordSetting = infoBox.querySelector('.info-box-setting');

    const oldPassword = passwordSetting.querySelector('#old');
    const newPassword = passwordSetting.querySelector('#new');
    const changePassword = passwordSetting.querySelector('#change');

    changePassword.addEventListener('click', async function(){
        const oldValue = oldPassword.value;
        const newValue = newPassword.value;

        if(user.password == oldValue){
            if(checkPassword(newValue)){
                user.password = newValue;
                
                localStorage.setItem('user', JSON.stringify(user));

                await updatePassword(user.id, newValue);

                oldPassword.value = '';
                newPassword.value = '';

                createModal('Success', 'Close', 'Your password has been successfully changed!');
            }else{
                createModal('Error', 'Close',  textError);
            }
        }else{
            createModal('Error','Close','You have entered an incorrect password. Please try again!');
        }
    })
}

function checkPassword(password){
    textError = '';

    if (!/[a-z]/.test(password)) {
        textError = 'The password must include at least one lowercase letter';
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        textError = 'The password must include at least one capital letter'
        return false;
    }
    if (!/\d/.test(password)) {
        textError = 'The password must include at least one circe'
        return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
        textError = 'The password must include at least one special character'
        return false;
    }
    if (password.length < 8 || password.length > 20) {
        textError = 'The password must contain 8-20 characters'
        return false;
    }
    if (commonPasswords.includes(password)) {
        textError = 'The password should not be among the top 100 passwords of 2023'
        return false;
    }

    return true;
}


