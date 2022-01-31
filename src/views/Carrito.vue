<template>
  <div>
    <v-row class="ma-2">
      <v-app-bar-title>Carrito de compras</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="emptyCart">
        <v-icon>mdi-delete</v-icon>
        <span>Vaciar Carrito</span>
      </v-btn>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="$store.getters.getProductsInCart"
      class="mt-2"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:[`item.foto`]="{ item }" class="ma-2">
        <v-img :src="item.foto" max-width="100" />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
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
export default {
  name: "Carrito",
  data() {
    return {
      headers: [
        { text: "Foto", align: "center", value: "foto" },
        { text: "Nombre", align: "center", value: "nombre" },
        { text: "Precio", align: "center", value: "precio" },
        { text: "Cantidad", align: "center", value: "qty" },
        { text: "", align: "center", value: "actions", sortable: false },
      ],
      dialog: false,
      productToDelete: null,
    };
  },
  methods: {
    async deleteProduct() {
      if (this.productToDelete) {
        await this.$store.dispatch(
          "removeProductFromCart",
          this.productToDelete
        );
        this.productToDelete = null;
      } else {
        await this.$store.dispatch("deleteCart");
        this.$store.dispatch("createCart");
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
    emptyCart() {
      this.dialog = true;
      this.productToDelete = null;
    },
  },
  async beforeMount() {
    if (this.$store.state.cart._id) {
      await this.$store.dispatch("fetchCartContent");
    } else {
      await this.$store.dispatch("createCart");
    }
  },
};
</script>
