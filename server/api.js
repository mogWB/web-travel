export const getUsers = async (user) => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении пользователей');
    }
    return response.json();
};

export const updatePassword = async (userId, newPassword) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
        redirect: 'manual'
    });
    
    if (!response.ok) {
        throw new Error('Ошибка при обновлении пароля');
    }

    return response.json();
};

export const addUser = async (user) => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error('Ошибка при добавлении пользователя');

    const createdUser = await response.json();

    try{
        await addCartDefault(user.id);
    }catch(error){
        await deleteUser(user.id);
    }

    return createdUser;
};

export const deleteUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error('Ошибка при удалении пользователя');
    else throw new Error('Пользователь создан, но корзину создать не удалось. Пользователь удален.');
};


export const getAllLogin = async (user) => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении пользователей');
    }

    const users = await response.json();

    const logins = users.map(user => user.login);
    
    return logins;
};





//---------------- cart ----


export const addCartDefault = async (userId) => {
    const response = await fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: userId, last: {"flights": [], "hotels": []}, future: {"flights": [], "hotels": []}}),
    });
    if (!response.ok) {
        throw new Error('Ошибка при добавлении корзины для пользователя');
    }
    return response.json();
};

export const getAllCart = async () => {
    const response = await fetch(`http://localhost:3000/carts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении корзин пользователей');
    }
    return response.json();
};

export const getCartUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/carts/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении корзины для пользователя');
    }
    return response.json();
};






// ------------------- flights

export const getService = async (type) => {
    const response = await fetch(`http://localhost:3000/${type}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Ошибка при получении ${type}]`);
    }
    return response.json();
};

export const addlService = async (userId, type, service) => {
    const cart = await getCartUser(userId);

    cart.future[type].push(service); 

    const updateResponse = await fetch(`http://localhost:3000/carts/${userId}`, { // Отправляем обновлённую корзину обратно на сервер
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    });

    if (!updateResponse.ok) {
        throw new Error('Ошибка при обновлении корзины для пользователя');
    }

    return updateResponse.json();
};


export const updateServicePrice = async (serviceId, type, newPrice) => {
    const services = await getService(type);
    
    for (const key in services) {
        for(let i = 0; i < services[key].length; i++){
            if(services[key][i].id == serviceId){
                services[key][i].price = newPrice;
                break;
            }
        }
    }

    const response = await fetch(`http://localhost:3000/${type}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(services),
    });

    if (!response.ok) {
        throw new Error('Ошибка при обновлении цены услуги');
    }

    return response.json();
};
