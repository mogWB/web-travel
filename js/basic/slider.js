export function createSlider(boxWithSlide, boxCard, classCard, dataChild) {
    const dataSlide = {
        button: [],
        data: [...dataChild], 
        boxWithSlide: boxWithSlide,
        boxCard: boxCard,
        classCard: classCard
    };

    function createButtonSlider() {
        if (dataSlide.button.length > 0) {
            dataSlide.button[0].addEventListener('click', function() {
                const last = dataSlide.data.pop();
                dataSlide.data.unshift(last);
                fillSliderContainer();
            });

            dataSlide.button[1].addEventListener('click', function() {
                const start = dataSlide.data.shift();
                dataSlide.data.push(start);
                fillSliderContainer();
            });
        }
    }

    function findImageSlide() {
        dataSlide.button = dataSlide.boxWithSlide.querySelectorAll('.slide');
    }

    function fillSliderContainer() {
        const cards = dataSlide.boxCard.querySelectorAll(dataSlide.classCard);
        cards.forEach(card => card.remove());
        console.log('sdfdssd')
        for (let i = 0; i < Math.min(3, dataSlide.data.length); i++) {
            dataSlide.boxCard.appendChild(dataSlide.data[i]);
        }
    }

    findImageSlide();
    createButtonSlider();
    fillSliderContainer();
}
