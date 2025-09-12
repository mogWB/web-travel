let linkItem = null;

export function createPagginationBox(box, boxData, data){
    boxData.innerHTML = '';

    if(data.length > 0){
        boxData.appendChild(data[0]);
        
        const check = box.querySelector('.paggination');
        if(!check){
            const pagginationBox = document.createElement('div');
            pagginationBox.classList.add('paggination');

            for(let i = 0; i < data.length; i++){
                const item = document.createElement('div');
                item.classList.add('paggination-item');

                item.addEventListener('click', function(){
                    boxData.innerHTML = '';
                    boxData.appendChild(data[i]);
                    item.classList.add('active');

                    linkItem.classList.remove('active');
                    linkItem = item;
                })
                
                if(i == 0){
                    linkItem = item;
                    item.classList.add('active');
                }

                pagginationBox.appendChild(item);
            }

            box.appendChild(pagginationBox);
    }
    }else{
        console.log("Пустое.. Проверьте статичные данные!");
    }
}