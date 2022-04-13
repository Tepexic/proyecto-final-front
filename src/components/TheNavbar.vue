<template>
  <nav>
    <v-app-bar
      dark
      shrink-on-scroll
      src="https://images.unsplash.com/photo-1578916171728-46686eac8d58"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top, rgba(0,0,0,0.9), rgba(0,0,0,.3)"
        ></v-img>
      </template>

      <v-app-bar-title>
        <h4>Mi Tiendita</h4>
      </v-app-bar-title>
      <template v-slot:extension>
        <v-tabs>
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab
            class="d-flex align-center"
            @click="$router.push({ name: 'Tienda' })"
          >
            <v-icon left>mdi-store</v-icon>
            <span>Productos</span>
          </v-tab>

          <v-tab
            class="d-flex align-center"
            @click="$router.push({ name: 'Carrito' })"
          >
            <v-icon left>mdi-cart</v-icon>
            <span>Carrito</span>
          </v-tab>

          <v-tab
            class="d-flex align-center"
            @click="$router.push({ name: 'Cuenta' })"
          >
            <v-icon left>mdi-account</v-icon>
            <span>Cuenta</span>
          </v-tab>

          <v-tab
            class="d-flex align-center"
            @click="$router.push({ name: 'Ayuda' })"
          >
            <v-icon left>mdi-help</v-icon>
            <span>Centro de Ayuda</span>
          </v-tab>

          <v-spacer />

          <v-tab class="d-flex align-center" @click="$store.dispatch('logout')">
            <v-icon left>mdi-logout</v-icon>
            <span>Salir</span>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>
