let baseLanguage = 'en';
let currentLanguage = JSON.parse(localStorage.getItem('language')) || baseLanguage;
let translations = {};
let translatedElements = new WeakSet();

// Флаг для отслеживания смены языка
let languageChanged = false;

async function loadTranslations(lang = currentLanguage) {
    try {
        const response = await fetch(`${window.location.href.includes('index.html') || window.location.href.endsWith('/') ? `./translations/${lang}.json`  : `../../translations/${lang}.json`}`);
        if (!response.ok) throw new Error('Failed to load translations');
        
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('language', JSON.stringify(lang));
        
        // При смене языка очищаем кэш
        if (languageChanged) {
            translatedElements = new WeakSet();
            languageChanged = false;
        }
        
        applyTranslations();
        return true;
    } catch (error) {
        console.error('Error loading translations:', error);
        if (lang !== baseLanguage) {
            return loadTranslations(baseLanguage);
        }
        return false;
    }
}

function applyTranslations() {
    const pageName = document.body.getAttribute('data-page');
    
    // Всегда обновляем title
    if (translations[pageName]?.title) {
        document.title = translations[pageName].title;
    }
    
    // Обрабатываем все элементы с атрибутами перевода
    processTranslationAttributes('data-i18n-common', translations.common);
    processTranslationAttributes('data-i18n', translations[pageName]);
    processTranslationAttributes('data-i18', translations); // Для совместимости
}

function processTranslationAttributes(attr, translationScope) {
    if (!translationScope) return;
    
    document.querySelectorAll(`[${attr}]`).forEach(el => {
        // Если язык не менялся и элемент уже переведен - пропускаем
        if (!languageChanged && translatedElements.has(el)) return;
        
        const keys = el.getAttribute(attr).split('.');
        const value = keys.reduce((obj, key) => obj?.[key], translationScope);
        
        if (value) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.textContent = value;
            }
            translatedElements.add(el);
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
});

// export default {
//     async setLanguage(lang) {
//         languageChanged = true;
//         await loadTranslations(lang);
//         this.translate();
//     },
//     currentLanguage: () => currentLanguage,
//     translate: () => applyTranslations(),
//     getTranslation: (path) => path.split('.').reduce((obj, key) => obj?.[key], translations)
// };

async function setLanguage() {
    const lang = JSON.parse(localStorage.getItem('language')) || 'en'; // Получаем язык из localStorage
    languageChanged = true;
    await loadTranslations(lang);
    applyTranslations(); // Обновляем переводы
}


export default { setLanguage };