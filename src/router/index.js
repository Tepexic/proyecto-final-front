import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Tienda",
    component: () => import("@/views/Tienda.vue"),
    redirect: "/tienda/productos",
    children: [
      {
        path: "/tienda/productos",
        name: "Productos",
        component: () => import("@/views/Productos.vue"),
      },
      {
        path: "/tienda/carrito",
        name: "Carrito",
        component: () => import("@/views/Carrito.vue"),
      },
      {
        path: "/tienda/cuenta",
        name: "Cuenta",
        component: () => import("@/views/Cuenta.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/registro",
    name: "Registro",
    component: () => import("@/views/Registro.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
