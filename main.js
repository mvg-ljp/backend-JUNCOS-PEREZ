class ProductManager {
    constructor (){
        this.products = [];
    }

    static id = 0

    addProduct(title, descripcion, price, image, code, stock) {
        ProductManager.id++
        this.products.push({ title, descripcion, price, image, code, stock, id:ProductManager.id });
    }

    getProduct() {
        return this.products;
    }

    getProductById(id) {
        if(!this.products.find((producto) => producto.id === id)){
            console.log("not found")
        } else{
            console.log("existe")
        }
    }
}

const productos = new ProductManager
// Primera llamada = arreglo vacio
console.log(productos.getProduct());

//Agregamos producto
productos.addProduct("titutlo1", "descripcion1", 5000,"image1", "abc1", 5)
productos.addProduct("titutlo2", "descripcion2", 8000,"image2", "abc2", 10)

//Segunda llamada
console.log(productos.getProduct());

console.log(productos.getProductById(2))



