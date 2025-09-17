// Переменная для хранения текущего открытого селекта
let currentOpenSelect = null;

export function createSelect(option, box) {
    const selectIcon = box.querySelector('img');
    const selectText = box.querySelector('p');
    const selectOption = box.querySelector('.select-option');

    for(let i = 0; i < option.length; i++){
        const p = document.createElement('p');
        p.textContent = option[i];
        p.classList.add('text-gs-14-26m');

        p.addEventListener('click', function(){
            selectText.textContent = option[i];

            resolve(option[i]); // Возвращаем выбранное значение
            closeSelect(box);
        })

        selectOption.appendChild(p);
    }

    box.addEventListener('click', function(e) {
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
    });
    
    selectOption.addEventListener('scroll', function(e) {
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

document.addEventListener('click', function(e) {
    if (currentOpenSelect && !currentOpenSelect.contains(e.target)) {
        closeSelect(currentOpenSelect);
    }
});

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

window.addEventListener('resize', function() {
    if (currentOpenSelect) {
        closeSelect(currentOpenSelect);
    }
});