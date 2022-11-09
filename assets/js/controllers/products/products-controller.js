import { productsServices } from "../../services/product-services.js";
const div = document.createElement('div');
div.classList.add('container__products');
const productsContainer = document.getElementById('products');
let containerImages = "";

productsServices.products().then((data) => {
    const resultado = data.reduce(function (r, a) {
        r[a.category.name] = r[a.category.name] || [];
        r[a.category.name].push(a);
        return r;
    }, Object.create(null));
    const formatResult = Object.entries(resultado).splice(2);
    console.log(formatResult);
    for (const [categoria, array] of formatResult) {
        const filtroCategoria = array.filter(product => product.category.name.includes(categoria));
        loopProductos(filtroCategoria);
    }
});



const generarProductos = (filtroId, filtroImagen, filtroTitulo, filtroPrecio) => {
    const idTitulo = filtroTitulo.replace(/ /g, "");
    loopImages(filtroImagen);
    const productContainer = `
    <div class="projaz__product">
        <div id="${idTitulo}" class="carousel slide" data-bs-ride="carouse1">
            <div class="carousel-inner">
                ${containerImages}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${idTitulo}"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${idTitulo}"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
        </div>
            <h4>${filtroTitulo}</h4>
            <strong>$ ${filtroPrecio}.00</strong>
            <p><a href="./views/detail.html?id=${filtroId}">Ver producto</a></p>
        </div>
        `;
    div.innerHTML += productContainer;
};

const loopProductos = (filtroCategoria) => {
    filtroCategoria = filtroCategoria.sort();
    let filtroNombre = filtroCategoria[0].category.name;
    productsContainer.innerHTML += `<p class="title__products">Projaz ${filtroNombre}</p>`;
    div.innerHTML = '';
    productsContainer.appendChild(div);
    for (let i = 6; i < 12; i++) {
        const filtroId = filtroCategoria[i].id;
        const filtroImagen = filtroCategoria[i].images;
        const filtroTitulo = filtroCategoria[i].title;
        const filtroPrecio = filtroCategoria[i].price;
        containerImages = "";
        generarProductos(filtroId, filtroImagen, filtroTitulo, filtroPrecio);
    }
}

const loopImages = (filtroImagen) => {
    filtroImagen.forEach(image => {
        if (containerImages == "") {
            containerImages += `<div class="carousel-item active">
            <img src="${image}" class="d-block w-100 product__img" alt="product">
        </div>
        `;
        } else {
            containerImages += `<div class="carousel-item">
            <img src="${image}" class="d-block w-100 product__img" alt="product">
        </div>
        `;
        }
    });
}

