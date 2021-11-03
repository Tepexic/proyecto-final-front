<template>
  <div>
    <v-row class="ma-2">
      <v-app-bar-title>Carrito de compras</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="error">
        <v-icon>mdi-delete</v-icon>
        <span>Vaciar Carrito</span>
      </v-btn>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="cart.productos"
      class="mt-2"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:item.foto="{ item }">
        <v-img :src="item.foto" max-width="50" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="removeProduct(item)" color="error" icon>
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- Delete confirmation modal -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title class="text-h5"> Confirmar acción </v-card-title>
          <v-card-text>
            Esta acción no se puede deshacer. ¿Está seguro?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="cancelDelete">
              Cancelar
            </v-btn>
            <v-btn color="error" text @click="deleteProduct"> Eliminar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import carrito from "@/api/Carrito";
import withAsync from "@/helpers/withAsync";
import { cartData, setCart, setCartProducts } from "@/services/tiendita.js";

export default {
  name: "Carrito",
  data() {
    return {
      headers: [
        { text: "Foto", value: "foto" },
        { text: "Nombre", value: "nombre" },
        { text: "Precio", value: "precio" },
        { text: "", value: "actions", sortable: false },
      ],
      dialog: false,
      productToDelete: null,
    };
  },
  computed: {
    ...cartData,
  },
  methods: {
    async createCart() {
      const { error, data } = await withAsync(carrito.createCart, carrito);
      if (error) {
        console.error(error);
      } else {
        setCart(data.data);
      }
    },
    async deleteCart() {
      const { error } = await withAsync(
        carrito.deleteCart,
        carrito,
        this.cart.id
      );
      if (error) {
        console.error(error);
      } else {
        setCart({});
      }
    },
    async fetchCartContent() {
      const { error, data } = await withAsync(
        carrito.getCartContent,
        carrito,
        this.cart.id
      );
      if (error) {
        console.error(error);
      } else {
        setCartProducts(data);
      }
    },
    async deleteProduct() {
      const { error } = await withAsync(
        carrito.deleteProductById,
        carrito,
        this.cart.id,
        this.productToDelete.id
      );
      if (error) {
        console.error(error);
      } else {
        this.fetchCartContent();
        this.productToDelete = null;
      }
      this.dialog = false;
    },
    cancelDelete() {
      this.productToDelete = null;
      this.dialog = false;
    },
    removeProduct(product) {
      this.dialog = true;
      this.productToDelete = product;
    },
  },
  mounted() {
    if (this.cart.id) {
      this.fetchCartContent();
    } else {
      this.createCart();
    }
  },
};
</script>
