const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.readProducts();
  }

  readProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  generateId() {
    return this.products.length + 1;
  }

  addProduct(product) {
    const id = this.generateId();
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProducts() {
    this.readProducts();
    return this.products;
  }

  getProductById(id) {
    this.readProducts();
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    this.readProducts();
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }


    this.products[index] = { id, ...updatedProduct };
    this.saveProducts();

    return this.products[index];
  }

  deleteProduct(id) {
    this.readProducts();
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }


    const deletedProduct = this.products.splice(index, 1)[0];
    this.saveProducts();

    return deletedProduct;
  }
}

// Ejemplo de uso
const productManager = new ProductManager('productos.json');

// Agregar un producto
const newProduct = {
  title: 'Producto de ejemplo',
  description: 'Descripción del producto',
  price: 100,
  thumbnail: 'ruta/de/imagen.jpg',
  code: 'ABC123',
  stock: 50,
};
const addedProduct = productManager.addProduct(newProduct);
console.log(addedProduct);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener un producto por ID
const productIdToRetrieve = 1;
const retrievedProduct = productManager.getProductById(productIdToRetrieve);
console.log(retrievedProduct);

// Actualizar un producto
const productIdToUpdate = 1;
const updatedFields = { price: 120, stock: 40 };
const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields);
console.log(updatedProduct);

// Eliminar un producto
const productIdToDelete = 1;
const deletedProduct = productManager.deleteProduct(productIdToDelete);
console.log(deletedProduct);
