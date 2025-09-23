import { getUsers, addUser, getAllLogin } from "../../server/api.js";
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

const userData = {
    role: 'user'
};

let users = [];
let login = [];


document.addEventListener('DOMContentLoaded', async () => {
    await loadUsers();

    inputHandler('name', (value) => (value.length < 2 || value.length > 20));
    inputHandler('surname', (value) => (value.length < 2 || value.length > 20));
    inputHandler('patronymic', (value) => value.length > 20);
    inputHandler('telephone', phoneValidation, phoneInputHandler);
    inputHandler('birthday', formattedDateOfBirthError, formattedDateOfBirthInput);
    inputHandler('email', formattedEmailError);
    loginInput();
    passwordInput();
    inputHandler('repeat', checkPasswordRepeat);
});

function inputHandler(someName, funcError, customInput = null){
    const some = returnBoxInput(someName);

    some.input.addEventListener('input', () =>{
        if(!customInput){
            userData[someName] = some.input.value.trim();
            some.box.classList.remove('error');
        }else{
            customInput(some.input);
        }
    })

    errorHandler(some, funcError);
}

function returnBoxInput(name) {
    const box = document.querySelector(`#${name}`);

    const input = box.querySelector('input');

    return { box, input };
}

function errorHandler(some, funcError){
    some.input.addEventListener('blur', () => {
        funcError(some.input.value.trim()) ? some.box.classList.add('error') : some.box.classList.remove('error');
    });
}


async function loadUsers() {
    users = await getUsers();
    login = await getAllLogin();
}

async function maxIndex() {
    const maxId = users.reduce((max, user) => {
        return Math.max(max, parseInt(user.id));
    }, 0);
    
    return maxId;
}



//----------- TELEPHONE ----------------


function phoneInputHandler(inputElement) {
    const cursorPosition = inputElement.selectionStart;
    let value = inputElement.value.replace(/[^0-9]/g, ''); // Удаляем всё, кроме цифр
    let formattedValue = '+375 (';

    if(value.length == 1){
        value = '375' + value;
    }
    if (value.length > 3) {
        formattedValue += value.substring(3, 5);
    }
    if (value.length > 5) {
        formattedValue += ') ' + value.substring(5, 8);
    }
    if (value.length > 8) {
        formattedValue += '-' + value.substring(8, 10);
    }
    if (value.length > 10) {
        formattedValue += '-' + value.substring(10, 12);
    }

    inputElement.value = formattedValue;

    let newCursorPosition = cursorPosition;
    
    newCursorPosition = Math.max(7, formattedValue.length);

    inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    
    userData.telephone = formattedValue;
}


function phoneValidation(value) {
    const phoneRegex = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
    return !phoneRegex.test(value);
}


// ----------- EMAIL ----------------



function formattedEmailError(value) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [localPart] = value.split('@'); // Получаем часть до @

    if (localPart.length < 2 || localPart.length > 40) {
        return true; 
    }

    return !regex.test(value);
}


// ----------- DATE OF BIRTH ----------------



function formattedDateOfBirthError(value) {
    const regex = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;

    if (!regex.test(value)) return true; // Неверный формат даты

    const [day, month, year] = value.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const minDate = new Date(1990, 0, 1); // 01.01.1990

    // Проверка на допустимость даты
    if (birthDate < minDate || birthDate > today) {
        return true; // Дата недопустима
    }

    // Проверка на возраст старше 16 лет
    return !(today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), month - 1, day)) >= 16);
}

function formattedDateOfBirthInput(inputElement) {
    let value = inputElement.value.replace(/[^0-9]/g, ''); // Удаляем всё, кроме цифр

    // Автоматически добавляем точки при вводе
    if (value.length > 2) value = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '.' + value.slice(5, 9);
    value = value.slice(0, 10); // Ограничиваем длину

    // Разбиваем на день, месяц и год
    const [day = '', month = '', year = ''] = value.split('.');

    // Корректируем месяц (не больше 12)
    const monthNum = parseInt(month, 10);
    if (monthNum > 12) {
        value = `${day}.12${year ? '.' + year : ''}`;
    } else {
        // Корректируем день (в зависимости от месяца)
        const dayNum = parseInt(day, 10);
        if (day.length === 2 && month.length === 2 && dayNum > getMaxDaysInMonth(monthNum, year)) {
            const maxDays = getMaxDaysInMonth(monthNum, year);
            value = `${maxDays.toString().padStart(2, '0')}.${month}${year ? '.' + year : ''}`;
        }
    }

    inputElement.value = value;
    userData['birthday'] = value;
}

// Функция для определения максимального числа дней в месяце
function getMaxDaysInMonth(month, year) {
    if (month === 2) {
        if (year && year.length === 4) {
            const yearNum = parseInt(year, 10);
            return ((yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0) ? 29 : 28;
        }
        return 28; // Если год не введён, считаем невисокосным
    }
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
}


// ----------- LOGIN ----------------

const loginBox = document.querySelector(`#login`);
const inputLogin = loginBox.querySelector('input');
const loginBoxButton = loginBox.querySelector(`#loginGenerate`);

let countChance = 0;

loginBoxButton.addEventListener('click', async () => {
    loginBox.classList.remove('error');  

    if(countChance < 5){
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let nickname = '';
        const length = 8; 

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            nickname += characters[randomIndex];
        }

        countChance++;
        
        inputLogin.value = nickname
    }else{
        loginBox.classList.add('generate');
    }
});

