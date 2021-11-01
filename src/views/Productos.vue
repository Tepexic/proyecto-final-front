<template>
  <div class="d-flex flex-wrap align-stretch">
    <product
      v-for="product in products"
      :key="product.id"
      :product="product"
      :isAdmin="userRole"
    />
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import productos from "@/api/Productos";
import account from "@/api/Account";
import withAsync from "@/helpers/withAsync";

export default {
  name: "Productos",
  data() {
    return {
      products: [],
      userRole: null,
    };
  },
  components: {
    Product,
  },
  methods: {
    async fetchProducts() {
      const { error, data } = await withAsync(productos.getProducts, productos);
      if (error) {
        console.error(error);
      } else {
        this.products = data;
      }
    },
    async fetchUserRole() {
      const { error, data } = await withAsync(account.getUserRole, account);
      if (error) {
        console.error(error);
      } else {
        this.userRole = data.admin;
      }
    },
  },
  mounted() {
    this.fetchProducts();
    this.fetchUserRole();
  },
};
</script>
