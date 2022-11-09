const ulNavList = document.getElementById('ulNavBar');

//Creo li para realizar la busqueda del elemento
const li = document.createElement('li');
li.classList.add('nav__item');
const div = document.createElement('div');
div.classList.add('nav__link', 'search');
li.appendChild(div);
const input = document.createElement('input');
input.classList.add('search__input');
input.placeholder = "Ingrese su busqueda";
div.appendChild(input);
const i = document.createElement('i');
i.classList.add('bx', 'bx-search');
div.appendChild(i);
//

//Creo li cerrar sesión
const liLogOut = document.createElement('li');
liLogOut.classList.add('nav__item');
const aLogOut = document.createElement('a');
aLogOut.href = "#";
aLogOut.classList.add('nav__link');
aLogOut.textContent = "Cerrar Sesión";
liLogOut.appendChild(aLogOut);
//

const loginNavList = () =>{
        const navList = `<li class="nav__item"><a href="/index.html" class="nav__link active">Inicio</a></li>
    <li class="nav__item"><a href="/views/login.html" class="nav__link">Login</a></li>
    </li>`;
    ulNavList.innerHTML = navList;
    ulNavList.appendChild(li);
};



const updateNavList = () =>{
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const userStatus = userInfo.status;
    if( userStatus == "online"){
        const navList = `<li class="nav__item"><a href="/index.html" class="nav__link active">Inicio</a></li>
        <li class="nav__item"><a href="/views/carrito.html" class="nav__link">Carrito</a></li>
        `;
        ulNavList.innerHTML = navList;
        ulNavList.appendChild(liLogOut);
        ulNavList.appendChild(li);
    } else {
        loginNavList();
    }
};

(localStorage.getItem("user") == null || localStorage.getItem("user") == undefined) ? loginNavList() : updateNavList(); 

i.addEventListener('click', (event) =>{
    console.log(event);
});

aLogOut.addEventListener('click', () =>{
    localStorage.clear();
    location.reload();
    alert("Se ha cerrado sesión");
});
/* <i class='bx bx-search id="search" '></i> */