function loginInput(){
    inputLogin.addEventListener('input', () =>{
        userData['login'] = inputLogin.value.trim();
        loginBox.classList.remove('error');   
        loginBox.classList.remove('generate');   
    })

    inputLogin.addEventListener('blur', () => {
        loginBox.classList.remove('generate');  
        if(login.includes(inputLogin.value) || inputLogin.value.length < 2 || inputLogin.value.length > 30) loginBox.classList.add('error');
    });
}


// ----------- PASSWORD ----------------

const regButton = document.querySelector('#registration');

const passwordBox = document.querySelector(`#password`);
const inputPassword = passwordBox.querySelector('input');
const passwordBoxButton = passwordBox.querySelector(`#passwordGenerate`);

const passwordBoxRepeat = document.querySelector(`#repeat`);
const inputPasswordBoxRepeat = passwordBoxRepeat.querySelector('input');

inputPasswordBoxRepeat.addEventListener('paste', (event) => {
    event.preventDefault(); 
});

//---------show/hide----------

const showHide = document.querySelector('#showHide');
console.log(showHide)
showHide.addEventListener('click', () => {
    console.log('sdfdsf')
    const isText = inputPassword.type === 'text';
    console.log(isText)
    
    inputPassword.type = isText ? 'password' : 'text';
    inputPasswordBoxRepeat.type = isText ? 'password' : 'text';
})

let countChancePassword = 0;

passwordBoxButton.addEventListener('click', async () => {
    passwordBox.className = 'text-container';

    if (countChancePassword < 5) {
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        const specialCharacters = '!@#$%^&*(),.?":{}|<>+=-_';
        
        // Убедимся, что пароль содержит хотя бы один символ из каждой категории
        let password = '';
        password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length)); // 1 строчная
        password += upperCase.charAt(Math.floor(Math.random() * upperCase.length)); // 1 заглавная
        password += digits.charAt(Math.floor(Math.random() * digits.length)); // 1 цифра
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length)); // 1 спецсимвол

        const allCharacters = lowerCase + upperCase + digits + specialCharacters;

        // Генерируем оставшиеся символы пароля
        const length = 14; 
        for (let i = password.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += allCharacters[randomIndex];
        }

        // Перемешиваем пароль для случайного порядка символов
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        countChancePassword++;
        
        inputPassword.value = password;
    } else {
        passwordBox.classList.add('generate');
    }
});

function passwordInput(){
    inputPassword.addEventListener('input', () =>{
        userData['password'] = inputPassword.value.trim();
        passwordBox.className = 'text-container';
    })

    inputPassword.addEventListener('blur', () => {
        const password = inputPassword.value;
        inputPasswordBoxRepeat.focus();

        if(!/[a-z]/.test(password)){
            addErrorPassword('one');
        }else{
            if(!/[A-Z]/.test(password)){
                addErrorPassword('two');
            }else{
                if(!/\d/.test(password)){
                    addErrorPassword('three');
                }else{
                    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
                        addErrorPassword('four');
                    }else{
                        if(password.length < 8 || password.length > 20){
                            addErrorPassword('five');
                        }else{
                            if(commonPasswords.includes(password)){
                                addErrorPassword('six');
                            }
                        }
                    }
                }
            }
        }       
        
        regButton.focus();
    });
}

function addErrorPassword(number){
    passwordBox.classList.add('err');
    passwordBox.classList.add(number);
}




// ----------- REPEAT PASSWORD ----------------


function checkPasswordRepeat(value) {
    return !(inputPassword.value === value);
}





// ------------------ REGISTRATION ---------------------




regButton.addEventListener('click', async function(event){
    if(checkField()){
        try {
            userData.id = (await maxIndex() + 1).toString();
            
            delete userData.repeat;

            await addUser(userData);

            const textTemp = currentLanguage == 'en' ? ['Success','Login','Your account has been successfully registered in the system!']
            : ['Успех','Логин','Ваш аккаунт был успешно зарегистрирован на сайте!']

            createModal('Success','Login','Your account has been successfully registered in the system!',
                false, '', () => window.location.href = '../../pages/authorization/authorization.html'
            );
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    }
})

function checkField() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.focus();
    });

    const hasError = document.querySelector('.error') !== null || document.querySelector('.err') !== null;

    const checkbox = document.querySelector('#agree input[type="checkbox"]');
    const isCheckboxChecked = checkbox ? checkbox.checked : false; 

    if (hasError || !isCheckboxChecked) {
        currentLanguage == 'en' ? createModal('Error','Close','Please fix the errors OR the user agreement is checked!') :
        createModal('Ошибка','Закрыть','Пожалуйста исправьте ошибки, или проверьте соглашение пользователя!')
    }
    console.log(hasError)
    return !hasError && isCheckboxChecked;
}