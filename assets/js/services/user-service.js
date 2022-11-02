const users = () => fetch('http://localhost:3000/users').then((response) => response.json());

const createUser = (username, password, direction, phone, email, birth, id, status) =>{
    return fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, direction, phone, email, birth, id, status}),
    });
};

export const userServices = {
    users,
    createUser,
};
