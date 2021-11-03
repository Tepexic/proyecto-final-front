<template>
  <div>
    <v-row class="ma-2" v-if="userRole">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addProduct">
        <v-icon>mdi-plus</v-icon>
        <span>Agregar Producto</span>
      </v-btn>
    </v-row>
    <div class="d-flex flex-wrap align-stretch">
      <product
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isAdmin="userRole"
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

import productos from "@/api/Productos";
import account from "@/api/Account";
import carrito from "@/api/Carrito";
import withAsync from "@/helpers/withAsync";
import {
  productData,
  setProducts,
  roleData,
  setRole,
  cartData,
  setCart,
} from "@/services/tiendita.js";

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
  computed: {
    ...productData,
    ...roleData,
    ...cartData,
  },
  components: {
    Product,
    EditProductModal,
  },
  methods: {
    async fetchProducts() {
      const { error, data } = await withAsync(productos.getProducts, productos);
      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }
    },
    async fetchUserRole() {
      const { error, data } = await withAsync(account.getUserRole, account);
      if (error) {
        console.error(error);
      } else {
        setRole(data.admin);
      }
    },
    async deleteProduct() {
      const { error } = await withAsync(
        productos.deleteProductById,
        productos,
        this.productToDelete.id
      );
      if (error) {
        console.error(error);
      } else {
        this.fetchProducts();
        this.productToDelete = null;
      }
      this.dialog = false;
    },
    async updateProduct(product) {
      const { error } = await withAsync(
        productos.updateProductById,
        productos,
        product.id,
        product
      );
      if (error) {
        console.error(error);
      } else {
        this.fetchProducts();
      }
    },
    async createProduct(product) {
      const { error } = await withAsync(
        productos.createNewProduct,
        productos,
        product
      );
      if (error) {
        console.error(error);
      } else {
        this.fetchProducts();
      }
    },
    async createCart() {
      const { error, data } = await withAsync(carrito.createCart, carrito);
      if (error) {
        console.error(error);
      } else {
        setCart(data.data);
      }
    },
    async addProductToCart(product) {
      const { error } = await withAsync(
        carrito.updateCartContent,
        carrito,
        this.cart.id,
        product
      );
      if (error) {
        console.error(error);
      }
    },
    handleEdit(product) {
      this.selectedProduct = product;
      this.editModalShow = true;
    },
    handleDelete(product) {
      this.productToDelete = product;
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
        this.updateProduct(product);
      } else {
        this.createProduct(product);
      }
      this.editModalShow = false;
    },
    async addToCart(product) {
      if (this.cart.id) {
        this.addProductToCart(product);
      } else {
        await this.createCart();
        this.addProductToCart(product);
      }
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchUserRole();
  },
};
</script>
