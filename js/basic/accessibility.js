// Модуль доступности для слабовидящих пользователей

class AccessibilityManager {
    constructor() {
        this.fontSize = localStorage.getItem('fontSize') ? JSON.parse(localStorage.getItem('fontSize')) : 'normal';
        this.imagesDisabled = localStorage.getItem('imagesDisabled') ? JSON.parse(localStorage.getItem('imagesDisabled')) : false;
        
        this.init();
    }

    init() {
        // Применяем сохраненные настройки при загрузке
        this.updateFontSize(this.fontSize);
        this.updateImagesVisibility(this.imagesDisabled);
    }

    // Функция для обновления размера шрифта
    updateFontSize(size) {
        const multipliers = {
            'small': 0.8,
            'normal': 1,
            'large': 1.2,
            'extra-large': 1.4
        };
        
        const multiplier = multipliers[size] || 1;
        document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
        this.fontSize = size;
        localStorage.setItem('fontSize', JSON.stringify(size));
    }

    // Функция для отключения/включения изображений
    updateImagesVisibility(disabled) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (disabled) {
                img.style.display = 'none';
            } else {
                img.style.display = '';
            }
        });
        this.imagesDisabled = disabled;
        localStorage.setItem('imagesDisabled', JSON.stringify(disabled));
    }

    // Получить текущий размер шрифта
    getFontSize() {
        return this.fontSize;
    }

    // Получить состояние изображений
    getImagesDisabled() {
        return this.imagesDisabled;
    }

    // Сбросить все настройки доступности
    resetAccessibilitySettings() {
        this.updateFontSize('normal');
        this.updateImagesVisibility(false);
    }
}

// Создаем глобальный экземпляр
const accessibilityManager = new AccessibilityManager();

// Экспортируем для использования в других модулях
export default accessibilityManager;
