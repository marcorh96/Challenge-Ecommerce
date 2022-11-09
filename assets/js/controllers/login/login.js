import { userServices } from "../../services/user-service.js";
const btnLogin = document.getElementById('btnLogin');
let userFound = false;

btnLogin.addEventListener('click', (event) =>{
    event.preventDefault();
    const userInput = document.querySelector('[data-username]').value;
    const passInput = document.querySelector('[data-password]').value;
    searchUser(userInput, passInput);
});




const searchUser = (userInput, passInput) => {
    userServices.users().then((data) => {
        console.log(data);
        for(let user of data){
            if(userInput == user.username && passInput == user.password){
                userFound = true;
                localStorage.clear();
                user.status = "online";
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user));
                alert("Bienvenido");
                window.location.href='../index.html';
                break;
            }
        }
        if(userFound == false) alert("Usuario no valido");
    }).catch(() => {
        alert("Ocurrio un error");
    });
    
}
