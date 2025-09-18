// modal.js
let currentModal = null;

export function createModal(header, textButton, description, input = false, inputText = '', func = null) {
    if (currentModal) closeModal();
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    const headerElement = document.createElement('p');
    headerElement.textContent = header;
    headerElement.className = 'modal-header text-gs-20b'

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    descriptionElement.className = 'modal-description text-poppins-14-20n'

    const inputContainer = document.createElement('div');

    let inputElement = null;
    if (input) {
        inputContainer.className = 'text-container'

        const p = document.createElement('p');
        p.textContent = inputText;

        const label = document.createElement('label');
        label.className = 'input';

        inputElement = document.createElement('input');
        inputElement.placeholder = inputText

        label.appendChild(inputElement);

        inputContainer.appendChild(p);
        inputContainer.appendChild(label);
    }

    const button = document.createElement('button');
    button.className = 'button-small'

    const span = document.createElement('span');
    span.className = 'text-gs-14m'
    span.textContent = textButton;

    button.appendChild(span);
    button.addEventListener('click', () => {
        if (func) {
            const value = inputElement ? inputElement.value : null;
            func(value);
        }
        closeModal();
    });
    
    const contClose = document.createElement('div');
    contClose.className = 'modal-close';

    contClose.addEventListener('click', function(){
        closeModal();
    })

    const close = document.createElement('img');
    close.src = '../../assets/icons/close.svg';

    contClose.appendChild(close);

    // Собираем модальное окно
    modal.appendChild(contClose);
    modal.appendChild(headerElement);
    modal.appendChild(descriptionElement);
    
    if (input) {
        modal.appendChild(inputContainer);
    }
    
    modal.appendChild(button);
    overlay.appendChild(modal);

    // Добавляем в body
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // Запрещаем прокрутку

    // Анимация появления
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);

    // Сохраняем ссылку на текущее модальное окно
    currentModal = overlay;

    // Обработчик клика по overlay для закрытия
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Обработчик Escape для закрытия
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };
    document.addEventListener('keydown', escapeHandler);

    // Сохраняем обработчик для удаления
    overlay._escapeHandler = escapeHandler;

    return overlay;
}

export function closeModal() {
    if (currentModal) {
        // Удаляем обработчик Escape
        if (currentModal._escapeHandler) {
            document.removeEventListener('keydown', currentModal._escapeHandler);
        }

        // Анимация исчезновения
        currentModal.style.opacity = '0';
        const modal = currentModal.querySelector('.modal');
        if (modal) {
            modal.style.transform = 'scale(0.9)';
        }

        // Удаляем после анимации
        setTimeout(() => {
            if (currentModal && currentModal.parentNode) {
                currentModal.parentNode.removeChild(currentModal);
            }
            currentModal = null;
            document.body.style.overflow = ''; // Разрешаем прокрутку
        }, 300);
    }
}

// Функция для проверки, открыто ли модальное окно
export function isModalOpen() {
    return currentModal !== null;
}