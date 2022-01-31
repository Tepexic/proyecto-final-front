import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

import productos from "@/api/Productos";
import auth from "@/api/Auth";
import carrito from "@/api/Carrito";
import withAsync from "@/helpers/withAsync";

export default new Vuex.Store({
  state: {
    toast: {
      show: false,
      message: "",
    },
    user: {
      _id: null,
      username: "",
      email: "",
      name: "",
      address: "",
      age: "",
      phone: "",
      avatar: "",
      isAdmin: false,
    },
    products: [],
    cart: {
      _id: null,
      timestamp: new Date(),
      productos: [],
    },
    admin: {
      phone: "",
      email: "",
    },
  },
  getters: {
    getProductsInCart(state) {
      if (state.cart._id) {
        const uniqueElements = getUniqueElementsFromArray(
          state.cart.productos,
          "_id"
        );
        return uniqueElements.map((item) => {
          const index = state.products.findIndex((p) => p._id === item._id);
          return {
            ...state.products[index],
            qty: item.qty,
          };
        });
      } else {
        return [];
      }
    },
  },
  mutations: {
    showToast(state, message) {
      state.toast = {
        show: true,
        message,
      };
    },
    setToastVisibility(state, value) {
      state.toast.show = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    setCartProducts(state, products) {
      state.cart.productos = products;
    },
    addProductToCart(state, product) {
      state.cart.products.push(product);
    },
    setAdminEmail(state, email) {
      state.admin.email = email;
    },
    setAdminPhone(state, phone) {
      state.admin.phone = phone;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const { error, data } = await withAsync(productos.getProducts, productos);
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        commit("setProducts", data);
      }
    },
    async deleteProduct({ dispatch, commit }, product) {
      const { error } = await withAsync(
        productos.deleteProductById,
        productos,
        product._id
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        dispatch("fetchProducts");
      }
    },
    async updateProduct({ dispatch, commit }, product) {
      const { error } = await withAsync(
        productos.updateProductById,
        productos,
        product._id,
        product
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        dispatch("fetchProducts");
      }
    },
    async createProduct({ commit }, product) {
      const { error } = await withAsync(
        productos.createNewProduct,
        productos,
        product
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        this.fetchProducts();
      }
    },
    async createCart({ commit }) {
      const { error, data } = await withAsync(carrito.createCart, carrito);
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        commit("setCart", data.data);
      }
    },
    async addProductToCart({ commit, dispatch, state }, product) {
      const { error } = await withAsync(
        carrito.updateCartContent,
        carrito,
        state.cart._id,
        product
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        commit("showToast", "Producto agregado al carrito");
        dispatch("fetchCartContent");
      }
    },
    async removeProductFromCart({ commit, dispatch, state }, product) {
      const { error } = await withAsync(
        carrito.deleteProductById,
        carrito,
        state.cart._id,
        product._id
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        commit("showToast", "Producto eliminado del carrito");
        dispatch("fetchCartContent");
      }
    },
    async fetchCartContent({ commit, state }) {
      const { error, data } = await withAsync(
        carrito.getCartContent,
        carrito,
        state.cart._id
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        commit("setCartProducts", data);
      }
    },
    async deleteCart({ commit, state }) {
      const { error } = await withAsync(
        carrito.deleteCart,
        carrito,
        state.cart._id
      );
      if (error) {
        handleError(error);
        commit("showToast", error);
      }
    },
    async uploadAvatar({ commit }, avatar) {
      const { error, data } = await withAsync(auth.uploadAvatar, auth, avatar);
      if (error) {
        handleError(error);
        commit("showToast", error);
      } else {
        return data.url;
      }
    },
    async login({ commit }, formData) {
      const { error, data } = await withAsync(auth.login, auth, formData);
      if (error) {
        console.error(error);
        commit("showToast", error);
      } else {
        commit("setUser", data.user);
        router.push({ name: "Tienda" });
      }
    },
    async signUp({ commit }, { form, phoneCode }) {
      const { error, data } = await withAsync(
        auth.signup,
        auth,
        form,
        phoneCode
      );
      if (error) {
        console.error(error);
        commit("showToast", error);
      } else {
        commit("setUser", data.user);
        router.push({ name: "Tienda" });
      }
    },
  },
});

/**
 * HELPERS
 */
function handleError(error) {
  if (error.status === 401) {
    router.push({ name: "Login" });
    console.error("Sesión expirada");
  }
  console.error(error);
}

function getUniqueElementsFromArray(array, uniqueProperty) {
  const result = [];
  // The map will help us keep a record of the objects
  const map = new Map();
  array.forEach((item) => {
    if (!map.has(item[uniqueProperty])) {
      // New element, push it into results
      map.set(item[uniqueProperty], true); // you can set any value, we just need it to be in the Map
      // save unique object
      result.push({ ...item, qty: 1 });
    } else {
      const index = result.findIndex((p) => p._id === item._id);
      result[index].qty++;
    }
  });
  return result;
}
