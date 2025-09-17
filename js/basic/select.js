// Переменная для хранения текущего открытого селекта
let currentOpenSelect = null;

export function createSelect(option, box) {
    const selectIcon = box.querySelector('img');
    const selectOption = box.querySelector('.select-option');

    box.addEventListener('click', function(e) {
        e.stopPropagation(); // Предотвращаем всплытие события
        
        // Закрываем предыдущий открытый селект
        if (currentOpenSelect && currentOpenSelect !== box) {
            closeSelect(currentOpenSelect);
        }
        
        // Открываем/закрываем текущий селект
        const isOpening = !selectOption.classList.contains('active');
        
        if (isOpening) {
            selectIcon.classList.add('active');
            selectOption.classList.add('active');
            currentOpenSelect = box;
        } else {
            closeSelect(box);
        }
    });
    
    // Предотвращаем закрытие при прокрутке внутри select-option
    selectOption.addEventListener('scroll', function(e) {
        e.stopPropagation(); // Останавливаем всплытие события прокрутки
    });
}

// Функция закрытия селекта
function closeSelect(selectElement) {
    const selectIcon = selectElement.querySelector('img');
    const selectOption = selectElement.querySelector('.select-option');
    
    selectIcon.classList.remove('active');
    selectOption.classList.remove('active');
    
    if (currentOpenSelect === selectElement) {
        currentOpenSelect = null;
    }
}

// Закрытие всех селектов при клике вне области
document.addEventListener('click', function(e) {
    if (currentOpenSelect && !currentOpenSelect.contains(e.target)) {
        closeSelect(currentOpenSelect);
    }
});

// Закрытие всех селектов при прокрутке (улучшенная версия)
document.addEventListener('scroll', function(e) {
    if (currentOpenSelect) {
        // Проверяем, является ли цель прокрутки или ее родители нашим select-option
        let target = e.target;
        let isScrollInsideSelect = false;
        
        while (target && target !== document.documentElement) {
            if (target.classList && target.classList.contains('select-option')) {
                isScrollInsideSelect = true;
                break;
            }
            target = target.parentElement;
        }
        
        // Закрываем только если прокрутка НЕ внутри select-option
        if (!isScrollInsideSelect) {
            closeSelect(currentOpenSelect);
        }
    }
}, true);
// Дополнительно: закрытие при изменении размера окна
window.addEventListener('resize', function() {
    if (currentOpenSelect) {
        closeSelect(currentOpenSelect);
    }
});