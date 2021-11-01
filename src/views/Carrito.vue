<template>
  <div>
    <v-app-bar-title>Carrito de compras</v-app-bar-title>
  </div>
</template>

<script>
export default {
  name: "Carrito",
  data() {
    return {
      carrito: [],
      total: 0,
    };
  },
};
</script>
