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

    // try{
    //     await addCartDefault(user.id);
    // }catch(error){
    //     await deleteUser(user.id);
    // }

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



// ------------------- hotels

export const getFlights = async () => {
    const response = await fetch('http://localhost:3000/flights', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при получении полетов');
    }
    return response.json();
};