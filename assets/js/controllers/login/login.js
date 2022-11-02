import { userServices } from "../../services/user-service.js";
const btnLogin = document.getElementById('btnLogin');
let userFound = false;

btnLogin.addEventListener('click', (event) =>{
    event.preventDefault();
    const userInput = document.querySelector('[data-username]').value;
    const passInput = document.querySelector('[data-password]').value;
    searchUser(userInput, passInput);
});




function searchUser(userInput, passInput){
    userServices.users().then((data) => {
        console.log(data);
        for(let user of data){
            if(userInput == user.username && passInput == user.password){
                userFound = true;
                alert("Bienvenido");
                window.location.href='../index.html';
                break;
            }
        }
        if(userFound == false) alert("Usuario no valido");
        /*data.forEach(({username, password}) => {
            if(userInput == username && passInput == password) alert("Bienvenido");

        });*/
    }).catch(() => {
        alert("Ocurrio un error");
    });
    
}