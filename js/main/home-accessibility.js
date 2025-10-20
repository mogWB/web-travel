// Обработка настроек доступности на главной странице

import { createSelect } from './basic/select.js';
import accessibilityManager from './basic/accessibility.js';

document.addEventListener('DOMContentLoaded', () => {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityModal = document.getElementById('accessibilityModal');
    const closeModal = document.getElementById('closeAccessibilityModal');
    const toggleImagesButton = document.getElementById('toggleImages');
    const fontSizeSelect = document.getElementById('accessibilityFontSize');

    // Открытие модального окна
    accessibilityToggle.addEventListener('click', () => {
        accessibilityModal.style.display = 'flex';
        initAccessibilitySettings();
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        accessibilityModal.style.display = 'none';
    });

    // Закрытие по клику вне модального окна
    accessibilityModal.addEventListener('click', (e) => {
        if (e.target === accessibilityModal) {
            accessibilityModal.style.display = 'none';
        }
    });

    // Инициализация настроек доступности
    function initAccessibilitySettings() {
        // Инициализация селекта размера шрифта
        const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';
        
        createSelect(
            currentLanguage == 'en' ? ['small', 'normal', 'large', 'extra-large'] : ['маленький', 'обычный', 'большой', 'очень большой'], 
            fontSizeSelect,
            (selectedValue) => {
                const temp = ['small', 'маленький'].includes(selectedValue) ? 'small' : 
                ['large', 'большой'].includes(selectedValue) ? 'large' : 
                ['extra-large', 'очень большой'].includes(selectedValue) ? 'extra-large' : 'normal';

                accessibilityManager.updateFontSize(temp);
            },
            currentLanguage == 'en' ? 
                (accessibilityManager.getFontSize() == 'small' ? 'small' : 
                 accessibilityManager.getFontSize() == 'large' ? 'large' : 
                 accessibilityManager.getFontSize() == 'extra-large' ? 'extra-large' : 'normal') :
                (accessibilityManager.getFontSize() == 'small' ? 'маленький' : 
                 accessibilityManager.getFontSize() == 'large' ? 'большой' : 
                 accessibilityManager.getFontSize() == 'extra-large' ? 'очень большой' : 'обычный')
        );

        // Обновление текста кнопки отключения изображений
        const buttonText = toggleImagesButton.querySelector('span');
        if (accessibilityManager.getImagesDisabled()) {
            buttonText.textContent = currentLanguage == 'en' ? 'Enable' : 'Включить';
        } else {
            buttonText.textContent = currentLanguage == 'en' ? 'Disable' : 'Отключить';
        }
    }

    // Обработчик кнопки отключения изображений
    toggleImagesButton.addEventListener('click', () => {
        const currentLanguage = JSON.parse(localStorage.getItem('language')) ?? 'en';
        const newState = !accessibilityManager.getImagesDisabled();
        accessibilityManager.updateImagesVisibility(newState);
        
        const buttonText = toggleImagesButton.querySelector('span');
        if (newState) {
            buttonText.textContent = currentLanguage == 'en' ? 'Enable' : 'Включить';
        } else {
            buttonText.textContent = currentLanguage == 'en' ? 'Disable' : 'Отключить';
        }
    });
});
