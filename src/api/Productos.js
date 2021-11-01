import { Api } from "@/api/api";

class Productos extends Api {
  /*
   * - GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
   * - POST: '/' - Para incorporar productos al listado (disponible para administradores)
   * - PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
   * - DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
   * */
  getProducts() {
    return this.get(`/productos`);
  }
  getProductById(id) {
    return this.get(`/productos/${id}`);
  }
  createNewProduct(product) {
    return this.post(`/productos`, product);
  }
  updateProductById(id, data) {
    return this.put(`/productos/${id}`, data);
  }
  deleteProductById(id) {
    return this.delete(`/productos/${id}`);
  }
}

const productos = new Productos();

export default productos;
