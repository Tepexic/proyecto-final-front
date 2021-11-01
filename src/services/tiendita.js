import Vue from "vue";

const state = Vue.observable({
  userRole: null,
  products: [],
  cart: {},
});

// An object to spread on Vue computed instance
export const productData = {
  products: {
    get() {
      return state.products;
    },
  },
};
export const setProducts = (data) => {
  state.products = data;
};

export const roleData = {
  userRole: {
    get() {
      return state.userRole;
    },
  },
};
export const setRole = (data) => {
  state.userRole = data;
};

export const cartData = {
  cart: {
    get() {
      return state.cart;
    },
  },
};
export const setCart = (data) => {
  state.cart = JSON.parse(JSON.stringify(data));
};
