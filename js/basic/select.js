// Переменная для хранения текущего открытого селекта
let currentOpenSelect = null;

export function createSelect(options, box, onChangeCallback) {
    const selectIcon = box.querySelector('img');
    const selectText = box.querySelector('p');
    const selectOption = box.querySelector('.select-option');

    // Очищаем старые опции
    selectOption.innerHTML = '';

    // Добавляем новые опции
    for (let i = 0; i < options.length; i++) {
        const p = document.createElement('p');
        p.textContent = options[i];
        p.classList.add('text-poppins-14-20n');

        p.addEventListener('click', function (e) {
            e.stopPropagation();
            selectText.textContent = options[i];
            
            // Вызываем callback с выбранным значением
            if (onChangeCallback) {
                onChangeCallback(options[i]);
            }
            
            closeSelect(box);
        });

        selectOption.appendChild(p);
    }

    // Обработчик клика по селекту
    const clickHandler = function (e) {
        if (e.target.tagName === 'P' && e.target.parentElement === selectOption) {
            return;
        }

        e.stopPropagation();

        if (currentOpenSelect && currentOpenSelect !== box) {
            closeSelect(currentOpenSelect);
        }

        const isOpening = !selectOption.classList.contains('active');

        if (isOpening) {
            selectIcon.classList.add('active');
            selectOption.classList.add('active');
            currentOpenSelect = box;
        } else {
            closeSelect(box);
        }
    };

    // Удаляем старый обработчик если был
    if (box._clickHandler) {
        box.removeEventListener('click', box._clickHandler);
    }

    box.addEventListener('click', clickHandler);
    box._clickHandler = clickHandler;

    selectOption.addEventListener('scroll', function (e) {
        e.stopPropagation();
    });
}

function closeSelect(selectElement) {
    const selectIcon = selectElement.querySelector('img');
    const selectOption = selectElement.querySelector('.select-option');

    selectIcon.classList.remove('active');
    selectOption.classList.remove('active');

    if (currentOpenSelect === selectElement) {
        currentOpenSelect = null;
    }
}

// Глобальные обработчики (оставляем без изменений)
document.addEventListener('click', function (e) {
    if (currentOpenSelect && !currentOpenSelect.contains(e.target)) {
        closeSelect(currentOpenSelect);
    }
});

document.addEventListener('scroll', function (e) {
    if (currentOpenSelect) {
        let target = e.target;
        let isScrollInsideSelect = false;

        while (target && target !== document.documentElement) {
            if (target.classList && target.classList.contains('select-option')) {
                isScrollInsideSelect = true;
                break;
            }
            target = target.parentElement;
        }

        if (!isScrollInsideSelect) {
            closeSelect(currentOpenSelect);
        }
    }
}, true);

window.addEventListener('resize', function () {
    if (currentOpenSelect) {
        closeSelect(currentOpenSelect);
    }
});