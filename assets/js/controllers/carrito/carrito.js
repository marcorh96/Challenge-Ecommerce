let productsCart = (JSON.parse(localStorage.getItem('products-cart')) || []).sort();
const cart = document.getElementById('cart');
const cartContainer = document.getElementById('cartContainer');
const productList = document.getElementById('productList');
const priceContainer = document.getElementById('priceContainer');
const titleHeader = document.createElement('h2');
titleHeader.classList.add('warning__products');
titleHeader.textContent = "No hay productos para mostrar";
const btnPurchase = document.createElement('button');
btnPurchase.classList.add('btn', 'btn-outline-dark', 'login__space')
btnPurchase.textContent = "Comprar";
let price = 0;

/* const uniqueProducts = Array.from(new Set(productsCart.map(a => a.id)))
 .map(id => {
   return productsCart.find(a => a.id === id)
 });
 */

console.log(localStorage.getItem("products-cart"));
if (localStorage.getItem("user") == null || localStorage.getItem("user") == undefined) alert("Necesitas iniciar sesión!"), window.location.href = './login.html';


const dosDecimales = (n) =>{
    let t=n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
}

const generateTotal = () => {
    const descuento = price * .10;
    const total = price - descuento;
    
    const totalContainer = `<h2>Total: $ ${dosDecimales(total)}</h2>
    <h3>Usted ahorrara $ ${dosDecimales(descuento)}</h3>`;
    priceContainer.innerHTML = totalContainer;
    priceContainer.appendChild(btnPurchase);
   
};



const generateProducts = (product) => {
    const btnI = document.createElement('i');
    btnI.classList.add('bx', 'bx-x-circle');
    const liList = document.createElement('li');
    liList.classList.add('carrito__product');
    const productContainer = `
        <img src="${product.images[0]}" class="img__product">
            <div class="description__product">
                <h5>${product.title}</h5>
                <p>${product.description}</p>
                <strong>Precio: $ ${product.price}</strong>
            </div>
            `;
    liList.innerHTML += productContainer;
    liList.appendChild(btnI);
    productList.appendChild(liList);
    btnI.addEventListener('click', () => {
        const position = productsCart.indexOf(product);
        productsCart.splice(position, 1);
        localStorage.setItem("products-cart", JSON.stringify(productsCart));
        location.reload();
    });
};

productsCart.forEach(product => {
    generateProducts(product);
    price += product.price;
    return price;
});

generateTotal();

btnPurchase.addEventListener('click', () => {
    productsCart = [];
    alert("Gracias por su compra!");
    localStorage.setItem("products-cart", JSON.stringify(productsCart));
    location.reload();
});


/* <li class="carrito__product">
    <img src="../assets/img/nikeshoe.jpg" class="img__product">
        <div class="description__product">
            <h5>Nike Jordan Retro 1</h5>
            <p>Nike retro de los primeros bien chidos llevelo ya a un super precio!</p>
            <strong>Precio: $3400.00</strong>
        </div>
</li> */

/*<h2>Total: $3400.00</h2>
  <button type="button"  class="btn btn-outline-dark login__space">Comprar</button> */