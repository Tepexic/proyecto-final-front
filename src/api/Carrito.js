import { Api } from "@/api/api";

class Carrito extends Api {
  /*
   * - POST: '/' - Crea un carrito y devuelve su id.
   * - DELETE: '/:id' - Vacía un carrito y lo elimina.
   * - GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
   * - POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
   * - DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
   * */
  createCart() {
    return this.post(`/`);
  }
  deleteCart(id) {
    return this.delete(`/${id}`);
  }
  getCartContent(id) {
    return this.get(`/${id}/productos`);
  }
  updateCartContent(id, product) {
    return this.post(`/${id}/productos`, product);
  }
  deleteProductById(id, id_prod) {
    return this.delete(`/${id}/productos/${id_prod}`);
  }
}

const carrito = new Carrito();

export default carrito;
