const products = () => fetch('https://api.escuelajs.co/api/v1/products')
    .then(res => res.json());
//.then(json=>console.log(json));

const productDetail = (id) =>{
    return fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then((respuesta) => respuesta.json());
};


export const productsServices= {
    products,
    productDetail
};