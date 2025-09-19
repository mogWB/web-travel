document.addEventListener('DOMContentLoaded', () => {
    console.log('sdfsdf')
    const currentTheme = JSON.parse(localStorage.getItem('theme')) || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const currentPalette = localStorage.getItem('palette') || 'default';
    // updatePalette(currentPalette);
});


// function updatePalette(palette) {
//     const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';

//     const styles = {
//         default: {
//             background: isLightTheme ? '#e2d3d3ff' : '#141414',
//             help: '#BE2B31',
//             textColor: isLightTheme ? '#141414eb' : '#ffffff'
//         },
//         alternative1: {
//             background: isLightTheme ? '#e2d3d3ff' : '#141414',
//             help: isLightTheme ? '#5d7f80a1' : '#9c9867ff',
//             textColor: isLightTheme ? '#141414eb' : '#ffffffff'
//         },
//         alternative2: {
//             background: isLightTheme ? '#cfd1beff' : '#404040ff',
//             help: isLightTheme ? '#76a45bff' : '#4a5057ff',
//             textColor: isLightTheme ? '#222222' : '#f5f5f5'
//         }
//     };

//     const selectedStyles = styles[palette] || {};

//     document.documentElement.style.setProperty('--background', selectedStyles.background);
//     document.documentElement.style.setProperty('--help', selectedStyles.help);
//     document.documentElement.style.setProperty('--text-color', selectedStyles.textColor);
// }