<template>
  <div>
    <v-row class="ma-2" v-if="$store.state.user.isAdmin">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addProduct">
        <v-icon>mdi-plus</v-icon>
        <span>Agregar Producto</span>
      </v-btn>
    </v-row>
    <div class="d-flex flex-wrap align-stretch">
      <product
        v-for="product in $store.state.products"
        :key="product._id"
        :product="product"
        :isAdmin="$store.state.user.isAdmin"
        @delete="handleDelete"
        @edit="handleEdit"
        @add="addToCart"
      />
    </div>
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
            <v-btn color="secondary" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="error" text @click="deleteProduct"> Eliminar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Edit/New product modal -->
    <edit-product-modal
      :show="editModalShow"
      :currentProduct="selectedProduct"
      @cancel="cancelProductEdition"
      @save="saveProduct"
    />
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import EditProductModal from "@/components/EditProductModal.vue";

export default {
  name: "Productos",
  data() {
    return {
      dialog: false,
      productToDelete: null,
      selectedProduct: null,
      editModalShow: false,
    };
  },
  components: {
    Product,
    EditProductModal,
  },
  methods: {
    async deleteProduct() {
      this.dialog = false;
      this.$store.dispatch("deleteProduct", this.productToDelete);
      this.productToDelete = null;
    },
    handleEdit(product) {
      this.selectedProduct = product;
      this.editModalShow = true;
    },
    handleDelete(product) {
      this.productToDelete = { ...product };
      this.dialog = true;
    },
    addProduct() {
      this.selectedProduct = null;
      this.editModalShow = true;
    },
    editProduct(product) {
      this.selectedProduct = { ...product };
      this.editModalShow = true;
    },
    cancelProductEdition() {
      this.selectedProduct = null;
      this.editModalShow = false;
    },
    saveProduct(product) {
      if (this.selectedProduct) {
        this.$store.dispatch("updateProduct", product);
      } else {
        this.$store.dispatch("createProduct", product);
      }
      this.editModalShow = false;
    },
    async addToCart(product) {
      if (!this.$store.state.cart._id) {
        await this.$store.dispatch("createCart");
      }
      this.$store.dispatch("addProductToCart", product);
    },
  },
  created() {
    if (!this.$store.state.user._id) {
      this.$store.dispatch("getUserData");
    }
    this.$store.dispatch("fetchProducts");
  },
};
</script>
