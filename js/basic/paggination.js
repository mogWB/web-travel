export function createPaggination(dataChild, box, boxCard, classCard) {
    const dataPaggination = {
        data: dataChild,
        box: box,
        boxCard: boxCard,
        classCard: classCard,
    };

    let active = null;
    let number = null;

    function fillPagginationContainer() {
        const cards = dataPaggination.boxCard.querySelectorAll(dataPaggination.classCard);
        cards.forEach(card => card.remove());

        if (dataPaggination.data[number]) {
            dataPaggination.boxCard.appendChild(dataPaggination.data[number]);
        }
    }

    function createBox() {
        const pagginationBox = dataPaggination.box.querySelector('.paggination');
        
        for (let i = 0; i < dataPaggination.data.length; i++) {
            const item = document.createElement('div');
            item.classList.add('paggination-item');

            item.addEventListener('click', function() {
                if (active) {
                    active.classList.remove('active');
                }
                item.classList.add('active');
                active = item;
                number = i;

                fillPagginationContainer();
            });

            pagginationBox.appendChild(item);

            if (i === 0) {
                item.classList.add('active');
                active = item;
                number = i;

                fillPagginationContainer();
            }
        }
    }

    createBox();
}
