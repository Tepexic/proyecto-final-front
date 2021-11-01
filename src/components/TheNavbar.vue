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

          <v-tab>
            <router-link to="/" style="text-decoration: none; color: inherit">
              <v-icon left>mdi-store</v-icon>
              <span>Productos</span>
            </router-link>
          </v-tab>

          <v-tab>
            <router-link
              to="/carrito"
              style="text-decoration: none; color: inherit"
            >
              <v-icon left>mdi-cart</v-icon>
              <span>Carrito</span>
            </router-link>
          </v-tab>

          <v-tab>
            <router-link
              to="/cuenta"
              style="text-decoration: none; color: inherit"
            >
              <v-icon left>mdi-account</v-icon>
              <span>Cuenta</span>
            </router-link>
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
