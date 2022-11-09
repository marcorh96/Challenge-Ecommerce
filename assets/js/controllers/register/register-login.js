import { login } from "../../models/login.js";
import { userServices } from "../../services/user-service.js"
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        direction: document.getElementById("direction").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        birth: document.getElementById("birth").value,
        id: uuid.v4(),
        status: "offline"
    };
    
    userServices
        .createUser(userData.username, userData.password, userData.direction, userData.phone, userData.email, userData.birth, userData.id, userData.status)
        .then(() => {
            console.log(userData.username, userData.password, userData.direction, userData.phone, userData.email, userData.birth, userData.id, userData.status)
            window.location.href = "./register__complete.html";
        })
        .catch((err) =>console.log(err))
});