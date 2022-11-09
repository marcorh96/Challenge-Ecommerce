const users = () => fetch('https://my-json-server.typicode.com/marcorh96/apijson/users').then((response) => response.json());


const createUser = (username, password, direction, phone, email, birth, id, status) =>{
    return fetch('https://my-json-server.typicode.com/marcorh96/apijson/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, direction, phone, email, birth, id, status}),
    });
};
//
export const userServices = {
    users,
    createUser
};
