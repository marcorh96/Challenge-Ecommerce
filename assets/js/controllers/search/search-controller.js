import { productsServices } from "../../services/product-services.js";
const productsContainer = document.getElementById('products');
const div = document.createElement('div');
div.classList.add('container__products');
const url = new URL(window.location);
const prodSearch = url.searchParams.get("prodSearch").replace(/-/g, " ");
const arrayTitle = [];
const arrayCategory = [];
let containerImages;

const getData = async() =>{
    let product;
    try {
         product = await productsServices.products();
    } catch (error) {
        alert(error);
    }
    return product;
}

const productData = await getData();
productData.forEach(product => {
    const productTitle = product.title.toLowerCase();
    const productCategory = product.category.name.toLowerCase();
    if(productTitle.indexOf(prodSearch) >= 0){
        arrayTitle.push(product);
    }
    if(productCategory.indexOf(prodSearch) >= 0){
        arrayCategory.push(product);
    }
    
});

const generateProducts = () =>{
    if(arrayTitle.length > 0){
        productsContainer.innerHTML += `<p class="title__products">Projaz Products</p>`;
        productsContainer.appendChild(div);
        for(let i = 0; i < 6; i++){
            const filtroId = arrayTitle[i].id;
            const filtroImagen = arrayTitle[i].images;
            const filtroTitulo = arrayTitle[i].title;
            const filtroPrecio = arrayTitle[i].price;
            containerImages = "";
            generarProductos(filtroId, filtroImagen, filtroTitulo, filtroPrecio);
        }
    }
    if(arrayCategory.length > 0){
        productsContainer.innerHTML += `<p class="title__products">Projaz ${arrayCategory[0].category.name}</p>`;
        div.innerHTML = '';
        productsContainer.appendChild(div);
        for(let i = 0; i < 6; i++){
           // console.log(arrayCategory[i]);
           const filtroId = arrayCategory[i].id;
            const filtroImagen = arrayCategory[i].images;
            const filtroTitulo = arrayCategory[i].title;
            const filtroPrecio = arrayCategory[i].price;
            containerImages = "";
            generarProductos(filtroId, filtroImagen, filtroTitulo, filtroPrecio);
        }
    }
    if(arrayTitle.length == 0 && arrayCategory.length == 0){
        const h3 = '<h3 class="h3__notfound">No se encontró ningun resultado</h3>';
        productsContainer.innerHTML = h3;
    }
        
};



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
            <p><a href="./detail.html?id=${filtroId}">Ver producto</a></p>
        </div>
        `;
    div.innerHTML += productContainer;
};

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
generateProducts();