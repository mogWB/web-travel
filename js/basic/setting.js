document.addEventListener('DOMContentLoaded', () => {
    console.log('sdfsdf')
    const currentTheme = JSON.parse(localStorage.getItem('theme')) || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const currentPalette = JSON.parse(localStorage.getItem('palette')) || 'default';
    updatePalette(currentPalette);
});


export function updatePalette(palette) {
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';

    const styles = {
        default: {
            text: '#212832',
            text70: isLightTheme ? '#212832b3' : '#212832b3',
            background: isLightTheme ? '#ffffff' : '#888888'
        },
        'palette 1': {
            text: isLightTheme ? '#715191ff' : '#3156ebff',
            text70: isLightTheme ? '#563877a1' : '#3156eb7f',
            background: isLightTheme ? '#ffc6c6ff' : '#d4abc2ff'
        },
        'palette 2': {
            text: isLightTheme ? '#eb7560f6' : '#3073beff',
            text70: isLightTheme ? '#eb756074' : '#2e72c071',
            background: isLightTheme ? '#f7f7bdff' : '#ca7e7eff'
        }
    };

    const selectedStyles = styles[palette] || {};

    document.documentElement.style.setProperty('--text', selectedStyles.text);
    document.documentElement.style.setProperty('--text70', selectedStyles.text70);
    document.documentElement.style.setProperty('--background', selectedStyles.background);
}