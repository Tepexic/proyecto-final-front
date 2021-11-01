import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Productos",
    component: () => import("../views/Productos.vue"),
  },
  {
    path: "/carrito",
    name: "Carrito",
    component: () => import("../views/Carrito.vue"),
  },
  {
    path: "/cuenta",
    name: "Cuenta",
    component: () => import("../views/Cuenta.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
