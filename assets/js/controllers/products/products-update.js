import { productsServices } from "../../services/product-services.js";

const detailProductDiv = document.getElementById("detailProduct");
let containerImagesDetail = "";
//
const divDescription = document.createElement('div');
divDescription.classList.add('detail__description');
const btnDescription = document.createElement('button');
btnDescription.classList.add('btn', 'btn-outline-dark', 'login__space');
btnDescription.textContent = 'Añadir al Carrito';
//
const obtenerInformacion = async () => {
    let product;
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        alert("Error");
        /* window.location.href = "/1836-CRUD_JS_Async-proyecto_base/1836-CRUD_JS_Async-proyecto_base/screens/error.html"; */
    }
    try {
        product = await productsServices.productDetail(id);
        const titleID = product.title.replace(/ /g, "");
        loopImages(product);

        divDescription.innerHTML = `<h1>${product.title}</h1>
        <h2>$ ${product.price}.00</h2>
        <p>${product.description} </p>`;
        divDescription.appendChild(btnDescription);

        detailProductDiv.innerHTML = `
       <div class="detail__img">
       <div id="${titleID}" class="carousel slide" data-bs-ride="carouse1">
           <div class="carousel-inner">
               ${containerImagesDetail}
           </div>
           <button class="carousel-control-prev" type="button" data-bs-target="#${titleID}""
               data-bs-slide="prev">
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Previous</span>
           </button>
           <button class="carousel-control-next" type="button" data-bs-target="#${titleID}""
               data-bs-slide="next">
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Next</span>
           </button>
       </div>
   </div>                
        `;
        detailProductDiv.appendChild(divDescription);

    } catch (error) {
        alert(error);
    }
    return product;
};

obtenerInformacion();

const loopImages = (product) => {
    product.images.forEach(image => {
        if (containerImagesDetail == "") {
            containerImagesDetail += `<div class="carousel-item active">
            <img src="${image}" class="d-block w-100" alt="product">
        </div>
        `;
        } else {
            containerImagesDetail += `<div class="carousel-item">
            <img src="${image}" class="d-block w-100" alt="product">
        </div>
        `;
        }
    });
};

let productData = await obtenerInformacion();

btnDescription.addEventListener('click', () => {
    if (localStorage.getItem("user") == null || localStorage.getItem("user") == undefined) {
        alert("Necesita tener una cuenta");
    } else {
        const productsCart = JSON.parse(localStorage.getItem('products-cart')) || [];
        productsCart.push(productData);
        localStorage.setItem("products-cart", JSON.stringify(productsCart));
        alert("Se añadio al carrito!");
    }
});

export const btnProductFunctions = {
    btnDescription,
    productData,
};