import Vue from "vue";
import VueRouter from "vue-router";

import Tienda from "@/views/Tienda.vue";
import Productos from "@/views/Productos";
import Carrito from "@/views/Carrito";
import Cuenta from "@/views/Cuenta";
import Login from "@/views/Login";
import Registro from "@/views/Registro";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Tienda",
    component: Tienda,
    redirect: "/tienda/productos",
    children: [
      {
        path: "/tienda/productos",
        name: "Productos",
        component: Productos,
      },
      {
        path: "/tienda/carrito",
        name: "Carrito",
        component: Carrito,
      },
      {
        path: "/tienda/cuenta",
        name: "Cuenta",
        component: Cuenta,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registro",
    name: "Registro",
    component: Registro,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
