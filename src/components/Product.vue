<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="product.foto" height="200px"></v-img>
    <v-card-title> {{ product.nombre }} </v-card-title>
    <v-card-subtitle> {{ product.descripcion }} </v-card-subtitle>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ {{ product.precio }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange lighten-2" text> Añadir al Carrito </v-btn>

      <v-spacer></v-spacer>
      <v-btn color="orange" icon v-if="isAdmin">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="orange" icon v-if="isAdmin">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      required: false,
      default: () => ({
        id: 0,
        nombre: "Cinta de reparación",
        descripcion: "Cinta de reparación de pantalla de 5x200CM",
        codigo: 1234567890,
        precio: 4922,
        foto: "https://ae01.alicdn.com/kf/H1b13e3760cc74dcd9b7e161256820bbdT/Cinta-de-reparaci-n-de-pantalla-de-5x200CM-parche-autoadhesivo-para-puerta-y-ventana-s-per.jpeg_Q90.jpeg_.webp",
        stock: 10,
      }),
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
